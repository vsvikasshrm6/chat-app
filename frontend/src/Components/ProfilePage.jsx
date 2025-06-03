import React from "react";
import { Camera, Mail, User } from "lucide-react";

function ProfilePage() {
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mt-20 ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar Section*/}
          <div className="flex flex-col items-center gap-4" >
            <div className="relative ">
              <img
                src={"/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                   absolute bottom-0 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${true ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                />
              </label>
              
            </div>
            <p className="text-sm text-zinc-400">
              {false ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
