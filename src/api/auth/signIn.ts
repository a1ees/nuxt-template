import type {AuthErrors, User} from '@/ts'
import {isAuthErrors, isUser} from "@/common/funcs/auth";

export async function signIn(signInData: object): Promise<{ success: boolean, authError: string }> {
    const request = useRequest();
    let result = {success: false, authError: ''};
    try {
        const response = await request<User | AuthErrors>(
            'http://localhost:3002/signin',
            {
                method: 'POST',
                body: JSON.stringify(signInData)
            }
        );

        if (isUser(response)) {
            result.success = true;
        }
        if (isAuthErrors(response)) {
            result.authError = "Неверно введен логин / пароль";
        }

    } catch (e) {
        console.log(e);
    }
    return result;
}
