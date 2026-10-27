import type { NextPage } from 'next'
import React, { useEffect, useState } from "react";
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import BirthdayRow from "../components/BirthdayRow";
import SectionTitle from "../components/SectionTitle";
import EmptyState from "../components/EmptyState";
import { DateUtils } from '../utils/Date';
import { Api } from '../services/api';
import { IMemberBasic } from '../interfaces/Member';
import StringUtils from '../utils/StringUtils';

interface IBirthdays {
  data: IMemberBasic[]
}

const Birthdays: NextPage<IBirthdays> = ({ data }) => {
  // A página é gerada estaticamente: só o cliente sabe qual é o dia de hoje.
  const [today, setToday] = useState<number | null>(null)
  useEffect(() => {
    setToday(new Date().getDate())
  }, [])

  const hasToday = today !== null && data.some(member => member.birthday === today)

  // Leva o aniversariante do dia para o centro da tela, depois da entrada dos itens.
  useEffect(() => {
    if (!hasToday) return
    const timer = setTimeout(() => {
      document.querySelector('[data-birthday-today]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 700)
    return () => clearTimeout(timer)
  }, [hasToday])

  return (
    <Website title={"Aniversariantes"}>
      <>
        <AppHeader title="Aniversariantes" />
        <Container className="pt-6 pb-32">
          <SectionTitle>{StringUtils.capitalizeFirstLetter(DateUtils.getMonthStr(new Date().toISOString()))}</SectionTitle>

          {data.length ? (
            <ul className="divide-y divide-line border-y border-line">
              {data.map((member, i) => (
                <BirthdayRow
                  key={member.name}
                  member={member}
                  index={i}
                  today={today !== null && member.birthday === today}
                />
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
