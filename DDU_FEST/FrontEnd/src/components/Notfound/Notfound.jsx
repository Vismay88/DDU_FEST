import React from 'react'
import { Link } from 'react-router-dom'
import "./notfound.css"
const Notfound = () => {
  return (
    <div id="pagenotfound">
    <div className="pagenotfound">
        <div className="notfound404">
            <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable</p>
        <Link to="/">Go To Homepage</Link>
    </div>
</div>
  )
}

export default Notfound