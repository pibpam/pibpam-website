import React, { useState } from "react";
import {
  PiCaretDown,
  PiCaretUp,
  PiDotsThreeVertical,
  PiDownloadSimple,
  PiPlus,
  PiPushPinFill,
  PiSpinnerGap,
  PiWarningCircle,
} from "react-icons/pi";
import Badge from "../../../components/Badge";
import { usePptxSlides } from "../../../hooks/usePptxSlides";
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
  Grid,
  Header as SectionHeader,
  OrdinalBadge,
  PinBadge,
  PlanSection,
} from "../../../styles/MemberLiturgy";
import { ILiturgyManifestItem, ILiturgyPlan, ILiturgyPlanAsset, ILiturgySongCatalogEntry } from "../../../interfaces/Liturgy";
import { describeManifestItem, getAssetUrl, isPptxItem } from "../../../utils/liturgyManifest";
import { DateUtils } from "../../../utils/Date";
import ItemActionSheet, { ISheetContext } from "./ItemActionSheet";
import { EmptyPlanNote, GroupEmptyNote, GroupLabel, InsertPoint } from "./styles";

interface ILiturgyRequestsProps {
  todayPlans: ILiturgyPlan[];
  upcomingPlans: ILiturgyPlan[];
  assetsByPlan: Record<string, ILiturgyPlanAsset[]>;
  songsCatalog: ILiturgySongCatalogEntry[];
  /** Sem isso, a listagem fica só leitura — sem "..." por item nem pontos de inserção. */
  canRequest: boolean;
  onRequestCreated: (message: string) => void;
}

interface IPlanSectionProps {
  plan: ILiturgyPlan;
  assets: ILiturgyPlanAsset[];
  songsCatalog: ILiturgySongCatalogEntry[];
  defaultOpen: boolean;
  canRequest: boolean;
  onOpenSheet: (context: ISheetContext) => void;
}

const LiturgyRequestPlanSection: React.FC<IPlanSectionProps> = ({
  plan,
  assets,
  songsCatalog,
  defaultOpen,
  canRequest,
  onOpenSheet,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const visibleItems = plan.manifest.filter((item) => !item.hidden);

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

  const renderInsertPoint = (anchorItemId: string | null, key: string) =>
    canRequest ? (
      <InsertPoint key={key} type="button" onClick={() => onOpenSheet({ mode: "add", plan, anchorItemId })}>
        <PiPlus /> Sugerir item aqui
      </InsertPoint>
    ) : null;

  return (
    <PlanSection>
      <SectionHeader type="button" onClick={() => setOpen((value) => !value)} $open={open}>
        <div>
          <strong>{DateUtils.formatShortDateTimeWithWeekDay(plan.date)}</strong>
          <span>{plan.liturgyType?.nome}</span>
        </div>
        <ChevronIcon $open={open}>
          <PiCaretDown />
        </ChevronIcon>
      </SectionHeader>
      <AccordionBody $open={open}>
        <AccordionBodyInner>
          <Grid>
            {!visibleItems.length && (
              <EmptyPlanNote>Este plano ainda não tem itens.</EmptyPlanNote>
            )}

            {visibleItems.length > 0 && renderInsertPoint(visibleItems[0].id || null, "insert-start")}

            {visibleItems.flatMap((item, index) => {
              const display = describeManifestItem(item, songsCatalog);
              const { previewUrl, previewType } = getPreview(item);
              const downloadUrl = item.arquivo ? getPreviewUrl(item) : undefined;
              const slidesState = pptxSlides.getState(item);
              const slidesExpanded = pptxSlides.isExpanded(item);
              const itemKey = item.id || `${item.type}-${index}`;
              const nextItem = visibleItems[index + 1];

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
                    {canRequest && (
                      <button
                        type="button"
                        title="Sugerir remoção ou comentar"
                        onClick={() => onOpenSheet({ mode: "item", plan, item })}
                      >
                        <PiDotsThreeVertical />
                      </button>
                    )}
                  </CardFooter>
                </Card>
              );

              if (!slidesState || !slidesExpanded) {
                return [itemCard, renderInsertPoint(nextItem?.id || null, `insert-${index}`)];
              }

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
                  renderInsertPoint(nextItem?.id || null, `insert-${index}`),
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

              return [itemCard, ...slideCards, renderInsertPoint(nextItem?.id || null, `insert-${index}`)];
            })}
          </Grid>
        </AccordionBodyInner>
      </AccordionBody>
    </PlanSection>
  );
};

const LiturgyRequests: React.FC<ILiturgyRequestsProps> = ({
  todayPlans,
  upcomingPlans,
  assetsByPlan,
  songsCatalog,
  canRequest,
  onRequestCreated,
}) => {
  const [sheetContext, setSheetContext] = useState<ISheetContext | null>(null);

  return (
    <>
      <GroupLabel>Hoje</GroupLabel>
      {todayPlans.length ? (
        todayPlans.map((plan, index) => (
          <LiturgyRequestPlanSection
            key={plan.uuid}
            plan={plan}
            assets={assetsByPlan[plan.uuid] || []}
            songsCatalog={songsCatalog}
            defaultOpen={index === 0}
            canRequest={canRequest}
            onOpenSheet={setSheetContext}
          />
        ))
      ) : (
        <GroupEmptyNote>Nenhum culto hoje.</GroupEmptyNote>
      )}

      {upcomingPlans.length > 0 && (
        <>
          <GroupLabel>Próximos cultos</GroupLabel>
          {upcomingPlans.map((plan) => (
            <LiturgyRequestPlanSection
              key={plan.uuid}
              plan={plan}
              assets={assetsByPlan[plan.uuid] || []}
              songsCatalog={songsCatalog}
              defaultOpen={false}
              canRequest={canRequest}
              onOpenSheet={setSheetContext}
            />
          ))}
        </>
      )}

      {canRequest && (
        <ItemActionSheet
          context={sheetContext}
          songsCatalog={songsCatalog}
          onClose={() => setSheetContext(null)}
          onSuccess={(message) => {
            setSheetContext(null);
            onRequestCreated(message);
          }}
        />
      )}
    </>
  );
};

export default LiturgyRequests;
