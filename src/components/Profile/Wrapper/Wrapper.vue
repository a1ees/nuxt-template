<template>
  <div :class="$style.container">
    <slot name="userInfo"></slot>
    <slot name="cards"></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" module src="./Wrapper.module.scss"></style>
