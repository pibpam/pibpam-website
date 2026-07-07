import React from "react";
import YTPlayer from "../YTPlayer";
import { FiCalendar } from "react-icons/fi";
import { DateUtils } from "../../utils/Date";
import ShareButton from "../ShareButton";
import { IBroadcast } from "../../interfaces/Broadcast";
import { Container, Header, TagDate, TagLive } from "./styles"

interface ILivePage {
  content: IBroadcast
}

const LivePage: React.FC<ILivePage> = ({ content }) => {
  return (
    <Container>
      <h1>{content?.title}</h1>
      <Header>
        <div>
          {content.author?.image && (
            <div style={{ background: "url('" + content.author.image + "') center/cover" }}></div>
          )}
          {content.author && content.author.name}
        </div>
        {content.ytStatus === 'complete' ? (<TagDate>
          <FiCalendar />{content?.startAt && DateUtils.formatDateDefault(content.startAt)}</TagDate>) : (
          <TagLive>Ao Vivo</TagLive>)}

      </Header>
      <YTPlayer videoId={content.ytId} thumb={content.image} />
      <p>{content.description}</p>
      <ShareButton url={`https://pibpam.org/broadcast/${content.uuid}`} message={`${content.title}, ${content.author?.name}.`} />
    </Container>
  )
}

export default LivePage
