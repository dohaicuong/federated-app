import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ThemeProvider from 'providers/ThemeProvider'
import RouteProvider from 'providers/RouteProvider'
import ApolloProvider from 'providers/ApolloProvider'
import { SnackbarProvider, useSnackbar } from 'notistack'

const App: React.FC = () => {
  return (
    <div className='App'>
      <SnackbarProvider
        autoHideDuration={1500}
        preventDuplicate={true}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Router>
          <ThemeProvider>
            <ApolloProvider>
              <RouteProvider />
              <Inject />
            </ApolloProvider>
          </ThemeProvider>
        </Router>
      </SnackbarProvider>
    </div>
  )
}

export default App

const Inject = () => {
  const { enqueueSnackbar } = useSnackbar()
  window.enqueueSnackbar = enqueueSnackbar

  return null
}