import { OAuth2Client } from 'google-auth-library';
import { NextApiRequest, NextApiResponse } from 'next';

const client = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
);

export default async function GoogleToken(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body;
  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const userPayload = ticket.getPayload();

    return res.status(200).json({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      user: userPayload,
    });
  } catch (error) {
    console.error('Error getting Google tokens:', error);
    return res.status(500).json({ error: 'Failed to retrieve tokens' });
  }
}