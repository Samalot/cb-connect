import { ethers } from "ethers";
import * as metadataABI from "./resources/abi/metadata.json";

const metadataAddress = "0xec3e38e536ad4fa55a378b14b257976148b618ac";

export const loadSkills = async (
  provider: any,
  brokerID: string | number,
  contractAddress = metadataAddress
) => {
  const cyberBrokersMetadata = new ethers.Contract(contractAddress, metadataABI, provider);
  return await cyberBrokersMetadata.getStats(brokerID);
};