import Input from "@components/Input";
import customApi from "utils/client/customApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RECORDS_CREATE, RECORDS_READ } from "constant/queryKeys";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyNavigator from "@components/record/BodyNavigator";

interface WriteType {
  write: string;
}

export type SiteType =
  | "forehead"
  | "eyes"
  | "nose"
  | "mouth"
  | "cheek"
  | "chin"
  | "ears"
  | "back"
  | "waist"
  | "hip"
  | "neck"
  | "chest"
  | "stomach"
  | "pelvis"
  | "sexOrgan"
  | "shoulder"
  | "upperArm"
  | "albow"
  | "forearm"
  | "wrist"
  | "hand"
  | "thigh"
  | "knee"
  | "calf"
  | "ankle"
  | "foot"
  | null;

export default function WritePage() {
  // const queryClient = useQueryClient();
  // const { postApi } = customApi("/api/users/records");
  // const { mutate } = useMutation([RECORDS_CREATE], postApi, {
  //   onSuccess(data, variables, context) {
  //     queryClient.invalidateQueries([RECORDS_READ]);
  //   },
  // });
  // const [isText, setIsText] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   setError,
  //   formState: { errors },
  // } = useForm<WriteType>();
  // const onValid: SubmitHandler<WriteType> = ({ write }) => {
  //   mutate({ type: "user", position: "head", description: write });
  //   setValue("write", "");
  //   setIsText(true);
  //   setTimeout(() => {
  //     setIsText(false);
  //   }, 2000);
  // };
  const [selectedSite, setSelectedSite] = useState<SiteType>("stomach");

  return (
    <BodyNavigator selectedSite={selectedSite} setSelectedSite={setSelectedSite} />
    // <div>
    //   <form onSubmit={handleSubmit(onValid)}>
    //     <Input
    //       name="write"
    //       label="기록할내용"
    //       type="text"
    //       register={register("write", { required: "필수값입니다" })}
    //       placeholder="내용을 입력하세요"
    //       errorMessage={errors.write?.message}
    //     />
    //     <button type="submit">작성</button>
    //   </form>
    //   <br />
    //   <br />
    //   {isText && <div>작성 되었습니다!</div>}
    //   <br />
    //   <br />
    //   <Link href={"/users/records/chart"}>
    //     <button>기록보기</button>
    //   </Link>
    // </div>
  );
}
