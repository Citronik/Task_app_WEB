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

        <v-list v-model:opened="open" density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" active-color="primary" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" active-color="primary" title="My Account" value="account"></v-list-item>
          <v-list-group value="Rooms">
            <template v-slot:activator="{ props }">
              <v-list-item
                active-color="primary"
                v-bind="props"
                prepend-icon="mdi-account-group-outline"
                title="Rooms"
              ></v-list-item>
            </template>

            <v-list-item
              active-color="primary"
              v-bind="props"
              title="Create room"
              @click="createRoom()"
            ></v-list-item>

            <v-list-group value="My rooms">
              <template v-slot:activator="{ props }">
                <v-list-item
                  active-color="primary"
                  v-bind="props"
                  title="My rooms"
                ></v-list-item>
              </template>

              <v-list-item
                v-for="room in rooms"
                :key="room.id"
                :title="room.room_name"
                :value="room.room_name"
                @click="enterRoom(room)"
              ></v-list-item>

            </v-list-group>
          </v-list-group>
        </v-list>
        <v-divider></v-divider>
      </v-navigation-drawer>
      <v-main style="min-height: 100vh">

          <router-view></router-view>

      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
  import { useUserStore } from "../../store/UserStore";
  import { useRoomStore } from "../../store/RoomStore";
  import { useAlertStore } from '@/store/AlertStore';
  import { Room } from '@/models/Room';
export default{
  setup() {
    const userStore = useUserStore();
    userStore.initialize();
    const roomStore = useRoomStore();
    const alertStore = useAlertStore();
    return { userStore, roomStore, alertStore };
  },
  data() {
    return {
      username: "",
      avatar: "",
      drawer: true,
      rail: false,
      rooms: [] as Room[],
      open: ["Rooms"],
    };
  },
  async mounted() {
    this.userStore.fetchUser();
    this.userStore.fetchProfile();
    this.username = this.userStore.user?.username || "Anonymous";
    this.avatar = this.userStore.profile?.avatar ? import.meta.env.VITE_API_URL + "uploads/" + this.userStore.profile?.avatar.file.name : "/anonymous-avatar-icon-25.jpg";
    await this.getRooms();
  },
  watch: {
    userStore: {
      deep: true,
      handler() {
        this.username = this.userStore.user?.username || "Anonymous";
        this.avatar = this.userStore.profile?.avatar ? import.meta.env.VITE_API_URL + "uploads/" +
         this.userStore.profile?.avatar.file.name : "/anonymous-avatar-icon-25.jpg";
      },
    },
    "roomStore.rooms": {
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
      const {res, err} = await this.roomStore.fetchRooms();
      console.log(res);
      if (err) {
        console.log(err);
        this.alertStore.addNotification({
            id: Date.now(),
            title: "Fetching rooms Error",
            text: "Error fetching rooms",
            type: "error",
          });
      }

      //this.$router.push({ name: "rooms" });
    },
    enterRoom(room : Room) {
      // Handle navigation to the specific room here
      this.$router.push({ name: "room", params: { id: room.id } });
    },
    createRoom() {
      // Handle navigation to the create room here
    },
  },
};
</script>

<style>
  #side {
    grid-area: side;
    padding: 1rem;
  }
  .rooms {
    padding-left: 0rem;
    padding-top: 0.1rem;
    border: 0px solid lightgray;

  }
</style>
