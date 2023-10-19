import keycloakConfigProd from "./keycloak.config.prod";

export const environment = {
  production: true,
  baseURL:"/salesforce-service/api/",
  keycloak: keycloakConfigProd,
};
