import MockAdapter from 'axios-mock-adapter';
import apiClient from 'src/api/axios/apiClient';
import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import DEMO_DATA_MERIDIAN_VI from 'src/assets/test_data/meridians_vi.json';
import DEMO_DATA_MERIDIAN_EN from 'src/assets/test_data/meridians_en.json';
import apiClientJWT from 'src/api/axios/apiClientJWT';

export const mockGetUpdateItemCombined = () => {
  const mock = new MockAdapter(apiClient as any)
  const mockJWT = new MockAdapter(apiClientJWT as any)
  let pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}acupoint\/filter`);

  mock.onGet(pathRegex)
    .reply((config: any) => {
      let getParam = config.url.split("?")[1]
      let params = getParam.split("&")
      const dictParams = {}

      params.forEach(param => {
        const firstEqual = param.indexOf("=")
        const key = param.substring(0, firstEqual)
        const value = param.substring(firstEqual + 1, param.length)
        dictParams[key] = value
      })

      let usingData = (dictParams as any).language === "vi" ? DEMO_DATA_VI : DEMO_DATA_EN
      let returnItem = {}
      usingData.forEach((item) => {
        if (item.code === (dictParams as any).code) {
          returnItem = item
        }
      })

      return ([200, returnItem]);
    })

  pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}meridian\/filter`);

  mock.onGet(pathRegex)
    .reply((config: any) => {
      let getParam = config.url.split("?")[1]
      let params = getParam.split("&")
      const dictParams = {}

      params.forEach(param => {
        const firstEqual = param.indexOf("=")
        const key = param.substring(0, firstEqual)
        const value = param.substring(firstEqual + 1, param.length)
        dictParams[key] = value
      })

      let usingData = (dictParams as any).language === "vi" ? DEMO_DATA_MERIDIAN_VI : DEMO_DATA_MERIDIAN_EN
      let returnItem = {}
      usingData.forEach((item) => {
        if (item.code === (dictParams as any).code) {
          returnItem = item
        }
      })

      return ([200, returnItem]);
    })

  pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}acupoint`);

  mockJWT.onPut(pathRegex)
    .reply((config: any) => {
      return ([200, true])
    })

  mock.onGet(pathRegex)
    .reply((config: any) => {
      let getParam = config.url.split("?")[1]
      let params = getParam.split("&")
      const dictParams = {}

      params.forEach(param => {
        const firstEqual = param.indexOf("=")
        const key = param.substring(0, firstEqual)
        const value = param.substring(firstEqual + 1, param.length)
        dictParams[key] = value
      })

      if ((dictParams as any).language === "vi") {
        return ([200, DEMO_DATA_VI]);
      } else {
        return ([200, DEMO_DATA_EN])
      }
    })

  pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}meridian`);

  mockJWT.onPut(pathRegex)
    .reply((config: any) => {
      return ([200, true])
    })

  mock.onGet(pathRegex)
    .reply((config: any) => {
      let getParam = config.url.split("?")[1]
      let params = getParam.split("&")
      const dictParams = {}

      params.forEach(param => {
        const firstEqual = param.indexOf("=")
        const key = param.substring(0, firstEqual)
        const value = param.substring(firstEqual + 1, param.length)
        dictParams[key] = value
      })

      if ((dictParams as any).language === "vi") {
        return ([200, DEMO_DATA_VI]);
      } else {
        return ([200, DEMO_DATA_EN])
      }
    })
}
