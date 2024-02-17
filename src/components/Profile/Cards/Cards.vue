<template>
  <ProfileWrapper v-slot:cards>
    <div :class="$style.container">
      <ProfileCardTemplate
          v-for="card in cards"
          :key="card._id"
          :owner="card.owner"
          :image="card.link"
          :likes="card.likes.length"
          :title="card.name"
          :id="card._id"
          :likesArr="card.likes"
      />
    </div>
  </ProfileWrapper>
</template>

<script lang="ts" setup>

const { cards, getCards } = useCards();

onMounted(async () => {
  await getCards()
});
</script>

<style lang="scss" module src="./Cards.module.scss"></style>

