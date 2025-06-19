<template>
    <article
        class="card"
        :class="{ 'card--editing': isEditing }"
        @dblclick="isEditing = !isEditing"
    >
        <div class="card__title-wrapper">
            <h3
                class="card__title"
                :contenteditable="isEditing"
                @input="(ev) => onChange(ev, 'title')"
            >
                {{ form.title ?? 'Add title' }}
            </h3>
            <img
                :src="IconDragNDrop"
                class="icon icon--drag-n-drop"
            />
        </div>
        <p
            class="card__description"
            :contenteditable="isEditing"
            @input="(ev) => onChange(ev, 'description')"
        >
            {{ form.description ?? 'Add description' }}
        </p>
        <CardActions @save-changes="saveChanges" v-show="isEditing" />
    </article>
</template>

<script lang="ts" setup>
import type { ICard } from '@/types';
import CardActions from './CardActions.vue';
import { IconDragNDrop } from '@/assets/icons';
import { ref } from 'vue';
import { reactive } from 'vue';

const props = defineProps<ICard>();

const isEditing = ref(false);

const form = reactive({
    title: props.title,
    description: props.description,
});

const onChange = (event: Event, type: 'title' | 'description') => {
    const target = event.target as HTMLParagraphElement | HTMLHeadingElement;
    form[type] = target.textContent || '';
};

const saveChanges = (isSaved: boolean) => {
    if (isSaved) {
        isEditing.value = false;
        return;
    }

    form.title = props.title;
    form.description = props.description;
    isEditing.value = false;
}
</script>

<style lang="scss">
.card {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    cursor: pointer;

    &--editing {
        box-shadow: 0 0 0 2px #007aff;
    }

    &__title {
        font-size: 14px;
        font-weight: 600;
        line-height: 140%;

        &-wrapper {
            display: flex;
            align-items: start;
            justify-content: space-between;
            
            .icon--drag-n-drop {
                cursor:move;
            }
        }

    }

    &__description {
        font-size: 14px;
        line-height: 140%;
        color: rgba(0, 0, 0, 0.3);
        padding-top: 8px;
    }

    &:hover {
        transition: 0.3s all;
        box-shadow: 0 0 0 2px #007aff;
    }
}
</style>
