"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkOnlineStatus } from "@/components/widgets/users.api";

interface RootLayoutProps {
  children: React.ReactNode;
}

const OnlineStatus = ({ children }: RootLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    const fetchOnlineStatus = async () => {
      try {
        const response = await checkOnlineStatus();

        if (response.status !== 200) {
          const cookies = document.cookie.split("; ");
          for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure; samesite=strict`;
          }
          router.push("/");
        }

        const data = await response.json();

        if (data.response.isOnline !== true) {
          router.push("/login");
          return;
        }
      } catch (error) {
        console.error("Error checking online status:", error);
        router.push("/login");
      }
    };

    fetchOnlineStatus();
  }, []);

  return <>{children}</>;
};

export default OnlineStatus;
