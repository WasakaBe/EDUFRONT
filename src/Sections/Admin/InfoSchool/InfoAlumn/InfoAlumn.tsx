import './InfoAlumn.css';
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { apiUrl } from '../../../../constants/Api';
import Modal from 'react-modal';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DateTime } from 'luxon';

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

interface FormData {
  nombre_usuario: string;
  app_usuario: string;
  apm_usuario: string;
  fecha_nacimiento_usuario: string;
  token_usuario: string;
  correo_usuario: string;
  pwd_usuario: string;
  phone_usuario: string;
  idRol: number;
  idSexo: string;
  ip_usuario: string;
  idCuentaActivo: number;
  idPregunta: string;
  respuestaPregunta: string;
}

interface UpdateFormData {
  nombre_alumnos: string;
  app_alumnos: string;
  apm_alumnos: string;
  fecha_nacimiento_alumnos: string;
  curp_alumnos: string;
  telefono_alumnos: string;
  seguro_social_alumnos: string;
  cuentacredencial_alumnos: string;
  id_sexo: string;
  id_usuario: string;
  id_clinica: string;
  id_grado: string;
  id_grupo: string;
  id_traslado: string;
  id_trasladotransporte: string;
  id_carrera_tecnica: string;
  id_pais: string;
  id_estado: string;
  municipio_alumnos: string;
  comunidad_alumnos: string;
  calle_alumnos: string;
  proc_sec_alumno: string;
}

interface SecretQuestion {
  id_preguntas: number;
  nombre_preguntas: string;
}

interface SexOption {
  id_sexos: number;
  nombre_sexo: string;
}

// Inicializar Modal
Modal.setAppElement('#root');

