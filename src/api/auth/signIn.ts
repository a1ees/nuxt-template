import type {User} from '@/ts'
import type {AuthErrors} from '@/ts'

export async function signIn(signIdData: object) {
    const request = useRequest()
    const response = await request<User | AuthErrors>(
        'http://localhost:3002/signin',
        {
            method: 'POST',
            body: JSON.stringify(signIdData)
        })
    return response ? response : null
}

export function isUser(response: any): response is User {
    return response && typeof response === 'object' && '_id' in response;
}

export function isAuthErrors(response: any): response is AuthErrors {
    console.log('1')
    return response && typeof response === 'object' && 'error' || 'message' in response;
}
