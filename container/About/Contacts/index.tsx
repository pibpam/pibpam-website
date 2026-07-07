import React from "react";
import { FiGlobe, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { IChurchInfo } from "../../../interfaces/Church";
import { ButtonLink, ButtonLinkLocation, Container } from "./styles";

interface IContacts {
  data: IChurchInfo;
  mapUrl: string;
  openLink: (url: string) => void;
}

const Contacts: React.FC<IContacts> = ({ data, mapUrl, openLink }) => {
  const phonesStr = () => {
    if (data.phoneNumber && data.whatsAppNumber) {
      return `${data.phoneNumber} // ${data.whatsAppNumber}`;
    }

    if (data.phoneNumber) {
      return data.phoneNumber;
    }
    return data.whatsAppNumber;
  };

  const getCallableNumber = () => {
    if (data.phoneNumber) {
      const justNumbers = data.phoneNumber.match(/\d/g)?.join("");
      return `+55${justNumbers}`;
    }
    return "";
  };

  return (
    <Container>
      <p>{data.name}</p>

      <ButtonLink onClick={() => openLink(`mailto:${data.email}`)}>
        <FiMail /> {data.email}
      </ButtonLink>
      {!!phonesStr() && (
        <ButtonLink onClick={() => openLink(`tel:${getCallableNumber()}`)}>
          <FiPhone /> {phonesStr()}
        </ButtonLink>
      )}
      {!!data.site && (
        <ButtonLink>
          <FiGlobe /> {data.site}
        </ButtonLink>
      )}
      <ButtonLinkLocation>
        <FiMapPin />
        <div>
          <div>
            <span>Localização</span>
            {mapUrl && (
              <button onClick={() => openLink(mapUrl)}>Como chegar</button>
            )}
          </div>
          <div>{data.address}</div>
        </div>
      </ButtonLinkLocation>
    </Container>
  );
};

export default Contacts;
