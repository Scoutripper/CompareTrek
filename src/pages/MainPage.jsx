import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { RiCloseFill } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi";
import { MdOutlineStar } from "react-icons/md";
import { Badge } from "primereact/badge";
import { HiArrowRightCircle, HiArrowLeftCircle } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Logo from "../assets/wordlogo.svg";
import Close from "../assets/close.svg";
import Pin from "../assets/pin.svg";
import Whatsapp from "../assets/whatsapp.svg";

const getDifficultySVG = (grade, small) => {
  switch (grade) {
    case "1":
      return (
        <div className="flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="67"
            height={small ? "30" : "50"}
            viewBox="0 0 67 50"
            fill="none"
          >
            <g clipPath="url(#clip0_148_375)">
              <rect width="66.6667" height="50" fill="none"></rect>
              <path
                d="M13.1405 31.768L35.8883 39.1392C38.146 40.4053 38.9459 43.2799 37.6799 45.5374C36.4139 47.795 33.5393 48.595 31.2817 47.329L13.1396 31.7666L13.1405 31.768Z"
                fill="#00393C"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2283 27.3841C10.9694 28.749 10.8333 30.1605 10.8333 31.6076C10.8333 36.5086 12.3955 41.0324 15.0498 44.7245L8.28354 49.5889C4.64422 44.5267 2.5 38.3114 2.5 31.6076C2.5 29.6367 2.68545 27.7054 3.04099 25.8311L11.2283 27.3841Z"
                fill="#A3F3A5"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.923 9.15103C24.0562 9.63615 17.2712 14.169 13.6416 20.7122C12.9631 21.9353 12.3958 23.2276 11.9528 24.5754L4.03613 21.9733C4.64489 20.1212 5.42395 18.3472 6.35438 16.6699C11.3149 7.72741 20.6034 1.49991 31.4101 0.833496L31.923 9.15103Z"
                fill="#D4EAE2"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.4387 27.3841C55.6976 28.749 55.8337 30.1605 55.8337 31.6076C55.8337 36.5086 54.2715 41.0324 51.6172 44.7245L58.3835 49.5889C62.0228 44.5267 64.167 38.3114 64.167 31.6076C64.167 29.6367 63.9815 27.7054 63.626 25.8311L55.4387 27.3841Z"
                fill="#D4EAE2"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.744 9.15103C42.6108 9.63615 49.3958 14.169 53.0254 20.7122C53.7039 21.9353 54.2712 23.2276 54.7142 24.5754L62.6309 21.9733C62.0221 20.1212 61.243 18.3472 60.3126 16.6699C55.3521 7.72741 46.0635 1.49991 35.2569 0.833496L34.744 9.15103Z"
                fill="#D4EAE2"
              ></path>
              <path
                d="M36.6484 14.9092V26.9092H33.7539V17.6162H33.6836L31 19.2568V16.749L33.959 14.9092H36.6484Z"
                fill="#00393C"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_148_375">
                <rect width="66.6667" height="50" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
          <p>Easy</p>
        </div>
      );
    case "2":
      return (
        <div className="flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="67"
            height={small ? "30" : "50"}
            viewBox="0 0 67 50"
            fill="none"
          >
            <rect width="66.6667" height="50" fill="none"></rect>
            <path
              d="M21.167 19.5424L39.0625 39.8941C40.5292 42.4347 39.6443 45.6985 37.1038 47.1651C34.5633 48.6317 31.2994 47.7469 29.8328 45.2064L21.167 19.5405V19.5424Z"
              fill="#00393C"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.2283 27.3841C10.9694 28.749 10.8333 30.1605 10.8333 31.6076C10.8333 36.5086 12.3955 41.0324 15.0498 44.7245L8.28354 49.5889C4.64422 44.5267 2.5 38.3114 2.5 31.6076C2.5 29.6367 2.68545 27.7054 3.04099 25.8311L11.2283 27.3841Z"
              fill="#F9F871"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M31.923 9.15103C24.0562 9.63615 17.2712 14.169 13.6416 20.7122C12.9631 21.9353 12.3958 23.2276 11.9528 24.5754L4.03613 21.9733C4.64489 20.1212 5.42395 18.3472 6.35438 16.6699C11.3149 7.72741 20.6034 1.49991 31.4101 0.833496L31.923 9.15103Z"
              fill="#F9F871"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M55.4387 27.3841C55.6976 28.749 55.8337 30.1605 55.8337 31.6076C55.8337 36.5086 54.2715 41.0324 51.6172 44.7245L58.3835 49.5889C62.0228 44.5267 64.167 38.3114 64.167 31.6076C64.167 29.6367 63.9815 27.7054 63.626 25.8311L55.4387 27.3841Z"
              fill="#D4EAE2"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M34.744 9.15103C42.6108 9.63615 49.3958 14.169 53.0254 20.7122C53.7039 21.9353 54.2712 23.2276 54.7142 24.5754L62.6309 21.9733C62.0221 20.1212 61.243 18.3472 60.3126 16.6699C55.3521 7.72741 46.0635 1.49991 35.2569 0.833496L34.744 9.15103Z"
              fill="#D4EAE2"
            ></path>
            <path
              d="M29.1734 26.7305V24.6727L33.4913 20.8923C33.815 20.5994 34.0906 20.3316 34.3179 20.0889C34.5453 19.8422 34.7187 19.5956 34.8382 19.349C34.9576 19.0985 35.0173 18.8268 35.0173 18.5339C35.0173 18.2064 34.9461 17.927 34.8035 17.6958C34.6609 17.4607 34.4644 17.2796 34.2139 17.1524C33.9634 17.0253 33.6763 16.9617 33.3526 16.9617C33.025 16.9617 32.738 17.0291 32.4913 17.164C32.2447 17.295 32.052 17.4858 31.9133 17.7362C31.7784 17.9867 31.711 18.2912 31.711 18.6495H29C29 17.8441 29.1811 17.1486 29.5434 16.5628C29.9056 15.9771 30.4143 15.5262 31.0694 15.2102C31.7283 14.8904 32.4933 14.7305 33.3642 14.7305C34.262 14.7305 35.0424 14.8808 35.7052 15.1813C36.368 15.4819 36.8805 15.902 37.2428 16.4415C37.6089 16.9771 37.7919 17.5994 37.7919 18.3085C37.7919 18.7594 37.7013 19.2064 37.5202 19.6495C37.3391 20.0927 37.0135 20.5821 36.5434 21.1178C36.0771 21.6534 35.4143 22.295 34.5549 23.0426L33.1387 24.349V24.4241H37.9364V26.7305H29.1734Z"
              fill="#00393C"
            ></path>
          </svg>
          <p>Moderate</p>
        </div>
      );
    case "3":
      return (
        <div className="flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="67"
            height={small ? "30" : "50"}
            viewBox="0 0 67 50"
            fill="none"
          >
            <rect width="66.6667" height="50" fill="none"></rect>
            <path
              d="M45.5 19.5424L27.6045 39.8941C26.1378 42.4347 27.0227 45.6985 29.5632 47.1651C32.1037 48.6317 35.3676 47.7469 36.8342 45.2064L45.5 19.5405V19.5424Z"
              fill="#00393C"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M55.4387 27.3841C55.6976 28.749 55.8337 30.1605 55.8337 31.6076C55.8337 36.5086 54.2715 41.0324 51.6172 44.7245L58.3835 49.5889C62.0228 44.5267 64.167 38.3114 64.167 31.6076C64.167 29.6367 63.9815 27.7054 63.626 25.8311L55.4387 27.3841Z"
              fill="#D4EAE2"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M34.744 9.15103C42.6108 9.63615 49.3958 14.169 53.0254 20.7122C53.7039 21.9353 54.2712 23.2276 54.7142 24.5754L62.6309 21.9733C62.0221 20.1212 61.243 18.3472 60.3126 16.6699C55.3521 7.72741 46.0635 1.49991 35.2569 0.833496L34.744 9.15103Z"
              fill="#F87D3A"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.2283 27.3841C10.9694 28.749 10.8333 30.1605 10.8333 31.6076C10.8333 36.5086 12.3955 41.0324 15.0498 44.7245L8.28354 49.5889C4.64422 44.5267 2.5 38.3114 2.5 31.6076C2.5 29.6367 2.68545 27.7054 3.04099 25.8311L11.2283 27.3841Z"
              fill="#F87D3A"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M31.923 9.15103C24.0562 9.63615 17.2712 14.169 13.6416 20.7122C12.9631 21.9353 12.3958 23.2276 11.9528 24.5754L4.03613 21.9733C4.64489 20.1212 5.42395 18.3472 6.35438 16.6699C11.3149 7.72741 20.6034 1.49991 31.4101 0.833496L31.923 9.15103Z"
              fill="#F87D3A"
            ></path>
            <path
              d="M33.5913 26.7305C32.7015 26.7305 31.9125 26.5784 31.2243 26.2742C30.5399 25.9662 30 25.5423 29.6046 25.0023C29.2091 24.4624 29.0076 23.8407 29 23.1373H31.8403C31.8517 23.3921 31.9335 23.6183 32.0856 23.816C32.2376 24.0099 32.4449 24.162 32.7072 24.2723C32.9696 24.3826 33.2681 24.4377 33.6027 24.4377C33.9373 24.4377 34.2319 24.3788 34.4867 24.2609C34.7452 24.1392 34.9468 23.9738 35.0913 23.7647C35.2357 23.5518 35.3061 23.3084 35.3023 23.0347C35.3061 22.7609 35.2281 22.5175 35.0684 22.3046C34.9087 22.0917 34.6825 21.9263 34.3897 21.8084C34.1008 21.6905 33.7586 21.6316 33.3631 21.6316H32.2281V19.624H33.3631C33.7091 19.624 34.0133 19.567 34.2757 19.4529C34.5418 19.3388 34.749 19.1791 34.8973 18.9738C35.0456 18.7647 35.1179 18.5251 35.1141 18.2552C35.1179 17.9928 35.0551 17.7628 34.9259 17.5651C34.8004 17.3635 34.6236 17.2077 34.3954 17.0974C34.1711 16.9871 33.9106 16.932 33.6141 16.932C33.3023 16.932 33.019 16.9871 32.7643 17.0974C32.5133 17.2077 32.3137 17.3635 32.1654 17.5651C32.0171 17.7666 31.9392 18.0004 31.9316 18.2666H29.2338C29.2414 17.5708 29.4354 16.9586 29.8156 16.4301C30.1958 15.8978 30.7129 15.4814 31.3669 15.181C32.0247 14.8807 32.7738 14.7305 33.6141 14.7305C34.4506 14.7305 35.1863 14.8769 35.8213 15.1696C36.4563 15.4624 36.9506 15.8616 37.3042 16.3674C37.6578 16.8693 37.8346 17.4377 37.8346 18.0727C37.8384 18.7305 37.6236 19.2723 37.1901 19.6981C36.7605 20.124 36.2072 20.3864 35.5304 20.4852V20.5765C36.4354 20.6829 37.1179 20.9757 37.5779 21.4548C38.0418 21.9339 38.2719 22.5327 38.2681 23.2514C38.2681 23.9282 38.0684 24.5289 37.6692 25.0537C37.2738 25.5746 36.7224 25.9852 36.0152 26.2856C35.3118 26.5822 34.5038 26.7305 33.5913 26.7305Z"
              fill="#00393C"
            ></path>
          </svg>
          <p>Hard</p>
        </div>
      );
    default:
      return null;
  }
};

