interface JWTResponse {
  success: boolean;
  token?: string;
  err?: string;
}

const makeLoginRequest = async (body: URLSearchParams) => {
  const loginResponse: JWTResponse = await fetch(
    // `${import.meta.env.VITE_authUrl}/auth`,
    `https://auth.ezrahuang.com/auth`,
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      body,
    },
  ).then((res) => res.json());

  return loginResponse;
};

interface VerifyResponse {
  valid: boolean;
  error?: string;
}

const makeVerifyRequest = async (body: URLSearchParams) => {
  const verifyResponse: VerifyResponse = await fetch(
    `https://auth.ezrahuang.com/verify`,
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      body,
    },
  ).then((res) => res.json());

  return verifyResponse;
};
export { makeLoginRequest, makeVerifyRequest };
