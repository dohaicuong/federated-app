import React from 'react'
import { storiesOf } from '@storybook/react'

import CollapsableList from '.'
import { Paper, Switch, FormControlLabel } from '@material-ui/core'

const items = [
  { title: 'Miku Hatsune', subtitle: 'Miku: <3 - Yesterday', icon: 'https://avatarfiles.alphacoders.com/729/thumb-72999.png' },
  { title: 'Shinobu Oshino', subtitle: 'Yo - Sunday', icon: 'https://avatarfiles.alphacoders.com/577/thumb-57772.png' },
  { title: 'Teri Teri', subtitle: 'Kanchou - Yesterday', icon: 'https://i.pinimg.com/736x/19/b0/d0/19b0d09e9acd41b4aad6c3fe7bd4d162.jpg' },
]
storiesOf('CollapsableList', module)
  .add('default', () => {
    const [collapsed, setCollapsed] = React.useState(false)
    const [selected, setSelected] = React.useState(0)

    return (
      <>
        <FormControlLabel
          label='Collapsed?'
          control={<Switch checked={collapsed} onChange={(e: any) => setCollapsed(e.target.checked)} />}
        />
        <Paper style={{ width: collapsed ? 90 : 300 }}>
          <CollapsableList
            items={items}
            collapsed={collapsed}

            selectedIndex={selected}
            itemOnClick={(item, index) => {
              setSelected(index)
            }}
          />
        </Paper>
      </>
    )
  })
