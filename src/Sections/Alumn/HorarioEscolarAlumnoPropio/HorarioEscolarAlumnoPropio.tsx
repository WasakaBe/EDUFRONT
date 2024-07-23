import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../constants/Api';
import './HorarioEscolarAlumnoPropio.css';

interface Horario {
  id_horario: number;
  nombre_asignatura: string;
  nombre_docente: string;
  nombre_grado: string;
  nombre_grupo: string;
  nombre_carrera_tecnica: string;
  ciclo_escolar: string;
  dias_horarios: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

interface HorarioEscolarAlumnoPropioProps {
  id_usuario: number;
  onClose: () => void;
}

const HorarioEscolarAlumnoPropio: React.FC<HorarioEscolarAlumnoPropioProps> = ({ id_usuario, onClose }) => {
  const [horario, setHorario] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHorario = async () => {
      try {
        const response = await fetch(`${apiUrl}horarios_escolares/alumno/${id_usuario}`);
        const data = await response.json();
        if (response.ok) {
          setHorario(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Error al obtener el horario del alumno');
      } finally {
        setLoading(false);
      }
    };

    fetchHorario();
  }, [id_usuario]);

  if (loading) {
    return <p className="loading-message">Cargando horario del alumno...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="horario-alumno-container">
      <button className="close-button" onClick={onClose}>Salir</button>
      <h2>Horario Escolar del Alumno</h2>
      {horario.length > 0 ? (
        <table className="horario-table">
          <thead>
            <tr>
              <th>Asignatura</th>
              <th>Docente</th>
              <th>Grado</th>
              <th>Grupo</th>
              <th>Carrera Técnica</th>
              <th>Ciclo Escolar</th>
              <th>Días y Horarios</th>
            </tr>
          </thead>
          <tbody>
            {horario.map(hor => (
              <tr key={hor.id_horario}>
                <td>{hor.nombre_asignatura}</td>
                <td>{hor.nombre_docente}</td>
                <td>{hor.nombre_grado}</td>
                <td>{hor.nombre_grupo}</td>
                <td>{hor.nombre_carrera_tecnica}</td>
                <td>{hor.ciclo_escolar}</td>
                <td>
                  {hor.dias_horarios.map((dia, index) => (
                    <div key={index}>
                      {dia.day}: {dia.startTime} - {dia.endTime}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay horario disponible para este alumno</p>
      )}
    </div>
  );
};

export default HorarioEscolarAlumnoPropio;
