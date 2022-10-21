import cn from "classnames";
import { FC, ReactNode, Component } from "react";
import s from "./GridProduct.module.css";
import Link from "next/link";
import { Product } from "@lib/bigcommerce/types/product";
import ProductCard from "@components/ui/ProductCard";

export interface GridData {
  item: ItemData;
}

export interface ItemData {
  title: string;
  description: string;
  link: LinkData;
  img?: any;
}

export interface LinkData {
  title: string;
  url: string;
}

export interface DataProps {
  title: string;
  description: string;
  grid: GridData[];
}

interface Props {
  className?: string;
  children?: ReactNode[] | Component[] | any[];
  variant?: "cols4" | string;
  data?: DataProps;
}

const GridProduct: FC<Props> = ({
  className,
  children,
  variant,
  data = {},
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.variantCols4]: variant === "cols4",
    },
    className
  );

  const { grid } = data;
  // @ts-ignore
  const { bc_products } = grid[0];

  console.log("bc_products", bc_products);
  return (
    <div>
      <div className="text-center my-12">
        {data.title && (
          <h2 className="mb-2 text-4xl font-semibold tracking-wide uppercase">
            {data.title}
          </h2>
        )}
        {data.description && <p className="">{data.description}</p>}
      </div>
      <div className={rootClassName}>
        {bc_products?.data?.map((product: Product) => (
          <div
            className="flex flex-col items-center text-center mb-10"
            key={product.sku}
          >
            <ProductCard product={product} />

            <Link href={`product${product?.custom_url?.url}`}>
              <a
                className="mt-4 uppercase font-semibold tracking-wide
            text-xs text-slate-900 bg-white rounded-full
            px-4 py-3 border  border-slate-400 hover:border-black
            transition ease-linear duration-150"
              >
                Shop Now
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridProduct;
