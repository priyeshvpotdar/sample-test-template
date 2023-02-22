const Harbor = require("@harbor-xyz/harbor");
const { expect } = require("chai");
const { ethers } = require("hardhat");

function generateRandomTestnetName() {
  return `testnet-${Math.floor(Math.random() * 100000)}`;
}

describe.only("Sample test", () => {
  // Variables we can access in every test
  let harbor;
  let testnet;
  let ethereum;
  let provider;
  let greeterContract;

  const testnetName = generateRandomTestnetName();

  beforeAll(async () => {
    // Fill the Harbor object in with your keys!
    harbor = new Harbor({
      userKey: "",
      projectKey: "",
    });

    // Authenticate below this line!
    await harbor.authenticate();
    console.log(
      "Deploying your contracts ... This may take a few minutes. Please stand by."
    );

    testnet = await harbor.apply(
      {
        chains: [
          {
            chain: "ethereum",
            config: {
              artifactsPath: "./artifacts",
              deploy: {
                scripts: "./deploy",
              },
            },
            tag: "v1",
          },
        ],
      },
      testnetName
    );
    ethereum = testnet.ethereum;
    contracts = await ethereum.contracts();
    provider = ethers.getDefaultProvider(ethereum.endpoint);
    greeterContract = contracts["Greeter"];
  }, 300000);
  it("Check if the Testnet is running", async () => {
    expect(testnet.status).to.be.equal("RUNNING");
  });
  it("Check that the Ethereum chain exists", async () => {
    const ethereum = testnet.ethereum;
    expect(ethereum.chain).to.be.equal("ethereum");
  });
  it("Check that there are only 3 wallets in your Ethereum chain", async () => {
    const ethereum = testnet.ethereum;
    const wallets = await ethereum.wallets();
    expect(wallets.length).to.be.equal(3);
  }, 50000);
  it("Check that the Ether balances of both wallets and smart contract(s) exist", async () => {
    const ethereum = testnet.ethereum;
    const wallets = await ethereum.wallets();
    for (let i = 0; i < wallets.length; i++) {
      expect(wallets[i].balances["ETH"]).to.exist;
    }
    const balances = await greeterContract.balances();
    expect(balances["ETH"]).to.exist;
  });
});
