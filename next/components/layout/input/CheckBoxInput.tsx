import React from "react";
import styled from "styled-components";
import checkIcon from "@src/assets/icons/checkbox.png";
import checkedIcon from "@src/assets/icons/checkbox_checked.png";
import { RadioProps } from "./RadioInput";

interface CheckBoxProps extends RadioProps{
  isDeleteMessage ?: boolean;
}

const CheckBoxInput = ({ label, name, register, error, checked, disabled, isDeleteMessage }: CheckBoxProps) => {
  return (
    <InputBox className={`${error ? "error" : ""} ${checked ? "completion" : ""} ${isDeleteMessage ? "deleteMessage" : ""}`}>
      <Input type="checkbox" id={name} {...register} readOnly={checked} checked={checked} disabled={disabled} autoComplete="off"  />
      <Label htmlFor={name}>
        <i></i>
        {label}
      </Label>
    </InputBox>
  );
};

export default CheckBoxInput;

const InputBox = styled.div`
  width: 630px;
  height: 106px;
  transition: border 0.3s;
  border: 2px solid transparent;
  background-color: ${({ theme }) => theme.color.input};
  border-radius: 10px;
  user-select: none;
  &:focus-within {
    &.error {
      border: 2px solid ${({ theme }) => theme.color.error};
    }
  }
  &.completion {
    width: 500px;
    height: auto;
    margin: 0 auto;
    background-color: transparent;
    label {
      padding: 20px;
      cursor: default;
      font-size: 17px;
      i {
        width: 20px;
        height: 20px;
        margin-right: 15px;
      }
    }
  }
  &.deleteMessage{
    width:100%;
    height:100%;
    label{
      justify-content:center;
      color: #000;
      padding: 0 ;
      font-size: 22px;
      i {
        width: 30px;
        height: 30px;
        margin-right: 15px;
      }
    }
  }
`;
const Input = styled.input`
  position: absolute;
  left: -999999%;
  &:checked + label {
    i {
      background-image: url(${checkedIcon.src});
    }
  }
`;
const Label = styled.label`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #fff;
  padding: 20px 50px;
  cursor: pointer;
  font-weight: 700;
  i {
    width: 25px;
    height: 25px;
    margin-right: 20px;
    transition: background 0.3s;
    background: url(${checkIcon.src}) no-repeat center center;
    background-size: cover;
  }
`;
