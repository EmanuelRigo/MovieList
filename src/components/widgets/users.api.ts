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
      body: JSON.stringify({}), // Enviar un cuerpo vacío si el servidor lo requiere
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