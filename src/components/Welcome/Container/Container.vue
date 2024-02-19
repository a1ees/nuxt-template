<template>
  <div :class="$style.content">
    <h1 :class="$style.title">{{ $t('welcome.title') }}</h1>
    <p :class="$style.text">
      {{ $t('welcome.description') }}
    </p>
    <div :class="$style.authButtons">
      <NuxtLink :to="localePath('/auth/sign-in')">
        <UIButton
            :class="$style.button"
        >
          {{ $t('welcome.buttons.signIn') }}
        </UIButton>
      </NuxtLink>
      <NuxtLink :to="localePath('/auth/sign-up')">
        <UIButton
            :class="$style.button"
        >
          {{ $t('welcome.buttons.signUp') }}
        </UIButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>

const localePath = useLocalePath();
</script>

<style lang="scss" module src="./Container.module.scss"></style>
