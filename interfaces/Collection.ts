export interface ICollection {
  uuid: string
  title: string
  image: string
  collectionDate: string
  photos: IPhoto[]
}

export interface IPhoto {
  uuid: string
  title: string
  image: string
}