const queries = {}

export default function getAllRoutes (options) {
  const { db, logger } = options

  queries.getAllModels = (req, res, next) => {
    db.query('SELECT * FROM models', (err, results, fields) => {
      if (err) {
        handleError(err, logger)
        return next(err)
      }

      res.status(200)
      .json({
        status: 'success',
        body: results
      })
    })
  }

  queries.createModel = (req, res, next) => {
    if (!req.body.name || !req.body.attribute) {
      return next(new Error('Invalid input data'))
    }

    var post = {name: req.body.name, attribute: req.body.attribute}

    db.query('INSERT INTO models SET ?', post, (err, results, fields) => {
      if (err) {
        handleError(err, logger)
        return next(err)
      }

      res.status(200)
      .json({
        status: 'success',
        message: 'Inserted ' + results.affectedRows + ' rows'
      })
    })
  }

  queries.getSingleModel = (req, res, next) => {
    var modelId = parseInt(req.params.id)

    db.query('SELECT * FROM models WHERE id = ?', db.escape(modelId), (err, results, fields) => {
      if (err) {
        handleError(err, logger)
        return next(err)
      }

      if (results === undefined || results.length === 0) {
        res.statusCode = 404
        res.send('404 - Not Found')
        return next(new Error('404 - Not Found'))
      }

      res.status(200)
      .json({
        status: 'success',
        body: results
      })
    })
  }

  queries.updateSingleModel = (req, res, next) => {
    if (!req.body.name || !req.body.attribute) {
      return next(new Error('Invalid input data'))
    }

    var modelId = parseInt(req.params.id)

    db.query('UPDATE models SET name=?, attribute=? WHERE id = ?', [req.body.name, req.body.attribute, db.escape(modelId)], (err, results, fields) => {
      if (err) {
        handleError(err, logger)
        return next(err)
      }

      if (results.affectedRows === 0) {
        res.send('Error updating model')
        return next(new Error('Error updating model'))
      }

      res.status(200)
      .json({
        status: 'success',
        message: 'updated ' + results.affectedRows + ' rows'
      })
    })
  }

  queries.removeModel = (req, res, next) => {
    var modelId = parseInt(req.params.id)

    db.query('DELETE FROM models WHERE id = ?', db.escape(modelId), (err, results, fields) => {
      if (err) {
        handleError(err, logger)
        return next(err)
      }

      if (results.affectedRows === 0) {
        res.send('Unable to delete model')
        return next(new Error('Unable to delete model'))
      }

      res.status(200)
      .json({
        status: 'success',
        results: 'deleted ' + results.affectedRows + ' rows'
      })
    })
  }

  return queries
}

function handleError (err, logger) {
  logger.error(err.stack)
}
