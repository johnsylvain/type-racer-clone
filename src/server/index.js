//  @flow

import express from 'express'
import compression from 'compression'
import { Server } from 'http'
import socketIO from 'socket.io'

import routing from './routing'
import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'

const app = express()
// flow-disable-next-line
const http = Server(app)
const io = socketIO(http)
setUpSocket(io)

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

routing(app)

http.listen(WEB_PORT, () => {
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(prod)' : '(dev).\nKeep "yarn dev:wds" running in an other terminal'}`)
})
