import type { ICard, IColumn } from "@/types";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

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

    const isDisabledAllColumns = ref(false);

    const addCard = (columnId: number, card: ICard) => {
        const column = boardColumns.find(col => col.id === columnId);
        if (column) {
            column.cards.push(card);

            column.lastEdited = new Date();
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

            column.lastEdited = new Date();
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

    const addNewColumn = () => {
        boardColumns.push({
            id: Date.now(),
            title: '',
            cards: [],
            new: true
        });
    }

    const updateColumnTitle = (columnId: number, title: string) => {
        const column = boardColumns.find(col => col.id === columnId);
        if (column) {
            column.title = title;
            column.new = false;
            column.lastEdited = new Date();
        }
    }

    const shuffleColumns = () => {
        for (let i = boardColumns.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [boardColumns[i], boardColumns[j]] = [boardColumns[j], boardColumns[i]];
        }
    }
    
    const shuffleCards = () => {
        boardColumns.forEach(column => {
            for (let i = column.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [column.cards[i], column.cards[j]] = [column.cards[j], column.cards[i]];
            }
        });
    }

    const toggleDisableEditing = () => {
        boardColumns.forEach(column => {
            column.disabled = !isDisabledAllColumns.value;
        });

        isDisabledAllColumns.value = !isDisabledAllColumns.value;
    }

    return {
        boardColumns,
        isDisabledAllColumns,
        addCard,
        addNewCard,
        updateCard,
        toggleDisableColumn,
        deleteColumn,
        sortColumnCards,
        clearColumnCards,
        addNewColumn,
        updateColumnTitle,
        shuffleColumns,
        shuffleCards,
        toggleDisableEditing
    }
});