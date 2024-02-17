<template>
  <div :class="$style.avatarContainer">
    <img v-if="avatarUrl" :alt="altText" :class="$style.avatar" :src="avatarUrl"/>
    <SVGEditAvatar :class="$style.avatarEdit"/>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  avatarUrl: {
    type: String,
    default: '',
  },
  altText: {
    type: String,
    default: 'Аватар',
  }
});
</script>

<style lang="scss" module src="./ProfileAvatar.module.scss"></style>
