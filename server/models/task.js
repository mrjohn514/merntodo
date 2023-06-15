const mongoose = require('mongoose') //adding mongoose module

const taskschema = new mongoose.Schema({
  description: String,
  priority: String,
  status: {
    type: String,
    enum: ['pending', 'progress', 'completed', 'review'],
  },
})

//we need to tell what would be the name of collection using this schema and so Todo is the name of
//collection in database
const Task = mongoose.model('Task', taskschema)

module.exports = Task
