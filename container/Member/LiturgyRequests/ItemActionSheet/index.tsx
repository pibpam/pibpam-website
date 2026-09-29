import React, { useEffect, useState } from "react";
import { PiChatCircleText, PiEyeSlash } from "react-icons/pi";
import Modal from "../../../../components/Modal";
import { ILiturgyManifestItem, ILiturgyPlan, ILiturgySongCatalogEntry } from "../../../../interfaces/Liturgy";
import { describeManifestItem, TYPE_ICONS } from "../../../../utils/liturgyManifest";
import AddItemForm from "../AddItemForm";
import RemoveCommentForm from "../RemoveCommentForm";
import {
  ActionButton,
  ActionList,
  CancelButton,
  Container,
  Subtitle,
  TargetSummary,
  Title,
} from "./styles";

export interface ISheetContext {
  mode: "item" | "add";
  plan: ILiturgyPlan;
  item?: ILiturgyManifestItem;
  anchorItemId?: string | null;
}

type IInternalMode = "menu" | "remove" | "comment" | "add";

interface IItemActionSheetProps {
  context: ISheetContext | null;
  songsCatalog: ILiturgySongCatalogEntry[];
  onClose: () => void;
  onSuccess: (message: string) => void;
}

const ItemActionSheet: React.FC<IItemActionSheetProps> = ({ context, songsCatalog, onClose, onSuccess }) => {
  const [internalMode, setInternalMode] = useState<IInternalMode>("menu");

  useEffect(() => {
    if (context) {
      setInternalMode(context.mode === "add" ? "add" : "menu");
    }
  }, [context]);

  if (!context) {
    return (
      <Modal isOpen={false} onClose={onClose}>
        <Container />
      </Modal>
    );
  }

  const { plan, item } = context;
  const display = item ? describeManifestItem(item, songsCatalog) : undefined;

  return (
    <Modal isOpen={!!context} onClose={onClose}>
      <Container>
        {internalMode === "menu" && item && (
          <>
            <TargetSummary>
              <span>{TYPE_ICONS[item.type]}</span>
              <div>
                <Title>{display?.name}</Title>
                {display?.meta && <Subtitle>{display.meta}</Subtitle>}
              </div>
            </TargetSummary>
            <Subtitle>O que você gostaria de sugerir para este item?</Subtitle>
            <ActionList>
              <ActionButton type="button" onClick={() => setInternalMode("remove")}>
                <PiEyeSlash /> Sugerir remoção
              </ActionButton>
              <ActionButton type="button" onClick={() => setInternalMode("comment")}>
                <PiChatCircleText /> Deixar comentário
              </ActionButton>
            </ActionList>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
          </>
        )}

        {(internalMode === "remove" || internalMode === "comment") && item?.id && (
          <RemoveCommentForm
            type={internalMode}
            planUuid={plan.uuid}
            targetItemId={item.id}
            itemLabel={display?.name || item.type}
            onCancel={() => setInternalMode("menu")}
            onSuccess={onSuccess}
          />
        )}

        {internalMode === "add" && (
          <AddItemForm
            planUuid={plan.uuid}
            anchorItemId={context.anchorItemId ?? null}
            onCancel={onClose}
            onSuccess={onSuccess}
          />
        )}
      </Container>
    </Modal>
  );
};

export default ItemActionSheet;
