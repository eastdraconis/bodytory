import Input from "@components/Input";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@utils/server/withHandler";
import Link from "next/link";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { UserType } from "@prisma/client";
import { HELP_FIND_PASSWORD } from "constant/queryKeys";
import useReset from "@hooks/useReset";
import { RoundButton } from "@components/button/Button";
export interface HelpForm {
  type: UserType;
  accountId?: string;
  email?: string;
  token?: string;
  password?: string;
  passwordConfirm?: string;
}

const HelpPage: NextPage = () => {
  const router = useRouter();
  const { postApi } = customApi("/api/auth/help/find-pw");
  const [email, setEmail] = useState("");
  const [accountId, setAccountId] = useState("");
  const { mutateAsync } = useMutation([HELP_FIND_PASSWORD], postApi, {
    onError(error: any) {
      alert(`${error.data}`);
    },
    onSuccess(data) {
      setEmail(data.email);
      setAccountId(data.accountId);
      console.log(data);
      if (isToken) {
        console.log("인증번호 인증 완료");
        router.push(
          {
            pathname: "/auth/help/reset",
            query: { email, accountId },
          },
          "/auth/help/reset",
        );
      }
      setIsToken(true);
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<HelpForm>();
  const { isToken, setIsToken, ResetBtn } = useReset({ setValue });
  const onValid = (helpForm: HelpForm) => {
    console.log(helpForm);
    mutateAsync(helpForm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          name={"accountId"}
          disabled={isToken}
          label="아이디"
          register={register("accountId", {
            required: "아이디를 입력해주세요.",
          })}
          placeholder="아이디를 입력해주세요."
        />
        <ResetBtn />
        {isToken && (
          <>
            <div>{email}</div>
            <Input
              name="token"
              label="인증번호"
              register={register("token", {
                required: "인증번호를 입력해주세요.",
              })}
              placeholder="인증번호를 입력해주세요."
            />
          </>
        )}
        <RoundButton size="lg">
          <button>{isToken ? "인증번호 확인" : "이메일 인증"}</button>
        </RoundButton>
      </form>
    </div>
  );
};
export default HelpPage;
