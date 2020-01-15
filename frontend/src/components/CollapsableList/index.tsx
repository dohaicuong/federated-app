import React from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core'

interface CollapsableListProps {
  items: Item[]
  collapsed?: boolean

  selectedIndex?: number
  itemOnClick?: (item: Item, index: number) => void
}
interface Item {
  title: string
  subtitle: string
  icon: React.ReactElement | string
}
const CollapsableList: React.FC<CollapsableListProps> = ({ items, collapsed, selectedIndex = 0, itemOnClick }) => {
  const renderIcon = (icon: React.ReactElement | string): React.ReactElement => {
    if (typeof icon === 'string') return <Avatar style={{ width: 60, height: 60 }} src={icon} />

    return <Avatar style={{ width: 60, height: 60 }}>{icon}</Avatar>
  }

  return (
    <List>
      {items.map(({ icon, title, subtitle }, index) => (
        <ListItem
          key={index}
          button
          selected={selectedIndex === index}
          onClick={() => itemOnClick && itemOnClick({ icon, title, subtitle }, index)}
        >
          <ListItemAvatar style={{ width: 76 }}>
            {renderIcon(icon)}
          </ListItemAvatar>
          {!collapsed && <ListItemText primary={title} secondary={subtitle} />}
        </ListItem>
      ))}
    </List>
  )
}
export default CollapsableList