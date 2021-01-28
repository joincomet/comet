import { registerEnumType } from 'type-graphql'

export enum PlanetSort {
  NEW,
  TOP,
  AZ,
  FEATURED
}

registerEnumType(PlanetSort, {
  name: 'PlanetSort'
})
