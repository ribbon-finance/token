// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract CToken{
    address public underlying;
    bool public isCEther;

    function setUnderlying(address _underlying) public {
        underlying = _underlying;
    }
}
