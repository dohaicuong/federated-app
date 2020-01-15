import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Helmet } from 'react-helmet'

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <>
      <Helmet>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Helmet>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </>
  )
}

export default ThemeProvider

const theme = createMuiTheme()