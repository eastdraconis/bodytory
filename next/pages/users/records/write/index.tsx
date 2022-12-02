import BodyNavigator from "@components/records/BodyNavigator";
import styled from "styled-components";
import BodyPartChecker from "@components/records/BodyPartChecker";
import { useState } from "react";
import { bodyPartType } from "../../../../types/bodyParts";

export default function WritePage() {

  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);

  return (
    <RecordContainer>
      <BodyPartChecker selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
      <BodyNavigator selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} isWritePage={true} />
    </RecordContainer>
  );
}

const RecordContainer = styled.div`
  padding: 50px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
`;
