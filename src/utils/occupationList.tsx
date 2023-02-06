import {
  Buildings,
  Cpu,
  Drop,
  IconProps,
  Mountains,
  PaintRoller,
  PencilSimpleLine,
  SuitcaseSimple,
  Wall,
} from 'phosphor-react-native'

export const occupationList: {
  occupation: Occupation
  Icon: (props: IconProps) => JSX.Element
}[] = [
  { occupation: 'Alvenaria', Icon: ({ ...props }) => <Wall {...props} /> },
  {
    occupation: 'Arquitetura',
    Icon: ({ ...props }) => <PencilSimpleLine {...props} />,
  },
  { occupation: 'Elétrica', Icon: ({ ...props }) => <Cpu {...props} /> },
  {
    occupation: 'Engenharia Civil',
    Icon: ({ ...props }) => <Buildings {...props} />,
  },
  { occupation: 'Hidráulica', Icon: ({ ...props }) => <Drop {...props} /> },
  {
    occupation: 'Pintura',
    Icon: ({ ...props }) => <PaintRoller {...props} />,
  },
  {
    occupation: 'Topologia',
    Icon: ({ ...props }) => <Mountains {...props} />,
  },
  {
    occupation: 'Outros',
    Icon: ({ ...props }) => <SuitcaseSimple {...props} />,
  },
]

export type OccupationElement = typeof occupationList[0]
