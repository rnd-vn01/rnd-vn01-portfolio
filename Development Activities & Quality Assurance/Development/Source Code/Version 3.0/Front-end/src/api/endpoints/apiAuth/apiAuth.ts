import { objectToQuery, objectToFormData } from '../../formatAPIParam';
import apiClient from '../../axios/apiClient';
import apiClientJWT from 'src/api/axios/apiClientJWT';

export const apiAuth = {
  createNewAccount: (data: IParamCreateUpdateAccount) => {
    const url = 'users';
    return apiClient.post(url, data);
  },

  getAccountInfo: (firebase_id: string) => {
    const url = `users/findByFirebaseID/${firebase_id}`;
    return apiClientJWT.get(url)
  },

  updateProfile: (data: IParamCreateUpdateAccount) => {
    const url = 'users/updateProfile';
    return apiClientJWT.put(url, data);
  },

  login: (firebase_id: string) => {
    const url = `login`
    return apiClient.post(url, {
      firebase_id
    })
  }
};
