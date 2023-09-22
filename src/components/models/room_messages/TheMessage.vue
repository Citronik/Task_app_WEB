<template>
  <div class="user-message">
    <div class="user-message__profile">
      <!-- User profile picture -->

      <v-avatar size="45px">
        <v-img
          v-if="userProfileImageUrl"
          alt="Avatar"
          :src="userProfileImageUrl"
        ></v-img>
        <v-icon
          v-else
          color="blue-grey lighten-4"
          icon="mdi-account-circle"
        ></v-icon>
      </v-avatar>
    </div>
    <div class="user-message__content">
      <div class="user-message__content__text">{{ message }}</div>
      <div class="user-message__content__date">{{ formattedDate }}</div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService';
import { ref, onMounted } from 'vue';
export default {
  setup(props) {
    const userProfileImageUrl = ref('');

    // Využite onMounted na získanie URL profilovej fotky po zavedení komponentu
    onMounted(async () => {
      userProfileImageUrl.value = await UserService.getUserPhoto(props.userId);
    });
    return { userProfileImageUrl };
  },
  props: {
    userId: Number,
    message: String,
    sentDate: String,
  },
  computed: {
    // Metóda na formátovanie dátumu do požadovaného formátu
    formattedDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(this.sentDate);
      return date.toLocaleDateString('en-US', options);
    },
  },
};
</script>

<style scoped>
.user-message {
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  background-color: #f0f0f0;
}

.user-message__profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.user-message__profile__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-message__content {
  flex: 1;
}

.user-message__content__text {
  font-size: 16px;
  margin-bottom: 5px;
  word-wrap: break-word;
  max-width: 42rem;
  width: var(--container-width);
  height: calc(var(--ratio) * var(--container-width));
}

.user-message__content__date {
  font-size: 12px;
  color: #888;
}
</style>
