import React from 'react'

import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import Button from '@material-ui/core/Button'

import AuthForm from 'components/AuthForm'
import TextField from 'components/Formik/TextField'
import SignupSvg from 'resources/step_to_the_sun.svg'
import { useSnackbar } from 'notistack'

import { useSignupMutation } from 'generated/graphql'
import gql from 'graphql-tag'
gql`
  mutation Signup($data: UserSignupDataInput!) {
    signup(data: $data) {
      token
      user {
        id
        name
      }
    }
  }
`

const Signup: React.FC = () => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [signup] = useSignupMutation()
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <AuthForm
      title='Sign up'
      subtitle='a new chat app account'
      image={SignupSvg}
      isLoading={isLoading}
      form={(
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setIsLoading(true)

            const res = await signup({ variables: { data: values } })
              .then(res => res.data?.signup)
              .catch(err => null)
            setSubmitting(false)
            setIsLoading(false)

            if (res) {
              const { token, user } = res
              localStorage.setItem('ACCESS_TOKEN', token)

              enqueueSnackbar(`Welcome, ${user.name}!`)
              history.push('/app')
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete='off'>
              {[
                { name: 'name', label: 'Name' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'password', label: 'Password', type: 'password' },
              ].map(field => (
                <AuthTextField key={field.name} {...field} autoComplete={`new-${field.name}`} />
              ))}

              <div style={{ display: 'flex' }}>
                <Button
                  component={Link} to='/auth/login'
                  style={{ textTransform: 'lowercase' }}
                >
                  already got an account?
                </Button>
                <div style={{ flexGrow: 1 }} />
                <Button variant='contained' color='primary' type='submit'>
                  Signup
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    />
  )
}

export default Signup
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