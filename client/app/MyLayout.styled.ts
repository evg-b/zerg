import styled, { css } from 'styled-components'

// backgroundColor: '#bbbbbb'
export const Layout = styled.div`
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-columns: 200px 1fr;
  height: 100vh;
  background-color: #dadada;
`

export const Sidebar = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
  padding: 50px 15px;
`

export const Content = styled.div`
  grid-area: content;
  background-color: #eaeaea;
  padding: 50px 15px;
`

export const SidebarItem = styled.div<{
  $active: boolean
}>`
  cursor: pointer;
  display: flex;
  padding: 10px;
  gap: 15px;

  border-radius: 10px;
  &:hover {
    background-color: #e8e8e8;
  }
  ${({ $active }) =>
    $active &&
    css`
      background-color: #e8e8e8;
    `}
`
