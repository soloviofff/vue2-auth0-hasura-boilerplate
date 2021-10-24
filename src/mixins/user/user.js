// import _ from 'lodash'
import gql from 'graphql-tag'
// import update_user_info_mutation from './gql/update_user_info_mutation.gql'


const QUERY_USER_INFO = gql`
  query($auth0_id: String!) {
    users_by_pk(auth0_id: $auth0_id) {
      auth0_id
      avatar
      name
      created_at
      email
      last_seen
      data
    }
  }
`

import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['user_id', 'user', 'user_roles', 'user_is_admin'])
  },
  methods: {
    ...mapActions(['user_login', 'user_logout', 'user_fetch']),
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.user_logout()
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }, 
      
    async fetchCurrentUser() {
      try {
        if (this.$auth.user.sub) {
          const result = await this.$apollo.query({
            query: QUERY_USER_INFO,
            variables: {
              auth0_id: this.$auth.user.sub
            },
          })
          // console.log(result.data.users_by_pk)
          let full_result = result.data.users_by_pk
          this.user_fetch(full_result)
        }
      } catch (err) {
        console.log('fetchCurrentUser ERR')
        console.log(err)
      }
    },

    // async updateUserIdentityByPK(user) {

    //   // console.table(user)
    //   try {
    //     // const result = await this.$apollo.mutate({
    //     //   mutation: update_user_info_mutation,
    //     //   variables: {
    //     //     auth0_id: this.get_auth0_id,
    //     //     avatar: user.new_avatar,
    //     //     first_name: user.first_name,
    //     //     second_name: user.second_name,
    //     //     name: user.nickname
    //     //   }
    //     // })
    //     // console.log(result)
    //     // let returnStatus = result.data.update_users_by_pk ? true : false
    //     // return returnStatus
    //   } catch(err) {
    //     console.log('fetchCurrentUser ERR')
    //     console.log(err)
    //   }
    // }
  }
}
