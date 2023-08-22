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
      alertType: String,
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
