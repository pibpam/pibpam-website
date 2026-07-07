import React from "react";
import BlockHeader from "../BlockHeader";
import { FiBookOpen } from "react-icons/fi";
import Carousel from "../../Carousel";
import { IDevotinal } from "../../../interfaces/Devotinal";
import DevotionalCard from "../../DevotionalCard";
import theme from "../../../styles/theme";
import { CardContainer, CarousselControlls, Container, Content } from "./styles"

interface IDevotionals {
  devotionals?: IDevotinal[]
  goTo: (path: string) => void
}

const Devotionals: React.FC<IDevotionals> = ({ devotionals, goTo }) => {
  return (
    <Container>
      <Content>
        <BlockHeader
          icon={<FiBookOpen color={theme.colors.gray750} />}
          title="Últimos Devocionais"
        />
        <CarousselControlls>
          <p>
            Todo dia um novo devocional para você! <a onClick={() => goTo("/devotionals")}>Ver tudo.</a>
          </p>
        </CarousselControlls>
      </Content>
      <div>
        <Carousel>
          <>
            {devotionals && devotionals.map(item => (
              <CardContainer key={item.uuid}>
                <DevotionalCard
                  onClick={() => goTo("/devotional/" + item.uuid)}
                  devotional={item} />
              </CardContainer>
            )
            )}
          </>
        </Carousel>
      </div>
    </Container>
  )
}

export default Devotionals
