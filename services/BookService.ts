import axios from "axios";

export class BookService {
  static async getBooks(page: number, searchString: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/book`, {
      params: {
        page: page,
        searchString: searchString,
      },
    });
  }
}
