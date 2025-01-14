import Input from "@components/layout/input/Input";
import { GetServerSidePropsContext, NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import customApi from "utils/client/customApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NaverLoginBtn from "@components/layout/buttons/NaverBtn";
import KakaoLoginBtn from "@components/layout/buttons/KakaoBtn";
import { USER_LOGIN, USE_USER } from "constant/queryKeys";
import { InnerContainer, FlexContainer, Row, WhiteBoldText, WhiteText } from "@styles/Common";
import { media, theme } from "@styles/theme";
import styled from "styled-components";
import MessageBox from "@components/MessageBox";
import { ACCOUNT_ID_REGEX, PASSWORD_REGEX } from "constant/regex";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import Testcard from "@public/static/test_card.png";
import { AnimatePresence, motion } from "framer-motion";
export interface LoginForm {
  accountId: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { postApi } = customApi("/api/auth/login");
  const [isError, setIsError] = useState(false);
  const [isCompletion, setIsCompletion] = useState(false);
  const [isOnTestBox, setIsOnTestBox] = useState(false);
  const { mutate } = useMutation([USER_LOGIN], postApi, {
    onError(error: any) {
      setIsError(true);
    },
    onSuccess(data) {
      if (data.isNew) {
        return router.push(
          {
            pathname: "/auth/register",
            query: data,
          },
          "/auth/register",
        );
      } else {
        queryClient.refetchQueries([USE_USER]);
        return router.push("/");
      }
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

  const onValid = (loginForm: LoginForm) => {
    mutate({ ...loginForm, type: "origin" });
  };

  const isErrorsMessage = errors.accountId?.message || errors.password?.message;

  useEffect(() => {
    if (watch("accountId") && watch("password") && !isErrorsMessage) {
      setIsCompletion(true);
    } else {
      setIsCompletion(false);
    }
    setIsError(false);
  }, [watch("accountId"), watch("password"), isErrorsMessage]);
  return (
    <FlexContainer>
      <TestButton onClick={() => setIsOnTestBox(cur => !cur)}>테스트 아이디 {isOnTestBox ? "접기" : "보기"}</TestButton>
      <AnimatePresence>
        {isOnTestBox && (
          <TestBox
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <InnerContainer>
        <MessageBox isErrorsMessage={isErrorsMessage}>
          {isErrorsMessage === undefined &&
            (isError ? <>앗! 로그인 정보를 다시 한번 확인해주세요</> : <>로그인 정보를 입력해주세요</>)}
        </MessageBox>
        <LoginForm as="form" onSubmit={handleSubmit(onValid)}>
          <LoginFormInnerBox>
            <LoginInputAreaBox>
              <Input
                name="accountId"
                register={register("accountId", {
                  required: "아이디를 입력해주세요",
                  validate: {
                    checkAccountId: value => ACCOUNT_ID_REGEX.test(value) || "아이디는 6글자 이상 입력해주세요",
                  },
                })}
                placeholder="아이디를 입력해주세요"
                error={errors.accountId || isError}
              />
              <Input
                name="password"
                type="password"
                register={register("password", {
                  required: "비밀번호를 입력해주세요",
                  validate: {
                    regexPassword: value =>
                      PASSWORD_REGEX.test(value) ||
                      "비밀번호는 6자리 이상\n영문 대소문자, 숫자를 조합해서 입력해주세요",
                  },
                })}
                placeholder="••••••"
                error={errors.password || isError}
                delay={0.3}
              />
            </LoginInputAreaBox>
            <RoundedDefaultButton lg disable={!isCompletion} bgColor={theme.color.mintBtn}>
              로그인
            </RoundedDefaultButton>
          </LoginFormInnerBox>
        </LoginForm>
        <LoginFindBox>
          <Link href="/auth/help/find-id">
            <WhiteText>아이디 찾기</WhiteText>
          </Link>
          <i>|</i>
          <Link href="/auth/help/find-pw">
            <WhiteText>비밀번호 찾기</WhiteText>
          </Link>
        </LoginFindBox>
        <SocialLoginBox>
          <div className="soscialInnerBox">
            <NaverLoginBtn mutate={mutate} kind="login" />
            <KakaoLoginBtn mutate={mutate} kind="login" />
          </div>
        </SocialLoginBox>
        <RegisterLinkBox>
          아직 회원이 아니신가요?
          <Link href="/auth/register/choice">
            <WhiteBoldText>회원가입</WhiteBoldText>
          </Link>
        </RegisterLinkBox>
      </InnerContainer>
    </FlexContainer>
  );
};
export default LoginPage;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const TestBox = styled(motion.div)`
  z-index: 10000;
  width: 514px;
  height: 300px;
  background: url(${Testcard.src});
  position: absolute;
  left: 20px;
  top: 70px;
`;
const TestButton = styled.div`
  z-index: 10000;
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
  padding: 10px 20px;
  background-color: ${props => props.theme.color.mintBtn};
  border-radius: 10px;
  color: white;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${props => props.theme.color.mint};
  }
`;
export const ToryTextBox = styled.div`
  text-align: center;
  padding: 50px 0 65px;
  letter-spacing: -0.6px;
  word-spacing: -4px;
`;

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
`;
export const LoginInputAreaBox = styled.div`
  margin-bottom: 40px;
  ${media.mobile} {
    margin-bottom: 20px;
  }
`;
const LoginFormInnerBox = styled.div`
  display: inline-block;
`;
const LoginFindBox = styled(Row)`
  padding: 20px 0;
  margin: 0 0 70px;
  a {
    margin: 0 12px;
    width: 82px;
    text-align: right;
    span {
      font-size: 15px;
    }
  }
  i {
    color: #fff;
    user-select: none;
  }
  ${media.mobile} {
    margin: 0 0 30px;
    a {
      margin: 0 10px;
      width: 71px;
      span {
        font-size: 13px;
      }
    }
    i {
      font-size: 16px;
    }
  }
`;
const SocialLoginBox = styled(Row)`
  margin: 0 0 30px;
  .soscialInnerBox {
    display: flex;
    column-gap: 30px;
  }
  ${media.mobile} {
    .soscialInnerBox {
      column-gap: 10px;
    }
  }
`;

const RegisterLinkBox = styled(Row)`
  padding: 20px 0;
  font-size: 15px;
  color: #fff;
  a {
    margin: 0 0 0 10px;
  }
  ${media.mobile} {
    font-size: 13px;
  }
`;
