"use client";

import React, { useState } from "react";
import Button from "../../components/Button";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string()
    .min(6, "At least 6 characters required.")
    .required("Password is required."),
});

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      error: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });
        console.log("response from login", res);

        if (res?.ok) {
          // Wait a bit for session to update, then redirect
          setTimeout(() => {
            router.push("/");
            router.refresh(); // Refresh to update session state
          }, 100);
        } else {
          setErrors({
            error: res?.error || "Login failed",
          });
        }
      } catch (error) {
        const err = error as any;
        console.log("error is: ", err);
        setErrors({
          error: err?.response?.data?.message || "Login failed",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center border border-[#ebe6e7] mt-24 w-fit mx-auto rounded-xl p-7">
      <div className="flex flex-col gap-4 sm:gap-7 items-end">
        <h1 className="font-semibold text-lg sm:text-2xl font-primary mx-auto tracking-wide">
          Login To Your Account
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-5 sm:gap-8"
        >
          {formik.errors.error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <span className="text-red-500 text-sm">
                {formik.errors.error}
              </span>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2 sm:py-2.5 px-2.5 sm:px-3 text-sm sm:text-base focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-xs sm:text-sm">
                {formik.errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2 sm:py-2.5 px-2.5 sm:px-3 pr-8 sm:pr-10 text-sm sm:text-base focus:border-secondary focus:ring-1 focus:ring-secondary"
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

          <div className="w-full flex flex-col items-center justify-center gap-3 sm:gap-5">
            <Button
              text={formik.isSubmitting ? "Submitting..." : "Submit"}
              type="submit"
              hasArrow={false}
              disabled={formik.isSubmitting}
            />
            <div className="text-primary text-xs sm:text-sm">
              Don't have an account? &nbsp;
              <Link href="/signUp">
                <span className="text-secondary cursor-pointer">Sign Up</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
