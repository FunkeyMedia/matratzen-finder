export function MattressVisual({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={compact ? "mattress-visual compact" : "mattress-visual"}
      viewBox="0 0 720 560"
      role="img"
      aria-label="Schematische Illustration einer Matratze mit mehreren Schichten, kein Produktfoto"
    >
      <defs>
        <linearGradient id="surface" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#e5eaf0" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f5f7fa" />
          <stop offset="1" stopColor="#cbd2dc" />
        </linearGradient>
        <pattern
          id="stitch"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 11L11 0L22 11L11 22Z"
            stroke="#c7ced8"
            strokeWidth=".8"
            fill="none"
          />
        </pattern>
        <filter id="shadow">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <ellipse
        cx="365"
        cy="432"
        rx="263"
        ry="33"
        fill="#132a4a"
        opacity=".15"
        filter="url(#shadow)"
      />
      <g transform="translate(0,-22)">
        <path d="M96 300L394 187L648 299L350 438Z" fill="#bcc7d6" />
        <path
          d="M96 300L350 416L648 277V328Q645 345 629 352L367 474Q350 481 334 473L110 370Q96 364 96 348Z"
          fill="#172d4b"
        />
        <path d="M96 281L394 164L648 277L350 416Z" fill="#d94640" />
        <path d="M96 281L350 398L648 260V278L350 416L96 300Z" fill="#b93230" />
        <path d="M96 248L394 132L648 245L350 384Z" fill="#faf6ee" />
        <path d="M96 248L350 366L648 229V260L350 398L96 281Z" fill="#e3dccd" />
        <path
          d="M96 201Q96 189 113 183L377 81Q393 75 409 82L630 178Q648 186 648 200V226L350 365L96 247Z"
          fill="url(#edge)"
        />
        <path
          d="M113 183L377 81Q393 75 409 82L630 178Q651 189 631 199L365 323Q350 330 335 323L113 221Q89 207 113 183Z"
          fill="url(#surface)"
        />
        <path
          d="M113 183L377 81Q393 75 409 82L630 178Q651 189 631 199L365 323Q350 330 335 323L113 221Q89 207 113 183Z"
          fill="url(#stitch)"
          opacity=".7"
        />
        <path
          d="M105 220L340 329Q351 335 364 329L639 201"
          fill="none"
          stroke="#fff"
          strokeWidth="4"
        />
        <path
          d="M105 244L340 352Q351 359 364 352L639 223"
          fill="none"
          stroke="#a3afbe"
          strokeWidth="1.3"
        />
        <rect
          x="207"
          y="275"
          width="61"
          height="19"
          rx="3"
          fill="#d94640"
          transform="rotate(25 207 275)"
        />
      </g>
    </svg>
  );
}
