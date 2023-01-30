const Harbor = require("@beam-me-up/harbor");
const { expect } = require("chai");
const { ethers } = require("hardhat");

function generateRandomTestnetName() {
  return `testnet-${Math.floor(Math.random() * 1000)}`;
}

describe.only("Sample test", () => {
  // Variables we can access in every test
  let harbor;
  let testnet;
  let chains;
  let accounts;
  let ethereum;
  let provider;
  let greeterContract;

  const testnetName = generateRandomTestnetName();

  beforeAll(async () => {
    // Fill the Harbor object in with your keys!
    harbor = new Harbor({
      userKey: "fZCGChu79xpkCMgQYGSDM8",
      projectKey: "k3XjM2oSGf49tuyqTDE7yi",
    });

    // Authenticate below this line!
    await harbor.authenticate();
    console.log(
      "Deploying your contracts ... This may take a few minutes. Please stand by."
    );

    testnet = await harbor.testnet("venice-rooftops");
    chains = await testnet.chains();
    ethereum = chains[0];
    accounts = await ethereum.accounts();
    provider = ethers.getDefaultProvider(ethereum.endpoint);
    for (i = 0; i < accounts.length; i++) {
      if (accounts[i].type == "contract") {
        if (accounts[i].name == "Greeter") {
          greeterContract = new ethers.Contract(
            accounts[i].address,
            accounts[i].abi,
            provider.getSigner(0)
          );
        }
      }
    }
  }, 300000);

  // Fill in each of these tests!
  it("Check if the Testnet is running", async () => {
    expect(testnet.status).to.be.equal("RUNNING");
  });
  it("Check that the Ethereum chain exists", async () => {
    const ethereum = testnet.ethereum;
    expect(ethereum.chain).to.be.equal("ethereum");
  });
  it("Check that there are only 3 wallets in your Ethereum chain", async () => {
    const ethereum = testnet.ethereum;
    expect(ethereum.wallets().length).to.be.equal(3);
  }, 50000);
  it("Check that the Ether balances of both wallets and smart contract(s) exist", async () => {
    const ethereum = testnet.ethereum;
    const wallets = await ethereum.wallets();
    const smartContracts = await ethereum.contracts();
    for (let i = 0; i < wallets.length; i++) {
      expect(wallets[i].balances["ETH"].to.exist);
    }
    for (let i = 0; i < smartContracts.length; i++) {
      expect(smartContracts[i].balances["ETH"].to.exist);
    }
  });
});
