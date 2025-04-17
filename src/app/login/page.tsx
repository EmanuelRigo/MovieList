"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loginUser } from "@/components/widgets/users.api";
import { useRouter } from "next/navigation";

function getCookie(name: string) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : undefined;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para el error de login
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("onlineUser");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const credentials = {
        email,
        password,
      };
      const response = await loginUser(credentials);
      console.log("🚀🚀🚀  ~ handleLogin ~ response:", response);

      if (response.ok) {
        console.log("Inicio de sesión exitoso");
        setError(""); // Limpiamos el error en caso de éxito
        window.location.href = "/";
      } else {
        console.error("Error en el inicio de sesión");
        setError("Email o contraseña incorrecta."); // Actualizamos el estado con el error
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError("Error en el inicio de sesión. Por favor, intente nuevamente.");
    }
  };

  return (
    <div className="h-[calc(100vh-56px)] overflow-auto md:h-screen flex items-center justify-center bg-neutral-300 dark:bg-neutral-900 w-full ">
    
      <div className="bg-white dark:bg-neutral-800 h-full md:h-auto p-8 rounded-lg shadow-lg w-full md:max-w-md flex justify-center items-start flex-col ">
      
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleLogin} className="w-full">
  <div className="mb-4 w-full">
    <label className="block text-black dark:text-gray-100">
      Correo Electrónico
    </label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 border-2 border-gray-300 dark:border-gray-700 rounded mt-1 bg-white dark:bg-neutral-700 text-black dark:text-white"
      required
    />
  </div>
  <div className="mb-6 w-full">
    <label className="block text-black dark:text-gray-100">
      Contraseña
    </label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 border-2 border-gray-300 dark:border-gray-700 rounded mt-1 bg-white dark:bg-neutral-700 text-black dark:text-white"
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
          <Link
            href="/register"
            className="text-blue-500 dark:text-orange-500 hover:underline"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
        {/* Mensaje de error renderizado solo cuando exista */}
        {error && (
          <p className="mt-2 text-center text-red-500">
            {error}
          </p>
        )}
      </div>
   
    </div>
  );
};

export default LoginPage;
