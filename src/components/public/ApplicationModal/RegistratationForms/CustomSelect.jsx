import React, { useState } from "react"
import styled from "styled-components"

// setCurrentEmployer({
//     ...currentEmployer,
//     datesOfEmployment: e.target.value
//   })
// }
const StyledSelect = styled.div`
  position: relative;
  margin-top: 11px;
  width: 90%; /* Adjust the width as needed */
  color: "#808080";
`

const SelectButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  padding: 0px;
  height: 43px;
  cursor: pointer;
  user-select: none;
  color: "#808080";
`

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  color: "#808080";
`

const Option = styled.li`
  padding: 0px;
  cursor: pointer;
  color: "#808080" 
  &:hover {
    background-color: #f0f0f0;
  }
`

const CustomSelect = ({ options, onChange, currentEmployer }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("YEARS OF EMPLOYMENT")

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onChange) {
      onChange({
        ...currentEmployer,
        datesOfEmployment: option
      })
    }
  }

  const SelectedOption = styled.p`
    color: "#808080";
    margin: 0;
    height: 23px;
  `

  return (
    <StyledSelect>
      <SelectButton onClick={toggleDropdown}>
        {<SelectedOption>{selectedOption}</SelectedOption> ||
          "Select an option"}
      </SelectButton>
      <Dropdown isOpen={isOpen}>
        {options.map((option, index) => (
          <Option key={index} onClick={() => handleOptionClick(option)}>
            <p style={{ color: "#808080", margin: 0 }}> {option}</p>
          </Option>
        ))}
      </Dropdown>
    </StyledSelect>
  )
}

export default CustomSelect
