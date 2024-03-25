"use client";
import BookDisplay from "@/components/ui/book-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OrderDisplay from "@/components/ui/order-display";
import { Book, OrderHeader } from "@/lib/types";
import { BookService } from "@/services/BookService";
import { OrderService } from "@/services/OrderService";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(0);
  const [orders, setOrders] = useState<OrderHeader[]>([]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["order", page],
    queryFn: ({ pageParam }) => OrderService.getAllOrders(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
  });
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    ) {
      return;
    }
    fetchNextPage();
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, status]);
  return (
    <>
      <div className="flex flex-row m-5 justify-center items-center space-x-2 space-y-1 flex-wrap">
        {data?.pages.map((group) => {
          return group.data.data.map((order: OrderHeader) => {
            return <OrderDisplay key={order.OrderId} order={order} />;
          });
        })}
      </div>
    </>
  );
}
