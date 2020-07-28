export interface IClient {
  clientId?: string;
  clientSecret?: string;
  clientName?: string;
  description?: string;
  createdBy?: number;
  updatedBy?: number;
  isActive?: boolean;
}
export interface IClientConfig {
  clientId?: number;
  configCode?: string;
  configName?: string;
  configValue?: string;
  description?: string;
  configDefaultValue?: string;
  isActive?: boolean;
  createdBy?: number;
  updatedBy?: number;
}