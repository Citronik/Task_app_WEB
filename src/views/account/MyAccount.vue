<template>
  <v-container class="account-card">
    <v-row >
      <v-col cols="4" align-self="start">
        <v-sheet
          rounded="xl"
          class="mx-auto text-center pa-4 rounded-xl rounded-ts-0"
        >
          <h2 class=" text-wight-bold">
            Account Details
          </h2>
        </v-sheet>
      </v-col>
      <v-col cols="1" offset="6" align-self="center">
        <TheEditAccount
          :userID="user.id"
          :profileBio="user.bio"
          :firstName="user.firstName"
          :lastName="user.lastName"
        />
      </v-col>
      <v-col
          cols="12"
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1">
        <v-avatar size="150" :image="user.avatar"></v-avatar>
      </v-col>
      <v-col
          cols="12"
        >
      </v-col>
      <v-col cols="1">
        <v-sheet class="rounded-s-xl text-center">
          <h4>Profile Bio: </h4>
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet class="rounded-e-xl text-center">
          <h4>{{ user.bio }}</h4>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
        >
      </v-col>
      <v-col cols="1" >
        <v-sheet class="rounded-s-xl text-center">
          <h4>Username: </h4>
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet class="rounded-e-xl text-center">
          <h4>{{ user.username }}</h4>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
        >
      </v-col>
      <v-col cols="1">
        <v-sheet class="rounded-s-xl text-center">
          <h4>First Name: </h4>
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet class="rounded-e-xl text-center">
          <h4>{{ user.firstName }}</h4>
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet class="rounded-s-xl text-center">
          <h4>Last Name: </h4>
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet class="rounded-e-xl text-center">
          <h4>{{ user.lastName }}</h4>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
        >
      </v-col>
      <v-col cols="1">
        <v-sheet class="rounded-s-xl text-center">
          <h4>Email: </h4>
        </v-sheet>
      </v-col>
      <v-col cols="1">
        <v-sheet  class="rounded-e-xl text-center">
          <h4>{{ user.email }}</h4>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { useUserStore } from "@/store/UserStore";
import { User } from "@/models/User";
import TheEditAccount from "@/components/Main/TheEditAccount.vue";
export default {
  components: {
    TheEditAccount,
  },
  setup() {
    const userStore = useUserStore();
    //userStore.initialize();

    return { userStore };
  },
  data() {
    return {
      user: {} as User,
    };
  },
  async mounted() {
    this.userStore.fetchUser();
    this.userStore.fetchProfile();
    this.user = this.userStore.user || null;
    this.user.avatar = this.userStore.profile?.avatar ? import.meta.env.VITE_API_URL + "uploads/" +
      this.userStore.profile?.avatar.file.name : "/anonymous-avatar-icon-25.jpg";
    this.user.bio = this.userStore.profile?.bio || "No bio available";
  },
  watch: {
    "userStore": {
      deep: true,
      handler() {
        this.user = this.userStore.user || null;
        this.user.avatar = this.userStore.profile?.avatar ? import.meta.env.VITE_API_URL + "uploads/" +
          this.userStore.profile?.avatar.file.name : "/anonymous-avatar-icon-25.jpg";
        this.user.bio = this.userStore.profile?.bio || "No bio available";
      },
    },
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
  .v-sheet {
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
