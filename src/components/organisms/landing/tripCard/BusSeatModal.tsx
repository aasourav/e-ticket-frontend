import { Button, Input, Modal } from "antd";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Title } from "../../../atoms/Title";
import Image from "next/image";
import steeringWheelPng from "../../../../assets/pngs/steering-wheel.png";
import { IPassengers, ITrip } from "./TripCard";
import { IPassentersInfo } from "../../../templates/LandingPageMain";

const SeatBoxWrapper = styled(Button)<{
  is_selected?: boolean;
}>`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ is_selected }) => (is_selected ? "red" : "#d2d8d6")};
  background-image: ${({ is_selected }) =>
    `linear-gradient(315deg,${
      is_selected ? "teal" : "#d2d8d6"
    }  0%, #dce8e0 74%)`};
  border-radius: 5px;
`;

const SeatBox = (value: any, isSelected?: boolean, isDisabled?: boolean) => {
  return (
    <SeatBoxWrapper disabled={isDisabled} is_selected={isSelected}>
      <Title font_size="1.15rem" font_weight={600}>
        {value}
      </Title>
    </SeatBoxWrapper>
  );
};

const StyledModal = styled(Modal)``;

const ModalBody = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
`;

const SeatBoxMain = styled.div<{ extra_space?: boolean }>`
  margin-right: ${({ extra_space }) => (extra_space ? "4rem" : "0")};
`;

const ImageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin: 2rem 2rem 2rem 0;
`;

const SlipWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: space-between;
`;

const SecondStepWrapper = styled.div`
  margin-top: 2rem;
`;

interface IProps {
  tripBusDetails?: ITrip;
  onCloseTripModal: () => void;
  isModalOpen?: boolean;
  selectedSeats: number[] | undefined;
  confirmTripInfo: IPassentersInfo;
  onConfirmTripSubmit: (totalAmount: string, tripId: string) => void;
  setSelectedSeats: (seatNumber: number) => void;
  onConfirmTripChange: (name: keyof IPassentersInfo, value: string) => void;
}
const BusSeatModal: React.FC<IProps> = ({
  isModalOpen,
  tripBusDetails,
  selectedSeats,
  confirmTripInfo,
  onConfirmTripSubmit,
  onCloseTripModal,
  setSelectedSeats,
  onConfirmTripChange,
}) => {
  const [steps, setSteps] = useState(0);
  const seatList = Array.from(
    {
      length: tripBusDetails?.numberOfSeat || 0,
    },
    (_, index) => index + 1
  );

  const isSelected = useCallback(
    (index: number) => {
      if (!!selectedSeats?.find((data) => data === index)) return true;
      return false;
    },
    [selectedSeats]
  );

  const isDisabled = useCallback(
    (index: number) => {
      if (
        !!tripBusDetails?.passengers.find((data) =>
          data.seatNumbers.find((seat) => seat === String(index))
        )
      )
        return true;
      return false;
    },
    [tripBusDetails?.passengers]
  );

  const onOk = () => {
    setSteps((prev) => prev + 1);
    onConfirmTripSubmit(
      String((selectedSeats?.length || 0) * Number(tripBusDetails?.price)),
      tripBusDetails?._id || ""
    );
  };

  return (
    <StyledModal
      open={isModalOpen}
      okText={steps === 0 ? "Next" : "Submit"}
      onOk={onOk}
      onCancel={() => {
        onCloseTripModal();
        setSteps(0);
      }}
    >
      {steps === 0 ? (
        <>
          <ImageWrapper>
            <Image
              src={steeringWheelPng}
              alt="steeringWheelPng"
              height={70}
              width={70}
            />
          </ImageWrapper>
          <ModalBody>
            {seatList?.map((data) => (
              <SeatBoxMain
                onClick={() => setSelectedSeats(data)}
                extra_space={
                  Number(data) % 2 === 0 && Number(data) % 4 !== 0
                    ? true
                    : undefined
                }
                key={data}
              >
                {SeatBox(data, isSelected(data), isDisabled(data))}
              </SeatBoxMain>
            ))}
          </ModalBody>
        </>
      ) : (
        <SecondStepWrapper>
          <SlipWrapper>
            <Title font_size="1.25rem" font_weight={600}>
              Seat Numbers: {selectedSeats?.join(", ")}
            </Title>
            <Title font_size="1.25rem" font_weight={600}>
              Total amount:{" "}
              {(selectedSeats?.length || 0) * Number(tripBusDetails?.price)}
              &nbsp;Tk
            </Title>
            <Title font_size="1rem" color="red">
              Pay your bill on <b>01987250620</b>
            </Title>
          </SlipWrapper>
          <div>
            <Title font_size="1.15rem">Name: </Title>
            <Input
              value={confirmTripInfo.name}
              onChange={(e) => onConfirmTripChange("name", e.target.value)}
            />
          </div>
          <div>
            <Title font_size="1.15rem">BKash number: </Title>
            <Input
              value={confirmTripInfo.phone}
              onChange={(e) => onConfirmTripChange("phone", e.target.value)}
            />
          </div>
          <div>
            <Title font_size="1.15rem">Email: </Title>
            <Input
              value={confirmTripInfo.email}
              onChange={(e) => onConfirmTripChange("email", e.target.value)}
            />
          </div>
          <div>
            <Title font_size="1.15rem">Transaction ID: </Title>
            <Input
              value={confirmTripInfo.transactionId}
              onChange={(e) =>
                onConfirmTripChange("transactionId", e.target.value)
              }
            />
          </div>
        </SecondStepWrapper>
      )}
    </StyledModal>
  );
};

export default BusSeatModal;
