import React, { useState, useContext, useRef, ChangeEvent } from 'react'
import { FaCamera } from 'react-icons/fa'
import './ProfileAdminDashboard.css'
import { AuthContext, User } from '../../../Auto/Auth'
import { apiUrl } from '../../../constants/Api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileAdminDashboard: React.FC = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider')
  }

  const { user, login } = authContext

  if (!user) {
    throw new Error('User must be logged in')
  }

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<User>({
    nombre_usuario: user?.nombre_usuario || '',
    app_usuario: user?.app_usuario || '',
    apm_usuario: user?.apm_usuario || '',
    phone_usuario: user?.phone_usuario || '',
    correo_usuario: user?.correo_usuario || '',
    pwd_usuario: user?.pwd_usuario || '',
    foto_usuario: user?.foto_usuario || '',
    id_usuario: user?.id_usuario || 0,
    idRol: user?.idRol || 0,
  })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const getInitials = (name: string): string => {
    if (!name) {
      return ''
    }
    const namesArray = name.trim().split(' ')
    if (namesArray.length === 1) {
      return namesArray[0].charAt(0).toUpperCase()
    }
    return (
      namesArray[0].charAt(0).toUpperCase() +
      namesArray[1].charAt(0).toUpperCase()
    )
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSave = async () => {
    try {
      if (!formData.pwd_usuario) {
        toast.error('La contraseña no puede estar vacía')
        return
      }

      const form = new FormData()
      ;(Object.keys(formData) as Array<keyof User>).forEach((key) => {
        form.append(key, formData[key]?.toString() || '')
      })

      if (
        fileInputRef.current &&
        fileInputRef.current.files &&
        fileInputRef.current.files.length > 0
      ) {
        const file = fileInputRef.current.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
          const base64String = reader.result
            ? (reader.result as string).split(',')[1]
            : ''
          form.append('foto_usuario', base64String)

          const response = await fetch(
            `${apiUrl}update4-user/${user.id_usuario}`,
            {
              method: 'POST',
              body: form,
            }
          )

          if (response.ok) {
            const updatedUser = { ...user, ...formData }
            updatedUser.foto_usuario = `data:image/jpeg;base64,${base64String}`
            login(updatedUser)
            setIsEditing(false)
            toast.success('Datos de usuario actualizados exitosamente')
          } else {
            const result = await response.json()
            toast.error(result.message || 'Error al actualizar los datos')
          }
        }
      } else {
        const response = await fetch(
          `${apiUrl}update4-user/${user.id_usuario}`,
          {
            method: 'POST',
            body: form,
          }
        )

        if (response.ok) {
          const updatedUser = { ...user, ...formData }
          login(updatedUser)
          setIsEditing(false)
          toast.success('Datos de usuario actualizados exitosamente')
        } else {
          const result = await response.json()
          toast.error(result.message || 'Error al actualizar los datos')
        }
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error)
      toast.error('Error al actualizar los datos')
    }
  }

  const toggleEditMode = () => {
    if (!isEditing) {
      toast.success('Modo de edición activado')
    }
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      nombre_usuario: user?.nombre_usuario || '',
      app_usuario: user?.app_usuario || '',
      apm_usuario: user?.apm_usuario || '',
      phone_usuario: user?.phone_usuario || '',
      correo_usuario: user?.correo_usuario || '',
      pwd_usuario: user?.pwd_usuario || '',
      foto_usuario: user?.foto_usuario || '',
      id_usuario: user?.id_usuario || 0,
      idRol: user?.idRol || 0,
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          foto_usuario: reader.result as string,
        }))
      }
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          {formData.foto_usuario || user?.foto_usuario ? (
            <img
              src={formData.foto_usuario || user.foto_usuario}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <div className="profile-initials">
              {getInitials(user?.nombre_usuario || '')}
            </div>
          )}
          {isEditing && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                name="image"
              />
              <button
                className="change-photo-button"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaCamera />
              </button>
            </>
          )}
        </div>
        <div className="profile-body">
          <h2>Mi Perfil</h2>
          <form className="profile-form" id="profile-form">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre_usuario"
                value={formData.nombre_usuario}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Apellido Paterno</label>
              <input
                type="text"
                name="app_usuario"
                value={formData.app_usuario}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Apellido Materno</label>
              <input
                type="text"
                name="apm_usuario"
                value={formData.apm_usuario}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                name="phone_usuario"
                value={formData.phone_usuario}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input
                type="text"
                name="correo_usuario"
                value={formData.correo_usuario}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="pwd_usuario"
                value={formData.pwd_usuario}
                onChange={handleChange}
                placeholder="Nueva contraseña"
                readOnly={!isEditing}
              />
            </div>
          </form>
          <div className="profile-footer">
            {isEditing ? (
              <>
                <button className="save-button" onClick={handleSave}>
                  Guardar
                </button>
                <button className="edit-button" onClick={handleCancel}>
                  Cancelar
                </button>
              </>
            ) : (
              <button className="edit-button" onClick={toggleEditMode}>
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
   
    </div>
  )
}

export default ProfileAdminDashboard
