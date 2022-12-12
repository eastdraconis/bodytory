import styled, { isStyledComponent } from "styled-components";
import Link from "next/link";
import useUser from "@hooks/useUser";
import { Accent, BlackToryText, BodyText, Box, Col, Container, FlexContainer, Row } from "@styles/Common";
import { CircleButton, RectangleButton, RoundButton } from "@components/layout/buttons/Button";
import Image from "next/image";
import Mic from "@src/assets/icons/mic.svg";
import Record from "@src/assets/icons/record.svg";
import Hospital from "@src/assets/icons/hospital.svg";
import Setting from "@src/assets/icons/setting.svg";
import ToryIcon from "@components/ToryIcon";
import { theme } from "@styles/theme";
import { ToryText } from "./users/records/write/add";
import ToryPurpleAnim from "@src/lotties/ToryPurpleAnim";

const Home = () => {
  const { user } = useUser();

  return (
    <FlexContainer>
      <Col>
        <ToryBox>
          <ToryMotion>
            <ToryPurpleAnim  toryMotionIdx={0} width={340}  />
          </ToryMotion>
          <TextBox>
            <Accent>
              <strong>{user ? user?.name : "OOO"}님, </strong>
            </Accent>
            건강한 하루에요!
            <br />
            어떤 서비스를 이용하실 건가요?
          </TextBox>
        </ToryBox>
        <WriteBox>
          <Link href="users/records/write">
            <div>
              <CircleButton bgColor="rgba(83, 89, 233)" width="80px" height="80px">
                <Mic width={50} height={50} />
              </CircleButton>
              <BodyText>건강 관리를 위해 매일매일 잊지말고 기록해요!</BodyText>
            </div>
            <Accent fontSize="24px">오늘 기록하기</Accent>
          </Link>
        </WriteBox>
        <ButtonBox>
          <Link href="/users/records">
            <RoundButton width="400px" height="70px" bgColor="rgb(108, 113, 240)">
              <BtnIcon>
                <Record width={30} height={30} fill={theme.color.mint} />
              </BtnIcon>
              기록 확인하기
            </RoundButton>
          </Link>
          <Link href={`/users/my-hospital`}>
            <RoundButton width="400px" height="70px" bgColor="rgb(108, 113, 240)">
              <BtnIcon>
                <Hospital width={30} height={30} fill={theme.color.mint} />
              </BtnIcon>
              내 병원 관리하기
            </RoundButton>
          </Link>
        </ButtonBox>
        <AccountBtnBox>
          <Link href="/users/profile/edit">
            <div>
              <Setting />
              계정 설정
            </div>
          </Link>
        </AccountBtnBox>
      </Col>
    </FlexContainer>
  );
};
export default Home;

const EditButtonBox = styled.div``;

const ToryBox = styled(Row)`
  position: relative;
  justify-content: space-around;
  margin: 100px 0;
`;
const WriteBox = styled.div`
  margin-bottom: 50px;
  
  > a {
    display:flex;
    align-items:center;
    justify-content: space-between;
    flex-direction: column;
    width: 860px;
    height: 280px;
    padding: 30px;
    background-color: rgb(217, 222, 255);
    box-shadow: 4px 4px 15px 0px rgba(173, 182, 241, 0.25);
    border-radius: 40px;
    font-weight: 700;
    transition: background .3s;

    button {
      margin: 0 auto 20px;
    }

    &:hover {
      background-color: rgb(210, 216, 255);
    }
  }
`;
const ButtonBox = styled(Row)`
  width: 100%;
  justify-content: center;

  a + a {
    margin-left: 60px;
  }
`;
const BtnIcon = styled.div`
  margin-right: 20px;
`;
const AccountBtnBox = styled.div`
  position: relative;
  font-weight: 500;
  margin-top: 120px;

  > a {
    > div {
      display:flex;
      align-items:center;
      position: relative;
      z-index: 5;
      
      svg {
        margin-right: 10px;
      }
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(217, 222, 255, 1) 40%, transparent 40%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }


`;
const TextBox = styled(ToryText)`
  margin-bottom:0;
  text-align:left;
  padding-left: 170px;
`;

const ToryMotion = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -46%);
`;