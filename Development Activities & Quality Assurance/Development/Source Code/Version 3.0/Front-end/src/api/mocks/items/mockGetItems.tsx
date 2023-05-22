import MockAdapter from 'axios-mock-adapter';
import apiClient from 'src/api/axios/apiClient';
import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';

export const mockGetItems = () => {
  const mock = new MockAdapter(apiClient as any)
  let pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}acupoint`);

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
