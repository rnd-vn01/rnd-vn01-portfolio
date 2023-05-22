import { objectToQuery, objectToFormData } from '../../formatAPIParam';
import apiClient from '../../axios/apiClient';
import apiClientJWT from 'src/api/axios/apiClientJWT';

export const apiItem = {
  getAcupuncturePoints: (language: string) => {
    const url = 'acupoint';
    return apiClient.get(url + objectToQuery({
      language: language
    }));
  },

  getMeridians: (language: string) => {
    const url = 'meridian';
    return apiClient.get(url + objectToQuery({
      language: language
    }))
  },

  getAcupuncturePointByCode: (language: string, code: string) => {
    const url = 'acupoint/filter';
    return apiClient.get(url + objectToQuery({
      language: language,
      code: code
    }));
  },

  getMeridianByCode: (language: string, code: string) => {
    const url = 'meridian/filter';
    return apiClient.get(url + objectToQuery({
      language: language,
      code: code
    }));
  },

  updateAcupuncturePoint: (language: string, data: IParamUpdateAcupuncturePoint) => {
    const url = 'acupoint';
    return apiClientJWT.put(url + objectToQuery({
      language: language,
    }), data);
  },

  updateMeridian: (language: string, data: IParamUpdateMeridian) => {
    const url = 'meridian';
    return apiClientJWT.put(url + objectToQuery({
      language: language,
    }), data);
  },
};
