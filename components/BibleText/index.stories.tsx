import type { Meta, StoryObj } from '@storybook/react'
import BibleText from './index'

const PSALM_23 =
  '<div><div class="cl yv-h">Salmo 23</div><div class="d">Salmo de Davi.</div>' +
  '<div class="q1"><span class="yv-v" v="1"></span><span class="yv-vlbl">1</span>O <span class="nd">Senhor</span> é o meu pastor;</div>' +
  '<div class="q2">de nada terei falta.</div>' +
  '<div class="q1"><span class="yv-v" v="2"></span><span class="yv-vlbl">2</span>Ele me faz repousar em pastagens verdejantes</div>' +
  '<div class="q2">e me conduz a águas tranquilas;</div>' +
  '<div class="q2"><span class="yv-v" v="3"></span><span class="yv-vlbl">3</span>restaura‑me o vigor.</div></div>'

const JOHN_3 =
  '<div><div class="s1 yv-h">Jesus ensina Nicodemos</div>' +
  '<div class="p"><span class="yv-v" v="1"></span><span class="yv-vlbl">1</span>Havia um fariseu chamado Nicodemos, autoridade entre os judeus. ' +
  '<span class="yv-v" v="2"></span><span class="yv-vlbl">2</span>Ele veio a Jesus, à noite, e disse:</div>' +
  '<div class="p">― Rabi, sabemos que ensinas da parte de Deus, pois ninguém pode realizar os sinais milagrosos que fazes se Deus não estiver com ele.</div></div>'

const COPYRIGHT =
  'Bíblia Sagrada, Nova Versão Internacional®, NVI®\n© 1993, 2000, 2011, 2023 por Biblica, Inc.\nUsado com permissão. Todos os direitos reservados mundialmente.'

const meta: Meta<typeof BibleText> = {
  title: 'Bible/BibleText',
  component: BibleText,
  args: { html: JOHN_3, copyright: COPYRIGHT },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof BibleText>

export const Prose: Story = {}

export const Poetry: Story = { args: { html: PSALM_23 } }

// Tema escuro: o mesmo atributo que o Website aplica nas telas da Bíblia.
export const Dark: Story = {
  args: { html: PSALM_23 },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: '#12302F', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}
