import { AxiosResponse } from "axios";
import { publicInstance } from "./baseApi";
import { ITrip } from "../components/organisms/landing/tripCard/TripCard";

export function getRouteApi(routeName?: string) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .get(`route/get-route/${routeName ? routeName : undefined}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getTripDetailsApi(from: string, to: string) {
  return new Promise<AxiosResponse<ITrip[]>>((resolve, reject) => {
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

export interface IConfirmTrip {
  name: string;
  phone: string;
  seatNumbers?: number[];
  tripId: string;
  email: string;
  totalAmount: string;
}
export function confirmTripApi(value: IConfirmTrip) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .post(`trip/confirm-trip`, value)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// /confirm-trip
