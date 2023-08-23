<template>
  <div id="account" class="wrapper">
    <v-card class="account-card">
      <v-card-title class="headline">Account Details</v-card-title>
      <v-card-text>
        <!-- User profile details -->
        <v-avatar size="150" :image="user.avatar">

        </v-avatar>
        <p>Username: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
        <p>First Name: {{ user.first_name }}</p>
        <p>Last Name: {{ user.last_name }}</p>
        <span>Profile Bio: {{ user.bio }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "@/store/UserStore";
import { User } from "@/models/User";
export default {
  setup() {
    const userStore = useUserStore();
    userStore.initialize();

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
  #account {
    background-color: #fff;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  .account-card {
    background-color: #90A4AE;
    color: #fff;
    width: 99.9%;
    height: 99.9%;
  }
</style>
