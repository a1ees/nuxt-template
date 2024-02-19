import type {User} from "@/ts";

export async function editAvatar(avatar: string) {
  const request = useRequest()
  const response = await request<User>(
    'http://localhost:3002/users/me/avatar',
    {
      method: 'PATCH',
      body: JSON.stringify({avatar})
    }
  )
  return response ? response : null
}
