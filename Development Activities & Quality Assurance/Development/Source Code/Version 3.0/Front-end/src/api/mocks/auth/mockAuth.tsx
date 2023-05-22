import MockAdapter from 'axios-mock-adapter';
import apiClient from 'src/api/axios/apiClient';
import apiClientJWT from 'src/api/axios/apiClientJWT';

export const mockAuth = () => {
  const mock = new MockAdapter(apiClient as any)
  const mockJWT = new MockAdapter(apiClientJWT as any)
  let pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}users\/findByFirebaseID\/`);

  mockJWT.onGet(pathRegex)
    .reply((config: any) => {
      let getParams = config.url.split("/")
      let firebaseID = getParams[getParams.length - 1]

      if (firebaseID === "INVALID") {
        return ([200, {}]);
      } else {
        return ([200, {
          firebase_id: "VALID",
          email: "test@gmail.com",
          name: "Name",
          image: "imageURL",
          roles: ["user"]
        }]);
      }
    })

  pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}users\/updateProfile`);

  mockJWT.onPut(pathRegex)
    .reply((config: any) => {
      return ([200, true])
    })

  pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}users`);

  mock.onPost(pathRegex)
    .reply((config: any) => {
      let data = JSON.parse(config.data);

      if (data.firebase_id === "INVALID") {
        return ([500, {}])
      } else {
        return ([200, data])
      }
    })

  pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}login`)

  mock.onPost(pathRegex)
    .reply((config: any) => {
      let data = JSON.parse(config.data);

      return ([200, {
        access_token: "AccessToken"
      }])
    })
}
