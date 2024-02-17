<template>
  <ProfileUserInfo />
  <ProfileCards />
</template>

<script lang="ts" setup>
import {Guard} from '@/middleware/guard'

const {t} = useI18n()

definePageMeta({
  layout: 'profile',
  middleware: [Guard('auth')]
})

useSeoMeta({
  title: ('Профиль')
})
</script>

<style lang="scss" module src="./main.module.scss"></style>
