import React, { useContext, useEffect } from 'react'

import { pomocontext } from './pomodoro'

const Pomotimer = () => {
  const { intime, time, settime, isactive, setactive } = useContext(pomocontext)

  const radius = 150
  const stroke = 5
  const normalizedRadius = radius - stroke * 2

  useEffect(() => {
    if (isactive && time > 0) {
      const interval = setInterval(() => {
        settime((time) => time - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [time, isactive])

  const gettime = (time) => {
    const min = Math.floor(time / 60)
    const sec = time % 60
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
  }

  const handler = () => {
    setactive(!isactive)
  }

  const reset = () => {
    settime(intime)
    setactive(false)
  }

  return (
    <div>
      <div className="TimeDisplay">
        <svg width="100%" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
          <circle
            stroke="#ddd"
            fill="#fff"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div>
          <h1>{gettime(time)}</h1>
        </div>
      </div>
      <button onClick={handler} className="btn btn-block">
        {isactive ? 'pause' : 'play'}
      </button>
      <button onClick={reset} className="btn btn-block">
        reset
      </button>
    </div>
  )
}

export default Pomotimer
