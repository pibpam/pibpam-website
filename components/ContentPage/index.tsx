import React from "react";
import YTPlayer from "../YTPlayer";
import { FiCalendar } from "react-icons/fi";
import { IContent } from "../../interfaces/Contens";
import { DateUtils } from "../../utils/Date";
import ShareButton from "../ShareButton";
import { Container, Header, TagDate, TagLive } from "./styles"

interface IContentPage {
  content: IContent
}

const ContentPage: React.FC<IContentPage> = ({ content }) => {
  return (
    <Container>
      <h1>{content?.name}</h1>
      <Header>
        <div>
          {content.author?.image && (
            <div style={{ background: "url('" + content.author.image + "') center/cover" }}></div>
          )}
          {content.author && content.author.name}
        </div>
        {!content.isLive ? (<TagDate>
          <FiCalendar />{content?.contentDate && DateUtils.formatDateDefault(content.contentDate)}</TagDate>) : (
          <TagLive>Ao Vivo</TagLive>)}

      </Header>
      <YTPlayer videoId={content.content} thumb={content.image} />
      <p>{content.description}</p>
      <ShareButton url={`https://pibpam.org/event/${content.uuid}`} message={`${content.name}, ${content.author?.name}.`} />
    </Container>
  )
}

export default ContentPage
