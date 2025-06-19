<template>
    <div class="footer-actions">
        <ActionButton @click="changeSort">
            <img
                class="icon"
                :src="getIconSort"
            />
            <span>Sort</span>
            <span>{{ getTitleSort }}</span>
        </ActionButton>
        <ActionButton>
            <img
                class="icon"
                :src="IconClose"
            />
            <span>Clear All</span>
        </ActionButton>
    </div>
</template>

<script setup lang="ts">
import { IconClose, IconSortAsc, IconSortDesc } from '@/assets/icons';
import ActionButton from '../ui/ActionButton.vue';
import { ref } from 'vue';
import { computed } from 'vue';

const sort = ref('asc');

const getIconSort = computed(() => {
    return sort.value === 'asc' ? IconSortAsc : IconSortDesc;
});

const getTitleSort = computed(() => {
    return sort.value === 'asc' ? 'Descending' : 'Ascending';
});

const changeSort = () => {
    sort.value = sort.value === 'asc' ? 'desc' : 'asc';
};
</script>

<style lang="scss">
.footer-actions {
    width: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    gap: 8px;
    bottom: 16px;
    left: 50%;
    justify-content: center;
    transform: translate(-50%, -50%);
}
</style>