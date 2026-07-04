import React from "react";
import { FiArrowRight, FiCalendar, FiMapPin } from "react-icons/fi";
import styles from "../../styles/components/EventTicketCard.module.scss";
import { IEvent } from "../../interfaces/Event";
import { DateUtils } from "../../utils/Date";

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

  const handleSubscribe = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (data.soldOut) {
      return;
    }
    onSubscribe?.();
  };

  return (
    <div className={styles.container} onClick={onClick}>
      {data.soldOut && (
        <div className={`${styles.tag__status} ${styles.tag__sold_out}`}>
          Esgotado
        </div>
      )}

      <div className={styles.thumb}>
        <div className={styles.content}>
          <p>{data.name}</p>
          <div className={styles.meta}>
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
          </div>
        </div>

        <div
          className={styles.backdrop}
          style={
            data.image
              ? { background: `url('${data.image}') center/cover` }
              : undefined
          }
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.footer__info}>
          <span className={styles.price}>
            {formatPrice(data.activeBatch?.price)}
          </span>
          {spotsLabel && (
            <span
              className={`${styles.spots} ${
                data.soldOut ? styles.spots__sold_out : ""
              }`}
            >
              {spotsLabel}
            </span>
          )}
        </div>

        <button
          type="button"
          className={`${styles.cta} ${
            data.soldOut ? styles.cta__disabled : ""
          }`}
          onClick={handleSubscribe}
          disabled={data.soldOut}
        >
          {data.soldOut ? (
            "Esgotado"
          ) : (
            <>
              Fazer inscrição <FiArrowRight />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EventTicketCard;
