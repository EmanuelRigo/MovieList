import { User, isOnline } from "@/context/interfaces/movieTypes";
import envsUtils from "@/utils/envs.utils";

const BACKEND_URL = envsUtils.BACKEND_URL;
console.log("🚀 ~ API_URL:", BACKEND_URL);

export async function createUser(userData: User): Promise<Response> {
  console.log("🚀 ~ envsUtils:", envsUtils);
  const res = await fetch(`${BACKEND_URL}/api/sessions/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res;
}

export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<Response> {
  console.log("🚀 ~ loginUser ~ credentials:", credentials);
  const res = await fetch(`${BACKEND_URL}/api/sessions/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  return res;
}

export async function updateUser(userData: User): Promise<Response> {
  const res = await fetch(`${BACKEND_URL}/api/sessions/update`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res;
}

export async function checkOnlineStatus(): Promise<Response> {
  const res = await fetch(`${BACKEND_URL}/api/sessions/online`, {
    // CORREGIDO: uso de backticks
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  return res;
}

export async function logoutUser(): Promise<Response> {
  const res = await fetch(`${BACKEND_URL}/api/sessions/signout`, {
    // CORREGIDO: uso de backticks
    method: "POST",
    credentials: "include",
  });
  return res;
}

export async function deleteAccount(password: string): Promise<Response> {
  const res = await fetch(`${BACKEND_URL}/api/sessions/delete`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  return res;
}

export async function createCookie(): Promise<Response> {
  const res = await fetch(`${BACKEND_URL}/api/cookies/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error al obtener la cookie: ${res.status}`);
  }

  return res;
}

export async function getCookie(): Promise<Response> {
  const res = await fetch(`${BACKEND_URL}/api/cookies/read`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error al obtener la cookie: ${res.status}`);
  }

  return res;
}
