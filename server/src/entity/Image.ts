import { Field, Int, ObjectType } from 'type-graphql'
import { Embeddable, Property } from '@mikro-orm/core'
import { GraphQLPositiveInt, GraphQLURL } from 'graphql-scalars'

const calculateDimensions = ({
  width,
  height,
  maxWidth,
  maxHeight
}: {
  width: number
  height: number
  maxWidth: number
  maxHeight: number
}): [number, number] => {
  if (width > maxWidth) {
    const ratio = height / width
    width = maxWidth
    height = Math.round(width * ratio)
  }

  if (height > maxHeight) {
    const ratio = width / height
    height = maxHeight
    width = Math.round(height * ratio)
  }

  return [width, height]
}

const POPUP_MAX_WIDTH = 1440
const POPUP_MAX_HEIGHT = 630
const SMALL_MAX_WIDTH = 400
const SMALL_MAX_HEIGHT = 300

@Embeddable()
@ObjectType()
export class Image {
  @Property({ columnType: 'text' })
  @Field()
  originalUrl: string

  @Property()
  @Field(() => GraphQLPositiveInt)
  originalWidth: number

  @Property()
  @Field(() => GraphQLPositiveInt)
  originalHeight: number

  @Property({ columnType: 'text', nullable: true })
  @Field({ nullable: true })
  smallUrl?: string

  @Field(() => GraphQLPositiveInt)
  get smallWidth(): number {
    return calculateDimensions({
      width: this.originalWidth,
      height: this.originalHeight,
      maxWidth: SMALL_MAX_WIDTH,
      maxHeight: SMALL_MAX_HEIGHT
    })[0]
  }

  @Field(() => GraphQLPositiveInt)
  get smallHeight(): number {
    return calculateDimensions({
      width: this.originalWidth,
      height: this.originalHeight,
      maxWidth: SMALL_MAX_WIDTH,
      maxHeight: SMALL_MAX_HEIGHT
    })[1]
  }

  @Property({ columnType: 'text', nullable: true })
  @Field({ nullable: true })
  popupUrl: string

  @Field(() => GraphQLPositiveInt)
  get popupWidth(): number {
    return calculateDimensions({
      width: this.originalWidth,
      height: this.originalHeight,
      maxWidth: POPUP_MAX_WIDTH,
      maxHeight: POPUP_MAX_HEIGHT
    })[0]
  }

  @Field(() => GraphQLPositiveInt)
  get popupHeight(): number {
    return calculateDimensions({
      width: this.originalWidth,
      height: this.originalHeight,
      maxWidth: POPUP_MAX_WIDTH,
      maxHeight: POPUP_MAX_HEIGHT
    })[1]
  }
}
