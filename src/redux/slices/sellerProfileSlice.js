import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Always send cookies to same-origin API routes
// (especially useful if your dev/prod domains differ)
axios.defaults.withCredentials = true;

// ---------- THUNKS ----------
export const fetchSellerProfile = createAsyncThunk(
  "sellerProfile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/seller/profile", { withCredentials: true });
      return res.data; // seller document from your route (no passwordHash)
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch profile");
    }
  }
);

export const updateSellerProfile = createAsyncThunk(
  "sellerProfile/update",
  async (updates, { rejectWithValue }) => {
    try {
      let data;
      let headers;

      if (updates.profileImageFile) {
        // File upload
        data = new FormData();
        Object.entries(updates).forEach(([key, value]) => {
          data.append(key, value);
        });
        headers = { "Content-Type": "multipart/form-data" };
      } else {
        // Normal JSON
        data = updates;
        headers = { "Content-Type": "application/json" };
      }

      const res = await axios.put("/api/seller/profile", data, {
        withCredentials: true,
        headers,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update profile");
    }
  }
);

export const deleteSellerProfile = createAsyncThunk(
  "sellerProfile/deleteSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete("/api/seller/profile", { withCredentials: true });
      return res.data; // { message: "Profile deleted successfully" }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete profile");
    }
  }
);

// ---------- INITIAL STATE ----------
const initialState = {
  // server fields (match your Seller model names)
  id: null,               // will map from _id
  fullName: "",
  email: "",
  phone: "",
  category: "",
  sellerType: "",

  // client-only UI fields
  notificationsEnabled: false,
  profileImage: null,      // server URL (string or null)
  profileImageFile: null,  // File object for uploading

  status: "idle",         // idle | loading | succeeded | failed
  error: null,
};

// ---------- SLICE ----------
const sellerProfileSlice = createSlice({
  name: "sellerProfile",
  initialState,
  reducers: {
    setProfile(state, action) {
      Object.assign(state, action.payload);
    },
    updateProfilePicture(state, action) {
      state.profileImage = action.payload.previewUrl   // for UI
      state.profileImageFile = action.payload.file    // for Save
    },
    deleteProfilePicture(state) {
      state.profileImage = null
      state.profileImageFile = null
    },
    toggleNotification(state) {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSellerProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        const p = action.payload || {};
        state.id = p._id || p.id || null;
        state.fullName = p.fullName || "";
        state.email = p.email || "";
        state.phone = p.phone || "";
        state.category = p.category || "";
        state.sellerType = p.sellerType || "";
        // server may not have this yet; keep existing if absent
        state.profileImage = p.profileImage ?? state.profileImage ?? null;
        // keep toggle unless server sends a value
        state.notificationsEnabled = p.notificationsEnabled ?? state.notificationsEnabled;
        state.error = null;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || action.payload || action.error.message;
      })

      // UPDATE
      .addCase(updateSellerProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        const p = action.payload || {};
        state.id = p._id || p.id || state.id;
        state.fullName = p.fullName ?? state.fullName;
        state.email = p.email ?? state.email;
        state.phone = p.phone ?? state.phone;
        state.category = p.category ?? state.category;
        state.sellerType = p.sellerType ?? state.sellerType;
        state.profileImage = p.profileImage ?? state.profileImage;
        state.notificationsEnabled = p.notificationsEnabled ?? state.notificationsEnabled;
        state.error = null;
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || action.payload || action.error.message;
      })

      // DELETE
      .addCase(deleteSellerProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteSellerProfile.fulfilled, () => {
        return { ...initialState, status: "succeeded" }; // wipe local profile
      })
      .addCase(deleteSellerProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || action.payload || action.error.message;
      });
  },
});

export const {
  setProfile,
  updateProfilePicture,
  deleteProfilePicture,
  toggleNotification,
} = sellerProfileSlice.actions;

export default sellerProfileSlice.reducer