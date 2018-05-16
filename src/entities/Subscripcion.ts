export interface ISubscripcion {
  documento: number,
  apellido: string,
  nombre: string,
  telefono: number,
  celular: number,
  fax: number,
  email: string,
  direccion: string,
  zip: number,
  localidad: string,
  pais: string,
  arancel_adicional: number,
  arancel_categoria: string,
  arancel_pago: string,
  ponencia_presenta: boolean,
  ponencia_titulo: string,
  ponencia_area: string,
  ponencia_coautores: string,
  ponencia_institucion: string,
  acompanantes: number,
  confirmado: boolean,
}

export const EmptySubscripcion = {
  documento: 0,
  apellido: '',
  nombre: '',
  telefono: 0,
  celular: 0,
  fax: 0,
  email: '',
  direccion: '',
  zip: 0,
  localidad: '',
  pais: '',
  arancel_adicional: 0,
  arancel_categoria: '',
  arancel_pago: '',
  ponencia_presenta: false,
  ponencia_titulo: '',
  ponencia_area: '',
  ponencia_coautores: '',
  ponencia_institucion: '',
  acompanantes: 0,
  confirmado: false,
}

// Used for development and debugging purpose
export const FixSubscripcion: ISubscripcion = {
  documento: 13415121,
  apellido: 'Frias',
  nombre: 'Carlos',
  telefono: 0,
  celular: 2651134687,
  fax: 1234,
  email: 'carlos.a.frias@gmail.com',
  direccion: 'Mi Casa 123456',
  zip: 9456,
  localidad: 'Rio Grande, Tierra del Fuego',
  pais: 'Argentina',
  arancel_adicional: 0,
  arancel_categoria: 'docente_untdf',
  arancel_pago: 'En efectivo',
  ponencia_presenta: true,
  ponencia_titulo: 'Algun titulo',
  ponencia_area: 'Medicina Laboral',
  ponencia_coautores: 'Pedro pedrin',
  ponencia_institucion: 'UNTDF',
  acompanantes: 0,
  confirmado: false,
}

export const humanizeArancelCategoria = (cat: string): [string, number] => {
  switch (cat) {
    case 'estudiante_untdf':
      return ['Estudiante UNTDF', 0,]
    case 'estudiante_otro':
      return ['Estudiante otras instituciones', 350,]
    case 'docente_untdf':
      return ['Docente UNTDF', 1600,]
    case 'matriculado_cpcetf':
      return ['Matriculado CPCETF', 1000,]
    default:
      return ["General", 2700,]
  }
}
