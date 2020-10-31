<template>
  <div class="about">
    <h1>This is an about page</h1>
    <mdb-input type="text" label="Basic example" outline />
  </div>
</template>
<script>
import { mdbInput } from 'mdbvue'

export default {
  name: 'InputsPage',
  components: {
    mdbInput
  }
}
</script>
