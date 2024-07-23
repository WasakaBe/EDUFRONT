import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../Auto/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './admin.css'
import {
  ActividadNoticias,
  AdminDashboard,
  CarrerasTecnicasAdmin,
  Carrusel,
  ChatAdmin,
  CredentialsCreate,
  CredentialsView,
  InfoAlumn,
  InfoBecas,
  InfoDocent,
  InscriptionAdmin,
  MisionVision,
  NavbarDashboard,
  ProfileAdminDashboard,
  SchedulesCreate,
  SchedulesView,
  SobreNosotros,
  WelcomeAdmin,
} from '../../Sections/Admin'

const Admin: React.FC = () => {
  const [currentPanel, setCurrentPanel] = useState<string>('dashboard')
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error(
      'useContext(AuthContext) must be used within an AuthContextProvider'
    )
  }

  const { isAuthenticated, user } = authContext
  const navigate = useNavigate()

  const handleButtonClick = (panel: string) => {
    setCurrentPanel(panel)
  }

  useEffect(() => {
    // Verificar si el usuario está autenticado y tiene el rol de administrador
    if (!isAuthenticated || user?.idRol !== 1) {
      navigate('/')
      toast.error('No tienes permisos de administrador.')
    }
  }, [isAuthenticated, user, navigate])

  return (
    <div className="admin-container-pages">
      <NavbarDashboard onButtonClick={handleButtonClick} />
      {currentPanel === 'dashboard' && <AdminDashboard />}
      {currentPanel === 'profiledashboardadmin' && <ProfileAdminDashboard />}
      {currentPanel === 'viewcredential' && <CredentialsView />}
      {currentPanel === 'createcredential' && <CredentialsCreate />}
      {currentPanel === 'viewschedule' && <SchedulesView />}
      {currentPanel === 'createschedule' && <SchedulesCreate />}
      {currentPanel === 'infoalumn' && <InfoAlumn />}
      {currentPanel === 'infodocent' && <InfoDocent />}
      {currentPanel === 'carrusel' && <Carrusel />}
      {currentPanel === 'welcomeadmin' && <WelcomeAdmin/>}
      {currentPanel === 'misionyvision' && <MisionVision/>}
      {currentPanel === 'actividadnoticias' && <ActividadNoticias/>}
      {currentPanel === 'inscriptionadmin' && <InscriptionAdmin/>}
      {currentPanel === 'sobrenosotrosadmin' && <SobreNosotros/>}
      {currentPanel === 'carrerastecnicasadmin' && <CarrerasTecnicasAdmin/>}
      {currentPanel === 'chatadmin' && <ChatAdmin/>}
      {currentPanel === 'infobecas' && <InfoBecas/>}
    </div>
  )
}

export default Admin
