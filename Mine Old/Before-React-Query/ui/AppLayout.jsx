import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { styled } from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />

      {/*
        Outlet wrapped in main
        as main will be styled
        thus same styling for outlet

        In outlets we either return 
        a fragment or elements
        no wasteful divs
      */}
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
