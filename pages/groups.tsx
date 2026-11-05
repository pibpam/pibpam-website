import type { NextPage } from 'next'
import { Api } from "../services/api";
import { IGetAllGroupResponse } from '../interfaces/Group';
import Group from '../container/Group';
import { CONTENT_REVALIDATE } from '../utils/revalidate';

export interface IGroupPage {
  data: IGetAllGroupResponse
}

const Page: NextPage<IGroupPage> = ({ data }) => {
  return <Group data={data} />
}

export async function getStaticProps() {
  const api = new Api()
  const data = await api.getAllGroups()
  return { props: { data }, revalidate: CONTENT_REVALIDATE }
}


export default Page
