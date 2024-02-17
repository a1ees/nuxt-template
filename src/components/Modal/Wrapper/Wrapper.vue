<template>
  <transition name="fade">
    <section v-if="visible" :class="$style.popup" @click="closeModal">
      <div :class="$style.container" @click.stop>
        <SVGCloseModal :class="$style.closeButton" @click="closeModal"/>
        <h2 :class="$style.title">{{ title }}</h2>
        <form :class="$style.form" @submit.prevent="emit('submit-form')">
          <slot></slot>
          <button
              :class="[$style.submitButton, { [$style.disabledButton]: buttonDisabled }]"
              :disabled="buttonDisabled"
              type="submit"
          >
            {{ textButton }}
          </button>
        </form>
      </div>
    </section>
  </transition>
</template>

<script lang="ts" setup>

const props = defineProps<{
  title?: string;
  textButton?: string;
  buttonDisabled?: boolean;
  visible?: boolean;
}>()

const emit = defineEmits(['update:visible', 'submit-form'])

function closeModal() {
  emit('update:visible', false)
}
</script>

<style lang="scss" module src="./Wrapper.module.scss"></style>
