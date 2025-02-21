"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para autenticar al usuario
    // Por ejemplo, hacer una solicitud a tu API de autenticación

    // Simulación de autenticación exitosa
    if (email === "user@example.com" && password === "password") {
      router.push("/"); // Redirige a la página principal después del inicio de sesión exitoso
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black w-full">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-100">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-100">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;