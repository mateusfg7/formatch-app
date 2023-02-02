import { useContext } from 'react'
import {
  ProfessionalContext,
  ProfessionalContextProps,
} from '../contexts/AuthenticatedProfessionalContext'

export const useProfessional = (): ProfessionalContextProps =>
  useContext(ProfessionalContext)
