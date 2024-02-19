import type {User} from '@/ts'
import {isAuthErrors, isUser} from "@/common/funcs/auth";

export async function signUp(signUpData: object): Promise<{ success: string, authError: string }> {
    let result = {success: '', authError: ''};
    const request = useRequest()

    try {
        const response = await request<User>(
            'http://localhost:3002/signup',
            {
                method: 'POST',
                body: JSON.stringify(signUpData)
            })
        if (isUser(response)) {
            result.success = response.email;
        }
        if (isAuthErrors(response)) {
            result.authError = "Почта введена некорректно / пользователь уже зарегистрирован"
        }

    } catch (e) {
        console.log(e);
    }
    return result;
}
