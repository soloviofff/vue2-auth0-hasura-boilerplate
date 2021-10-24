import _ from 'lodash'
export default {
  state: {
    user_id: null,
    user_roles: [],
    user_is_admin: false,
    user: {}
  },
  mutations: {
    update_user_id(state, value) { state.user_id = value },
    update_user_roles(state, value) { state.user_roles = value },
    update_user_is_admin(state, value) { state.user_is_admin = value },
    update_user(state, value) { state.user = value }
  },
  
  getters: {
    user_id(state) {
      return state.user_id
    },
    user_roles(state) {
      return state.user_roles
    },
    user_is_admin(state) {
      return state.user_is_admin
    },
    user(state) {
      return state.user
    } 
  },

  actions: {
    user_login( ctx, user ) {
      console.log(user)
      let roles = user['https://hasura.io/jwt/claims']['x-hasura-allowed-roles']
      ctx.commit('update_user_id', user.sub)
      ctx.commit('update_user_roles', roles)
      if ( _.includes(roles, 'admin' ) ) { ctx.commit('update_user_is_admin', true) }
    },
    user_fetch( ctx, user ) {
      ctx.commit('update_user', user )
    },
    user_logout (ctx) {
      ctx.commit('update_user_id', null)
      ctx.commit('update_user_roles', [])
      ctx.commit('update_user_is_admin', false)
      ctx.commit('update_user', {} )
    }
  },

}
