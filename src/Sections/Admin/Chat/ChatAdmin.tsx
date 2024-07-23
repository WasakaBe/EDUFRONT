import { useState, useEffect } from 'react';
import { apiUrl } from '../../../constants/Api';
import './ChatAdmin.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MensajeContacto {
  id: number;
  nombre: string;
  app?: string;
  apm?: string;
  correo: string;
  motivo: string;
  fecha: string;
  tipo: string; // Para distinguir el tipo de mensaje
}

interface MensajeContactoAPI {
  id_mensaje_contacto: number;
  nombre_mensaje_contacto: string;
  correo_mensaje_contacto: string;
  motivo_mensaje_contacto: string;
  fecha_mensaje: string;
}

interface MensajeMotivoCredencialAPI {
  id_mensajes_motivo_credencial: number;
  nombre_alumnos: string;
  app_alumnos: string;
  apm_alumnos: string;
  correo_usuario: string;
  nombre_motivo_credencial: string;
  fecha_motivo_credencial: string;
}

export default function ChatAdmin() {
  const [mensajes, setMensajes] = useState<MensajeContacto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [messagesPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchData = async <T,>(url: string, mapFunction: (data: T[]) => MensajeContacto[]) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching data from ${url}`);
        }
        const data: T[] = await response.json();
        const mappedData = mapFunction(data);
        setMensajes((prevMensajes) => [...prevMensajes, ...mappedData]);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData<MensajeContactoAPI>(`${apiUrl}mensaje_contacto`, (data) =>
      data.map((mensaje) => ({
        id: mensaje.id_mensaje_contacto,
        nombre: mensaje.nombre_mensaje_contacto,
        correo: mensaje.correo_mensaje_contacto,
        motivo: mensaje.motivo_mensaje_contacto,
        fecha: mensaje.fecha_mensaje,
        tipo: 'contacto',
      }))
    );

    fetchData<MensajeMotivoCredencialAPI>(`${apiUrl}mensaje_motivo_credencial`, (data) =>
      data.map((mensaje) => ({
        id: mensaje.id_mensajes_motivo_credencial,
        nombre: mensaje.nombre_alumnos,
        app: mensaje.app_alumnos,
        apm: mensaje.apm_alumnos,
        correo: mensaje.correo_usuario,
        motivo: mensaje.nombre_motivo_credencial,
        fecha: mensaje.fecha_motivo_credencial,
        tipo: 'motivo credencial',
      }))
    );
  }, []);

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = mensajes.slice(indexOfFirstMessage, indexOfLastMessage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="chat-admin-container">
      <h2>Mensajes</h2>
      {loading ? (
        <p className="loading">Cargando...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <>
          <table className="mensajes-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Motivo</th>
                <th>Fecha</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {currentMessages.map((mensaje) => (
                <tr key={`${mensaje.tipo}-${mensaje.id}`}>
                  <td>{mensaje.nombre} {mensaje.app} {mensaje.apm}</td>
                  <td>{mensaje.correo}</td>
                  <td>{mensaje.motivo}</td>
                  <td>{new Date(mensaje.fecha).toLocaleDateString()}</td>
                  <td>{mensaje.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(mensajes.length / messagesPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={index + 1 === currentPage ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}
