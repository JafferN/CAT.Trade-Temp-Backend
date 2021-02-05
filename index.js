const fastify = require('fastify')({
  trustProxy: true,
  logger: true
})
const mongoose = require('mongoose')
const routes = require('./routes')
const websockets = require('./websockets')

const User = require('./models/User')

// Connect to DB
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB_URL)
 .then(() => console.log('MongoDB connected…'))
 .catch(err => console.log(err))

// Register plugins
fastify
  .register(require('fastify-websocket'))
  .register(require('fastify-healthcheck'))
  .register(require('fastify-cors'), { origin: (origin, cb) => {
    if (!origin || /localhost|ngrok\.io|cat\.trade|pscatbot\.com/.test(origin)){
      //  Request from localhost will pass
      cb(null, true)
      return
    }
    // Generate an error on other origins, disabling access
    cb(new Error("Not allowed"))
  } 
})

routes.forEach((route, _index) => {
  fastify.route(route)
})

fastify.get('/', { websocket: true }, function wsHandler (conn, req) {
  conn.socket.on('message', async (msg) => {
    try {
      data = JSON.parse(msg)
      if (data.op.toLowerCase() === 'subscribe') {
        const user = await User.find({ userId: data.args.userId })
        websockets.addSubscription(data.args.topic, user, conn)
      } else if (data.op.toLowerCase() === 'unsubscribe') {
        subscriptions.removeSubscription(data.args.topic, conn)
      }
    } catch (err) {
      conn.socket.send(JSON.stringify({ ret: -1, msg: err.message }))
    }
  })
})

// Run the server!
const start = async () => {
  // Google Cloud Run will set this environment variable for you, so
  // you can also use it to detect if you are running in Cloud Run
  const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined

  // You must listen on the port Cloud Run provides
  const port = process.env.PORT || 3000

  // You must listen on all IPV4 addresses in Cloud Run
  const address = IS_GOOGLE_CLOUD_RUN ? "0.0.0.0" : undefined

  try {
    const listeningAddress = await fastify.listen(port, address)
    console.log(`Listening on ${listeningAddress}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (require.main === module) {
  start()
}