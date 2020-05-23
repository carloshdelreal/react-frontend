import React, { useState } from "react";
import { Button, Overlay, Popover } from "react-bootstrap";
import styled from "styled-components";

const ButtonContainer = styled("div")``;

const StyledButton = styled(Button)`
  @media (max-width: 400px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

interface IProps {
  style?: object;
  title: string;
}

const InfoPopover: React.FC<IProps> = (props) => {
  const { style, title } = props;
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState();

  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <ButtonContainer style={style}>
      <StyledButton variant="secondary" onClick={handleClick}>
        {title}
      </StyledButton>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        rootClose
        onHide={handleClick}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">{title}</Popover.Title>
          <Popover.Content>{props.children}</Popover.Content>
        </Popover>
      </Overlay>
    </ButtonContainer>
  );
};

export default InfoPopover;
