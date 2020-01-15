import React from 'react'

import usePrepareField from 'hooks/usePrepareField'
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { MenuItem } from '@material-ui/core'

export type TextFieldProps = MuiTextFieldProps
  & {
    // make name required as a formik field
    name: string,

    // extra integrations
    readOnly?: boolean,
    icon?: React.ReactElement,
    options?: Option[],
  }
export interface Option {
  label: string
  value: any
}
const TextField: React.FC<TextFieldProps> = ({
  name,
  disabled,
  helperText,
  InputProps,

  select, options,
  readOnly, icon,
  ...props
}) => {
  const { field, fieldError, showError, form: { isSubmitting } } = usePrepareField(name)

  return (
    <MuiTextField
      {...props}
      {...field}
      name={name}

      select={select}

      error={showError}
      helperText={showError ? fieldError : helperText}
      disabled={disabled !== undefined ? disabled : isSubmitting}

      InputProps={{
        ...InputProps,
        readOnly,
        startAdornment: icon && (
          <InputAdornment position='start'>
            {icon}
          </InputAdornment>
        ),
      }}
    >
      {select && options && options.map(({ label, value }) => (
        <MenuItem value={value}>{label}</MenuItem>
      ))}
    </MuiTextField>
  )
}
export default TextField