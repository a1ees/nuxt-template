<template>
  <header :class="$style.header">
    <div :class="$style.content">
      <NuxtLink :to="localePath('/')">
        <SVGMesto :class="$style.logo"/>
      </NuxtLink>
      <div v-if="profile && !isLoading" :class="$style.cw">
        <p :class="$style.email">{{ profile.email }}</p>
        <button :class="$style.button" @click="signOut">Выйти</button>
      </div>
      <UILoader v-if="isPathProfile" :is-loading="isLoading"/>
    </div>
  </header>
</template>

<script lang="ts" setup>

const { Api } = useApi();
const route = useRoute();
const { profile, isLoading } = useProfile({prefetch: true});
const localePath = useLocalePath();

const isPathProfile = computed(() => route.path === '/profile');

async function signOut() {
  try {
    const response = await Api.auth.signOut();
    if (response) {
      profile.value = null;
      navigateTo(localePath('/'));
    }
  } catch (error) {
    console.error('Error sign out:', error);
  }
}
</script>

<style lang="scss" module src="./Header.module.scss"></style>
