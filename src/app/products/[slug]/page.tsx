import { prismaClient } from "@/lib/prisma";
import ProductsImages from "./_components/ProductsImages";
import ProductsInfo from "./_components/ProductsInfo";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/ProductList";

interface ProductDetailsPage {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({ params: { slug } }: ProductDetailsPage) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category:{
        include: {
          products: {
            where: {
              slug: {
                not: slug
              }
            }
          }
        }
      }
    }
  });

  if (!product) return null;

  return (
    <>
      <div className="space-y-8 p-5">
        <ProductsImages imageUrls={product.imageUrls} name={product.name} />
        <ProductsInfo product={computeProductTotalPrice(product)} />
        <ProductList products={product.category.products}/>
      </div>
    </>
  );
};

export default ProductDetailsPage;
