<template>
  <ModalWrapper
      :button-disabled="v$.name.$error || v$.profession.$error || v$.$invalid"
      :class="$style.wrapper"
      :text-button="'Сохранить'"
      :title="'Редактировать профиль'"
      :visible="visible"
      @update:visible="closeModal"
      @submit-form="submit"
  >
    <UIInputWrapper :class="$style.label" :error="nameErrorMessage">
      <UIInput
          v-model="profileData.name"
          @input="v$.name.$touch()"
      />
    </UIInputWrapper>
    <UIInputWrapper :class="$style.label" :error="professionErrorMessage">
      <UIInput
          v-model="profileData.profession"
          @input="v$.profession.$touch()"
      />
    </UIInputWrapper>
  </ModalWrapper>
</template>

<script lang="ts" setup>
import {useVuelidate} from '@vuelidate/core';
import {helpers, minLength, required} from '@vuelidate/validators';
import {Api} from "@/api";

const props = defineProps<{
  visible?: boolean
}>()
const emit = defineEmits(['update:visible', 'submit'])

const profileData = reactive({
  name: '',
  profession: ''
});

function closeModal() {
  emit('update:visible')
}

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Текст обязателен', required),
    minLength: helpers.withMessage('Текст должен быть не менее 2 символов', minLength(2))
  },
  profession: {
    required: helpers.withMessage('Текст обязателен', required),
    minLength: helpers.withMessage('Текст должен быть не менее 2 символов', minLength(2))
  }
}));

const v$ = useVuelidate(rules, profileData);

const nameErrorMessage = computed(() => {
  return v$.value.name.$error
      ? v$.value.name.$errors[0]?.$message
      : null;
});

const professionErrorMessage = computed(() => {
  return v$.value.profession.$error
      ? v$.value.profession.$errors[0]?.$message
      : null;
});

async function submit() {
  try {
    const name = profileData.name;
    const about = profileData.profession;
    const userUpdate = await Api.profile.editProfile({name, about})

    if (userUpdate) {
      emit('submit')
      closeModal()
      return;
    }
    return console.log('Произошла ошибка получения данных')

  } catch (e) {
    console.log(e)
  }
}

async function fetchAndUpdateProfile() {
  try {
    const userInfo = await Api.profile.getProfile();
    profileData.name = userInfo?.name || '';
    profileData.profession = userInfo?.about || '';
  } catch (error) {
    console.error('Ошибка при получении данных профиля:', error);
  }
}

watch(
    () => props.visible,
    (newVal) => {
      if (newVal) {
        fetchAndUpdateProfile();
      }
    }
);
</script>

<style lang="scss" module src="./EditProfile.module.scss"></style>
