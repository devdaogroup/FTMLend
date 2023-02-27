import { HTMLAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  flex-shrink: 0;
  max-height: 100%;
  max-width: 100%;
`

export const LogoMini: React.FC<HTMLAttributes<SVGElement>> = ({ className, ...restProps }) => (
  <Wrapper
    className={`logoMini ${className}`}
    fill="none"
    height="29"
    viewBox="0 0 31 29"
    width="31"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <g clipPath="url(#clip0_614_6255)">
      <path
        clipRule="evenodd"
        d="M5.40715 10.3327C5.3534 9.66872 5.3281 9.04901 5.31546 8.49569C5.2617 5.80817 5.56524 4.00594 5.57788 3.93006L5.81818 2.5199L6.97856 3.35777C7.0418 3.40204 8.52152 4.47705 10.368 6.4342C10.583 6.66185 10.8107 6.90847 11.0446 7.17406L10.994 7.33531C10.3459 9.44739 9.938 11.6322 9.81785 13.8771C8.8377 12.9032 7.83541 12.0654 6.88055 11.3571C6.3715 10.9809 5.87826 10.6394 5.40715 10.3327ZM25.1557 10.3327C25.2095 9.66872 25.2348 9.04901 25.2474 8.49569C25.3012 5.80817 24.9976 4.00594 24.985 3.93006L24.7447 2.5199L23.5843 3.35777C23.5211 3.40204 22.0414 4.47705 20.1949 6.4342C19.9799 6.66185 19.7522 6.90847 19.5182 7.17406L19.5688 7.33848C20.217 9.45055 20.6249 11.6354 20.745 13.8802C21.7252 12.9064 22.7275 12.0685 23.6823 11.3603C24.1914 10.984 24.6846 10.6426 25.1557 10.3359V10.3327Z"
        fill="url(#paint0_linear_614_6255)"
        fillOpacity="0.6"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M15.2819 28.9825C8.14577 29.3239 1.00959 23.3576 0.0989923 9.92316L0.000976562 8.49403L1.32893 9.03469C1.5629 9.12955 6.64075 11.2353 10.6056 15.9211C10.5993 15.7029 10.5962 15.4816 10.5962 15.2603C10.5962 9.75242 12.4015 4.61766 15.2851 -0.00488281C18.1687 4.6145 19.974 9.75242 19.974 15.2603C19.974 15.4816 19.9709 15.7029 19.9646 15.9211C23.9295 11.2353 29.0073 9.12955 29.2413 9.03469L30.5692 8.49403L30.4712 9.92316C29.5606 23.3576 22.4244 29.3239 15.2883 28.9825H15.2819ZM13.7105 23.0509C13.3469 23.0509 13.1983 23.1932 13.1983 23.541C13.1983 24.3884 14.1342 25.0745 15.2819 25.0745C16.4328 25.0745 17.3656 24.3884 17.3656 23.541C17.3656 23.1932 17.217 23.0541 16.8534 23.0541C16.6605 23.0604 16.4645 23.0794 16.2747 23.1142L16.2558 23.1173C15.9333 23.1711 15.6076 23.1995 15.2819 23.2059C14.9563 23.1995 14.6275 23.1711 14.3049 23.1173C14.1089 23.0826 13.9066 23.0636 13.7074 23.0541L13.7105 23.0509ZM9.9638 19.671C10.8902 19.671 11.6396 20.4203 11.6396 21.3467C11.6396 22.2731 10.8902 23.0225 9.9638 23.0225C9.03739 23.0225 8.28805 22.2731 8.28805 21.3467C8.28805 20.4203 9.03739 19.671 9.9638 19.671ZM20.5969 19.671C21.5233 19.671 22.2727 20.4203 22.2727 21.3467C22.2727 22.2731 21.5233 23.0225 20.5969 23.0225C19.6705 23.0225 18.9212 22.2731 18.9212 21.3467C18.9212 20.4203 19.6705 19.671 20.5969 19.671Z"
        fill="white"
        fillRule="evenodd"
      />
    </g>
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear_614_6255"
        x1="15.2814"
        x2="15.2814"
        y1="2.5199"
        y2="13.8802"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <clipPath id="clip0_614_6255">
        <rect fill="white" height="29" width="30.5635" />
      </clipPath>
    </defs>
  </Wrapper>
)