export * from "./ProfileRepo";
import { mockProfile } from "./mockProfile";

export const getProfileRepo = () => {
  // mock api
  return mockProfile();
};
