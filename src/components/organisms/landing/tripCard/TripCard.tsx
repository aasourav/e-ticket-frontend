import React from "react";
import styled from "styled-components";
import { Title } from "../../../atoms/Title";

interface IPassengers {
  name: string;
  phone: string;
  seatNumber: string;
}

export interface ITrip {
  busId: string;
  fromId: string;
  toId: string;
  busName: string;
  from: string;
  to: string;
  price: string;
  busType: string;
  departure_time: string;
  passengers: IPassengers[];
}

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 41.5%;
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  gap: 10px;
  cursor: pointer;
`;
const TopWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
`;

interface IProps {
  data: ITrip;
}

const TripCard: React.FC<IProps> = ({ data }) => {
  const { busName, busType, departure_time, from, to, price } = data;
  return (
    <MainContainer>
      <TopWrapper>
        <Title font_size="24px">{busName}</Title>
        <Title font_size="14px">{departure_time}</Title>
      </TopWrapper>
      <DetailsWrapper>
        <Title>{busType === "ac" ? "AC" : "Non AC"}</Title>
        <Title>
          {from.charAt(0).toUpperCase() + from.slice(1)}&nbsp;-&nbsp;
          {to.charAt(0).toUpperCase() + to.slice(1)}
        </Title>
        <Title>{price}TK</Title>
      </DetailsWrapper>
    </MainContainer>
  );
};

export default TripCard;
