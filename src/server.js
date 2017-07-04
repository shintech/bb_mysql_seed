import chalk from 'chalk'
import options from './app'
import {Server} from 'http'

const { app, port, environment, logger, packageName, packageVersion } = options

const server = Server(app)

server.on('listening', () => {
  if (environment !== 'test') {
    logger.info(`${chalk.bgBlack.cyan(packageName)} ver.${chalk.bgBlack.green(packageVersion)} istening on port ${chalk.bgBlack.yellow(port)}...`)
  }
})

server.on('request', (req, res) => {
  if (environment !== 'test') {
    logger.info(packageName, '-', req.method, req.url)
  }
})

server.on('error', (err) => {
  logger.error(err.stack)
})

server.listen(port)

options.server = server

export default options
