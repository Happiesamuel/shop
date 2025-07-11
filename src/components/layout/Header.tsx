"use client";
import React, { useEffect, useState } from "react";
import { FaOpencart, FaRegHeart } from "react-icons/fa";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import useCart from "../hooks/useCart";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { cart, setCart } = useCart();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!value) return;
    e.preventDefault();
    router.push(`/catalog?query=${value}`);
    setValue("");
  }
  useEffect(
    function () {
      setCart(cart);
    },
    [cart, setCart]
  );
  const quantity = cart.length
    ? cart.map((x) => x.quantity).reduce((a, b) => a + b)
    : 0;
  return (
    <div className="flex bg-light/40 border-b border-zinc-100/80 backdrop-blur-sm z-[99] items-center justify-between  py-3 px-12 fixed w-full mx-auto my-0 max-w-[144rem]">
      <h1 className="text-dark font-[900] text-[20px]">
        BR.<span className="text-[#a4a4a4]">F</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex border border-zinc-200 items-center gap-2 justify-center px-3 w-[280px] rounded-md text-[#a4a4a4] bg-white"
      >
        <IoSearch className="text-2xl" />
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="border-none shadow-none p-0 placeholder:text-[#a4a4a4] text-[#010101]"
          placeholder="Search"
        />
      </form>
      <div className="flex items-center gap-4 text-sm font-light">
        <Link
          href="/cart"
          className="flex items-center flex-col relative gap-0.5"
        >
          {quantity > 0 ? (
            <div className="absolute bottom-[80%] left-[60%] size-3.5 rounded-full flex item-center  justify-center text-[11px] bg-[#edcf5d]">
              {quantity}
            </div>
          ) : (
            ""
          )}
          <FaOpencart />
          <p>Cart</p>
        </Link>
        <div className="flex items-center flex-col gap-0.5">
          <FaRegHeart />
          <p>Favorite</p>
        </div>
        image
      </div>
    </div>
  );
}
