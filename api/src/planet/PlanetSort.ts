import { registerEnumType } from 'type-graphql'

export enum PlanetSort {
  NEW,
  TOP,
  AZ,
  TRENDING
}

registerEnumType(PlanetSort, {
  name: 'PlanetSort'
})
