import { React, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { IoHome } from "react-icons/io5";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDailog, setOpenDailog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        window.location.reload();
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <div className="flex flex-row justify-center items-center ">
        <img src="./logo.svg" />
        <h2 className="text-[25px] ml-2 font-medium">MindTrip AI</h2>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/">
            <Button variant="outline" className="rounded-full">
              <IoHome />
            </Button>
            </a>
            <a href="/create-trip">
            <Button variant="outline" className="rounded-full">
              + Create Trip
            </Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDailog(true)}>Sign In</Button>
        )}
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
                  <h2 className="font-bold text-lg mt-2">
                    Sign In With Google
                  </h2>
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
      </div>
    </div>
  );
}

export default Header;
