<template>
  <div :class="$style.content">
    <h1 :class="$style.title">Проект Mesto</h1>
    <p :class="$style.text">
      Данный проект был разработан в рамках обучения на платформе Яндекс.Практикум. Это
      веб-приложение позволяет
      пользователям загружать картинки с подписями и взаимодействовать с ними
    </p>
    <div :class="$style.authButtons">
      <NuxtLink :to="localePath('/auth/sign-in')">
        <UIButton
            :class="$style.button"
        >
          {{ $t('Авторизация') }}
        </UIButton>
      </NuxtLink>
      <NuxtLink :to="localePath('/auth/sign-up')">
        <UIButton
            :class="$style.button"
        >
          {{ $t('Регистрация') }}
        </UIButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>

const localePath = useLocalePath();

</script>

<style lang="scss" module src="./WelcomeContainer.module.scss"></style>
