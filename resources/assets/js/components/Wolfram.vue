<template>
  <div>
    <input v-model="query" @keyup.enter="fetchWolframData" placeholder="Enter your query" />
    <button @click="fetchWolframData">Search</button>
    <div v-if="result">
      <h3>Result:</h3>
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      query: '',
      result: null
    }
  },
  methods: {
    async fetchWolframData() {
      try {
        const response = await axios.post('/wolfram-query', { query: this.query })
        this.result = response.data.result
        console.log('Result:', this.result)
      } catch (error) {
        console.error('Error retrieving data:', error)
        this.result = 'Error retrieving data'
      }
    }
  }
}
</script>

<style scoped>
input {
  margin-right: 10px;
}
</style>
