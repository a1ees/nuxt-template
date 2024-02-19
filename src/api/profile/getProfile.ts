import type {User} from '@/ts'

export async function getProfile() {
  const request = useRequest()
  const token = useCookie('jwt')
  const response = await request<User>(
    'http://localhost:3002/users/me',
    {
      method: 'GET',
    }
  )
  return response?._id ? response : null
}
