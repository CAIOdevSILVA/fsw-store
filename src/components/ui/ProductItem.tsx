import { ProductWithTotalPrice } from "@/helpers/product";
import { getCurrency } from '@/constants/constants';

import Link from 'next/link';
import Image from "next/image";
import DiscountBadge from './DiscountBadge';

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  

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
            <DiscountBadge className='absolute left-3 top-3'>
              {product.discountPercent}%
            </DiscountBadge>
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
