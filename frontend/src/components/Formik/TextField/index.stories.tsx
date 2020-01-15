import React from 'react'
import { storiesOf } from '@storybook/react'
import withPropsCombinations from 'react-storybook-addon-props-combinations'

import TextField from '.'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Paper } from '@material-ui/core'

storiesOf('TextField', module)
  .addDecorator(storyfn => (
    <Paper style={{ padding: 16 }}>
      {storyfn()}
    </Paper>
  ))
  .add('default', () => {
    return <TextField label='Textfield' name='text' />
  })
  .add('props matching', withPropsCombinations(TextField,
    {
      required: [true, false],
      disabled: [true, false],
      icon: [<AccountCircle />, null],
      variant: ['standard', 'outlined'],
    },
    {
      showSource: false,
      CombinationRenderer: ({ Component, props }: any) => {
        const label = Object.entries(props)
          .filter(([key, value]) => Boolean(value))
          .map(([key, value]) => typeof value === 'string' ? value : key)
          .join(' ')

        return (
          <Component
            {...props}
            name='text' label={label}
            style={{
              margin: 8
            }}
          />
        )
      }
    }
  ),
  {
    formik: {
      initialValues: {
        text: 'some default value',
      }
    }
  })