import { AxiosResponse } from "axios";
import { publicInstance } from "./baseApi";

interface IBusCreate {
  busName: string;
  busType?: "ac" | "non_ac";
  numberOfSeat: string;
}
export function createBusApi(busData: IBusCreate) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .post(`bus/create`, { ...busData })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export interface IBus extends IBusCreate {
  _id: string;
  isAvailableForTrip?: boolean;
}
export function updateBusApi(newData: IBus) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .put(`bus/update/${newData._id}`, { ...newData })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteBus(busId: string) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .delete(`bus/delete/${busId}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function toggleBusAvailable(busId: string) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .patch(`bus/toggle-available/${busId}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getAllBuses() {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .get(`bus/get-buses`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}
