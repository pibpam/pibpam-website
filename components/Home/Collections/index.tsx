import React from "react";
import styles from "../../../styles/components/Home/Collections.module.scss";
import BlockHeader from "../BlockHeader";
import { FiImage } from "react-icons/fi";
import Carousel from "../../Carousel";
import { ICollection } from "../../../interfaces/Collection";
import CollectionCard from "../../CollectionCard";

interface ICollections {
  collections?: ICollection[]
  goTo: (path: string) => void
}

const Collections: React.FC<ICollections> = ({ collections, goTo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <BlockHeader
          icon={<FiImage color={"#383838"} />}
          title="Nossos Últimos Registros"
        />
        <div className={styles.caroussel_controlls}>
          <p>
            Acompanhe tudo que acontece em nossa igreja! <a onClick={() => goTo("/collections")}>Ver tudo.</a>
          </p>
        </div>
      </div>
      <div>
        <Carousel>
          <>
            {collections && collections.map(item => (
              <div key={item.uuid} className={styles.card_container}>
                <CollectionCard
                  onClick={() => goTo("/collection/" + item.uuid)}
                  data={item}/>
              </div>
            )
            )}
          </>
        </Carousel>
      </div>
    </div>
  )
}

export default Collections
