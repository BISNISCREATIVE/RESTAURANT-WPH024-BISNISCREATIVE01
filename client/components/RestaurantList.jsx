import React, { useState, useEffect } from 'react';

const RestaurantList = () => {
  // State untuk menyimpan daftar restoran
  const [restaurants, setRestaurants] = useState([]);
  // State untuk melacak status loading
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan pesan error
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Menggunakan environment variable untuk URL API
        const apiUrl = import.meta.env.VITE_API_BASE_URL + '/api/restaurants';
        
        // Melakukan fetch data dari API
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Mengonversi respons menjadi JSON
        const data = await response.json();
        
        // Memperbarui state dengan data restoran
        setRestaurants(data.restaurants);
      } catch (e) {
        // Menangani error jika fetch gagal
        setError(e.message);
      } finally {
        // Menghentikan status loading setelah fetch selesai
        setLoading(false);
      }
    };
    
    fetchRestaurants();
  }, []); // [] memastikan useEffect hanya berjalan sekali saat komponen dimuat

  // Menampilkan pesan loading saat data sedang diambil
  if (loading) return <p>Memuat...</p>;
  
  // Menampilkan pesan error jika terjadi kesalahan
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Daftar Restoran</h2>
      {restaurants.length > 0 ? (
        // Menampilkan daftar restoran jika ada
        <ul>
          {restaurants.map(restaurant => (
            <li key={restaurant.id}>{restaurant.name}</li>
          ))}
        </ul>
      ) : (
        // Menampilkan pesan jika tidak ada restoran yang ditemukan
        <p>Tidak ada rekomendasi saat ini</p>
      )}
    </div>
  );
};

export default RestaurantList;
