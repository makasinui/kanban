<template>
    <div class="column__actions">
        <ActionButton @click="emit('disableEditing')">
            <img
                class="icon"
                :src="IconPause"
                alt=""
            />
            Disable Editing
        </ActionButton>
        <ActionButton @click="emit('deleteColumn')">
            <img
                class="icon"
                :src="IconMinus"
                alt=""
            />
            Delete Column
        </ActionButton>
    </div>
</template>

<script setup lang="ts">
import { IconMinus, IconPause } from '@/assets/icons';
import ActionButton from '../ui/ActionButton.vue';

interface IEmits {
    (event: 'disableEditing'): void;
    (event: 'deleteColumn'): void;
}

const emit = defineEmits<IEmits>();
</script>

<style lang="scss">
.column__actions {
    display: flex;
            align-items: center;
            gap: 8px;
}
</style>