<template>
    <footer class="board__actions">
        <div class="actions">
            <ActionButton @click="boardStore.addNewColumn">
                <img :src="IconPlus" />
                <span>New column</span>
            </ActionButton>
            <ActionButton @click="boardStore.shuffleColumns">
                <img :src="IconRandom" />
                <span>Shuffle Columns</span>
            </ActionButton>
            <ActionButton @click="boardStore.shuffleCards">
                <img :src="IconRandom" />
                <span>Shuffle Cards</span>
            </ActionButton>
            <ActionButton @click="boardStore.toggleDisableEditing">
                <img :src="disabledIcon" />
                <span>{{ disabledText }}</span>
            </ActionButton>
        </div>
        <span class="board__actions-title">Board Actions</span>
    </footer>
</template>
<script setup lang="ts">
import { IconPause, IconPlay, IconPlus, IconRandom } from '@/assets/icons';
import ActionButton from '../ui/ActionButton.vue';
import { useBoardStore } from '@/store/board';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const boardStore = useBoardStore();

const { isDisabledAllColumns } = storeToRefs(boardStore);

const disabledIcon = computed(() => {
    return isDisabledAllColumns.value ? IconPlay : IconPause;
});

const disabledText = computed(() => {
    return isDisabledAllColumns.value ? 'Enable Editing' : 'Disable Editing';
});
</script>

<style lang="scss">
.board__actions {
    margin: 24px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    position: relative;
    z-index: 1;

    &-title {
        font-size: 14px;
        font-weight: 600;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.05));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .actions {
        align-items: center;
        display: flex;
        gap: 8px;
    }
}
</style>
