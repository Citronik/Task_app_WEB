<template>
  <v-alert
    class="alert-overlay"
    v-model="alert"
    border="start"
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
  }
</script>

<style scoped>

</style>
