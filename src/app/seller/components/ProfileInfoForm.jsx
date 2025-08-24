"use client";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerProfile } from "@/redux/slices/sellerProfileSlice";
import SellerCategoryDropdown from "./SellerCategoryDropdown";

const ProfileInfoForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { fullName, email, phone, category, status, error } = useSelector(
    (s) => s.sellerProfile
  );

  const [localProfile, setLocalProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
  });

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  useEffect(() => {
    setLocalProfile({ fullName, email, phone, category });
  }, [fullName, email, phone, category]);

  const handleChange = (field, value) => {
    setLocalProfile((prev) => ({ ...prev, [field]: value }));
  };

  // expose current form values to parent
  useImperativeHandle(ref, () => ({
    getValues: () => localProfile,
  }));

  if (status === "loading") return <p className="mx-[16px] mt-[8px]">Loading…</p>;
  if (status === "failed")
    return <p className="text-red-500 mx-[16px] mt-[8px]">{String(error)}</p>;

  return (
    <div className="flex justify-center">
      <div className="bg-white w-[321px] rounded-md shadow-[-2px_2px_4px_rgba(0,0,0,0.25)] flex flex-col mt-8 mx-auto px-[12px] py-[16px]">
        {/* Full Name */}
        <label className="text-[12px] font-[Inter] font-medium mb-[4px]">Full Name</label>
        <input
          type="text"
          value={localProfile.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className="w-full h-[32px] bg-[#EEEEEE] px-[12px] text-[12px] rounded-[4px]"
        />

        {/* Email */}
        <label className="text-[12px] font-[Inter] font-medium mt-[8px] mb-[4px]">
          Email Address
        </label>
        <input
          type="email"
          value={localProfile.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full h-[32px] bg-[#EEEEEE] px-[12px] text-[12px] rounded-[4px]"
        />

        {/* Phone */}
        <label className="text-[12px] font-[Inter] font-medium mt-[8px] mb-[4px]">
          Phone No
        </label>
        <input
          type="text"
          value={localProfile.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full h-[32px] bg-[#EEEEEE] px-[12px] text-[12px] rounded-[4px]"
        />

        {/* Category Dropdown */}
        <SellerCategoryDropdown
          selected={localProfile.category}
          onSelect={(cat) => handleChange("category", cat)}
        />
      </div>
    </div>
  );
});

export default ProfileInfoForm