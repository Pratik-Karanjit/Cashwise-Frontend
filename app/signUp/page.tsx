"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { faGoogle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { registerUser } from "../services/authService";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      console.log("Form submitted with values:", values);

      try {
        const res = await registerUser(values);
        console.log("res", res);
        router.push("/signIn");
      } catch (err: any) {
        setErrors({
          email: err.response?.data?.message || "Registration failed",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center border border-[#ebe6e7] mt-16 sm:mt-24 w-fit mx-auto rounded-xl p-6 sm:p-7 max-w-sm mb-10 sm:max-w-none">
      <div className="flex flex-col gap-4 sm:gap-8 items-end">
        <h1 className="font-semibold text-lg sm:text-2xl font-primary mx-auto tracking-wide">
          Create Your Account
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 sm:gap-8"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div className="flex flex-col gap-1  w-full">
              <label className="text-sm sm:text-base">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="First Name"
                className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2 sm:py-2.5 px-2.5 sm:px-3 text-sm sm:text-base focus:border-secondary focus:ring-1 focus:ring-secondary min-w-0"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <span className="text-red-500 text-xs sm:text-sm">
                  {formik.errors.firstName}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm sm:text-base">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Last Name"
                className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2 sm:py-2.5 px-2.5 sm:px-3 text-sm sm:text-base focus:border-secondary focus:ring-1 focus:ring-secondary min-w-0"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <span className="text-red-500 text-xs sm:text-sm">
                  {formik.errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email address"
              className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2 sm:py-2.5 px-2.5 sm:px-3 text-sm sm:text-base focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-xs sm:text-sm">
                {formik.errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            {/* Password field with eye icon */}
            <div className="flex flex-col gap-1">
              <label className="text-sm sm:text-base">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                  className="w-full rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2 sm:py-2.5 px-2.5 sm:px-3 pr-8 sm:pr-10 text-sm sm:text-base focus:border-secondary focus:ring-1 focus:ring-secondary min-w-0"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-500 text-xs sm:text-sm">
                  {formik.errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password field with eye icon */}
            <div className="flex flex-col gap-1">
              <label className="text-sm sm:text-base">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter password again"
                  className="w-full rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2 sm:py-2.5 px-2.5 sm:px-3 pr-8 sm:pr-10 text-sm sm:text-base focus:border-secondary focus:ring-1 focus:ring-secondary min-w-0"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="text-red-500 text-xs sm:text-sm">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full gap-3 sm:gap-5">
            <Button
              text={formik.isSubmitting ? "Submitting..." : "Submit"}
              type="submit"
              hasArrow={false}
              disabled={formik.isSubmitting}
            />
            <div className="text-primary text-xs sm:text-sm">
              Already have an account? &nbsp;
              <Link href="/signIn">
                <span className="text-secondary cursor-pointer">Sign In</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
