/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const open = css`
  border-color: transparent transparent #999;
  border-width: 0 5px 5px;
`;
const DropDown = styled.div`
  position: relative;
  color: #333;
  cursor: default;
`;
const Control = styled.div``;

const Input = styled.input`
  line-height: 1.5;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-sizing: border-box;
  cursor: default;
  outline: none;
  padding: 8px 52px 8px 10px;
  transition: all 200ms ease;
  width: 100%;
`;

const Arrow = styled.div`
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 0;
  content: " ";
  display: block;
  height: 0;
  margin-top: 0.3rem;
  position: absolute;
  right: 10px;
  top: 14px;
  width: 0;

  ${(props) => props.isOpen && open}
`;

const Options = styled.div`
  display: none;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
  ${(props) => (props.isOpen ? "display: block" : "")}
`;
const selected = css`
  background-color: #f2f9fc;
  color: #333;
`;
const Option = styled.div`
  box-sizing: border-box;
  color: rgba(51, 51, 51, 0.8);
  cursor: pointer;
  display: block;
  padding: 8px 10px;
  &:hover {
    background-color: #f2f9fc;
    color: #333;
  }
  ${(props) => props.selected && selected}
`;
function SearchableDropdown({
  searchParameter,
  setSearchParameter,
  dropdownDatum,
  isDropdownDataLoading = false,
  selectedDropdownData,
  setSelectedDropdownData,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [searchParameterValue, setSearchParameterValue] =
    useState(searchParameter);

  const typingTimer = useRef(0);
  const doneTypingInterval = 1000; // 1sec

  function keyUp() {
    clearTimeout(typingTimer);
    typingTimer.current = setTimeout(doneTyping, doneTypingInterval);
  }

  function keyDown() {
    clearTimeout(typingTimer);
  }

  function doneTyping() {
    setSearchParameter(searchParameterValue);
  }

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  function selectOption(dropDownData) {
    setSearchParameter(() => "");
    setSelectedDropdownData(() => dropDownData);
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <DropDown>
      <Control>
        <Input
          ref={inputRef}
          value={searchParameterValue || selectedDropdownData.value || ""}
          onClick={toggle}
          onChange={(e) => setSearchParameterValue(e.target.value)}
          onKeyUp={keyUp}
          onKeyDown={keyDown}
        />
        <Arrow isOpen={isOpen} />
      </Control>
      <Options isOpen={isOpen}>
        {isDropdownDataLoading ? (
          <p>Loading...</p>
        ) : (
          dropdownDatum?.map((dropdownData) => (
            <Option
              onClick={() => selectOption(dropdownData)}
              selected={dropdownData.value === selectedDropdownData.value}
              key={dropdownData.value}
            >
              {dropdownData.label}
            </Option>
          ))
        )}
      </Options>
    </DropDown>
  );
}

export default SearchableDropdown;
