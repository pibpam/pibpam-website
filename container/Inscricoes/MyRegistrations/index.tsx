import React, { useEffect, useState } from "react";
import { FiInbox, FiSearch } from "react-icons/fi";
import Badge from "../../../components/Badge";
import { SectionLabel } from "../../../styles/Inscription";
import { statusBadgeVariant, statusLabel } from "../../../utils/registrationStatus";
import { getSavedRegistrations, saveRegistration } from "../../../utils/LocalStorage";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { ApiLocal } from "../../../services/apiLocal";
import { DateUtils } from "../../../utils/Date";
import { ISavedRegistration } from "../../../interfaces/Event";
import {
  Container,
  Empty,
  Error,
  Form,
  Input,
  Item,
  ItemCode,
  ItemEvent,
  ItemInfo,
  ItemName,
  List,
  Spinner,
  SubmitButton,
} from "./styles";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface IMyRegistrations {
  // E-mail do usuário logado — quando informado, busca automaticamente as
  // inscrições dele ao montar, sem exigir que digite no campo de busca.
  autoSearchEmail?: string;
}

const MyRegistrations: React.FC<IMyRegistrations> = ({ autoSearchEmail }) => {
  const { goTo } = useAppNavigation();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<ISavedRegistration[]>([]);

  // Cancelada/reembolsada não interessam para acompanhamento no dia a dia.
  const visibleSaved = saved.filter(
    (item) => item.status === "pending" || item.status === "confirmed"
  );

  useEffect(() => {
    setSaved(getSavedRegistrations());
  }, []);

  useEffect(() => {
    if (autoSearchEmail) {
      runSearch({ email: autoSearchEmail }, { silent: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSearchEmail]);

  const runSearch = async (
    params: { email: string } | { code: string },
    { silent = false } = {}
  ) => {
    const isEmail = "email" in params;

    setLoading(true);
    if (!silent) setError(null);
    try {
      const apiLocal = new ApiLocal();
      const results = await apiLocal.searchRegistrations(params);

      if (!results.length) {
        if (!silent) {
          setError(
            isEmail
              ? "Nenhuma inscrição encontrada para este e-mail."
              : "Nenhuma inscrição encontrada para este código."
          );
        }
        return false;
      }

      const eventCache = new Map<string, { name: string; startDate: string | null }>();

      await Promise.all(
        results.map(async (r) => {
          const eventUuid = r.event?.uuid;
          if (eventUuid && !eventCache.has(eventUuid)) {
            try {
              const event = await apiLocal.getEvent(eventUuid);
              eventCache.set(eventUuid, { name: event.name, startDate: event.startDate });
            } catch {
              // Sem detalhes do evento — a inscrição ainda é salva, só sem nome/data.
            }
          }
          const eventInfo = eventUuid ? eventCache.get(eventUuid) : undefined;

          saveRegistration({
            code: r.code,
            responsibleName: r.responsibleName,
            responsibleEmail: r.responsibleEmail,
            status: r.status,
            eventName: eventInfo?.name,
            eventDate: eventInfo?.startDate ?? null,
          });
        })
      );

      setSaved(getSavedRegistrations());
      return true;
    } catch (err: any) {
      if (!silent) {
        setError(
          err?.response?.data?.message ||
            "Não foi possível buscar a inscrição. Tente novamente."
        );
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Informe o código ou o e-mail da inscrição.");
      return;
    }

    const isEmail = EMAIL_REGEX.test(trimmed);
    const success = await runSearch(isEmail ? { email: trimmed } : { code: trimmed });
    if (success) setQuery("");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Buscar por e-mail ou código"
        />
        <SubmitButton type="submit" disabled={loading} aria-label="Buscar">
          {loading ? <Spinner /> : <FiSearch />}
        </SubmitButton>
      </Form>

      <SectionLabel>Minhas inscrições</SectionLabel>

      {error && <Error>{error}</Error>}

      {visibleSaved.length ? (
        <List>
          {visibleSaved.map((item) => (
            <Item
              key={item.code}
              type="button"
              onClick={() =>
                goTo({
                  pathname: `/inscricoes/acompanhamento/${item.code}`,
                  showLoading: true,
                })
              }
            >
              <ItemInfo>
                {item.eventName && (
                  <ItemEvent>
                    {item.eventName}
                    {item.eventDate && (
                      <span> · {DateUtils.formatDateDefault(item.eventDate)}</span>
                    )}
                  </ItemEvent>
                )}
                <ItemCode>{item.code}</ItemCode>
                <ItemName>{item.responsibleName}</ItemName>
              </ItemInfo>
              <Badge variant={statusBadgeVariant(item.status)}>
                {statusLabel(item.status)}
              </Badge>
            </Item>
          ))}
        </List>
      ) : (
        <Empty>
          <FiInbox />
          <span>
            Busque pelo e-mail ou código usado na inscrição para acompanhá-la
            por aqui.
          </span>
        </Empty>
      )}
    </Container>
  );
};

export default MyRegistrations;
