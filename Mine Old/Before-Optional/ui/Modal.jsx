import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

Modal.propTypes = {
  children: PropTypes.node,
};

// REACT PORTAL
// a feature that allows us to render outside
// of parent element's dom structure
// while still keeping the original structure in component tree
// its in react dom lirarary
// accepts jsx and then position where you want in dom

// Why called Portal
// since it creates an invisible tunnel from a place to another place

// NEED OF REACT PORTAL
// Since it also works currently with css styling
// This is because to avoid interaction with property
// overflow:hidden
// since people can reuse modals at various places

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

Open.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // NOW WE want to ADD open event handler
  // to the children passed
  //we can do it by

  // cloneElement
  // which adds on the prop to children
  // should be CAREFUL while using this one
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

Window.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
