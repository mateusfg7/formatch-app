interface ProfessionalData {
  code: string
  name: string
  whatsapp: string | null
  instagram: string | null
  phone: string | null
  email: string | null
  biography: string
  services: string[]
  averageRate: number
  state_uf: string
  city: string
  profile_picture_url: string
}

interface FormDataProps {
  name: string
  imageUri: string
  phone: string
  email: string
  stateUf: string
  city: string
  occupation: string
  bio: string
  whatsapp: string
  instagram: string
}
