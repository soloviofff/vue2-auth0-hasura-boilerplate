<template>
  <div>
    <h1>Profile</h1>
      {{user}}
  </div>
</template>

<script>
import UserMixin from '@/mixins/user/user.js'

export default {

  data: () => ({}),
   mixins: [
    UserMixin
  ],
}
</script>

