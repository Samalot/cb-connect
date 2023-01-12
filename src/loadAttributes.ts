import { ethers } from "ethers";
import { getProvider } from "./getProvider";
import * as metadataABI from "./resources/abi/metadata.json";

const metadataAddress = "0xec3e38e536ad4fa55a378b14b257976148b618ac";

interface result {
  talent: string,
  species: string,
  className: string
}

export const loadAttributes = async (
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
  const attributesRaw = await cyberBrokersMetadata.getTalentAttributes(brokerID);

  const talent = attributesRaw.match(/{"trait_type": "Talent", "value": ".*?\"}/g)[0];
  const species = attributesRaw.match(/{"trait_type": "Species", "value": ".*?\"}/g)[0];
  const className = attributesRaw.match(/{"trait_type": "Class", "value": ".*?\"}/g)[0];

  return {
    talent: talent.substring(35, talent.length - 2),
    species: species.substring(36, species.length - 2),
    className: className.substring(34, className.length - 2)
  };
};