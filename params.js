const { ethers } = require("hardhat");
const { BigNumber } = ethers;

const isTest = process.env.CI;
const TEST_BENEFICIARY = "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e";
const DAO_MULTISIG = "0xDAEada3d210D2f45874724BeEa03C7d4BBD41674";
const beneficiary = isTest ? TEST_BENEFICIARY : DAO_MULTISIG;

// FOR MAINNET
const TOKEN_PARAMS = {
  NAME: "Ribbon",
  SYMBOL: "RBN",
  DECIMALS: "18",
  SUPPLY: BigNumber.from("1000000000")
    .mul(BigNumber.from("10").pow(BigNumber.from("18")))
    .toString(),
  BENIFICIARY: beneficiary,
};

// FOR MAINNET
const STAKING_REWARDS_rETHTHETA_PARAMS = {
  OWNER: beneficiary,
  REWARDS_DIST_ADDR: beneficiary,
  REWARDS_TOKEN: "0x6123B0049F904d730dB3C36a31167D9d4121fA6B",
  STAKING_TOKEN: "0x0FABaF48Bbf864a3947bdd0Ba9d764791a60467A",
  START_EMISSION: "1624012200",
};

// FOR MAINNET
const STAKING_REWARDS_rWBTCTHETA_PARAMS = {
  OWNER: beneficiary,
  REWARDS_DIST_ADDR: beneficiary,
  REWARDS_TOKEN: "0x6123B0049F904d730dB3C36a31167D9d4121fA6B",
  STAKING_TOKEN: "0x8b5876f5B0Bf64056A89Aa7e97511644758c3E8c",
  START_EMISSION: "1624012200",
};

// FOR MAINNET
const STAKING_REWARDS_rUSDCETHPTHETA_PARAMS = {
  OWNER: beneficiary,
  REWARDS_DIST_ADDR: beneficiary,
  REWARDS_TOKEN: "0x6123B0049F904d730dB3C36a31167D9d4121fA6B",
  STAKING_TOKEN: "0x16772a7f4a3ca291C21B8AcE76F9332dDFfbb5Ef",
  START_EMISSION: "1624012200",
};

// FOR MAINNET
const AIRDROP_PARAMS = {
  OWNER: beneficiary,
  TOKEN_ADDRESS: "0x6123B0049F904d730dB3C36a31167D9d4121fA6B",
  MERKLE_ROOT:
    "0xe173eda01b28c334c0265bf11a3fa3560c2c107c32d434b942391c448f8ade5b",
  DAYS_UNTIL_UNLOCK: "200",
};

// FOR SCRIPT
const AIRDROP_SCRIPT_PARAMS = {
  STRANGLE_AMOUNT: BigNumber.from("500000").mul(
    BigNumber.from("10").pow(BigNumber.from("18"))
  ),
  VAULT_BASE_AMOUNT: BigNumber.from("10500000").mul(
    BigNumber.from("10").pow(BigNumber.from("18"))
  ),
  VAULT_EXTRA_AMOUNT: BigNumber.from("10000000").mul(
    BigNumber.from("10").pow(BigNumber.from("18"))
  ),
  EXTERNAL_PROTOCOLS_AMOUNT: BigNumber.from("4000000").mul(
    BigNumber.from("10").pow(BigNumber.from("18"))
  ),
  DISCORD_RHAT_AMOUNT: BigNumber.from("4000000").mul(
    BigNumber.from("10").pow(BigNumber.from("18"))
  ),
  DISCORD_NO_RHAT_AMOUNT: BigNumber.from("1000000").mul(
    BigNumber.from("10").pow(BigNumber.from("18"))
  ),
  BOXCOX_LAMBDA: 0.5,
};

// FOR TESTING
const STAKING_TOKEN_PARAMS = {
  ADDRESS: "0x0FABaF48Bbf864a3947bdd0Ba9d764791a60467A",
  MAIN_HOLDER: "0xB8A1eF5584564b0fDA3086Cc715B76de71DE21ED",
};

