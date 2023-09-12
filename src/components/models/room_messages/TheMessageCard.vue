<template>
  <div class="chat-component">
    <div class="chat-component__header">
      <h2 class="chat-component__header__title">{{ room.room_name }}'s chat</h2>
    </div>
    <div class="chat-component__messages">
      <div class="chat-component__messages__message" v-for="message in messages" :key="message.id">
        <div class="chat-component__messages__message__content">
          <div class="chat-component__messages__message__content__text">
            {{ message.message }}
          </div>
          <div class="chat-component__messages__message__content__date">
            {{ message.created_at }}
          </div>
        </div>
      </div>
    </div>
    <div class="chat-component__input">
      <TheRoomMessageInputVue class="chat-component__input__field" v-model="newMessage.message"/>
      <TheRoomMessageButton class="chat-component__input__button" @click="sendMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from "@/models/Message";
import { Room } from "@/models/Room";
import { useMessageStore } from "@/store/MessageStore";
import { useRoomStore } from "@/store/RoomStore";
import TheRoomMessageButton from "./TheRoomMessageButton.vue";
import TheRoomMessageInputVue from './TheRoomMessageInput.vue';
export default {
  name: "room-chat-card",
  components: {
    TheRoomMessageButton,
    TheRoomMessageInputVue,
  },
  setup() {
    const messageStore = useMessageStore();
    const roomStore = useRoomStore();
    return { messageStore, roomStore };
  },
  data() {
    return {
      room: null as Room,
      messages: null as Message[],
      newMessage: {} as Message,
    };
  },
  async mounted() {
      // Fetch messages on mount
      this.room = this.roomStore.getRoom(+this.$route.params.id);
      this.messages = await this.messageStore.fetchMessages(+this.$route.params.id);
  },
  watch: {
    '$route.params.id': {
      handler: async function (id: number) {
        this.messages = await this.messageStore.fetchMessages(id);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async sendMessage() {
      this.newMessage.room_id = +this.$route.params.id;
      const res = await this.messageStore.createMessage(this.newMessage);
      if (res) {
        this.messages.push(this.newMessage);
        this.newMessage = {} as Message;
      }
    },
  },
};
</script>

<style>
.chat-component {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.chat-component__header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}
.chat-component__header__title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
}
.chat-component__messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
}
.chat-component__messages__message {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.chat-component__messages__message__content {
  display: flex;
  flex-direction: column;
}
.chat-component__messages__message__content__text {
  font-size: 16px;
  font-weight: 400;
  color: #333;
}
.chat-component__messages__message__content__date {
  font-size: 12px;
  font-weight: 400;
  color: #999;
}
.chat-component__input {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-top: 1px solid #e0e0e0;
}
.chat-component__input__field {
  flex: 1;
  height: 50px;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 400;
  color: #333;
}
.chat-component__input__button {
  height: 40px;
  padding: 0 20px;
  margin-left: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  background-color: #fff;
  cursor: pointer;
}
</style>
