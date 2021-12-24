import type { InferGetStaticPropsType } from "next"

import getAllProducts from "@framework/product/get-all-products";
import { getConfig } from "@framework/api/config";
import { Layout } from "@components/common";
import { ProductCard } from "@components/product";

export async function getStaticProps() {
  const config = getConfig()
  const products = await getAllProducts(config)

  return {
    props: {
      products
    },
    revalidate: 4 * 60 * 60 // every 4 hours
  }
}

export default function Home({
  products
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
      <div className="root">
        { products.slice(0, 3).map(product => 
          <ProductCard 
            key={product.id}
            product={product}
          />
        )}
      </div>
  )
}

Home.Layout = Layout
