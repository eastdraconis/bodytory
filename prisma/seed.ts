// import hospitalsSample from "../data/new-hospital/hospital_final.json";
import asd from "./dd3.json";
// import DepartmentsSample from "../data/new-hospital/code_final.json";
// import type { Hospital, MedicalDepartment } from "prisma/prisma-client";
// import fs from "fs";
import { PrismaClient } from "@prisma/client";
// import hospital from "@api/users/hospital";
// import d from "../data/hospital/진료과목코드_수정02.json";
const client = new PrismaClient();

interface Department {
  name: string;
  departmentCode: number;
  department: string;
}
interface Match {
  index: number;
  name: string;
  departmentCodes: number[];
}

// async function ConnectHospitalToDepartment() {
//   const matchDepartment: Match[] = asd.value;
//   // const matchDepartment = fs.readFileSync("../data/new-hospital/code_final.json");
//   // console.log(matchDepartment);
//   console.log("dfdsfd");
//   const ASDF = (a: Match[]) => {
//     const arr: { hospitalId: number; medicalDepartmentId: number }[] = [];
//     for (let i = 0; i < a.length; i++) {
//       a[i].departmentCodes.forEach(j => {
//         arr.push({ hospitalId: a[i].index, medicalDepartmentId: j });
//       });
//     }
//     return arr;
//   };
//   ASDF(matchDepartment);
//   await client.hospitalToMedicalDepartMentConnector.createMany({
//     data: ASDF(matchDepartment),
//   });
// }
// ConnectHospitalToDepartment();

// 병원 데이터 지우기
// async function Deletehospitals() {
//   console.log("dddd");
//   // await client.hospital.deleteMany({});
// }
// Deletehospitals();

// // 레코드 다 지우기
// async function DeleteRecords() {
//   await client.record.deleteMany({});
// }
// DeleteRecords();

async function DeleteMedicalDepartment() {
  await client.hospitalToMedicalDepartMentConnector.deleteMany({});
}
DeleteMedicalDepartment();
// async function DeleteHospital() {
//   await client.hospital.deleteMany({});
// }
// DeleteHospital();

// async function FindMedicalDepartMent() {
//   const result = await client.medicalDepartment.findMany({
//     select: {
//       id: true, 
//       department: true,
//       _count: true,
//     },
//   });
//   console.log(result);
// }
// FindMedicalDepartMent();

async function CreateHospitals2(){
  await client.hospital.createMany({
    data:[{
      address:"",
      city:"",
      area:"",
      class:"",
      name:"",
      hospitalToMedicalDepartMentConnectors:{
        
      }
    }]
  })
}