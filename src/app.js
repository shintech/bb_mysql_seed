import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import winston from 'winston'
import getRouter from './routes'
import config from './_config'
import pkg from '../package.json'
import db from 'shintech-mysql'

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'info' }),
    new (winston.transports.File)({
      filename: 'error.log',
      level: 'error'
    })
  ]
})

const options = {
  app: express(),
  port: process.env['PORT'] || 8000,
  environment: process.env['NODE_ENV'] || 'development',
  logger: logger,
  config: config,
  packageName: pkg.name,
  packageVersion: pkg.version
}

options.db = db(options)

const { app } = options
const router = getRouter(options)

app.use(helmet())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router)

app.use(errorHandler)

function errorHandler (err, req, res, next) {
  logger.error(err.stack)

  if (res.headersSent) {
    return next(err)
  }

  res.status(500)
  res.send(err)
}

export default options
