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
  DELEGATION: "0xb913090f0fcc2473dfcceaf41653a806bcb85fab",
  VOTINGESCROW: "0x19854C9A5fFa8116f48f984bDF946fB9CEa9B5f7",
  VEBOOSTPROXY: "0x1929605B714517b76bB733198E0f3C3D4ab08608",
  FEEDISTRIBUTOR_START_TIME: "1646055120",
  PENALTYDISTRIBUTOR_START_TIME: "1646055120",
  FEEDISTRIBUTOR: "0xd086C9356A5683192B10d93d4d92D8fCBa705692",
  VERBNREWARDS: "0x43277C92F9936aeb5d6A2713a44Cd2f096f171cC",
  RBN_PROTOCOL_REVENUE_ALLOCATION: "5000",
  FEECUSTODY: "0x2d02c18904988d2d123a103fcc80634ac44046df",
  GAUGECONTROLLER: "0x0cb9cc35cEFa5622E8d25aF36dD56DE142eF6415",
  GAUGETYPE: "Vault",
  GAUGETYPEIDX: 0,
  MINTER: "0x5B0655F938A72052c46d2e94D206ccB6FF625A3A",
  TOKEN: "0x6123B0049F904d730dB3C36a31167D9d4121fA6B",
  FEE_DISTRIBUTOR_TOKEN: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  O_ADMIN: "0x77DA011d5314D80BE59e939c2f7EC2F702E1DCC4",
  E_ADMIN: "0x77DA011d5314D80BE59e939c2f7EC2F702E1DCC4",
  KEEPER: "0xA4290C9EAe274c7A8FbC57A1E68AdC3E95E7C67e",
  VAULTS: {
    RYVUSDC: "0xCc323557c71C0D1D20a1861Dc69c06C5f3cC9624",
    AAVE: "0xe63151A0Ed4e5fafdc951D877102cf0977Abd365",
    STETH: "0x53773E034d9784153471813dacAFF53dBBB78E8c",
    ETH: "0x25751853Eab4D0eB3652B5eB6ecB102A2789644B",
    WBTC: "0x65a833afDc250D9d38f8CD9bC2B1E3132dB13B2F",
  },
  VAULTS_GAUGE_WEIGHT: {
    RYVUSDC: 4991,
    AAVE: 46,
    STETH: 1073,
    ETH: 3337,
    WBTC: 553,
  },
  LIQUIDITYGAUGES: {
    RYVUSDC: "0xa8A9699161f266f7E79080ca0b65210820BE8732",
    AAVE: "0x98c371567b8A196518dcb4A4383387A2C7339382",
    STETH: "0x4e079dCA26A4fE2586928c1319b20b1bf9f9be72",
    ETH: "0x9038403C3F7C6B5Ca361C82448DAa48780D7C8Bd",
    WBTC: "0x8913EAb16a302dE3E498BbA39940e7A55c0B9325",
  },
};

const TEST_RIBBONOMICS_DIR = {
  DELEGATION: "0x0000000000000000000000000000000000000000",
  VOTINGESCROW: "0x75F024aa6ca8f7eec23465388a661209f735B0DF",
  VEBOOSTPROXY: "",
  FEEDISTRIBUTOR: "0x1532704EE02c7AC48F216c4b28D2E652dCA85950",
  FEEDISTRIBUTOR_START_TIME: "1646093852",
  PENALTYDISTRIBUTOR_START_TIME: "1646093852",
  FEECUSTODY: "",
  RBN_PROTOCOL_REVENUE_ALLOCATION: "5000",
  VERBNREWARDS: "0x03ABC5A33C5E4eBf731a7C2e99D1d4a8D8D09589",
  GAUGECONTROLLER: "",
  GAUGETYPE: "Vault",
  GAUGETYPEIDX: 0,
  MINTER: "",
  TOKEN: "0x80ba81056ba048c82b7b01eb8bffe342fde1998d",
  FEE_DISTRIBUTOR_TOKEN: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
  VAULTS: {
    RYVUSDC: "0xEC1c50724CF7a618C6cdA6CFEa5c9064AFc98E84",
    ETH: "0x9467726c3cFe3f9112Cd0fA3963223d5b8b3C4B1",
    WBTC: "0x6e08c6659132dB4aF0352c409e4b3067C8E97ac2",
  },
  LIQUIDITYGAUGES: {
    RYVUSDC: "",
    ETH: "",
    WBTC: "",
  },
};

module.exports = {
  DAO_MULTISIG,
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
