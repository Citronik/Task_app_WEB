<template>
  <v-container
    class="mx-auto"
    fluid
    style="height: 300px"
  >
    <v-row justify="center">
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
              color="brown"
              size="large"
            >
              <span class="text-h5">{{ props.room.id }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="text-h5">{{ props.room.id }}</span>
              </v-avatar>
              <h3>{{ props.room.room_name }}</h3>
              <p class="text-caption mt-1">
                {{ ownerName }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                rounded
                variant="text"
              >
                Edit Account
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
</template>

<script lang="ts">
  import { Room } from "@/models/Room";
  import { useUserStore } from "@/store/UserStore";

  export default {
    setup() {
      const userStore = useUserStore();
      return { userStore };
    },
    data: () => ({
      ownerName: "",
    }),
    props: {
      room: {
        type: Room,
        required: true,
      },
    },
    async mounted() {
      this.ownerName = await this.userStore.fetchUser(this.room.owner_id);
      console.log("TheRoomCardPop:", this.room);
    },
  }
</script>

<style>

</style>
