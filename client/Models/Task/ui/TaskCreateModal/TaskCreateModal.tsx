'use client'
import React, { useState, useEffect } from 'react'
import { trpc } from 'trpc'
import { Button, Modal, Form, Input, InputNumber, message } from 'antd'

// import * as Styled from './TaskCreateModal.styled'

const TaskCreateModal = () => {
  const [form] = Form.useForm<{ url: string; count: number }>()
  const [messageApi, contextHolder] = message.useMessage()
  const { mutate, isLoading, isSuccess, isError, error } =
    trpc.tasks.createTask.useMutation()
  const [open, setOpen] = useState(false)
  // const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      console.log('Success:', values)
      mutate({
        url: values.url,
        count: Number(values.count)
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {
    if (isSuccess) {
      console.log('useEffect:', isSuccess)
      handleCancel()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: 'success',
        content: 'New Task create Success'
      })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  }, [isError, error])

  return (
    <>
      {contextHolder}
      <Button onClick={showModal}>New Task</Button>
      <Modal
        title="Create New Task"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        okText="create"
        cancelText="cancel">
        <Form
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          // initialValues={{ remember: true }}
          onFinish={handleOk}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="url"
            name="url"
            rules={[{ required: true, message: 'Please input url!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="count"
            name="count"
            rules={[{ required: true, message: 'Please input count!' }]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TaskCreateModal
