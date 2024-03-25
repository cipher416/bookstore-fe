export type Book = {
  BookId: string;
  BookTitle: string;
  BookWriterName: string;
  BookImageURL: string;
  BookPrice: number;
  BookTags: BookTag[];
};

export type BookTag = {
  BookId: string;
  TagId: string;
  Tag: Tag;
};

export type Tag = {
  TagId: string;
  TagName: string;
};

export type OrderHeader = {
  UserId: string;
  OrderId: string;
  OrderStatus: string;
  OrderDate: string;
};
