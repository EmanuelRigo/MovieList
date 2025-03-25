import { ServerMovie } from "./ServerMovie";
import { ClientMovie } from "./ClientMovie";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  // Asegurarte de que params.id esté disponible
  const id = params?.id;

  if (!id) {
    return <div>Error: No se proporcionó un ID válido.</div>;
  }

  return (
    <div>
      hola
      {/* Componente del lado del servidor */}
      {/* <ServerMovie id={id} /> */}

      {/* Componente del lado del cliente */}
      {/* <ClientMovie movieId={id} /> */}
    </div>
  );
}