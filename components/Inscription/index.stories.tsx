import type { Meta, StoryObj } from '@storybook/react'
import InscriptionFlow from './index'
import { IEventDetail } from '../../interfaces/Event'
import { AppContext } from '../../contexts/app'

const event: IEventDetail = {
  uuid: '1',
  name: 'Acampamento de Jovens 2026',
  description: 'Um final de semana de comunhão e adoração.',
  descriptionHtml: null,
  image: '/carrossel-min.png',
  location: 'Sítio Recanto Feliz',
  startDate: '2026-08-15T09:00:00',
  endDate: '2026-08-17T18:00:00',
  purchaseDeadline: null,
  maxParticipants: 100,
  forMinors: true,
  status: 'published',
  created_at: '2026-07-01T00:00:00',
  updated_at: '2026-07-01T00:00:00',
  activeBatch: {
    uuid: '1',
    name: '1º Lote',
    order: 1,
    price: '210.00',
    startDate: null,
    endDate: null,
    maxQuantity: null,
  },
  takenSpots: 40,
  availableSpots: 60,
  soldOut: false,
  batches: [
    { uuid: '1', name: '1º Lote', order: 1, price: '210.00', startDate: null, endDate: null, maxQuantity: null },
  ],
  customFields: [
    { uuid: '1', label: 'Alergia alimentar', type: 'text', required: false, options: null, order: 1 },
  ],
  paymentMethods: [
    {
      uuid: '1',
      type: 'PIX',
      label: 'PIX',
      feeType: 'none',
      feeValue: 0,
      maxInstallments: 1,
      pixEmvConfig: { key: 'secretariapibpam@gmail.com', merchantName: 'PIBPAM', merchantCity: 'PARA DE MINAS' },
      pixManualKey: null,
      cashResponsibleName: null,
      cashResponsiblePhone: null,
    },
    {
      uuid: '2',
      type: 'CASH',
      label: 'Dinheiro',
      feeType: 'none',
      feeValue: 0,
      maxInstallments: 1,
      pixEmvConfig: null,
      pixManualKey: null,
      cashResponsibleName: 'Maria Oliveira',
      cashResponsiblePhone: '37999999999',
    },
  ],
  products: [],
  addonGroups: [
    {
      uuid: '1',
      title: 'Camiseta',
      description: 'Escolha o tamanho',
      minSelection: 0,
      maxSelection: 1,
      addons: [
        { uuid: '1', name: 'P', description: null, image: null, price: '30.00', maxQuantity: null, active: true, reserved: 0, available: null, soldOut: false },
        { uuid: '2', name: 'M', description: null, image: null, price: '30.00', maxQuantity: null, active: true, reserved: 0, available: null, soldOut: false },
      ],
    },
  ],
}

const meta: Meta<typeof InscriptionFlow> = {
  title: 'Layout/Inscription',
  component: InscriptionFlow,
  parameters: { layout: 'fullscreen' },
  args: { event },
  decorators: [
    (Story) => (
      <AppContext.Provider value={{ isApp: false, isIos: false, isAndroid: false, isMobile: false }}>
        <Story />
      </AppContext.Provider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof InscriptionFlow>

export const Default: Story = {}

export const SoldOut: Story = {
  args: {
    event: { ...event, soldOut: true },
  },
}
