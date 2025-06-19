<template>
    <div class="column__actions">
        <ActionButton :class="{'action--enable': disabled}" @click="emit('disableEditing')">
            <img
                class="icon"
                :src="disabledIcon"
                alt=""
            />
            {{ disabledText }}
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
import { IconMinus, IconPause, IconPlay } from '@/assets/icons';
import ActionButton from '../ui/ActionButton.vue';
import { computed } from 'vue';

interface IEmits {
    (event: 'disableEditing'): void;
    (event: 'deleteColumn'): void;
}

interface IProps {
    disabled?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const disabledIcon = computed(() => {
    return props.disabled ? IconPlay : IconPause;
});

const disabledText = computed(() => {
    return props.disabled ? 'Unlock Column' : 'Disable Editing';
});
</script>

<style lang="scss">
.column__actions {
    display: flex;
    align-items: center;
    gap: 8px;

    .action--enable {
        pointer-events: all;
        position: relative;
        z-index: 2;
    }
}
</style>