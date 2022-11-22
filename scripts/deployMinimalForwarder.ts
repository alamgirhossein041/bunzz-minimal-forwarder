import hre, { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MinimalForwarder } from "typechain";

async function main() {

    const [caller]: SignerWithAddress[] = await ethers.getSigners();

    console.log("\n")

    const minimalForwarder: MinimalForwarder = await ethers.getContractFactory("MinimalForwarder").then(f => f.deploy());
    console.log("Deploying SignatureDrop \ntransaction: ", minimalForwarder.deployTransaction.hash, "\naddress: ", minimalForwarder.address);
    await minimalForwarder.deployTransaction.wait();

    console.log("\n")

    console.log("Verifying contract...")
    await verify(minimalForwarder.address, []);
}

async function verify(address: string, args: any[]) {
    try {
      return await hre.run("verify:verify", {
        address: address,
        constructorArguments: args,
      });
    } catch (e) {
      console.log(address, args, e);
    }
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })