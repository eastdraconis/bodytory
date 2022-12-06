import styled, { isStyledComponent } from "styled-components";
import Link from "next/link";
import useUser from "@hooks/useUser";
import { Accent, BlackToryText, BodyText, Box, Col, Container, FlexContainer, Row, ToryText } from "@styles/Common";
import { CircleButton, RectangleButton, RoundButton } from "@components/buttons/Button";
import Image from "next/image";
import Mic from "@public/static/icon/mic.svg";
import Record from "@public/static/icon/record.svg";
import Hospital from "@public/static/icon/hospital.svg";
import Setting from "@public/static/icon/setting.svg";
import ToryIcon from "@components/ToryIcon";
import { theme } from "@styles/theme";

const Home = () => {
  const user = useUser();

  return (
    <FlexContainer>
      <Col>
        <ToryBox>
          <ToryIcon />
          <Col>
            <BlackToryText>
              <Accent>
                <strong>{user ? user?.name : "OOO"}님, </strong>
              </Accent>
              건강한 하루에요!
            </BlackToryText>
            <BlackToryText>어떤 서비스를 이용하실 건가요?</BlackToryText>
          </Col>
        </ToryBox>
        <Link href="users/records/write">
          <WriteBox>
            <CircleButton>
              <Mic fill={theme.color.mint} />
            </CircleButton>
            <BodyText>건강 관리를 위해 매일매일 잊지말고 기록해요!</BodyText>
            <Accent fontSize="26px">오늘 기록하기</Accent>
          </WriteBox>
        </Link>
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
        <Link href="/users/profile/edit">
          <AccountBtnBox>
            <BtnIcon>
              <Setting />
            </BtnIcon>
            계정 설정
          </AccountBtnBox>
        </Link>
      </Col>
    </FlexContainer>
  );
};
export default Home;
const ToryBox = styled(Row)`
  width: 806px;
  justify-content: space-around;
  margin-bottom: 50px;
`;
const WriteBox = styled(Col)`
  width: 860px;
  height: 280px;
  background-color: rgb(217, 222, 255);
  border-radius: 20px;
  margin-bottom: 50px;
  gap: 20px;
`;
const ButtonBox = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;
const BtnIcon = styled.div`
  margin-right: 20px;
`;
const AccountBtnBox = styled(Box)`
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.color.darkBg};
  }
  margin-top: 100px;
`;
