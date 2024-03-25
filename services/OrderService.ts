import axios from "axios";

export class OrderService {
  static async order() {
    return axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  }

  static async getAllOrders(page: number) {
    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        page: page,
      },
    });
  }

  static async cancelOrder(orderId: string) {
    return axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/cancel/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  }
}
