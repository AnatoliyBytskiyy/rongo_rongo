<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col">
        <h1>Friends</h1>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-4">
        <mdb-input type="text" label="Basic example" outline />
      </div>
      <div class="col-3">
        <mdb-btn outline="default" size="sm">Search</mdb-btn>
      </div>
    </div>
    <div class="row" v-if='friendsList'>
      <div class="col" >
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(friend, index) in friendsList" :key="index">
              <td>{{ friend.id }}</td>
              <td>{{ friend.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mdbInput, mdbBtn } from 'mdbvue'

export default {
  name: 'InputsPage',
  components: {
    mdbInput,
    mdbBtn
  },
  data () {
    return {
      data: null,
      friendsList: []
    }
  },
  methods: {
    getFriends: function () {
      var friends = this.$store.getters.userData.friends.split(',')

      for (let i = 0; i < friends.length; i++) {
        this.$http.post('http://localhost:3000/user', { userId: friends[i] })
          .then(
            response => (this.friendsList.push(response.data.user))
            // response => (console.log(response.data.user))
          )
          .catch(function (error) {
            console.log(error)
          })
      }

      // console.log(this.friendsList)
    }
  },
  created: function () {
    this.getFriends()
  }
}
</script>
