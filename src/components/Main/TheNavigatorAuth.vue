<template>
  <v-navigation-drawer
    v-if="!!userStore.token"
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

    <v-list v-model:opened="open" density="comfortable" nav>
      <v-list-item prepend-icon="mdi-home-city" active-color="primary" title="Home" value="home" to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-account" active-color="primary" title="My Account" value="account" to="/my-account"></v-list-item>
      <v-sheet
            border
            rounded
          >
      <v-list-group value="Rooms" class="pl-0">
        <template v-slot:activator="{ props }">
          <v-list-item
            active-color="primary"
            v-bind="props"
            prepend-icon="mdi-account-group-outline"
            title="Rooms"
          ></v-list-item>
        </template>

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
            :to="`/rooms/${room.id}`"
            prepend-icon="mdi-location-enter"
          ></v-list-item>

          <v-list-item
            active-color="primary"
            title="Create"
            class="create-room"
            @click="createRoom()"
            prepend-icon="mdi-home-plus-outline"
          >
          </v-list-item>

        </v-list-group>
      </v-list-group>
    </v-sheet>
    </v-list>
    <v-divider></v-divider>
  </v-navigation-drawer>

</template>

<script lang="ts">
  import { useUserStore } from "@/store/UserStore";
  import { useRoomStore } from "@/store/RoomStore";
  import { useAlertStore } from '@/store/AlertStore';
  import { Room } from '@/models/Room';

export default{
  setup() {
    const userStore = useUserStore();
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
    this.avatar = this.userStore.profile?.avatar ? import.meta.env.VITE_API_URL + "uploads/" +
      this.userStore.profile?.avatar.file.name : "/anonymous-avatar-icon-25.jpg";
    await this.roomStore.fetchRooms();
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
    enterRoom(room : Room) {
      // Handle navigation to the specific room here
      this.$router.push({ name: "room", params: { id: room.id, slug:room.room_name } });

    },
    createRoom() {
      // Handle navigation to the create room here
    },
  },
};
</script>

<style>
  .rooms {
    padding-left: 0rem;
    padding-top: 0.1rem;
    border: 0px solid lightgray;

  }
  .v-list-item__prepend > .v-icon {
    margin-inline-end: 16px !important;
  }
</style>
