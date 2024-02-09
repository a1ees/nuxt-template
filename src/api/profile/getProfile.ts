import type { User } from '@/ts'

export async function getProfile() {
  const request = useRequest()
  const response = await request<User>(
      'https://api.alees.nomoredomainsrocks.ru/users/me',
      {
        method: 'GET',
        credentials: 'include',
      }
  )
    console.log(response)
  return response?._id ? response : null
}
