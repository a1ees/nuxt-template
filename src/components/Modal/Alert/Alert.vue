<template>
  <UIModal :visible="visible" @hide="$emit('hide')">
    <div :class="$style.modal">
      <ModalAssetsTitle center>
        {{ title || 'Уведомление' }}
      </ModalAssetsTitle>
      <div :class="$style.body">
        <span
            v-for="text in body"
            :data-type="text.type"
        >
          {{ text.content }}&nbsp;
        </span>
      </div>
      <div :class="$style.buttons">
        <UIButton fill type="stroked" @click="submit">
          {{ submitTitle || 'Ок' }}
        </UIButton>
        <NuxtLink v-if="link?.name && link?.href" :class="$style.link" :to="localePath(link.href)" target="_blank">
          <UIButton>
            {{ link.name }}
          </UIButton>
        </NuxtLink>
      </div>
    </div>
  </UIModal>
</template>

<script lang="ts" setup>
const emit = defineEmits<{ hide: [] }>()
const props = defineProps<{
  visible?: boolean,
  title?: string,
  submitTitle?: string,
  body?: { content: string, type?: 'default' | 'red' | 'bold' }[]
  link?: { name: string; href: string }
}>()

const localePath = useLocalePath()

function submit() {
  emit('hide')
}
</script>

<style lang="scss" module src="./Alert.module.scss"></style>
