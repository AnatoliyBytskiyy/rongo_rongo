<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col">
          <h1>Finding friends</h1>
        </div>
      </div>
      <div class="row justify-content-center align-items-center">
        <div class="col-4">
          <mdb-input type="text" label="Basic example" outline />
        </div>
        <div class="col-3">
          <mdb-btn outline="default" size="sm" v-on:click="users">Default</mdb-btn>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in allUsers.users" :key="user.id">
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
      data: 'Список пользователей пуст'
    }
  },
  computed: {
    allUsers: function () { return this.$store.getters.users }
  },
  methods: {
    users: function () {
      this.$store.dispatch('getAllUsers')
        .catch(err => console.log(err))
    }
  },
  created: function () {
    this.users()
  }
}
</script>
