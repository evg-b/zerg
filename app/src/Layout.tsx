import React, { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

const Layout: FC = () => {
  return (
    <div>
        <AppBar color='transparent' position='static'>
            <Toolbar>
                <Button variant='outlined' component={Link} to={'/'}>Main</Button>
                <Button variant='outlined' component={Link} to={'poolzerg'}>Pool zergs</Button>
            </Toolbar>
        </AppBar>
        <div style={{ padding: 20 }}>

        <Outlet />
        </div>
    </div>
  )
}

export default Layout
