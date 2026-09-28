import React, { useState } from "react";
import { PiCaretDown, PiDotsThreeVertical, PiPlus } from "react-icons/pi";
import {
  AccordionBody,
  AccordionBodyInner,
  ChevronIcon,
  Header as SectionHeader,
  PlanSection,
} from "../../../styles/MemberLiturgy";
import { ILiturgyManifestItem, ILiturgyPlan } from "../../../interfaces/Liturgy";
import { describeManifestItem, TYPE_ICONS } from "../../../utils/liturgyManifest";
import { DateUtils } from "../../../utils/Date";
import ItemActionSheet, { ISheetContext } from "./ItemActionSheet";
import {
  EmptyPlanNote,
  GroupEmptyNote,
  GroupLabel,
  InsertPoint,
  ItemActionButton,
  ItemIcon,
  ItemInfo,
  ItemMeta,
  ItemName,
  ItemOrdinal,
  ItemRow,
  ItemsList,
} from "./styles";

interface ILiturgyRequestsProps {
  todayPlans: ILiturgyPlan[];
  upcomingPlans: ILiturgyPlan[];
  onRequestCreated: (message: string) => void;
}

interface IPlanSectionProps {
  plan: ILiturgyPlan;
  defaultOpen: boolean;
  onOpenSheet: (context: ISheetContext) => void;
}

const LiturgyRequestPlanSection: React.FC<IPlanSectionProps> = ({ plan, defaultOpen, onOpenSheet }) => {
  const [open, setOpen] = useState(defaultOpen);
  const visibleItems = plan.manifest.filter((item) => !item.hidden);

  const renderInsertPoint = (anchorItemId: string | null, key: string) => (
    <InsertPoint
      key={key}
      type="button"
      onClick={() => onOpenSheet({ mode: "add", plan, anchorItemId })}
    >
      <PiPlus /> Sugerir item aqui
    </InsertPoint>
  );

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
          <ItemsList>
            {!visibleItems.length && (
              <EmptyPlanNote>Este plano ainda não tem itens.</EmptyPlanNote>
            )}

            {visibleItems.length > 0 && renderInsertPoint(visibleItems[0].id || null, "insert-start")}

            {visibleItems.map((item: ILiturgyManifestItem, index) => {
              const display = describeManifestItem(item);
              const nextItem = visibleItems[index + 1];

              return (
                <React.Fragment key={item.id || `${item.type}-${index}`}>
                  <ItemRow>
                    <ItemOrdinal>{index + 1}</ItemOrdinal>
                    <ItemIcon>{TYPE_ICONS[item.type]}</ItemIcon>
                    <ItemInfo>
                      <ItemName>{display.name}</ItemName>
                      {display.meta && <ItemMeta>{display.meta}</ItemMeta>}
                    </ItemInfo>
                    <ItemActionButton
                      type="button"
                      title="Sugerir remoção ou comentar"
                      onClick={() => onOpenSheet({ mode: "item", plan, item })}
                    >
                      <PiDotsThreeVertical />
                    </ItemActionButton>
                  </ItemRow>

                  {renderInsertPoint(nextItem?.id || null, `insert-${index}`)}
                </React.Fragment>
              );
            })}
          </ItemsList>
        </AccordionBodyInner>
      </AccordionBody>
    </PlanSection>
  );
};

const LiturgyRequests: React.FC<ILiturgyRequestsProps> = ({ todayPlans, upcomingPlans, onRequestCreated }) => {
  const [sheetContext, setSheetContext] = useState<ISheetContext | null>(null);

  return (
    <>
      <GroupLabel>Hoje</GroupLabel>
      {todayPlans.length ? (
        todayPlans.map((plan, index) => (
          <LiturgyRequestPlanSection
            key={plan.uuid}
            plan={plan}
            defaultOpen={index === 0}
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
              defaultOpen={false}
              onOpenSheet={setSheetContext}
            />
          ))}
        </>
      )}

      <ItemActionSheet
        context={sheetContext}
        onClose={() => setSheetContext(null)}
        onSuccess={(message) => {
          setSheetContext(null);
          onRequestCreated(message);
        }}
      />
    </>
  );
};

export default LiturgyRequests;
