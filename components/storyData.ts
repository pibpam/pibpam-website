// Dados fictícios para as stories dos componentes compartilhados com o site.
import { IContent } from '../interfaces/Contens'
import { ISeries } from '../interfaces/Series'
import { IScheduleDate } from '../interfaces/Schedule'

export const author = {
  uuid: 'a1',
  name: 'Pr. Charlin Rosa',
  active: true,
  created_at: '2026-01-01T00:00:00.000Z',
}

export const contents: IContent[] = [
  {
    uuid: 'c1',
    name: 'Introdução ao Evangelho de Marcos',
    description: 'Marcos 1.1-8',
    contentDate: '2026-10-25T22:00:00.000Z',
    image: '/carrossel-min.png',
    content: 'dQw4w9WgXcQ',
    serviceContent: 'YOUTUBE',
    active: true,
    created_at: '2026-10-25T22:00:00.000Z',
    isLive: false,
    author,
  },
  {
    uuid: 'c2',
    name: 'O batismo de Jesus',
    description: 'Marcos 1.9-13',
    contentDate: '2026-10-18T22:00:00.000Z',
    image: '/igreja.jpg',
    content: 'dQw4w9WgXcQ',
    serviceContent: 'YOUTUBE',
    active: true,
    created_at: '2026-10-18T22:00:00.000Z',
    isLive: false,
    author,
  },
]

export const series: ISeries[] = [
  {
    uuid: 's1',
    title: 'Evangelho de Marcos',
    image: '/igreja.jpg',
    active: true,
    created_at: '2026-09-01T00:00:00.000Z',
    series_contents: contents.map((content) => ({
      uuid: content.uuid,
      created_at: content.created_at,
      content,
    })),
  },
  {
    uuid: 's2',
    title: 'Salmos de peregrinação',
    image: '/carrossel-min.png',
    active: true,
    created_at: '2026-06-01T00:00:00.000Z',
    series_contents: [],
  },
]

export const scheduleDates: IScheduleDate[] = [
  {
    uuid: 'd1',
    scheduleDate: '2026-10-28T22:30:00.000Z',
    created_at: '2026-10-01T00:00:00.000Z',
    schedule: {
      uuid: 'e1',
      title: 'Culto de Exposição Bíblica',
      shortDescription: 'Estudo em Marcos',
      highlight: false,
      created_at: '2026-10-01T00:00:00.000Z',
    },
  },
  {
    uuid: 'd2',
    scheduleDate: '2026-11-01T12:00:00.000Z',
    created_at: '2026-10-01T00:00:00.000Z',
    schedule: {
      uuid: 'e2',
      title: 'EBD',
      shortDescription: 'Escola Bíblica Dominical',
      highlight: false,
      created_at: '2026-10-01T00:00:00.000Z',
    },
  },
  {
    uuid: 'd3',
    scheduleDate: '2026-11-01T13:00:00.000Z',
    created_at: '2026-10-01T00:00:00.000Z',
    schedule: {
      uuid: 'e3',
      title: 'Ceia do Senhor',
      shortDescription: 'Celebração da Ceia do Senhor',
      highlight: true,
      created_at: '2026-10-01T00:00:00.000Z',
    },
  },
]
