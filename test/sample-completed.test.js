const Harbor = require("@harbor-xyz/harbor");
const { expect } = require("chai");
function generateRandomTestnetName() {
  return `testnet-${Math.floor(Math.random() * 100000)}`;
}

describe("Sample test", () => {
  // Variables we can access in every test
  let harbor;
  let testnet;
  const testnetName = generateRandomTestnetName();

  beforeAll(async () => {
    // Fill the Harbor object in with your keys!
    harbor = new Harbor({
      userKey: "",
      projectKey: "",
    });

    // Authenticate below this line!
    await harbor.authenticate();

    // Apply your configuration below this line!
    testnet = await harbor.apply(
      {
        chains: [
          {
            chain: "ethereum",
            config: {
              artifactsPath: "./artifacts",
              deploy: { scripts: "./deploy" },
            },
            wallets: [],
            tag: "v1",
          },
        ],
      },
      testnetName
    );
  }, 300000);

  // Fill in each of these tests!
  it("Check if the Testnet is running", async () => {
    expect(testnet.status).to.be.equal("RUNNING");
  });
  it("Check that there is only one chain (Ethereum)", async () => {
    const chains = await testnet.chains();
    expect(chains.length).to.be.equal(1);
    let ethereumChain;
    for (let i = 0; i < chains.length; i++) {
      if (chains[i].chain == "ethereum") {
        ethereumChain = chains[i];
      }
    }
    expect(ethereumChain.chain).to.be.equal("ethereum");
  });
  it("Check that there are only 3 wallets in your Ethereum chain", async () => {
    const chains = await testnet.chains();
    const accounts = await chains[0].accounts();
    let accountsCount = 0;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].type === "wallet") accountsCount++;
    }
    expect(accountsCount).to.be.equal(3);
  }, 50000);
  it("Check that the balances of both wallets and smart contract(s) exist", async () => {
    const chains = await testnet.chains();
    const accounts = await chains[0].accounts();
    for (let i = 0; i < accounts.length; i++) {
      console.log("Account #:", i + 1);
      console.log("Type of account: ", accounts[i].type);
      console.log("Address: ", accounts[i].address);
      for (let j = 0; j < accounts[i].balances.length; j++) {
        console.log("Symbol: ", accounts[i].balances[j].symbol);
        expect(accounts[i].balances[j].amount).to.exist;
        console.log("Balance: ", accounts[i].balances[j].amount);
      }
    }
  });
});
