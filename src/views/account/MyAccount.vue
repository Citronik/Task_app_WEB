<template>
  <v-container class="account-card">
    <v-row >
      <v-col cols="4" align-self="start">
        <v-sheet id="edit"
          rounded="xl"
          class="mx-auto text-center pa-4 rounded-xl rounded-ts-0"
        >
          <h2 class=" text-wight-bold">
            Account Details
          </h2>
        </v-sheet>
      </v-col>
      <v-col cols="1" offset="6" align-self="center">
        <TheEditAccount />
      </v-col>
      <v-col
          cols="12"
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1">
        <v-avatar size="150" :image="userStore.profilePicture"></v-avatar>
      </v-col>
      <v-col
          cols="12"
        >
      </v-col>
      <v-col cols="1">
        <v-sheet id="edit" class="rounded-s-xl text-center">
          <h4>Profile Bio: </h4>
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet id="edit" class="rounded-e-xl text-center">
          <h4>{{ userStore.user.profile.bio }}</h4>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
        >
      </v-col>
      <v-col cols="1" >
        <v-sheet id="edit" class="rounded-s-xl text-center">
          <h4>Username: </h4>
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet id="edit" class="rounded-e-xl text-center">
          <h4>{{ userStore.user.username }}</h4>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
        >
      </v-col>
      <v-col cols="1">
        <v-sheet id="edit" class="rounded-s-xl text-center">
          <h4>First Name: </h4>
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet id="edit" class="rounded-e-xl text-center">
          <h4>{{ userStore.user.firstName }}</h4>
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet id="edit" class="rounded-s-xl text-center">
          <h4>Last Name: </h4>
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet id="edit" class="rounded-e-xl text-center">
          <h4>{{ userStore.user.lastName }}</h4>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
        >
      </v-col>
      <v-col cols="1">
        <v-sheet id="edit" class="rounded-s-xl text-center">
          <h4>Email: </h4>
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet id="edit"  class="rounded-e-xl text-center" v-model="userStore.user.email">
          <h4>{{ userStore.user.email }}</h4>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { useUserStore } from "@/store/UserStore";
import TheEditAccount from "@/components/Main/TheEditAccount.vue";
export default {
  components: {
    TheEditAccount,
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  async mounted() {
    this.userStore.fetchUser();
  },
  methods: {},
}
</script>

<style>

  .account-card {
    background-color: #90A4AE;
    color: #fff;
    height: 100%;
    width: 100%;
    flex-direction: column;
  }
  #edit.v-sheet {
    color: #ffffffc7;
    background-color: #7593a1;
    border: 1px solid #313131;
  }
  #edit-btn {
    color: #ffffffc7;
    background-color: #7593a1;
    border: 1px solid #313131;
  }
</style>
