<template>
  <AuthFormWrapper
    @submit="submit"
    submitTitle="Регистрация"
    :submitDisabled="(
      !v$.login.$model
        || !v$.password.$model
        || loading
    )"
  >
    <UIInputWrapper title="Логин">
      <UIInput
        placeholder="Введите логин"
        v-model="data.login.value"
      />
    </UIInputWrapper>
    <UIInputWrapper title="Пароль">
      <UIInput
        type="password"
        placeholder="Введите пароль"
        v-model="data.password.value"
      />
    </UIInputWrapper>
  </AuthFormWrapper>
</template>

<script setup lang="ts">
  import { useVuelidate } from '@vuelidate/core'
  import { helpers, required } from '@vuelidate/validators'

  const { Api } = useApi()

  const emit = defineEmits<{
    error: [error: string | null]
  }>()

  // const { t } = useI18n()
  // const { loadProfile } = useProfile()
  // const localePath = useLocalePath()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = reactive({
    login: { value: "", error: null },
    password: { value: "", error: null }
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
    login: toRef(data.login, 'value'),
    password: toRef(data.password, 'value')
  })

  async function submit() {
    loading.value = true;

    const {login, password} = data;
    const response = await Api.auth.signUp({
      email: login.value,
      password: password.value
    });
    if (response) {
      loading.value = false;
    }
    if (!response) {
      loading.value = false;
    }
    // if (response?.code) {
    //   switch (response.code) {
    //     case 'INVALID_CREDENTIALS':
    //       const error = getError(AuthErrors.INVALID_CREDENTIALS)

    //       data.login.error = error
    //       data.password.error = error
    //       emit('error', `${t('main.error')}. ${error}`)
    //       break;
    //   }
    // }

    // if (response?.token) {
    //   loadProfile()
    //   return await navigateTo(localePath('/profile'))
    // }
  }
</script>

<style lang="scss" src="./SignUpForm.module.scss" module></style>
