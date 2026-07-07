import React from "react";
import BlockHeader from "../BlockHeader";
import { FiImage } from "react-icons/fi";
import Carousel from "../../Carousel";
import { ICollection } from "../../../interfaces/Collection";
import CollectionCard from "../../CollectionCard";
import theme from "../../../styles/theme";
import { CardContainer, CarousselControlls, Container, Content } from "./styles"

interface ICollections {
  collections?: ICollection[]
  goTo: (path: string) => void
}

const Collections: React.FC<ICollections> = ({ collections, goTo }) => {
  return (
    <Container>
      <Content>
        <BlockHeader
          icon={<FiImage color={theme.colors.gray750} />}
          title="Nossos Últimos Registros"
        />
        <CarousselControlls>
          <p>
            Acompanhe tudo que acontece em nossa igreja! <a onClick={() => goTo("/collections")}>Ver tudo.</a>
          </p>
        </CarousselControlls>
      </Content>
      <div>
        <Carousel>
          <>
            {collections && collections.map(item => (
              <CardContainer key={item.uuid}>
                <CollectionCard
                  onClick={() => goTo("/collection/" + item.uuid)}
                  data={item}/>
              </CardContainer>
            )
            )}
          </>
        </Carousel>
      </div>
    </Container>
  )
}

export default Collections
