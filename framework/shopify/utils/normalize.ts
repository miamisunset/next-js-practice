import {Product as ShopifyProduct} from "../schema"

export function normalizeProduct(productNode: ShopifyProduct): any {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    ...rest
  } = productNode

  return {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ""),
    ...rest
  }
}
