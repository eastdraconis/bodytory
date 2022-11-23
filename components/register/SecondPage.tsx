import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RegisterForm } from "pages/auth/register";
import customApi from "utils/client/customApi";
import { CircleButton, RoundButton } from "@components/button/Button";
import { Box } from "@styles/Common";
import MessageBox from "@components/MessageBox";

interface SecondRegisterForm {
  accountId: string;
  password: string;
  passwordConfirm: string;
}
interface RegisterPageProps {
  user: RegisterForm | undefined;
  setUser: Dispatch<SetStateAction<RegisterForm | undefined>>;
  setPage: Dispatch<SetStateAction<number>>;
}
const SecondPage = ({ user, setUser, setPage }: RegisterPageProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    setValue,
    clearErrors,
    reset
  } = useForm<SecondRegisterForm>({
    mode: "onChange",
    defaultValues: {
      accountId: user?.accountId,
      password: user?.password,
      passwordConfirm: user?.passwordConfirm,
    },
  });
  const [currentInputIdx, setCurrentInputIdx] = useState(1);
  const [currentComment, setCurrentComment] = useState("");
  const { postApi: checkAccountIdApi } = customApi("/api/auth/register/check/id");

  const AccountIdRegex = /^[a-zA-Z0-9]{6,}$/;
  const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const onValid = (data: SecondRegisterForm) => {
    if (user?.isNotDuplicate) {
      if (watch("password") !== watch("passwordConfirm")) {
        return setError("passwordConfirm", { message: "비밀번호가 일치하지 않아요" });
      }
      setUser(prev => ({ ...prev!, ...data }));
      setPage(3);
    } else {
      setError("accountId", { message: "아이디 중복확인 해주세요!" });
    }
  };

  const handleClickCheckAccountId = async () => {
    try {
      if (!watch("accountId")) return setError("accountId", { message: "사용하실 아이디를 입력해주세요" });
      if (!AccountIdRegex.test(watch("accountId"))) return;
      await checkAccountIdApi({ accountId: watch("accountId") });
      setUser(prev => ({ ...prev!, isNotDuplicate: true }));
      clearErrors("accountId");
      setCurrentInputIdx(2);
    } catch (err: any) {
      setError("accountId", { message: `이미 사용 중인 아이디에요!\n다른아이디를 입력해주세요` });
    }
  };

  const checkPassword = () => {
    if (watch("password") === watch("passwordConfirm")) {
      clearErrors(["password", "passwordConfirm"]);
    } else return "비밀번호가 일치하지 않아요!\n비밀번호를 다시 확인해주세요";
  };



  const errorMessageText = () => {
    const isErrorsMessage = errors.accountId?.message || errors.password?.message || errors.passwordConfirm?.message;
    if (!isErrorsMessage) {
      return <p>{currentComment}</p>;
    }
    if (isErrorsMessage && isErrorsMessage.includes("\n")) {
      return isErrorsMessage.split("\n").map(ele => <p key={ele}>{ele}</p>);
    } else {
      return <p>{isErrorsMessage}</p>;
    }
  };
  // firstPage로 갈 시 2페이지 모든 폼 리셋 
  const pageReset = ()=>{
    setPage(1)
    setCurrentInputIdx(1);
    reset();
  }
  console.log(user);
  
  useEffect(() => {
    if (!watch("accountId")) {
      setCurrentComment("사용하실 아이디를 입력해주세요");
    } else if (!user?.isNotDuplicate) {
      setCurrentComment("중복확인을 눌러주세요!");
    } else if (!watch("password")) {
      setCurrentComment("사용하실 비밀번호를 입력해주세요");
    } else if (!watch("passwordConfirm")) {
      setCurrentComment("비밀번호를 한번 더 입력해주세요");
    } else {
      setCurrentInputIdx(4);
      setCurrentComment("다음 단계로 넘어가주세요!");
    }
  }, [watch("accountId"), watch("password"), watch("passwordConfirm"), user?.isNotDuplicate]);

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <MessageBox>{errorMessageText()}</MessageBox>
      <Input
        name="accountId"
        placeholder="toritori2022"
        register={register("accountId", {
          required: true,
          validate: value => AccountIdRegex.test(value) || "아이디는 6자리 이상\n영문 대소문자, 숫자를 입력해주세요",
          onChange() {
            setUser(prev => ({ ...prev!, isNotDuplicate: false }));
            setCurrentInputIdx(1);
            setValue("password", "");
            setValue("passwordConfirm", "");
          },
        })}
        error={errors.accountId?.message}
      />
      {(!user?.isNotDuplicate || !watch("accountId")) && (
        <button type="button" onClick={handleClickCheckAccountId}>
          중복확인
        </button>
      )}

      {currentInputIdx >= 2 && (
        <Input
          name="password"
          type="password"
          placeholder="●●●●●●"
          register={register("password", {
            required: true,
            validate: {
              regexPassword : value =>
              PasswordRegex.test(value) || "비밀번호는 6자리 이상\n영문 대소문자, 숫자를 조합해서 입력해주세요",
              
            },
            onChange() {
              if (watch("password").length < 6) {
                setValue("passwordConfirm", "");
                setCurrentInputIdx(2);
              } else {
                setCurrentInputIdx(3);
                if(watch("password") !== watch("passwordConfirm") && watch("passwordConfirm")){
                  setError("passwordConfirm",{message:"비밀번호가 일치하지 않아요!\n비밀번호를 다시 확인해주세요"})
                }else{
                  clearErrors(["password", "passwordConfirm"]);
                }
              }
            },
          })}
          error={errors.password?.message}
        />
      )}

      {currentInputIdx >= 3 && (
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="●●●●●●"
          register={register("passwordConfirm", {
            required: true,
            validate: {
              checkPassword,
            },
          })}
          error={errors.passwordConfirm?.message}
        />
      )}
      <Box>
        <CircleButton nonSubmit size="md" onClick={pageReset}>
          이전 페이지
        </CircleButton>
        <CircleButton
          size="md"
          disable={currentInputIdx !== 4}
        >
          다음 페이지
        </CircleButton>
      </Box>
    </form>
  );
};

export default SecondPage;
