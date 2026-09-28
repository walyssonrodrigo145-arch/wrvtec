export function HeroMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 470"
      role="img"
      aria-label="Dashboard do MusicPro exibido em um notebook e em um celular"
      className={className}
    >
      <defs>
        <linearGradient id="wrv-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D6FF2" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1D6FF2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wrv-phone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E6BFF" />
          <stop offset="100%" stopColor="#7B3FF2" />
        </linearGradient>
        <filter id="wrv-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="18"
            floodColor="#0B1E3E"
            floodOpacity="0.16"
          />
        </filter>
      </defs>

      <ellipse cx="320" cy="240" rx="300" ry="210" fill="#1D6FF2" opacity="0.06" />
      <ellipse cx="470" cy="120" rx="150" ry="110" fill="#4DA3FF" opacity="0.12" />

      <g filter="url(#wrv-shadow)">
        <rect x="36" y="44" width="420" height="272" rx="16" fill="#0B1E3E" />
        <rect x="48" y="56" width="396" height="248" rx="10" fill="#F8FAFF" />

        <rect x="48" y="56" width="70" height="248" rx="10" fill="#0B1E3E" />
        <rect x="60" y="74" width="46" height="8" rx="4" fill="#4DA3FF" />
        <rect x="60" y="96" width="46" height="6" rx="3" fill="#FFFFFF" opacity="0.35" />
        <rect x="60" y="112" width="38" height="6" rx="3" fill="#FFFFFF" opacity="0.25" />
        <rect x="60" y="128" width="42" height="6" rx="3" fill="#FFFFFF" opacity="0.25" />
        <rect x="60" y="144" width="34" height="6" rx="3" fill="#FFFFFF" opacity="0.25" />

        <rect x="130" y="68" width="180" height="9" rx="4.5" fill="#0B1E3E" opacity="0.85" />
        <rect x="130" y="84" width="110" height="6" rx="3" fill="#55627A" opacity="0.5" />
        <rect x="376" y="70" width="56" height="20" rx="10" fill="#1D6FF2" />
        <circle cx="396" cy="80" r="4" fill="#FFFFFF" opacity="0.85" />
        <rect x="404" y="77" width="18" height="6" rx="3" fill="#FFFFFF" opacity="0.85" />

        <rect x="130" y="104" width="90" height="46" rx="8" fill="#FFFFFF" stroke="#E3E9F4" />
        <rect x="140" y="114" width="34" height="6" rx="3" fill="#55627A" opacity="0.55" />
        <rect x="140" y="128" width="56" height="9" rx="4.5" fill="#0B1E3E" />
        <rect x="228" y="104" width="90" height="46" rx="8" fill="#FFFFFF" stroke="#E3E9F4" />
        <rect x="238" y="114" width="30" height="6" rx="3" fill="#55627A" opacity="0.55" />
        <rect x="238" y="128" width="48" height="9" rx="4.5" fill="#0B1E3E" />
        <rect x="326" y="104" width="106" height="46" rx="8" fill="#FFFFFF" stroke="#E3E9F4" />
        <rect x="336" y="114" width="34" height="6" rx="3" fill="#55627A" opacity="0.55" />
        <rect x="336" y="128" width="60" height="9" rx="4.5" fill="#16A34A" />

        <rect x="130" y="160" width="184" height="128" rx="10" fill="#FFFFFF" stroke="#E3E9F4" />
        <rect x="142" y="172" width="70" height="7" rx="3.5" fill="#0B1E3E" opacity="0.8" />
        <path
          d="M142 268 L166 244 L190 254 L214 224 L238 240 L262 208 L286 224 L302 200 L302 276 L142 276 Z"
          fill="url(#wrv-area)"
        />
        <path
          d="M142 268 L166 244 L190 254 L214 224 L238 240 L262 208 L286 224 L302 200"
          fill="none"
          stroke="#1D6FF2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="302" cy="200" r="4.5" fill="#1D6FF2" stroke="#FFFFFF" strokeWidth="2" />

        <rect x="322" y="160" width="110" height="128" rx="10" fill="#FFFFFF" stroke="#E3E9F4" />
        <rect x="334" y="172" width="56" height="7" rx="3.5" fill="#0B1E3E" opacity="0.8" />
        <rect x="336" y="244" width="14" height="30" rx="4" fill="#4DA3FF" />
        <rect x="358" y="228" width="14" height="46" rx="4" fill="#1D6FF2" />
        <rect x="380" y="212" width="14" height="62" rx="4" fill="#0B1E3E" opacity="0.85" />
        <rect x="402" y="236" width="14" height="38" rx="4" fill="#4DA3FF" opacity="0.7" />
      </g>

      <g filter="url(#wrv-shadow)">
        <rect x="12" y="318" width="468" height="16" rx="8" fill="#D8DEE9" />
        <rect x="200" y="322" width="92" height="7" rx="3.5" fill="#C3CBD9" />
      </g>

      <g filter="url(#wrv-shadow)">
        <rect x="462" y="120" width="132" height="264" rx="24" fill="#0B1E3E" />
        <rect x="470" y="130" width="116" height="244" rx="16" fill="#F8FAFF" />

        <rect x="470" y="130" width="116" height="44" rx="16" fill="url(#wrv-phone)" />
        <rect x="470" y="158" width="116" height="16" fill="url(#wrv-phone)" />
        <circle cx="488" cy="150" r="9" fill="#FFFFFF" opacity="0.9" />
        <rect x="502" y="142" width="52" height="6" rx="3" fill="#FFFFFF" opacity="0.9" />
        <rect x="502" y="153" width="34" height="5" rx="2.5" fill="#FFFFFF" opacity="0.6" />

        <rect x="482" y="186" width="92" height="34" rx="8" fill="#FFFFFF" stroke="#E3E9F4" />
        <circle cx="496" cy="203" r="7" fill="#4DA3FF" opacity="0.8" />
        <rect x="510" y="196" width="48" height="6" rx="3" fill="#0B1E3E" opacity="0.8" />
        <rect x="510" y="207" width="30" height="5" rx="2.5" fill="#55627A" opacity="0.5" />

        <rect x="482" y="228" width="92" height="34" rx="8" fill="#FFFFFF" stroke="#E3E9F4" />
        <circle cx="496" cy="245" r="7" fill="#16A34A" opacity="0.8" />
        <rect x="510" y="238" width="48" height="6" rx="3" fill="#0B1E3E" opacity="0.8" />
        <rect x="510" y="249" width="36" height="5" rx="2.5" fill="#55627A" opacity="0.5" />

        <rect x="482" y="270" width="92" height="34" rx="8" fill="#FFFFFF" stroke="#E3E9F4" />
        <circle cx="496" cy="287" r="7" fill="#F97316" opacity="0.8" />
        <rect x="510" y="280" width="42" height="6" rx="3" fill="#0B1E3E" opacity="0.8" />
        <rect x="510" y="291" width="28" height="5" rx="2.5" fill="#55627A" opacity="0.5" />

        <rect x="482" y="330" width="92" height="28" rx="14" fill="#0B1E3E" />
        <circle cx="502" cy="344" r="4" fill="#4DA3FF" />
        <circle cx="520" cy="344" r="4" fill="#FFFFFF" opacity="0.35" />
        <circle cx="538" cy="344" r="4" fill="#FFFFFF" opacity="0.35" />
      </g>

      <g filter="url(#wrv-shadow)">
        <rect x="330" y="24" width="182" height="58" rx="14" fill="#FFFFFF" />
        <circle cx="356" cy="53" r="13" fill="#16A34A" opacity="0.14" />
        <path
          d="m350 53 4 4 8-8"
          stroke="#16A34A"
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="378" y="40" width="104" height="8" rx="4" fill="#0B1E3E" opacity="0.85" />
        <rect x="378" y="56" width="76" height="7" rx="3.5" fill="#55627A" opacity="0.5" />
      </g>
    </svg>
  );
}
