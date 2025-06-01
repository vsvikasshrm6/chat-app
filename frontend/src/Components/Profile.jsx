
import { Camera, Mail, User } from "lucide-react";
import { authStore } from '../store/authStore';
import { useState } from "react";

function Profile() {
  const { isUpdatingProfile, authUser, updateProfile } = authStore();
  const [updatedImage, setUpdatedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    await fileReader.readAsDataURL(file);
    fileReader.onload = async () => {
      const base64Image = fileReader.result;
      setUpdatedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    }

  }
  return (
    <div className='h-screen pt-20'>
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>
              Profile
            </h1>
            <p>
              Your Profile information
            </p>
          </div>
          {/*Avator upload section*/}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={updatedImage || "/avatar.png" || authUser.profilePic}
                alt="Profile Pic"
                className="size-32 rounded-full object-cover border-4" />
              <label
                htmlFor="avatorUpload"
                className={`absolute bottom-0 right-0
              bg-base-content hover:scale-105
              p-2 rounded-full cursor-pointer
              transition-all duration-200
              ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
              >
                <Camera className="w-5 h-5 text-base-200"/>
                  <input
                    type="file"
                    id="avatorUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}

                  ></input>
                
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading" : "Click on the camera icon to update your photo"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4"></User>
                <p>Full Name</p>
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4"></Mail>
                <p>Email Address</p>
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

        </div>
        <div className="bg-base-300 rounded-xl p-6 mt-6">
          <h1 className="text-2xl font-semibold">Account Information</h1>
          <div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-700 ">
              <span>Member since</span>
              <span>{authUser?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-700 ">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>

        </div>




      </div>
    </div>
  )
}

export default Profile
