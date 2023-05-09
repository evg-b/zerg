import axios from 'axios'
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { TaskListRes, TaskCreateReq, TaskEditReq } from '@models/dto'

const getTaskList = () => axios.get('/api/task/pool').then((res) => res.data)

const postTaskCreate = (value: TaskCreateReq) =>
  axios.post('/api/task/create', value)

const postTaskEdit = (taskEdit: TaskEditReq) =>
  axios.post('/api/task/edit', taskEdit)

const postTaskDelete = (taskId: TaskEditReq['taskId']) =>
  axios.post('/api/task/delete', { taskId })

export const API = {
  useTaskGetList: () =>
    useQuery<TaskListRes>({ queryKey: ['task-list'], queryFn: getTaskList }),
  useTaskCreate: () =>
    useMutation({
      mutationFn: postTaskCreate
      // onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ['task-list'] })
      // }
    }),
  useTaskEdit: (queryClient: QueryClient) =>
    useMutation({
      mutationFn: postTaskEdit,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['task-list'] })
      }
    }),
  useTaskDelete: (queryClient: QueryClient) =>
    useMutation({
      mutationFn: postTaskDelete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['task-list'] })
      }
    })
}
