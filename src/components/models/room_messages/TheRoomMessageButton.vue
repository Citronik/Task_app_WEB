<template>
  <v-btn
      :loading="loading"
      :disabled="loading"
      color="gray"
      @click="load"
    >
    <svg-icon type="mdi" :path="path"></svg-icon>
      Send
    </v-btn>
</template>

<script lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSend, mdiSendCheck  } from '@mdi/js'
  export default {
    name: "room-message-button",

	components: {
		SvgIcon,
	},
    data () {
      return {
        loading: false,
        path: mdiSend,
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => (this.loading = false), 350)
        this.path = mdiSendCheck
        setTimeout(() => (this.path = mdiSend), 1000)
      },
    },
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
