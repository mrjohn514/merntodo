import React, { useEffect, useState } from 'react'
import { login } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login({ user, setUser }) {
  const [error, setError] = useState(null)
  const navigation = useNavigate()

  useEffect(() => {
    console.log('user is inisde localstorage', user)
    if (user && user.token) navigation('/')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newUser = Object.fromEntries(formData)
    e.currentTarget.reset()

    try {
      const result = await login(newUser)

      if (result.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data))
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
      <h4>Log In</h4>
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
    // <div className="login-container">
    //   <h1>Login</h1>
    //   <form className="login-form" onSubmit={handleSubmit}>
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
    //   {error && toast.error(error)}
    // </div>
  )
}

export default Login
