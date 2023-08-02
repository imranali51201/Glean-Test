import { NextApiRequest } from 'next';

export interface Request<Body = {}, Query = {}> extends Omit<NextApiRequest, 'body' | 'query'> {
    body: Body;
    query: Query;
}