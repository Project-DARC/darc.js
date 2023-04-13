import {ethers} from 'ethers';
import { expect } from 'chai';
import 'mocha';
const provider = new ethers.JsonRpcProvider('http://localhost:8545');
const abi = `{"type":"function","name":"getTokenOwnerBalance","constant":true,"inputs":[{"name":"tokenClassIndex","type":"uint256","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"uint256","_isParamType":true},{"name":"tokenOwnerAddress","type":"address","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"address","_isParamType":true}],"outputs":[{"name":null,"type":"uint256","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"uint256","_isParamType":true}],"payable":false,"stateMutability":"view","gas":{"type":"BigNumber","hex":"0x01ba8140"},"_isFragment":true}`;

const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';


async function main() {
  const contract = new ethers.Contract(address, abi, provider);
  const result = await contract.getTokenOwnerBalance(0, '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1');
  console.log("Here is the result: ");
  console.log(result);
}

main();


describe('Operator Test', 
  () => { 
    it('should return true', async () => { 

      const contract = new ethers.Contract(address, abi, provider);
      const result = await contract.getTokenOwnerBalance(0, '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1');
      console.log("Here is the result: ");
      console.log(result);
      expect(true).to.equal(true);
  }); 
});