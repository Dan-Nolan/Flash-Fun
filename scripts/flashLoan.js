// TODO: add pair and token address
const pairAddr = "";
const tokenAddress = "";

async function flash() {
    const Flash = await hre.ethers.getContractFactory("Flash");
    const flash = await Flash.deploy();
    await flash.deployed();

    const token = await ethers.getContractAt("Token", tokenAddress);
    const tx1 = await token.transfer(flash.address, ethers.utils.parseEther("32"));
    await tx1.wait();

    const tx = await flash.run(pairAddr);
    const receipt = await tx.wait();
    console.log(receipt);
}

flash();