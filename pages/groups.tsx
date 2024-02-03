import type { NextPage } from 'next'
import { Api } from "../services/api";
import { IGetAllGroupResponse } from '../interfaces/Group';
import Group from '../container/Group';

export interface IGroupPage {
  data: IGetAllGroupResponse
}

const Page: NextPage<IGroupPage> = ({ data }) => {
  return <Group data={data} />
}

export async function getStaticProps() {
  const api = new Api()
  const data = await api.getAllGroups()
  return { props: { data } }
}


export default Page
