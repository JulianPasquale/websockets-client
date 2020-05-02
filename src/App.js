import React, { useState } from 'react'
import Websocket           from 'react-websocket'
import { useLocation }     from "react-router-dom"

import './css/App.css'

const renderItem = (item) => {
  const { key, ...fields } = item

  const list =  Object.entries(fields).map(([k, v]) =>
    <p>
      <b>{ k }</b>: { v }
    </p>
  )

  return(
    <li key = { key }>
      { list }
    </li>
  )
}

export default () => {
  const [count, setCount] = useState(0)
  const [data, setData]   = useState([])

  // Gets current path
  let location = useLocation()

  const handleData = (response) => {
    let result = JSON.parse(response)
    result.key = count

    setData([result, ...data])
    setCount(count + 1)
  }

  return(
    <div className = 'App'>
      <header className = 'App-header'>
        Received rows: { count }
      </header>

      {/* Uses current path and parameters to connect websocket endpoint dinamically */}
      <Websocket
        url       = { `ws://localhost:5000/api/v2${location.pathname}${location.search}` }
        onMessage = { handleData }
      />

        <ul> { data.map(renderItem) } </ul>

    </div>
  )
}
