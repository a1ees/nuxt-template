import type {Card} from '@/ts'

export async function getAll() {
  const request = useRequest()
  const response = await request<Card[]>(
    'http://localhost:3002/cards',
    {
      method: 'GET',
    }
  )
  return response ? response : []
}
