<template>
    <div class="board__actions">
        <div class="actions">
            <ActionButton>
                <img :src="IconPlus" />
                <span>New column</span>
            </ActionButton>
            <ActionButton>
                <img :src="IconRandom" />
                <span>Shuffle Columns</span>
            </ActionButton>
            <ActionButton>
                <img :src="IconRandom" />
                <span>Shuffle Cards</span>
            </ActionButton>
            <ActionButton>
                <img :src="IconPause" />
                <span>Disable Editing</span>
            </ActionButton>
        </div>
        <span class="board__actions-title">Board Actions</span>
    </div>
</template>
<script setup lang="ts">
import { IconPause, IconPlus, IconRandom } from '@/assets/icons';
import ActionButton from '../ui/ActionButton.vue';
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
