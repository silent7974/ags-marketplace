"use client";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStoryHeadline,
  setStoryDescription,
  addStoryImage,
  removeStoryImage,
} from "@/redux/slices/storeSlice";

const MIN_RESOLUTION = 800;
const MAX_IMAGES = 3;

export default function StoreStory() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const { storyHeadline, storyDescription, storyImages } = useSelector(
    (s) => s.store
  );

  function openFilePicker() {
    if (fileRef.current) {
      fileRef.current.value = null;
      fileRef.current.click();
    }
  }

  async function handleImageSelect(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    for (const file of files) {
      if (storyImages.length >= MAX_IMAGES) return;

      // validate resolution using blob (TEMP ONLY)
      const tempUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = async () => {
        if (img.width < MIN_RESOLUTION || img.height < MIN_RESOLUTION) {
          alert("Minimum resolution is 800×800");
          URL.revokeObjectURL(tempUrl);
          return;
        }

        URL.revokeObjectURL(tempUrl);

        // 🔥 UPLOAD IMMEDIATELY
        const res = await uploadImageToCloudinary(file, "ags/stores/story");

        // 🔒 STORE ONLY CLOUD URL
        dispatch(addStoryImage(res.secure_url));
      };

      img.src = tempUrl;
    }
  }

  return (
    <section className=" mt-[32px]">
      {/* Title */}
      <div className="mt-[20px]">
        <p className="text-[16px] font-inter text-black">Store Story</p>
        <p className="mt-[4px] text-[12px] font-inter italic text-black/50">
          Tell buyers what your brand stands for
        </p>
      </div>

      {/* Headline */}
      <div className="mt-[16px]">
        <label className="text-[12px] font-inter font-medium mb-[4px] block">
          Headline
        </label>
        <input
          value={storyHeadline}
          onChange={(e) => dispatch(setStoryHeadline(e.target.value))}
          maxLength={60}
          placeholder="More Than a Brand"
          className="w-full h-[40px] bg-[#EEEEEE] px-[12px] text-[12px] rounded-[4px]
          placeholder:text-black/30 placeholder:font-inter"
        />
      </div>

      {/* Description */}
      <div className="mt-[16px]">
        <label className="text-[12px]font-inter font-medium mb-[4px] block">
          Description
        </label>
        <textarea
          value={storyDescription}
          onChange={(e) => dispatch(setStoryDescription(e.target.value))}
          maxLength={160}
          placeholder="Founded, in Abuja, AKI Designs is where modesty meets bold style. Every piece is designed to tell a story - your story"
          className="w-full h-[112px] bg-[#EEEEEE] px-[12px] py-[8px]
          text-[12px] rounded-[4px] resize-none
          placeholder:text-black/30 placeholder:font-inter"
        />
      </div>

      {/* Image upload */}
      <div className="mt-[16px] flex justify-center">
        {storyImages.length === 0 ? (
          <div
            onClick={openFilePicker}
            className="w-[216px] h-[227px] rounded-[16px] bg-[#eeeeee]
            flex flex-col items-center justify-center cursor-pointer"
          >
            <img src="/image.svg" className="w-[104px]" />
            <p className="mt-[8px] text-[24px] font-inter text-black/50">
              Upload images
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex gap-3">
              {storyImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-[64px] h-[64px] rounded-[4px] overflow-hidden"
                >
                  <img
                    src={img.url}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => dispatch(removeStoryImage(idx))}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  >
                    <img src="/trashcan.svg" className="w-[32px]" />
                  </button>
                </div>
              ))}

              {storyImages.length < 3 && (
                <div
                  onClick={openFilePicker}
                  className="w-[64px] h-[64px] rounded-[4px]
                  border border-dashed border-black/50
                  flex items-center justify-center cursor-pointer"
                >
                  <img src="/upload-more.svg" className="w-[24px]" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Guide */}
      <div className="mt-[12px]">
        <p className="text-[12px] font-inter text-black">
          Use real photos: customers, workshop, packaging
        </p>
        <p className="text-[12px] font-inter text-black/50">
          800×800 min resolution
        </p>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleImageSelect}
      />
    </section>
  );
}

async function uploadImageToCloudinary(file, folder) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ags_unsigned_upload");
  formData.append("folder", folder);

  const res = await fetch(url, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Upload failed");

  return res.json();
}