//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2ERC20.sol";

contract Flash {
    uint public x;

    function run(address _x) external {
        // which token is token0 and which is token1
        IUniswapV2Pair(_x).swap(9999 * 10 ** 18, 0, address(this), "0xa");
    }

    function uniswapV2Call(address,uint,uint,bytes memory) external {
        IUniswapV2Pair pair = IUniswapV2Pair(msg.sender);
        IUniswapV2ERC20 soyToken = IUniswapV2ERC20(pair.token0());
        
        x = soyToken.balanceOf(address(this));
        
        soyToken.transfer(msg.sender, 10031 * 10 ** 18);
    }
}
