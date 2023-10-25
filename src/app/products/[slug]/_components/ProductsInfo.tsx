"use client";

import DiscountBadge from '@/components/ui/DiscountBadge';
import { Button } from "@/components/ui/button";
import { getCurrency } from "@/constants/constants";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from '@/providers/cart';
import {  ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductsInfoProps {
  product: ProductWithTotalPrice;
}

const ProductsInfo = ({
  product,
}: ProductsInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const { addProductsToCart } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddProductToCart = () => {
    addProductsToCart({ ...product, quantity });
  }

  return (
    <>
      <div className="flex flex-col space-y-6">
        <h2 className="text-lg">{product.name}</h2>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{getCurrency(product.totalPrice)}</h1>
            {product.discountPercent > 0 && (
              <DiscountBadge>
                {product.discountPercent}
              </DiscountBadge>
            )}
          </div>

          {product.discountPercent > 0 && (
            <p className="text-sm line-through opacity-75">
              {getCurrency(Number(product.basePrice))}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size={"icon"}
            variant={"outline"}
            className="border border-zinc-800"
            disabled={quantity === 1 && true}
            onClick={handleDecreaseQuantityClick}
          >
            <ArrowLeftIcon size={13} />
          </Button>

          <span>{quantity}</span>

          <Button
            size={"icon"}
            variant={"outline"}
            className="border border-zinc-800"
            onClick={handleIncreaseQuantityClick}
          >
            <ArrowRightIcon size={13} />
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-bold">Descrição</h3>

          <p className="text-sm opacity-60 text-justify">{product.description}</p>
        </div>

        <Button className='font-bold uppercase' onClick={handleAddProductToCart}>
          Adicionar ao carrinho
        </Button>

        <div className='bg- rounded-lg flex items-center px-5 py-8 justify-between'>
          <div className='flex items-center gap-2'>
            <TruckIcon/>
            <div className='flex flex-col gap-1'>
              <p className='text-xs'>Entrega via <span className='font-bold'>Entrega via FS Packet</span></p>
              <p className='text-[#8162ff] text-xs'>Envio para todo <span className='font-bold'>Brasil</span>.</p>
            </div>
          </div>

          <p className='font-bold text-xs'>Frete Grátis</p>
        </div>
      </div>
    </>
  );
};

export default ProductsInfo;
