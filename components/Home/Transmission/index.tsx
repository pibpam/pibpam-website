import React from "react";
import BlockHeader from "../BlockHeader";
import ThumbVideo from "../ThumbVideo";
import SecondaryButton from "../../Button/Secondary";
import { FiPlay, FiVideo } from "react-icons/fi";
import { IContent } from "../../../interfaces/Contens";
import { IBroadcast } from "../../../interfaces/Broadcast";
import { Container, Content, Live } from "./styles"

interface ITransmission {
  content?: IContent
  live?: IBroadcast
  goTo: (pathname: string) => void
}

const Transmission: React.FC<ITransmission> = ({ content, live, goTo }) => {
  return (
    <Container>
      {live && (
        <Live>
          <BlockHeader
            icon={<FiVideo />}
            title="Estamos ao-vivo neste momento"
          />
          <Content>
            <ThumbVideo
              title={live.title}
              background={live.image}
              subtitle={live.author?.name}
              onClick={() => goTo("/broadcast/" + live?.uuid)}
            />
          </Content>

          <SecondaryButton onClick={() => goTo("/broadcast/" + live?.uuid)}>
            <><FiPlay /> Assistir Culto On-line</>
          </SecondaryButton>
        </Live>
      )}
      {content && (
        <>
          <BlockHeader
            icon={<FiVideo />}
            title="Assista a nossa última transmissão"
          />
          <Content>
            <ThumbVideo
              title={content.name}
              background={content.image}
              subtitle={content.author?.name}
              onClick={() => goTo("/event/" + content?.uuid)}
            />
          </Content>
        </>
      )}
    </Container>
  )
}

export default Transmission
