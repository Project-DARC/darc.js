import * as prelude from './codeGenerator/codeGenerator';

// import ethers from 'ethers';
import { ethers } from 'ethers';

export type RuntimeParam = {
  address: string;
  wallet: string;
  provider: string;
}

/**
 * The runtime function is used to transpile the code to the runtime code.
 * @param param 
 */
export function runtime(scrint: string, param: RuntimeParam){
  const { address, wallet, provider } = param;

}