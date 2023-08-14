import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from "../../services/api";
import { IGetAllSeries } from "../../interfaces/Series";
import { promisify } from 'util';
import { Stream } from 'stream';

const pipeline = promisify(Stream.pipeline);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { image } = req.query as {image: string}
  const response = await fetch(image as string);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  // http://localhost:3000/api/download?image=https://pibpam.s3.us-east-1.amazonaws.com/gallery/c8b5c798-fdec-4c50-b5d2-0f9be3f0f6d3.jpeg
  const fileName = image.replace('https://pibpam.s3.us-east-1.amazonaws.com/gallery/', '')

  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
  //@ts-ignore
  await pipeline(response.body, res);
}
