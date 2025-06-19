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

    const updateCard = (columnId: number, cardId: number, updatedCard: Partial<ICard>) => {
        const column = boardColumns.find(col => col.id === columnId);
        if (column) {
            const cardIndex = column.cards.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
                column.cards[cardIndex] = { ...column.cards[cardIndex], ...updatedCard };
            }
        }
    }

    const toggleDisableColumn = (columnId: number) => {
        const column = boardColumns.find(col => col.id === columnId);
        if (column) {
            column.disabled = !column.disabled;
        }
    }

    const deleteColumn = (columnId: number) => {
        const index = boardColumns.findIndex(col => col.id === columnId);
        if (index !== -1) {
            boardColumns.splice(index, 1);
        }
    }

    const sortColumnCards = (columnId: number, sort: 'asc' | 'desc') => {
        const column = boardColumns.find(col => col.id === columnId);
        if (column) {
            column.cards.sort((a, b) => {
                if (sort === 'asc') {
                    return a.title.localeCompare(b.title);
                } else {
                    return b.title.localeCompare(a.title);
                }
            });

            column.sort = sort;
        }
    }

    const clearColumnCards = (columnId: number) => {
        const column = boardColumns.find(col => col.id === columnId);
        if (column) {
            column.cards = [];
        }
    }

    return {
        boardColumns,
        addCard,
        addNewCard,
        updateCard,
        toggleDisableColumn,
        deleteColumn,
        sortColumnCards,
        clearColumnCards
    }
});