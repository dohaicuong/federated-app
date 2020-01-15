import React from 'react'

import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'

export interface AuthFormProps {
  title?: string
  subtitle?: string
  image?: string
  form: any
  isLoading?: boolean
}
const AuthForm: React.FC<AuthFormProps> = ({ title, subtitle, image, form, isLoading }) => {
  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))

  const isRightPanel = Boolean(title || subtitle || image)

  const titleRender = title && (
    <Typography variant='h4' style={{ textAlign: 'center' }}>
      {title}
    </Typography>
  )
  const subTitleRender = subtitle && (
    <Typography variant='h5' gutterBottom style={{ textAlign: 'center' }}>
      {subtitle}
    </Typography>
  )

  return (
    <Grid
      container style={{ height: '100vh' }}
      alignItems='center'
      justify='center'
    >
      <Container maxWidth='md'>
        <Paper>
          {isLoading && <LinearProgress variant='indeterminate' style={{ borderRadius: '4px 4px 0 0' }} />}
          <Grid container style={{ padding: 8 }}>
            {!isRightPanel ? null : (
              <Hidden smDown>
                <Grid item xs={12} md={6}>
                  {titleRender}
                  {subTitleRender}
                  <Divider />
                  {image && (
                    <img
                      src={image} alt='1 claim'
                      style={{ width: '100%' }}
                    />
                  )}
                </Grid>
              </Hidden>
            )}
            <Grid
              item xs={12} md={isRightPanel ? 6 : 12}
              container justify='center' alignItems='center'
            >
              <Grid item xs={12} style={{ padding: 16 }}>
                {!mdUp && (
                  <>
                    {titleRender}
                    {subTitleRender}
                    <Divider style={{ marginBottom: 40 }} />
                  </>
                )}
                {form && form}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  )
}

export default AuthForm