import { registerEnumType } from 'type-graphql'

export enum PlanetSort {
  NEW,
  TOP,
  AZ
}

registerEnumType(PlanetSort, {
  name: 'PlanetSort'
})
