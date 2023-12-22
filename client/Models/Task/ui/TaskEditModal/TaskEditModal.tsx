'use client'
import React, { FC, useEffect } from 'react'
import { trpc } from 'trpc'
import { Modal, Form, Input, InputNumber, message } from 'antd'

// import * as Styled from './TaskCreateModal.styled'

type OwnProps = {
  id: string
  url: string
  count: number
  open: boolean
  onClose: () => void
}

const TaskEditModal: FC<OwnProps> = ({ id, url, count, open, onClose }) => {
  const [form] = Form.useForm<{ url: string; count: number }>()
  const [messageApi, contextHolder] = message.useMessage()
  const { mutate, isLoading, isSuccess, isError, error } =
    trpc.tasks.updateTask.useMutation()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      console.log('Success:', values)
      mutate({
        id,
        url: values.url,
        count: Number(values.count)
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (isSuccess) {
      console.log('useEffect:', isSuccess)
      messageApi.open({
        type: 'success',
        content: 'Task edit Success'
      })
      handleCancel()
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
      <Modal
        title="Edit task"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        okText="edit"
        cancelText="cancel">
        <Form
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ url, count }}
          onFinish={handleOk}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item label="id">{id}</Form.Item>
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

export default TaskEditModal
