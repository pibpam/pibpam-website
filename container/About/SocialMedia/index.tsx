import React from "react";
import { FiInstagram, FiYoutube } from "react-icons/fi";
import { FaSpotify } from "react-icons/fa";
import { IChurchInfo } from "../../../interfaces/Church";
import { ButtonLink, Container } from "./styles";

interface ISocialMedia {
  data: IChurchInfo;
  openLink: (url: string) => void;
}

const SocialMedia: React.FC<ISocialMedia> = ({ data, openLink }) => {
  return (
    <Container>
      <ButtonLink onClick={() => openLink(data.youTubeUrl || "")}>
        <FiYoutube /> {data.youTubeName}
      </ButtonLink>
      <ButtonLink onClick={() => openLink(data.instagramUrl || "")}>
        <FiInstagram /> {data.instagramName}
      </ButtonLink>
      <ButtonLink onClick={() => openLink(data.spotifyUrl || "")}>
        <FaSpotify /> {data.spotifyName}
      </ButtonLink>
    </Container>
  );
};

export default SocialMedia;
