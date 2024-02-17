<template>
  <div :class="$style.card">
    <SVGDeleteIcon v-if="isProfileOwner" :class="$style.deleteButton" @click="deleteCard(id)"/>
    <img :class="$style.cardImg"
         :src="image"
         alt=""
         @click="isVisibleImage = true"
    >
    <div :class="$style.content">
      <h2 :class="$style.title">{{ title }}</h2>
      <div :class="$style.cardLike">
        <SVGLikeIcon :class="$style.likeButton" @click="toggleLike(id, isLiked)" :liked="isLiked"/>
        <div :class="$style.likeSum">{{ likes }}</div>
      </div>
    </div>
  </div>
  <ModalImage :visible="isVisibleImage" :link="image" :title="title" @close="isVisibleImage = false" />
</template>

<script lang="ts" setup>
import {Api} from "@/api";

const props = defineProps<{
  likes: number
  image: string
  title: string
  owner: string
  id: string
  likesArr: string[] | []

}>()

const {getCards} = useCards()
const {profile} = useProfile();

const isVisibleImage = ref<boolean>(false);

const isProfileOwner = computed(() => profile.value?._id === props.owner);
const isLiked = computed(() => props.likesArr.some(i => i === profile.value?._id))

async function deleteCard(cardId: string) {
  try {
    await Api.cards.deleteCard(cardId)
    await getCards()
  } catch (e) {
    console.log(e)
  }
}

async function toggleLike(cardId: string, isLiked: boolean) {
  try {
    await Api.cards.likeCard(cardId, isLiked)
    await getCards()
  } catch (e) {
    console.error(e)
  }
}

</script>

<style lang="scss" module src="./CardTemplate.scss"></style>
