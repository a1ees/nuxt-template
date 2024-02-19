<template>
  <ProfileWrapper v-slot:userInfo>
    <section :class="$style.profile">
      <UIProfileAvatar
          :avatar-url="profile?.avatar"
          @click="showEditAvatar = !showEditAvatar"
      />
      <div :class="$style.info">
        <h1 :class="$style.name">{{ profile?.name }}</h1>
        <SVGEditProfile
            :class="$style.profileEdit"
            @click="showEditProfile = !showEditProfile"
        />
        <p :class="$style.profession">{{ profile?.about }}</p>
      </div>
      <SVGAddCardButton :class="$style.addCard" @click="showCreateCard = !showCreateCard"/>
    </section>
    <ProfileModalEdit
        :visible="showEditProfile"
        @submit="updateProfileData"
        @close="showEditProfile = !showEditProfile"
    />
    <ProfileModalEditAvatar
        :visible="showEditAvatar"
        @submit="updateProfileData"
        @close="showEditAvatar = !showEditAvatar"
    />
    <ProfileModalCreateCard
        :visible="showCreateCard"
        @submit="updateCards"
        @close="showCreateCard = !showCreateCard"
    />
  </ProfileWrapper>
</template>

<script lang="ts" setup>

import {Api} from "@/api";

const { profile, loadProfile } = useProfile()

const showEditProfile = ref<boolean>(false);
const showEditAvatar = ref<boolean>(false);
const showCreateCard = ref<boolean>(false);

const { refresh } = useAsyncData('cards', async () => (
    await Api.cards.getAll()
))

const handleRefreshCard = () => {
  refresh();
};

async function updateProfileData() {
  await loadProfile()
}

async function updateCards() {
  handleRefreshCard()
}

onMounted(async () => {
  await updateProfileData()
});
</script>

<style lang="scss" module src="./UserInfo.module.scss"></style>
