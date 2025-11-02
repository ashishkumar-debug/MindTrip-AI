import React, { useState, useEffect } from "react";
import DestinationInput from "../components/DestinationInput";
import { Input } from "../components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { sendMessage } from "../service/AIModel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { useNavigate } from "react-router";

// Add this helper function above CreateTrip
const normalizeTripData = (rawData) => {
  const parsed = typeof rawData === "string" ? JSON.parse(rawData) : rawData;

  const normalizedHotels = parsed.hotelOptions?.map((hotel) => ({
    hotelName: hotel.HotelName || hotel.hotel_name || hotel.hotelName || "",
    hotelAddress: hotel.HotelAddress || hotel.hotel_address || hotel.hotelAddress || "",
    hotelImageUrl: hotel.HotelImageUrl || hotel.hotel_image_url || hotel.hotelImageUrl || "",
    pricePerNightINR: hotel.Price || hotel.price || hotel.pricePerNightINR || "",
    rating: hotel.Rating || hotel.rating || 0,
    description: hotel.Description || hotel.description || "",
    geoCoordinates: hotel.geoCoordinates || {
      latitude: hotel.latitude || 0,
      longitude: hotel.longitude || 0,
    },
  })) || [];

  return {
    ...parsed,
    hotelOptions: normalizedHotels,
  };
};

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [tripPlan, setTripPlan] = useState("");
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }

    const { location, noOfDays, budget, traveler } = formData;

    if (!location || !noOfDays || !budget || !traveler) {
      toast("Please fill all details");
      return;
    }

    if (noOfDays > 5) {
      toast("Trips longer than 5 days are not supported yet");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      location?.label || location
    )
      .replace("{totalDays}", noOfDays)
      .replace("{traveler}", traveler)
      .replace("{budget}", budget);

    setLoading(true);
    try {
      const result = await sendMessage(FINAL_PROMPT);
      setTripPlan(result || "No response received.");
      SaveAiTrip(result);
    } catch (err) {
      console.error("Gemini error:", err);
      toast("Failed to generate trip.");
    } finally {
      setLoading(false);
    }
  };

 


  const SaveAiTrip = async (TripData) => {
  setLoading(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const docId = Date.now().toString();

  try {
    const cleaned = TripData.replace(/```json|```/g, "").trim();
    const parsed = normalizeTripData(cleaned);

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: parsed,
      userEmail: user?.email,
      id: docId,
    });

    toast("Trip saved!");
    navigate("/view-trip/" + docId);
  } catch (err) {
    console.error("SaveAiTrip error:", err);
    toast("Failed to save trip.");
  }

  setLoading(false);
   navigate('/view-trip/'+docId)
};

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Beare ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        What kind of trip are you dreaming of? 🏕️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      {/* Form Inputs */}
      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium flex justify-center">
            Pick a place you are excited about🚀
          </h2>
          <DestinationInput
            onChange={(v) => {
              handleInputChange("location", v);
            }}
          />
        </div>
        <div className="flex justify-center flex-col items-center">
          <h2 className="text-xl my-3 font-medium">
            How many days do you want to explore?
          </h2>
          <Input
            className="w-180"
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      {/* Budget Selection */}
      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                formData?.budget === item.title ? "shadow-lg border-black" : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Traveler Selection */}
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                formData?.traveler === item.people
                  ? "shadow-lg border-black"
                  : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>{" "}
            {/* Required for accessibility */}
            <DialogDescription>
              <div className="flex flex-col items-center">
                <img
                  src="/logo.svg"
                  alt="App Logo"
                  className="w-16 h-16 mb-4"
                />
                <h2 className="font-bold text-lg mt-2">Sign In With Google</h2>
                <div className="text-sm text-gray-500 text-center mt-2">
                  Sign in to the app with Google authentication securely
                </div>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center justify-center"
                >
                  <FcGoogle className="h-6 w-6" />
                  Sign In With Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Trip Plan Output */}
      {/* {tripPlan && (
        <div className="mt-10 p-6 border rounded-lg bg-gray-50 whitespace-pre-wrap">
          <h3 className="text-xl font-bold mb-2">Your Custom Trip Plan ✈️</h3>
          {tripPlan}
        </div>
      )} */}
    </div>
  );
}

export default CreateTrip;
