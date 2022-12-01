import ChoiceResiterBox from "@components/ChoiceResiterBox";
import KakaoLoginBtn from "@components/buttons/KakaoBtn";
import NaverLoginBtn from "@components/buttons/NaverBtn";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { USER_LOGIN } from "constant/queryKeys";
import { useRouter } from "next/router";
import React from "react";
import { SocialButton } from "@components/buttons/Button";
import OriginLoginBtn from "@components/buttons/OriginBtn";
import { Box, Col, Container, FlexContainer, InnerContainer, ToryText, WhiteText } from "@styles/Common";
import styled from "styled-components";
import { ToryTextBox } from "../login";
import MessageBox from "@components/MessageBox";
import Header from "@components/header/Header";
const ChoicePage = () => {
  const router = useRouter();
  const { postApi } = customApi("/api/auth/login");
  const { mutate } = useMutation([USER_LOGIN], postApi, {
    onError(error: any) {
      console.log(error);
    },
    onSuccess(data) {
      if (data.isNew) {
        console.log("----------------------------", data);
        return router.push(
          {
            pathname: "/auth/register",
            query: data,
          },
          "/auth/register",
        );
      } else return router.push("/");
    },
  });
  return (
    <FlexContainer>
      <Header />
      <InnerContainer>
        <MessageBox>어떤 방식으로 회원가입할까요?</MessageBox>
        <ButtonBox>
          <ButtonInnerBox>
            <OriginLoginBtn size="lg" kind="register" />
            <NaverLoginBtn size="lg" mutate={mutate} kind="register" />
            <KakaoLoginBtn size="lg" mutate={mutate} kind="register" />
          </ButtonInnerBox>
        </ButtonBox>
      </InnerContainer>
    </FlexContainer>
  );
};

export default ChoicePage;

const ChoiceWrapper = styled.div``;

const ButtonBox = styled(Box)`
  margin: 50px 0;
`;

const ButtonInnerBox = styled(Col)`
  display: inline-flex;
  gap: 50px;
`;
