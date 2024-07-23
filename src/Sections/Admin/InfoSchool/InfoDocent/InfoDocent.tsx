import { useState, useEffect, ChangeEvent } from 'react';
import './InfoDocent.css';
import { apiUrl } from '../../../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Definir la interfaz para los datos de los docentes
interface Docente {
  id_docentes: number;
  nombre_docentes: string;
  app_docentes: string;
  apm_docentes: string;
  fecha_nacimiento_docentes: string;
  noconttrol_docentes: string;
  telefono_docentes: string;
  idUsuario: string;
  idClinica: string;
  idSexo: string;
}

export default function InfoDocent() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const itemsPerPage = 6;

  useEffect(() => {
    fetchDocentes();
  }, []);

  const fetchDocentes = () => {
    fetch(`${apiUrl}docente`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setDocentes(data);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching docentes:', error);
      });
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      toast.warning('Por favor ingrese un número de control o CURP para buscar');
      return;
    }

    fetch(`${apiUrl}docentes/nocontrol/${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Docente no encontrado');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setDocentes([data]);
        } else {
          console.error('Error adding docente:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching docente:', error);
        toast.error('Docente no encontrado');
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = docentes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(docentes.length / itemsPerPage);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='info-docent-container'>
      <h2>Información de Docentes</h2>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Ingrese número de control o CURP"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="docents-table-container">
        <table className="docents-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Fecha de Nacimiento</th>
              <th className="hide-on-mobile">Número de Control</th>
              <th className="hide-on-mobile">Teléfono</th>
              <th className="hide-on-mobile">Correo</th>
              <th className="hide-on-mobile">Clínica</th>
              <th className="hide-on-mobile">Sexo</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(docente => (
              <tr key={docente.id_docentes}>
                <td>{docente.id_docentes}</td>
                <td>{docente.nombre_docentes}</td>
                <td>{docente.app_docentes}</td>
                <td>{docente.apm_docentes}</td>
                <td>{docente.fecha_nacimiento_docentes}</td>
                <td className="hide-on-mobile">{docente.noconttrol_docentes}</td>
                <td className="hide-on-mobile">{docente.telefono_docentes}</td>
                <td className="hide-on-mobile">{docente.idUsuario}</td>
                <td className="hide-on-mobile">{docente.idClinica}</td>
                <td className="hide-on-mobile">{docente.idSexo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
