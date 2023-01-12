import { loadSkills }  from "./loadSkills";
import { loadAttributes }  from "./loadAttributes";
import { loadSvg }  from "./loadSvg";
import { getProvider } from "./getProvider";

interface layer {
  data: string
  group: string
  id: number
  label: string
  layerID: number
  active?: boolean
}

interface result {
  attributes: {
    talent: string
    species: string
    className: string
  },
  skills: {
    mind: number
    body: number
    soul: number
  },
  layers: layer[]
}

export const buildSVGString = (layers: layer[]): string => {
  let svgString = `<svg width="1320px" height="1760px" viewBox="0 0 1320 1760" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`;
  layers.forEach((segment, index) => {
    if (segment.active) {
      svgString += segment.data;
    }
  });
  svgString += "</svg>"
  return svgString;
}

export const loadBroker = async (tokenID: number, provider?: any): Promise<result> => {
  const providerOrDefault = provider || getProvider();

  const skills = await loadSkills(tokenID, providerOrDefault);
  const attributes = await loadAttributes(tokenID, providerOrDefault);
  const layers = await loadSvg(tokenID, providerOrDefault)

  return Promise.resolve({
    attributes,
    skills,
    layers
  });
};