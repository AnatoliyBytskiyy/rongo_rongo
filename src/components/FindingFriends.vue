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
                <th scope="row" v-if="user.id != $store.getters.userData.id">{{ user.id }}</th>
                <td v-if="user.id != $store.getters.userData.id">{{ user.name }}</td>
                <!-- <td>{{ $store.getters.userData.friends.split(',') }}</td>   если совпадает с id, то тушим кнопку -->
                <td v-if="user.id != $store.getters.userData.id"><mdb-btn v-bind:id="'button'+user.id" outline="default" size="sm" v-on:click="addToFriend(user.id)">{{ txt(user.id) }}</mdb-btn></td>
              </tr> <!-- :disabled="friendship(user.id)" -->
            </tbody> <!-- v-bind:id="'button'+user.id" -->
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
      searching: '',
      message: '',
      update: null
    }
  },
  methods: {
    txt: function (id) {
      if (this.$store.getters.userData.friends) {
        const friendship = this.$store.getters.userData.friends.split(',')

        for (var i = 0; i < friendship.length; i++) {
          if (parseInt(friendship[i], 10) === id) {
            return 'Friendship'
          }
        }
      }
      return 'Add to friend'
    },
    users: function () {
      this.$http.get('http://localhost:3000/finding_friends')
        .then(
          response => (this.data = response.data)
        )
        .catch(function (error) {
          console.log(error)
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
    },
    addToFriend: function (id) {
      this.$http.post('http://localhost:3000/finding_friends/add', { userId: this.$store.getters.userData.id, friendId: id })
        .then(
          // response => (console.log(response.data.friendship)) // ЭТО ВЫВОДИТ В КОНСОЛЬ НОВЫЙ СПИСОК ДРУЗЕЙ
          response => (this.update = response.data)
        )
        .catch(function (error) {
          console.log(error)
        })

      const btn = document.querySelector('#button' + id)
      btn.textContent = btn.textContent === 'Add to friend' ? 'Friendship' : 'Add to friend'
    }
  },
  created: function () {
    this.users()
  },
  watch: {
    update: function () {
      this.$store.dispatch('update', { userId: this.$store.getters.userData.id })
        .then(() => console.log('update'))
        .catch(err => console.log(err))
    }
  }
}
</script>
