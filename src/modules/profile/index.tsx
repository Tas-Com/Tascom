import { createContext, useContext, type PropsWithChildren } from "react";
import { getProfileRepo, type ProfileRepo } from "./repository";

const ProfileContext = createContext<ProfileRepo | null>(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === null) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};

export const createProfileModule = () => {
  const value = getProfileRepo() ?? null;
  return {
    Provider: ({ children }: PropsWithChildren) => (
      <ProfileContext.Provider value={value}>
        {children}
      </ProfileContext.Provider>
    ),
  };
};

export { profileRoutes } from "./routes";
