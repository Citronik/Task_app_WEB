<template>
  <v-app>
    <TheNavigator />
    <TheNavigatorAuth />
    <v-main style="min-height: 100vh">
      <router-view></router-view>
    </v-main>
    <TheFooterVue />
  </v-app>
</template>

<script setup lang="ts">
  import TheNavigatorAuth from '@/components/Main/TheNavigatorAuth.vue'
  import TheNavigator from '@/components/Main/TheNavigator.vue'
  import TheFooterVue from '@/components/Main/TheFooter.vue'

</script>

<style>
v-content {
  background-color: #BBDEFB !important;
  grid-area: v-main;
  overflow-y: auto;
  padding: 0rem;
}
</style>
