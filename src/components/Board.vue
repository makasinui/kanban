<template>
    <div class="board">
        <Column
            title="asd"
            :cards="[
                { id: 1, title: 'Add the ability to self-destruct when the user uses internet explorer 8', description: 'Add Description' },
                { id: 2, title: 'Add the ability to self-destruct when the user uses internet explorer 8', description: 'Add Description' },
            ]"
        />
    </div>
</template>

<script setup lang="ts">
import Column from './column/Column.vue';
</script>

<style lang="scss" setup>
.board {
    height: 100%;
}
</style>