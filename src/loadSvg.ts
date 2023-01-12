import { ethers } from "ethers";
import { getProvider } from "./getProvider";
import { loadLayers } from "./loadLayers";
import { loadRawSVG } from "./loadRawSVG";
import { parseSVG, translateLabel } from "./svgUtils";
import * as metadataABI from "./resources/abi/metadata.json";
import * as layerMap from "./resources/layerMap.json";

const metadataAddress = "0xec3e38e536ad4fa55a378b14b257976148b618ac";

interface result {
  data: string,
  group: string,
  id: number,
  label: string,
  layerID: number
}

export const loadSvg = async (
  brokerID: number,
  provider?: any,
  contractAddress = metadataAddress
): Promise<result[]> => {
  const providerOrDefault = provider || getProvider();

  if (!providerOrDefault) {
    return Promise.reject("invalid provider");    
  }

  if (brokerID < 0 || brokerID > 10000) {
    return Promise.reject("invalid broker id"); 
  }

  const cyberBrokersMetadata = new ethers.Contract(contractAddress, metadataABI, providerOrDefault);
  const rawSVG = await loadRawSVG(cyberBrokersMetadata, brokerID);
  const segments = parseSVG(rawSVG);
  const layers = await loadLayers(brokerID, providerOrDefault);

  for(let index = 0; index < segments.length; index++) {
    const layerID = parseInt(layers[index]._hex, 16);
    const layerLabel = translateLabel(layerMap[0][layerID]);
    segments[index].layerID = layerID;
    segments[index].label = layerLabel;
    segments[index].group = layerMap[1][layerID];
  }

  segments[0].label = "Background";

  return segments;
};
