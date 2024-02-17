import type {User} from '@/ts'

export async function signUp(signUpData: object) {
    const request = useRequest()
    const response = await request<User>(
        'http://localhost:3002/signup',
        {
            method: 'POST',
            body: JSON.stringify(signUpData)
        })
    console.log(response)
    return response ? response : null
}
