"use client";

import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import countingCash from "../public/images/counting.png";
import Button from "./Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleStartNow = () => {
    if (session) {
      router.push("/groupExpenses");
    } else {
      router.push("/signIn");
    }
  };

  return (
    <div className="w-full flex bg-white h-[90vh]">
      <div className="w-full md:w-1/2 flex justify-center items-start pt-12 md:pt-30 lg:pt-36 xl:pt-44 md:pl-16 lg:pl-24 xl:pl-32">
        <div className="flex flex-col gap-5 px-5 sm:px-0">
          <div className="px-4 py-2 w-max rounded-full bg-[#E5EDFF] flex flex-row justify-center items-center gap-3">
            <FontAwesomeIcon
              icon={faMoneyBill1Wave}
              className="h-6 w-6 text-secondary"
            />
            <p className="text-[#4F7DF3] text-sm">Explore our features!</p>
          </div>
          <div>
            <span className="text-primary text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl">
              Count & pay
            </span>
            <span className="text-secondary text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl">
              {" "}
              responsibly
            </span>
            <p className="text-primary text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl mt-3">
              By using{" "}
              <span className="md:text-4xl xl:text-5xl 2xl:text-6xl text-secondary">
                Cashwise!
              </span>
            </p>
          </div>
          <div className="w-full flex justify-center">
            <Image
              src={countingCash}
              alt="Counting cash"
              width={180}
              height={180}
              className="md:hidden"
            />
          </div>
          <div className="mt-5">
            <p className="text-[#5E6282] max-w-lg text-sm sm:text-base leading-relaxed text-justify">
              With the help of Cashwise, you can monitor, count any cash
              interaction, and have a customized dashboard to track your
              expenses! Stay on top of your finances, gain valuable insights
              into your spending habits, and make smarter financial decisions.
            </p>
          </div>
          <Button
            text={session ? "Start Now" : "Sign In to Start"}
            hasArrow={true}
            onClick={handleStartNow}
          />
        </div>
      </div>
      <div className="hidden md:flex w-1/2 justify-center items-start pt-44">
        <Image
          src={countingCash}
          alt="Counting cash"
          width={420}
          height={420}
          className=""
        />
      </div>
    </div>
  );
}
