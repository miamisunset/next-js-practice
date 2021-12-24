import getAllProductsQuery from "../utils/queries/get-all-products"
import fetchApi from "../utils/fetch-api"
import {ProductConnection} from "../schema"
import {node} from "prop-types";

type ReturnType = {
  products: ProductConnection
}

const getAllProducts = async (): Promise<any> => {
  const { data } =
    await fetchApi<ReturnType>({query: getAllProductsQuery})

  return data
    .products
    .edges
    .map(({ node: product }) => {
      return product
    }) ?? []
}

export default getAllProducts
