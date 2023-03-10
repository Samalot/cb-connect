import { ethers } from "ethers";
import { getProvider } from "./getProvider";
import * as metadataABI from "./resources/abi/metadata.json";

const metadataAddress = "0xec3e38e536ad4fa55a378b14b257976148b618ac";

interface result {
  mind: number,
  body: number,
  soul: number
}

export const loadSkills = async (
  brokerID: number,
  provider?: any,
  contractAddress = metadataAddress
): Promise<result> => {
  const providerOrDefault = provider || getProvider();

  if (!providerOrDefault) {
    return Promise.reject("invalid provider");    
  }

  if (brokerID < 0 || brokerID > 10000) {
    return Promise.reject("invalid broker id"); 
  }

  const cyberBrokersMetadata = new ethers.Contract(contractAddress, metadataABI, providerOrDefault);
  const stats = await cyberBrokersMetadata.getStats(brokerID);

  return {
    body: parseInt(stats[1]._hex, 16),
    mind: parseInt(stats[0]._hex, 16),
    soul: parseInt(stats[2]._hex, 16)
  };
};