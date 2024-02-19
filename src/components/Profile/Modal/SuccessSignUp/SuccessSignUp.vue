<template>
  <div
      v-if="visible"
      :class="$style.container"
      @click="changeVisible"
  >
    <div :class="$style.modal">
      <div :class="$style.content">
        <p :class="$style.text">
          Регистрация аккаунта с почтой {{ email }} прошла успешно!
        </p>
        <button
            :class="$style.button"
            @click.stop="redirectToLogin"
            type="button"
        >
          Перейти к авторизации
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {useRouter} from 'vue-router';

const router = useRouter();
const props = defineProps<{
  visible?: boolean
  email?: string | null
}>()

const emit = defineEmits<{ close: [], submit: [] }>()

function changeVisible(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    emit('close');
  }
}

function redirectToLogin() {
  return navigateTo('/auth/sign-in')
}
</script>

<style lang="scss" module src="./SuccessSignUp.module.scss">

</style>
