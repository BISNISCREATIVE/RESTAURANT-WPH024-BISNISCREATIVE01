import axios from "./axios";

export async function createRestaurant(payload: any) {
  const { data } = await axios.post(`/restaurants`, payload);
  return data;
}

export async function updateRestaurant(id: string | number, payload: any) {
  const { data } = await axios.put(`/restaurants/${id}`, payload);
  return data;
}

export async function deleteRestaurant(id: string | number) {
  const { data } = await axios.delete(`/restaurants/${id}`);
  return data;
}
