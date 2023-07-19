<template>
  <v-card class="side" v-if="userStore.isLoggedIn">
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        app
        @click="rail = false"
      >
        <v-list-item
          :prepend-avatar="avatar"
          :title="username"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="My rooms" value="rooms" @click="getRooms"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="min-height: 100vh">

          <router-view></router-view>

      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
  import { useUserStore } from "../store/UserStore";
  import { useRoomStore } from "../store/RoomStore";
export default{
  setup() {
    const userStore = useUserStore();
    userStore.initialize();
    const roomStore = useRoomStore();
    return { userStore, roomStore };
  },
  data() {
    return {
      username: "",
      avatar: "",
      drawer: true,
      rail: false,
      rooms: [],
    };
  },
  mounted() {
    this.userStore.fetchUser();
    this.userStore.fetchProfile();
    this.username = this.userStore.user?.username || "Anonymous";
    this.avatar = this.userStore.profile?.avatar ? "http://127.0.0.1:3333/uploads/" + this.userStore.profile?.avatar.file.name : "/anonymous-avatar-icon-25.jpg";
  },
  watch: {
    userStore: {
      deep: true,
      handler() {
        this.username = this.userStore.user?.username || "Anonymous";
        this.avatar = this.userStore.profile?.avatar ? "http://127.0.0.1:3333/uploads/" + this.userStore.profile?.avatar.file.name : "/anonymous-avatar-icon-25.jpg";
      },
    },
    roomStore: {
      deep: true,
      handler() {
        this.rooms = this.roomStore.rooms;
      },
    },
  },

  methods: {
    async logout() {
      await this.userStore.signOut();
    },
    async getRooms() {
      await this.roomStore.fetchRooms();
      this.$router.push({ name: "rooms" });
    },
  },
};
</script>

<style>
  #side {
    grid-area: side;
    padding: 1rem;
  }
</style>
