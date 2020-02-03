var express = require('express')
var router = express.Router()
router.get('', (req, res, next) => {
  res.send('Test route working properly')
})
module.exports = router
