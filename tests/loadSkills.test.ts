// Define function mocks before imports
const ethersContractMock = jest.fn(() => mockContract);
const getStatsMock = jest.fn(() => Promise.resolve(mockStats));

import { loadSkills } from '../src/loadSkills'; 

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
    const result = await loadSkills({}, "100");

    expect(ethersContractMock).toBeCalled();
    expect(getStatsMock).toBeCalled();
    expect(result).toBe(mockStats);
  });

  test('should return error if ethers contract fails', async () => {
    ethersContractMock.mockImplementationOnce(() => { throw new Error() });
    await expect(loadSkills({}, "100"))
      .rejects.toThrowError();
  });

  test('should return error if getStats fails', async () => {
    getStatsMock.mockImplementationOnce(() => Promise.reject("getStats error"));
    await expect(loadSkills({}, "100"))
      .rejects.toEqual("getStats error");
  });
});