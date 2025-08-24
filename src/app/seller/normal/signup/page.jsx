'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Check } from 'lucide-react'
import SellerCategoryDropdown from '../../components/SellerCategoryDropdown'
import SuccessModal from '../../components/SuccessModal'
import { useSignupMutation  } from "@/redux/services/sellerApi"

export default function SellerSignUpNormal() {
    const router = useRouter()
     const [signup, { isLoading, error }] = useSignupMutation()

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        category: '',
        sellerType: "normal_seller" 
    })

    const [errors, setErrors] = useState({})

    const password = form.password;
    const emailPrefix = form.email.split('@')[0] || '';
    const isLengthValid = password.length >= 8;
    const hasMix = /[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password);
    const doesNotContainEmail = !emailPrefix || !password.toLowerCase().includes(emailPrefix.toLowerCase());

    const validateForm = () => {
      const newErrors = {}

      if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!form.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = 'Invalid email address'
      }

      if (!form.phone.trim()) newErrors.phone = 'Phone Number is required'

      if (!form.password) {
        newErrors.password = 'Password is required'
      } else {
        if (form.password.length < 8)
          newErrors.password = 'Password must be at least 8 characters'
        if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
          newErrors.password =
            'Password must include letters, numbers, and symbols'
        }
        if (
          form.password.toLowerCase().includes(form.email.split('@')[0].toLowerCase())
        ) {
          newErrors.password = 'Password should not include your email prefix';
        }
      }

      if (!form.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (form.confirmPassword !== form.password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!form.category) newErrors.category = 'Please select a category';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

        setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
    }

    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setLoading(true);
      setServerError(null);

      try {
      await signup(form).unwrap(); // unwrap gives raw response or throws
      setShowSuccessModal(true)
    } catch (err) {
      console.error("Signup failed:", err)
    }
    };

    // Custom setter for category
    const setCategory = (category) => {
      setForm({ ...form, category });

      setErrors((prev) => ({ ...prev, category: undefined }))
    }

  return (
    <div className="w-full px-[16px] py-[40px]">

      <form 
        onSubmit={handleSubmit}
        >
          {/* Back Button */}
          <div className="ml-[2px]">
            <button onClick={() => router.push('/seller')}>
              <ChevronLeft size={24} color="#000000" />
            </button>
          </div>

          {/* Title and Subtitle */}
          <div className=" mt-[16px]">
            <h1 className="text-[24px] text-center font-[Inter] font-semibold text-[#000000]">
              Sign up
            </h1>
            <p className="text-[14px] text-center font-[Inter] font-medium text-black/50 mt-[8px]">
              Let’s get you setup in minutes
            </p>
          </div>

          {/* Full Name */}
          <label
            htmlFor="fullName"
            className="block mt-[16px] text-[12px] font-[Inter] font-medium text-[#000000]"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            type="text"
            className={`w-full mt-[4px] px-[12px] py-[10px] border border-black/30 rounded-[4px] text-[12px] font-[Inter] font-medium`}
          />

          {errors.fullName && (
            <p className="text-[8px] text-red-500 mt-[4px]">{errors.fullName}</p>
          )}

          {/* Email Address */}
          <label
            htmlFor="email"
            className="block mt-[16px] text-[12px] font-[Inter] font-medium text-[#000000]"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="w-full mt-[4px] px-[12px] py-[10px] border border-black/30 rounded-[4px] text-[12px] font-[Inter] font-medium"
          />

          {errors.email && (
            <p className="text-[8px] text-red-500 mt-[4px]">{errors.email}</p>
          )}

          {/* Phone Number */}
          <label
            htmlFor="phone"
            className="block mt-[16px] text-[12px] font-[Inter] font-medium text-[#000000]"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            className="w-full mt-[4px] px-[12px] py-[10px] border border-black/30 rounded-[4px] text-[12px] font-[Inter] font-medium"
          />

          {errors.phone && (
            <p className="text-[8px] text-red-500 mt-[4px]">{errors.phone}</p>
          )}

          {/* Create Password */}
          <label
            htmlFor="password"
            className="block mt-[16px] text-[12px] font-[Inter] font-medium text-[#000000]"
          >
            Create Password
          </label>
          <input
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            className="w-full mt-[4px] px-[12px] py-[10px] border border-black/30 rounded-[4px] text-[12px] font-[Inter] font-medium"
          />

          {errors.password && (
            <p className="text-[8px] text-red-500 mt-[4px]">{errors.password}</p>
          )}          

          {/* Password Requirements */}
          <div className="mt-[4px] flex flex-col gap-[4px]">
            {/* Rule 1 */}
            <PasswordRuleItem isValid={isLengthValid} text="Use maximum 8 Characters" />

            {/* Rule 2 */}
            <PasswordRuleItem isValid={hasMix} text="A mix of letters, numbers and symbols" />

            {/* Rule 3 */}
            <PasswordRuleItem isValid={doesNotContainEmail} text="Don’t use your email or email prefix in the password" />
          </div>

          {/* Confirm Password */}
          <label
            htmlFor="confirmPassword"
            className="block mt-[16px] text-[12px] font-[Inter] font-medium text-[#000000]"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type="password"
            className="w-full mt-[4px] px-[12px] py-[10px] border border-black/30 rounded-[4px] text-[12px] font-[Inter] font-medium"
          />

          {errors.confirmPassword && (
            <p className="text-[8px] text-red-500 mt-[4px]">{errors.confirmPassword}</p>
          )}

          <SellerCategoryDropdown 
            selected={form.category}
            onSelect={setCategory}
            hasError={!!errors.category}
          />

           {errors.category && (
              <p className="text-[8px] text-red-500 mt-[4px]">{errors.category}</p>
            )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-[24px] bg-[#005770] text-white text-[12px] font-[Inter] font-semibold py-[12px] rounded-[4px]"
          >
            {isLoading ? 'Creating account...' : 'Create my seller account'}
          </button>
        </form>

        <p className="mt-[12px] text-[10px] font-[Inter] font-medium text-black/50 text-center">
          By creating a seller account, you agree to our{' '}
          <button
            type="button"
            className="text-[#6182D8] underline"
            onClick={() => {
              // You can later navigate or open modal here
              router.push('/seller/privacy')
            }}
          >
            Seller Privacy Policy
          </button>
        </p>

        {error && (
          <p className="mt-[8px] text-[8px] text-red-500 text-center">{error.data?.message || "Signup failed"}</p>
        )}

        <div className="mt-[44px] flex flex-col items-center gap-[24px]">
          {/* Separator */}
          <div className="w-full h-[2px] bg-black/10" />

          {/* Line 1: Sign in */}
          <p className="text-[12px] font-[Inter] font-semibold text-black text-center">
            Already have an AGS seller account?{' '}
            <a href="/seller/normal/signin" className="text-[#005770]">
              Sign in
            </a>
          </p>

          {/* Line 2: Apply as Premium Seller */}
          <p className="text-[12px] font-[Inter] font-semibold text-black text-center">
            Want a full branded store?{' '}
            <a href="/seller/signup" className="text-[#005770]">
              Apply as Premium Seller
            </a>
          </p>
        </div>

        {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </div>  
  )
}

// Sub-component for each rule
function PasswordRuleItem({ isValid, text }) {
  return (
    <div className="flex items-center gap-[8px]">
      <div
        className={`w-[8px] h-[8px] rounded-full flex items-center justify-center ${
          isValid ? 'bg-[#1A7709]' : 'bg-black/30'
        }`}
      >
        {isValid && <Check size={6} color="white" />}
      </div>
      <p
        className={`text-[8px] font-[Inter] ${
          isValid ? 'text-[#1A7709]' : 'text-black/50'
        }`}
      >
        {text}
      </p>
    </div>
  )
}