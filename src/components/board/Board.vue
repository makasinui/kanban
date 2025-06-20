<template>
    <div class="board">
        <TransitionGroup v-if="isLoaded" tag="div" name="column-list" class="board__columns">
            <Column
                v-for="column in boardColumns"
                :key="column.id"
                :id="column.id"
                :title="column.title"
                :cards="column.cards"
                :disabled="column.disabled"
                :sort="column.sort"
                :last-edited="column.lastEdited"
                :new="column.new"
                @drag-start="onDragStart"
                @drop-column="onDropColumn"
            />
        </TransitionGroup>
        <BoardActions />
    </div>
</template>

<script setup lang="ts">
import { useBoardStore } from '@/store/board';
import Column from '../column/Column.vue';
import { storeToRefs } from 'pinia';
import BoardActions from './BoardActions.vue';
import { ref } from 'vue';

const boardStore = useBoardStore();

const { boardColumns, isLoaded } = storeToRefs(boardStore);
const draggedColumnId = ref<number | null>(null);
const draggedCardId = ref<number | null>(null);

const onDragStart = (columnId: number, cardId: number) => {
    draggedCardId.value = cardId;
    draggedColumnId.value = columnId;
}

const onDropColumn = (columnId: number, cardId: number, to?: number) => {
    if(columnId === draggedColumnId.value && to) {
        boardStore.moveCard(columnId, draggedCardId.value!, to);
        return;
    }

    boardStore.moveBetweenColumns(draggedColumnId.value!, columnId, draggedCardId.value!, cardId);
}
</script>

<style lang="scss" setup>
.board {
    height: 100%;
    display: flex;
    flex-direction: column;
    &__columns {
        display: flex;
        gap: 24px;
        height: 100%;
        min-height: 0;
        max-width: 100vw;
        overflow-x: auto;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 45px;
        left: 0;
        right: 0;
        height: 70px;
        z-index: 0;
        filter: blur(5px);
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.08), transparent);
        pointer-events: none;
    }

    .column-list-enter-from {
        opacity: 0;
        transform: translateY(20px);
    }

    .column-list-enter-active {
        transition: all 0.3s ease;
    }

    .column-list-enter-to {
        opacity: 1;
        transform: translateY(0);
    }

    .column-list-leave-from {
        opacity: 1;
        transform: translateY(0);
    }

    .column-list-leave-active {
        transition: all 0.3s ease;
    }

    .column-list-leave-to {
        opacity: 0;
        transform: translateY(-20px);
    }
}
</style>
