import type { ICard, IColumn } from "@/types";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useBoardStore = defineStore('board', () => {
    const boardColumns = reactive<IColumn[]>([
        {
            id: 1,
            title: 'todo',
            cards: []
        },
        {
            id: 2,
            title: 'in progress',
            cards: []
        },
        {
            id: 3,
            title: 'done',
            cards: []
        }
    ]);

    const addCard = (columnId: number, card: ICard) => {
        const column = boardColumns.find(col => col.id === columnId);
        if (column) {
            column.cards.push(card);
        }
    };

    const addNewCard = (columnId: number) => {
        const newCard: ICard = {
            id: Date.now(),
            title: '',
            description: '',
            new: true
        };
        addCard(columnId, newCard);
    }

    return {
        boardColumns,
        addCard,
        addNewCard
    }
});