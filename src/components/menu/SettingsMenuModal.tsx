"use client";
import { useState, useEffect } from "react";
import { PiGear } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { updateUser } from "../widgets/users.api";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const SettingsMenuModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = () => {
    console.log("Nuevo username:", username);
    // Acá podrías llamar a una API para cambiar el nombre de usuario
  };

  const handlePasswordChange = () => {
    console.log("Nueva contraseña:", password);
    // Acá podrías llamar a una API para cambiar la contraseña
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm("¿Estás seguro de que deseas borrar tu cuenta?");
    if (confirmDelete) {
      console.log("Cuenta eliminada");
      // Acá podrías hacer la lógica para eliminar la cuenta
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

useEffect(() => {
  const modeCookie = document.cookie
    .split("; ")
    .find(row => row.startsWith("mode="));
  const mode = modeCookie ? modeCookie.split("=")[1] : "light";

  setIsDarkMode(mode === "dark");
}, []);


const handleChangeMode = async () => {
  const modeCookie = document.cookie
    .split("; ")
    .find(row => row.startsWith("mode="));
  const mode = modeCookie ? modeCookie.split("=")[1] : "light";

  if (mode === "dark") {
    const response = await updateUser({ mode: "light" });
    if (response.ok) {
      document.documentElement.classList.remove("dark");
      document.cookie = "mode=light; path=/";
      setIsDarkMode(false); // 👈 actualizar estado
      console.log("Modo claro activado", response);
    }
  } else {
    const response = await updateUser({ mode: "dark" });
    if (response.ok) {
      document.documentElement.classList.add("dark");
      document.cookie = "mode=dark; path=/";
      setIsDarkMode(true); // 👈 actualizar estado
      console.log("Modo oscuro activado", response);
    }
  }
};



  

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-neutral-500 dark:text-neutral-100 text-2xl hover:text-orange-500 transition-colors"
      >
        <PiGear />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-md shadow-lg relative lg:p-7">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              <IoIosArrowBack  className="text-xl text-blue-500 dark:text-yellow-500"/>
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Configuración
            </h2>

            <div className="space-y-6">
              {/* Modo oscuro */}
              <div className="flex justify-between items-center">
                <span className="text-gray-800 dark:text-gray-200">Cambiar Tema:</span>
                <button
  onClick={handleChangeMode}
  className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded-lg"
>
  {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
</button>

              </div>

              {/* Cambiar username */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-800 dark:text-gray-200">Nuevo nombre de usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
                />
                <button
                  onClick={handleUsernameChange}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg self-end"
                >
                  Guardar nombre
                </button>
              </div>

              {/* Cambiar contraseña */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-800 dark:text-gray-200">Nueva contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
                />
                <button
                  onClick={handlePasswordChange}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg self-end"
                >
                  Cambiar contraseña
                </button>
              </div>

              {/* Borrar cuenta */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
                >
                  Borrar cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsMenuModal;
