import { Wrapper } from "@styles/Common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "./header/Header";
import SideMenu from "./header/SideMenu";

interface LayoutProps {
  children?: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [bgColor, setBgColor] = useState("rgb(242, 243, 255)");
  useEffect(() => {
    if (router.pathname.includes("/auth") && !router.pathname.includes("/withdraw")) setBgColor("rgb(83, 89, 233)");
    else setBgColor("rgb(242, 243, 255)");
  }, [router]);
  return (
    <Wrapper bgColor={bgColor}>
      <SideMenu />
      {children}
    </Wrapper>
  );
};

export default Layout;
const getServerSideProps = () => {
  return { props: {} };
};