"use client";

import { ProductWithTotalPrice } from '@/helpers/product';
import { ReactNode, createContext, useState } from 'react';


export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductsToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductsToCart: () => {},
  decreaseProductQuantity: () => {}
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  
  const addProductsToCart = (product: CartProduct) => {
    const productAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    )
    
    if(productAlreadyOnCart) {
      setProducts((prev) => 
        prev.map((cartProduct) => {
          if(cartProduct.id === product.id){
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity
            };
          }
          return cartProduct;
        })
      )

      return;
    }

    setProducts((prev) => [...prev, product])
  }

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) => 
      prev.map((cartProduct) => {
        if(cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1
          }
        }

        return cartProduct;
      })
      .filter((cartProduct) => cartProduct.quantity > 0 )
    )
  }


  return (
    <CartContext.Provider value={{
      products,
      addProductsToCart,
      decreaseProductQuantity,
      cartTotalPrice: 0,
      cartBasePrice: 0,
      cartTotalDiscount: 0,
    }}>
      {children}
    </CartContext.Provider>
  );
}