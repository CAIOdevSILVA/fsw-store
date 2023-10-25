import { getCurrency } from "@/constants/constants";
import { CartContext, CartProduct } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { useContext } from 'react';

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } = useContext(CartContext);
  
  const handleDecreaseProductQuantity = () => {
    decreaseProductQuantity(product.id);
  }
  
  const handleIncreaseProductQuantity = () => {
    increaseProductQuantity(product.id);
  }

  const handleRemoveProductsFromCart = () => {
    removeProductFromCart(product.id);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
            <Image
              src={product.imageUrls[0]}
              width={0}
              height={0}
              sizes="100vw"
              alt={product.name}
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xs">{product.name}</p>

            <div className="flex items-center gap-2">
              <p className="text-sm font-bold">
                {getCurrency(product.totalPrice)}
              </p>

              {product.discountPercent > 0 && (
                <p className="text-xs line-through opacity-75">
                  {getCurrency(Number(product.basePrice))}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size={"icon"}
                variant={"outline"}
                className="border border-zinc-800"
                onClick={handleDecreaseProductQuantity}
              >
                <ArrowLeftIcon size={13} />
              </Button>

              <span className='text-xs'>{product.quantity}</span>

              <Button
                size={"icon"}
                variant={"outline"}
                className="border border-zinc-800"
                onClick={handleIncreaseProductQuantity}
              >
                <ArrowRightIcon size={13} />
              </Button>
            </div>
          </div>
        </div>

        <Button variant={"outline"} size={"icon"} onClick={handleRemoveProductsFromCart}>
          <TrashIcon size={16}/>
        </Button>
      </div>
    </>
  );
};

export default CartItem;
