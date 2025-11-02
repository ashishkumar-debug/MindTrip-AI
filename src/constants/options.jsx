export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving avd',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'🚤',
        people:'5 to 10People'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💴'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸'
    },
]

export const AI_PROMPT = `
Generate a detailed travel plan for the following:
- Location: {location}
- Duration: {totalDays} days
- Traveler type: {traveler}
- Budget: {budget}

The output must be in valid JSON format with the following structure:

{
  "hotels": [
    {
      "hotelName": "",
      "address": "",
      "price": "",
      "imageUrl": "",
      "geoCoordinates": { "latitude": "", "longitude": "" },
      "rating": "",
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "places": [
        {
          "placeName": "",
          "details": "",
          "imageUrl": "",
          "geoCoordinates": { "latitude": "", "longitude": "" },
          "ticketPricing": "",
          "travelTime": "",
          "bestTimeToVisit": ""
        }
      ]
    }
  ]
}

Requirements:
1. Provide 3–4 hotel options that match the traveler's budget and location.
2. For each day, suggest 3–4 places to visit with realistic travel flow and timings.
3. Include meaningful, human-like descriptions and details (avoid generic filler).
4. For every hotel and place, include an **imageUrl from a public, hotlink-safe source** such as Unsplash, Pexels, or Wikimedia Commons.
   - Example format: "https://images.unsplash.com/photo-..."
6. Ensure all coordinates, prices, and ratings look realistic.
7. The final output must be valid, properly formatted JSON that can be parsed directly.
`;

