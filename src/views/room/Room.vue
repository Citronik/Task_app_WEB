<template >
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
  </v-container>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="end"
    >
      <v-tab :value="1">Overview</v-tab>
      <v-tab :value="2">Tasks</v-tab>
      <v-tab :value="3">Chat</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      ></v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import { useUserStore } from "@/store/UserStore";
import { useRoomStore } from "@/store/RoomStore";
import { Room } from "@/models/Room";
import uploadService from "@/services/UploadService";

export default {

  setup() {
    const userStore = useUserStore();
    const roomStore = useRoomStore();
    return { userStore, roomStore };
  },
  data() {
    return {
      room: {} as Room,
      tab: null,
      ownerName: "",
    };
  },
  async mounted() {
    await this.userStore.fetchUser();
    this.room = await this.roomStore.fetchRoom(+this.$route.params.id);
    const owner = await this.userStore.fetchUserByID(this.room.creator_id);
    this.ownerName = owner.username;
    this.room.room_photo = (await uploadService.getPhotoUrl(this.room.photo_id)).toString();
  },
  methods: {

  },
}
</script>

<style>

.room-pop {
  position: absolute;
  z-index: 999;
  margin: 0;
  box-shadow: 0 0 0 0;
  max-width: 50px;
}

.room-pop .v-tabs {
  bottom: 0;
  width: 100%;
  height: fit-content;
  z-index: 1;
}

.room-pop .v-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
}

</style>
