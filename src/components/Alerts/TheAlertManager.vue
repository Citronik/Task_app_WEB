<template>
  <div class="alert-container" v-for="alert in alerts" :key="alert.id">
    <TheLoginAlert
      :alertTitle="alert.title"
      :alertText="alert.text"
      :alertType="alert.type"
      @close="removeNotification(alert)"
    />
  </div>
</template>

<script lang="ts">
  import { useAlertStore } from '@/store/AlertStore';
  import TheLoginAlert from './TheLoginAlert.vue';
  export default {
    components: {
      TheLoginAlert,
    },
    setup() {
      const alertStore = useAlertStore();

      return { alertStore };
    },
    data() {
    return {
      alerts: [],
      };
    },
    watch: {
      alertStore: {
        deep: true,
        handler() {
          this.alerts = this.alertStore.alerts;
        },
      },
    },
    methods: {
      removeNotification(alert: any){
        this.alertStore.removeNotification(alert);
      },
    },
  };
</script>

<style>
  .alert-container {
    position: fixed;
    top: 20px;
    right: 20px;
  }
</style>
/*
.alert-container {
  position: fixed;
  z-index: 10000;
  top: 30%;
  left: 50%;
  min-width: 300px;
  min-height: 100px;
  max-width: 500px;
  max-height: 200px;
  display: flex;
  justify-content: center;
  transform: translate(-50%, -50%);
  align-items: center;
}
*/
