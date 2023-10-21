import React from "react";
import styles from "../../styles/components/LivePage.module.scss"
import YTPlayer from "../YTPlayer";
import { FiCalendar } from "react-icons/fi";
import { DateUtils } from "../../utils/Date";
import ShareButton from "../ShareButton";
import { IBroadcast } from "../../interfaces/Broadcast";

interface ILivePage {
  content: IBroadcast
}

const LivePage: React.FC<ILivePage> = ({ content }) => {
  return (
    <div className={styles.container}>
      <h1>{content?.title}</h1>
      <div className={styles.header}>
        <div>
          {content.author?.image && (
            <div style={{ background: "url('" + content.author.image + "') center/cover" }}></div>
          )}
          {content.author && content.author.name}
        </div>
        {content.ytStatus === 'complete' ? (<div className={styles.tag_date}>
          <FiCalendar />{content?.startAt && DateUtils.formatDateDefault(content.startAt)}</div>) : (
          <div className={styles.tag_live}>Ao Vivo</div>)}

      </div>
      <YTPlayer videoId={content.ytId} thumb={content.image} />
      <p>{content.description}</p>
      <ShareButton url={`https://pibpam.org/broadcast/${content.uuid}`} message={`${content.title}, ${content.author?.name}.`} />
    </div>
  )
}

export default LivePage
