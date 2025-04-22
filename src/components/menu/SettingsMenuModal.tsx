"use client";
import { useState, useEffect } from "react";
import { PiGear } from "react-icons/pi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  updateUser,
  updateUserPassword,
  deleteAccount,
} from "../widgets/users.api";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useMovieContext } from "@/context/MovieContext";
import { useRouter } from "next/navigation";

const SettingsMenuModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { setUsername } = useMovieContext();
  const [usernameInput, setUsernameInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  function deleteAllCookies() {
    const cookies = ["mode", "name", "onlineUser", "token"];

    cookies.forEach((cookie) => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }

  useEffect(() => {
    const modeCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("mode="));
    const mode = modeCookie ? modeCookie.split("=")[1] : "light";

    setIsDarkMode(mode === "dark");
  }, []);

  const handleChangeMode = async () => {
    const modeCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("mode="));
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

  const handleChangeUsername = async () => {
    const response = await updateUser({ username: usernameInput });
    if (response.ok) {
      document.cookie = `name=${usernameInput}; path=/`;
      setUsername(usernameInput);
    } else {
      console.error("Error al actualizar el nombre de usuario", response);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const response = await updateUserPassword(currentPassword, newPassword);
    if (response.ok) {
      alert("Password changed");
      setIsOpen(false);
      // Limpiar inputs
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Failed to change password");
    }
  };

  const handleDeleteAccount = () => {
    deleteAccount(password)
      .then((response) => {
        if (response.ok) {
          console.log("Cuenta eliminada con éxito", response);
          router.push("/login");
          deleteAllCookies();
        } else {
          console.error("Error al eliminar la cuenta", response);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar la cuenta", error);
      });
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-neutral-500 dark:text-neutral-100 text-2xl hover:text-yellow-500 transition-colors"
      >
        <PiGear />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-md shadow-lg relative lg:p-7">
            <div className="space-y-6">
              {/* Modo oscuro */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-gray-800 dark:text-gray-200">
                    Change Theme:
                  </span>
                  <button onClick={handleChangeMode} className="text-3xl">
                    {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
                  </button>
                </div>{" "}
                <button
                  onClick={() => setIsOpen(false)}
                  className=" text-gray-500 hover:text-red-500  flex justify-end "
                >
                  <IoIosArrowBack className="text-3xl text-blue-500 dark:text-yellow-500 " />
                </button>
              </div>

              {/* Cambiar username */}
              <div className="flex flex-col gap-2 border-t-2 border-neutral-400 dark:border-neutral-700 pt-6">
                <label className="text-gray-800 dark:text-gray-200">
                  New username
                </label>
                <div className="w-full flex ">
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="px-3 py-2 rounded-lg border-2 border-neutral-400 dark:border-neutral-700 dark:bg-zinc-800 dark:text-white flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
                  />

                  <button
                    onClick={handleChangeUsername}
                    className=" text-neutral-600 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-yellow-500  ps-4  py-2 rounded-lg self-end h-full text-3xl flex items-center justify-end"
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>

              {/* Cambiar contraseña */}
              <div className="flex flex-col gap-4 border-y-2 border-neutral-400 dark:border-neutral-700 py-6">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    To change your password, please enter your current password
                    first.
                  </p>
                  <label className="text-gray-800 dark:text-gray-200">
                    Current password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="px-3 py-2 rounded-lg border-2 border-neutral-400 dark:border-neutral-700 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
                  />
                </div>
                {/* Confirmar nueva contraseña */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-800 dark:text-gray-200">
                    New password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="px-3 py-2 rounded-lg border-2 border-neutral-400 dark:border-neutral-700 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
                  />
                </div>{" "}
                {/* Nueva contraseña */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-800 dark:text-gray-200">
                    Confirm new password
                  </label>
                  <div className="w-full flex">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="px-3 py-2 rounded-lg border-2 border-neutral-400 dark:border-neutral-700 dark:bg-zinc-800 dark:text-white flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
                    />
                    <button
                      onClick={handlePasswordChange}
                      className="text-neutral-600 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-yellow-500  ps-4 py-2 rounded-lg self-end h-full text-3xl flex items-center justify-end transition-colors"
                    >
                      <IoIosArrowForward />
                    </button>
                  </div>
                </div>
              </div>

              {/* Borrar cuenta */}
              <div className="">
                <label className="text-gray-800 dark:text-gray-200 text-sm ">
                  To delete your account, please enter your password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 rounded-lg border-2 border-neutral-400 dark:border-neutral-700 dark:bg-zinc-800 dark:text-white w-full my-3"
                />
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
                >
                  Delete Account
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
