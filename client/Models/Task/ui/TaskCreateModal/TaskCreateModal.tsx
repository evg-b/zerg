'use client'
import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Button, Dialog, Typography, TextField } from '@mui/material'
import { API } from '../../model'

import * as Styled from './TaskCreateModal.styled'

const TaskCreateModal = () => {
  const { mutateAsync } = API.useTaskCreate()
  const { enqueueSnackbar } = useSnackbar()
  const [formData, setFormData] = useState({
    url: '',
    count: ''
  })
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = () => {
    console.log('handleSubmit:', formData)

    setIsLoading(true)
    mutateAsync({ url: formData.url, countZergInitial: Number(formData.count) })
      .then(() => {
        enqueueSnackbar('Task Created', { variant: 'success' })
        handleClose()
      })
      .catch(() => enqueueSnackbar('Task error', { variant: 'error' }))
      .finally(() => {
        setIsLoading(false)
      })
    // Код отправки формы будет здесь
  }

  return (
    <>
      <Button onClick={handleOpen}>New Task</Button>
      <Dialog open={open} onClose={handleClose}>
        <Styled.Wrapper>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Task
          </Typography>
          <Styled.Content>
            <TextField
              placeholder="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
            />
            <TextField
              placeholder="count"
              name="count"
              value={formData.count}
              onChange={handleChange}
            />
          </Styled.Content>
          <Button onClick={handleSubmit} disabled={isLoading}>
            Create
          </Button>
        </Styled.Wrapper>
      </Dialog>
    </>
  )
}

export default TaskCreateModal
