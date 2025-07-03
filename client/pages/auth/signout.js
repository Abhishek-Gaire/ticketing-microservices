import { useEffect } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const Signout = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout", // Corrected URL to sign out
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"), // Redirect to home page after sign out
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};

export default Signout;
