const Task = require('../../models/task')
const User = require('../../models/user')

// GET /api/tasks
module.exports.getAllTasks = async function (req, res) {
  console.log('enterd in controller')
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'tasks',
      model: 'Task',
    })
    console.log('signed in usertasks', user.tasks)
    res.status(200).json({
      message: 'success in getalltask controller',
      data: user.tasks,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/tasks
module.exports.createTask = async function (req, res) {
  try {
    const task = new Task(req.body)
    await task.save()

    // Update the task array in the user object
    const user = await User.findOne({ _id: req.user._id })
    user.tasks.push(task)
    await user.save()

    return res.json(200, {
      data: task,
      message: 'task added',
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET /api/tasks/:taskId
module.exports.getTask = async function (req, res) {
  try {
    const task = await Task.findById(req.params.taskId)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.status(200).json({
      message: 'sucess task found',
      task: task,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// PUT /api/tasks/:taskId
module.exports.updateTask = async function (req, res) {
  console.log('reauqest to update recived')
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
      new: true,
    })
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.status(200).json({
      message: 'succes in updting task',
      data: task,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE /api/tasks/:taskId
module.exports.deleteTask = async function (req, res) {
  console.log('inside delte ccontroller')
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // Remove task from user's tasks array
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { tasks: task._id } },
      { new: true }
    )

    return res.json(200, {
      message: 'Task deleted',
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}
