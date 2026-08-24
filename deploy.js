import { ethers } from "hardhat";
import fs from "node:fs";
import path from "node:path";

async function main() {

  const [
    admin,
    authority,
    ownerA
  ] = await ethers.getSigners();


  console.log(
    "Admin:",
    admin.address
  );


  console.log(
    "Authority:",
    authority.address
  );


  console.log(
    "Owner A:",
    ownerA.address
  );


  const Registry =
    await ethers.getContractFactory(
      "LandRegistry"
    );


  const registry =
    await Registry.deploy();


  await registry.waitForDeployment();


  const address =
    await registry.getAddress();


  console.log(
    "LandRegistry deployed at:",
    address
  );


  await (
    await registry.setAuthority(
      authority.address,
      true
    )
  ).wait();


  const artifactPath =
    path.join(
      process.cwd(),
      "artifacts",
      "contracts",
      "LandRegistry.sol",
      "LandRegistry.json"
    );


  const artifact =
    JSON.parse(
      fs.readFileSync(
        artifactPath,
        "utf8"
      )
    );


  const abiDirectory =
    path.join(
      process.cwd(),
      "frontend",
      "src",
      "abi"
    );


  fs.mkdirSync(
    abiDirectory,
    {
      recursive: true
    }
  );


  fs.writeFileSync(

    path.join(
      abiDirectory,
      "LandRegistry.json"
    ),

    JSON.stringify(
      artifact.abi,
      null,
      2
    )
  );


  const config =
    `export const CONTRACT_ADDRESS = "${address}";\n`;


  fs.writeFileSync(

    path.join(
      process.cwd(),
      "frontend",
      "src",
      "config.js"
    ),

    config
  );


  console.log(
    "Frontend ABI copied."
  );


  console.log(
    "Frontend contract address saved."
  );
}


main().catch(
  (error) => {

    console.error(error);

    process.exitCode = 1;
  }
);