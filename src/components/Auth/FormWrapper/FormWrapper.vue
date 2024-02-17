<template>
  <form
      id="form"
      :class="[$style.form, $style[theme]]"
      @submit.prevent="submit"
  >
    <div v-if="description" :class="$style.description">
      {{ description }}
    </div>
    <div :class="$style.inputs">
      <slot></slot>
    </div>
    <div
        v-if="cancelTitle || submitTitle"
        :class="$style.buttons"
    >
      <UIButton
          v-if="cancelTitle"
          fill
          type="stroked"
          uppercase
          @click.stop.prevent="cancel"
      >
        {{ cancelTitle }}
      </UIButton>
      <UIButton
          v-if="submitTitle"
          :disabled="!!(legalTitle && !legal) || submitDisabled"
          fill
          style="white-space: nowrap"
          type="black"
          uppercase
      >
        {{ submitTitle }}
      </UIButton>
    </div>
    <span
        :class="$style.error"
        v-if="submitError"
    >
      {{ submitError }}
    </span>
  </form>
</template>

<script lang="ts" setup>
const emit = defineEmits<{ submit: [], cancel: [] }>()
const props = defineProps<{
  cancelTitle?: string
  submitTitle?: string
  submitDisabled?: boolean
  description?: string
  legalTitle?: string
  submitError?: string | null
}>()

const legal = ref(false)

function changeLegal(checked: boolean) {
  legal.value = checked
}

const {theme} = useTheme()

function cancel() {
  emit('cancel')
}

function submit() {
  if (props?.legalTitle && !legal.value) return

  emit('submit')
}
</script>

<style lang="scss" module src="./FormWrapper.module.scss"></style>
