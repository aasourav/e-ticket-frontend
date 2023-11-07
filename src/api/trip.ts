import { AxiosResponse } from "axios";
import { publicInstance } from "./baseApi";

export function getRouteApi(routeName: string) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .get(`route/get-route/${routeName}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getTripDetails(from: string, to: string) {
  return new Promise<AxiosResponse<any[]>>((resolve, reject) => {
    publicInstance
      .get(`trip/trip-list/from/${from}/to/${to}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
