export const loadRawSVG = async (cyberBrokersMetadata: any, brokerID: number): Promise<String> => {
  let rawSVG = "", renderIdx = -1, numIterations = 0;
  while (renderIdx != 0) {
    let res;
    try {
      res = await cyberBrokersMetadata.renderBroker(brokerID, Math.max(renderIdx, 0));
    } catch (ex) {
      throw ex;
    }

    rawSVG += res[0];
    renderIdx = res[1].toNumber();
    numIterations++;
  }

  return rawSVG.replace('\u0000', '');
}