import React from "react";
import { AutoComplete } from "antd";
import styled from "styled-components";

const StyledAutoComplete = styled(AutoComplete)`
  height: 3rem;
`;

interface IProps {
  options?: { label: string; value: string }[];
  value?: string;
  placeholder?: string;
  onSearch: (value: string) => void;
  onSelect: (value: any) => void;
}
const AutoCompleteInput: React.FC<IProps> = ({
  options,
  placeholder,
  onSearch,
  onSelect,
  value,
}) => {
  return (
    <StyledAutoComplete
      options={options}
      style={{ width: 250 }}
      onSelect={onSelect}
      onSearch={onSearch}
      placeholder={placeholder}
    />
  );
};

export default AutoCompleteInput;
