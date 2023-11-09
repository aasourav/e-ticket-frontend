import React, { useState } from "react";
import styled from "styled-components";
import Header from "../organisms/landing/header/Header";
import { Button, Divider } from "antd";
import AutoCompleteInput from "../atoms/AutoCompleteInput";
import { getRouteApi, getTripDetails } from "../../api/trip";
import { openNotification } from "../atoms/Notification";
import InputWithLabel from "../molecules/InputWithLabel";
import TripCard, { ITrip } from "../organisms/landing/tripCard/TripCard";

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 1rem;
  height: 96vh;
  background-color: #f1dfd1;
  background-image: linear-gradient(315deg, #f1dfd1 0%, #f6f0ea 74%);
`;

const CustomButton = styled(Button)`
  height: 3rem !important;
  width: 8rem !important;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const TripWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-flow: column;
  gap: 12px;
  align-items: center;
`;

const LandingPageMain = () => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>();
  const [routes, setRoutes] = useState<{ from?: string; to?: string }>();
  const [trip, setTrip] = useState<ITrip[]>();

  const onSubmitButton = async () => {
    try {
      const { data } = await getTripDetails(
        routes?.from || "",
        routes?.to || ""
      );
      setTrip(data);
      console.log("my Data: ", data);
    } catch (err: any) {
      openNotification({ type: "error", message: err.message });
    }
  };

  const onSearch = async (searchValue: string) => {
    try {
      const { data } = await getRouteApi(searchValue);
      setOptions(
        data.response?.map((d: { locationName: string; _id: string }) => ({
          label:
            d.locationName.charAt(0).toUpperCase() + d.locationName.slice(1),
          value:
            d.locationName.charAt(0).toUpperCase() + d.locationName.slice(1),
        }))
      );
    } catch (err: any) {
      openNotification({ type: "error", message: err.message });
    }
  };

  const onSelect = async (name: "from" | "to", string: string) => {
    setRoutes((prev) =>
      prev ? { ...prev, [name]: string } : { [name]: string }
    );
  };

  return (
    <MainContainer>
      <Header />
      <Divider />
      <FlexContainer>
        <InputWithLabel
          onSearch={onSearch}
          label="From"
          onSelect={(value) => onSelect("from", value)}
          options={options || []}
        />
        <InputWithLabel
          onSearch={onSearch}
          label="To"
          onSelect={(value) => onSelect("to", value)}
          options={options || []}
        />
        <CustomButton type="primary" size="large" onClick={onSubmitButton}>
          Search
        </CustomButton>
      </FlexContainer>
      <TripWrapper>
        {trip?.length &&
          trip.map((data, idx) => <TripCard key={idx} data={data} />)}
      </TripWrapper>
    </MainContainer>
  );
};

export default LandingPageMain;
