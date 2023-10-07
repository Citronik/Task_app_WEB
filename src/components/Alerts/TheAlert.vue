<template>
  <v-alert
    class="alert-overlay"
    position="absolute"
    location="center center"
    closable
    :type="alertType"
    close-label="Closeable alert"
    :title="alertTitle"
  >
    {{ alertText }}
  </v-alert>
</template>

<script lang="ts">
  export default {
    name: "the-alert",
    props: {
      alertTitle: String,
      alertText: String,
      alertType: {
      type: String as () => "error" | "success" | "warning" | "info",
      required: true,
    },
    },
    data() {
      return {
        alert: true,
      };
    },
    setup() {
      console.log("Alerts setup");
      return {};
    },
  }
</script>

<style>

.alert-overlay {
  z-index: 9999;
}
</style>
