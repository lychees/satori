export type Pagination<T> = T & { page_size?: number; page_token?: string }

export type Paginated<T, ItemsKey extends string = 'items'> = {
  [K in ItemsKey]: T[];
} & {
  has_more: boolean
  page_token: string
}
