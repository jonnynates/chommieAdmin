import { useState } from "react";
import { useRecoilCallback } from "recoil";
import { Client } from "../api";
import useLocalStorage, { TOKEN_STORAGE_KEY } from "./useLocalStorage";

export default function useAuthUser(givenToken, cb) {
  const [loading, setLoading] = useState(false);

  const [tokenInStorage, setTokenInStorage] = useLocalStorage(
    TOKEN_STORAGE_KEY,
    null
  );

  let token;

  if (givenToken != null) {
    token = givenToken;
  } else {
    token = tokenInStorage;
  }

  const authenticateUser = useRecoilCallback(
    ({ set, snapshot }) => async () => {
      setLoading(true);

      if (token) {
        Client.setToken(token);

        if (cb) {
          cb();
        }
      }
    }
  );

  return [loading, authenticateUser];
}
