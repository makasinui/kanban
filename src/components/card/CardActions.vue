
<template>
    <div class="card__actions">
        <ActionButton :disabled="disabledSaveChanges" @click="emit('save-changes', true)">
            <img :src="IconLighting" alt="save" >
            <span>Save Changes</span>
        </ActionButton>
        <ActionButton @click="emit('save-changes', false)">
            <img :src="IconMinus" alt="save" >
            <span>Cancel</span>
        </ActionButton>
    </div>
</template>
<script setup lang="ts">
import { IconLighting, IconMinus } from '@/assets/icons';
import ActionButton from '../ui/ActionButton.vue';

interface IEmits {
    (event: 'save-changes', isSaved: boolean): void;
}

interface IProps {
    disabledSaveChanges?: boolean;
}

const emit = defineEmits<IEmits>();
defineProps<IProps>();
</script>

<style lang="scss">
.card__actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;
}
</style>