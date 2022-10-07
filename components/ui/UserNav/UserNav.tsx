import { FC, useEffect, useState } from "react";
import cn from "classnames";
import { Bag } from "@components/icons";
import s from "./UserNav.module.css";
import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";
import { Cart } from "@lib/bigcommerce/types/cart";
import Link from "next/link";

interface Props {
  className?: string;
}

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const [cart, setCart] = useState(null);
  useEffect(() => {
    async function getCart() {
      await fetch(`/api/cart`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data: Cart) {
          // @ts-ignore
          setCart(data);
        });
    }
    getCart();
  }, []);

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <Link href={`/cart`}>
            <li className={s.item}>
              <Bag />
              <span className={s.bagCount}>1</span>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default UserNav;
