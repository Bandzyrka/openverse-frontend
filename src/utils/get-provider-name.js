import { capital } from 'case'

/**
 * @param providersList
 * @param providerCode
 */
export default function getProviderName(providersList, providerCode) {
  if (!providersList) {
    return capital(providerCode) || ''
  }

  const provider = providersList.filter(
    (p) => p.source_name === providerCode
  )[0]

  return provider ? provider.display_name : capital(providerCode) || ''
}
