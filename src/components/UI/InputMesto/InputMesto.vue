<template>
  <label :class="$style.label">
    <input
        :class="$style.input"
        v-model="modelValue"
        @input="$emit('update:modelValue', $event.target)"
    />
    <span :class="$style.span" v-if="error">{{ errorMessage }}</span>
  </label>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelValue?: string,
  error?: boolean,
  errorMessage?: string
}>()
</script>

<style lang="scss" module src="./InputMesto.module.scss"></style>
