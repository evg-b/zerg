'use client'
import React, { FC, PropsWithChildren } from 'react'

import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'

import * as Styled from './MyLayout.styled'

const MyLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()

  const pages = [
    {
      key: '1',
      icon: <VideoCameraOutlined />,
      label: 'Tasks',
      url: '/',
      routerPush: router.push
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Zergs',
      url: '/zerg',
      routerPush: router.push
    }
  ]

  return (
    <Styled.Layout>
      <Styled.Sidebar>
        {pages.map(({ key, label, icon, routerPush, url }) => {
          const active = pathname === url
          return (
            <Styled.SidebarItem
              key={key}
              $active={active}
              onClick={() => routerPush(url)}>
              <span>{icon}</span>
              <span>{label}</span>
            </Styled.SidebarItem>
          )
        })}
      </Styled.Sidebar>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Layout>
  )
}

export default MyLayout
