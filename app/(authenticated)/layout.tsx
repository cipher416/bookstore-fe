"use client";
import { useToast } from "@/components/ui/use-toast";
import { OrderService } from "@/services/OrderService";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
  const toast = useToast();
  const orderMutation = useMutation({
    mutationFn: () => OrderService.order(),
    onSuccess: () =>
      toast.toast({
        title: "Cart Items Ordered!",
        description: "You can see your order at Order History.",
      }),
  });
  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-extrabold">Bookstore</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <button
            className="text-sm font-medium hover:underline underline-offset-4"
            onClick={() => orderMutation.mutate()}
          >
            Order Items
          </button>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/orders"
          >
            Order History
          </Link>
        </nav>
      </header>
      <div>{children}</div>
    </>
  );
}
