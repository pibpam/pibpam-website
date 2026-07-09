import React from "react";
import { FiArrowRight, FiCalendar, FiMapPin } from "react-icons/fi";
import { IEvent } from "../../interfaces/Event";
import { DateUtils } from "../../utils/Date";
import {
  Backdrop,
  Container,
  Content,
  Cta,
  Footer,
  FooterInfo,
  Meta,
  Price,
  Spots,
  TagStatus,
  Thumb,
} from "./styles";

interface IEventTicketCard {
  data: IEvent;
  onClick?: () => void;
  onSubscribe?: () => void;
}

const formatPrice = (price?: number | string | null) => {
  const value = typeof price === "string" ? parseFloat(price) : price;
  if (value === undefined || value === null || !Number.isFinite(value) || value === 0) {
    return "Gratuito";
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const EventTicketCard: React.FC<IEventTicketCard> = ({
  data,
  onClick,
  onSubscribe,
}) => {
  const spotsLabel = data.soldOut
    ? "Esgotado"
    : data.availableSpots !== null
    ? `${data.availableSpots} vaga${data.availableSpots === 1 ? "" : "s"}`
    : null;

  // Mesmo esgotado, o clique leva pra tela do evento — é lá que quem já se
  // inscreveu consegue acompanhar/verificar a inscrição.
  const handleSubscribe = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSubscribe?.();
  };

  return (
    <Container onClick={onClick}>
      {data.soldOut && (
        <TagStatus $soldOut>
          Esgotado
        </TagStatus>
      )}

      <Thumb>
        <Content>
          <p>{data.name}</p>
          <Meta>
            {data.startDate && (
              <span>
                <FiCalendar />
                {DateUtils.formatDateDefault(data.startDate)}
              </span>
            )}
            {data.location && (
              <span>
                <FiMapPin />
                {data.location}
              </span>
            )}
          </Meta>
        </Content>

        <Backdrop
          style={
            data.image
              ? { background: `url('${data.image}') center/cover` }
              : undefined
          }
        />
      </Thumb>

      <Footer>
        <FooterInfo>
          <Price>
            {formatPrice(data.activeBatch?.price)}
          </Price>
          {spotsLabel && (
            <Spots $soldOut={data.soldOut}>
              {spotsLabel}
            </Spots>
          )}
        </FooterInfo>

        <Cta
          type="button"
          onClick={handleSubscribe}
          $soldOut={data.soldOut}
        >
          {data.soldOut ? (
            "Ver evento"
          ) : (
            <>
              Fazer inscrição <FiArrowRight />
            </>
          )}
        </Cta>
      </Footer>
    </Container>
  );
};

export default EventTicketCard;
