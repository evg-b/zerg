import React, { FC, useState, useRef } from 'react'
import { useSnackbar } from 'notistack'
import { Button, Menu, MenuItem } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { MenuStatusControlProps } from './MenuStatusControl.type'
import * as Styled from './MenuStatusControl.styled'

const MenuStatusControl: FC<MenuStatusControlProps> = ({
  activeStatus,
  content
}) => {
  const confirm = useConfirm()
  const { enqueueSnackbar } = useSnackbar()

  const btnRef = useRef(null)
  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenMenu = () => setOpenMenu(true)
  const handleCloseMenu = () => setOpenMenu(false)

  const handleClick = (confirmTitle?: string, fn?: () => Promise<any>) => {
    confirm({ title: confirmTitle }).then(() => {
      /* ... */
      fn &&
        fn()
          .then(() => {
            enqueueSnackbar('Change status', { variant: 'success' })
          })
          .catch(() => enqueueSnackbar('Change status', { variant: 'error' }))
          .finally(handleCloseMenu)
    })
  }

  const activeStatusValue = content.filter(
    ({ value }) => value === activeStatus
  )[0]

  const actualContent = content.filter(
    ({ value, onClick }) => value !== activeStatus && onClick !== undefined
  )

  return (
    <div>
      <Button ref={btnRef} onClick={handleOpenMenu}>
        <Styled.StatusItem>
          <span>{activeStatusValue.icon}</span>
          <span>{activeStatusValue.value}</span>
        </Styled.StatusItem>
      </Button>

      <Menu anchorEl={btnRef.current} open={openMenu} onClose={handleCloseMenu}>
        {actualContent.map(({ value, icon, confirmTitle, onClick }, index) => (
          <MenuItem
            key={index}
            onClick={() => handleClick(confirmTitle, onClick)}>
            <Styled.StatusItem>
              <span>{icon}</span>
              <span>{value}</span>
            </Styled.StatusItem>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default MenuStatusControl
