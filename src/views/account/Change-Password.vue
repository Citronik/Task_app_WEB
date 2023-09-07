<template>
  <v-card>
    <v-container
      class="room-pop mx-auto side"
      fluid
      alig
    >
    <v-row justify="start">
      <v-menu
        min-width="200px"
        rounded
      >
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-avatar
              cover="true"
              size="large"
            >
              <v-img
                :src="room.room_photo"
                :alt="room.room_name"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="text-h5">{{ room.id }}</span>
              </v-avatar>
              <h3>{{ room.room_name }}</h3>
              <p class="text-caption mt-1">
                {{ ownerName }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                v-if="room.creator_id == userStore.user.id"
                rounded
                variant="text"
              >
                Edit Room
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                rounded
                variant="text"
              >
                Disconnect
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
    <v-row justify="center">
      <v-btn
        rounded
        color="primary"
        class="mx-2"
        @click="joinRoom"
      >
        Join Room
      </v-btn>
      <v-btn
        rounded
        color="primary"
        class="mx-2"
        @click="leaveRoom"
      >
        Leave Room
      </v-btn>
    </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
  import { useUserStore } from "@/store/UserStore";
  import { useRoomStore } from "@/store/RoomStore";
  import { Room } from "@/models/Room";
  export default {
    setup() {
      const userStore = useUserStore();
      const roomStore = useRoomStore();
      return { userStore, roomStore };
    },
    data() {
      return {
        tab: null,
        room: new Room(),
        ownerName: "",
      };
    },
    methods: {
      joinRoom() {
        this.$router.push({ name: "Room", params: { id: this.room.id } });
      },
      leaveRoom() {
        this.$router.push({ name: "Home" });
      },
    },
  }
</script>

<style>

</style>
