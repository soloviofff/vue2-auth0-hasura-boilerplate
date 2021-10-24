<template>
  <v-app id="dashboard">
    <v-main class="mainWrapper">
      <component :is="layout" :ref="navigationRoute">
        <router-view />
      </component>
    </v-main>
    <!-- <MainNav /> -->
  </v-app>

</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import EmptyLayout from '@/layouts/EmptyLayout'
export default {
  components: {
    MainLayout,
    EmptyLayout
  },
  mixins: [
    // UserMixin
  ],
  methods: {
    
  },
  data() {
    return {
      primaryDrawer: {
        model: false,
        clipped: false,
      }
    };
  },
  computed: {
    navigationRoute() {
      let route = this.$route.fullPath
      return route
    },
    layout() {
      return this.$route.meta.layout
    }
  }
  
};
</script>
<style lang="sass">
a:focus, a:hover
  text-decoration: none !important
</style>
<style lang="sass" scoped >
.mainWrapper
  padding: 0 !important
  flex-direction: row
  align-items: flex-start
  justify-content: flex-start

</style>
