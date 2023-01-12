// Define function mocks before imports
const ethersContractMock = jest.fn(() => mockContract);
const getStatsMock = jest.fn(() => Promise.resolve(mockStats));

import { loadSkills } from '../src/loadSkills'; 
import * as provider from '../src/getProvider';

const mockStats = {
  mind: 10,
  body: 10,
  soul: 10
}

const mockContract = { getStats: getStatsMock };
jest.mock('ethers', () => ({
  ethers: { Contract: ethersContractMock }
}));

describe('testing index file', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  test('should return brokers stats', async () => {
    const result = await loadSkills(100, {});

    expect(ethersContractMock).toBeCalled();
    expect(getStatsMock).toBeCalled();
    expect(result).toBe(mockStats);
  });

  test('should return error if ethers contract fails', async () => {
    ethersContractMock.mockImplementationOnce(() => { throw new Error() });
    await expect(loadSkills(100, {}))
      .rejects.toThrowError();
  });

  test('should return error if getStats fails', async () => {
    getStatsMock.mockImplementationOnce(() => Promise.reject("getStats error"));
    await expect(loadSkills(100, {}))
      .rejects.toEqual("getStats error");
  });

  test('should return error if broker id is invalid', async () => {
    await expect(loadSkills(-1, {}))
      .rejects.toEqual("invalid broker id");
  });

  test('should return error if default provider generation fails', async () => {
    jest.spyOn(provider, "getProvider").mockReturnValue(false);

    await expect(loadSkills(100))
      .rejects.toEqual("invalid provider");
  });
});