import React from 'react'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Helmet } from 'react-helmet'

const ThemeProvider: React.FC = ({ children }) => {
  overrideStyles()

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

const overrideStyles = makeStyles({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  }
})