const EXTERNAL_TOKEN_PARAMS = {
  ADDRESS: "0xAd7Ca17e23f13982796D27d1E6406366Def6eE5f",
  MAIN_HOLDER: "0xc2C28f19d7a896fE2634392Fe732f716671c54EB",
};

const MAIN_RIBBONOMICS_DIR = {
  DELEGATION: "0x0000000000000000000000000000000000000000",
  VOTINGESCROW: "",
  VEBOOSTPROXY: "",
  FEEDISTRIBUTOR: "",
  GAUGECONTROLLER: "",
  GAUGETYPE: "Liquidity",
  GAUGETYPEIDX: 0,
  MINTER: "",
  TOKEN: "0x6123B0049F904d730dB3C36a31167D9d4121fA6B",
  O_ADMIN: "0x77DA011d5314D80BE59e939c2f7EC2F702E1DCC4",
  E_ADMIN: "0x223d59FA315D7693dF4238d1a5748c964E615923",
  VAULTS: {
    RYVUSDC: "0xCc323557c71C0D1D20a1861Dc69c06C5f3cC9624",
    AAVE: "0xe63151A0Ed4e5fafdc951D877102cf0977Abd365",
    STETH: "0x53773E034d9784153471813dacAFF53dBBB78E8c",
    ETH: "0x25751853Eab4D0eB3652B5eB6ecB102A2789644B",
    WBTC: "0x65a833afDc250D9d38f8CD9bC2B1E3132dB13B2F",
  },
  LIQUIDITYGAUGES: {
    RYVUSDC: "",
    AAVE: "",
    STETH: "",
    ETH: "",
    WBTC: "",
  },
};

const TEST_RIBBONOMICS_DIR = {
  DELEGATION: "0x0000000000000000000000000000000000000000",
  VOTINGESCROW: "0x8E75FCac21074AB6E71d6097741bA23fbbA474a4",
  VEBOOSTPROXY: "0x0e3Ac2562f5caeC610717be17d6D46baD8fb798C",
  FEEDISTRIBUTOR: "0x63991971C9934b4380AA005546E21D1BCAFb8A85",
  GAUGECONTROLLER: "0x1897D25dc65406F0a534cb6749010b3EdD9f87D9",
  GAUGETYPE: "Liquidity",
  GAUGETYPEIDX: 0,
  MINTER: "0xA79d141A1ea7a1962364288075196fbE01C83aCC",
  TOKEN: "0x80ba81056ba048c82b7b01eb8bffe342fde1998d",
  VAULTS: {
    RYVUSDC: "0xEC1c50724CF7a618C6cdA6CFEa5c9064AFc98E84",
    ETH: "0x9467726c3cFe3f9112Cd0fA3963223d5b8b3C4B1",
    WBTC: "0x6e08c6659132dB4aF0352c409e4b3067C8E97ac2",
  },
  LIQUIDITYGAUGES: {
    RYVUSDC: "0xB8a058dd5E4652ABFE7B7aD370777fDf800dfFD8",
    ETH: "0xD79c2BE9812fE295cb3807889B19b6e4E1E72316",
    WBTC: "0xd679194Ad02958C73D04D02503ff5da9Aa1bD0A6",
  },
};

module.exports = {
  TOKEN_PARAMS,
  AIRDROP_PARAMS,
  STAKING_REWARDS_rETHTHETA_PARAMS,
  STAKING_REWARDS_rWBTCTHETA_PARAMS,
  STAKING_REWARDS_rUSDCETHPTHETA_PARAMS,
  STAKING_TOKEN_PARAMS,
  EXTERNAL_TOKEN_PARAMS,
  AIRDROP_SCRIPT_PARAMS,
  MAIN_RIBBONOMICS_DIR,
  TEST_RIBBONOMICS_DIR,
};
