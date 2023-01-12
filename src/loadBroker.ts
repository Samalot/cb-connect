import { loadSkills }  from "./loadSkills";

export const loadBroker = async (provider: any, tokenID: string) => {

  const skills = await loadSkills(provider, tokenID)

  return {
    attributes: {},
    skills,
    svg: {}
  }
};