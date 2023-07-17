import React, { createContext, useState, useEffect } from 'react'
import './pomodoro.css'
import Pomotimer from './pomotimer'
import { useLocation } from 'react-router-dom'

export const pomocontext = new createContext()

const Pomodoro = () => {
  const location = useLocation()
  console.log('inside pomodoro', location.state)
  const todo = location.state

  const tags = ['pomodoro', 'Shortbreak', 'LongBreak']

  const [isactive, setactive] = useState(false)
  const [tag, settag] = useState(0)
  const [time, settime] = useState(1000)
  const [intime, setintime] = useState(1000)

  const tagarray = [1000, 500, 2000]

  const handler = (idx) => {
    settime(tagarray[idx])
    settag(idx)
    setactive(false)
    setintime(tagarray[idx])
  }

  return (
    <pomocontext.Provider
      value={{
        isactive,
        setactive,
        tag,
        settag,
        time,
        settime,
        intime,
        setintime,
      }}
    >
      <div className="form">
        <div className="ptodo">
          <h2>{todo.description}</h2>
          <p>
            Priority: {todo.priority}, Status: {todo.status}
          </p>
        </div>
        <div className="pomoheader">
          {tags.map((tag, index) => {
            return (
              <button
                key={index}
                className="btn btn-block"
                onClick={() => handler(index)}
              >
                {tag}
              </button>
            )
          })}
        </div>

        <Pomotimer />
      </div>
    </pomocontext.Provider>
  )
}

export default Pomodoro
