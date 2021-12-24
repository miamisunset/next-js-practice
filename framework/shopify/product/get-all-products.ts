import getAllProductsQuery from "../utils/queries/get-all-products"
import fetchApi from "../utils/fetch-api"
import {ProductConnection} from "../schema"
import {normalizeProduct} from "../utils/normalize"
import {Product} from "../../common/types/product"

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
