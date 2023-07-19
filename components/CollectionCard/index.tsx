import React from "react";
import styles from "../../styles/components/CollectionCard.module.scss"
import { DateUtils } from "../../utils/Date";
import { ICollection } from "../../interfaces/Collection";

interface ICollectionCard {
  onClick: () => void
  data: ICollection
}

const CollectionCard: React.FC<ICollectionCard> = ({ onClick, data }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.tag__date}>
        {DateUtils.formatDateDefault(data.collectionDate)}
      </div>

      <div className={styles.thumb}>
        <div className={styles.content}>
          <p>{data.title}</p>
          {data.photos && (
            <p>{data.photos.length} Fotos</p>
          )}
        </div>

        <div className={styles.backdrop} style={{ background: "url('" + data.image + "') center/cover" }}>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard
