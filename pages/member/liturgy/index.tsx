import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import {
  PiCaretDown,
  PiCaretUp,
  PiDownloadSimple,
  PiPushPinFill,
  PiSpinnerGap,
  PiWarningCircle,
} from "react-icons/pi";
import Badge from "../../../components/Badge";
import EmptyState from "../../../components/EmptyState";
import HeaderMember from "../../../components/HeaderMember";
import Spinner from "../../../components/Spinner";
import { UserContext } from "../../../contexts/user";
import { usePptxSlides } from "../../../hooks/usePptxSlides";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { ILiturgyManifestItem, ILiturgyPlan, ILiturgyPlanAsset, ILiturgySongCatalogEntry } from "../../../interfaces/Liturgy";
import Website from "../../../layout/container/Website";
import { ApiLocal } from "../../../services/apiLocal";
import {
  AccordionBody,
  AccordionBodyInner,
  Card,
  CardBadges,
  CardBody,
  CardFooter,
  CardMedia,
  CardMediaFill,
  CardMediaFillClamp,
  CardMeta,
  CardTitle,
  ChevronIcon,
  ColorSwatch,
  Container,
  Grid,
  Header,
  Loading,
  OrdinalBadge,
  PinBadge,
  PlanSection,
} from "../../../styles/MemberLiturgy";
import { DateUtils } from "../../../utils/Date";
import { describeManifestItem, getAssetUrl, isPptxItem } from "../../../utils/liturgyManifest";

interface ILiturgyPlanSectionProps {
  plan: ILiturgyPlan;
  assets: ILiturgyPlanAsset[];
  songsCatalog: ILiturgySongCatalogEntry[];
  defaultOpen: boolean;
}

const LiturgyPlanSection: React.FC<ILiturgyPlanSectionProps> = ({ plan, assets, songsCatalog, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);

  const getPreviewUrl = (item: ILiturgyManifestItem) => {
    const index = plan.manifest.indexOf(item);
    return getAssetUrl(item, index, assets);
  };

  const pptxSlides = usePptxSlides(plan.manifest, getPreviewUrl);

  const getPreview = (item: ILiturgyManifestItem): { previewUrl?: string; previewType?: "image" | "video" } => {
    if (isPptxItem(item)) {
      const firstSlide = pptxSlides.getState(item)?.slides[0];
      return firstSlide ? { previewUrl: firstSlide.url, previewType: "image" } : {};
    }
    if (item.type === "image" || item.type === "video") {
      return { previewUrl: getPreviewUrl(item), previewType: item.type };
    }
    return {};
  };

  return (
    <PlanSection>
      <Header type="button" onClick={() => setOpen((value) => !value)} $open={open}>
        <div>
          <strong>{DateUtils.formatShortDateTimeWithWeekDay(plan.date)}</strong>
          <span>{plan.liturgyType?.nome}</span>
        </div>
        <ChevronIcon $open={open}>
          <PiCaretDown />
        </ChevronIcon>
      </Header>
      <AccordionBody $open={open}>
        <AccordionBodyInner>
        <Grid>
          {plan.manifest
            .filter((item) => !item.hidden)
            .flatMap((item, index) => {
              const display = describeManifestItem(item, songsCatalog);
              const { previewUrl, previewType } = getPreview(item);
              const downloadUrl = item.arquivo ? getPreviewUrl(item) : undefined;
              const slidesState = pptxSlides.getState(item);
              const slidesExpanded = pptxSlides.isExpanded(item);
              const itemKey = item.id || `${item.type}-${index}`;

              const itemCard = (
                <Card key={itemKey} $hidden={item.hidden}>
                  <CardMedia>
                    <OrdinalBadge>{index + 1}</OrdinalBadge>
                    {display.pinned && (
                      <PinBadge title="Item fixo do tipo de culto">
                        <PiPushPinFill />
                      </PinBadge>
                    )}
                    {previewType === "image" && previewUrl ? (
                      <img src={previewUrl} alt={display.name} />
                    ) : previewType === "video" && previewUrl ? (
                      <video src={previewUrl} controls muted preload="metadata" />
                    ) : item.type === "title" ? (
                      <CardMediaFill $color={display.color}>{display.name}</CardMediaFill>
                    ) : item.type === "plain_text" ? (
                      <CardMediaFill>
                        <CardMediaFillClamp>{item.text || display.name}</CardMediaFillClamp>
                      </CardMediaFill>
                    ) : (
                      display.icon
                    )}
                  </CardMedia>

                  {item.type !== "title" && (
                    <CardBody>
                      <CardTitle>
                        {display.color && (
                          <ColorSwatch $color={display.color} title={`Cor de fundo: #${display.color}`} />
                        )}
                        <span>{display.name}</span>
                      </CardTitle>
                      {display.meta && <CardMeta>{display.meta}</CardMeta>}
                      <CardBadges>
                        {display.pending && <Badge variant="warning">Pendente</Badge>}
                        {slidesState && (
                          <Badge variant="success">
                            {slidesState.slides.length === 1 ? "1 slide" : `${slidesState.slides.length} slides`}
                          </Badge>
                        )}
                      </CardBadges>
                    </CardBody>
                  )}

                  <CardFooter>
                    {slidesState && (
                      <button
                        type="button"
                        title={slidesExpanded ? "Recolher slides" : "Ver slides"}
                        onClick={() => pptxSlides.toggleExpanded(item)}
                      >
                        {slidesExpanded ? <PiCaretUp /> : <PiCaretDown />}
                      </button>
                    )}
                    {downloadUrl && (
                      <a
                        href={downloadUrl}
                        download={item.arquivo}
                        target="_blank"
                        rel="noreferrer"
                        title="Baixar arquivo"
                      >
                        <PiDownloadSimple />
                      </a>
                    )}
                  </CardFooter>
                </Card>
              );

              if (!slidesState || !slidesExpanded) return [itemCard];

              if (slidesState.status !== "ready") {
                return [
                  itemCard,
                  <Card key={`${itemKey}-slides-status`}>
                    <CardMedia>
                      {slidesState.status === "loading" ? <PiSpinnerGap /> : <PiWarningCircle />}
                    </CardMedia>
                    <CardBody>
                      <CardMeta>
                        {slidesState.status === "loading"
                          ? "Lendo os slides…"
                          : slidesState.error || "Não foi possível ler os slides"}
                      </CardMeta>
                    </CardBody>
                  </Card>,
                ];
              }

              const slideCards = slidesState.slides.map((slide) => (
                <Card key={`${itemKey}-slide-${slide.slide}`}>
                  <CardMedia>
                    <img src={slide.url} alt={`${display.name} — slide ${slide.slide}`} />
                  </CardMedia>
                  <CardBody>
                    <CardMeta>Slide {slide.slide}</CardMeta>
                  </CardBody>
                  <CardFooter>
                    <a
                      href={slide.url}
                      download={`slide-${slide.slide}.${slide.extension}`}
                      title={`Baixar slide ${slide.slide}`}
                    >
                      <PiDownloadSimple />
                    </a>
                  </CardFooter>
                </Card>
              ));

              return [itemCard, ...slideCards];
            })}
        </Grid>
        </AccordionBodyInner>
      </AccordionBody>
    </PlanSection>
  );
};

