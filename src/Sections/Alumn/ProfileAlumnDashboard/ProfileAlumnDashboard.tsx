import React, { useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from '../../../Auto/Auth'
import { apiUrl } from '../../../constants/Api' // Importa apiUrl

const ProfileAlumnnDashboard: React.FC = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider')
  }

  const { user, login } = authContext

  const [isEditing, setIsEditing] = useState(false)
  const [nombre, setNombre] = useState(user?.nombre_usuario || '')
  const [app, setApp] = useState(user?.app_usuario || '')
  const [apm, setApm] = useState(user?.apm_usuario || '')
  const [email, setEmail] = useState(user?.correo_usuario || '')
  const [password, setPassword] = useState(user?.pwd_usuario || '')
  const [foto, setFoto] = useState<string | ArrayBuffer | null>(
    user?.foto_usuario ? `data:image/jpeg;base64,${user.foto_usuario}` : ''
  )

  const handleEditClick = () => {
    setIsEditing(!isEditing)
    toast.info(isEditing ? 'Modo edición desactivado' : 'Modo edición activado')
  }

  const getInitials = (name: string): string => {
    if (!name) return ''
    const namesArray = name.trim().split(' ')
    if (namesArray.length === 1) {
      return namesArray[0].charAt(0).toUpperCase()
    }
    return (
      namesArray[0].charAt(0).toUpperCase() +
      namesArray[1].charAt(0).toUpperCase()
    )
  }

  const handleCancel = () => {
    setIsEditing(false)
    setNombre(user?.nombre_usuario || '')
    setApp(user?.app_usuario || '')
    setApm(user?.apm_usuario || '')
    setEmail(user?.correo_usuario || '')
    setPassword(user?.pwd_usuario || '')
    setFoto(
      user?.foto_usuario ? `data:image/jpeg;base64,${user.foto_usuario}` : ''
    )
    toast.info('Modo edición desactivado')
  }

  const handleSave = async () => {
    if (user) {
      const updatedUser = {
        nombre_usuario: nombre,
        app_usuario: app,
        apm_usuario: apm,
        correo_usuario: email,
        pwd_usuario: password,
        foto_usuario: foto ? (foto as string).split(',')[1] : '',
      }

      try {
        const response = await fetch(
          `${apiUrl}update-profile/${user.id_usuario}`, // Usa apiUrl aquí
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
          }
        )

        if (response.ok) {
          const data = await response.json()
          login({ ...user, ...updatedUser })
          setIsEditing(false)
          toast.success('Perfil actualizado con éxito')
        } else {
          toast.error('Error al actualizar el perfil')
        }
      } catch (error) {
        toast.error('Error al actualizar el perfil')
      }
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFoto(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container-profile-admin">
      <ToastContainer />
      <div className="header-profile-admin">
        <h2>{isEditing ? 'Editar Perfil' : 'Perfil'}</h2>
      </div>
      <div className="avatar-container-profile-admin">
        <img
          className="avatar-profile-admin"
          src={
            (foto as string) ||
            'https://i.pinimg.com/564x/48/84/3b/48843b6ea8fead404661af7b00397142.jpg'
          }
          alt="Perfil de administrador"
        />

        {isEditing && (
          <input type="file" accept="image/*" onChange={handleFileChange} />
        )}
      </div>
      <div className="profile-info-profile-admin">
        {isEditing ? (
          <>
            <label>
              Nombre completo
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            <label>
              Apellido paterno
              <input
                type="text"
                value={app}
                onChange={(e) => setApp(e.target.value)}
              />
            </label>
            <label>
              Apellido materno
              <input
                type="text"
                value={apm}
                onChange={(e) => setApm(e.target.value)}
              />
            </label>
            <label>
              Correo electrónico
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Contraseña
              <div className="password-container-profile-admin">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="show-password-icon-profile-admin">
                  &#128065;
                </span>
              </div>
            </label>
            <div className="align">
              <button onClick={handleSave} className="save-button">
                GUARDAR
              </button>
              <button onClick={handleCancel} className="exit-button">
                CANCELAR
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="credentials-view-container">
              <h3>
                {nombre} {app} {apm}
              </h3>
              <p>Correo electrónico: {email}</p>
              <p>Contraseña: {password}</p>
            </div>
          </>
        )}
      </div>
      {!isEditing && (
        <button onClick={handleEditClick} className="save-button-profile-admin">
          Actualizar
        </button>
      )}
    </div>
  )
}

export default ProfileAlumnnDashboard
