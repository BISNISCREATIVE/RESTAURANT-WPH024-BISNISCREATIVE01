import axios from "./axios";

export async function placeOrder(payload: any) {
  const { data } = await axios.post(`/orders`, payload);
  return data?.data ?? data;
}

export async function getOrders() {
  const { data } = await axios.get(`/orders`);
  return data?.data ?? data;
}

export async function getOrder(id: number | string) {
  const { data } = await axios.get(`/orders/${id}`);
  return data?.data ?? data;
}
