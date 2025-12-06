export default function BullHead() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12"
    >
      <g>
        {/* Bull Head */}
        <path
          d="M24 8C20 8 16 10 14 14C12 10 8 8 4 8C4 8 2 10 2 14C2 18 4 20 6 20C6 20 8 32 12 36C14 38 16 40 24 40C32 40 34 38 36 36C40 32 42 20 42 20C44 20 46 18 46 14C46 10 44 8 44 8C40 8 36 10 34 14C32 10 28 8 24 8Z"
          fill="currentColor"
        />
        {/* Horns */}
        <path
          d="M6 20C6 20 4 18 2 16C2 16 0 12 2 8C2 8 4 6 6 8C8 10 6 14 6 20Z"
          fill="currentColor"
        />
        <path
          d="M42 20C42 20 44 18 46 16C46 16 48 12 46 8C46 8 44 6 42 8C40 10 42 14 42 20Z"
          fill="currentColor"
        />
        {/* Eyes */}
        <circle cx="18" cy="20" r="2" fill="#FFF" />
        <circle cx="30" cy="20" r="2" fill="#FFF" />
        {/* Nose ring */}
        <ellipse
          cx="24"
          cy="30"
          rx="4"
          ry="3"
          fill="none"
          stroke="#FFD700"
          strokeWidth="1.5"
        />
        <circle cx="24" cy="27" r="1" fill="#FFD700" />
      </g>
    </svg>
  );
}
