import { ethers } from "ethers";
import { getProvider } from "./getProvider";
import * as metadataABI from "./resources/abi/metadata.json";

const metadataAddress = "0xec3e38e536ad4fa55a378b14b257976148b618ac";


export const loadLayers = async (
  brokerID: number,
  provider?: any,
  contractAddress = metadataAddress
): Promise<any> => {
  const providerOrDefault = provider || getProvider();

  if (!providerOrDefault) {
    return Promise.reject("invalid provider");    
  }

  if (brokerID < 0 || brokerID > 10000) {
    return Promise.reject("invalid broker id"); 
  }

  const cyberBrokersMetadata = new ethers.Contract(contractAddress, metadataABI, providerOrDefault);
  return await cyberBrokersMetadata.getLayers(brokerID);
};