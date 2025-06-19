<template>
    <button class="primary-button" @click="emit('click')">
        <slot />
    </button>
</template>

<script lang="ts" setup>
interface IEmits {
    (event: 'click'): void;
}

const emit = defineEmits<IEmits>();
</script>

<style lang="scss">
.primary-button {
    color: rgba(0, 0, 0, 0.9);
    background: #fff;
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: 13px;
    line-height: 100%;
    padding: 4px 8px 4px 4px;
    font-weight: 600;
    border: none;
    border-radius: 50px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
}
</style>