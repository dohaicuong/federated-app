import React from 'react'
import { storiesOf } from '@storybook/react'

import AuthForm from '.'
import TextField from 'components/Formik/TextField'
import { Button } from '@material-ui/core'
import AuthSvg from 'resources/authentication.svg'

storiesOf('AuthForm', module)
  .add('login form', () => {
    return (
      <AuthForm
        title='Sign in'
        subtitle='to your chat application'
        image={AuthSvg}
        form={(
          <>
            <AuthTextField label='Email' name='email' type='email' />
            <AuthTextField label='Password' name='password' type='password' />
            <div style={{ display: 'flex' }}>
              <Button style={{ textAlign: 'left', textTransform: 'initial' }}>
                Signup instead
              </Button>
              <div style={{ flexGrow: 1 }} />
              <Button type='submit' variant='contained' color='primary'>
                Login
              </Button>
            </div>
          </>
        )}
      />
    )
  }, {
    formik: {
      initialValues: {
        email: '',
        password: '',
      }
    }
  })

const AuthTextField = (props: any) => {
  return (
    <TextField
      variant='outlined'
      fullWidth
      style={{ marginBottom: 16 }}
      {...props}
    />
  )
}