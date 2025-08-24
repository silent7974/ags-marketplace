"use client";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, deleteProfilePicture } from "@/redux/slices/sellerProfileSlice";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function ProfilePictureForm({ setFile }) { // ✅ accept setFile from parent
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); 
  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.sellerProfile.profileImage);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
  const newFile = e.target.files[0];
  if (newFile) {
      const objectUrl = URL.createObjectURL(newFile);
      setPreviewUrl(objectUrl);

      setFile(newFile); // ✅ bubble up to parent
  -   dispatch(setProfile({ profileImage: objectUrl })); 
      setOpen(false);
    }
  };


  // Cleanup blob URLs when preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Delete photo
  const handleDelete = () => {
    setFile(null); // ✅ clear parent file too
    setPreviewUrl(null);
    dispatch(deleteProfilePicture());
    setOpen(false);
  };

  return (
    <div className="flex justify-center">
      {/* Profile Picture Card */}
      <div
        className="bg-white w-[321px] h-[224px] rounded-md 
        shadow-[-2px_2px_4px_rgba(0,0,0,0.25)] 
        flex flex-col items-center mt-6 mx-auto"
      >
        {/* Profile Icon or Uploaded Image */}
        <div className="mt-4">
          <Image
            src={previewUrl || profileImage || "/profile.svg"}
            alt="Profile"
            width={164}
            height={164}
            priority={200}
            className="w-[164px] h-[164px] object-cover rounded-full"
          />
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setOpen(true)}
          className="mt-2 text-[24px] font-medium text-[#2A9CBC] font-inter"
        >
          Edit
        </button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Modal (Bottom Sheet) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setOpen(false)}
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl px-4 py-5"
            >
              {/* Header */}
              <div className="flex items-center justify-center relative mb-4">
                <h2 className="text-[24px] font-medium text-black font-inter">
                  Edit profile picture
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-0"
                >
                  <X size={16} className="text-black" />
                </button>
              </div>

              {/* Options Card */}
              <div className="bg-[#EEEEEE] rounded-lg overflow-hidden">
                {/* Option 1: Take Photo */}
                <button
                  className="flex justify-between items-center w-full h-12 px-4 border-b border-black/20"
                  onClick={() => cameraInputRef.current.click()}
                >
                  <span className="text-[16px] font-medium text-black/80 font-inter">
                    Take photo
                  </span>
                  <Image
                    src="/take-photo.svg"
                    alt="Take Photo"
                    width={24}
                    height={24}
                  />
                </button>

                {/* Option 2: Choose Photo */}
                <button
                  className="flex justify-between items-center w-full h-12 px-4 border-b border-black/20"
                  onClick={() => fileInputRef.current.click()}
                >
                  <span className="text-[16px] font-medium text-black/80 font-inter">
                    Choose photo
                  </span>
                  <Image
                    src="/choose-photo.svg"
                    alt="Choose Photo"
                    width={24}
                    height={24}
                  />
                </button>

                {/* Option 3: Delete Photo */}
                {(previewUrl || profileImage) && (
                  <button
                    onClick={handleDelete}
                    className="flex justify-between items-center px-4 w-full h-12"
                  >
                    <span className="text-[16px] font-medium text-[#B41316] font-inter">
                      Delete photo
                    </span>
                    <Image
                      src="/trashcan-red.svg"
                      alt="Delete"
                      width={24}
                      height={24}
                    />
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}