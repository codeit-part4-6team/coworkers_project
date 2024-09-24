// pages/api/googleToken.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function googleToken(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  try {

    const testID = {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }
    
    console.log(testID);
    const response = await axios.post('https://oauth2.googleapis.com/token', testID);

    const { access_token, refresh_token, id_token } = response.data;

    // 토큰 처리 및 사용자 정보 저장 로직 추가 가능
    res.status(200).json({ access_token, refresh_token, id_token });
  } catch (error) {
    res.status(500).json({ error });
  }
}
