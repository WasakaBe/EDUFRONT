import './InfoAlumn.css';
import { useState, useEffect } from 'react';
import { apiUrl } from '../../../../constants/Api';

// Definir la interfaz para los datos de alumnos
interface Alumno {
  id_alumnos: number;
  foto_alumnos?: string;
  nombre_alumnos: string;
  app_alumnos: string;
  apm_alumnos: string;
  fecha_nacimiento_alumnos: string;
  curp_alumnos: string;
  telefono_alumnos: string;
}

export default function InfoAlumn() {
  // Tipar el estado de alumnos con la interfaz definida
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  useEffect(() => {
    // Función para obtener los datos de los alumnos
    const fetchAlumnos = async () => {
      try {
        const response = await fetch(`${apiUrl}alumno`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error('Error fetching alumnos:', error);
      }
    };

    fetchAlumnos();
  }, []);

  return (
    <div className="info-alumn-container">
      <h1>Lista de Alumnos</h1>
      {alumnos.length === 0 ? (
        <p>No hay alumnos disponibles.</p>
      ) : (
        <table className="alumnos-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Fecha de Nacimiento</th>
              <th>CURP</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map(alumno => (
              <tr key={alumno.id_alumnos}>
                <td>
                  {alumno.foto_alumnos && (
                    <img
                      src={`data:image/jpeg;base64,${alumno.foto_alumnos}`}
                      alt={`${alumno.nombre_alumnos}`}
                      className="foto-alumno"
                    />
                  )}
                </td>
                <td>{alumno.nombre_alumnos}</td>
                <td>{alumno.app_alumnos}</td>
                <td>{alumno.apm_alumnos}</td>
                <td>{alumno.fecha_nacimiento_alumnos}</td>
                <td>{alumno.curp_alumnos}</td>
                <td>{alumno.telefono_alumnos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
