import { useField, useFormikContext } from 'formik'

const usePrepareField = (name: string) => {
  const [field, meta, helpers] = useField(name)
  const form = useFormikContext()
  const fieldError = meta.error
  const showError = meta.touched && !!fieldError

  return {
    form,
    field, meta, helpers,
    fieldError, showError,
  }
}
export default usePrepareField