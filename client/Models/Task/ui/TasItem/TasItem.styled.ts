import styled from 'styled-components'

export const TaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 18px;
  height: 100px;
  padding: 15px;
`

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 3px;
`

export const Capture = styled.div`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
`

export const Count = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
`
export const Task = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  border-radius: 18px;
  background-color: #9b9b9b;
`
export const Collapse = styled.div`
  height: 50px;
  overflow: auto;
`

export const ContentTest = styled.div`
  height: 300px;
  width: 300px;
  background-color: gray;
`
