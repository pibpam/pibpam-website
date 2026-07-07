import React from "react";
import { IMemberBasic } from "../../../interfaces/Member";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { Badge, BadgeIcon, Texts, Widget } from "./styles"

interface IBirthdayWidget {
  birthdays: IMemberBasic[];
}

const toCamelCaseWord = (value: string) => {
  if (!value) {
    return "";
  }

  return value
    .toLocaleLowerCase("pt-BR")
    .split("-")
    .map((part) => {
      if (!part) {
        return "";
      }

      return part.charAt(0).toLocaleUpperCase("pt-BR") + part.slice(1);
    })
    .join("-");
};

const toFirstAndLastNameCamelCase = (fullName?: string) => {
  const parts = (fullName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) {
    return "";
  }

  const firstName = toCamelCaseWord(parts[0]);
  const lastName = parts.length > 1 ? toCamelCaseWord(parts[parts.length - 1]) : "";

  return [firstName, lastName].filter(Boolean).join(" ");
};

const BirthdayWidget: React.FC<IBirthdayWidget> = ({ birthdays }) => {
  const { goTo } = useAppNavigation();

  if (!birthdays.length) {
    return null;
  }

  const namesText = birthdays
    .map((member) => toFirstAndLastNameCamelCase(member.name))
    .filter(Boolean)
    .join(", ");
  const safeNamesText = namesText || "aniversariantes de hoje";

  return (
    <Widget
      type="button"
      onClick={() =>
        goTo({
          pathname: "/birthdays",
          showLoading: true,
        })
      }
      aria-label="Ver lista de aniversariantes"
    >
      <Badge aria-label="Comemoração de aniversário">
        <BadgeIcon />
      </Badge>

      <Texts>
        <h2>Aniversariantes do dia:</h2>
        <h3>{safeNamesText}</h3>
      </Texts>
    </Widget>
  );
};

export default BirthdayWidget;
