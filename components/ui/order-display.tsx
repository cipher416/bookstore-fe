import { Card, CardContent, CardFooter } from "./card";
import { Button } from "./button";
import { Book, BookTag, OrderHeader } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookService } from "@/services/BookService";
import { CartService } from "@/services/CartService";
import { useState } from "react";
import { Input } from "./input";
import { OrderService } from "@/services/OrderService";

type BookDisplayProps = {
  order: OrderHeader;
};

type OrderMutationProps = {
  order: OrderHeader;
};

export default function OrderDisplay({ order }: BookDisplayProps) {
  const queryClient = useQueryClient();
  const [orderState, setOrderState] = useState<OrderHeader>(order);
  const orderMutation = useMutation({
    mutationFn: async ({ order }: OrderMutationProps) =>
      await OrderService.cancelOrder(order.OrderId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  return (
    <Card className="w-fit">
      <CardContent className="p-4 flex flex-col">
        <div className="font-semibold text-lg">{order.OrderId}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {order.OrderStatus}
        </div>
        <div className="font-semibold">{order.OrderDate}</div>
        <CardFooter>
          <Button onClick={() => orderMutation.mutate({ order })}>
            Cancel Order
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
