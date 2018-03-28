let serviceUrlBase: string = null

export interface IConfig {
  serviceUrlBase: string
}

/**
 * Sets the configuration that has been read from the remote server.
 * @param config The configuraion read from the remote server
 */
export function setFromRemote (config: IConfig) {
  serviceUrlBase = config.serviceUrlBase
}

/**
 * Returns the URL for the 'notifications' service.
 */
export function getNotificationServiceURL () {
  return `${serviceUrlBase}notifications/current`
}
