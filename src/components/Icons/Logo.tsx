"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {};
const Logo = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        x="0"
        y="0"
        width="2400"
        height="5260.696536424057"
        viewBox="148.88600673675538 78.7194341659546 42.227624130249026 92.56113166809082"
        preserveAspectRatio="xMidYMid meet"
        colorInterpolationFilters="sRGB"
        className="size-[50px] max-sm:hidden dark:max-sm:flex sm:hidden"
      >
        <g>
          <defs>
            <linearGradient id="92" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fa71cd"></stop>{" "}
              <stop offset="100%" stopColor="#9b59b6"></stop>
            </linearGradient>
            <linearGradient id="93" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f9d423"></stop>{" "}
              <stop offset="100%" stopColor="#f83600"></stop>
            </linearGradient>
            <linearGradient id="94" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0064d2"></stop>{" "}
              <stop offset="100%" stopColor="#1cb0f6"></stop>
            </linearGradient>
            <linearGradient id="95" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f00978"></stop>{" "}
              <stop offset="100%" stopColor="#3f51b1"></stop>
            </linearGradient>
            <linearGradient id="96" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7873f5"></stop>{" "}
              <stop offset="100%" stopColor="#ec77ab"></stop>
            </linearGradient>
            <linearGradient id="97" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f9d423"></stop>{" "}
              <stop offset="100%" stopColor="#e14fad"></stop>
            </linearGradient>
            <linearGradient id="98" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#009efd"></stop>{" "}
              <stop offset="100%" stopColor="#2af598"></stop>
            </linearGradient>
            <linearGradient id="99" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffcc00"></stop>{" "}
              <stop offset="100%" stopColor="#00b140"></stop>
            </linearGradient>
            <linearGradient id="100" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d51007"></stop>{" "}
              <stop offset="100%" stopColor="#ff8177"></stop>
            </linearGradient>
            <linearGradient id="102" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a2b6df"></stop>{" "}
              <stop offset="100%" stopColor="#0c3483"></stop>
            </linearGradient>
            <linearGradient id="103" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7ac5d8"></stop>{" "}
              <stop offset="100%" stopColor="#eea2a2"></stop>
            </linearGradient>
            <linearGradient id="104" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ecbc"></stop>{" "}
              <stop offset="100%" stopColor="#007adf"></stop>
            </linearGradient>
            <linearGradient id="105" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b88746"></stop>{" "}
              <stop offset="100%" stopColor="#fdf5a6"></stop>
            </linearGradient>
          </defs>
          <g
            className="imagesvg isNoFont"
            transform="translate(155.29999923706055,85.13343048095703)"
          >
            <g mask="url(#1365741f-5ac7-46e3-aadf-3b0bc3ea9bc7)">
              <rect
                fill="#FFFFFF"
                fillOpacity="0"
                strokeWidth="2"
                x="0"
                y="0"
                width="29.399999999999977"
                height="79.73313806850534"
                className="image-rect"
              ></rect>{" "}
              <svg
                x="0"
                y="0"
                width="29.399999999999977"
                height="79.73313806850534"
                className="image-svg-svg primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="79.91000366210938 50.871238708496094 168.75161743164062 457.6620788574219"
                >
                  <path
                    fill="#1a2128"
                    d="M 248.32 87.21 Q 248.01 92.29 247.94 96.98 A 0.81 0.80 -2.0 0 1 247.20 97.77 Q 244.51 97.98 241.61 98.23 C 233.83 98.90 225.79 97.76 217.99 98.66 Q 188.98 101.97 167.63 118.18 Q 143.61 136.42 133.20 164.48 Q 127.07 181.01 127.08 197.21 Q 127.17 353.18 126.94 499.37 Q 126.93 503.75 126.99 507.53 A 0.66 0.66 0.0 0 1 126.34 508.20 Q 107.50 508.60 88.75 508.52 Q 86.28 508.51 80.90 508.09 Q 80.41 508.05 80.36 507.55 Q 79.91 502.70 79.91 498.28 Q 79.97 345.53 79.97 194.10 Q 79.97 180.04 85.07 160.96 Q 96.34 118.83 129.29 88.75 Q 153.07 67.04 185.60 57.16 Q 202.71 51.96 221.81 51.15 Q 234.04 50.63 247.64 51.08 A 0.42 0.42 0.0 0 1 248.05 51.49 C 248.48 63.53 249.03 75.33 248.32 87.21 Z"
                  ></path>
                  <circle
                    fill="#1a2128"
                    cx="205.63"
                    cy="290.52"
                    r="42.58"
                  ></circle>
                </svg>
                <rect
                  v-gra="id"
                  width="41.39962959289551"
                  height="91.73313903808594"
                  transform="translate(-6, -6)"
                  fill="url(#0ZPCiW2UzhYq5Z-_pNEXZ)"
                ></rect>
              </svg>{" "}
            </g>
          </g>
          <defs v-gra="od"></defs>
          <defs v-gra="id">
            <filter
              id="46f5fd15-6c49-44f2-a0d6-66250ad16600"
              filterUnits="userSpaceOnUse"
            >
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 1 0"
              ></feColorMatrix>
            </filter>
            <linearGradient
              x1="0"
              y1="1"
              x2="0"
              y2="0"
              id="0ZPCiW2UzhYq5Z-_pNEXZ"
            >
              <stop offset="0%" stopColor="#ffffff"></stop>
              <stop offset="50%" stopColor="#a0a8b2"></stop>
              <stop offset="100%" stopColor="#032c30"></stop>
            </linearGradient>
            <filter
              id="42443b3f1de60f6b6fd3b6a9844b4764"
              filterUnits="objectBoundingBox"
            >
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 1 0"
              ></feColorMatrix>
            </filter>
          </defs>
          <mask v-gra="im" id="1365741f-5ac7-46e3-aadf-3b0bc3ea9bc7">
            <svg
              x="0"
              y="0"
              width="29.399999999999977"
              height="79.73313806850534"
              className="image-svg-svg primary"
              filter="url(#46f5fd15-6c49-44f2-a0d6-66250ad16600)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="79.91000366210938 50.871238708496094 168.75161743164062 457.6620788574219"
              >
                <path
                  fill="#1a2128"
                  d="M 248.32 87.21 Q 248.01 92.29 247.94 96.98 A 0.81 0.80 -2.0 0 1 247.20 97.77 Q 244.51 97.98 241.61 98.23 C 233.83 98.90 225.79 97.76 217.99 98.66 Q 188.98 101.97 167.63 118.18 Q 143.61 136.42 133.20 164.48 Q 127.07 181.01 127.08 197.21 Q 127.17 353.18 126.94 499.37 Q 126.93 503.75 126.99 507.53 A 0.66 0.66 0.0 0 1 126.34 508.20 Q 107.50 508.60 88.75 508.52 Q 86.28 508.51 80.90 508.09 Q 80.41 508.05 80.36 507.55 Q 79.91 502.70 79.91 498.28 Q 79.97 345.53 79.97 194.10 Q 79.97 180.04 85.07 160.96 Q 96.34 118.83 129.29 88.75 Q 153.07 67.04 185.60 57.16 Q 202.71 51.96 221.81 51.15 Q 234.04 50.63 247.64 51.08 A 0.42 0.42 0.0 0 1 248.05 51.49 C 248.48 63.53 249.03 75.33 248.32 87.21 Z"
                ></path>
                <circle
                  fill="#1a2128"
                  cx="205.63"
                  cy="290.52"
                  r="42.58"
                ></circle>
              </svg>
            </svg>
          </mask>
        </g>
      </svg>
    );
  }
  return (
    <>
      {" "}
      {resolvedTheme == "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          x="0"
          y="0"
          width="2400"
          height="5260.696536424057"
          viewBox="148.88600673675538 78.7194341659546 42.227624130249026 92.56113166809082"
          preserveAspectRatio="xMidYMid meet"
          colorInterpolationFilters="sRGB"
          className="size-[50px] max-sm:hidden dark:max-sm:flex sm:hidden"
        >
          <g>
            <defs>
              <linearGradient id="92" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fa71cd"></stop>{" "}
                <stop offset="100%" stopColor="#9b59b6"></stop>
              </linearGradient>
              <linearGradient id="93" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f9d423"></stop>{" "}
                <stop offset="100%" stopColor="#f83600"></stop>
              </linearGradient>
              <linearGradient id="94" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0064d2"></stop>{" "}
                <stop offset="100%" stopColor="#1cb0f6"></stop>
              </linearGradient>
              <linearGradient id="95" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f00978"></stop>{" "}
                <stop offset="100%" stopColor="#3f51b1"></stop>
              </linearGradient>
              <linearGradient id="96" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7873f5"></stop>{" "}
                <stop offset="100%" stopColor="#ec77ab"></stop>
              </linearGradient>
              <linearGradient id="97" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f9d423"></stop>{" "}
                <stop offset="100%" stopColor="#e14fad"></stop>
              </linearGradient>
              <linearGradient id="98" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#009efd"></stop>{" "}
                <stop offset="100%" stopColor="#2af598"></stop>
              </linearGradient>
              <linearGradient id="99" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffcc00"></stop>{" "}
                <stop offset="100%" stopColor="#00b140"></stop>
              </linearGradient>
              <linearGradient id="100" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d51007"></stop>{" "}
                <stop offset="100%" stopColor="#ff8177"></stop>
              </linearGradient>
              <linearGradient id="102" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a2b6df"></stop>{" "}
                <stop offset="100%" stopColor="#0c3483"></stop>
              </linearGradient>
              <linearGradient id="103" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7ac5d8"></stop>{" "}
                <stop offset="100%" stopColor="#eea2a2"></stop>
              </linearGradient>
              <linearGradient id="104" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ecbc"></stop>{" "}
                <stop offset="100%" stopColor="#007adf"></stop>
              </linearGradient>
              <linearGradient id="105" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b88746"></stop>{" "}
                <stop offset="100%" stopColor="#fdf5a6"></stop>
              </linearGradient>
            </defs>
            <g
              className="imagesvg isNoFont"
              transform="translate(155.29999923706055,85.13343048095703)"
            >
              <g mask="url(#1365741f-5ac7-46e3-aadf-3b0bc3ea9bc7)">
                <rect
                  fill="#FFFFFF"
                  fillOpacity="0"
                  strokeWidth="2"
                  x="0"
                  y="0"
                  width="29.399999999999977"
                  height="79.73313806850534"
                  className="image-rect"
                ></rect>{" "}
                <svg
                  x="0"
                  y="0"
                  width="29.399999999999977"
                  height="79.73313806850534"
                  className="image-svg-svg primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="79.91000366210938 50.871238708496094 168.75161743164062 457.6620788574219"
                  >
                    <path
                      fill="#1a2128"
                      d="M 248.32 87.21 Q 248.01 92.29 247.94 96.98 A 0.81 0.80 -2.0 0 1 247.20 97.77 Q 244.51 97.98 241.61 98.23 C 233.83 98.90 225.79 97.76 217.99 98.66 Q 188.98 101.97 167.63 118.18 Q 143.61 136.42 133.20 164.48 Q 127.07 181.01 127.08 197.21 Q 127.17 353.18 126.94 499.37 Q 126.93 503.75 126.99 507.53 A 0.66 0.66 0.0 0 1 126.34 508.20 Q 107.50 508.60 88.75 508.52 Q 86.28 508.51 80.90 508.09 Q 80.41 508.05 80.36 507.55 Q 79.91 502.70 79.91 498.28 Q 79.97 345.53 79.97 194.10 Q 79.97 180.04 85.07 160.96 Q 96.34 118.83 129.29 88.75 Q 153.07 67.04 185.60 57.16 Q 202.71 51.96 221.81 51.15 Q 234.04 50.63 247.64 51.08 A 0.42 0.42 0.0 0 1 248.05 51.49 C 248.48 63.53 249.03 75.33 248.32 87.21 Z"
                    ></path>
                    <circle
                      fill="#1a2128"
                      cx="205.63"
                      cy="290.52"
                      r="42.58"
                    ></circle>
                  </svg>
                  <rect
                    v-gra="id"
                    width="41.39962959289551"
                    height="91.73313903808594"
                    transform="translate(-6, -6)"
                    fill="url(#0ZPCiW2UzhYq5Z-_pNEXZ)"
                  ></rect>
                </svg>{" "}
              </g>
            </g>
            <defs v-gra="od"></defs>
            <defs v-gra="id">
              <filter
                id="46f5fd15-6c49-44f2-a0d6-66250ad16600"
                filterUnits="userSpaceOnUse"
              >
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 1 0"
                ></feColorMatrix>
              </filter>
              <linearGradient
                x1="0"
                y1="1"
                x2="0"
                y2="0"
                id="0ZPCiW2UzhYq5Z-_pNEXZ"
              >
                <stop offset="0%" stopColor="#ffffff"></stop>
                <stop offset="50%" stopColor="#a0a8b2"></stop>
                <stop offset="100%" stopColor="#032c30"></stop>
              </linearGradient>
              <filter
                id="42443b3f1de60f6b6fd3b6a9844b4764"
                filterUnits="objectBoundingBox"
              >
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 1 0"
                ></feColorMatrix>
              </filter>
            </defs>
            <mask v-gra="im" id="1365741f-5ac7-46e3-aadf-3b0bc3ea9bc7">
              <svg
                x="0"
                y="0"
                width="29.399999999999977"
                height="79.73313806850534"
                className="image-svg-svg primary"
                filter="url(#46f5fd15-6c49-44f2-a0d6-66250ad16600)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="79.91000366210938 50.871238708496094 168.75161743164062 457.6620788574219"
                >
                  <path
                    fill="#1a2128"
                    d="M 248.32 87.21 Q 248.01 92.29 247.94 96.98 A 0.81 0.80 -2.0 0 1 247.20 97.77 Q 244.51 97.98 241.61 98.23 C 233.83 98.90 225.79 97.76 217.99 98.66 Q 188.98 101.97 167.63 118.18 Q 143.61 136.42 133.20 164.48 Q 127.07 181.01 127.08 197.21 Q 127.17 353.18 126.94 499.37 Q 126.93 503.75 126.99 507.53 A 0.66 0.66 0.0 0 1 126.34 508.20 Q 107.50 508.60 88.75 508.52 Q 86.28 508.51 80.90 508.09 Q 80.41 508.05 80.36 507.55 Q 79.91 502.70 79.91 498.28 Q 79.97 345.53 79.97 194.10 Q 79.97 180.04 85.07 160.96 Q 96.34 118.83 129.29 88.75 Q 153.07 67.04 185.60 57.16 Q 202.71 51.96 221.81 51.15 Q 234.04 50.63 247.64 51.08 A 0.42 0.42 0.0 0 1 248.05 51.49 C 248.48 63.53 249.03 75.33 248.32 87.21 Z"
                  ></path>
                  <circle
                    fill="#1a2128"
                    cx="205.63"
                    cy="290.52"
                    r="42.58"
                  ></circle>
                </svg>
              </svg>
            </mask>
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          x="0"
          y="0"
          width="2400"
          height="5260.696536424057"
          viewBox="148.88600673675538 78.7194341659546 42.227624130249026 92.56113166809082"
          preserveAspectRatio="xMidYMid meet"
          colorInterpolationFilters="sRGB"
          className="size-[50px] dark:max-sm:hidden sm:hidden"
        >
          <g>
            <defs>
              <linearGradient id="92" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fa71cd"></stop>{" "}
                <stop offset="100%" stopColor="#9b59b6"></stop>
              </linearGradient>
              <linearGradient id="93" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f9d423"></stop>{" "}
                <stop offset="100%" stopColor="#f83600"></stop>
              </linearGradient>
              <linearGradient id="94" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0064d2"></stop>{" "}
                <stop offset="100%" stopColor="#1cb0f6"></stop>
              </linearGradient>
              <linearGradient id="95" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f00978"></stop>{" "}
                <stop offset="100%" stopColor="#3f51b1"></stop>
              </linearGradient>
              <linearGradient id="96" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7873f5"></stop>{" "}
                <stop offset="100%" stopColor="#ec77ab"></stop>
              </linearGradient>
              <linearGradient id="97" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f9d423"></stop>{" "}
                <stop offset="100%" stopColor="#e14fad"></stop>
              </linearGradient>
              <linearGradient id="98" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#009efd"></stop>{" "}
                <stop offset="100%" stopColor="#2af598"></stop>
              </linearGradient>
              <linearGradient id="99" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffcc00"></stop>{" "}
                <stop offset="100%" stopColor="#00b140"></stop>
              </linearGradient>
              <linearGradient id="100" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d51007"></stop>{" "}
                <stop offset="100%" stopColor="#ff8177"></stop>
              </linearGradient>
              <linearGradient id="102" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a2b6df"></stop>{" "}
                <stop offset="100%" stopColor="#0c3483"></stop>
              </linearGradient>
              <linearGradient id="103" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7ac5d8"></stop>{" "}
                <stop offset="100%" stopColor="#eea2a2"></stop>
              </linearGradient>
              <linearGradient id="104" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ecbc"></stop>{" "}
                <stop offset="100%" stopColor="#007adf"></stop>
              </linearGradient>
              <linearGradient id="105" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b88746"></stop>{" "}
                <stop offset="100%" stopColor="#fdf5a6"></stop>
              </linearGradient>
            </defs>
            <g
              className="imagesvg isNoFont"
              transform="translate(155.29999923706055,85.13343048095703)"
            >
              <g mask="url(#24e7ab33-ccfd-482e-9630-d9e8148f22b8)">
                <rect
                  fill="#000000"
                  fillOpacity="0"
                  strokeWidth="2"
                  x="0"
                  y="0"
                  width="29.399999999999977"
                  height="79.73313806850534"
                  className="image-rect"
                ></rect>{" "}
                <svg
                  x="0"
                  y="0"
                  width="29.399999999999977"
                  height="79.73313806850534"
                  className="image-svg-svg primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="79.91000366210938 50.871238708496094 168.75161743164062 457.6620788574219"
                  >
                    <path
                      fill="#1a2128"
                      d="M 248.32 87.21 Q 248.01 92.29 247.94 96.98 A 0.81 0.80 -2.0 0 1 247.20 97.77 Q 244.51 97.98 241.61 98.23 C 233.83 98.90 225.79 97.76 217.99 98.66 Q 188.98 101.97 167.63 118.18 Q 143.61 136.42 133.20 164.48 Q 127.07 181.01 127.08 197.21 Q 127.17 353.18 126.94 499.37 Q 126.93 503.75 126.99 507.53 A 0.66 0.66 0.0 0 1 126.34 508.20 Q 107.50 508.60 88.75 508.52 Q 86.28 508.51 80.90 508.09 Q 80.41 508.05 80.36 507.55 Q 79.91 502.70 79.91 498.28 Q 79.97 345.53 79.97 194.10 Q 79.97 180.04 85.07 160.96 Q 96.34 118.83 129.29 88.75 Q 153.07 67.04 185.60 57.16 Q 202.71 51.96 221.81 51.15 Q 234.04 50.63 247.64 51.08 A 0.42 0.42 0.0 0 1 248.05 51.49 C 248.48 63.53 249.03 75.33 248.32 87.21 Z"
                    ></path>
                    <circle
                      fill="#1a2128"
                      cx="205.63"
                      cy="290.52"
                      r="42.58"
                    ></circle>
                  </svg>
                  <rect
                    v-gra="id"
                    width="41.39962959289551"
                    height="91.73313903808594"
                    transform="translate(-6, -6)"
                    fill="url(#6zXjz1kQA8iYb4vdfz1T1)"
                  ></rect>
                </svg>{" "}
              </g>
            </g>
            <defs v-gra="od"></defs>
            <defs v-gra="id">
              <filter
                id="317316a1-92bd-4854-acf4-dbede615c540"
                filterUnits="userSpaceOnUse"
              >
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 1 0"
                ></feColorMatrix>
              </filter>
              <linearGradient
                x1="0"
                y1="1"
                x2="0"
                y2="0"
                id="6zXjz1kQA8iYb4vdfz1T1"
              >
                <stop offset="0%" stopColor="#000000"></stop>
                <stop offset="50%" stopColor="#62b2b3"></stop>
                <stop offset="100%" stopColor="#beebef"></stop>
              </linearGradient>
              <filter
                id="42443b3f1de60f6b6fd3b6a9844b4764"
                filterUnits="objectBoundingBox"
              >
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 0 0.99609375  0 0 0 1 0"
                ></feColorMatrix>
              </filter>
            </defs>
            <mask v-gra="im" id="24e7ab33-ccfd-482e-9630-d9e8148f22b8">
              <svg
                x="0"
                y="0"
                width="29.399999999999977"
                height="79.73313806850534"
                className="image-svg-svg primary"
                filter="url(#317316a1-92bd-4854-acf4-dbede615c540)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="79.91000366210938 50.871238708496094 168.75161743164062 457.6620788574219"
                >
                  <path
                    fill="#1a2128"
                    d="M 248.32 87.21 Q 248.01 92.29 247.94 96.98 A 0.81 0.80 -2.0 0 1 247.20 97.77 Q 244.51 97.98 241.61 98.23 C 233.83 98.90 225.79 97.76 217.99 98.66 Q 188.98 101.97 167.63 118.18 Q 143.61 136.42 133.20 164.48 Q 127.07 181.01 127.08 197.21 Q 127.17 353.18 126.94 499.37 Q 126.93 503.75 126.99 507.53 A 0.66 0.66 0.0 0 1 126.34 508.20 Q 107.50 508.60 88.75 508.52 Q 86.28 508.51 80.90 508.09 Q 80.41 508.05 80.36 507.55 Q 79.91 502.70 79.91 498.28 Q 79.97 345.53 79.97 194.10 Q 79.97 180.04 85.07 160.96 Q 96.34 118.83 129.29 88.75 Q 153.07 67.04 185.60 57.16 Q 202.71 51.96 221.81 51.15 Q 234.04 50.63 247.64 51.08 A 0.42 0.42 0.0 0 1 248.05 51.49 C 248.48 63.53 249.03 75.33 248.32 87.21 Z"
                  ></path>
                  <circle
                    fill="#1a2128"
                    cx="205.63"
                    cy="290.52"
                    r="42.58"
                  ></circle>
                </svg>
              </svg>
            </mask>
          </g>
        </svg>
      )}
    </>
  );
};
export default Logo;
