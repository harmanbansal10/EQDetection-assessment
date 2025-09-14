import { createContext, useContext, useState, ReactNode } from "react";

type SelectionContextValue = {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

const Ctx = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return <Ctx.Provider value={{ selectedId, setSelectedId }}>{children}</Ctx.Provider>;
}

export function useSelectionContext() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSelectionContext must be used within SelectionProvider");
  return v;
}
