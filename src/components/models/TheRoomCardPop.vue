<template>
  <v-container
    class="mx-auto side"
    fluid
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
              <span class="text-h5">{{ props.room_id }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="text-h5">{{ $props.room_id}}</span>
              </v-avatar>
              <h3>{{ $props.room_name }}</h3>
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
  import { useUserStore } from "@/store/UserStore";

  export default {
    setup() {
      const userStore = useUserStore();
      console.log("TheRoomCardPop:");
      return { userStore };
    },
    data: () => ({
      ownerName: "",
      //room: {} as Room,
    }),
    props: {
      room_id: Number,
      room_name: String,
      owner_id: Number,
    },
    async mounted() {
      this.ownerName = await this.userStore.fetchUserByID(this.$props.owner_id);
      console.log("TheRoomCardPop:");
    },
  }
</script>

<style>
  #side {
    grid-area: side;
    padding: 1rem;
  }
</style>
