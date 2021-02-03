const subscriptions = {
  signals: []
}

exports.subscriptions = subscriptions

exports.addSubscription = (topic, user, conn) => {
  if (!user.length) {
    conn.socket.send(JSON.stringify({ ret: -1, msg: 'Invalid userId' }))
  }
  else if (topic in subscriptions) {
    const data = {
      user: user[0],
      conn: conn
    }
    if (data in subscriptions[topic]) {
      conn.socket.send(JSON.stringify({ ret: -1, msg: 'Already subscribed' }))
    } else {
      subscriptions[topic].push(data)
      conn.socket.send(JSON.stringify({ ret: 0, msg: 'Subscribed' }))
    }
  }
  else {
    conn.socket.send(JSON.stringify({ ret: -1, msg: 'Subscription does not exist' }))
  }
}

exports.removeSubscription = (topic, conn) => {
  if (topic in subscriptions) {
    subscriptions[topic] = subscriptions[topic].filter(subscription => subscription.conn !== conn)
  }
  else {
    conn.socket.send(JSON.stringify({ ret: -1 }))
  }
}