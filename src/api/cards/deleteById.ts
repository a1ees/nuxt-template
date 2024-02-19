import type {Card} from '@/ts'

export async function deleteById(cardId: string) {
  const request = useRequest()
  const response = await request<Card>(
    `http://localhost:3002/cards/${cardId}`,
    {
      method: 'DELETE',
    }
  )
  return response ? response : null
}
