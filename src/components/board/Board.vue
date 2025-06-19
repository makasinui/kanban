<template>
    <div class="board">
        <div class="board__columns">
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
            />
        </div>
        <BoardActions />
    </div>
</template>

<script setup lang="ts">
import { useBoardStore } from '@/store/board';
import Column from '../column/Column.vue';
import { storeToRefs } from 'pinia';
import BoardActions from './BoardActions.vue';

const boardStore = useBoardStore();

const { boardColumns } = storeToRefs(boardStore);
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
}
</style>
