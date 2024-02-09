<template>
  <header :class="$style.header">
    <NuxtLink :to="localePath('/')">
      <SVGMesto :class="$style.logo" />
    </NuxtLink>
    <div :class="$style.cw">
    </div>
  </header>
</template>

<script setup lang="ts">
  const { Api } = useApi()
  const { theme } = useTheme()
  const { profile, isLoading: isProfileLoading } = useProfile()
  const localePath = useLocalePath()

  async function signOut() {
    // const response = await Api.auth.signOut()

    // if (response) {
    //   await navigateTo(localePath('/'), { external: true })
    // }
  }
</script>

<style lang="scss" src="./Header.module.scss" module></style>
