const Harbor = require("@harbor-xyz/harbor");
function generateRandomTestnetName() {
  return `testnet-${Math.floor(Math.random() * 1000)}`;
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

    // Apply your configuration below this line!
  });

  // Fill in each of these tests!
  it("Check if the Testnet is running", async () => {});
  it("Check that the Ethereum chain exists", async () => {});
  it("Check that there are only 3 wallets in your Ethereum chain", async () => {});
  it("Check that the Ether balances of both wallets and smart contract(s) exist", async () => {});
});
