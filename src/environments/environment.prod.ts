import keycloakConfigProd from "./keycloak.config.prod";

export const environment = {
  production: true,
  baseURL:"/salesforce-service/api/",
  wsdomain:"sales-service-25bf3634a2d0.herokuapp.com",
  keycloak: keycloakConfigProd,
};
