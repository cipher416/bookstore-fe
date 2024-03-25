import axios from "axios";

export class CartService {
  static async addBookToCart(bookId: string, quantity: number) {
    return axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`,
      {
        bookId: bookId,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  }
}
