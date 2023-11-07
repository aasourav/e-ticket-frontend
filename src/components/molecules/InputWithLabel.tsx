import React from "react";
import styled from "styled-components";
import AutoCompleteInput from "../atoms/AutoCompleteInput";

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 1.5rem;
`;

interface IProps {
  onSelect: (value: any) => void;
  onSearch: (value: any) => void;
  label: string;
  options: { label: string; value: string }[];
}
const InputWithLabel: React.FC<IProps> = ({
  onSearch,
  onSelect,
  options,
  label,
}) => {
  return (
    <InputGroup>
      <Label>{label}</Label>
      <AutoCompleteInput
        onSelect={onSelect}
        onSearch={onSearch}
        options={options}
      />
    </InputGroup>
  );
};

export default InputWithLabel;
