import React from "react";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { IEventResponsible } from "../../../interfaces/Event";
import StringUtils from "../../../utils/StringUtils";
import { SectionLabel } from "../../../styles/Inscription";
import {
  Responsibles as ResponsiblesList,
  ResponsibleCard,
  ResponsibleContact,
  ResponsibleIcon,
  ResponsibleInfo,
  ResponsibleName,
} from "./styles";

// Gera o link do WhatsApp já com a mensagem predefinida (DDI 55 assumido, BR).
const whatsappLink = (phone: string, eventName: string) => {
  const digits = phone.replace(/\D/g, "");
  const withCountryCode = digits.startsWith("55") ? digits : `55${digits}`;
  const message = `Olá! Tenho uma dúvida sobre a inscrição no evento "${eventName}".`;
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`;
};

interface IInscriptionResponsiblesProps {
  responsibles: IEventResponsible[];
  eventName: string;
}

const InscriptionResponsibles: React.FC<IInscriptionResponsiblesProps> = ({
  responsibles,
  eventName,
}) => {
  if (!responsibles.length) return null;

  return (
    <>
      <SectionLabel>Falar com os responsáveis</SectionLabel>
      <ResponsiblesList>
        {responsibles.map((responsible, index) => (
          <ResponsibleCard
            key={`${responsible.phone}-${index}`}
            href={
              responsible.whatsapp
                ? whatsappLink(responsible.phone, eventName)
                : `tel:${responsible.phone.replace(/\D/g, "")}`
            }
            target={responsible.whatsapp ? "_blank" : undefined}
            rel={responsible.whatsapp ? "noopener noreferrer" : undefined}
          >
            <ResponsibleIcon>
              {responsible.whatsapp ? <FaWhatsapp /> : <FiPhone />}
            </ResponsibleIcon>
            <ResponsibleInfo>
              <ResponsibleName>{responsible.name}</ResponsibleName>
              <ResponsibleContact>
                {StringUtils.maskPhone(responsible.phone)}
              </ResponsibleContact>
            </ResponsibleInfo>
          </ResponsibleCard>
        ))}
      </ResponsiblesList>
    </>
  );
};

export default InscriptionResponsibles;
