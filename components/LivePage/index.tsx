import React from "react";
import { Container } from "@/components/ui/Container";
import VideoDetail from "../VideoDetail";
import { IBroadcast } from "../../interfaces/Broadcast";

interface ILivePage {
  content: IBroadcast
  tone?: 'light' | 'dark'
}

const LivePage: React.FC<ILivePage> = ({ content, tone }) => {
  return (
    <Container className="pt-5 pb-16">
      <VideoDetail
        title={content.title}
        videoId={content.ytId}
        thumb={content.image}
        description={content.description}
        author={content.author}
        date={content.startAt}
        live={content.ytStatus !== 'complete'}
        shareUrl={`https://pibpam.org/broadcast/${content.uuid}`}
        shareMessage={`${content.title}, ${content.author?.name}.`}
        tone={tone}
      />
    </Container>
  )
}

export default LivePage
