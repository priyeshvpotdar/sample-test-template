const Harbor = require("@harbor-xyz/harbor");
const { expect } = require("chai");

describe("Sample test", () => {
  // Variables we can access in every test
  let harbor;
  let testnet;
  let testnetName = "sample-template-to-test";

  beforeAll(async () => {
    // Fill the Harbor object in with your keys!
    harbor = new Harbor({
      userKey: "cFeJWnDwQFVTSF2AabJmW5",
      projectKey: "fPMeKGPUfyBTCoqtXmv3G4",
      baseUrl: "https://develop-api.tech.goharbor.com",
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
  }, 900000);

  // Fill in each of these tests!
  it("Check if the Testnet is running", async () => {
    expect(testnet.status).to.be.equal("RUNNING");
  });
  it("Check that there is only one chain (Ethereum)", async () => {
    const chains = await testnet.chains();
    expect(chains.length).to.be.equal(1);
    const onlyChain = chains[0].chain;
    expect(onlyChain).to.be.equal("ethereum");
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
});
