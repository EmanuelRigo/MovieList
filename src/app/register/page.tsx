"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para registrar al usuario
    // Por ejemplo, hacer una solicitud a tu API de registro

    // Simulación de registro exitoso
    console.log({ username, password, firstname, lastname, email });
    router.push("/login"); // Redirige a la página de inicio de sesión después del registro exitoso
  };

  return (
    <div className="h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 w-full">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Registrarse</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-black dark:text-gray-100">Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-white dark:bg-neutral-700 text-black dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-gray-100">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-white dark:bg-neutral-700 text-black dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-gray-100">Nombre</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-white dark:bg-neutral-700 text-black dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-gray-100">Apellido</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-white dark:bg-neutral-700 text-black dark:text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black dark:text-gray-100">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-white dark:bg-neutral-700 text-black dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 dark:bg-orange-500 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-orange-600"
          >
            Registrarse
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-500 dark:text-orange-500 hover:underline">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;