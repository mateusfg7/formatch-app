import { ReactNode, createContext, useState } from 'react'

export interface ProfessionalSearchContextProps {
  data: {
    service: string
    filter: {
      uf: string
      city: string
    }
  }
  setCity: (city: string) => void
  setUf: (uf: string) => void
  setService: (service: string) => void
}

interface ProfessionalSearchContextProviderProps {
  children: ReactNode
}

export const ProfessionalSearchContext =
  createContext<ProfessionalSearchContextProps>(
    {} as ProfessionalSearchContextProps
  )

export function ProfessionalSearchContextProvider({
  children,
}: ProfessionalSearchContextProviderProps) {
  const [service, setService] = useState<string>()
  const [uf, setUf] = useState<string>()
  const [city, setCity] = useState<string>()

  return (
    <ProfessionalSearchContext.Provider
      value={{
        data: { service, filter: { city, uf } },
        setCity,
        setUf,
        setService,
      }}
    >
      {children}
    </ProfessionalSearchContext.Provider>
  )
}
