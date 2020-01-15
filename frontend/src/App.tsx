import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ThemeProvider from 'providers/ThemeProvider'
import RouteProvider from 'providers/RouteProvider'

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <ThemeProvider>
          <RouteProvider />
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
