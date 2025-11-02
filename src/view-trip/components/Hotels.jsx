import React from "react";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <div className="hover:scale-110 transition-all cursor-pointer">
            <img src="/hotel.jpg" className="rounded-lg" />
            <div className="my-3 flex flex-col gap-2">
              <h2 className="font-medium">{hotel.hotelName}</h2>
              <h2 className="text-xs text-gray-500">📍 {hotel.address}</h2>
              <h2 className="text-sm">💰 {hotel.price}</h2>
              <h2 className="text-sm">⭐ {hotel.rating}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
