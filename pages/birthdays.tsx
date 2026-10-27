import type { NextPage } from 'next'
import React from "react";
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import EmptyState from "../components/EmptyState";
import { DateUtils } from '../utils/Date';
import { Api } from '../services/api';
import { IMemberBasic } from '../interfaces/Member';
import StringUtils from '../utils/StringUtils';

interface IBirthdays {
  data: IMemberBasic[]
}

const Birthdays: NextPage<IBirthdays> = ({ data }) => {
  return (
    <Website title={"Aniversariantes"}>
      <>
        <AppHeader title="Aniversariantes" />
        <Container className="pt-6 pb-32">
          <h2 className="mb-4 text-xl font-extrabold tracking-tight">
            {StringUtils.capitalizeFirstLetter(DateUtils.getMonthStr(new Date().toISOString()))}
          </h2>

          {data.length ? (
            <ul className="divide-y divide-line border-y border-line">
              {data.map(member => (
                <li key={member.name} className="flex items-center gap-4 py-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg font-extrabold text-brand-strong tabular-nums">
                    {member.birthday}
                  </span>
                  <span className="min-w-0 font-semibold text-balance">{member.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState />
          )}
        </Container>
      </>
    </Website>
  )
}

export async function getStaticProps() {
  const api = new Api()
  const data = await api.getMonthBirthDateMembers()
  return { props: { data } }
}


export default Birthdays
