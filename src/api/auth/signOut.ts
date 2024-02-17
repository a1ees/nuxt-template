
export async function signOut() {
    const request = useRequest()
    const response = await request<string>(
        'http://localhost:3002/clear-cookie',
        {
            method: 'GET',
        })

    return response ? response : null
}
