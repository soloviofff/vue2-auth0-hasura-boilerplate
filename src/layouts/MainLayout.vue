<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item link to="/" >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="[icon, text, link] in links"
          :key="icon"
          link
          :to="link"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


      <p v-if="user_is_admin" style="padding: 0 10px;">Admin panels</p>
      <v-list v-if="user_is_admin">
        <v-list-item
          link
          to="/material-icons"
        >
          <v-list-item-icon>
            <v-icon>mdi-inbox-arrow-down</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Icons</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-system-bar app>
      <span>Application name</span>
      <v-spacer></v-spacer>
      {{date | datefilter('datetime')}}
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- <v-toolbar-title>Application</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <div v-if="!$auth.loading && user.avatar">
        <v-menu offset-y v-if="$auth.isAuthenticated">
          <template v-slot:activator="{ on, attrs }">
            <!-- <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Nickname
            </v-btn> -->
            <v-btn
              color="primary"
              fab
              dark
              v-bind="attrs"
              v-on="on"
              v-if="!user.avatar"
            >
              <v-avatar color="indigo">
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-btn>
            <v-btn
              color="primary"
              fab
              dark
              v-bind="attrs"
              v-on="on"
              v-if="user.avatar"
            >
              <v-avatar>
                <img
                  :src="user.avatar"
                  :alt="user.name"
                >
              </v-avatar>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group>
              <v-list-item to="profile">
                <v-list-item-icon>
                  <v-icon >mdi-clipboard-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title >Profile</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title >Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>

      
        
        <v-btn
          class="mx-2"
          color="primary"
          v-if="!$auth.isAuthenticated"
          @click="login"
        >
          Login
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>


<script>
  import UserMixin from '@/mixins/user/user.js'
  
  export default {
    data: () => ({
      timeInterval: null,
      date: null,
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox', '/inbox'],
      ],  
    }),
    mixins: [
      UserMixin
    ],
    async created() {
      // console.log(this.$auth)
      this.fetchCurrentUser()
      this.user_login(this.$auth.user)
    },
    mounted() {
      this.timeInterval = setInterval(()=>{
        this.date = new Date()
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timeInterval)
    }
  }
</script>

<style lang="sass" scoped>

  
</style>
