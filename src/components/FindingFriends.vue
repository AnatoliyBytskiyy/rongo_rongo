<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col">
          <h1>Finding friends</h1>
        </div>
      </div>
      <div class="row justify-content-center align-items-center">
        <div class="col-4">
          <mdb-input v-model="searching" type="text" label="Basic example" outline />
        </div>
        <div class="col-3">
          <mdb-btn outline="default" size="sm" v-on:click="searchUsers(searching)">Search</mdb-btn>
        </div>
      </div>
      <div class="row" v-if='data'>
        <div class="col" >
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in data.users" :key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.name }}</td>
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
      searching: ''
    }
  },
  computed: {

  },
  methods: {
    users: function () {
      this.$http.get('http://localhost:3000/finding_friends')
        .then(
          response => (this.data = response.data)
        )
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    },
    searchUsers: function (name) {
      this.$http.post('http://localhost:3000/finding_friends', { name: name })
        .then(
          response => (this.data = response.data)
        )
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created: function () {
    this.users()
  }
}
</script>
