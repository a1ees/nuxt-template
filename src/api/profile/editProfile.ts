import type {User} from "@/ts";

interface UserProfileUpdate {
  name: string;
  about: string;
}

export async function editProfile(updateData: UserProfileUpdate) {
  const request = useRequest()
  const response = await request<User>(
    'http://localhost:3002/users/me',
    {
      method: 'PATCH',
      body: JSON.stringify({
        name: updateData.name,
        about: updateData.about
      })
    }
  )
  return response ? response : null
}
