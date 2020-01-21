import React from 'react'

import { Paper, Grid } from '@material-ui/core'

export interface RoomLayoutProps {
  header?: React.ReactElement
  headerWrapperProps?: any

  body?: React.ReactElement
  bodyWrapperProps?: any

  footer?: React.ReactElement
  footerWrapperProps?: any
}
const RoomLayout: React.FC<RoomLayoutProps> = ({
  header, headerWrapperProps,
  body, bodyWrapperProps,
  footer, footerWrapperProps,
}) => {
  return (
    <Grid container direction='column' spacing={0} style={{ height: '100%' }}>
      {header && (
        <Grid item  {...headerWrapperProps}
          style={{
            ...headerWrapperProps?.style,
            height: 68
          }}
        >
          <Paper style={{ height: 64, display: 'flex', alignItems: 'center', padding: 8 }}>
            {header}
          </Paper>
        </Grid>
      )}
      {body && (
        <Grid item xs {...bodyWrapperProps}
          style={{
            ...bodyWrapperProps?.style,
            overflowX: 'hidden', overflowY: 'auto', padding: 10
          }}
        >
          {body}
        </Grid>
      )}
      {footer && (
        <Grid
          item {...footerWrapperProps}
          component={Paper}
          container
          alignItems='center'
          justify='center'
          style={{
            ...footerWrapperProps?.style,
            height: 58
          }}
        >
          {footer}
        </Grid>
      )}
    </Grid>
  )
}

export default RoomLayout