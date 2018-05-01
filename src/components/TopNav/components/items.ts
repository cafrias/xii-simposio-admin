import DoneIcon from '@material-ui/icons/Done'
import ScheduleIcon from '@material-ui/icons/Schedule'
import ListIcon from '@material-ui/icons/List'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'

export default {
  inicio: {
    label: 'Inicio',
    icon: HomeIcon,
    href: '/',
  },
  listados: [
    {
      label: 'Confirmadas',
      icon: DoneIcon,
      href: '/subscripcion/listar/confirmadas',
    },
    {
      label: 'Pendientes',
      icon: ScheduleIcon,
      href: '/subscripcion/listar/pendientes',
    },
    {
      label: 'Todas',
      icon: ListIcon,
      href: '/subscripcion/listar',
    },
  ],
  subscripcion: [
    {
      label: 'Buscar Subscripción',
      icon: SearchIcon,
      href: '/subscripcion/buscar',
    },
  ],
}