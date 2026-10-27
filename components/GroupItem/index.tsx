import React from 'react';
import { FiCalendar, FiChevronRight, FiClock } from 'react-icons/fi';
import { IGroup } from '../../interfaces/Group';

const GroupItem: React.FC<{ group: IGroup, onClick: () => void }> = ({ group, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col gap-2 rounded-lg border border-line bg-paper p-5 shadow-sm text-left transition-colors active:bg-brand-soft"
    >
      <span className="flex items-start justify-between gap-3">
        <span className="text-xl font-extrabold tracking-tight text-balance">{group.title}</span>
        <FiChevronRight aria-hidden className="mt-1 shrink-0 text-xl text-brand-strong" />
      </span>
      {group.shortDescription && <span className="text-ink-muted">{group.shortDescription}</span>}
      <span className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-semibold text-brand-strong">
        {group.dayDescription && (
          <span className="inline-flex items-center gap-1.5"><FiCalendar aria-hidden />{group.dayDescription}</span>
        )}
        {group.timeDescription && (
          <span className="inline-flex items-center gap-1.5"><FiClock aria-hidden />{group.timeDescription}</span>
        )}
      </span>
    </button>
  )
}

export default GroupItem;
