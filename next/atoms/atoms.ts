import { Position, Record, RecordImage, User } from "@prisma/client";
import { RegisterForm } from "pages/auth/register";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loggedInUser = atom<User | RegisterForm | null>({
  key: "loggedInUser",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const selectedBodyPart = atom<Position | null>({
  key: "selectedBodyPartKey",
  default: null
});

export const selectedRecord = atom<any>({
  key: "selectedRecordKey",
  default: null
});

export const currentHospitalIdx = atom<number>({
  key : "currentHospitalIdxKey",
  default: 0
})