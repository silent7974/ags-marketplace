"use client"

import { useDispatch, useSelector } from "react-redux"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { updateSellerProfile } from "@/redux/slices/sellerProfileSlice"
import ProfileInfoForm from "@/app/seller/components/profile/ProfileInfoForm"
import ProfilePictureForm from "@/app/seller/components/profile/ProfilePictureForm"
import ChangePasswordForm from "@/app/seller/components/profile/ChangePasswordForm"
import NotificationToggle from "@/app/seller/components/NotificationToggle"
import DeleteAccountButton from "@/app/seller/components/profile/DeleteAccountButton"

async function uploadImageToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ags_unsigned_upload");
  formData.append("folder", "ags/products");

  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Cloudinary upload failed: " + (errorData.error?.message || response.statusText));
  }
  return response.json();
}

export default function Page() {
  const dispatch = useDispatch();
  const sellerProfile = useSelector((state) => state.sellerProfile);
  const router = useRouter();

  const [file, setFile] = useState(null);
  const formRef = useRef();

  const handleSave = async () => {
    try {
      let profileImageUrl = sellerProfile.profileImage || "";

      if (file) {
        const uploadResponse = await uploadImageToCloudinary(file);
        profileImageUrl = uploadResponse.secure_url;
      }

      // ✅ get fresh form values from child
      const profileValues = formRef.current?.getValues() || {};

      const formData = {
        ...profileValues,
        profileImage: profileImageUrl,
        notificationsEnabled: sellerProfile.notificationsEnabled,
      };

      await dispatch(updateSellerProfile(formData)).unwrap();

      router.push("/seller/normal/dashboard");
    } catch (err) {
      console.error("Profile save failed:", err);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex flex-col ">
        {/* Header */}
        <header className="flex items-center justify-between py-[16px]">
          <Link href="/seller/normal/dashboard" className="flex items-center">
            <ChevronLeft size={24} className="text-black/80" />
          </Link>
          <button
            onClick={handleSave}
            className="text-black/80 font-medium text-[20px]"
          >
            Save
          </button>
        </header>
      </div>

      <ProfilePictureForm setFile={setFile} />
      <ProfileInfoForm ref={formRef} />
      <ChangePasswordForm />
      <NotificationToggle />
      < DeleteAccountButton />
    </div>
  );
}