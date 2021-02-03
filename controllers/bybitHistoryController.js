// External Dependancies
const boom = require('boom')
const axios = require('axios')
const NodeCache = require('node-cache')

const cache = new NodeCache()

const minutes = {
  1: 1,
  3: 3,
  5: 5, 
  15: 15,
  30: 30,
  60: 60,
  120: 120,
  240: 240,
  D: 1440,
  W: 10080 
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
      cache.set(url, response.data, minutes[data.interval] * 60)
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
    if (from + minutes[interval] * 12000 < 1569888000) {
      reply.send({ ret_code: -1 })
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
