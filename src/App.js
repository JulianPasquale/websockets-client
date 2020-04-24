import React, { useState } from 'react'
import Websocket           from 'react-websocket'

import './css/App.css'

export default () => {
  const [count, setCount] = useState(0)
  const [data, setData]   = useState([])

  const handleData = (response) => {
    let result = JSON.parse(response)

    setData(data.concat(result))
    setCount(count + 1)
  }

  return(
    <div className = "App">
      <header className = "App-header">
      <div>
        Count: <strong>{ count } </strong>

        <Websocket
          url       = 'ws://localhost:5000/api/v2/echo'
          onMessage = { handleData }
          debug     = { true }
        />

        <div>
          { data }
        </div>

      </div>
      </header>
    </div>
  )
}