export default function InfoAlumn() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    nombre_usuario: '',
    app_usuario: '',
    apm_usuario: '',
    fecha_nacimiento_usuario: '',
    token_usuario: '',
    correo_usuario: '',
    pwd_usuario: '',
    phone_usuario: '',
    idRol: 2,
    idSexo: '',
    ip_usuario: '',
    idCuentaActivo: 1,
    idPregunta: '',
    respuestaPregunta: '',
  });
  const [updateFormData, setUpdateFormData] = useState<UpdateFormData>({
    nombre_alumnos: '',
    app_alumnos: '',
    apm_alumnos: '',
    fecha_nacimiento_alumnos: '',
    curp_alumnos: '',
    telefono_alumnos: '',
    seguro_social_alumnos: '',
    cuentacredencial_alumnos: '',
    id_sexo: '',
    id_usuario: '',
    id_clinica: '',
    id_grado: '',
    id_grupo: '',
    id_traslado: '',
    id_trasladotransporte: '',
    id_carrera_tecnica: '',
    id_pais: '',
    id_estado: '',
    municipio_alumnos: '',
    comunidad_alumnos: '',
    calle_alumnos: '',
    proc_sec_alumno: '',
  });
  const [secretQuestions, setSecretQuestions] = useState<SecretQuestion[]>([]);
  const [sexOptions, setSexOptions] = useState<SexOption[]>([]);
  const [step, setStep] = useState<number>(1);
  const [updateStep, setUpdateStep] = useState<number>(1);
  const [captchaValido, cambiarEstado] = useState<boolean | null>(null);
  const captcha = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    fetchAlumnos();
    fetchSecretQuestions();
    fetchSexOptions();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const response = await fetch(`${apiUrl}alumno`);
      const data = await response.json();
      setAlumnos(data);
    } catch (err) {
      toast.error('Error al obtener los alumnos');
    }
  };

  const fetchSecretQuestions = async () => {
    try {
      const response = await fetch(`${apiUrl}pregunta`);
      const data = await response.json();
      setSecretQuestions(data);
    } catch (err) {
      toast.error('Error al obtener las preguntas secretas');
    }
  };

  const fetchSexOptions = async () => {
    try {
      const response = await fetch(`${apiUrl}sexo`);
      const data = await response.json();
      setSexOptions(data);
    } catch (err) {
      toast.error('Error al obtener las opciones de sexo');
    }
  };

  const openModal = (alumno: Alumno) => {
    setFormData({
      ...formData,
      nombre_usuario: alumno.nombre_alumnos,
      app_usuario: alumno.app_alumnos,
      apm_usuario: alumno.apm_alumnos,
      fecha_nacimiento_usuario: alumno.fecha_nacimiento_alumnos,
      phone_usuario: alumno.telefono_alumnos,
    });
    setIsModalOpen(true);
  };

  const openUpdateModal = (alumno: Alumno) => {
    setUpdateFormData({
      nombre_alumnos: alumno.nombre_alumnos,
      app_alumnos: alumno.app_alumnos,
      apm_alumnos: alumno.apm_alumnos,
      fecha_nacimiento_alumnos: alumno.fecha_nacimiento_alumnos,
      curp_alumnos: alumno.curp_alumnos,
      telefono_alumnos: alumno.telefono_alumnos,
      seguro_social_alumnos: '',
      cuentacredencial_alumnos: '',
      id_sexo: '',
      id_usuario: '',
      id_clinica: '',
      id_grado: '',
      id_grupo: '',
      id_traslado: '',
      id_trasladotransporte: '',
      id_carrera_tecnica: '',
      id_pais: '',
      id_estado: '',
      municipio_alumnos: '',
      comunidad_alumnos: '',
      calle_alumnos: '',
      proc_sec_alumno: '',
    });
    setIsUpdateModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      nombre_usuario: '',
      app_usuario: '',
      apm_usuario: '',
      fecha_nacimiento_usuario: '',
      token_usuario: '',
      correo_usuario: '',
      pwd_usuario: '',
      phone_usuario: '',
      idRol: 2,
      idSexo: '',
      ip_usuario: '',
      idCuentaActivo: 1,
      idPregunta: '',
      respuestaPregunta: '',
    });
    setStep(1);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setUpdateStep(1);
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'correo_usuario') {
      await checkEmailAvailability(value);
    } else if (name === 'pwd_usuario') {
      validatePassword(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleInsert = async (e: FormEvent) => {
    e.preventDefault();
    if (!captchaValido) {
      toast.error('Por favor, completa correctamente el CAPTCHA.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}users/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          token_usuario: generateToken(),
          ip_usuario: await fetch('https://api64.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip),
        }),
      });
      if (!response.ok) {
        throw new Error('Error al insertar usuario');
      }
      const data = await response.json();
      toast.success('Usuario registrado exitosamente');
      closeModal();
    } catch (err) {
      toast.error('Error al registrar usuario');
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}alumno/${updateFormData.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateFormData),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar alumno');
      }
      const data = await response.json();
      toast.success('Alumno actualizado exitosamente');
      closeUpdateModal();
      fetchAlumnos(); // Refrescar la lista de alumnos después de la actualización
    } catch (err) {
      toast.error('Error al actualizar alumno');
    }
  };

  const checkEmailAvailability = async (email: string) => {
    try {
      const response = await fetch(`${apiUrl}check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo_usuario: email }),
      });
      const data = await response.json();
      if (data.exists) {
        toast.error('El correo ya existe, use otro correo');
        setFormData(prevState => ({ ...prevState, correo_usuario: '' }));
      } else {
        toast.success('Correo disponible');
      }
    } catch (err) {
      toast.error('Error al verificar el correo');
    }
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error('El password debe tener al menos 8 caracteres, incluir letras mayúsculas, minúsculas, números y caracteres especiales, y no debe contener espacios');
      setFormData(prevState => ({ ...prevState, pwd_usuario: '' }));
    } else {
      toast.success('Contraseña válida');
    }
  };

  const onChangeCaptcha = () => {
    if (captcha.current && captcha.current.getValue()) {
      cambiarEstado(true);
    } else {
      cambiarEstado(false);
    }
  };

  const generateToken = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    const getRandomChar = (source: string) =>
      source.charAt(Math.floor(Math.random() * source.length));

    return getRandomChar(letters) +
      getRandomChar(letters) +
      getRandomChar(letters) +
      getRandomChar(numbers) +
      getRandomChar(numbers) +
      getRandomChar(numbers) +
      getRandomChar(letters) +
      getRandomChar(numbers);
  };

  const handleNextStep = () => {
    if (step === 1) {
      const birthDate = DateTime.fromISO(formData.fecha_nacimiento_usuario);
      const currentDate = DateTime.now();
      const age = currentDate.diff(birthDate, 'years').years;

      if (age < 15 || age > 19) {
        toast.info('La edad debe estar entre 15 y 19 años.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleNextUpdateStep = () => {
    setUpdateStep(updateStep + 1);
  };

  const handlePreviousUpdateStep = () => {
    setUpdateStep(updateStep - 1);
  };

  return (
    <div className="info-alumn-container">
      <h1>Lista de Alumnos</h1>
      <ToastContainer />
      {alumnos.length === 0 ? (
        <p>No hay alumnos disponibles.</p>
      ) : (
        <table className="alumnos-table-info-alumn">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Fecha de Nacimiento</th>
              <th>CURP</th>
              <th>Teléfono</th>
              <th>Acciones</th>
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
                      className="foto-alumno-info-alumn"
                    />
                  )}
                </td>
                <td>{alumno.nombre_alumnos}</td>
                <td>{alumno.app_alumnos}</td>
                <td>{alumno.apm_alumnos}</td>
                <td>{alumno.fecha_nacimiento_alumnos}</td>
                <td>{alumno.curp_alumnos}</td>
                <td>{alumno.telefono_alumnos}</td>
                <td className="align-info-alumn">
                  <button className="save-button-info-alumn" type="button" onClick={() => openModal(alumno)}>
                    Crear Usuario
                  </button>
                  <button className="update-button-info-alumn" type="button" onClick={() => openUpdateModal(alumno)}>
                    Actualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-info-alumn"
        overlayClassName="modal-overlay-info-alumn"
      >
        <h2>Registro de Usuario</h2>
        <form className="modal-form-info-alumn" onSubmit={handleInsert}>
          {step === 1 && (
            <div className="register-section-info-alumn">
              <div className="register-input-container-info-alumn">
                <label htmlFor="nombre_usuario">Nombre</label>
                <input
                  type="text"
                  id="nombre_usuario"
                  name="nombre_usuario"
                  placeholder="Nombre"
                  value={formData.nombre_usuario}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="app_usuario">Apellido Paterno</label>
                <input
                  type="text"
                  id="app_usuario"
                  name="app_usuario"
                  placeholder="Apellido Paterno"
                  value={formData.app_usuario}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="apm_usuario">Apellido Materno</label>
                <input
                  type="text"
                  id="apm_usuario"
                  name="apm_usuario"
                  placeholder="Apellido Materno"
                  value={formData.apm_usuario}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="fecha_nacimiento_usuario">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="fecha_nacimiento_usuario"
                  name="fecha_nacimiento_usuario"
                  placeholder="Fecha de Nacimiento"
                  value={formData.fecha_nacimiento_usuario}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="button-group-info-alumn">
                <button type="button" onClick={closeModal} className="cancel-button-info-alumn">
                  Cancelar
                </button>
                <button type="button" onClick={handleNextStep} className="next-button-info-alumn">
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="register-section-info-alumn">
              <div className="register-input-container-info-alumn">
                <label htmlFor="correo_usuario">Correo</label>
                <input
                  type="email"
                  id="correo_usuario"
                  name="correo_usuario"
                  placeholder="Correo"
                  value={formData.correo_usuario}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="pwd_usuario">Contraseña</label>
                <input
                  type="password"
                  id="pwd_usuario"
                  name="pwd_usuario"
                  placeholder="Contraseña"
                  value={formData.pwd_usuario}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="phone_usuario">Teléfono</label>
                <input
                  type="tel"
                  id="phone_usuario"
                  name="phone_usuario"
                  placeholder="Teléfono"
                  value={formData.phone_usuario}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="button-group-info-alumn">
                <button type="button" onClick={handlePreviousStep} className="previous-button-info-alumn">
                  Anterior
                </button>
                <button type="button" onClick={handleNextStep} className="next-button-info-alumn">
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="register-section-info-alumn">
              <div className="register-input-container-info-alumn">
                <label htmlFor="idSexo">Sexo</label>
                <select
                  id="idSexo"
                  name="idSexo"
                  value={formData.idSexo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  {sexOptions.map((sexo) => (
                    <option key={sexo.id_sexos} value={sexo.id_sexos}>
                      {sexo.nombre_sexo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="idPregunta">Pregunta Secreta</label>
                <select
                  id="idPregunta"
                  name="idPregunta"
                  value={formData.idPregunta}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione una pregunta...</option>
                  {secretQuestions.map((pregunta) => (
                    <option key={pregunta.id_preguntas} value={pregunta.id_preguntas}>
                      {pregunta.nombre_preguntas}
                    </option>
                  ))}
                </select>
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="respuestaPregunta">Respuesta Secreta</label>
                <input
                  type="text"
                  id="respuestaPregunta"
                  name="respuestaPregunta"
                  placeholder="Respuesta Secreta"
                  value={formData.respuestaPregunta}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="recaptcha-info-alumn">
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LdYfJspAAAAAAxTWQY68WAEX6JTgnysv3NxAMzd"
                  onChange={onChangeCaptcha}
                />
              </div>
              <div className="button-group-info-alumn">
                <button type="button" onClick={handlePreviousStep} className="previous-button-info-alumn">
                  Anterior
                </button>
                <button type="submit" className="save-button-info-alumn">
                  Guardar
                </button>
              </div>
            </div>
          )}
        </form>
      </Modal>

      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        className="modal-info-alumn"
        overlayClassName="modal-overlay-info-alumn"
      >
        <h2>Actualizar Alumno</h2>
        <form className="modal-form-info-alumn" onSubmit={handleUpdate}>
          {updateStep === 1 && (
            <div className="register-section-info-alumn">
              <div className="register-input-container-info-alumn">
                <label htmlFor="nombre_alumnos">Nombre</label>
                <input
                  type="text"
                  id="nombre_alumnos"
                  name="nombre_alumnos"
                  placeholder="Nombre"
                  value={updateFormData.nombre_alumnos}
                  onChange={handleUpdateInputChange}
                  required
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="app_alumnos">Apellido Paterno</label>
                <input
                  type="text"
                  id="app_alumnos"
                  name="app_alumnos"
                  placeholder="Apellido Paterno"
                  value={updateFormData.app_alumnos}
                  onChange={handleUpdateInputChange}
                  required
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="apm_alumnos">Apellido Materno</label>
                <input
                  type="text"
                  id="apm_alumnos"
                  name="apm_alumnos"
                  placeholder="Apellido Materno"
                  value={updateFormData.apm_alumnos}
                  onChange={handleUpdateInputChange}
                  required
                />
              </div>
              <div className="button-group-info-alumn">
                <button type="button" onClick={closeUpdateModal} className="cancel-button-info-alumn">
                  Cancelar
                </button>
                <button type="button" onClick={handleNextUpdateStep} className="next-button-info-alumn">
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {updateStep === 2 && (
            <div className="register-section-info-alumn">
              <div className="register-input-container-info-alumn">
                <label htmlFor="fecha_nacimiento_alumnos">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="fecha_nacimiento_alumnos"
                  name="fecha_nacimiento_alumnos"
                  placeholder="Fecha de Nacimiento"
                  value={updateFormData.fecha_nacimiento_alumnos}
                  onChange={handleUpdateInputChange}
                  required
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="curp_alumnos">CURP</label>
                <input
                  type="text"
                  id="curp_alumnos"
                  name="curp_alumnos"
                  placeholder="CURP"
                  value={updateFormData.curp_alumnos}
                  onChange={handleUpdateInputChange}
                  required
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="telefono_alumnos">Teléfono</label>
                <input
                  type="tel"
                  id="telefono_alumnos"
                  name="telefono_alumnos"
                  placeholder="Teléfono"
                  value={updateFormData.telefono_alumnos}
                  onChange={handleUpdateInputChange}
                  required
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="seguro_social_alumnos">Seguro Social</label>
                <input
                  type="text"
                  id="seguro_social_alumnos"
                  name="seguro_social_alumnos"
                  placeholder="Seguro Social"
                  value={updateFormData.seguro_social_alumnos}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="button-group-info-alumn">
                <button type="button" onClick={handlePreviousUpdateStep} className="previous-button-info-alumn">
                  Anterior
                </button>
                <button type="button" onClick={handleNextUpdateStep} className="next-button-info-alumn">
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {updateStep === 3 && (
            <div className="register-section-info-alumn">
              <div className="register-input-container-info-alumn">
                <label htmlFor="cuentacredencial_alumnos">Cuenta Credencial</label>
                <input
                  type="text"
                  id="cuentacredencial_alumnos"
                  name="cuentacredencial_alumnos"
                  placeholder="Cuenta Credencial"
                  value={updateFormData.cuentacredencial_alumnos}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="id_sexo">Sexo</label>
                <select
                  id="id_sexo"
                  name="id_sexo"
                  value={updateFormData.id_sexo}
                  onChange={handleUpdateInputChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  {sexOptions.map((sexo) => (
                    <option key={sexo.id_sexos} value={sexo.id_sexos}>
                      {sexo.nombre_sexo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="id_usuario">Usuario</label>
                <input
                  type="text"
                  id="id_usuario"
                  name="id_usuario"
                  placeholder="Usuario"
                  value={updateFormData.id_usuario}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="button-group-info-alumn">
                <button type="button" onClick={handlePreviousUpdateStep} className="previous-button-info-alumn">
                  Anterior
                </button>
                <button type="button" onClick={handleNextUpdateStep} className="next-button-info-alumn">
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {updateStep === 4 && (
            <div className="register-section-info-alumn">
              <div className="register-input-container-info-alumn">
                <label htmlFor="id_clinica">Clínica</label>
                <input
                  type="text"
                  id="id_clinica"
                  name="id_clinica"
                  placeholder="Clínica"
                  value={updateFormData.id_clinica}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="id_grado">Grado</label>
                <input
                  type="text"
                  id="id_grado"
                  name="id_grado"
                  placeholder="Grado"
                  value={updateFormData.id_grado}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="id_grupo">Grupo</label>
                <input
                  type="text"
                  id="id_grupo"
                  name="id_grupo"
                  placeholder="Grupo"
                  value={updateFormData.id_grupo}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="id_traslado">Traslado</label>
                <input
                  type="text"
                  id="id_traslado"
                  name="id_traslado"
                  placeholder="Traslado"
                  value={updateFormData.id_traslado}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="id_trasladotransporte">Traslado Transporte</label>
                <input
                  type="text"
                  id="id_trasladotransporte"
                  name="id_trasladotransporte"
                  placeholder="Traslado Transporte"
                  value={updateFormData.id_trasladotransporte}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="button-group-info-alumn">
                <button type="button" onClick={handlePreviousUpdateStep} className="previous-button-info-alumn">
                  Anterior
                </button>
                <button type="button" onClick={handleNextUpdateStep} className="next-button-info-alumn">
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {updateStep === 5 && (
            <div className="register-section-info-alumn">
              <div className="register-input-container-info-alumn">
                <label htmlFor="id_carrera_tecnica">Carrera Técnica</label>
                <input
                  type="text"
                  id="id_carrera_tecnica"
                  name="id_carrera_tecnica"
                  placeholder="Carrera Técnica"
                  value={updateFormData.id_carrera_tecnica}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="id_pais">País</label>
                <input
                  type="text"
                  id="id_pais"
                  name="id_pais"
                  placeholder="País"
                  value={updateFormData.id_pais}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="id_estado">Estado</label>
                <input
                  type="text"
                  id="id_estado"
                  name="id_estado"
                  placeholder="Estado"
                  value={updateFormData.id_estado}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="municipio_alumnos">Municipio</label>
                <input
                  type="text"
                  id="municipio_alumnos"
                  name="municipio_alumnos"
                  placeholder="Municipio"
                  value={updateFormData.municipio_alumnos}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="button-group-info-alumn">
                <button type="button" onClick={handlePreviousUpdateStep} className="previous-button-info-alumn">
                  Anterior
                </button>
                <button type="button" onClick={handleNextUpdateStep} className="next-button-info-alumn">
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {updateStep === 6 && (
            <div className="register-section-info-alumn">
              <div className="register-input-container-info-alumn">
                <label htmlFor="comunidad_alumnos">Comunidad</label>
                <input
                  type="text"
                  id="comunidad_alumnos"
                  name="comunidad_alumnos"
                  placeholder="Comunidad"
                  value={updateFormData.comunidad_alumnos}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="calle_alumnos">Calle</label>
                <input
                  type="text"
                  id="calle_alumnos"
                  name="calle_alumnos"
                  placeholder="Calle"
                  value={updateFormData.calle_alumnos}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="register-input-container-info-alumn">
                <label htmlFor="proc_sec_alumno">Procedencia Secundaria</label>
                <input
                  type="text"
                  id="proc_sec_alumno"
                  name="proc_sec_alumno"
                  placeholder="Procedencia Secundaria"
                  value={updateFormData.proc_sec_alumno}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <div className="button-group-info-alumn">
                <button type="button" onClick={handlePreviousUpdateStep} className="previous-button-info-alumn">
                  Anterior
                </button>
                <button type="submit" className="save-button-info-alumn">
                  Actualizar
                </button>
              </div>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
}
