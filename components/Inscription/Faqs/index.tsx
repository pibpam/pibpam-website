import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IEventFaq } from "../../../interfaces/Event";
import { SectionLabel } from "../../../styles/Inscription";
import {
  Faqs as FaqsList,
  FaqAnswer,
  FaqAnswerInner,
  FaqAnswerWrap,
  FaqItem,
  FaqQuestion,
} from "./styles";

interface IInscriptionFaqsProps {
  faqs: IEventFaq[];
}

const InscriptionFaqs: React.FC<IInscriptionFaqsProps> = ({ faqs }) => {
  const [openUuid, setOpenUuid] = useState<string | null>(null);

  if (!faqs.length) return null;

  return (
    <>
      <SectionLabel>Perguntas frequentes</SectionLabel>
      <FaqsList>
        {faqs
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((faq) => {
            const open = openUuid === faq.uuid;
            return (
              <FaqItem key={faq.uuid}>
                <FaqQuestion
                  type="button"
                  $open={open}
                  onClick={() => setOpenUuid(open ? null : faq.uuid)}
                >
                  {faq.question}
                  <FiChevronDown />
                </FaqQuestion>
                <FaqAnswerWrap $open={open}>
                  <FaqAnswerInner>
                    {/* anwser vem em HTML da API */}
                    <FaqAnswer dangerouslySetInnerHTML={{ __html: faq.anwser }} />
                  </FaqAnswerInner>
                </FaqAnswerWrap>
              </FaqItem>
            );
          })}
      </FaqsList>
    </>
  );
};

export default InscriptionFaqs;
