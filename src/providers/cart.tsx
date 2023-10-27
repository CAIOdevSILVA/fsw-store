"use client";

import { ProductWithTotalPrice } from '@/helpers/product';
import { ReactNode, createContext, useMemo, useState } from 'react';


export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  subtotal: number;
  total: number;
  totalDiscount: number;
  addProductsToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  subtotal: 0,
  total: 0,
  totalDiscount: 0,
  addProductsToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + (Number(product.basePrice) * product.quantity)    
    }, 0)
  }, [products]);
  
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + (product.totalPrice * product.quantity)    
    }, 0)
  }, [products]);

  const totalDiscount = total - subtotal;
  
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

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) => 
      prev.map((cartProduct) => {
        if(cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1
          }
        }

        return cartProduct;
      })
    )
  }

  const removeProductFromCart = (productId: string) => {
    const filteredProducts = products.filter((product) => product.id !== productId);
    setProducts(filteredProducts);
  }


  return (
    <CartContext.Provider value={{
      products,
      addProductsToCart,
      decreaseProductQuantity,
      increaseProductQuantity,
      removeProductFromCart,
      cartTotalPrice: 0,
      cartBasePrice: 0,
      cartTotalDiscount: 0,
      total,
      subtotal,
      totalDiscount
    }}>
      {children}
    </CartContext.Provider>
  );
}