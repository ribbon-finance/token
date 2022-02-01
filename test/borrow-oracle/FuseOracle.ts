import { Contract, ContractFactory } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import hre from "hardhat";
import { ensureOnlyExpectedMutativeFunctions } from "../helpers";
import { assert, addSnapshotBeforeRestoreAfterEach } from "../common";
import {
  currentTime,
  toUnit,
  fastForward,
  assertBNGreaterThan,
  assertBNLessThan,
} from "../utils";
import { expect } from "chai";

const { ethers } = hre;
const { provider, BigNumber } = ethers;

const { formatEther } = require("@ethersproject/units");

// Asset symbol => [gauge, underlying/eth oracle]
// ex: rBTC-THETA => [rBTC-THETA-gauge address, BTC/ETH oracle]
const vaults: any = {
  "rETH-THETA": ["0x78b6dd0cD4697f9a62851323BeA8a3b3Bf213241", "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"],
  "rstETH-THETA": ["0xAF23AdB205169A5DF1dB7321BF1A8D7DeA2F8ABd", "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"],
  "rBTC-THETA": ["0xe53851c18e01ca5f8537246f37fb7de048619892", "0xdeb288F737066589598e9214E782fa5A8eD689e8"],
  "rAAVE-THETA": ["0x12Dc10F72a64ce07d2b3D41420f2276f8c560919", "0x6df09e975c830ecae5bd4ed9d90f3a95a4f88012"],
}

// Tests taken from https://github.com/Synthetixio/synthetix/blob/master/test/contracts/StakingRewards.js
describe("VaultPriceOracle", function () {
  let VaultPriceOracle: ContractFactory;
  let CToken: ContractFactory;
  let owner: SignerWithAddress;
  let account3: SignerWithAddress;

  let vaultPriceOracle: Contract,
      oracles: Array<Contract>,
      liquidityGauges: Array<Contract>,
      ribbonVaults: Array<Contract>,
      cTokens: Array<Contract>,
      oracleOwner: Contract;

  addSnapshotBeforeRestoreAfterEach();

  before(async () => {
    [
      owner,
      account3,
    ] = await ethers.getSigners();

    VaultPriceOracle = await ethers.getContractFactory("VaultPriceOracle");
    vaultPriceOracle = await VaultPriceOracle.deploy(
      owner.address,
      true
    );

    await vaultPriceOracle.deployed();

    let vault: keyof typeof vaults;

    for (let vault in vaults) {
      // Get gauge
      let gauge = await ethers.getContractAt(
        "ILiquidityGauge",
        vaults[vault][0]
      );

      // Get oracle
      let oracle = await ethers.getContractAt(
        "IAggregatorV3Interface",
        vaults[vault][1]
      );

      // Get ribbon vault
      let ribbonVault = await ethers.getContractAt(
        "IRibbonVault",
        await gauge.lp_token()
      );

      let cToken = await CToken.deploy();
      await cToken.deployed();

      await cToken.setUnderlying(gauge.address)

      liquidityGauges.push(gauge)
      oracles.push(ribbonVault)
      ribbonVaults.push(ribbonVault)
      cTokens.push(cToken)
    }
  });

  it("ensure only known functions are mutative", async () => {
    ensureOnlyExpectedMutativeFunctions({
      abi: (await hre.artifacts.readArtifact("VaultPriceOracle")).abi,
      ignoreParents: [""],
      expected: [
        "changeAdmin",
        "setPriceFeeds",
      ],
    });
  });

  describe("Constructor & Settings", () => {
    it("should set admin on constructor", async () => {
      assert.equal(await vaultPriceOracle.admin(), owner);
    });

    it("should set admin overrite on constructor", async () => {
      assert.equal(await vaultPriceOracle.canAdminOverwrite(), true);
    });
  });

  describe("Function permissions", () => {
    it("changes admin", async () => {
      await vaultPriceOracle.changeAdmin(account3);
      assert.equal(await vaultPriceOracle.admin(), account3.address);
    });

    it("only admin address can call changeAdmin", async () => {
      assert.revert(
        vaultPriceOracle.connect(account3).changeAdmin(account3),
        "Sender is not the admin."
      );
    });

    it("only admin address can call setPriceFeeds", async () => {
      assert.revert(
        vaultPriceOracle.setPriceFeeds([], [], 0),
        "Sender is not the admin."
      );
    });

    it("cannot overwrite oracle when overwrite false", async () => {
      let vaultPriceOracle = await VaultPriceOracle.deploy(
            owner,
            false
          );

      vaultPriceOracle.setPriceFeeds(["0x78b6dd0cD4697f9a62851323BeA8a3b3Bf213241"], ["0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"], 0);

      assert.revert(
        vaultPriceOracle.setPriceFeeds(["0x78b6dd0cD4697f9a62851323BeA8a3b3Bf213241"], ["0x6df09e975c830ecae5bd4ed9d90f3a95a4f88012"], 0),
        "Admin cannot overwrite existing assignments of price feeds to underlying tokens."
      );
    });
  });

  describe("Set Price Feeds", async () => {
    beforeEach(async () => {
      for (let vault in vaults) {
        // gauge, oracle for underlying asset of vault token of gauge, 0 for eth denominated price feed
        await vaultPriceOracle.setPriceFeeds([vaults[vault][0]], [vaults[vault][1]], 0);
      }
    });

    it("should set price feeds", async () => {
      for (let vault in vaults) {
        assert.equal(await vaultPriceOracle.priceFeeds(vaults[vault][0]), vaults[vault][1])
        assert.bnEqual(await vaultPriceOracle.feedBaseCurrencies(vaults[vault][0]), 0)
      }
    });

    it("should get correct price()", async () => {
      let v = Object.keys(vaults);

      for (let i = 0; i < oracles.length; i++) {
        let [, tokenEthPrice, , , ] = await oracles[i].latestRoundData()
        let rVaultDecimals = await ribbonVaults[i].decimals();
        let rVaultToAssetExchangeRate = await ribbonVaults[i].pricePerShare(); // (ex: rETH-THETA -> ETH, rBTC-THETA -> BTC)

        let actualPrice = tokenEthPrice > 0 ? tokenEthPrice.mul(rVaultToAssetExchangeRate).div(rVaultDecimals): 0;
        let chainlinkPrice = await vaultPriceOracle.price(liquidityGauges[i].address);
        console.log(`${v[i]} underlying price per token is ${chainlinkPrice}`);
        assert.bnEqual(actualPrice, chainlinkPrice)
      }
    });

    it("should get correct getUnderlyingPrice()", async () => {
      let v = Object.keys(vaults);

      for (let i = 0; i < oracles.length; i++) {
        let [, tokenEthPrice, , , ] = await oracles[i].latestRoundData()
        let rVaultDecimals = await ribbonVaults[i].decimals();
        let rVaultToAssetExchangeRate = await ribbonVaults[i].pricePerShare(); // (ex: rETH-THETA -> ETH, rBTC-THETA -> BTC)

        let actualPrice = tokenEthPrice > 0 ? tokenEthPrice.mul(rVaultToAssetExchangeRate).div(rVaultDecimals): 0;
        let chainlinkPrice = await vaultPriceOracle.price(cTokens[i].address);
        console.log(`${v[i]} underlying price per token is ${chainlinkPrice}`);
        assert.bnEqual(actualPrice, chainlinkPrice)
      }
    });
  });
});
