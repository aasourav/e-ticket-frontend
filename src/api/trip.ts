import { AxiosResponse } from "axios";
import { publicInstance } from "./baseApi";
import { ITrip } from "../components/organisms/landing/tripCard/TripCard";

export function getRouteApi(routeName: string) {
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    publicInstance
      .get(`route/get-route/${routeName}`)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getTripDetails(from: string, to: string) {
  console.log(from, to);
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
