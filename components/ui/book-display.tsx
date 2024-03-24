import Link from "next/link";
import { Card, CardContent, CardFooter } from "./card";
import { Button } from "./button";
import { Book } from "@/lib/types";

type BookDisplayProps = {
  book: Book;
};

export default function BookDisplay({ book }: BookDisplayProps) {
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
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-end">
        <Button>Add To Cart</Button>
      </CardFooter>
    </Card>
  );
}
