import React from 'react'

import { useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {
  Root,
  Header,
  Sidebar,
  Content,
  CollapseBtn,
  SidebarTrigger,
  SidebarTriggerIcon,
  standardLayoutPreset as presetConfig
} from '@mui-treasury/layout'
import { useMediaQuery } from '@material-ui/core'

interface LayoutProps {
  header: any
  content: any
  sidebar: any
}
const Layout: React.FC<LayoutProps> = ({ header, content, sidebar }) => {
  return (
    <Root config={{
      ...presetConfig,
      sm: {
        ...presetConfig.sm,
        sidebar: {
          ...presetConfig.sm.sidebar,
          // width: 200,
          collapsedWidth: 73,
        },
        header: {
          ...presetConfig.sm.header,
          offsetHeight: 48
        }
      },
    }}>
      {(layoutProps: any) => (
        <AppLayout
          {...layoutProps}
          headerComp={header}
          contentComp={content}
          sidebarComp={sidebar}
        />
      )}
    </Root>
  )
}

export default Layout

const AppLayout = ({
  headerComp, headerStyles,
  contentComp,
  sidebarComp, sidebarStyles,
  collapsed, setCollapsed
}: any) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  React.useEffect(() => setCollapsed(true), [setCollapsed])

  return (
    <>
      <Header style={{
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}>
        <Toolbar style={{ minHeight: 48, paddingLeft: 12 }}>
          <SidebarTrigger className={headerStyles.leftTrigger}>
            <SidebarTriggerIcon style={{ color: theme.palette.primary.contrastText }} />
          </SidebarTrigger>
          <CollapseBtn
            component={IconButton}
            className={headerStyles.leftTrigger}
          >
            {
              collapsed
                ? <ChevronRightIcon style={{ color: theme.palette.primary.contrastText }} />
                : <MenuIcon style={{ color: theme.palette.primary.contrastText }} />
            }
          </CollapseBtn>
          {headerComp}
        </Toolbar>
      </Header>
      <Content style={{ height: 'calc(100vh - 48px)' }}>
        {contentComp}
      </Content>
      <Sidebar>
        <div className={sidebarStyles.container} /* style={{ marginTop: -16 }} */>
          {React.cloneElement(sidebarComp, { collapsed: collapsed && matches })}
        </div>
      </Sidebar>
    </>
  )
}