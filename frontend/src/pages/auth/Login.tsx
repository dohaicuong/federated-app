import React from 'react'

import { Link, useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Formik, Form } from 'formik'
import Button from '@material-ui/core/Button'

import AuthForm from 'components/AuthForm'
import TextField from 'components/Formik/TextField'
import SigninSvg from 'resources/authentication.svg'

import { useLoginMutation } from 'generated/graphql'
import gql from 'graphql-tag'
gql`
  mutation Login($data: UserLoginDataInput!) {
    login(data: $data) {
      token
      user {
        id
        name
      }
    }
  }
`

const Login: React.FC = () => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [login] = useLoginMutation()
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <AuthForm
      title='Sign in'
      subtitle='to your chat app account'
      image={SigninSvg}
      isLoading={isLoading}
      form={(
        <Formik
          initialValues={{
            email: '', password: ''
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setIsLoading(true)

            const res = await login({ variables: { data: values }})
              .then(res => res.data?.login)
              .catch(err => null)
            setSubmitting(false)
            setIsLoading(false)

            if(res) {
              const { token, user } = res
              localStorage.setItem('ACCESS_TOKEN', token)

              enqueueSnackbar(`Welcome, ${user.name}!`)
              history.push('/app')
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <AuthTextField name='email' label='Email' type='email' />
              <AuthTextField name='password' label='Password' type='password' />
              <div style={{ display: 'flex' }}>
                <Button
                  component={Link} to='/auth/signup'
                  disabled={isSubmitting}
                  style={{ textTransform: 'lowercase' }}
                >
                  haven't got an account?
                </Button>
                <div style={{ flexGrow: 1 }} />
                <Button
                  variant='contained' color='primary'
                  disabled={isSubmitting}
                  type='submit'
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    />
  )
}
export default Login

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