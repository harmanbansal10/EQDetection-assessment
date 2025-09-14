import { create } from "zustand";


type SelState = {
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
    filterMagMin: number | null;
    setFilterMagMin: (v: number | null) => void;
};


export const useSelectionStore = create<SelState>((set) => ({
    selectedId: null,
    setSelectedId: (id) => set({ selectedId: id }),
    filterMagMin: null,
    setFilterMagMin: (v) => set({ filterMagMin: v })
}));