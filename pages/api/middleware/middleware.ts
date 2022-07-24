//@ts-nocheck
import nextConnect from 'next-connect';
import multiparty from 'multiparty';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const middleware = nextConnect();

middleware.use((req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
  const form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
      next();
    }
    req.body = fields;
    req.files = files;
    next();
  });
});

export default middleware;
