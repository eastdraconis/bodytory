import { RoundButton } from "@components/buttons/Button";
import styled, { css } from "styled-components";
import IconHospital from "@public/static/icon/icon_hospital.png";
import IconWarning from "@public/static/icon/icon_warning.png";
import { useState } from "react";
import Modal from "@components/modals/Modal";
import ArroundMap from "@components/modals/map/ArroundMapModal";
import { AnimatePresence } from "framer-motion";
import useCoords from "@hooks/useCoords";
import LocationPinIcon from "@public/static/icon/location_pin.svg";

interface ToryRecommendProps {
  mostThreeDepartment?: string[];
}
function ToryRecommend({ mostThreeDepartment }: ToryRecommendProps) {
  const [showModal, setShowModal] = useState(false);
  const { latitude, longitude } = useCoords();

  return (
    <>
      <ToryRecommendContainer>
        <ToryRecommendBox>
          <RecommendText>
            <Tag>Ai 토리추천</Tag>
            <Text>
              <strong>{mostThreeDepartment ? mostThreeDepartment.join(", ") : ""}</strong>
              {mostThreeDepartment
                ? "에 방문해보시는 것을 추천드려요!"
                : "증상을 기록해주시면 알맞는 병원을 추천해드릴게요!"}
            </Text>
          </RecommendText>
          {mostThreeDepartment && (
            <RoundButton size="custom" height="50px" padding="0 30px" onClick={() => setShowModal(true)}>
              <LocationPinIcon width={26} height={26} style={{ marginRight: "10px" }} />
              <span>내 주변 해당 병원 찾기</span>
            </RoundButton>
          )}
        </ToryRecommendBox>
        <Warning>
          Ai 토리추천 서비스는 의료행위가 아닌 정보 참고용 서비스임을 밝히며, 정확한 의학적 판단을 위해서는 반드시
          가까운 의료기관을 내원해주세요
        </Warning>
      </ToryRecommendContainer>
      <AnimatePresence>
        {showModal && <ArroundMap latitude={latitude!} longitude={longitude!} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}

const ToryRecommendContainer = styled.div`
  margin-bottom: 60px;
`;

const ToryRecommendBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 15px 20px;
  box-shadow: 8px 8px 18px 0px rgba(32, 36, 120, 0.3);
  background: ${({ theme }) => theme.color.white};
`;

const RecommendText = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.span`
  position: relative;
  background: url(${IconHospital.src}) no-repeat 8px 8px/20px;
  background-color: #f2f3ff;
  border-radius: 10px;
  padding: 10px 10px 10px 22px;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.darkBg};
`;

const Text = styled.div`
  font-size: 20px;

  strong {
    font-weight: 700;
  }
`;

const Warning = styled.div`
  background: url(${IconWarning.src}) no-repeat 25px 50%/13px;
  padding: 15px 45px;
  font-size: 13px;
  color: #d9deff;
  opacity: 0.8;
`;

const MapContainer = styled.div``;

export default ToryRecommend;
