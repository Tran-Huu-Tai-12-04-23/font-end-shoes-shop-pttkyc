import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthUserContext } from "./AuthUser";

function WrapperApp({ children }) {
  const { user } = UseAuthUserContext();
  const history = useNavigate();
  useEffect(() => {
    if (user && !user.role_account) {
      history("/");
    } else if (user && user.role_account > 0) {
      history("/admin");
    }
  }, [user]);
  return <>{children}</>;
}

export default WrapperApp;
