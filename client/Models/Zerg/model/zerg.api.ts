import axios from 'axios'
import useSWR from 'swr'

/// //////////// тут я делаю шаблоны

// const getPoolZergs = async () => {
//   const { data } = await axios.get<Array<{ id: number }>>('/api/zerg/pool')
//   return data
// }
type getPoolZergsResponse = Array<{
  id: number
  url?: string
  status?: string
  progress?: number
}>
const getPoolZergs = async (url: string) =>
  await axios.get(url).then((res) => res.data)
/// ////////////// тут я делаю хуки query и mutation
const HooksAPI = {
  useGetPoolZergs: () =>
    useSWR<getPoolZergsResponse>('/api/zerg/pool', getPoolZergs)
}

export default HooksAPI
