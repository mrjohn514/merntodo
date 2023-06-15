const express = require('express')
const router = express.Router()
const User = require('../controllers/api/usercontroller')

router.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

router.post('/register', User.singup)
router.post('/login', User.createsession)

router.use('/api', require('./api/tasks'))

module.exports = router
