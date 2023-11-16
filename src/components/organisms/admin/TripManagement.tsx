import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ITripCreate,
  createTripApi,
  deleteTripApi,
  getAllTripsApi,
  updateTripApi,
} from "../../../api/adminTripApi";
import { openNotification } from "../../atoms/Notification";
import { Button, DatePicker, Input, Modal, Select, Table } from "antd";
import { Title } from "../../atoms/Title";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { getAllBuses } from "../../../api/busApi";
import { getRouteListApi } from "../../../api/routeApi";
import { ColumnsType } from "antd/es/table";

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
`;

const TripWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 90%;
  padding: 1rem;
  background: rgb(253, 247, 247);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  gap: 0.5rem;
`;

const CardWrapper = styled.div`
  display: flex;
  width: 80%;
  height: 75vh;
  flex-flow: column;
  padding: 1rem 0;
  gap: 1rem;
  overflow-y: scroll;
`;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const initialTrip: ITripCreate = {
  busId: "",
  fromId: "",
  price: "",
  toId: "",
};
interface ITrip {
  _id: string;
  busId: string;
  busName: string;
  fromId: string;
  from: string;
  toId: string;
  to: string;
  price: string;
  departure_time: Date;
  passengers: { name: string; phoneNumber: string; seatNumbers: string[] }[];
}
export const TripManagement = () => {
  const [trips, setTrips] = useState<ITrip[]>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [buses, setBuses] = useState<{ label: string; value: string }[]>();
  const [routes, setRoutes] = useState<{ label: string; value: string }[]>();
  const [tripData, setTripData] = useState<ITripCreate>(initialTrip);
  const [openModal, setOpenModal] = useState<{
    mode: "edit" | "add" | "delete";
    tripId: string;
  }>();
  const [openPassengerModal, setOpenPassengerModal] = useState<string>();

  const onTripCreateChange = (name: keyof ITripCreate, value: any) => {
    setTripData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUpdateTrip = async () => {
    const { data: busData } = await getAllBuses();
    const { data: routeData } = await getRouteListApi();
    setBuses(
      busData?.getBuses?.map(
        (bus: { _id: string; type: string; busName: string }) => ({
          label: `${bus.busName} - ${bus.type === "ac" ? "AC" : "Non AC"}`,
          value: bus._id,
        })
      )
    );
    setRoutes(
      routeData?.response?.map(
        (route: { _id: string; locationName: string }) => ({
          label: route.locationName,
          value: route._id,
        })
      )
    );
  };

  const onSubmitButton = async () => {
    try {
      setIsLoading(true);
      const { data } = await createTripApi(tripData);
      openNotification({
        type: "success",
        message: "Successfully created trip",
      });
      setTrips((prev) =>
        prev ? [...prev, { ...data.createTrip }] : [{ ...data.createTrip }]
      );
      setIsLoading(false);
      setTripData(initialTrip);
      setOpenModal(undefined);
    } catch (err: any) {
      setIsLoading(false);
      openNotification({
        type: "error",
        message: err.response?.data?.message || err.message,
      });
    }
  };

  const onDeleteSubmit = async (tripId: string) => {
    try {
      setIsLoading(true);
      await deleteTripApi(tripId);
      openNotification({
        type: "success",
        message: "Successfully Deleted trip",
      });
      setTrips((prev) => prev?.filter((trip) => trip._id !== tripId));
      setIsLoading(false);
      setOpenModal(undefined);
    } catch (err: any) {
      setIsLoading(false);
      openNotification({
        type: "error",
        message: err.response?.data?.message || err.message,
      });
    }
  };

  const onUpdateSubmit = async () => {
    if (!openModal?.tripId) return;
    try {
      setIsLoading(true);
      const { data } = await updateTripApi({
        ...tripData,
        _id: openModal.tripId,
      });
      openNotification({
        type: "success",
        message: "Successfully updated trip",
      });
      setTrips(
        (prev) =>
          prev?.map((trip) => {
            if (trip._id === openModal?.tripId) {
              return data.tripDoc;
            } else return trip;
          })
      );
      setIsLoading(false);
      setTripData(initialTrip);
      setOpenModal(undefined);
    } catch (err: any) {
      setIsLoading(false);
      openNotification({
        type: "error",
        message: err.response?.data?.message || err.message,
      });
    }
  };

  useEffect(() => {
    const getTrips = async () => {
      try {
        const { data } = await getAllTripsApi();
        setTrips(data.getTrips);
      } catch (err: any) {
        openNotification({
          type: "error",
          message: err.response?.data?.message || err.message,
        });
      }
    };
    getTrips();
  }, []);

  const firstCharIsCapital = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const columns: ColumnsType = [
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: 150,
    },
    {
      title: "Seat Number(s)",
      dataIndex: "seatNumbers",
    },
  ];

  return (
    <ContentWrapper>
      <div>
        <Button
          type="primary"
          onClick={() => {
            handleCreateUpdateTrip();
            setOpenModal({ tripId: "", mode: "add" });
          }}
        >
          Create Trip
        </Button>
      </div>
      <CardWrapper>
        {trips?.length &&
          trips.map((trip) => (
            <TripWrapper key={trip._id}>
              <TopWrapper>
                <Title font_size="1.15rem" font_weight={600}>
                  {trip.busName}
                </Title>
                <Title color="gray" font_weight={600} font_size=".9rem">
                  {dayjs(trip.departure_time).format("dddd MMM DD - h:mm A")}
                </Title>
                <div>
                  <Button
                    type="link"
                    icon={<EditFilled />}
                    onClick={() => {
                      handleCreateUpdateTrip();
                      setOpenModal({ tripId: trip._id, mode: "edit" });
                      setTripData(trip);
                    }}
                  />
                  <Button
                    onClick={() => {
                      setOpenModal({ tripId: trip._id, mode: "delete" });
                    }}
                    danger
                    type="link"
                    icon={<DeleteFilled />}
                  />
                </div>
              </TopWrapper>
              <Title font_size="1rem" font_weight={500}>
                {firstCharIsCapital(trip.from)} - {firstCharIsCapital(trip.to)}
              </Title>
              <Title>Ticket Price: {trip.price} Tk</Title>
              <div>
                <Button
                  onClick={() => setOpenPassengerModal(trip._id)}
                  type="dashed"
                >
                  View passengers
                </Button>
              </div>
            </TripWrapper>
          ))}
      </CardWrapper>
      {/* passengers modal */}
      <Modal
        onCancel={() => setOpenPassengerModal(undefined)}
        style={{ padding: 0 }}
        footer={false}
        open={!!openPassengerModal}
      >
        <Table
          style={{ paddingTop: "1.5rem" }}
          columns={columns as any}
          dataSource={trips
            ?.find((trip) => trip._id === openPassengerModal)
            ?.passengers.map((passenger, key) => ({
              key,
              ...passenger,
              seatNumbers: passenger.seatNumbers.join(", "),
            }))}
          pagination={false}
          scroll={{ y: 540 }}
        />
      </Modal>
      {/* Delete Bus */}
      <Modal
        open={openModal && openModal.mode === "delete" ? true : false}
        okText="Yes, please"
        confirmLoading={isLoading}
        onCancel={() => setOpenModal(undefined)}
        title={<Title>Are you sure you want to delete?</Title>}
        onOk={() => onDeleteSubmit(openModal?.tripId || "")}
      />
      {/* Add or edit Bus */}
      <Modal
        open={openModal && !(openModal.mode === "delete") ? true : false}
        confirmLoading={isLoading}
        onOk={() =>
          openModal?.mode === "add" ? onSubmitButton() : onUpdateSubmit()
        }
        onCancel={() => {
          setOpenModal(undefined);
          setTripData(initialTrip);
        }}
        okText={`${openModal?.mode === "edit" ? "Update" : "Create"}`}
        title={
          <Title>{openModal?.mode === "add" ? "Add" : "Update"}&nbsp;Bus</Title>
        }
      >
        <div>
          <Title font_size="1.15rem">Select bus: </Title>
          <Select
            placeholder="Select destination route"
            value={tripData.busId || undefined}
            options={buses}
            style={{ width: "100%" }}
            onChange={(value) => {
              onTripCreateChange("busId", value);
            }}
          />
        </div>
        <div>
          <Title font_size="1.15rem">To: </Title>
          <Select
            placeholder="Select destination route"
            value={tripData.toId || undefined}
            options={routes}
            style={{ width: "100%" }}
            onChange={(value) => {
              onTripCreateChange("toId", value);
            }}
          />
        </div>
        <div>
          <Title font_size="1.15rem">From: </Title>
          <Select
            placeholder="Select from route"
            value={tripData.fromId || undefined}
            options={routes}
            style={{ width: "100%" }}
            onChange={(value) => {
              onTripCreateChange("fromId", value);
            }}
          />
        </div>

        {/* <div>
          <Title font_size="1.15rem">Select bus type: </Title>
          <Select
            placeholder="Select destination route"
            options={[
              { label: "AC", value: "ac" },
              { label: "Non AC", value: "non_ac" },
            ]}
            style={{ width: "100%" }}
          />
        </div> */}
        <div>
          <Title font_size="1.15rem">Ticket price: </Title>
          <Input
            value={tripData.price || undefined}
            placeholder="Input ticket price"
            onChange={(e) => {
              onTripCreateChange("price", e.target.value);
            }}
          />
        </div>
        <div>
          <Title font_size="1.15rem">Set schedule: </Title>
          <DatePicker
            value={
              tripData.departure_time
                ? dayjs(tripData.departure_time)
                : undefined
            }
            showTime
            format="YYYY-MM-DD hh:mm:A"
            minuteStep={30 as any}
            placeholder="Select Date and Time"
            onChange={(value) => {
              onTripCreateChange("departure_time", value);
            }}
          />
        </div>
      </Modal>
    </ContentWrapper>
  );
};
