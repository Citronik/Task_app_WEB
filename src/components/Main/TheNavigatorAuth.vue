<template>
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

        </v-list-group>

        <TheCreateRoom/>

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
  import TheCreateRoom from '@/components/models/room/TheCreateRoom.vue';

export default{
  name: "TheNavigatorAuth",
  components: {
    TheCreateRoom,
  },
  setup() {
    const userStore = useUserStore();
    const roomStore = useRoomStore();
    const alertStore = useAlertStore();
    const drawer = userStore.isLoggedIn;
    return { userStore, roomStore, alertStore, drawer };
  },
  data() {
    return {
      username: "Anonymous",
      avatar: "/anonymous-avatar-icon-25.jpg",
      rail: false,
      rooms: [] as Room[],
      open: ["Rooms"],
    };
  },
  async mounted() {

  },
  watch: {
    "userStore.isLoggedIn": {
      deep: true,
      immediate: true,
      async handler(isValidSession) {
        if (isValidSession) {
          this.drawer = this.userStore.isLoggedIn
          await this.userStore.getUserFotoUrl();
          this.username = this.userStore.user?.username || "Anonymous";
          this.avatar = this.userStore.user?.avatar || "/anonymous-avatar-icon-25.jpg";
          await this.roomStore.fetchRooms();
        }
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