const formatAltitude = (altitude) => {
  const feet = parseInt(altitude.replace(/[^0-9]/g, ""), 10);
  if (isNaN(feet)) return "N/A";
  const meters = Math.round(feet * 0.3048);

  return `${meters.toLocaleString()} m / ${feet.toLocaleString()} ft`;
};

const formatRatings = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<MdOutlineStar key={i} className="text-[#FA8232] w-5 h-5" />);
    } else {
      stars.push(<MdOutlineStar key={i} className="text-[#929FA5] w-5 h-5" />);
    }
  }
  return stars;
};

const CompareCard = ({ name, image, state, difficulty }) => {
  return (
    <div className="flex flex-row gap-3 w-fit md:border p-4 rounded-md md:border-[#8E9EAB]/20 md:shadow-xs">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 object-cover rounded-sm"
      />
      <div className="min-w-[100px] sm:min-w-[160px] flex flex-col justify-center items-start w-full">
        <p className="text-sm sm:text-base font-semibold text-[#00393C] text-nowrap">
          {name}
        </p>
        <div className="flex flex-row gap-1 items-center">
          <p className="text-xs sm:text-sm text-gray-500 text-nowrap">
            {state}
          </p>
        </div>
      </div>
      <div className="border-r my-1 px-2 border-[#8E9EAB]/50"></div>
      {getDifficultySVG(difficulty, true)}
    </div>
  );
};

const MainPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [chosenTrekOne, setChosenTrekOne] = useState("");
  const [validTrekOne, setValidTrekOne] = useState(false);
  const [showDropdownOne, setShowDropdownOne] = useState(false);
  const [placeholderOne, setPlaceholderOne] = useState("Choose Trek");
  const [tempInputOne, setTempInputOne] = useState("");

  const [chosenTrekTwo, setChosenTrekTwo] = useState("");
  const [validTrekTwo, setValidTrekTwo] = useState(false);
  const [showDropdownTwo, setShowDropdownTwo] = useState(false);
  const [placeholderTwo, setPlaceholderTwo] = useState("Choose Trek");
  const [tempInputTwo, setTempInputTwo] = useState("");

  const [chosenTrekThree, setChosenTrekThree] = useState("");
  const [validTrekThree, setValidTrekThree] = useState(false);
  const [showDropdownThree, setShowDropdownThree] = useState(false);
  const [placeholderThree, setPlaceholderThree] = useState("Choose Trek");
  const [tempInputThree, setTempInputThree] = useState("");

  const [chosenTrekFour, setChosenTrekFour] = useState("");
  const [validTrekFour, setValidTrekFour] = useState(false);
  const [showDropdownFour, setShowDropdownFour] = useState(false);
  const [placeholderFour, setPlaceholderFour] = useState("Choose Trek");
  const [tempInputFour, setTempInputFour] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [placeholder, setPlaceholder] = useState("Choose a trek to compare");
  const [showHighlights, setShowHighlights] = useState(false);
  const [showIncludes, setShowIncludes] = useState(false);
  const [showExcludes, setShowExcludes] = useState(false);

  const isMobile = window.innerWidth < 768;
  const currentYear = new Date().getFullYear();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `https://review.scoutripper.com/api/search_track.php?limit=1000&trek_name=${chosenTrekOne}`
        );
        setSuggestions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchLocations();
    }, 300); // Debounce API calls

    return () => clearTimeout(delayDebounceFn);
  }, [chosenTrekOne]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `https://review.scoutripper.com/api/search_track.php?limit=1000`
        );
        setAllSuggestions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchLocations();
    }, 300); // Debounce API calls

    return () => clearTimeout(delayDebounceFn);
  }, []);

  return (
    <div className="min-h-screen">
      <div>
        {activeStep === 0 && (
          <div className="stepper font-medium w-full min-h-screen flex flex-col justify-between items-center px-4">
            {!isMobile && <Header link={"https://www.scoutripper.com/"} />}
            {isMobile && (
              <div className="w-screen flex items-center justify-between flex-row pt-4 px-4">
                <img src={Logo} alt="Logo" className="h-10" />
                <a href={"https://www.scoutripper.com/"} target="_self">
                  <img src={Close} alt="Close" className="h-3 cursor-pointer" />
                </a>
              </div>
            )}
            <div className="max-w-5xl w-full flex flex-col justify-center items-center flex-grow">
              <h1 className="font-bold text-3xl text-header-main pt-5 pb-1 text-center">
                Still Confused?
              </h1>
              <h1 className="font-bold text-3xl text-header-main pb-2 text-center">
                Compare Treks - Find Your Perfect Adventure
              </h1>
              <h3 className="font-normal text-base text-gray-500 pb-10 text-center">
                Side-by-side trek comparisons to help you pick the best
                adventure based on your preferences.
              </h3>
              <div className="relative w-full sm:w-2/3 min-w-fit">
                <input
                  id="random_id_123"
                  className="destination w-full h-12 border border-[#DEDEDE] rounded-full px-6 py-2 font-medium text-base text-gray-500 focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                  value={chosenTrekOne.title}
                  onChange={(e) => {
                    setChosenTrekOne(e.target.value);
                  }}
                  type="text"
                  autoComplete="off"
                  name="random_name_123"
                  placeholder={placeholder}
                  onFocus={() => {
                    setShowDropdown(true);
                    setPlaceholder("");
                  }}
                  onBlur={() => {
                    setShowDropdown(false);
                    if (!chosenTrekOne) {
                      setPlaceholder("Choose a trek to compare");
                    }
                  }}
                />
                {showDropdown && suggestions.length > 0 && (
                  <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                        onMouseDown={() => {
                          setChosenTrekOne(item);
                          setTempInputOne(item.title);
                          setValidTrekOne(true);
                          setShowDropdown(false);
                          handleNext();
                        }}
                      >
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="flex flex-row justify-start items-center">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-10 h-10 object-cover rounded-sm"
                            />
                            <p className="pr-6 pl-4 text-sm font-semibold text-[#00393C] h-full">
                              {item.title}
                            </p>
                          </div>
                          <div className="flex flex-row justify-start items-center">
                            <img src={Pin} alt="Pin" className="h-3" />
                            <p className="text-xs font-normal text-[#A1A1A1] h-full pl-2">
                              {item.locationName}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <h2 className="font-medium text-lg text-header-main pt-12 pb-2 text-center">
                Or get started with our pre compared recommendations
              </h2>
              <div>
                <div className="flex flex-row gap-4 w-full sm:w-2/3 min-w-fit justify-center items-center">
                  {allSuggestions.length > 0 && !isMobile && (
                    <div className="flex flex-col gap-4 justify-center items-center w-fit p-4">
                      <div
                        className="flex flex-col md:flex-row gap-4 justify-center items-center cursor-pointer"
                        onClick={() => {
                          setChosenTrekOne(allSuggestions[13]);
                          setValidTrekOne(true);
                          setTempInputOne(allSuggestions[13].title);
                          setChosenTrekTwo(allSuggestions[0]);
                          setValidTrekTwo(true);
                          setTempInputTwo(allSuggestions[0].title);
                          handleNext();
                        }}
                      >
                        <CompareCard
                          name={allSuggestions[13].title}
                          image={allSuggestions[13].image_url}
                          state={allSuggestions[13].locationName}
                          difficulty={allSuggestions[13].grade}
                        />
                        <p className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                          vs
                        </p>
                        <CompareCard
                          name={allSuggestions[0].title}
                          image={allSuggestions[0].image_url}
                          state={allSuggestions[0].locationName}
                          difficulty={allSuggestions[0].grade}
                        />
                      </div>
                      <div
                        className="flex flex-col md:flex-row gap-4 justify-center items-center cursor-pointer"
                        onClick={() => {
                          setChosenTrekOne(allSuggestions[14]);
                          setValidTrekOne(true);
                          setTempInputOne(allSuggestions[14].title);
                          setChosenTrekTwo(allSuggestions[8]);
                          setValidTrekTwo(true);
                          setTempInputTwo(allSuggestions[8].title);
                          handleNext();
                        }}
                      >
                        <CompareCard
                          name={allSuggestions[14].title}
                          image={allSuggestions[14].image_url}
                          state={allSuggestions[14].locationName}
                          difficulty={allSuggestions[14].grade}
                        />
                        <p className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                          vs
                        </p>
                        <CompareCard
                          name={allSuggestions[8].title}
                          image={allSuggestions[8].image_url}
                          state={allSuggestions[8].locationName}
                          difficulty={allSuggestions[8].grade}
                        />
                      </div>
                    </div>
                  )}
                  {allSuggestions.length > 0 && isMobile && (
                    <div className="flex flex-col gap-6 justify-center items-center w-fit p-4">
                      <div
                        className="flex flex-col md:flex-row gap-2 justify-center items-center cursor-pointer border rounded-lg border-[#8E9EAB]/20 shadow-xs"
                        onClick={() => {
                          setChosenTrekOne(allSuggestions[13]);
                          setValidTrekOne(true);
                          setTempInputOne(allSuggestions[13].title);
                          setChosenTrekTwo(allSuggestions[0]);
                          setValidTrekTwo(true);
                          setTempInputTwo(allSuggestions[0].title);
                          handleNext();
                        }}
                      >
                        <CompareCard
                          name={allSuggestions[13].title}
                          image={allSuggestions[13].image_url}
                          state={allSuggestions[13].locationName}
                          difficulty={allSuggestions[13].grade}
                        />
                        <p className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                          vs
                        </p>
                        <CompareCard
                          name={allSuggestions[0].title}
                          image={allSuggestions[0].image_url}
                          state={allSuggestions[0].locationName}
                          difficulty={allSuggestions[0].grade}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="font-normal">
              <Footer />
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div className="stepper font-medium w-full min-h-screen flex flex-col justify-between items-center px-4">
            {!isMobile && (
              <Header link={"https://comparetreks.scoutripper.com/"} />
            )}
            {isMobile && (
              <div className="w-screen flex items-center justify-between flex-row pt-4 px-4">
                <img src={Logo} alt="Logo" className="h-10" />
                <a
                  href={"https://comparetreks.scoutripper.com/"}
                  target="_self"
                >
                  <img src={Close} alt="Close" className="h-3 cursor-pointer" />
                </a>
              </div>
            )}
            <div className="max-w-8xl w-full flex flex-col justify-center items-center flex-grow">
              <h1 className="font-bold text-3xl text-header-main pb-2 text-center">
                Trek Smarter: Compare Your Options
              </h1>
              <h3 className="font-normal text-base text-gray-500 pb-10 text-center">
                Compare treks by difficulty, altitude, duration & highlights to
                find your perfect trekking experience.
              </h3>
              {!isMobile && (
                <div className="flex flex-wrap gap-4 w-full sm:w-2/3 min-w-fit justify-center items-center">
                  <div className="flex flex-col gap-4 justify-center items-center w-fit min-w-60 border border-gray-200 rounded-lg p-4">
                    {validTrekOne ? (
                      <div
                        className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          setChosenTrekOne("");
                          setTempInputOne("");
                          setValidTrekOne(false);
                          setPlaceholderOne("Choose Trek");
                        }}
                      >
                        <RiCloseFill />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                    )}
                    {chosenTrekOne && validTrekOne ? (
                      <img
                        src={chosenTrekOne.image_url}
                        alt={chosenTrekOne.title}
                        className="w-48 h-36 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-48 h-36 bg-black/20 rounded-lg"></div>
                    )}
                    <div className="relative w-full min-w-fit">
                      <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                      <input
                        className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                        value={chosenTrekOne === "" ? "" : chosenTrekOne.title}
                        onChange={(e) => {
                          setTempInputOne(e.target.value);
                          setChosenTrekOne(e.target.value);
                        }}
                        type="text"
                        name="random_name_123"
                        placeholder={placeholderOne}
                        onFocus={() => {
                          setShowDropdownOne(true);
                          setPlaceholderOne("");
                          setValidTrekOne(false);
                        }}
                        onBlur={() => {
                          setShowDropdownOne(false);
                          if (!chosenTrekOne) {
                            setPlaceholderOne("Choose Trek");
                          } else {
                            if (allSuggestions.includes(chosenTrekOne)) {
                              setValidTrekOne(true);
                            }
                          }
                        }}
                      />
                      {showDropdownOne && allSuggestions.length > 0 && (
                        <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                          {allSuggestions
                            .filter(
                              (item) =>
                                item.title
                                  .toLowerCase()
                                  .includes(tempInputOne.toLowerCase()) &&
                                item.title !== chosenTrekTwo.title &&
                                item.title !== chosenTrekThree.title &&
                                item.title !== chosenTrekFour.title
                            )
                            .map((item) => (
                              <li
                                key={item.id}
                                className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                onMouseDown={() => {
                                  setChosenTrekOne(item);
                                  setValidTrekOne(true);
                                  setShowDropdownOne(false);
                                }}
                              >
                                <div className="flex flex-row justify-between items-start w-full">
                                  <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                    {item.title}
                                  </span>
                                </div>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 justify-center items-center w-fit min-w-60 border border-gray-200 rounded-lg p-4">
                    {validTrekTwo ? (
                      <div
                        className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          setChosenTrekTwo("");
                          setTempInputTwo("");
                          setValidTrekTwo(false);
                          setPlaceholderTwo("Choose Trek");
                        }}
                      >
                        <RiCloseFill />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                    )}
                    {chosenTrekTwo && validTrekTwo ? (
                      <img
                        src={chosenTrekTwo.image_url}
                        alt={chosenTrekTwo.title}
                        className="w-48 h-36 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-48 h-36 bg-black/20 rounded-lg"></div>
                    )}
                    <div className="relative w-full min-w-fit">
                      <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                      <input
                        className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                        value={chosenTrekTwo === "" ? "" : chosenTrekTwo.title}
                        onChange={(e) => {
                          setTempInputTwo(e.target.value);
                          setChosenTrekTwo(e.target.value);
                        }}
                        type="text"
                        name="random_name_123"
                        placeholder={placeholderTwo}
                        onFocus={() => {
                          setShowDropdownTwo(true);
                          setPlaceholderTwo("");
                          setValidTrekTwo(false);
                        }}
                        onBlur={() => {
                          setShowDropdownTwo(false);
                          if (!chosenTrekTwo) {
                            setPlaceholderTwo("Choose Trek");
                          } else {
                            if (allSuggestions.includes(chosenTrekTwo)) {
                              setValidTrekTwo(true);
                            }
                          }
                        }}
                      />
                      {showDropdownTwo && allSuggestions.length > 0 && (
                        <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                          {allSuggestions
                            .filter(
                              (item) =>
                                item.title
                                  .toLowerCase()
                                  .includes(tempInputTwo.toLowerCase()) &&
                                item.title !== chosenTrekOne.title &&
                                item.title !== chosenTrekThree.title &&
                                item.title !== chosenTrekFour.title
                            )
                            .map((item) => (
                              <li
                                key={item.id}
                                className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                onMouseDown={() => {
                                  setChosenTrekTwo(item);
                                  setValidTrekTwo(true);
                                  setShowDropdownTwo(false);
                                }}
                              >
                                <div className="flex flex-row justify-between items-start w-full">
                                  <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                    {item.title}
                                  </span>
                                </div>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 justify-center items-center w-fit min-w-60 border border-gray-200 rounded-lg p-4">
                    {validTrekThree ? (
                      <div
                        className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          setChosenTrekThree("");
                          setTempInputThree("");
                          setValidTrekThree(false);
                          setPlaceholderThree("Choose Trek");
                        }}
                      >
                        <RiCloseFill />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                    )}
                    {chosenTrekThree && validTrekThree ? (
                      <img
                        src={chosenTrekThree.image_url}
                        alt={chosenTrekThree.title}
                        className="w-48 h-36 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-48 h-36 bg-black/20 rounded-lg"></div>
                    )}
                    <div className="relative w-full min-w-fit">
                      <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                      <input
                        className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                        value={
                          chosenTrekThree === "" ? "" : chosenTrekThree.title
                        }
                        onChange={(e) => {
                          setTempInputThree(e.target.value);
                          setChosenTrekThree(e.target.value);
                        }}
                        type="text"
                        name="random_name_123"
                        placeholder={placeholderThree}
                        onFocus={() => {
                          setShowDropdownThree(true);
                          setPlaceholderThree("");
                          setValidTrekThree(false);
                        }}
                        onBlur={() => {
                          setShowDropdownThree(false);
                          if (!chosenTrekThree) {
                            setPlaceholderThree("Choose Trek");
                          } else {
                            if (allSuggestions.includes(chosenTrekThree)) {
                              setValidTrekThree(true);
                            }
                          }
                        }}
                      />
                      {showDropdownThree && allSuggestions.length > 0 && (
                        <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                          {allSuggestions
                            .filter(
                              (item) =>
                                item.title
                                  .toLowerCase()
                                  .includes(tempInputThree.toLowerCase()) &&
                                item.title !== chosenTrekOne.title &&
                                item.title !== chosenTrekTwo.title &&
                                item.title !== chosenTrekFour.title
                            )
                            .map((item) => (
                              <li
                                key={item.id}
                                className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                onMouseDown={() => {
                                  setChosenTrekThree(item);
                                  setValidTrekThree(true);
                                  setShowDropdownThree(false);
                                }}
                              >
                                <div className="flex flex-row justify-between items-start w-full">
                                  <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                    {item.title}
                                  </span>
                                </div>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 justify-center items-center w-fit min-w-60 border border-gray-200 rounded-lg p-4">
                    {validTrekFour ? (
                      <div
                        className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          setChosenTrekFour("");
                          setTempInputFour("");
                          setValidTrekFour(false);
                          setPlaceholderFour("Choose Trek");
                        }}
                      >
                        <RiCloseFill />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                    )}
                    {chosenTrekFour && validTrekFour ? (
                      <img
                        src={chosenTrekFour.image_url}
                        alt={chosenTrekFour.title}
                        className="w-48 h-36 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-48 h-36 bg-black/20 rounded-lg"></div>
                    )}
                    <div className="relative w-full min-w-fit">
                      <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                      <input
                        className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                        value={
                          chosenTrekFour === "" ? "" : chosenTrekFour.title
                        }
                        onChange={(e) => {
                          setTempInputFour(e.target.value);
                          setChosenTrekFour(e.target.value);
                        }}
                        type="text"
                        name="random_name_123"
                        placeholder={placeholderFour}
                        onFocus={() => {
                          setShowDropdownFour(true);
                          setPlaceholderFour("");
                          setValidTrekFour(false);
                        }}
                        onBlur={() => {
                          setShowDropdownFour(false);
                          if (!chosenTrekFour) {
                            setPlaceholderFour("Choose Trek");
                          } else {
                            if (allSuggestions.includes(chosenTrekFour)) {
                              setValidTrekFour(true);
                            }
                          }
                        }}
                      />
                      {showDropdownFour && allSuggestions.length > 0 && (
                        <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                          {allSuggestions
                            .filter(
                              (item) =>
                                item.title
                                  .toLowerCase()
                                  .includes(tempInputFour.toLowerCase()) &&
                                item.title !== chosenTrekOne.title &&
                                item.title !== chosenTrekTwo.title &&
                                item.title !== chosenTrekThree.title
                            )
                            .map((item) => (
                              <li
                                key={item.id}
                                className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                onMouseDown={() => {
                                  setChosenTrekFour(item);
                                  setValidTrekFour(true);
                                  setShowDropdownFour(false);
                                }}
                              >
                                <div className="flex flex-row justify-between items-start w-full">
                                  <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                    {item.title}
                                  </span>
                                </div>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {isMobile && (
                <div className="flex flex-col gap-4 w-full min-w-fit justify-center items-center">
                  <div className="flex flex-row gap-4 justify-center items-center w-full min-w-60 border border-gray-200 rounded-lg p-4">
                    {chosenTrekOne && validTrekOne ? (
                      <img
                        src={chosenTrekOne.image_url}
                        alt={chosenTrekOne.title}
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full max-w-[100px] h-[100px] bg-black/20 rounded-lg"></div>
                    )}
                    <div className="flex flex-col gap-4 justify-center items-center align-middle w-full">
                      {validTrekOne ? (
                        <div
                          className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                          onClick={() => {
                            setChosenTrekOne("");
                            setTempInputOne("");
                            setValidTrekOne(false);
                            setPlaceholderOne("Choose Trek");
                          }}
                        >
                          <RiCloseFill />
                        </div>
                      ) : (
                        <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                      )}
                      <div className="relative w-full min-w-fit">
                        <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                        <input
                          className="w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                          value={
                            chosenTrekOne === "" ? "" : chosenTrekOne.title
                          }
                          onChange={(e) => {
                            setTempInputOne(e.target.value);
                            setChosenTrekOne(e.target.value);
                          }}
                          type="text"
                          name="random_name_123"
                          placeholder={placeholderOne}
                          onFocus={() => {
                            setShowDropdownOne(true);
                            setPlaceholderOne("");
                            setValidTrekOne(false);
                          }}
                          onBlur={() => {
                            setShowDropdownOne(false);
                            if (!chosenTrekOne) {
                              setPlaceholderOne("Choose Trek");
                            } else {
                              if (allSuggestions.includes(chosenTrekOne)) {
                                setValidTrekOne(true);
                              }
                            }
                          }}
                        />
                        {showDropdownOne && allSuggestions.length > 0 && (
                          <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                            {allSuggestions
                              .filter(
                                (item) =>
                                  item.title
                                    .toLowerCase()
                                    .includes(tempInputOne.toLowerCase()) &&
                                  item.title !== chosenTrekTwo.title &&
                                  item.title !== chosenTrekThree.title &&
                                  item.title !== chosenTrekFour.title
                              )
                              .map((item) => (
                                <li
                                  key={item.id}
                                  className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                  onMouseDown={() => {
                                    setChosenTrekOne(item);
                                    setValidTrekOne(true);
                                    setShowDropdownOne(false);
                                  }}
                                >
                                  <div className="flex flex-row justify-between items-start w-full">
                                    <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                      {item.title}
                                    </span>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 justify-center items-center w-full min-w-60 border border-gray-200 rounded-lg p-4">
                    {chosenTrekTwo && validTrekTwo ? (
                      <img
                        src={chosenTrekTwo.image_url}
                        alt={chosenTrekTwo.title}
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full max-w-[100px] h-[100px] bg-black/20 rounded-lg"></div>
                    )}
                    <div className="flex flex-col gap-4 justify-center items-center align-middle w-full">
                      {validTrekTwo ? (
                        <div
                          className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                          onClick={() => {
                            setChosenTrekTwo("");
                            setTempInputTwo("");
                            setValidTrekTwo(false);
                            setPlaceholderTwo("Choose Trek");
                          }}
                        >
                          <RiCloseFill />
                        </div>
                      ) : (
                        <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                      )}
                      <div className="relative w-full min-w-fit">
                        <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                        <input
                          className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                          value={
                            chosenTrekTwo === "" ? "" : chosenTrekTwo.title
                          }
                          onChange={(e) => {
                            setTempInputTwo(e.target.value);
                            setChosenTrekTwo(e.target.value);
                          }}
                          type="text"
                          name="random_name_123"
                          placeholder={placeholderTwo}
                          onFocus={() => {
                            setShowDropdownTwo(true);
                            setPlaceholderTwo("");
                            setValidTrekTwo(false);
                          }}
                          onBlur={() => {
                            setShowDropdownTwo(false);
                            if (!chosenTrekTwo) {
                              setPlaceholderTwo("Choose Trek");
                            } else {
                              if (allSuggestions.includes(chosenTrekTwo)) {
                                setValidTrekTwo(true);
                              }
                            }
                          }}
                        />
                        {showDropdownTwo && allSuggestions.length > 0 && (
                          <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                            {allSuggestions
                              .filter(
                                (item) =>
                                  item.title
                                    .toLowerCase()
                                    .includes(tempInputTwo.toLowerCase()) &&
                                  item.title !== chosenTrekOne.title &&
                                  item.title !== chosenTrekThree.title &&
                                  item.title !== chosenTrekFour.title
                              )
                              .map((item) => (
                                <li
                                  key={item.id}
                                  className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                  onMouseDown={() => {
                                    setChosenTrekTwo(item);
                                    setValidTrekTwo(true);
                                    setShowDropdownTwo(false);
                                  }}
                                >
                                  <div className="flex flex-row justify-between items-start w-full">
                                    <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                      {item.title}
                                    </span>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 justify-center items-center w-full min-w-60 border border-gray-200 rounded-lg p-4">
                    {chosenTrekThree && validTrekThree ? (
                      <img
                        src={chosenTrekThree.image_url}
                        alt={chosenTrekThree.title}
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full max-w-[100px] h-[100px] bg-black/20 rounded-lg"></div>
                    )}
                    <div className="flex flex-col gap-4 justify-center items-center align-middle w-full">
                      {validTrekThree ? (
                        <div
                          className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                          onClick={() => {
                            setChosenTrekThree("");
                            setTempInputThree("");
                            setValidTrekThree(false);
                            setPlaceholderThree("Choose Trek");
                          }}
                        >
                          <RiCloseFill />
                        </div>
                      ) : (
                        <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                      )}
                      <div className="relative w-full min-w-fit">
                        <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                        <input
                          className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                          value={
                            chosenTrekThree === "" ? "" : chosenTrekThree.title
                          }
                          onChange={(e) => {
                            setTempInputThree(e.target.value);
                            setChosenTrekThree(e.target.value);
                          }}
                          type="text"
                          name="random_name_123"
                          placeholder={placeholderThree}
                          onFocus={() => {
                            setShowDropdownThree(true);
                            setPlaceholderThree("");
                            setValidTrekThree(false);
                          }}
                          onBlur={() => {
                            setShowDropdownThree(false);
                            if (!chosenTrekThree) {
                              setPlaceholderThree("Choose Trek");
                            } else {
                              if (allSuggestions.includes(chosenTrekThree)) {
                                setValidTrekThree(true);
                              }
                            }
                          }}
                        />
                        {showDropdownThree && allSuggestions.length > 0 && (
                          <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                            {allSuggestions
                              .filter(
                                (item) =>
                                  item.title
                                    .toLowerCase()
                                    .includes(tempInputThree.toLowerCase()) &&
                                  item.title !== chosenTrekOne.title &&
                                  item.title !== chosenTrekTwo.title &&
                                  item.title !== chosenTrekFour.title
                              )
                              .map((item) => (
                                <li
                                  key={item.id}
                                  className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                  onMouseDown={() => {
                                    setChosenTrekThree(item);
                                    setValidTrekThree(true);
                                    setShowDropdownThree(false);
                                  }}
                                >
                                  <div className="flex flex-row justify-between items-start w-full">
                                    <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                      {item.title}
                                    </span>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 justify-center items-center w-full min-w-60 border border-gray-200 rounded-lg p-4">
                    {chosenTrekFour && validTrekFour ? (
                      <img
                        src={chosenTrekFour.image_url}
                        alt={chosenTrekFour.title}
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full max-w-[100px] h-[100px] bg-black/20 rounded-lg"></div>
                    )}
                    <div className="flex flex-col gap-4 justify-center items-center align-middle w-full">
                      {validTrekFour ? (
                        <div
                          className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                          onClick={() => {
                            setChosenTrekFour("");
                            setTempInputFour("");
                            setValidTrekFour(false);
                            setPlaceholderFour("Choose Trek");
                          }}
                        >
                          <RiCloseFill />
                        </div>
                      ) : (
                        <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                      )}
                      <div className="relative w-full min-w-fit">
                        <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                        <input
                          className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                          value={
                            chosenTrekFour === "" ? "" : chosenTrekFour.title
                          }
                          onChange={(e) => {
                            setTempInputFour(e.target.value);
                            setChosenTrekFour(e.target.value);
                          }}
                          type="text"
                          name="random_name_123"
                          placeholder={placeholderFour}
                          onFocus={() => {
                            setShowDropdownFour(true);
                            setPlaceholderFour("");
                            setValidTrekFour(false);
                          }}
                          onBlur={() => {
                            setShowDropdownFour(false);
                            if (!chosenTrekFour) {
                              setPlaceholderFour("Choose Trek");
                            } else {
                              if (allSuggestions.includes(chosenTrekFour)) {
                                setValidTrekFour(true);
                              }
                            }
                          }}
                        />
                        {showDropdownFour && allSuggestions.length > 0 && (
                          <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                            {allSuggestions
                              .filter(
                                (item) =>
                                  item.title
                                    .toLowerCase()
                                    .includes(tempInputFour.toLowerCase()) &&
                                  item.title !== chosenTrekOne.title &&
                                  item.title !== chosenTrekTwo.title &&
                                  item.title !== chosenTrekThree.title
                              )
                              .map((item) => (
                                <li
                                  key={item.id}
                                  className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                  onMouseDown={() => {
                                    setChosenTrekFour(item);
                                    setValidTrekFour(true);
                                    setShowDropdownFour(false);
                                  }}
                                >
                                  <div className="flex flex-row justify-between items-start w-full">
                                    <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                      {item.title}
                                    </span>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="font-normal">
              <div className="flex flex-row justify-between items-center w-full px-4 py-10">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  onClick={() => {
                    handleBack();
                  }}
                  className="!border-2 !border-gray-300 !bg-slate-300 !text-black rounded-full !px-8 !py-3 !text-base !font-semibold"
                  rounded
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  rounded
                  disabled={
                    !(
                      validTrekOne ||
                      validTrekTwo ||
                      validTrekThree ||
                      validTrekFour
                    )
                  }
                  onClick={() => {
                    handleNext();
                  }}
                  className="!border-2 !border-footer-main !bg-footer-main !text-white !rounded-full !px-8 !py-3 !text-base !font-semibold"
                />
              </div>
              <Footer />
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div className="stepper font-medium w-full min-h-screen flex flex-col justify-between items-center">
            {!isMobile && (
              <Header link={"https://comparetreks.scoutripper.com/"} />
            )}
            {isMobile && (
              <div className="w-screen flex items-center justify-between flex-row pt-4 px-4">
                <img src={Logo} alt="Logo" className="h-10" />
                <a
                  href={"https://comparetreks.scoutripper.com/"}
                  target="_self"
                >
                  <img src={Close} alt="Close" className="h-3 cursor-pointer" />
                </a>
              </div>
            )}
            <div className="max-w-[1440px] w-full flex flex-col justify-center items-center flex-grow">
              <h1 className="pt-4 sm:pt-0 font-bold text-2xl sm:text-3xl text-header-main pb-2 text-start sm:text-center px-4">
                Trek Smarter: Compare Your Options
              </h1>
              <h3 className="font-normal text-base text-gray-500 pb-6 text-start sm:text-center px-4">
                Compare treks by difficulty, altitude, duration & highlights to
                find your perfect trekking experience.
              </h3>
              {!isMobile && (
                <div
                  className="flex flex-row gap-4 justify-center items-center w-fit rounded-full px-4 py-3 bg-[#062F30]/5 font-semibold cursor-pointer"
                  onClick={() => {
                    const numCompared = [
                      chosenTrekOne,
                      chosenTrekTwo,
                      chosenTrekThree,
                      chosenTrekFour,
                    ].filter((item) => item !== "").length;

                    const comparedLocations = [
                      chosenTrekOne,
                      chosenTrekTwo,
                      chosenTrekThree,
                      chosenTrekFour,
                    ]
                      .filter((item) => item !== "")
                      .map((item) => item.locationName);

                    const uniqueLocations = Array.from(
                      new Set(comparedLocations)
                    );

                    console.log(uniqueLocations);

                    const message = `
                  
Hi, 

Here is the ${numCompared} trek comparisons for you in ${uniqueLocations.join(
                      " & "
                    )}.

${
  chosenTrekOne &&
  `Trek 1:
  Name: ${chosenTrekOne.title}
  Location: ${chosenTrekOne.locationName}
  Price: ₹${chosenTrekOne.price}
  Duration: ${chosenTrekOne.duration / 24} Days
  Link: ${chosenTrekOne.url}`
}

${
  chosenTrekTwo &&
  `Trek 2:
  Name: ${chosenTrekTwo.title}
  Location: ${chosenTrekTwo.locationName}
  Price: ₹${chosenTrekTwo.price}
  Duration: ${chosenTrekTwo.duration / 24} Days
  Link: ${chosenTrekTwo.url}`
}

${
  chosenTrekThree &&
  `Trek 3:
  Name: ${chosenTrekThree.title}
  Location: ${chosenTrekThree.locationName}
  Price: ₹${chosenTrekThree.price}
  Duration: ${chosenTrekThree.duration / 24} Days
  Link: ${chosenTrekThree.url}`
}

${
  chosenTrekFour &&
  `Trek 4:
  Name: ${chosenTrekFour.title}
  Location: ${chosenTrekFour.locationName}
  Price: ₹${chosenTrekFour.price}
  Duration: ${chosenTrekFour.duration / 24} Days
  Link: ${chosenTrekFour.url}`
}
_*Let's finalize and plan this together.*_

For any questions or more details, feel free to reach out to the us. 

Click here to compare more: https://comparetreks.scoutripper.com/

Best regards,
Scoutripper`;

                    console.log(message);
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(message)}`,
                      "_blank"
                    );
                  }}
                >
                  <img src={Whatsapp} alt="Whatsapp" className="h-5" />
                  <p className="text-sm">Share on Whatsapp</p>
                </div>
              )}
              {isMobile && (
                <div className="bg-[#FA8232]/5 w-fit flex flex-row gap-4 justify-center items-center rounded-md border border-[#FA8232]/80 p-2 mx-4 mt-1 mb-2 text-center">
                  <HiArrowLeftCircle className="text-[#FA8232]/80 w-[17px] h-[17px]" />
                  <p className="text-[#FA8232]/80 text-[12px] font-medium">
                    Please scroll Left to Right to check your trek comparison
                  </p>
                  <HiArrowRightCircle className="text-[#FA8232]/80 w-[17px] h-[17px]" />
                </div>
              )}
              <div className="w-full overflow-x-auto pt-6">
                <table className="w-full table-auto border-collapse border border-gray-200 text-left">
                  <tbody>
                    {[
                      { label: "Compare Your Options", key: "grade" },
                      // { label: "Grade & Difficulty", key: "grade" },
                      { label: "Check Details", key: "url" },
                      { label: "Price", key: "price" },
                      { label: "Duration", key: "duration" },
                      { label: "Distance", key: "total_distance" },
                      { label: "Altitude", key: "altitude" },
                      { label: "Start - End Point", key: "locationName" },
                      { label: "Ratings/Reviews", key: "review_score" },
                      // { label: "Highlights", key: "url" },
                      { label: "Inclusions", key: "include" },
                      { label: "Exclusions", key: "exclude" },
                      { label: "Things to Carry", key: "url" },
                    ].map((item) => (
                      <tr
                        key={item.key}
                        className="odd:bg-white even:bg-[#F2F4F5]"
                      >
                        <td className="border border-gray-200 p-4 min-w-20 sm:min-w-60 sticky left-0 bg-white z-40 shadow-2xl">
                          {item.label === "Compare Your Options" ? (
                            <div className="flex justify-start items-center">
                              <p className="text-2xl font-semibold text-header-main">
                                Compare Your Options
                              </p>
                            </div>
                          ) : (
                            <div className="flex text-xs sm:text-sm justify-start sm:justify-center items-center sm:text-center text-header-main font-semibold text-start">
                              <p className="text-nowrap">{item.label} →</p>
                            </div>
                          )}
                        </td>
                        <td className="border border-gray-200 p-4">
                          {item.label === "Grade & Difficulty" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekOne &&
                                getDifficultySVG(chosenTrekOne.grade)}
                              {!chosenTrekOne && <p>-</p>}
                            </div>
                          ) : item.label === "Check Details" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekOne && (
                                <Button
                                  label="Details/Book"
                                  icon="pi pi-external-link"
                                  iconPos="right"
                                  rounded
                                  onClick={() => {
                                    window.open(chosenTrekOne.url, "_blank");
                                  }}
                                  className="!border-2 !border-footer-main !bg-footer-main !text-white !rounded-sm !px-8 !py-3 !text-sm !font-semibold"
                                />
                              )}
                              {!chosenTrekOne && <p>-</p>}
                            </div>
                          ) : item.label === "Price" ? (
                            <div className="flex justify-center items-center text-footer-main font-bold text-sm">
                              {chosenTrekOne &&
                                "₹" + parseInt(chosenTrekOne.price)}
                              {!chosenTrekOne && <p>₹-</p>}
                            </div>
                          ) : item.label === "Duration" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekOne && (
                                <p>
                                  {chosenTrekOne.duration / 24} Days /{" "}
                                  {chosenTrekOne.duration / 24 - 1} Nights
                                </p>
                              )}
                              {!chosenTrekOne && <p>-</p>}
                            </div>
                          ) : item.label === "Distance" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekOne && (
                                <p>{chosenTrekOne.total_distance} Kms</p>
                              )}
                              {!chosenTrekOne && <p>-</p>}
                            </div>
                          ) : item.label === "Altitude" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekOne && (
                                <p>{formatAltitude(chosenTrekOne.altitude)}</p>
                              )}
                              {!chosenTrekOne && <p>-</p>}
                            </div>
                          ) : item.label === "Start - End Point" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekOne && (
                                <p>{chosenTrekOne.locationName}</p>
                              )}
                              {!chosenTrekOne && <p>-</p>}
                            </div>
                          ) : item.label === "Ratings/Reviews" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekOne && (
                                <div className="flex flex-row gap-2">
                                  {formatRatings(
                                    parseInt(chosenTrekOne.review_score)
                                  )}
                                </div>
                              )}
                              {!chosenTrekOne && <p>-</p>}
                            </div>
                          ) : item.label === "Highlights" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekOne && (
                                <p>{chosenTrekOne.highlights}</p>
                              )}
                              {!chosenTrekOne && <p>-</p>}
                            </div>
                          ) : item.label === "Inclusions" ? (
                            <div>
                              {chosenTrekOne && (
                                <div className="flex flex-row justify-between items-center text-sm">
                                  <div className="flex flex-col gap-4 justify-start items-start pr-1">
                                    <p>
                                      {
                                        JSON.parse(chosenTrekOne.include)[0]
                                          .title
                                      }
                                    </p>
                                    {JSON.parse(chosenTrekOne.include).length >
                                      1 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekOne.include)[1]
                                            .title
                                        }
                                      </p>
                                    )}
                                    {JSON.parse(chosenTrekOne.include).length >
                                      2 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekOne.include)[2]
                                            .title
                                        }
                                      </p>
                                    )}
                                  </div>
                                  {JSON.parse(chosenTrekOne.include).length >
                                    3 && (
                                    <Badge
                                      value={
                                        "+" +
                                        (JSON.parse(chosenTrekOne.include)
                                          .length -
                                          3)
                                      }
                                      severity="dark"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setShowIncludes(
                                          JSON.parse(chosenTrekOne.include)
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                              {!chosenTrekOne && (
                                <div className="flex flex-row justify-center items-center text-sm">
                                  <p>-</p>
                                </div>
                              )}
                            </div>
                          ) : item.label === "Exclusions" ? (
                            <div>
                              {chosenTrekOne && (
                                <div className="flex flex-row justify-between items-center text-sm">
                                  <div className="flex flex-col gap-4 justify-start items-start pr-1">
                                    <p>
                                      {
                                        JSON.parse(chosenTrekOne.exclude)[0]
                                          .title
                                      }
                                    </p>
                                    {JSON.parse(chosenTrekOne.exclude).length >
                                      1 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekOne.exclude)[1]
                                            .title
                                        }
                                      </p>
                                    )}
                                    {JSON.parse(chosenTrekOne.exclude).length >
                                      2 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekOne.exclude)[2]
                                            .title
                                        }
                                      </p>
                                    )}
                                  </div>
                                  {JSON.parse(chosenTrekOne.exclude).length >
                                    3 && (
                                    <Badge
                                      value={
                                        "+" +
                                        (JSON.parse(chosenTrekOne.exclude)
                                          .length -
                                          3)
                                      }
                                      severity="dark"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setShowExcludes(
                                          JSON.parse(chosenTrekOne.exclude)
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                              {!chosenTrekOne && (
                                <div className="flex flex-row justify-center items-center text-sm">
                                  <p>-</p>
                                </div>
                              )}
                            </div>
                          ) : item.label === "Things to Carry" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekOne && (
                                <Button
                                  label="Check Essentials"
                                  icon="pi pi-external-link"
                                  iconPos="right"
                                  rounded
                                  onClick={() => {
                                    window.open(
                                      "https://scoutripper.com/blog/trekking-essentials-guide/",
                                      "_blank"
                                    );
                                  }}
                                  className="!border-2 !border-gray-200 !bg-gray-200 !text-header-main !rounded-sm !px-3 !py-3 !text-sm !font-semibold"
                                />
                              )}
                              {!chosenTrekOne && <p>-</p>}
                            </div>
                          ) : item.label === "Compare Your Options" ? (
                            <>
                              <div className="flex flex-col gap-4 justify-center items-center w-full min-w-60">
                                {validTrekOne ? (
                                  <div
                                    className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                                    onClick={() => {
                                      setChosenTrekOne("");
                                      setTempInputOne("");
                                      setValidTrekOne(false);
                                      setPlaceholderOne("Choose Trek");
                                    }}
                                  >
                                    <RiCloseFill />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                                )}
                                {chosenTrekOne && validTrekOne ? (
                                  <img
                                    src={chosenTrekOne.image_url}
                                    alt={chosenTrekOne.title}
                                    className="w-48 h-36 object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-48 h-36 bg-black/20 rounded-lg"></div>
                                )}
                                <div className="relative w-full min-w-fit">
                                  <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                                  <input
                                    className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                                    value={
                                      !validTrekOne
                                        ? tempInputOne
                                        : chosenTrekOne.title
                                    }
                                    onChange={(e) => {
                                      setTempInputOne(e.target.value);
                                    }}
                                    type="text"
                                    name="random_name_123"
                                    placeholder={placeholderOne}
                                    onFocus={() => {
                                      setShowDropdownOne(true);
                                      setPlaceholderOne("");
                                      setValidTrekOne(false);
                                    }}
                                    onBlur={() => {
                                      setShowDropdownOne(false);
                                      setTempInputOne("");
                                      if (!chosenTrekOne) {
                                        setPlaceholderOne("Choose Trek");
                                      } else {
                                        if (
                                          allSuggestions.includes(chosenTrekOne)
                                        ) {
                                          setValidTrekOne(true);
                                        }
                                      }
                                    }}
                                  />
                                  {showDropdownOne &&
                                    allSuggestions.length > 0 && (
                                      <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                                        {allSuggestions
                                          .filter(
                                            (item) =>
                                              item.title
                                                .toLowerCase()
                                                .includes(
                                                  tempInputOne.toLowerCase()
                                                ) &&
                                              item.title !==
                                                chosenTrekTwo.title &&
                                              item.title !==
                                                chosenTrekThree.title &&
                                              item.title !==
                                                chosenTrekFour.title
                                          )
                                          .map((item) => (
                                            <li
                                              key={item.id}
                                              className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                              onMouseDown={() => {
                                                setChosenTrekOne(item);
                                                setValidTrekOne(true);
                                                setShowDropdownOne(false);
                                              }}
                                            >
                                              <div className="flex flex-row justify-between items-start w-full">
                                                <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                                  {item.title}
                                                </span>
                                              </div>
                                            </li>
                                          ))}
                                      </ul>
                                    )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <p>-</p>
                            </>
                          )}
                        </td>
                        <td className="border border-gray-200 p-4">
                          {item.label === "Grade & Difficulty" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekTwo &&
                                getDifficultySVG(chosenTrekTwo.grade)}
                              {!chosenTrekTwo && <p>-</p>}
                            </div>
                          ) : item.label === "Check Details" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekTwo && (
                                <Button
                                  label="Details/Book"
                                  icon="pi pi-external-link"
                                  iconPos="right"
                                  rounded
                                  onClick={() => {
                                    window.open(chosenTrekTwo.url, "_blank");
                                  }}
                                  className="!border-2 !text-sm !border-footer-main !bg-footer-main !text-white !rounded-sm !px-8 !py-3 !font-semibold"
                                />
                              )}
                              {!chosenTrekTwo && <p>-</p>}
                            </div>
                          ) : item.label === "Price" ? (
                            <div className="flex justify-center items-center text-footer-main font-bold text-sm">
                              {chosenTrekTwo &&
                                "₹" + parseInt(chosenTrekTwo.price)}
                              {!chosenTrekTwo && <p>₹-</p>}
                            </div>
                          ) : item.label === "Duration" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekTwo && (
                                <p>
                                  {chosenTrekTwo.duration / 24} Days /{" "}
                                  {chosenTrekTwo.duration / 24 - 1} Nights
                                </p>
                              )}
                              {!chosenTrekTwo && <p>-</p>}
                            </div>
                          ) : item.label === "Distance" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekTwo && (
                                <p>{chosenTrekTwo.total_distance} Kms</p>
                              )}
                              {!chosenTrekTwo && <p>-</p>}
                            </div>
                          ) : item.label === "Altitude" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekTwo && (
                                <p>{formatAltitude(chosenTrekTwo.altitude)}</p>
                              )}
                              {!chosenTrekTwo && <p>-</p>}
                            </div>
                          ) : item.label === "Start - End Point" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekTwo && (
                                <p>{chosenTrekTwo.locationName}</p>
                              )}
                              {!chosenTrekTwo && <p>-</p>}
                            </div>
                          ) : item.label === "Ratings/Reviews" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekTwo && (
                                <div className="flex flex-row gap-2">
                                  {formatRatings(
                                    parseInt(chosenTrekTwo.review_score)
                                  )}
                                </div>
                              )}
                              {!chosenTrekTwo && <p>-</p>}
                            </div>
                          ) : item.label === "Highlights" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekTwo && (
                                <p>{chosenTrekTwo.highlights}</p>
                              )}
                              {!chosenTrekTwo && <p>-</p>}
                            </div>
                          ) : item.label === "Inclusions" ? (
                            <div>
                              {chosenTrekTwo && (
                                <div className="flex flex-row justify-between items-center text-sm">
                                  <div className="flex flex-col gap-4 justify-start items-start pr-1">
                                    <p>
                                      {
                                        JSON.parse(chosenTrekTwo.include)[0]
                                          .title
                                      }
                                    </p>
                                    {JSON.parse(chosenTrekTwo.include).length >
                                      1 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekTwo.include)[1]
                                            .title
                                        }
                                      </p>
                                    )}
                                    {JSON.parse(chosenTrekTwo.include).length >
                                      2 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekTwo.include)[2]
                                            .title
                                        }
                                      </p>
                                    )}
                                  </div>
                                  {JSON.parse(chosenTrekTwo.include).length >
                                    3 && (
                                    <Badge
                                      value={
                                        "+" +
                                        (JSON.parse(chosenTrekTwo.include)
                                          .length -
                                          3)
                                      }
                                      severity="dark"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setShowIncludes(
                                          JSON.parse(chosenTrekTwo.include)
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                              {!chosenTrekTwo && (
                                <div className="flex flex-row justify-center items-center text-sm">
                                  <p>-</p>
                                </div>
                              )}
                            </div>
                          ) : item.label === "Exclusions" ? (
                            <div>
                              {chosenTrekTwo && (
                                <div className="flex flex-row justify-between items-center text-sm">
                                  <div className="flex flex-col gap-4 justify-start items-start pr-1">
                                    <p>
                                      {
                                        JSON.parse(chosenTrekTwo.exclude)[0]
                                          .title
                                      }
                                    </p>
                                    {JSON.parse(chosenTrekTwo.exclude).length >
                                      1 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekTwo.exclude)[1]
                                            .title
                                        }
                                      </p>
                                    )}
                                    {JSON.parse(chosenTrekTwo.exclude).length >
                                      2 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekTwo.exclude)[2]
                                            .title
                                        }
                                      </p>
                                    )}
                                  </div>
                                  {JSON.parse(chosenTrekTwo.exclude).length >
                                    3 && (
                                    <Badge
                                      value={
                                        "+" +
                                        (JSON.parse(chosenTrekTwo.exclude)
                                          .length -
                                          3)
                                      }
                                      severity="dark"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setShowExcludes(
                                          JSON.parse(chosenTrekTwo.exclude)
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                              {!chosenTrekTwo && (
                                <div className="flex flex-row justify-center items-center text-sm">
                                  <p>-</p>
                                </div>
                              )}
                            </div>
                          ) : item.label === "Things to Carry" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekTwo && (
                                <Button
                                  label="Check Essentials"
                                  icon="pi pi-external-link"
                                  iconPos="right"
                                  rounded
                                  onClick={() => {
                                    window.open(
                                      "https://scoutripper.com/blog/trekking-essentials-guide/",
                                      "_blank"
                                    );
                                  }}
                                  className="!border-2 !border-gray-200 !bg-gray-200 !text-header-main !rounded-sm !px-3 !py-3 !text-sm !font-semibold"
                                />
                              )}
                              {!chosenTrekTwo && <p>-</p>}
                            </div>
                          ) : item.label === "Compare Your Options" ? (
                            <>
                              <div className="flex flex-col gap-4 justify-center items-center w-full min-w-60">
                                {validTrekTwo ? (
                                  <div
                                    className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                                    onClick={() => {
                                      setChosenTrekTwo("");
                                      setTempInputTwo("");
                                      setValidTrekTwo(false);
                                      setPlaceholderTwo("Choose Trek");
                                    }}
                                  >
                                    <RiCloseFill />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                                )}
                                {chosenTrekTwo && validTrekTwo ? (
                                  <img
                                    src={chosenTrekTwo.image_url}
                                    alt={chosenTrekTwo.title}
                                    className="w-48 h-36 object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-48 h-36 bg-black/20 rounded-lg"></div>
                                )}
                                <div className="relative w-full min-w-fit">
                                  <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                                  <input
                                    className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                                    value={
                                      !validTrekTwo
                                        ? tempInputTwo
                                        : chosenTrekTwo.title
                                    }
                                    onChange={(e) => {
                                      setTempInputTwo(e.target.value);
                                    }}
                                    type="text"
                                    name="random_name_123"
                                    placeholder={placeholderTwo}
                                    onFocus={() => {
                                      setShowDropdownTwo(true);
                                      setPlaceholderTwo("");
                                      setValidTrekTwo(false);
                                    }}
                                    onBlur={() => {
                                      setShowDropdownTwo(false);
                                      setTempInputTwo("");
                                      if (!chosenTrekTwo) {
                                        setPlaceholderTwo("Choose Trek");
                                      } else {
                                        if (
                                          allSuggestions.includes(chosenTrekTwo)
                                        ) {
                                          setValidTrekTwo(true);
                                        }
                                      }
                                    }}
                                  />
                                  {showDropdownTwo &&
                                    allSuggestions.length > 0 && (
                                      <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                                        {allSuggestions
                                          .filter(
                                            (item) =>
                                              item.title
                                                .toLowerCase()
                                                .includes(
                                                  tempInputTwo.toLowerCase()
                                                ) &&
                                              item.title !==
                                                chosenTrekOne.title &&
                                              item.title !==
                                                chosenTrekThree.title &&
                                              item.title !==
                                                chosenTrekFour.title
                                          )
                                          .map((item) => (
                                            <li
                                              key={item.id}
                                              className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                              onMouseDown={() => {
                                                setChosenTrekTwo(item);
                                                setValidTrekTwo(true);
                                                setShowDropdownTwo(false);
                                              }}
                                            >
                                              <div className="flex flex-row justify-between items-start w-full">
                                                <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                                  {item.title}
                                                </span>
                                              </div>
                                            </li>
                                          ))}
                                      </ul>
                                    )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <p>-</p>
                            </>
                          )}
                        </td>
                        <td className="border border-gray-200 p-4">
                          {item.label === "Grade & Difficulty" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekThree &&
                                getDifficultySVG(chosenTrekThree.grade)}
                              {!chosenTrekThree && <p>-</p>}
                            </div>
                          ) : item.label === "Check Details" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekThree && (
                                <Button
                                  label="Details/Book"
                                  icon="pi pi-external-link"
                                  iconPos="right"
                                  rounded
                                  onClick={() => {
                                    window.open(chosenTrekThree.url, "_blank");
                                  }}
                                  className="!border-2 !border-footer-main !bg-footer-main !text-white !rounded-sm !px-8 !py-3 !text-sm !font-semibold"
                                />
                              )}
                              {!chosenTrekThree && <p>-</p>}
                            </div>
                          ) : item.label === "Price" ? (
                            <div className="flex justify-center items-center text-footer-main font-bold text-sm">
                              {chosenTrekThree &&
                                "₹" + parseInt(chosenTrekThree.price)}
                              {!chosenTrekThree && <p>₹-</p>}
                            </div>
                          ) : item.label === "Duration" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekThree && (
                                <p>
                                  {chosenTrekThree.duration / 24} Days /{" "}
                                  {chosenTrekThree.duration / 24 - 1} Nights
                                </p>
                              )}
                              {!chosenTrekThree && <p>-</p>}
                            </div>
                          ) : item.label === "Distance" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekThree && (
                                <p>{chosenTrekThree.total_distance} Kms</p>
                              )}
                              {!chosenTrekThree && <p>-</p>}
                            </div>
                          ) : item.label === "Altitude" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekThree && (
                                <p>
                                  {formatAltitude(chosenTrekThree.altitude)}
                                </p>
                              )}
                              {!chosenTrekThree && <p>-</p>}
                            </div>
                          ) : item.label === "Start - End Point" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekThree && (
                                <p>{chosenTrekThree.locationName}</p>
                              )}
                              {!chosenTrekThree && <p>-</p>}
                            </div>
                          ) : item.label === "Ratings/Reviews" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekThree && (
                                <div className="flex flex-row gap-2">
                                  {formatRatings(
                                    parseInt(chosenTrekThree.review_score)
                                  )}
                                </div>
                              )}
                              {!chosenTrekThree && <p>-</p>}
                            </div>
                          ) : item.label === "Highlights" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekThree && (
                                <p>{chosenTrekThree.highlights}</p>
                              )}
                              {!chosenTrekThree && <p>-</p>}
                            </div>
                          ) : item.label === "Inclusions" ? (
                            <div className="text-sm">
                              {chosenTrekThree && (
                                <div className="flex flex-row justify-between items-center">
                                  <div className="flex flex-col gap-4 justify-start items-start pr-1">
                                    <p>
                                      {
                                        JSON.parse(chosenTrekThree.include)[0]
                                          .title
                                      }
                                    </p>
                                    {JSON.parse(chosenTrekThree.include)
                                      .length > 1 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekThree.include)[1]
                                            .title
                                        }
                                      </p>
                                    )}
                                    {JSON.parse(chosenTrekThree.include)
                                      .length > 2 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekThree.include)[2]
                                            .title
                                        }
                                      </p>
                                    )}
                                  </div>
                                  {JSON.parse(chosenTrekThree.include).length >
                                    3 && (
                                    <Badge
                                      value={
                                        "+" +
                                        (JSON.parse(chosenTrekThree.include)
                                          .length -
                                          3)
                                      }
                                      severity="dark"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setShowIncludes(
                                          JSON.parse(chosenTrekThree.include)
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                              {!chosenTrekThree && (
                                <div className="flex flex-row justify-center items-center">
                                  <p>-</p>
                                </div>
                              )}
                            </div>
                          ) : item.label === "Exclusions" ? (
                            <div className="text-sm">
                              {chosenTrekThree && (
                                <div className="flex flex-row justify-between items-center">
                                  <div className="flex flex-col gap-4 justify-start items-start pr-1">
                                    <p>
                                      {
                                        JSON.parse(chosenTrekThree.exclude)[0]
                                          .title
                                      }
                                    </p>
                                    {JSON.parse(chosenTrekThree.exclude)
                                      .length > 1 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekThree.exclude)[1]
                                            .title
                                        }
                                      </p>
                                    )}
                                    {JSON.parse(chosenTrekThree.exclude)
                                      .length > 2 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekThree.exclude)[2]
                                            .title
                                        }
                                      </p>
                                    )}
                                  </div>
                                  {JSON.parse(chosenTrekThree.exclude).length >
                                    3 && (
                                    <Badge
                                      value={
                                        "+" +
                                        (JSON.parse(chosenTrekThree.exclude)
                                          .length -
                                          3)
                                      }
                                      severity="dark"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setShowExcludes(
                                          JSON.parse(chosenTrekThree.exclude)
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                              {!chosenTrekThree && (
                                <div className="flex flex-row justify-center items-center">
                                  <p>-</p>
                                </div>
                              )}
                            </div>
                          ) : item.label === "Things to Carry" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekThree && (
                                <Button
                                  label="Check Essentials"
                                  icon="pi pi-external-link"
                                  iconPos="right"
                                  rounded
                                  onClick={() => {
                                    window.open(
                                      "https://scoutripper.com/blog/trekking-essentials-guide/",
                                      "_blank"
                                    );
                                  }}
                                  className="!border-2 !border-gray-200 !bg-gray-200 !text-header-main !rounded-sm !px-3 !py-3 !text-sm !font-semibold"
                                />
                              )}
                              {!chosenTrekThree && <p>-</p>}
                            </div>
                          ) : item.label === "Compare Your Options" ? (
                            <>
                              <div className="flex flex-col gap-4 justify-center items-center w-full min-w-60">
                                {validTrekThree ? (
                                  <div
                                    className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                                    onClick={() => {
                                      setChosenTrekThree("");
                                      setTempInputThree("");
                                      setValidTrekThree(false);
                                      setPlaceholderThree("Choose Trek");
                                    }}
                                  >
                                    <RiCloseFill />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                                )}
                                {chosenTrekThree && validTrekThree ? (
                                  <img
                                    src={chosenTrekThree.image_url}
                                    alt={chosenTrekThree.title}
                                    className="w-48 h-36 object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-48 h-36 bg-black/20 rounded-lg"></div>
                                )}
                                <div className="relative w-full min-w-fit">
                                  <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                                  <input
                                    className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                                    value={
                                      !validTrekThree
                                        ? tempInputThree
                                        : chosenTrekThree.title
                                    }
                                    onChange={(e) => {
                                      setTempInputThree(e.target.value);
                                    }}
                                    type="text"
                                    name="random_name_123"
                                    placeholder={placeholderThree}
                                    onFocus={() => {
                                      setShowDropdownThree(true);
                                      setPlaceholderThree("");
                                      setValidTrekThree(false);
                                    }}
                                    onBlur={() => {
                                      setShowDropdownThree(false);
                                      setTempInputThree("");
                                      if (!chosenTrekThree) {
                                        setPlaceholderThree("Choose Trek");
                                      } else {
                                        if (
                                          allSuggestions.includes(
                                            chosenTrekThree
                                          )
                                        ) {
                                          setValidTrekThree(true);
                                        }
                                      }
                                    }}
                                  />
                                  {showDropdownThree &&
                                    allSuggestions.length > 0 && (
                                      <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                                        {allSuggestions
                                          .filter(
                                            (item) =>
                                              item.title
                                                .toLowerCase()
                                                .includes(
                                                  tempInputThree.toLowerCase()
                                                ) &&
                                              item.title !==
                                                chosenTrekOne.title &&
                                              item.title !==
                                                chosenTrekTwo.title &&
                                              item.title !==
                                                chosenTrekFour.title
                                          )
                                          .map((item) => (
                                            <li
                                              key={item.id}
                                              className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                              onMouseDown={() => {
                                                setChosenTrekThree(item);
                                                setValidTrekThree(true);
                                                setShowDropdownThree(false);
                                              }}
                                            >
                                              <div className="flex flex-row justify-between items-start w-full">
                                                <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                                  {item.title}
                                                </span>
                                              </div>
                                            </li>
                                          ))}
                                      </ul>
                                    )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <p>-</p>
                            </>
                          )}
                        </td>
                        <td className="border border-gray-200 p-4">
                          {item.label === "Grade & Difficulty" ? (
                            <div className="flex justify-center items-center">
                              {chosenTrekFour &&
                                getDifficultySVG(chosenTrekFour.grade)}
                              {!chosenTrekFour && <p>-</p>}
                            </div>
                          ) : item.label === "Check Details" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekFour && (
                                <Button
                                  label="Details/Book"
                                  icon="pi pi-external-link"
                                  iconPos="right"
                                  rounded
                                  onClick={() => {
                                    window.open(chosenTrekFour.url, "_blank");
                                  }}
                                  className="!border-2 !border-footer-main !bg-footer-main !text-white !rounded-sm !px-8 !py-3 !text-sm !font-semibold"
                                />
                              )}
                              {!chosenTrekFour && <p>-</p>}
                            </div>
                          ) : item.label === "Price" ? (
                            <div className="flex justify-center items-center text-footer-main font-bold text-sm">
                              {chosenTrekFour &&
                                "₹" + parseInt(chosenTrekFour.price)}
                              {!chosenTrekFour && <p>₹-</p>}
                            </div>
                          ) : item.label === "Duration" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekFour && (
                                <p>
                                  {chosenTrekFour.duration / 24} Days /{" "}
                                  {chosenTrekFour.duration / 24 - 1} Nights
                                </p>
                              )}
                              {!chosenTrekFour && <p>-</p>}
                            </div>
                          ) : item.label === "Distance" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekFour && (
                                <p>{chosenTrekFour.total_distance} Kms</p>
                              )}
                              {!chosenTrekFour && <p>-</p>}
                            </div>
                          ) : item.label === "Altitude" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekFour && (
                                <p>{formatAltitude(chosenTrekFour.altitude)}</p>
                              )}
                              {!chosenTrekFour && <p>-</p>}
                            </div>
                          ) : item.label === "Start - End Point" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekFour && (
                                <p>{chosenTrekFour.locationName}</p>
                              )}
                              {!chosenTrekFour && <p>-</p>}
                            </div>
                          ) : item.label === "Ratings/Reviews" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekFour && (
                                <div className="flex flex-row gap-2">
                                  {formatRatings(
                                    parseInt(chosenTrekFour.review_score)
                                  )}
                                </div>
                              )}
                              {!chosenTrekFour && <p>-</p>}
                            </div>
                          ) : item.label === "Highlights" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekFour && (
                                <p>{chosenTrekFour.highlights}</p>
                              )}
                              {!chosenTrekFour && <p>-</p>}
                            </div>
                          ) : item.label === "Inclusions" ? (
                            <div className="text-sm">
                              {chosenTrekFour && (
                                <div className="flex flex-row justify-between items-center">
                                  <div className="flex flex-col gap-4 justify-start items-start pr-1">
                                    <p>
                                      {
                                        JSON.parse(chosenTrekFour.include)[0]
                                          .title
                                      }
                                    </p>
                                    {JSON.parse(chosenTrekFour.include).length >
                                      1 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekFour.include)[1]
                                            .title
                                        }
                                      </p>
                                    )}
                                    {JSON.parse(chosenTrekFour.include).length >
                                      2 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekFour.include)[2]
                                            .title
                                        }
                                      </p>
                                    )}
                                  </div>
                                  {JSON.parse(chosenTrekFour.include).length >
                                    3 && (
                                    <Badge
                                      value={
                                        "+" +
                                        (JSON.parse(chosenTrekFour.include)
                                          .length -
                                          3)
                                      }
                                      severity="dark"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setShowIncludes(
                                          JSON.parse(chosenTrekFour.include)
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                              {!chosenTrekFour && (
                                <div className="flex flex-row justify-center items-center">
                                  <p>-</p>
                                </div>
                              )}
                            </div>
                          ) : item.label === "Exclusions" ? (
                            <div className="text-sm">
                              {chosenTrekFour && (
                                <div className="flex flex-row justify-between items-center">
                                  <div className="flex flex-col gap-4 justify-start items-start pr-1">
                                    <p>
                                      {
                                        JSON.parse(chosenTrekFour.exclude)[0]
                                          .title
                                      }
                                    </p>
                                    {JSON.parse(chosenTrekFour.exclude).length >
                                      1 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekFour.exclude)[1]
                                            .title
                                        }
                                      </p>
                                    )}
                                    {JSON.parse(chosenTrekFour.exclude).length >
                                      2 && (
                                      <p>
                                        {
                                          JSON.parse(chosenTrekFour.exclude)[2]
                                            .title
                                        }
                                      </p>
                                    )}
                                  </div>
                                  {JSON.parse(chosenTrekFour.exclude).length >
                                    3 && (
                                    <Badge
                                      value={
                                        "+" +
                                        (JSON.parse(chosenTrekFour.exclude)
                                          .length -
                                          3)
                                      }
                                      severity="dark"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setShowExcludes(
                                          JSON.parse(chosenTrekFour.exclude)
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                              {!chosenTrekFour && (
                                <div className="flex flex-row justify-center items-center">
                                  <p>-</p>
                                </div>
                              )}
                            </div>
                          ) : item.label === "Things to Carry" ? (
                            <div className="flex justify-center items-center text-sm">
                              {chosenTrekFour && (
                                <Button
                                  label="Check Essentials"
                                  icon="pi pi-external-link"
                                  iconPos="right"
                                  rounded
                                  onClick={() => {
                                    window.open(
                                      "https://scoutripper.com/blog/trekking-essentials-guide/",
                                      "_blank"
                                    );
                                  }}
                                  className="!border-2 !border-gray-200 !bg-gray-200 !text-header-main !rounded-sm !px-3 !py-3 !text-sm !font-semibold"
                                />
                              )}
                              {!chosenTrekFour && <p>-</p>}
                            </div>
                          ) : item.label === "Compare Your Options" ? (
                            <>
                              <div className="flex flex-col gap-4 justify-center items-center w-full min-w-60">
                                {validTrekFour ? (
                                  <div
                                    className="w-4 h-4 border rounded-full text-red-600 flex justify-center items-center cursor-pointer"
                                    onClick={() => {
                                      setChosenTrekFour("");
                                      setTempInputFour("");
                                      setValidTrekFour(false);
                                      setPlaceholderFour("Choose Trek");
                                    }}
                                  >
                                    <RiCloseFill />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 border rounded-full border-[#929FA5]"></div>
                                )}
                                {chosenTrekFour && validTrekFour ? (
                                  <img
                                    src={chosenTrekFour.image_url}
                                    alt={chosenTrekFour.title}
                                    className="w-48 h-36 object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-48 h-36 bg-black/20 rounded-lg"></div>
                                )}
                                <div className="relative w-full min-w-fit">
                                  <HiOutlinePencil className="absolute top-1 right-2 translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer" />
                                  <input
                                    className="destination w-full h-10 border border-[#DEDEDE] rounded-md px-3 pr-8 py-2 text-sm font-semibold text-header-main focus:outline-none focus:ring-1 focus:ring-footer-main focus:border-side-line-big"
                                    value={
                                      !validTrekFour
                                        ? tempInputFour
                                        : chosenTrekFour.title
                                    }
                                    onChange={(e) => {
                                      setTempInputFour(e.target.value);
                                    }}
                                    type="text"
                                    name="random_name_123"
                                    placeholder={placeholderFour}
                                    onFocus={() => {
                                      setShowDropdownFour(true);
                                      setPlaceholderFour("");
                                      setValidTrekFour(false);
                                    }}
                                    onBlur={() => {
                                      setShowDropdownFour(false);
                                      setTempInputFour("");
                                      if (!chosenTrekFour) {
                                        setPlaceholderFour("Choose Trek");
                                      } else {
                                        if (
                                          allSuggestions.includes(
                                            chosenTrekFour
                                          )
                                        ) {
                                          setValidTrekFour(true);
                                        }
                                      }
                                    }}
                                  />
                                  {showDropdownFour &&
                                    allSuggestions.length > 0 && (
                                      <ul className="absolute w-full bg-white rounded-lg mt-1 shadow-xl max-h-72 overflow-y-auto z-10 border border-[#DEDEDE] p-2">
                                        {allSuggestions
                                          .filter(
                                            (item) =>
                                              item.title
                                                .toLowerCase()
                                                .includes(
                                                  tempInputFour.toLowerCase()
                                                ) &&
                                              item.title !==
                                                chosenTrekOne.title &&
                                              item.title !==
                                                chosenTrekTwo.title &&
                                              item.title !==
                                                chosenTrekThree.title
                                          )
                                          .map((item) => (
                                            <li
                                              key={item.id}
                                              className="px-3 py-3 cursor-pointer hover:bg-side-line-big hover:bg-opacity-50 text-gray-500 hover:text-header-main flex justify-start items-center rounded-md"
                                              onMouseDown={() => {
                                                setChosenTrekFour(item);
                                                setValidTrekFour(true);
                                                setShowDropdownFour(false);
                                              }}
                                            >
                                              <div className="flex flex-row justify-between items-start w-full">
                                                <span className="pr-6 pl-3 text-sm font-semibold text-header-main">
                                                  {item.title}
                                                </span>
                                              </div>
                                            </li>
                                          ))}
                                      </ul>
                                    )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <p>-</p>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {!isMobile && (
              <div className="font-normal">
                <Footer />
              </div>
            )}
            {isMobile && (
              <div className="w-full max-w-7xl flex flex-col justify-center items-center mt-8 sm:mt-0 sm:shadow-none shadow-[0px_-10px_20px_rgba(0,0,0,0.1)]">
                <div className="py-4 sm:py-12 w-full border-t border-gray-200">
                  <h2 className="font-bold text-header-main pb-4 sm:pb-6 text-center">
                    Still Confused? Feel free to talk to us
                  </h2>
                  <div className="flex flex-row gap-4 justify-center items-center">
                    <div
                      className="flex flex-row gap-2 border-2 rounded-full bg-gray-100 border-gray-100 px-2 py-2 justify-center items-center align-middle cursor-pointer transition-colors duration-200 hover:border-footer-main hover:shadow-md hover:shadow-side-line-big hover:bg-footer-main hover:text-white text-[#062f30]"
                      onClick={() => {
                        const numCompared = [
                          chosenTrekOne,
                          chosenTrekTwo,
                          chosenTrekThree,
                          chosenTrekFour,
                        ].filter((item) => item !== "").length;

                        const comparedLocations = [
                          chosenTrekOne,
                          chosenTrekTwo,
                          chosenTrekThree,
                          chosenTrekFour,
                        ]
                          .filter((item) => item !== "")
                          .map((item) => item.locationName);

                        const uniqueLocations = Array.from(
                          new Set(comparedLocations)
                        );

                        console.log(uniqueLocations);

                        const message = `
                    
  Hi, 
  
  Here is the ${numCompared} trek comparisons for you in ${uniqueLocations.join(
                          " & "
                        )}.
  
  ${
    chosenTrekOne &&
    `Trek 1:
    Name: ${chosenTrekOne.title}
    Location: ${chosenTrekOne.locationName}
    Price: ₹${chosenTrekOne.price}
    Duration: ${chosenTrekOne.duration / 24} Days
    Link: ${chosenTrekOne.url}`
  }
  
  ${
    chosenTrekTwo &&
    `Trek 2:
    Name: ${chosenTrekTwo.title}
    Location: ${chosenTrekTwo.locationName}
    Price: ₹${chosenTrekTwo.price}
    Duration: ${chosenTrekTwo.duration / 24} Days
    Link: ${chosenTrekTwo.url}`
  }
  
  ${
    chosenTrekThree &&
    `Trek 3:
    Name: ${chosenTrekThree.title}
    Location: ${chosenTrekThree.locationName}
    Price: ₹${chosenTrekThree.price}
    Duration: ${chosenTrekThree.duration / 24} Days
    Link: ${chosenTrekThree.url}`
  }
  
  ${
    chosenTrekFour &&
    `Trek 4:
    Name: ${chosenTrekFour.title}
    Location: ${chosenTrekFour.locationName}
    Price: ₹${chosenTrekFour.price}
    Duration: ${chosenTrekFour.duration / 24} Days
    Link: ${chosenTrekFour.url}`
  }
  _*Let's finalize and plan this together.*_
  
  For any questions or more details, feel free to reach out to the us. 
  
  Click here to compare more: https://comparetreks.scoutripper.com/
  
  Best regards,
  Scoutripper`;

                        console.log(message);
                        window.open(
                          `https://wa.me/?text=${encodeURIComponent(message)}`,
                          "_blank"
                        );
                      }}
                    >
                      <img src={Whatsapp} alt="Whatsapp" className="h-6 w-6" />
                    </div>
                    <button
                      className="w-36 h-10 bg-footer-main text-white rounded-full cursor-pointer font-bold text-sm"
                      onClick={() => {
                        window.open(`https://wa.me/919888454430`, "_blank");
                      }}
                    >
                      Chat Support
                    </button>
                  </div>
                </div>
                <footer className="flex max-w-7xl flex-col sm:flex-row justify-between items-center w-full px-2 py-4 border-t border-gray-200">
                  <p className="text-sm text-center sm:text-left">
                    Copyright © {currentYear} by Scoutripper | Made with ❤️
                  </p>
                  <p className="text-sm text-center sm:text-left mt-4 sm:mt-0 hidden sm:block">
                    Scoutripper
                  </p>
                </footer>
              </div>
            )}
          </div>
        )}
        {showIncludes && !isMobile && (
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#00393C]/23 flex justify-center items-center">
            <div className="w-1/2 bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-header-main">
                  Inclusions
                </h1>
                <RiCloseFill
                  className="w-6 h-6 text-gray-500 cursor-pointer"
                  onClick={() => setShowIncludes(false)}
                />
              </div>
              <div className="mt-4 ml-4 text-sm font-medium">
                {showIncludes.map((item, index) => (
                  <div className="flex flex-row gap-4 justify-start items-center">
                    <FaCheck className="w-4 h-4 text-green-500" />
                    <p key={index}>{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {showIncludes && isMobile && (
          <div className="fixed inset-0 flex items-end justify-center bg-[#00393C]/23 bg-opacity-50 z-50">
            <div className="bg-white text-black p-8 pb-16 rounded-t-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-header-main">
                  Inclusions
                </h1>
                <RiCloseFill
                  className="w-6 h-6 text-gray-500 cursor-pointer"
                  onClick={() => setShowIncludes(false)}
                />
              </div>
              <div className="mt-4 ml-2 text-sm font-medium">
                {showIncludes.map((item, index) => (
                  <div className="flex flex-row gap-4 justify-start items-start">
                    <div className="w-[5%] pt-1">
                      <FaCheck className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="w-[95%]">
                      <p key={index}>{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {showExcludes && !isMobile && (
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#00393C]/23 flex justify-center items-center">
            <div className="w-1/2 bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-header-main">
                  Exclusions
                </h1>
                <RiCloseFill
                  className="w-6 h-6 text-gray-500 cursor-pointer"
                  onClick={() => setShowExcludes(false)}
                />
              </div>
              <div className="mt-4 ml-4 text-sm font-medium">
                {showExcludes.map((item, index) => (
                  <div className="flex flex-row gap-4 justify-start items-center">
                    <IoClose className="w-5 h-5 text-red-500" />
                    <p key={index}>{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {showExcludes && isMobile && (
          <div className="fixed inset-0 flex items-end justify-center bg-[#00393C]/23 bg-opacity-50 z-50">
            <div className="bg-white text-black p-8 pb-16 rounded-t-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-header-main">
                  Exclusions
                </h1>
                <RiCloseFill
                  className="w-6 h-6 text-gray-500 cursor-pointer"
                  onClick={() => setShowExcludes(false)}
                />
              </div>
              <div className="mt-4 ml-2 text-sm font-medium">
                {showExcludes.map((item, index) => (
                  <div className="flex flex-row gap-4 justify-start items-start">
                    <div className="w-[5%] pt-1">
                      <IoClose className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="w-[95%]">
                      <p key={index}>{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
