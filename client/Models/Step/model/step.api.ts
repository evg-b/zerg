import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { StepListRes } from '@models/dto'

// const queryClient = useQueryClient()

const getStepByTaskId = (taskid: string) =>
  axios
    .get('/api/step/taskid', { params: { taskid: taskid } })
    .then((res) => res.data)

export const API = {
  useGetStepByTaskId: (taskid: string) =>
    useQuery<StepListRes>({
      queryKey: ['step-by-taskid', taskid],
      queryFn: () => getStepByTaskId(taskid)
    })
}
