<template>
  <ProfileModalWrapper
      :button-disabled="v$.avatar.$error || v$.$invalid"
      :class="$style.wrapper"
      :text-button="'Да'"
      :title="'Обновить аватар'"
      :visible="visible"
      @close="closeModal"
      @submit="submit"
  >
    <UIInputWrapper :class="$style.label" :error="avatarErrorMessage">
      <UIInput
          v-model="avatar"
          @input="v$.avatar.$touch()"
      />
    </UIInputWrapper>
  </ProfileModalWrapper>
</template>

<script lang="ts" setup>
import {useVuelidate} from "@vuelidate/core";
import {helpers, required, url} from '@vuelidate/validators';
import {Api} from "@/api";

const props = defineProps<{
  visible?: boolean
}>()

const avatar = ref<string>('');

const emit = defineEmits<{ close: [], submit: [] }>()

const rules = {
  avatar: {
    url: helpers.withMessage('Необходимо вставить ссылку на фото', url),
    required: helpers.withMessage('Текст обязателен', required),
  }
}
const v$ = useVuelidate(rules, {avatar});

const avatarErrorMessage = computed(() => {
  const avatarErrors = v$.value.avatar.$errors;
  return avatarErrors.length ? avatarErrors[0].$message : null;
});

async function submit() {
  try {
    const updateAvatar = await Api.profile.editAvatar(avatar.value)
    if (updateAvatar) {
      emit('submit')
      closeModal()
      return;
    }
    return console.log('Произошла ошибка получения данных')
  } catch (e) {
    console.log(e)
  }
}

function closeModal() {
  emit('close');
  avatar.value = '';
  v$.value.$reset()
}
</script>

<style lang="scss" module src="./EditAvatar.module.scss"></style>
