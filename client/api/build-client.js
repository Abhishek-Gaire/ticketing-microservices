import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // we are on server inside the cluster
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // on browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
