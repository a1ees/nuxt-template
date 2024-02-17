<template>
  <ProfileWrapper v-slot:userInfo>
    <section :class="$style.profile">
      <UIProfileAvatar
          :avatar-url="userProfile?.avatar"
          @click="toggleEditAvatar"
      />
      <div :class="$style.info">
        <h1 :class="$style.name">{{ userProfile?.name }}</h1>
        <SVGEditProfile
            :class="$style.profileEdit"
            @click="toggleEditProfile"
        />
        <p :class="$style.profession">{{ userProfile?.about }}</p>
      </div>
      <SVGAddCardButton :class="$style.addCard" @click="toggleCreateCard"/>
    </section>
    <ModalEditProfile
        :visible="isVisibleEditProfile"
        @submit="updateProfileData"
        @update:visible="toggleEditProfile"
    />
    <ModalEditAvatar
        :visible="isVisibleEditAvatar"
        @submit="updateProfileData"
        @update:visible="toggleEditAvatar"
    />
    <ModalCreateCard
        :visible="isVisibleCreateCard"
        @submit="updateCards"
        @update:visible="toggleCreateCard"
    />
  </ProfileWrapper>
</template>

<script lang="ts" setup>
import type {User} from "@/ts";
import {Api} from "@/api";
import Image from "@/components/Modal/Image/Image.vue";

const userProfile = ref<User | null>(null);

const isVisibleEditProfile = ref<boolean>(false);
const isVisibleEditAvatar = ref<boolean>(false);
const isVisibleCreateCard = ref<boolean>(false);

const { getCards } = useCards();

function toggleEditProfile() {
  isVisibleEditProfile.value = !isVisibleEditProfile.value
}

function toggleEditAvatar() {
  isVisibleEditAvatar.value = !isVisibleEditAvatar.value
}

function toggleCreateCard() {
  isVisibleCreateCard.value = !isVisibleCreateCard.value
}

async function updateProfileData() {
  userProfile.value = await Api.profile.getProfile();
}

async function updateCards() {
  await getCards()
}

onMounted(async () => {
  await updateProfileData()
});
</script>

<style lang="scss" module src="./UserInfo.module.scss"></style>
