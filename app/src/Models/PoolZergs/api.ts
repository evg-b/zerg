import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
/// //////////// тут я делаю шаблоны

const API = {
  getPoolZergs: async () => {
    const { data } = await axios.get('/api/zerg/pool')
    return data
  }
}
const HooksAPI = {
  // useGetPoolZergs: useQuery({ queryKey: ['getPoolZergs'], queryFn: API.getPoolZergs })
}

export default HooksAPI
/// ////////////// тут я делаю хуки query и mutation
