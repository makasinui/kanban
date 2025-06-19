<template>
    <button class="add-card" @click="emit('add-card')">
        <img
            :src="IconPlus"
            class="icon add-card__icon"
        />
        <span>New Card</span>
    </button>
</template>
<script setup lang="ts">
import { IconPlus } from '@/assets/icons';

interface IEmits {
    (event: 'add-card'): void;
}

const emit = defineEmits<IEmits>();
</script>

<style lang="scss">
.add-card {
    width: 100%;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 0;
    background: #CED9E3;
    margin-top: 8px;
    gap: 8px;

    &__icon {
        object-fit: none;
    }
}
</style>
