'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMovieContext } from '@/context/MovieContext'
import { checkOnlineStatus } from '@/components/widgets/users.api'

interface RootLayoutProps {
  children: React.ReactNode;
}

const OnlineStatus = ({ children }: RootLayoutProps) => {
  const { setUserData } = useMovieContext()
  const router = useRouter()
  const [isReady, setIsReady] = useState(false) // antes era `loading`

  useEffect(() => {
    const fetchOnlineStatus = async () => {
      try {
        const response = await checkOnlineStatus()

        if (response.response.isOnline !== true) {
          console.log("🚀 ~ Usuario offline:", response.response.isOnline)
          router.push('/login')
          return
        }

        setUserData(response.response)
        setIsReady(true) // solo habilita el render si está online

      } catch (error) {
        console.error('Error checking online status:', error)
        setIsReady(true) // Si hay un error, aún habilita el render (puedes ajustar esto según tu lógica)
        router.push('/login')
      }
    }

    fetchOnlineStatus()
  }, [router, setUserData])

  if (!isReady) return <h1>Loading...</h1> // spinner opcional

  return <>{children}</>
}

export default OnlineStatus
