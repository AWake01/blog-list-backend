const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

//CONNECTION
const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})