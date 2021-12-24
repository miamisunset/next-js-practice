export type ApiFetcherOptions = {
  url: string,
  query: string
}

export type ApiFetecherResult<T> = {
  data: T
}

export interface ApiConfig {
  apiUrl: string
  fetch<T>(options: ApiFetcherOptions): Promise<ApiFetecherResult<T>>
}
