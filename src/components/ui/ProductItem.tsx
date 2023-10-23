import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";
import Link from 'next/link';

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const getCurrency = (price: number) => {
    const convertedPrice = new Intl.NumberFormat("us-US", {
      style: "currency",
      currency: "BRL",
    }).format(price);

    return convertedPrice;
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="flex max-w-[170px] flex-col gap-4">
        <div className="relative flex h-[170px] w-[170px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            alt={product.name}
            style={{
              objectFit: "contain",
            }}
          />

          {product.discountPercent > 0 && (
            <Badge className="absolute left-3 top-3 px-2 py-[2px]">
              <ArrowDownIcon size={12} /> {product.discountPercent}%
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>

          <div className="flex items-center gap-2">
            {product.discountPercent > 0 ? (
              <>
                <p className="font-semibold text-primary">
                  {getCurrency(product.totalPrice)}
                </p>

                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                  {getCurrency(Number(product.basePrice))}
                </p>
              </>
            ) : (
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-primary">
                {getCurrency(Number(product.basePrice))}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
