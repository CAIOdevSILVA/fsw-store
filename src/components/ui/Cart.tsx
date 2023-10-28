"use client";

import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import CartItem from "./CartItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { getCurrency } from "@/constants/constants";
import { ScrollArea } from "./scroll-area";
import { Button } from './button';
import { createCheckout } from '@/actions/checkout';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async() => {
    const checkout = await createCheckout(products)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id
    })
  }

  return (
    <>
      <div className="flex h-full flex-col gap-8">
        <Badge
          className="w-fit gap-1 border-primary px-3 py-[.375rem] text-base uppercase"
          variant={"outline"}
        >
          <ShoppingCartIcon size={16} />
          Carrinho
        </Badge>

        <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex h-full flex-col">
              {products.length > 0 ? (
                <>
                  {products.map((product) => (
                    <CartItem
                      key={product.id}
                      product={computeProductTotalPrice(product as any) as any}
                    />
                  ))}
                </>
              ) : (
                <p className="text-center font-semibold">Carrinho Vazio</p>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-col gap-3">
         
          <Separator orientation="horizontal" />
          <div className="flex-items flex justify-between text-xs">
            <p>Subtotal</p>
            <p className="text-zinc-300 line-through">
              {getCurrency(subtotal)}
            </p>
          </div>

          {products.length > 0 && (
            <>
              <Separator orientation="horizontal" />
              <div className="flex-items flex justify-between text-xs">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>
            </>
          )}

          <Separator orientation="horizontal" />
          <div className="flex-items flex justify-between text-xs">
            <p>Descontos</p>
            <p>{getCurrency(totalDiscount)}</p>
          </div>

          <Separator orientation="horizontal" />
          <div className="flex-items flex justify-between text-xs">
            <p className="text-sm font-bold">Total</p>
            <p className="text-sm font-bold">{getCurrency(total)}</p>
          </div>

          <Button 
            className='uppercase font-bold mt-7'
            onClick={handleFinishPurchaseClick}
          >Finalizar compra</Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
