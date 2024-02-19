<template>
  <AuthFormWrapper
    @submit="submit"
    submitTitle="Регистрация"
    :submitDisabled="(
      !v$.login.$model
        || !v$.password.$model
        || loading
    )"
    :submitError="error"
  >
    <UIInputWrapper title="Почта">
      <UIInput
        placeholder="Введите логин"
        v-model="data.login"
      />
    </UIInputWrapper>
    <UIInputWrapper title="Пароль">
      <UIInput
        type="password"
        placeholder="Введите пароль"
        v-model="data.password"
      />
    </UIInputWrapper>
    <ProfileModalSuccessSignUp
        :visible="visibleModal"
        @close="visibleModal = !visibleModal"
        :email="email"
    />
  </AuthFormWrapper>
</template>

<script lang="ts" setup>
import {useVuelidate} from '@vuelidate/core'
import {helpers, required} from '@vuelidate/validators'
import { watch } from 'vue';
import {isAuthErrors, isUser} from "@/common/funcs/auth";

const { Api } = useApi();

const loading = ref(false)
const visibleModal = ref(false)
const error = ref<string | null>(null)
const email = ref<string | null>(null)
const data = reactive({
  login: "",
  password: "",
});

watch(data, () => {
  error.value = null
  loading.value = false;
})

const rules = computed(() => ({
  login: {
    minLength: helpers.withMessage('Обязательное поле', required)
  },
  password: {
    minLength: helpers.withMessage('Обязательное поле', required)
  }
}))
const v$ = useVuelidate(rules, {
  login: toRef(data, 'login'),
  password: toRef(data, 'password')
})

async function submit() {
  try {
    loading.value = true;
    const {login, password} = data;

    const isSignUp = await Api.auth.signUp({
      email: login,
      password: password
    });

    if (isSignUp.success) {
      email.value = isSignUp.success
      return visibleModal.value = true;
    }

    if (isSignUp.authError) {
      return error.value = isSignUp.authError
    }

    return error.value = "Произошла неизвестная ошибка"

  } catch (e) {
    error.value = 'Произошла ошибка при попытке авторизации';
  } finally {
    loading.value = false;
  }

}
</script>

<style lang="scss" src="./SignUpForm.module.scss" module></style>
