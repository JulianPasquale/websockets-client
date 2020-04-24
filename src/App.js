import React, { useState } from 'react'
import Websocket           from 'react-websocket'

import './css/App.css'

export default () => {
  const [count, setCount] = useState(0)
  const [data, setData]   = useState([])

  const handleData = (response) => {
    let result = JSON.parse(response)
    result.key = count

    setData([result, ...data])
    setCount(count + 1)
  }

  const renderItem = (item) => {
    const { key, ...fields } = item
    return Object.entries(fields).map(([k, v]) =>
      <li key = { key }>
        <b className = 'App-link'>{ k }</b>: { v }
      </li>
    )
  }

  return(
    <div className = "App">
      <header className = "App-header">
      <div>
        Count: <strong>{ count } </strong>

        <Websocket
          url       = 'ws://localhost:5000/api/v2/samples'
          onMessage = { handleData }
          debug     = { true }
        />

        <div>
          <ul>
            {
              data.map(renderItem)
            }
          </ul>
        </div>

      </div>
      </header>
    </div>
  )
}
