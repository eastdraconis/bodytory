import { Hospital } from "@prisma/client";
import { theme } from "@styles/theme";
import sliceName from "@utils/client/sliceHospitalName";
import { useState } from "react";
import styled from "styled-components";
import { RectangleButton, RoundButton } from "./button/Button";

const ChangeToHoverColor = (color: string) => {
  if (color.includes("rgb")) {
    const colorArr = color.split(",");
    const redValue = parseInt(colorArr[0].split("(")[1]);
    const greenValue = parseInt(colorArr[1]);
    const blueValue = parseInt(colorArr[2].replace(")", ""));
    const newColor = `rgb(${redValue - 15},${greenValue - 15},${blueValue - 15})`;
    return newColor;
  }
  return color;
};

const HospitalContent = ({ list, add }: { list: Hospital; add: boolean }) => {
  const [onShare, setOnShare] = useState<boolean>(false);
  const handleShare = () => {
    setOnShare(!onShare);
    console.log(list.id);
  };

  return (
    <HospitalInfor add={add}>
      <HospitalInforBox>
        <HospitalDescriptionBox>
          <span>로고</span>
          <Text size="18px" weight="900" add={add}>
            {sliceName(list.name)}
          </Text>
          <RectangleButton size="sm">정형외과</RectangleButton>
        </HospitalDescriptionBox>
        <HospitalPlaceBox>
          <Text weight="200" size="17px" add={add}>
            {list.address}
          </Text>
        </HospitalPlaceBox>
        {add ? (
          <AddButtonBox>
            <RectangleButton size="md">추가</RectangleButton>
          </AddButtonBox>
        ) : (
          <HospitalStatusBox>
            <ShareStatus weight="200" size="15px" add={add} status={onShare}>
              {onShare ? "기록 공유 중" : "기록 공유 중지"}
            </ShareStatus>
            <ShareButton status={onShare} onClick={() => handleShare()}>
              {onShare ? "공유 중지하기" : "공유 시작하기"}
            </ShareButton>
          </HospitalStatusBox>
        )}
      </HospitalInforBox>
    </HospitalInfor>
  );
};

export default HospitalContent;

const ShareButton = styled.button<{ status: boolean }>`
  width: auto;
  height: 50px;
  font-size: 18px;
  padding: 0 50px;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: ${props => ChangeToHoverColor(props.status ? "rgb(128,133,251)" : "rgb(18, 212, 201)")};
  }
  background-color: ${prop => (prop.status ? "rgb(128,133,251)" : theme.color.mintBtn)};
  border-radius: 50px;
  color: white;
`;

const AddButtonBox = styled.div`
  position: absolute;
  right: 30px;
`;

const Text = styled.span<{ size?: string; weight?: string; add: boolean }>`
  position: relative;
  font-size: ${prop => prop.size || "16px"};
  font-weight: ${prop => prop.weight || "300"};
  color: ${prop => (prop.add ? "#000" : "#fff")};
`;

const ShareStatus = styled(Text)<{ status: boolean }>`
  padding-left: 20px;
  &::after {
    content: "";
    width: 10px;
    height: 10px;
    background-color: ${prop => (prop.status ? theme.color.mint : "red")};
    position: absolute;
    border-radius: 50%;
    top: 25%;
    left: 0;
  }
`;

const HospitalContainer = styled.div<{ add: boolean }>`
  width: 1700px;
  height: 600px;
  background-color: ${prop => (prop.add ? "rgb(242,243,255)" : "rgb(217,222,255)")};
  border-radius: 40px;
  padding: 30px;
`;

const HospitalInfor = styled.li<{ add: boolean }>`
  display: inline-block;
  position: relative;
  padding: 30px;
  width: 100%;
  height: 80px;
  background-color: ${prop => (prop.add ? "rgb(225,227,255)" : "rgb(100,106,235)")};
  border-radius: 20px;
  & + & {
    margin-top: 20px;
  }
`;

export const HospitalLists = styled.ul`
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HospitalInforBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const HospitalPlaceBox = styled.div`
  position: absolute;
  left: 600px;
  color: white;
`;

const HospitalDescriptionBox = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
  & * {
    margin-right: 20px;
  }
`;

const HospitalStatusBox = styled.div`
  position: absolute;
  right: 30px;
  display: flex;
  align-items: center;
  width: 350px;
  justify-content: space-between;
`;
