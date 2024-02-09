import type {User} from '@/ts'

export async function signIn(signIdData: object) {
    const request = useRequest()
    const response = await request<User>(
        'https://api.alees.nomoredomainsrocks.ru/signin',
        {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(signIdData)
        })

    return response?._id ? response : null
}
