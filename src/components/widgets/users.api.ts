export async function createUser(userData: any): Promise<Response> {
    const res = await fetch("http://localhost:9000/api/sessions/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    return res;
}

export async function loginUser(credentials: { email: string; password: string }): Promise<Response> {
    const res = await fetch("http://localhost:9000/api/sessions/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(credentials),
    });
    return res;
}


export async function checkOnlineStatus(): Promise<Response> {
    const res = await fetch("http://localhost:9000/api/sessions/online", {
        method: "POST",
        credentials: "include", 
    });

    console.log(res)
    return res;
}

export async function logoutUser(): Promise<Response> {
    const res = await fetch("http://localhost:9000/api/sessions/signout", {
        method: "POST",
        credentials: "include", 
    });
    return res;
}