// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.0;

import {ISeizer} from "../interfaces/ISeizer.sol";
import {IVotingEscrow} from "../interfaces/IVotingEscrow.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {
  SafeERC20
} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Redeemer {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  // Multisig
  address public admin;
  // Maximum % of rbn staked redeemable. 2 decimals i.e 100 * 10 ** 2 = 100% possible to redeem
  uint8 public maxRedeemPCT;
  // Seizer implementation
  ISeizer public seizerImplementation;
  // veCRV escrow contract
  IVotingEscrow public votingEscrowContract;

  event RBNRedeemed(uint256 amountRedeemed);

  constructor(address _admin, uint8 _maxRedeemPCT) {
    require(_admin != address(0), "Admin is 0x0");
    require(
      _maxRedeemPCT > 0 && _maxRedeemPCT < 10000,
      "maxRedeemPCT is not between 0% - 100%"
    );

    admin = _admin;
    maxRedeemPCT = _maxRedeemPCT;
  }

  /**
   * @dev Validates that the tx sender is admin multisig
   */
  modifier onlyAdmin() {
    require(msg.sender == admin, "Must be admin");
    _;
  }

  /**
   * @dev Set new voting escrow contract
   * @param _votingEscrowContract new voting escrow contract
   */
  function setVotingEscrowContract(address _votingEscrowContract)
    external
    onlyAdmin
  {
    require(_votingEscrowContract != address(0), "votingEscrowContract is 0x0");
    votingEscrowContract = IVotingEscrow(_votingEscrowContract);
  }

  /**
   * @dev Set new seizer contract implementation
   * @param _seizerImplementation new seizer contract
   */
  function setSeizerImplementation(address _seizerImplementation)
    external
    onlyAdmin
  {
    seizerImplementation = ISeizer(_seizerImplementation);
  }

  /**
   * @dev Set new max redeemeable pct
   * @param _maxRedeemPCT new max redeem pct
   */
  function setMaxRedeemPCT(uint8 _maxRedeemPCT) external onlyAdmin {
    require(
      _maxRedeemPCT > 0 && _maxRedeemPCT < 10000,
      "maxRedeemPCT is not between 0% - 100%"
    );
    maxRedeemPCT = _maxRedeemPCT;
  }

  /**
   * @dev Redeems the rbn
   * @param _maxRedeemPCT new max redeem pct
   */
  function redeemRBN(uint256 _amount) external onlyAdmin {
    require(votingEscrowContract != address(0), "votingEscrowContract is 0x0");

    uint256 amountToRedeem =
      seizerImplementation == address(0)
        ? _amount
        : seizerImplementation.amountToRedeem(votingEscrowContract);
    require(
      amountToRedeem <=
        votingEscrowContract.totalLocked().mul(maxRedeemPCT).div(100 * 10**2)
    );

    votingEscrowContract.redeemRBN(amountToRedeem);

    emit RBNRedeemed(amountToRedeem);
  }

  /**
   * @dev Sends the token to admin
   * @param _token token address
   * @param _amount token amount
   */
  function sendToMultisig(address _token, uint256 _amount) external onlyAdmin {
    IERC20(_token).safeTransfer(admin, _amount);
  }

  /**
   * @dev Sells RBN for vault assets and disperses accordingly
   */
  function sellAndDisperseFunds() external onlyAdmin {
    require(seizerImplementation != address(0), "seizerImplementation is 0x0");
    seizerImplementation.sellAndDisperseFunds();
  }
}
