<template>
  <AuthFormWrapper
      :submitDisabled="(
      !v$.login.$model
        || !v$.password.$model
        || loading
    )"
      :submitError="error"
      submitTitle="Авторизация"
      @submit="submit"
  >
    <UIInputWrapper title="Логин">
      <UIInput
          v-model="data.login"
          placeholder="Введите логин"
      />
    </UIInputWrapper>
    <UIInputWrapper title="Пароль">
      <UIInput
          v-model="data.password"
          placeholder="Введите пароль"
          type="password"
      />
    </UIInputWrapper>
  </AuthFormWrapper>
</template>

<script lang="ts" setup>
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import { watch } from 'vue';

const { Api } = useApi();

const localePath = useLocalePath()

const loading = ref(false)
const error = ref<string | null>(null)
const data = reactive({
  login: "",
  password: "",
});

watch(data, () => {
  error.value = null
  loading.value = false;
})

const rules = {
  login: {
    required
  },
  password: {
    required
  }
};
const v$ = useVuelidate(rules, {
  login: toRef(data, 'login'),
  password: toRef(data, 'password')
})

async function submit() {
  try {
    loading.value = true;
    const {login, password} = data;

    const response = await Api.auth.signIn({
      email: login,
      password: password
    });

    if (Api.auth.isUser(response)) {
      return navigateTo(localePath('/profile'));
    }

    if (Api.auth.isAuthErrors(response)) {
      return error.value = "Неверно введен логин / пароль"
    }
    return error.value = "Произошла неизвестная ошибка"
  } catch (e) {

    error.value = 'Произошла ошибка при попытке авторизации';
    console.log(e)

  }

}
</script>

<style lang="scss" module src="./SignInForm.module.scss"></style>
