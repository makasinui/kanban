import type { IColumn } from "@/types";

export const useLocalStorage = () => {
    const saveData = (board: IColumn[]) => {
        localStorage.setItem('board', JSON.stringify(board));
    }

    const restoreData = (): IColumn[] | null => {
        const rawData = localStorage.getItem('board');

        if(rawData) {
            return JSON.parse(rawData);
        }

        return null;
    }

    return {
        saveData,
        restoreData
    }
}