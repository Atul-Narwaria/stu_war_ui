import { useNavigate } from "react-router-dom";

export const Redirect = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/");
  };

  return {
    redirectToLogin,
  };
};
