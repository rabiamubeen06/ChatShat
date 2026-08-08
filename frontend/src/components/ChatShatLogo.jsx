import React from 'react';

const ChatShatLogo = ({ className }) => (
  <svg viewBox="0 0 680 250" className={className} role="img" aria-label="ChatShat logo">
    <path fill="#d0aee0" stroke="#7d5382" strokeWidth="2.5" strokeLinejoin="round"
      d="M70,60 Q60,30 110,26 Q220,10 400,20 Q560,26 600,50 Q630,66 610,100 Q615,150 590,180 Q550,205 460,200 L400,200 L370,235 L378,198 Q220,202 120,180 Q60,166 62,120 Q56,85 70,60 Z"/>
    <text x="340" y="130" textAnchor="middle" fontSize="70" fontWeight="600"
      fontFamily="'Baloo 2', cursive" fill="#4a2e5c">ChatShat</text>
    <circle fill="#7d5382" cx="100" cy="90" r="5"/>
    <circle fill="#7d5382" cx="120" cy="65" r="3"/>
    <circle fill="#7d5382" cx="580" cy="90" r="5"/>
    <circle fill="#7d5382" cx="600" cy="115" r="3"/>
    <path fill="#9a6ba0" d="M580,55 L586,68 L600,70 L589,79 L592,93 L580,85 L568,93 L571,79 L560,70 L574,68 Z"/>
    <path fill="#9a6ba0" d="M95,140 L99,148 L108,149 L101,155 L103,164 L95,159 L87,164 L89,155 L82,149 L91,148 Z"/>
  </svg>
);

export default ChatShatLogo;