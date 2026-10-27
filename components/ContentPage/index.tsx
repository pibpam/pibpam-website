import React from "react";
import { Container } from "@/components/ui/Container";
import VideoDetail from "../VideoDetail";
import { IContent } from "../../interfaces/Contens";

interface IContentPage {
  content: IContent
}

const ContentPage: React.FC<IContentPage> = ({ content }) => {
  return (
    <Container className="pt-5 pb-16">
      <VideoDetail
        title={content.name}
        videoId={content.content}
        thumb={content.image}
        description={content.description}
        author={content.author}
        date={content.contentDate}
        live={content.isLive}
        shareUrl={`https://pibpam.org/event/${content.uuid}`}
        shareMessage={`${content.name}, ${content.author?.name}.`}
      />
    </Container>
  )
}

export default ContentPage
