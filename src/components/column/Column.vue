<template>
    <article
        class="column"
        :class="{ 'column--disabled': props.disabled }"
    >
        <div class="column__header">
            <div class="column__header-text">
                <h3
                    class="column__header-title"
                    :class="{ 'column__header-title--editable': props.new }"
                    :contenteditable="props.new"
                    @keypress.enter="changeColumnTitle"
                >
                    {{ title }}
                </h3>
                <span class="column__header-amount">{{ amountOfCards }}</span>
            </div>
            <HeaderActions
                :disabled="disabled && !isDisabledAllColumns"
                @disable-editing="onDisableColumn"
                @delete-column="onDeleteColumn"
            />
        </div>
        <div class="column__content">
            <div class="column__cards">
                <TransitionGroup
                    tag="div"
                    name="card-list"
                    class="column__cards-wrapper"
                >
                    <Card
                        v-for="card in props.cards"
                        :key="card.id"
                        :id="card.id"
                        :title="card.title"
                        :description="card.description"
                        :new="card.new"
                        :column-id="id"
                        :dragged-id="draggedCardId"
                        @drag-start="draggedCardId = $event"
                        @drop-card="(toCardId) => updateCardPosition(draggedCardId!, toCardId)"
                    />
                </TransitionGroup>
                <AddCard @add-card="onAddCard" />
                <span
                    class="column__cards-time"
                    v-if="lastEdited"
                    >Last edit: {{ minutesSinceLastEdit }} min ago</span
                >
            </div>
            <FooterActions
                :sort="sort"
                @sort="onSort"
                @clear-all="onClear"
            />
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { IColumn } from '@/types';
import HeaderActions from './HeaderActions.vue';
import AddCard from './AddCard.vue';
import FooterActions from './FooterActions.vue';
import Card from '../card/Card.vue';
import { useBoardStore } from '@/store/board';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

const boardStore = useBoardStore();

const props = defineProps<IColumn>();

const minutesSinceLastEdit = ref<number | null>(null);
const draggedCardId = ref<number | null>(null);

const { isDisabledAllColumns } = storeToRefs(boardStore);

const onAddCard = () => {
    boardStore.addNewCard(props.id);
};

const onDisableColumn = () => {
    boardStore.toggleDisableColumn(props.id);
};

const onDeleteColumn = () => {
    boardStore.deleteColumn(props.id);
};

const onSort = (sort: 'asc' | 'desc') => {
    boardStore.sortColumnCards(props.id, sort);
};

const onClear = () => {
    boardStore.clearColumnCards(props.id);
};

const updateCardPosition = (fromId: number, toId: number) => {
    boardStore.moveCard(props.id, fromId, toId);
};

const changeColumnTitle = (event: Event) => {
    const target = event.target as HTMLHeadingElement;
    const newTitle = target.textContent?.trim() || '';
    boardStore.updateColumnTitle(props.id, newTitle);
};

const updateTimeDiff = () => {
    if (props?.lastEdited) {
        const now = new Date();
        const diff = now.getTime() - new Date(props.lastEdited).getTime();
        minutesSinceLastEdit.value = Math.floor(diff / (1000 * 60));
    } else {
        minutesSinceLastEdit.value = null;
    }
};

const amountOfCards = computed(() => {
    return props.cards?.length || '';
});

onMounted(() => {
    updateTimeDiff();
    const interval = setInterval(updateTimeDiff, 60000);

    onUnmounted(() => clearInterval(interval));
});

watch(() => props.lastEdited, updateTimeDiff);
</script>

<style lang="scss">
.column {
    background: #eceff2;
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    min-height: 100%;
    position: relative;
    flex: 1 1 100%;
    overflow: hidden auto;
    min-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;

    &--disabled {
        pointer-events: none;

        &::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(255, 255, 255, 0.5);
            pointer-events: none;
            z-index: 1;
            border-radius: 12px;
        }
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-text {
            display: flex;
            gap: 8px;
            font-size: 13px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.3);
            line-height: 100%;
        }

        &-title {
            text-transform: uppercase;
            max-width: 110px;
            word-break: break-word;

            &--editable {
                min-width: 20px;
                max-width: 70px;
                display: inline-block;
                border-bottom: 1px solid #000;
            }
        }

        &-amount {
            color: rgba(0, 0, 0, 0.6);
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    &__cards {
        &-wrapper {
            display: flex;
            flex-direction: column;
            margin-top: 16px;
            gap: 8px;
        }

        &-time {
            font-size: 14px;
            font-weight: 600;
            padding-top: 16px;
            width: 100%;
            display: inline-block;
            text-align: center;
            color: rgba(0, 0, 0, 0.15);
        }
    }

    .card-list-move {
        transition: transform 0.2s ease;
    }
    
    .card-list-enter-from {
        opacity: 0;
        transform: translateY(20px);
    }

    .card-list-enter-active {
        transition: all 0.3s ease;
    }

    .card-list-enter-to {
        opacity: 1;
        transform: translateY(0);
    }

    .card-list-leave-from {
        opacity: 1;
        transform: translateY(0);
    }

    .card-list-leave-active {
        transition: all 0.3s ease;
    }

    .card-list-leave-to {
        opacity: 0;
        transform: translateY(-20px);
    }
}
</style>
