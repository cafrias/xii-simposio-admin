import * as React from 'react'

import { MenuItem as MuiMenuItem } from 'material-ui/Menu'
import { ListItemIcon, ListItemText } from 'material-ui/List'


// TYPES 

interface IMenuItem {
  label: string,
  icon: React.SFC | React.ComponentClass,
  href: string,
}

interface IMenuItemProps {
  key: number,
  type: string,
  item: IMenuItem,
}

interface ITextProps {
  label: string,
}

const TextSecondary = ({ label, }: ITextProps) => (
  <ListItemText inset={true} secondary={label} />
)

const TextPrimary = ({ label, }: ITextProps) => (
  <ListItemText inset={true} primary={label} />
)

const MenuItem = ({ key, type, item }: IMenuItemProps) => (
  <MuiMenuItem key={key}>
    <ListItemIcon>
      <item.icon />
    </ListItemIcon>
    {
      type === 'primary'
        ? <TextPrimary label={item.label} />
        : <TextSecondary label={item.label} />
    }
  </MuiMenuItem>
)

export default MenuItem
