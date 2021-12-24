import {
  fetchApi,
  normalizeProduct,
  getAllProductsQuery
} from "@framework/utils"
import {ProductConnection} from "../schema"
import {Product} from "@common/types/product"

type ReturnType = {
  products: ProductConnection
}

const getAllProducts = async (): Promise<Array<Product>> => {
  const { data } =
    await fetchApi<ReturnType>({query: getAllProductsQuery})

  return data
    .products
    .edges
    .map(({ node: product }) =>
      normalizeProduct(product)
    ) ?? []
}

export default getAllProducts
