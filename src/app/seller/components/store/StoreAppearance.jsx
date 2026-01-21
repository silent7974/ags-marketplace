"use client";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideo,
  removeVideo,
  toggleVideoMute,
  setBanner,
  removeBanner,
} from "@/redux/slices/storeSlice";
import { Trash2, VolumeX, Volume2, Maximize2 } from "lucide-react";

const MAX_DURATION = 30;
const MIN_VIDEO_WIDTH = 1280;
const MIN_VIDEO_HEIGHT = 720;
const MIN_BANNER_SIZE = 800;

export default function StoreAppearance({videoFileRef, bannerFileRef}) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [showControls, setShowControls] = useState(false);
  const [mode, setMode] = useState("video"); // current preview mode

  const {
    videoPreviewUrl,
    videoMuted,
    bannerPreviewUrl,
  } = useSelector((s) => s.store);

  // Opens the file picker only when clicking the placeholder
  function openFilePicker() {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    fileRef.current = file;
    const previewUrl = URL.createObjectURL(file);

    if (mode === "video") {
      const tempVideo = document.createElement("video");
      tempVideo.src = previewUrl;
      tempVideo.onloadedmetadata = () => {
        if (tempVideo.duration > MAX_DURATION) {
          alert("Video must not exceed 30 seconds.");
          URL.revokeObjectURL(previewUrl);
          return;
        }
        if (tempVideo.videoWidth < MIN_VIDEO_WIDTH || tempVideo.videoHeight < MIN_VIDEO_HEIGHT) {
          alert("Video quality is low: Recommended 720p or higher.");
        }
        if (file.type !== "video/mp4") {
          alert("MP4 format recommended.");
        }
        videoFileRef.current = file
        dispatch(setVideo({ previewUrl }));
      };
    } else if (mode === "banner") {
      const img = new Image();
      img.src = previewUrl;
      img.onload = () => {
        if (img.width < MIN_BANNER_SIZE || img.height < MIN_BANNER_SIZE) {
          alert("Banner resolution must be at least 800×800");
          URL.revokeObjectURL(previewUrl);
          return;
        }
        bannerFileRef.current = file
        dispatch(setBanner({ previewUrl }));
      };
    }
  }

  function toggleMute() {
    if (videoRef.current) videoRef.current.muted = !videoMuted;
    dispatch(toggleVideoMute());
  }

  function enterFullscreen() {
    videoRef.current?.requestFullscreen?.();
  }

  // Determine which preview to show
  const media = mode === "banner" ? bannerPreviewUrl : videoPreviewUrl;
  const previewUrl = media?.url;

  return (
    <section className="">
      {/* Title */}
      <div className="mt-[20px]">
        <p className="text-[16px] font-inter text-black">Store appearance</p>
        <p className="mt-[4px] text-[12px] font-inter italic text-black/50">
          This media appears at the top of your store
        </p>
      </div>

      {/* Mode buttons: only switch placeholder */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setMode("video")}
          className={`px-4 py-2 rounded font-inter ${
            mode === "video" ? "bg-[#005770] text-white" : "bg-[#eee] text-black"
          }`}
        >
          Ad
        </button>
        <button
          onClick={() => setMode("banner")}
          className={`px-4 py-2 rounded font-inter ${
            mode === "banner" ? "bg-[#005770] text-white" : "bg-[#eee] text-black"
          }`}
        >
          Banner
        </button>
      </div>

      {/* Preview */}
      <div className="mt-[16px] flex justify-center">
        {!previewUrl ? (
          <div
            onClick={openFilePicker}
            className="w-[216px] h-[227px] rounded-[16px] bg-[#eeeeee]
            flex flex-col items-center justify-center cursor-pointer"
          >
            <img
              src={mode === "video" ? "/video.svg" : "/banner.svg"}
              className="w-[104px]"
            />
            <p className="mt-[8px] text-[24px] font-inter text-black/50">
              {mode === "video" ? "Upload video" : "Upload banner"}
            </p>
          </div>
        ) : (
          <div
            onClick={() => setShowControls((v) => !v)}
            className="relative w-[216px] h-[227px] rounded-[16px] overflow-hidden cursor-pointer"
          >
            {mode === "video" ? (
              <video
                ref={videoRef}
                src={previewUrl}
                muted={videoMuted}
                autoPlay
                loop
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={previewUrl} alt="Banner preview" className="w-full h-full object-cover" />
            )}

            {/* Controls */}
            {showControls && (
              <div className="absolute inset-0 px-[16px] py-[12px]">
                <div className="flex justify-between">
                  <button
                    onClick={mode === "video" ? enterFullscreen : undefined}
                    className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center"
                  >
                    <Maximize2 size={18} color="#fff" />
                  </button>
                  <button
                    onClick={() =>
                      mode === "video" ? dispatch(removeVideo()) : dispatch(removeBanner())
                    }
                    className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center"
                  >
                    <Trash2 size={18} color="#fff" />
                  </button>
                </div>

                {mode === "video" && (
                  <div className="absolute bottom-[12px] left-[16px]">
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center"
                    >
                      {videoMuted ? <VolumeX size={18} color="#fff" /> : <Volume2 size={18} color="#fff" />}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guide */}
      <div className="mt-[12px]">
        <p className="text-[12px] font-inter text-black">
          {mode === "video" ? "Upload video ad" : "Upload store banner"}
        </p>
        <p className="text-[12px] font-inter text-black/50">
          {mode === "video"
            ? "Max 30 seconds – MP4 recommended – minimum 720p recommended"
            : "Minimum resolution must be 800×800 recommended"}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={mode === "video" ? "video/mp4" : "image/*"}
        hidden
        onChange={handleFileSelect}
      />
    </section>
  );
}