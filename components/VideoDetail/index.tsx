import React from 'react'
import Image from 'next/image'
import { FiCalendar } from 'react-icons/fi'
import { LiveBadge } from '@/components/ui/LiveBadge'
import { formatDate } from '@/lib/format'
import YTPlayer from '../YTPlayer'
import AppShareButton from '../AppShareButton'

interface IVideoDetail {
  title: string
  /** id do vídeo no YouTube */
  videoId: string
  thumb?: string
  description?: string
  author?: { name: string; image?: string } | null
  /** ISO; mostrado como data longa quando não está ao vivo. */
  date?: string
  live?: boolean
  shareUrl: string
  shareMessage: string
}

/** Corpo das telas de culto e de transmissão: player, autoria, data/ao vivo, texto e compartilhar. */
const VideoDetail: React.FC<IVideoDetail> = ({
  title,
  videoId,
  thumb,
  description,
  author,
  date,
  live = false,
  shareUrl,
  shareMessage,
}) => (
  <article className="flex flex-col gap-5">
    <div className="overflow-hidden rounded-md bg-pine">
      <YTPlayer videoId={videoId} thumb={thumb} />
    </div>

    <div className="flex flex-wrap items-center justify-between gap-3">
      {author ? (
        <div className="flex min-w-0 items-center gap-3">
          {author.image && (
            <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-brand-soft">
              <Image src={author.image} alt="" fill sizes="36px" className="object-cover" />
            </span>
          )}
          <span className="truncate font-semibold">{author.name}</span>
        </div>
      ) : (
        <span />
      )}
      {live ? (
        <LiveBadge />
      ) : (
        date && (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-strong">
            <FiCalendar aria-hidden />
            {formatDate(date)}
          </span>
        )
      )}
    </div>

    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-balance">{title}</h1>
      {description && <p className="mt-2 text-lg leading-relaxed whitespace-pre-line text-ink-muted">{description}</p>}
    </div>

    <div>
      <AppShareButton url={shareUrl} message={shareMessage} />
    </div>
  </article>
)

export default VideoDetail
