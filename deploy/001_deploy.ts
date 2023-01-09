import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const deployments = hre.deployments;
  const { deploy } = deployments;
  const { deployer } = await hre.getNamedAccounts();

  const greeter = await deploy("Greeter", {
    from: deployer,
    gasLimit: 500000,
    args: ["Hello"],
  });
};
export default func;
