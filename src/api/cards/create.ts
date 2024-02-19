import type {Card} from "@/ts";


export async function create(name: string, link: string) {
  const request = useRequest()
  const response = await request<Card>(
    'http://localhost:3002/cards',
    {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    }
  )
  return response ? response : null
}
