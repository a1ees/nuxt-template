<template>
  <transition name="fade">
    <div v-if="visible" :class="$style.container" @click="emit('close')">
      <div :class="$style.content" @click.stop="">
        <SVGCloseModal :class="$style.closeButton" @click="emit('close')"/>
        <img
            :class="$style.image"
            :src="link"
            alt=""
        >
        <p :class="$style.description">{{ title }}</p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const emit = defineEmits(['close'])
const props = defineProps<{
  title?: string;
  link?: string;
  visible?: boolean;
}>()
</script>

<style lang="scss" module src="./Image.module.scss"></style>
