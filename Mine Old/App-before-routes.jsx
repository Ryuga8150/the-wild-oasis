import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

// tagged template literals

// convention is capitalize first

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <>
      {/* 
        Global Styles
        Are placed as a sibling
        as they cannot have any children
      */}
      <GlobalStyles />
      <StyledApp>
        {/* As prop used to change the element*/}
        <Row>
          <Row type="horizontal">
            <Heading as="h1">Hello World!!!</Heading>
            <div>
              <Heading as="h2">Check In and Out</Heading>
              <Button onClick={() => alert("Check in")}>Check In</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("Check out")}
              >
                Check Out
              </Button>
            </div>
          </Row>

          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
