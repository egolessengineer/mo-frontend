import { createContext, useContext, useEffect, useState } from "react";
import { handleCustomError } from "../Utils/helper";
import { GET_ME } from "../sevices";

export const AuthContext = createContext(null);

export const AuthState: any = () => {
  return useContext(AuthContext);
};

function AuthContextProvider({ children }: any) {
  const [islogin, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [connectWith, setConnectWith] = useState("Connect with Purchaser");
  const refetch = async () => {
    if (token) {
      GET_ME()
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res?.data));
          setUser(res?.data);
        })
        .catch((err) => {
          handleCustomError(err);
        });
    }
  };

  let data: any = {
    islogin,
    setLogin,
    user,
    setUser,
    refetch,
    connectWith,
    setConnectWith,
  };

 
  let token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      GET_ME()
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res?.data));
          setUser(res?.data);
        })
        .catch((err) => {
          handleCustomError(err);
        });
    }
  }, [token]);

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
