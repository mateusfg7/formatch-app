import { useContext } from 'react'
import {
  ProfessionalSearchContextProps,
  ProfessionalSearchContext,
} from '../contexts/ProfessionalSearchContext'

export const useSearchProfessional = (): ProfessionalSearchContextProps =>
  useContext(ProfessionalSearchContext)
