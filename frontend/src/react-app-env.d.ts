/// <reference types="react-scripts" />

interface Window {
  enqueueSnackbar: (message: React.ReactNode, options?: OptionsObject | undefined) => string | number | null | undefined
}

declare module 'react-storybook-addon-props-combinations'
declare module '@mui-treasury/layout'
declare module '@mui-treasury/components/chatMsg/ChatMsg'