import { Card, CardContent, CardFooter } from "./card";
import { Button } from "./button";
import { Book, BookTag } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { BookService } from "@/services/BookService";
import { CartService } from "@/services/CartService";
import { useState } from "react";
import { Input } from "./input";

type BookDisplayProps = {
  book: Book;
};

export default function BookDisplay({ book }: BookDisplayProps) {
  const cartMutation = useMutation({
    mutationFn: () => CartService.addBookToCart(book.BookId, quantity),
  });
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <Card className="w-fit">
      <img
        alt="Product image"
        className="aspect-2/3 object-cover"
        height="200"
        src={book.BookImageURL}
        width="300"
      />
      <CardContent className="p-4 flex flex-col">
        <div className="font-semibold text-lg">{book.BookTitle}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {book.BookWriterName}
        </div>
        <div className="font-semibold">{book.BookPrice}</div>
        <div className="text-sm flex flex-row space-x-1">
          {book.BookTags.map((bt: BookTag) => {
            return <div key={bt.TagId}>{bt.Tag.TagName}</div>;
          })}
        </div>
        <Input
          type="number"
          placeholder="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.valueAsNumber)}
        />
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-end">
        <Button onClick={() => cartMutation.mutate()}>Add To Cart</Button>
      </CardFooter>
    </Card>
  );
}
