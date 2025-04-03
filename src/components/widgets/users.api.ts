import { User } from "@/context/interfaces/movieTypes";

export async function createUser(userData: User): Promise<Response> {
    const res = await fetch("https://movielist-backend.vercel.app/api/sessions/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    return res;
}

export async function loginUser(credentials: { email: string; password: string }): Promise<Response> {
    const res = await fetch("https://movielist-backend.vercel.app/api/sessions/login", {
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
    const res = await fetch("https://movielist-backend.vercel.app/api/sessions/online", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (!res.ok) {
      throw new Error(`Error al verificar el estado online: ${res.status}`);
    }
    console.log(res);
    return res;
  }

export async function logoutUser(): Promise<Response> {
    const res = await fetch("https://movielist-backend.vercel.app/api/sessions/signout", {
        method: "POST",
        credentials: "include", 
    });
    return res;
}


export async function createCookie(mode: string): Promise<Response> {
    const res = await fetch(`https://movielist-backend.vercel.app/api/cookies/create`, {
        method: "POST",
        credentials: "include", // Asegura que las cookies se envíen con la solicitud
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Error al obtener la cookie: ${res.status}`);
    }

    return res;
}

export async function getCookie(mode: string): Promise<Response> {
    const res = await fetch(`https://movielist-backend.vercel.app/api/cookies/read`, {
        method: "GET",
        credentials: "include", // Asegura que las cookies se envíen con la solicitud
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Error al obtener la cookie: ${res.status}`);
    }

    return res;
}