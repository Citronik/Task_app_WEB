<template>
  <v-app>
    <TheAlertManager />
    <TheNavigator />
    <TheNavigatorAuth />
    <v-main v-if="!userStore.isLoggedIn" >
      <router-view></router-view>
    </v-main>
    <TheFooterVue />
  </v-app>
</template>

<script setup lang="ts">
  import TheNavigatorAuth from '@/components/Main/TheNavigatorAuth.vue'
  import TheNavigator from '@/components/Main/TheNavigator.vue'
  import TheFooterVue from '@/components/Main/TheFooter.vue'
  import TheAlertManager from '@/components/Alerts/TheAlertManager.vue'
  import { useUserStore } from '@/store/UserStore'

  const userStore = useUserStore();
</script>

<style>
v-content {
  background-color: #BBDEFB !important;
  grid-area: v-main;
  overflow-y: auto;
  padding: 1rem;
}
</style>
