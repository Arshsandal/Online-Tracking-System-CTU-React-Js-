import React from 'react'

const Svg = () => {
  return (
    <>
    <div className="absolute top-0 left-0 w-full opacity-30">
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-32"
          >
            <path
              fill="#a2e53f"
              fillOpacity="0.1"
              d="M0,256L60,245.3C120,235,240,213,360,192C480,171,600,149,720,154.7C840,160,960,192,1080,192C1200,192,1320,160,1380,138.7L1440,117V320H0Z"
            ></path>
          </svg>
        </div>

        {/* Dotted Pattern SVG */}
        <div className="absolute top-10 left-10 opacity-20">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern
              id="dots"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
            <rect width="200" height="200" fill="url(#dots)" />
          </svg>
        </div>

        {/* Grid Lines Background */}
        <div className="absolute inset-0 opacity-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10 0 L0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
    </>
  )
}

export default Svg