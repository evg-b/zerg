import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

/// //////////// тут я делаю шаблоны

const getPoolZergs = async () => {
  const { data } = await axios.get('/api/zerg/pool')
  return data
}

/// ////////////// тут я делаю хуки query и mutation
const HooksAPI = {
  useGetPoolZergs: () => useQuery({ queryKey: ['getPoolZergs'], queryFn: getPoolZergs })
}

export default HooksAPI
