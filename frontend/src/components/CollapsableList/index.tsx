import React from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core'

interface CollapsableListProps {
  items: Item[] | null
  collapsed?: boolean

  isLoading?: boolean
  renderLoading?: React.ReactElement

  selectedIndex?: number
  itemOnClick?: (item: Item, index: number) => void
}
interface Item {
  id?: string
  title: string
  subtitle?: string
  icon?: React.ReactElement | string
}
const CollapsableList: React.FC<CollapsableListProps> = ({ items, collapsed, selectedIndex = 0, itemOnClick, isLoading, renderLoading }) => {
  const renderIcon = (icon: React.ReactElement | string): React.ReactElement => {
    const style = {} // { width: 60, height: 60 }
    // if (typeof icon === 'string') return <Avatar style={style} src={icon} />

    return <Avatar style={style}>{icon}</Avatar>
  }

  if (isLoading) return renderLoading ? renderLoading : <>Loading...</>

  return (
    <List>
      {items
        ? items.map((item, index) => (
          <ListItem
            key={index}
            button
            title={item.title}
            selected={selectedIndex === index}
            onClick={() => itemOnClick && itemOnClick(item, index)}
          >
            {item.icon && (
              <ListItemAvatar /* style={{ width: 76 }} */>
                {renderIcon(item.icon)}
              </ListItemAvatar>
            )}
            {!collapsed && <ListItemText primary={item.title} secondary={item.subtitle} />}
          </ListItem>
        ))
        : 'No room found'
      }
    </List>
  )
}
export default CollapsableList