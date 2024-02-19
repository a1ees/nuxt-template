import type {Card} from '@/ts'

export async function likeById(cardId: string, isLiked: boolean) {
  const request = useRequest()
  const method = isLiked ? 'DELETE' : 'PUT';
  const response = await request<Card>(
    `http://localhost:3002/cards/${cardId}/likes`,
    {
      method: method,
      body: method === 'PUT' ? JSON.stringify({}) : undefined
    }
  )
  return response ? response : null
}
