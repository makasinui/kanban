<template>
    <div class="column">
        <div class="column__header">
            <div class="column__header-text">
                <h3 class="column__header-title">{{ title }}</h3>
                <span class="column__header-amount">{{ amountOfCards }}</span>
            </div>
            <HeaderActions />
        </div>
        <div class="column__content">
            <div class="column__cards">
                <div class="column__cards-wrapper">
                    <Card
                        v-for="card in props.cards"
                        :key="card.id"
                        :id="card.id"
                        :title="card.title"
                        :description="card.description"
                    />
                </div>
                <AddCard />
            </div>
            <FooterActions />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { ICard } from '@/types';
import HeaderActions from './HeaderActions.vue';
import AddCard from './AddCard.vue';
import FooterActions from './FooterActions.vue';
import Card from '../card/Card.vue';

interface IProps {
    title: string;
    cards: ICard[] | null;
}

const props = defineProps<IProps>();

const amountOfCards = computed(() => {
    return props.cards?.length || '';
});
</script>

<style lang="scss">
.column {
    background: #eceff2;
    max-width: 448px;
    padding: 16px;
    border-radius: 12px;
    min-height: 100%;
    position: relative;

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
        }

        &-amount {
            color: rgba(0, 0, 0, 0.6);
        }
    }

    &__cards {
        &-wrapper {
            display: flex;
            flex-direction: column;
            margin-top: 16px;
            gap: 8px;
        }
    }
}
</style>
