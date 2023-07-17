import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { addtask } from '../services/api'
import { toast } from 'react-toastify'
import { deleteTask } from '../services/api'
import { updateTask } from '../services/api'
import { getAllTasks } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({ user, setUser }) => {
  const navigate = useNavigate()

  const toPomodoro = (todo) => {
    navigate('/pomodoro', { state: todo })
  }

  // Define state variables for the priority and status filters
  const [priorityFilter, setPriorityFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [selectedTodo, setSelectedTodo] = useState(null)
  // Define state variable for the todo list
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    const info = localStorage.getItem('user')
    setUser(JSON.parse(info))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTasks()
        console.log('data for todos is', data)
        setTodoList(data.data.data)
        console.log(todoList)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleUpdate = (todo) => {
    console.log('todois', todo)
    setSelectedTodo(todo)
  }

  const handleDelete = async (id) => {
    try {
      const response = await deleteTask(id)

      if (response.status === 200) {
        // remove the deleted item from the todoList state
        setTodoList(todoList.filter((item) => item._id !== id))
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error('Failed to delete todo item.')
    }
  }

  // Define function to handle form submission and add new todo item
  const handleaddSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const newTodo = Object.fromEntries(formData)
    event.currentTarget.reset()

    try {
      let result = await addtask(newTodo)
      if (result.status === 200) {
        setTodoList([...todoList, result.data.data])
        toast.success(result.data.message)
      } else if (result.status === 201) {
        toast.error(result.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error('Failed to add/update todo item.')
    }
  }

  const handleupdateSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const newTodo = Object.fromEntries(formData)
    event.currentTarget.reset()

    try {
      let result = await updateTask(selectedTodo._id, newTodo)
      if (result.status === 200) {
        console.log('responce recieved')
        console.log(result.data.data)
        setTodoList(
          todoList.map((item) =>
            item._id === selectedTodo._id ? result.data.data : item
          )
        )
        setSelectedTodo(null)
        toast.success(result.data.message)
      } else if (result.status === 201) {
        toast.error(result.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error('Failed to add/update todo item.')
    }
  }

  // Define function to filter todo items based on priority and status
  function filteredTodoList() {
    return todoList.filter(
      (todo) =>
        (!priorityFilter || todo.priority === priorityFilter) &&
        (!statusFilter || todo.status === statusFilter)
    )
  }

  console.log('todolist is', todoList)

  return user && user.token ? (
    <div className="todo-list-container">
      {/* Form to Add Todo */}
      {selectedTodo ? (
        <form onSubmit={handleupdateSubmit} className="form">
          <h2>Edit Todo Item </h2>
          <div className="form-row">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              value={selectedTodo ? selectedTodo.description : ''}
              onChange={(e) =>
                setSelectedTodo({
                  ...selectedTodo,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="form-row">
            <label htmlFor="priority" className="form-label">
              Priority:
            </label>
            <select
              name="priority"
              id="priority"
              required
              value={selectedTodo ? selectedTodo.priority : ''}
              onChange={(e) =>
                setSelectedTodo({ ...selectedTodo, priority: e.target.value })
              }
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="status" className="form-label">
              Status:
            </label>
            <select
              name="status"
              id="status"
              required
              value={selectedTodo ? selectedTodo.status : ''}
              onChange={(e) =>
                setSelectedTodo({ ...selectedTodo, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option value="pending">pending</option>
              <option value="progress">Progress</option>
              <option value="completed">completed</option>
              <option value="review">review</option>
            </select>
          </div>
          <button type="submit" className="btn btn-block">
            update Todo Item
          </button>
        </form>
      ) : (
        <form onSubmit={handleaddSubmit} className="form">
          <h2>Add Todo Item</h2>
          <div className="form-row">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea name="description" id="description"></textarea>
          </div>
          <div className="form-row">
            <label htmlFor="priority" className="form-label">
              Priority:
            </label>
            <select name="priority" id="priority" required>
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="status" className="form-label">
              Status:
            </label>
            <select name="status" id="status" required>
              <option value="">Select Status</option>
              <option value="pending">pending</option>
              <option value="progress">Progress</option>
              <option value="completed">completed</option>
              <option value="review">review</option>
            </select>
          </div>
          <button type="submit" className="btn btn-block">
            Add Todo Item
          </button>
        </form>
      )}

      {/* List of Todo Items */}
      <div className="form nform">
        <h2>All Todo Items</h2>
        {/* Priority Filter */}
        <div className="filter-container">
          <div className="filter">
            <label htmlFor="priority-filter">Priority:</label>
            <select
              name="priority-filter"
              id="priority-filter"
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option value="">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter">
            <label htmlFor="status-filter">Status:</label>
            <select
              name="status-filter"
              id="status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="">All</option>
              <option value="pending">pending</option>
              <option value="progress">Progress</option>
              <option value="completed">completed</option>
              <option value="review">review</option>
            </select>
          </div>
        </div>

        {filteredTodoList().map((todo) => (
          <div key={todo._id} className="todo-item">
            <p>{todo.description}</p>
            <p>
              Priority: {todo.priority}, Status: {todo.status}
            </p>
            <div>
              <button
                onClick={() => handleUpdate(todo)}
                className="btn btn-block"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="btn btn-block"
              >
                Delete
              </button>

              <button
                className="btn btn-block"
                onClick={() => {
                  toPomodoro(todo)
                }}
              >
                Pomodoro
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Please signup or signin to continue</div>
  )
}

export default Home
