<template>
  <ProfileModalWrapper
      :button-disabled="v$.place.$error || v$.link.$error || v$.$invalid"
      :class="$style.wrapper"
      :text-button="'Сохранить'"
      :title="'Новое место'"
      :visible="visible"
      @close="closeModal"
      @submit="submit"
  >
    <UIInputWrapper :class="$style.label" :error="placeErrorMessage">
      <UIInput
          v-model="cardData.place"
          @input="v$.place.$touch()"
          placeholder="Название"
      />
    </UIInputWrapper>
    <UIInputWrapper :class="$style.label" :error="linkErrorMessage">
      <UIInput
          v-model="cardData.link"
          @input="v$.link.$touch()"
          placeholder="Ссылка на картинку"
      />
    </UIInputWrapper>
  </ProfileModalWrapper>
</template>

<script lang="ts" setup>
import {useVuelidate} from '@vuelidate/core';
import {helpers, minLength, required, url} from '@vuelidate/validators';
import {Api} from "@/api";

const props = defineProps<{
  visible?: boolean
}>()
const emit = defineEmits<{ close: [], submit: [] }>()

const cardData = reactive({
  place: '',
  link: ''
});

function closeModal() {
  emit('close')
  cardData.place = ''
  cardData.link = ''
  v$.value.$reset()
}

const rules = computed(() => ({
  place: {
    required: helpers.withMessage('Текст обязателен', required),
    minLength: helpers.withMessage('Текст должен быть не менее 2 символов', minLength(2))
  },
  link: {
    required: helpers.withMessage('Текст обязателен', required),
    minLength: helpers.withMessage('Текст должен быть не менее 2 символов', minLength(2)),
    url: helpers.withMessage('Введите URL.', url),
  }
}));

const v$ = useVuelidate(rules, cardData);

const placeErrorMessage = computed(() => {
  return v$.value.place.$error
      ? v$.value.place.$errors[0]?.$message
      : null;
});

const linkErrorMessage = computed(() => {
  return v$.value.link.$error
      ? v$.value.link.$errors[0]?.$message
      : null;
});

async function submit() {
  try {
    const newCard = await Api.cards.create(cardData.place, cardData.link)

    if (newCard) {
      emit('submit')
      closeModal()
      return console.log(newCard)
    }
    return console.log('Произошла ошибка при создании карточки')

  } catch (e) {
    console.log(e)
  }
}

</script>

<style lang="scss" module src="./CreateCard.module.scss"></style>
