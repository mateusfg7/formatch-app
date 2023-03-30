interface AuthenticatedProfessionalData {
  name: string
  code: string
  profile_picture_url: string
  state_uf: string
  city: string
  biography: string
  services: string[]
  savedCount: number
  averageRate: number
  email: string | null
  phone: string | null
  whatsapp: string | null
  instagram: string | null
}

interface FormDataProps {
  imageUri: string
  name: string
  phone: string
  email: string
  stateUf: string
  city: string
  occupation: string
  bio: string
  whatsapp: string
  instagram: string
}

interface ProfessionalData {
  averageRate: number
  biography: string
  city: string
  code: string
  createdAt: string
  email: string | null
  instagram: string | null
  name: string
  phone: string | null
  profile_picture_url: string
  services: string[]
  state_uf: string
  whatsapp: string | null
}
