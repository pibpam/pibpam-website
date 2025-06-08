import React from "react";
import styles from "../../styles/components/ContentPage.module.scss"
import YTPlayer from "../YTPlayer";
import { FiCalendar } from "react-icons/fi";
import { IContent } from "../../interfaces/Contens";
import { DateUtils } from "../../utils/Date";
import ShareButton from "../ShareButton";

interface IContentPage {
  content: IContent
}

const ContentPage: React.FC<IContentPage> = ({ content }) => {
  return (
    <div className={styles.container}>
      <h1>{content?.name}</h1>
      <div className={styles.header}>
        <div>
          {content.author?.image && (
            <div style={{ background: "url('" + content.author.image + "') center/cover" }}></div>
          )}
          {content.author && content.author.name}
        </div>
        {!content.isLive ? (<div className={styles.tag_date}>
          <FiCalendar />{content?.contentDate && DateUtils.formatDateDefault(content.contentDate)}</div>) : (
          <div className={styles.tag_live}>Ao Vivo</div>)}

      </div>
      <YTPlayer videoId={content.content} thumb={content.image} />
      <p>{content.description}</p>
      <ShareButton url={`https://pibpam.org/event/${content.uuid}`} message={`${content.name}, ${content.author?.name}.`} />
    </div>
  )
}

export default ContentPage