const MemberLiturgyPage: NextPage = () => {
  const { user, token, isLoadingUser } = useContext(UserContext);
  const { goTo } = useAppNavigation();
  const isAdmin = user?.type === "admin" || user?.type === "master";

  const [plans, setPlans] = useState<ILiturgyPlan[]>([]);
  const [assetsByPlan, setAssetsByPlan] = useState<Record<string, ILiturgyPlanAsset[]>>({});
  const [songsCatalog, setSongsCatalog] = useState<ILiturgySongCatalogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isLoadingUser && !isAdmin) {
      goTo({ pathname: "/member", resetHistory: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser, isAdmin]);

  useEffect(() => {
    if (!token || !isAdmin) return;

    const fetchPlans = async () => {
      setLoading(true);
      setError(false);
      try {
        const api = new ApiLocal();
        const data = await api.getLiturgyPlansToday(token);
        setPlans(data);

        api
          .getLiturgySongsCatalog(token)
          .then(setSongsCatalog)
          .catch(() => setSongsCatalog([]));

        const assetsEntries = await Promise.all(
          data.map(async (plan) => {
            try {
              const planAssets = await api.getLiturgyPlanAssets(token, plan.uuid);
              return [plan.uuid, planAssets] as const;
            } catch (err) {
              return [plan.uuid, []] as const;
            }
          }),
        );
        setAssetsByPlan(Object.fromEntries(assetsEntries));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [token, isAdmin]);

  if (isLoadingUser || !isAdmin) {
    return (
      <Loading>
        <Spinner />
      </Loading>
    );
  }

  return (
    <Website hasTabNavigator={false} title="Área de membros" openMenu={false} toggleMenu={() => {}}>
      <>
        <HeaderMember
          goBack={() => goTo({ pathname: "/member", resetHistory: true })}
          title="Plano litúrgico"
        />
        <Container>
          {loading && (
            <Loading>
              <Spinner />
            </Loading>
          )}

          {!loading && error && (
            <EmptyState description="Não foi possível carregar o plano de hoje. Tente novamente mais tarde." />
          )}

          {!loading && !error && !plans.length && (
            <EmptyState description="Nenhum plano cadastrado para hoje." />
          )}

          {!loading &&
            !error &&
            plans.map((plan) => (
              <LiturgyPlanSection
                key={plan.uuid}
                plan={plan}
                assets={assetsByPlan[plan.uuid] || []}
                songsCatalog={songsCatalog}
                defaultOpen={plans.length === 1}
              />
            ))}
        </Container>
      </>
    </Website>
  );
};

export default MemberLiturgyPage;
