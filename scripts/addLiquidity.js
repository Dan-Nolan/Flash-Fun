const { abi: routerAbi } = require("@uniswap/v2-periphery/build/IUniswapV2Router02");

// TODO: add token and router addr
const tokenAddress = "";
const uniswapRouterAddr = "";

const depositAmt = ethers.utils.parseEther("10000");

async function addLiquidity() {
    const signer0 = await ethers.provider.getSigner(0);
    const addr0 = await signer0.getAddress();
    const token = await ethers.getContractAt("Token", tokenAddress);
    const router = await ethers.getContractAt(routerAbi, uniswapRouterAddr);

    const tx1 = await token.approve(router.address, depositAmt);
    await tx1.wait();

    const tx2 = await router.addLiquidityETH(token.address, depositAmt, 0, 0, addr0, Date.now(), {
        value: ethers.utils.parseEther(".1")
    });
    const receipt = await tx2.wait();

    console.log(receipt);
}

addLiquidity();
