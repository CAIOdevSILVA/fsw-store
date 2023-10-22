import Image from "next/image";
import Categories from "./_components/Categories";
import ProductList from "./_components/ProductList";

import { prismaClient } from "@/lib/prisma";
import SectionTitle from "./_components/SectionTitle";
import PromoBanner from "./_components/PromoBanner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercent: {
        gt: 0, //discount maior que 0
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  return (
    <>
      <div className="space-y-8 p-5">
        <PromoBanner
          src="/banner-home-1.png"
          alt="Até 55% de desconto nesse mês!"
        />

        <Categories />

        <div>
          <SectionTitle>Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>

        <PromoBanner
          src="/banner-home-3.png"
          alt="Até 55% de desconto em teclados!"
        />
        <div>
          <SectionTitle>Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>
      </div>
    </>
  );
}
