import React from 'react'
import ReactDOM from 'react-dom/client'
import { StarRating } from './components/StarRating/StarRating'
// import App from './App.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}

    <StarRating maxiRating={11}/>
    <StarRating maxiRating={8}/>
    <StarRating/>
  </React.StrictMode>,
)
