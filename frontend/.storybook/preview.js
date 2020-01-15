import { addDecorator, addParameters } from '@storybook/react'
import withFormik from 'storybook-formik'

addDecorator(withFormik())

addParameters({
  viewport: {}
})