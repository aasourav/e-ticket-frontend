import React, { useState } from "react";
import styled from "styled-components";
import Header from "../organisms/landing/header/Header";
import { Button, Divider } from "antd";
import AutoCompleteInput from "../atoms/AutoCompleteInput";
import { getRouteApi, getTripDetails } from "../../api/trip";
import { openNotification } from "../atoms/Notification";
import InputWithLabel from "../molecules/InputWithLabel";

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

const LandingPageMain = () => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>();
  const [searchParams, setSearchParams] = useState<{
    from: string;
    to: string;
  }>();
  const [routes, setRoutes] = useState<{ from: string; to: string }>();

  const onSubmitButton = async () => {
    try {
      const { data } = await getTripDetails(
        searchParams?.from || "",
        searchParams?.to || ""
      );
      console.log(data);
    } catch (err: any) {
      openNotification({ type: "error", message: err.message });
    }
  };

  const onSearch = async (searchValue: string) => {
    try {
      const { data } = await getRouteApi(searchValue);
      setOptions(
        data.getRoutes.map((d: { locationName: string; _id: string }) => ({
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

  const onSelect = async (name: string, string: any) => {
    console.log("select:", string);
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
    </MainContainer>
  );
};

export default LandingPageMain;
