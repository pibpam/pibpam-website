import type { NextPage } from 'next'
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import Reveal from "../components/Reveal";
import AppContentTabs from "../components/AppContentTabs";
import AppSeriesCard from "../components/AppSeriesCard";
import AppButton from "../components/AppButton";
import EmptyState from "../components/EmptyState";
import { Api } from "../services/api";
import { ApiLocal } from "../services/apiLocal";
import { IPaginationData } from "../interfaces/Pagination";
import { IGetAllSeries, ISeries } from "../interfaces/Series";

interface ISeriesPage {
  data: IGetAllSeries
}

const Series: NextPage<ISeriesPage> = ({ data }) => {
  const [paginator, setPaginator] = useState<IPaginationData>(data.pagination)
  const [contents, setContents] = useState<ISeries[]>([] as ISeries[])
  const [loading, setLoading] = useState(false)

  const handleGetAll = async () => {
    setLoading(true)
    const apiLocal = new ApiLocal()
    const response = await apiLocal.getSeries(paginator.page + 1, 20)
    setPaginator(response.pagination)
    setContents(state => ([...state, ...response.data]))
    setLoading(false)
  }

  const items = [...data.data, ...contents]

  return (
    <Website hasTabNavigator title={"Séries"}>
      <>
        <AppHeader title="Séries" />
        <Container className="pb-32">
          <Reveal><AppContentTabs current="/series" /></Reveal>

          {items.length ? (
            <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal as="li" index={i} key={item.uuid}>
                  <AppSeriesCard series={item} />
                </Reveal>
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
  const data = await api.getSeries(1, 20)

  return { props: { data } }
}


export default Series
