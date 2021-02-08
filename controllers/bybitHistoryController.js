// External Dependancies
const boom = require('boom')
const axios = require('axios')
const NodeCache = require('node-cache')

const cache = new NodeCache()

const seconds = {
  1: 60,
  3: 80,
  5: 300, 
  15: 900,
  30: 1800,
  60: 3600,
  120: 7200,
  240: 14400,
  D: 86400,
  W: 604800 
}

function callEndpoint(endpoint, data) {
  return new Promise((resolve, reject) => {
    const url = `${endpoint}?symbol=${data.symbol}&interval=${data.interval}&from=${data.from}`
    const cachedData = cache.get(url)
    if (cachedData) {
      return resolve(cachedData)
    }

    axios.get(url)
    .then(response => {
      cache.set(url, response.data, seconds[data.interval])
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })
}

// Get ByBit history
exports.getHistory = async (req, reply) => {
  try {
    const symbol = req.query.symbol
    const interval = req.query.interval
    let from = req.query.from
    if (parseInt(from) + seconds[interval] * 200 < 1569888000) {
      return reply.send({ ret_code: -1 })
    } else if (from < 1569888000) {
      from = 1569888000
    }
    callEndpoint('https://api.bybit.com/v2/public/kline/list', { symbol, interval, from })
      .then(data => {
        reply.send(data)
      })
      .catch(error => {
        console.log(error)
        reply.send({ ret_code: -1 })
      })
  } catch (err) {
    throw boom.boomify(err)
  }
}
