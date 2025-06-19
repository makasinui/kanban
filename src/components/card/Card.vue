<template>
    <article
        class="card"
        :class="{ 'card--editing': isEditing }"
        draggable="true"
        @dragstart="onDragStart"
        @contextmenu="onDeleteCard"
        @drop="onDrop"
        @dragover.prevent
        @dblclick="isEditing = !isEditing"
        @keypress.enter="saveChanges(true)"
    >
        <div class="card__title-wrapper">
            <h3
                class="card__title"
                :contenteditable="isEditing"
                :class="{ 'card__title--editing': isEditing }"
                @input="(ev) => onChange(ev, 'title')"
            >
                {{ form.title ? form.title : isEditing ? '' : 'Add title' }}
            </h3>
            <img
                :src="IconDragNDrop"
                class="icon icon--drag-n-drop"
            />
        </div>
        <p
            class="card__description"
            :class="{ 'card__description--editing': isEditing }"
            :contenteditable="isEditing"
            @input="(ev) => onChange(ev, 'description')"
        >
            {{ form.description ? form.description : isEditing ? '' : 'Add description' }}
        </p>
        <CardActions
            @save-changes="saveChanges"
            :disabled-save-changes="disabledSaveChanges"
            v-show="isEditing"
        />
    </article>
</template>

<script lang="ts" setup>
import type { ICard } from '@/types';
import CardActions from './CardActions.vue';
import { IconDragNDrop } from '@/assets/icons';
import { ref } from 'vue';
import { reactive } from 'vue';
import { useBoardStore } from '@/store/board';
import { computed } from 'vue';

interface IProps extends ICard {
    columnId: number;
    draggedId: number | null;
}

interface IEmits {
    (e: 'drag-start', id: number): void;
    (e: 'drop-card', id: number): void;
}

const boardStore = useBoardStore();

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const isEditing = ref(!!props.new);

const form = reactive({
    title: props.title,
    description: props.description,
});

const onChange = (event: Event, type: 'title' | 'description') => {
    const target = event.target as HTMLParagraphElement | HTMLHeadingElement;
    form[type] = target.textContent || '';
};

const emitChanges = () => {
    form.title = form.title.trim();
    form.description = form.description.trim();

    boardStore.updateCard(props.columnId, props.id, { ...form, new: false });
};

const saveChanges = (isSaved: boolean) => {
    if (isSaved) {
        isEditing.value = false;
        emitChanges();
        return;
    }
    if(props.new) {
        boardStore.deleteCard(props.columnId, props.id);
    }
    form.title = props.title;
    form.description = props.description;
    isEditing.value = false;

    emitChanges();
};

const onDragStart = () => {
    emit('drag-start', props.id);
};

const onDrop = () => {
    emit('drop-card', props.id);
};

const onDeleteCard = (e: MouseEvent) => {
    e.preventDefault();
    
    boardStore.deleteCard(props.columnId, props.id);
}

const disabledSaveChanges = computed(() => {
    return form.title === props.title && form.description === props.description && !props.new;
});
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
        width: 100%;
        word-break: break-all;
        max-height: 40px;  
        overflow: hidden;

        &-wrapper {
            display: flex;
            align-items: start;
            justify-content: space-between;

            .icon--drag-n-drop {
                cursor: move;
            }
        }

        &--editing {
            width: 100%;
            border-bottom: 1px solid #000;
        }
    }

    &__description {
        font-size: 14px;
        line-height: 140%;
        color: rgba(0, 0, 0, 0.3);
        padding-top: 8px;
        width: 100%;
        max-height: 50px;
        word-break: break-all;  
        overflow: hidden;

        &--editing {
            width: 100%;
            border-bottom: 1px solid #000;
        }
    }

    &:hover {
        transition: 0.3s all;
        box-shadow: 0 0 0 2px #007aff;
    }
}
</style>
