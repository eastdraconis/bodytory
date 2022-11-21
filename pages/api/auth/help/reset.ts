import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/auth/login";
import smtpTransport from "@libs/server/email";
import { HelpForm } from "pages/auth/help";
import bcrypt from "bcrypt";
import { passwordEncryption } from "utils/passwordHelper";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, accountId } = req.body;
  const hashedPassword = await passwordEncryption(password);
  console.log(email, password);
  const foundUser = await client.user.update({
    where: {
      accountId,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!foundUser) {
    return res.status(401).end();
  }

  return res.status(201).end();
}

export default withApiSession(withHandler({ methods: ["PUT"], handler, isPrivate: false }));
