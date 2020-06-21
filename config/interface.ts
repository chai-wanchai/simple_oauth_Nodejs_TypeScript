/**
 * Configuration of SOAP
 */
interface IConfigSoap {

  /**
   * WebService URL
   */
  url: string;

  /**
   * User Authentication Webservice
   */
  username: string;

  /**
   * Password Authentication Webservice
   */
  password: string;

  /**
   * WSDL Path support both of physical path or url location
   * Example:
   *
   * - Physical Path: './file/webservice.wsdl'
   * 
   * - URL: https://cbmpiqa81.scg.com/dir/wsdl?p=sa/cbf00b84
   */
  wsdlPath: string;

  /**
   * WSDL Header authentication
   */
  wsdlHeader?: {
    /**
     * Username authentication
     */
    username: string
    /**
     * Password authentication
     */
    password: string
  }
}
export interface IEncryptConfig {
  algorithm: string;
  key: string;
  iv: string;
}

export interface IConfig {
  url: {
    base: string;
  };
  env: string,
  jwt: {
    secret: string;
  };
  api: {

  };
  gcloud?: {
    keyfile?: string;
  };

  postgres: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    dbUrl: string;
  };
  soap?: {
    oomProductMaster?: IConfigSoap,
    champProductMaster?: IConfigSoap
  };
  /**
   * Encryption Configuration
   */
  encrypt?: IEncryptConfig;
}
