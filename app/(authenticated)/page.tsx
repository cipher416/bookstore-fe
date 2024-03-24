"use client";
import BookDisplay from "@/components/ui/book-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book } from "@/lib/types";
import { BookService } from "@/services/BookService";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["book", page, searchString],
    queryFn: ({ pageParam }) => BookService.getBooks(pageParam, searchString),
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
      <div className="m-5 flex space-x-2 flex-row">
        <Input
          placeholder="Search..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <Button onClick={() => fetchNextPage()}>Search</Button>
      </div>
      <div className="flex flex-row m-5 justify-center items-center space-x-2 space-y-1 flex-wrap">
        {data?.pages.map((group) => {
          return group.data.data.map((book: Book) => {
            return <BookDisplay key={book.BookId} book={book} />;
          });
        })}
      </div>
    </>
  );
}
