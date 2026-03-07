import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
