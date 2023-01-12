import { ethers } from "ethers";

declare const window: any;

export const getProvider = (): any => {
  if (window && window.ethereum) {
    new ethers.providers.Web3Provider(window.ethereum);
  }
}