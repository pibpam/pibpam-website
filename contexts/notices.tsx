import React, { createContext, ReactElement, useEffect, useMemo, useState } from "react";
import { ApiLocal } from "../services/apiLocal";
import { INotice } from "../interfaces/Notice";
import { DateUtils } from "../utils/Date";

interface Context {
  checkAllSeem: () => void
  totalUnsee: number
  notices: INoticeGroup[]
}

export interface INoticeGroup {
  date: string
  notice: INotice[]
}

export const NoticesContext = createContext<Context>({} as Context)

export interface IChildren {
  children: ReactElement
}

export const NoticesContextProvider: React.FC<IChildren> = ({ children }: IChildren) => {
  const [notices, setNotices] = useState([] as INoticeGroup[])
  const [noticesAll, setnoticesAll] = useState([] as INotice[])

  const checkAllSeem = () => {
    localStorage.setItem('lastVisualization', new Date().toISOString())
    setnoticesAll(state => state.map(item => {
      item.seem = true
      return item
    }))
  }

  const totalUnsee = useMemo(() => {
    return noticesAll.filter(item => !item.seem).length
  }, [noticesAll])

  const getNotices = async () => {
    const dates = [] as string[]
    const api = new ApiLocal()
    const data = await api.getNotices()

    const lastSeem = localStorage.getItem('lastVisualization')

    const sorted = data.sort((a, b) => {
      if (new Date(a.publishDate) > new Date(b.publishDate)) {
        return -1
      }
      if (new Date(a.publishDate) < new Date(b.publishDate)) {
        return 1
      }
      return 0
    }).map(item => {
      item.seem = false
      if (lastSeem && new Date(lastSeem as string) > new Date(item.created_at)) {
        item.seem = true
      }

      return item
    })

    setnoticesAll(sorted)

    sorted.forEach(item => {
      const date = DateUtils.formatDateUS(item.publishDate)
      if (!dates.find(item => item === date)) {
        dates.push(date)
      }
    })

    const noticesByDay = [] as INoticeGroup[]

    dates.forEach(item => {
      const filtered = sorted.filter(notice => {
        return DateUtils.formatDateUS(notice.publishDate) === item
      })
      noticesByDay.push({
        date: item,
        notice: filtered
      })
    })

    setNotices(noticesByDay)
  }

  useEffect(() => {
    getNotices()
  }, [])

  return (
    <NoticesContext.Provider
      value={{
        checkAllSeem,
        notices,
        totalUnsee
      }}
    >
      {children}
    </NoticesContext.Provider>
  )
}
