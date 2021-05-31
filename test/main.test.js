const ethers = require("ethers");
const { assert, expect } = require("chai");
require("dotenv").config();

const fs = require("fs");
const abiJson = JSON.parse(fs.readFileSync("./WhiteElephantGame.json", "utf8"));

const abi = new ethers.utils.Interface(abiJson.abi);
// This can be an address or an ENS name
const address = "0x10e7ded6aab2676445fd8e09829b62d8e3dee036";
const mnemonic = process.env.MNEMONIC;

const provider = new ethers.providers.InfuraProvider("ropsten", process.env.INFURA_API_KEY);

// An example Signer
const signer = ethers.Wallet.fromMnemonic(mnemonic).connect(provider);
// console.log(signer.getBalance().then((res) => console.log(ethers.utils.formatEther(res))));

// Read-Write; By connecting to a Signer, allows:
// - Everything from Read-Only (except as Signer, not anonymous)
// - Sending transactions for non-constant functions
const contract_rw = new ethers.Contract(address, abi, signer);

// contract_rw.isContractActive().then((res) => console.log(res));

/************************************** */
// Start of tests.

describe("WhiteElephantGame remote live contract tests", function () {
  beforeEach(function () {});

  describe("#numberOfParticipants()", function () {
    it("get numberOfParticipants should be more than 0.", async function () {
      const nParts = await contract_rw.numberOfParticipants();
      console.log("::nParts", nParts);
      expect(nParts).to.be.greaterThan(0);
    });
  });

  describe("#isContractActive()", function () {
    it("check if contract is active, should be true.", async function () {
      const isActive = await contract_rw.isContractActive();
      expect(isActive).to.be.equal(true);
    });
  });

  describe("#isPrivateGame()", function () {
    it("check if game is private, should be false", async function () {
      const isPrivateGame = await contract_rw.isPrivateGame();
      expect(isPrivateGame).to.be.equal(false);
    });
  });
});
/****************************************** */
