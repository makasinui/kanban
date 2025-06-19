<template>
    <div class="footer-actions">
        <ActionButton @click="changeSort">
            <img
                class="icon"
                :src="getIconSort"
            />
            <span>Sort</span>
            <span class="action-name">{{ getTitleSort }}</span>
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

interface IEmits {
    (event: 'sort', sort: 'asc' | 'desc'): void;
    (event: 'clearAll'): void;
}

interface IProps {
    sort?: 'asc' | 'desc';
}

const emit = defineEmits<IEmits>();
const props = defineProps<IProps>();

const sort = ref(props?.sort ?? 'asc');

const getIconSort = computed(() => {
    return sort.value === 'asc' ? IconSortAsc : IconSortDesc;
});

const getTitleSort = computed(() => {
    return sort.value === 'asc' ? 'Descending' : 'Ascending';
});

const changeSort = () => {
    sort.value = sort.value === 'asc' ? 'desc' : 'asc';
    emit('sort', sort.value);
};
</script>

<style lang="scss">
.footer-actions {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: auto;
    padding-top: 8px;
    justify-content: center;
    flex-shrink: 0;

    .action-name {
        color: rgba(0, 0, 0, 0.3);
        width: 75px;
    }
}
</style>