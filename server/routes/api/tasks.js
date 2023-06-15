const express = require('express')
const router = express.Router()
const taksconroller = require('../../controllers/api/taskcontroller')
const passport = require('passport')

router.post(
  '/tasks',
  passport.authenticate('jwt', { session: false }),
  taksconroller.createTask
)

router.get(
  '/tasks',
  passport.authenticate('jwt', { session: false }),
  taksconroller.getAllTasks
)
router.get(
  '/tasks/:taskId',
  passport.authenticate('jwt', { session: false }),
  taksconroller.getTask
)
router.put(
  '/tasks/:taskId',
  passport.authenticate('jwt', { session: false }),
  taksconroller.updateTask
)
router.delete(
  '/tasks/:taskId',
  passport.authenticate('jwt', { session: false }),
  taksconroller.deleteTask
)

module.exports = router
