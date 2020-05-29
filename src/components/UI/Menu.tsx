import React from "react";
import InfoPopover from "./InfoPopover";
import styled from "styled-components";

import { IoMdMenu } from "react-icons/all";

const MenuContainer = styled("div")`
  margin-left: 20px;

  @media (max-width: 400px) {
    top: 80px;
  }
`;

const MobileMenu = styled("div")`
  @media (min-width: 400px) {
    display: none;
  }
`;

const ButtonsContainer = styled("div")`
  @media (max-width: 400px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;

    background: white;
    padding: 20px;
  }
`;

const AboutInfoPopover = styled(InfoPopover)`
  @media (min-width: 400px) {
    margin-right: 10px;
  }
`;

export default () => (
  <MenuContainer>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "150",
      }}
    >
      <MobileMenu>
        <IoMdMenu />
      </MobileMenu>

      <ButtonsContainer>
        <AboutInfoPopover title="About">
          <p>
            Darcie is an automated phone line anyone can call to find human
            services near them, such as free food, legal assistance,
            non-emergency medical help, and more. Read more and watch a live
            stream of the conversations at
            <a href="http://www.darcie.me">darcie.me</a>
            <br />
            <b>COVID-19 Update</b> Darcie was intended to pull from all services
            listed in the
            <a href="https://sfserviceguide.org/">SF Service Guide</a>, however
            in the current times the format of the data in that database (a.k.a.
            <a href="https://github.com/sheltertechsf/askdarcel-api">
              AskDarcel on github
            </a>
            ) made it hard to keep the information up to date with service hours
            & offerings changing. We pivoted Darcie to pull from a seperate
            Algolia index which consists of all hygiene stations & places
            handing out food in SF. The dialog & webhook have been adopted
            accordingly.
          </p>
        </AboutInfoPopover>
        <InfoPopover title="Contact">
          <p>
            Contributing, Branching, & Forking While we actively accept help, as
            well as encourage you to fork this repo and build it out for your
            city, we do not take pull requests directly to this repo - please
            contact us before you plan to do so. Reach out to: <br />
            Repo <a href="https://github.com/ShelterTechSF/VACS-MVP">
              Github
            </a>{" "}
            <br />
            Twitter{" "}
            <a href="https://twitter.com/dariceshelter">@dariceshelter</a>
          </p>
        </InfoPopover>
      </ButtonsContainer>
    </div>
  </MenuContainer>
);
