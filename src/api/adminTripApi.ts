import { AxiosResponse } from "axios";
import { publicInstance } from "./baseApi";

export function getAllTripsApi() {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .get(`trip/get-all-trips`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export interface ITripCreate {
  busId: string;
  fromId: string;
  toId: string;
  price: string;
  departure_time?: Date;
}
export function createTripApi(tripData: ITripCreate) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .post(`trip/create`, { ...tripData })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

interface ITripUpdate {
  _id: string;
  busId?: string;
  fromId?: string;
  toId?: string;
  price?: string;
  departure_time?: Date;
}
export function updateTripApi(tripData: ITripUpdate) {
  const { _id, ...restData } = tripData;
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .put(`trip/update-trip/${_id}`, { ...restData })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteTripApi(tripId: string) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .delete(`trip/delete/${tripId}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
