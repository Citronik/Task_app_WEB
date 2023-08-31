<template >
  <TheRoomCardPop
    :v-bind="room"
    position="top-left"
  />
  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
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
      >

      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import { useUserStore } from "@/store/UserStore";
import { useRoomStore } from "@/store/RoomStore";
import { Room } from "@/models/Room";
import Vue from "vue";
import TheRoomCardPop from "@/components/models/TheRoomCardPop.vue";
export default {
  name: "App",
  components: {
    TheRoomCardPop,
  },
  setup() {
    const userStore = useUserStore();
    const roomStore = useRoomStore();
    return { userStore, roomStore };
  },
  data() {
    return {
      room: {} as Room,
      tab: null,
      owner_Name: "",
      pageTabs: [{ id: 1, pageName: 'Overview' }, { id: 1, pageName: 'Tasks' }, { id: 1, pageName: 'Chat' }] as any[],
    };
  },
  async mounted() {
    await this.userStore.fetchUser();
    this.room = await this.roomStore.fetchRoom(this.$route.params.id);

  },
  methods: {},
}
</script>

<style>

</style>
