<template>
    <div class="board">
        <Column
            v-for="column in boardColumns"
            :key="column.id"
            :id="column.id"
            :title="column.title"
            :cards="column.cards"
        />
    </div>
</template>

<script setup lang="ts">
import { useBoardStore } from '@/store/board';
import Column from './column/Column.vue';
import { storeToRefs } from 'pinia';

const boardStore = useBoardStore();

const { boardColumns } = storeToRefs(boardStore);
</script>

<style lang="scss" setup>
.board {
    height: 100%;
    display: flex;
    gap: 24px;
}
</style>