import { createAccessToken, createRefreshToken } from "@utils/auth";
import { sendRefreshToken } from "@utils/sendRefreshToken";
import { Router } from "express";
import { verify, decode } from "jsonwebtoken";
import { prisma } from "@/index";
const router = Router();

router.get("/refresh_token", async (req, res) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  const userInfo = decode(token) as any;
  const { userId } = userInfo;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.isLogin === false) {
    return res.send({ ok: false, accessToken: "" });
  }

  const refreshKey = process.env.REFRESH_SECRET_KEY;
  // found user!
  try {
    verify(token, refreshKey);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));
  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

export default router;
