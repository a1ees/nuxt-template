import type { AuthErrors, User } from "@/ts";

export function isUser(response: any): response is User {
    return response && typeof response === 'object' && '_id' in response;
}

export function isAuthErrors(response: any): response is AuthErrors {
    return response && typeof response === 'object' && 'error' || 'message' in response;
}
