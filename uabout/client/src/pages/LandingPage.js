import React, { useEffect, useState } from 'react'
import httpClient from '../httpClient'

export const LandingPage = () => {
  const [user, setUser] = useState({
    id: null,
    username: ""
  })

  useEffect(() => {

    const checkLoggedIn = async () => {

      try {
        const resp = await httpClient.get("https://uabout.herokuapp.com/@me");

        setUser(resp.data)
      } catch(e) {
        console.log(e)
      }
    }

    checkLoggedIn()

  }, [])
  
  return (
    <>
    <h1>This is the landing page smiley face</h1>
    {user.length > 0
            && <h1>Hello {user}</h1>
    }
    <a href="/login">
        <button >Login</button>
    </a>

    <a href="/register">
        <button >Register</button>
    </a>
    </>
  )
}
