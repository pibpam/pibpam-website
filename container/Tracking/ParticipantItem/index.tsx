import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import {
  TrackAddon,
  TrackAddonDesc,
  TrackAddonImg,
  TrackAddonImgPlaceholder,
  TrackAddonInfo,
  TrackAddonName,
  TrackAddons,
  TrackItem,
  TrackItemHead,
  TrackItemSub,
} from "../../../styles/Tracking";
import { IRegistrationSearchParticipant } from "../../../interfaces/Event";

interface IParticipantItem {
  participant: IRegistrationSearchParticipant;
  formatPrice: (price?: number | string | null) => string | null;
}

const ParticipantItem: React.FC<IParticipantItem> = ({ participant, formatPrice }) => {
  return (
    <TrackItem>
      <TrackItemHead>
        <strong>{participant.name}</strong>
        <span>{formatPrice(participant.price)}</span>
      </TrackItemHead>
      {participant.isMinor && participant.responsibleName && (
        <TrackItemSub>
          Responsável: {participant.responsibleName}
          {participant.responsiblePhone ? ` · ${participant.responsiblePhone}` : ""}
        </TrackItemSub>
      )}
      {!!participant.addons.length && (
        <TrackAddons>
          {participant.addons.map((a) => (
            <TrackAddon key={a.uuid}>
              {a.addon.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <TrackAddonImg src={a.addon.image} alt={a.addon.name} />
              )}
              <TrackAddonInfo>
                <TrackAddonName>{a.addon.name}</TrackAddonName>
                {a.addon.description && (
                  <TrackAddonDesc>{a.addon.description}</TrackAddonDesc>
                )}
              </TrackAddonInfo>
            </TrackAddon>
          ))}
        </TrackAddons>
      )}
      {!!participant.products.length && (
        <TrackAddons>
          {participant.products.map((item) => (
            <TrackAddon key={item.uuid}>
              {item.product.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <TrackAddonImg
                  src={item.product.imageUrl}
                  alt={item.product.name}
                />
              ) : (
                <TrackAddonImgPlaceholder>
                  <FiShoppingBag />
                </TrackAddonImgPlaceholder>
              )}
              <TrackAddonInfo>
                <TrackAddonName>
                  {item.product.name}
                  {item.variation ? ` · ${item.variation}` : ""}
                </TrackAddonName>
                <TrackAddonDesc>{formatPrice(item.price)}</TrackAddonDesc>
              </TrackAddonInfo>
            </TrackAddon>
          ))}
        </TrackAddons>
      )}
    </TrackItem>
  );
};

export default ParticipantItem;
