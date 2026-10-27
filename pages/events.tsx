import type { NextPage } from 'next'
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import AppContentTabs from "../components/AppContentTabs";
import AppVideoCard from "../components/AppVideoCard";
import AppButton from "../components/AppButton";
import LiveBanner from "../components/LiveBanner";
import EmptyState from "../components/EmptyState";
import { Api } from "../services/api";
import { ApiLocal } from "../services/apiLocal";
import { IContent, IGetAllContentsResponse } from "../interfaces/Contens";
import { IBroadcast } from "../interfaces/Broadcast";
import { IPaginationData } from "../interfaces/Pagination";

interface IEventsPage {
  data: IGetAllContentsResponse
  lives: IBroadcast[]
}

const Events: NextPage<IEventsPage> = ({ data, lives }) => {
  const [paginator, setPaginator] = useState<IPaginationData>(data.pagination)
  const [contents, setContents] = useState<IContent[]>([] as IContent[])
  const [loading, setLoading] = useState(false)

  const handleGetAll = async () => {
    setLoading(true)
    const apiLocal = new ApiLocal()
    const response = await apiLocal.getContents(paginator.page + 1, 20, undefined, 'transmission')
    setPaginator(response.pagination)
    setContents(state => ([...state, ...response.data]))
    setLoading(false)
  }

  const items = [...data.data, ...contents]

  return (
    <Website title={"Cultos e Eventos"}>
      <>
        <AppHeader title="Cultos" />
        <Container className="pb-32">
          <AppContentTabs current="/events" />

          {!!lives && !!lives.length && (
            <div className="mt-6">
              <LiveBanner title={lives[0].title} href={"/broadcast/" + lives[0].uuid} />
            </div>
          )}

          {items.length ? (
            <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map(item => (
                <li key={item.uuid}>
                  <AppVideoCard content={item} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8">
              <EmptyState />
            </div>
          )}

          {paginator.page < paginator.totalPage && (
            <div className="mt-10 flex justify-center">
              <AppButton variant="outline" disabled={loading} onClick={handleGetAll}
                icon={loading ? <ImSpinner2 className="animate-spin" /> : <FiPlus />}>
                {loading ? "Carregando" : "Ver mais"}
              </AppButton>
            </div>
          )}
        </Container>
      </>
    </Website>
  )
}

export async function getStaticProps() {
  const api = new Api()
  const data = await api.getContents(1, "transmission", 20)
  const lives = await api.getLives()

  return { props: { data, lives } }
}


export default Events
