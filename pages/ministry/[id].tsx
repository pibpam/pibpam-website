import type { NextPage } from 'next'
import Image from 'next/image'
import React from "react";
import { Container } from '@/components/ui/Container'
import { shortName } from '@/lib/format'
import Website from '../../layout/container/Website'
import AppHeader from "../../components/AppHeader";
import Reveal from "../../components/Reveal";
import SectionTitle from "../../components/SectionTitle";
import { Api } from "../../services/api";
import { ITeam } from "../../interfaces/Team";

interface IParams {
  params: {
    id: string
  }
}

interface IMinistry {
  data: ITeam
}

const Ministry: NextPage<IMinistry> = ({ data }) => {
  return (
    <Website title={`${data.name}`} hasTabNavigator={false}>
      <>
        <AppHeader title="Ministério" />
        <Container className="pt-5 pb-10">
          {data.image && (
            <Reveal index={0} className="relative size-28 overflow-hidden rounded-md bg-pine">
              <Image src={data.image} alt={`Logo do ${data.name}`} fill sizes="112px" className="object-cover" />
            </Reveal>
          )}
          <Reveal index={1}>
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-balance">{data.name}</h1>
            {data.shortDescription && (
              <p className="mt-1 text-lg font-medium text-ink">{data.shortDescription}</p>
            )}
            {data.description && (
              <p className="mt-3 leading-relaxed whitespace-pre-line text-ink-muted">{data.description}</p>
            )}
          </Reveal>
        </Container>

        {!!data.teamMember.length && (
          <div className="border-y border-line bg-paper py-10">
            <Container className="pb-6">
              <h2 className="text-xl font-extrabold tracking-tight">Equipe</h2>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                {data.teamMember.map((item, i) => (
                  <Reveal as="li" index={i + 2} key={item.uuid} className="flex flex-col items-center text-center">
                    <span className="relative size-24 overflow-hidden rounded-full bg-brand-soft">
                      <Image src={item.member?.image || "/user.jpg"} alt="" fill sizes="96px" className="object-cover" />
                    </span>
                    <span className="mt-3 font-semibold text-balance">{item.member && shortName(item.member.name)}</span>
                    {item.role && <span className="text-sm text-ink-muted">{item.role}</span>}
                  </Reveal>
                ))}
              </ul>
            </Container>
          </div>
        )}
      </>
    </Website>
  )
}

export async function getServerSideProps({ params }: IParams) {
  const api = new Api()
  const data = await api.getMinistry(params.id)
  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { data } }
}

export default Ministry
