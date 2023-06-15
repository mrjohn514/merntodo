import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from '../services/api'

function Register({ user, setUser }) {
  const navigation = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('user') || user) {
      navigation('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newUser = Object.fromEntries(formData)
    e.currentTarget.reset()

    try {
      const result = await register(newUser)

      if (result.status === 200) {
        console.log(result.data.data)
        localStorage.setItem('user', JSON.stringify(result.data.data))
        toast.success(result.data.message)
        navigation('/')
      } else if (result.status === 201) {
        showToast(result.data.message)
      }
    } catch (err) {
      showToast('Something went wrong. Please try again later.')
    }
  }

  const showToast = (message) => {
    toast.error(message)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h4>Registration</h4>
      {/* name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          className="form-input"
          id="name"
          name="name"
          required
        />
      </div>
      {/* email */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-input"
          id="email"
          name="email"
          required
        />
      </div>
      {/* email */}
      <div className="form-row">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-input"
          id="password"
          name="password"
          required
        />
      </div>

      <button type="submit" className="btn btn-block">
        submit
      </button>
    </form>

    // <div className="register-container">
    //   <h1>Register</h1>
    //   <form className="register-form" onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="name">Name:</label>
    //       <input type="text" id="name" name="name" required />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="email">Email:</label>
    //       <input type="email" id="email" name="email" required />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="password">Password:</label>
    //       <input type="password" id="password" name="password" required />
    //     </div>
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
  )
}

export default Register
