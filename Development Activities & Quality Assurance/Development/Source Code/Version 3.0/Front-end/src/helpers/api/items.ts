import { setAcupuncturePoints, setMeridians } from "src/redux/slice"
import store from "src/redux/store"
import { apiItem } from "src/api/endpoints/apiItem/apiItem"
const EXCLUDE_FIELDS = ["_id", "createdAt", "updatedAt", "__v"]

export const getMeridians = async (currentLanguage: string) => {
  const meridians = await apiItem.getMeridians(currentLanguage.toLowerCase())
  const filteredMeridians = (meridians as any).data
    .map(({ _id, updatedAt, createdAt, __v, ...keepAttrs }) => keepAttrs)
  store.dispatch(setMeridians([...filteredMeridians]))
  return filteredMeridians
}

export const getAcupuncturePoints = async (currentLanguage: string) => {
  const points = await apiItem.getAcupuncturePoints(currentLanguage.toLowerCase())
  const filteredPoints = (points as any).data
    .map(({ _id, updatedAt, createdAt, __v, ...keepAttrs }) => keepAttrs)
  store.dispatch(setAcupuncturePoints([...filteredPoints]))
  return filteredPoints
}

export const getAcupuncturePointByCode = async (currentLanguage: string, code: string) => {
  let point = await apiItem.getAcupuncturePointByCode(currentLanguage.toLowerCase(), code)
  point = (point as any).data
  EXCLUDE_FIELDS.forEach(field => {
    delete point[field]
  })
  return point
}

export const getMeridianByCode = async (currentLanguage: string, code: string) => {
  let meridian = await apiItem.getMeridianByCode(currentLanguage.toLowerCase(), code)
  meridian = (meridian as any).data
  EXCLUDE_FIELDS.forEach(field => {
    delete meridian[field]
  })
  return meridian
}

export const updateAcupuncturePoint = async (language: string, data: IParamUpdateAcupuncturePoint) => {
  let updateResult = await apiItem.updateAcupuncturePoint(language.toLowerCase(), data)
  return (updateResult as any).data
}

export const updateMeridian = async (language: string, data: IParamUpdateMeridian) => {
  let updateResult = await apiItem.updateMeridian(language.toLowerCase(), data)
  return (updateResult as any).data
}
