import { AxiosResponse } from "axios";
import { publicInstance } from "./baseApi";

export function getRouteListApi() {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .get(`route/all-routes`)
      .then((resp) => {
        console.log(resp);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createRouteApi(name: string) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .post(`route/create`, {
        name,
      })
      .then((resp) => {
        console.log(resp);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateRouteApi(routeId: string, updatedName: string) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .put(`route/update`, {
        routeId,
        updatedName,
      })
      .then((resp) => {
        console.log(resp);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteRouteApi(routeId: string) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .delete(`route/delete/${routeId}`)
      .then((resp) => {
        console.log(resp);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
