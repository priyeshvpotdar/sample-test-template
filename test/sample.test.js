const Harbor = require("@beam-me-up/harbor");

describe("Sample test", () => {
  // Variables we can access in every test
  let harbor;
  let testnet;
  let testnetName = "sample-harbor-test";

  const TIMEOUT = 900000;

  beforeAll(async () => {
    // Fill the Harbor object in with your keys!
    harbor = new Harbor({
      userKey: "",
      projectKey: "",
      baseUrl: "https://develop-api.tech.goharbor.com",
    });
    
    // Authenticate below this line!

    // Apply your configuration below this line!
    
  }, TIMEOUT);

  // Fill in each of these tests!
  it("Check if the Testnet exists", async () => {});
  it("Check that there is only one chain (Ethereum)", async () => {});
  it("Check that there are only 3 wallets in your Ethereum chain", async () => {});
  it("Check that each wallet contains exactly 10,000 ETH", async () => {});
});
