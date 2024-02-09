import type {User} from '@/ts'

export async function signUp(signUpData: object) {
    const request = useRequest()
    const response = await request<User>(
        'https://api.alees.nomoredomainsrocks.ru/signup',
        {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(signUpData)
        })
    console.log(response)
    return response?._id ? response : null
}
