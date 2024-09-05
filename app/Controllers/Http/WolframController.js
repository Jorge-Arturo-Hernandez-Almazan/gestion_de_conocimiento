'use strict'

const axios = require('axios')

class WolframController {
  async query({ request, response }) {
    const { query } = request.only(['query'])
    const API_KEY = 'RKWAT3-H4Q6UG65UW'

    try {
      const wolframResponse = await axios.get('https://api.wolframalpha.com/v1/result', {
        params: {
          appid: API_KEY,
          input: query
        }
      })
      
      return response.send({ result: wolframResponse.data })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ error: 'Error retrieving data' })
    }
  }
}

module.exports = WolframController
