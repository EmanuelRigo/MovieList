"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginUser } from "@/components/widgets/users.api";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const credentials = {
        email,
        password,
      }
      const response = await loginUser(credentials)

      if (response.ok) {
        console.log(response)
        console.log("Inicio de sesión exitoso");
        router.push("/"); // Redirige a la página de inicio después del inicio de sesión exitoso
      } else {
        console.error("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 w-full">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-black dark:text-gray-100">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-white dark:bg-neutral-700 text-black dark:text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black dark:text-gray-100">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-white dark:bg-neutral-700 text-black dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 dark:bg-orange-500 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-orange-600"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/register" className="text-blue-500 dark:text-orange-500 hover:underline">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;