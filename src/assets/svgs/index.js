const AppLogo = ({ width = 81, height = 20, color = 'white', ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 81 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    
    <defs>
      <filter colorInterpolationFilters="auto" id="prefix__a">
        {color === 'white' ? (
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
          />
        ) : (
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 0.074510 0 0 0 0 0.078431 0 0 0 0 0.082353 0 0 0 1.000000 0"
          />
        )}
      </filter>
    </defs>
    <g
      transform="translate(1)"
      filter="url(#prefix__a)"
      fill="none"
      fillRule="evenodd"
    >
      <g fill="#FFF">
        <path
          id={'arrows'}
          d="M7.08 0v1.077l-.23-.01-.25-.004-.211.007-.11.007-.162.019-.085.014-.194.043-.3.085-.12.027-.071.01a2.005 2.005 0 01-.377.011 4.864 4.864 0 01-.239-.02l-.255-.032-.51-.068-.122-.013-.163-.014-.09-.004c-.055-.001-.106 0-.151.004l-.062.006H3.29l-.105-.007-.116-.017-.1-.019-.184-.045-.031-.008-1.535-.016v1.129h-.01l.107.671.035.263.014.139.009.17-.004.126-.051.373-.034.288-.015.154-.021.276-.01.32.005.22.016.18.018.113.037.17.06.227.023.107.004.024v.523l-.027.214-.088.58-.027.231-.008.11v.1H-.017V0h7.097zM71.92 20v-1.077l.103.006.085.003.042.002.053.001c.052.002.102.002.15.002h.092l.043-.002h.043l.04-.003.04-.002.057-.003.054-.004.051-.005.033-.004.047-.006.03-.004.044-.007.041-.007.04-.007.038-.008.048-.01.068-.018.032-.008.062-.018.084-.025.102-.03.02-.004.054-.013.022-.005.022-.005.07-.011.023-.004c.103-.013.223-.019.377-.01.113.006.237.02.365.035l.064.008.065.009.309.042.092.012.055.007.054.007.088.01.034.003.067.007.033.002.063.005.046.002.043.002c.056.001.107 0 .152-.004l.034-.004a.685.685 0 01.057-.003h.03l.056.002h.02l.038.004.02.002.019.003.096.014.046.008.053.011.058.013.037.008.027.007.035.01.028.007.031.008 1.535.015v-1.128h.01l-.065-.399-.013-.087-.016-.103-.013-.082-.01-.065-.006-.047-.008-.062-.01-.09-.008-.07-.003-.028-.004-.04-.004-.052-.002-.05-.002-.046v-.107l.002-.019.003-.042.02-.14.011-.078.018-.135.014-.114.013-.108.007-.066.01-.094.005-.06.01-.116.007-.091.004-.07.003-.05.002-.048.002-.047.003-.09v-.162l-.001-.037-.003-.07-.001-.034-.006-.08-.005-.051-.002-.021-.003-.028-.006-.04-.005-.038-.007-.036-.006-.034-.009-.044-.01-.042-.004-.02-.008-.03-.015-.057-.033-.123-.012-.047-.01-.038-.013-.07-.004-.023v-.523a6.7 6.7 0 01.027-.214l.017-.117.044-.28.012-.085.015-.099.01-.08.008-.061.006-.06.003-.03.004-.055.004-.054c.001-.036.002-.07 0-.1h1.269V20h-7.097z"
        />
        <path
          d="M9.915 14.692c1.046 0 1.925-.328 2.638-.984.713-.657 1.146-1.534 1.3-2.632l-1.407-.287a3.405 3.405 0 01-.802 1.818c-.44.507-1.01.76-1.711.76-.891 0-1.592-.328-2.103-.984-.511-.657-.766-1.558-.766-2.703 0-1.158.26-2.062.784-2.713.523-.65 1.212-.975 2.067-.975.713 0 1.271.23 1.675.689.404.46.678 1.041.82 1.745l1.373-.286c-.155-1.027-.586-1.862-1.293-2.506-.706-.645-1.565-.967-2.575-.967-1.224 0-2.245.45-3.065 1.351-.82.902-1.23 2.122-1.23 3.662 0 1.563.398 2.79 1.194 3.678.796.89 1.83 1.334 3.101 1.334zM17.55 3.02V1.355h-1.675V3.02h1.675zm-.107 11.404V4.935h-1.461v9.489h1.461zm6.163 0v-1.415h-.712c-.464 0-.773-.113-.927-.34-.155-.227-.232-.62-.232-1.181V6.242h2.317V4.935h-2.335V2.608h-1.39v2.327h-1.354v1.307h1.318v5.425c0 .919.2 1.608.598 2.067.398.46 1.042.69 1.933.69h.784zm4.703 4.028l5.08-13.517H31.89l-2.406 6.553h-.035l-2.674-6.553h-1.533l3.547 8.486-1.889 5.03h1.408zm7.17-3.85c1.746 0 3.297-1.163 3.297-2.953 0-1.97-3.386-3.76-3.386-4.941 0-.698.41-1.164 1.14-1.164 1.016 0 1.694.877 2.05 1.951h.09c.409-.16.908-.519.908-1.056 0-.984-.927-1.575-2.3-1.575-1.835 0-3.207 1.27-3.207 2.81 0 2.077 3.315 3.653 3.315 4.995 0 .806-.464 1.253-1.319 1.253-1.212 0-2.05-1.038-2.388-2.542h-.107c-.517.215-.891.698-.891 1.271 0 1.11 1.123 1.952 2.798 1.952zm7.897 0c1.64 0 2.852-1.199 3.636-2.488l-.321-.268c-.838 1.056-1.497 1.647-2.513 1.647-1.194 0-1.693-1.092-1.693-2.4 0-2.47 1.283-5.656 2.958-5.656.98 0 1.194.984 1.159 2.184h.303c.641-.126 1.087-.52 1.087-1.218 0-.966-.784-1.54-2.103-1.54-2.94 0-5.365 3.349-5.365 6.535 0 1.826.998 3.205 2.852 3.205zm8.2 0c2.959 0 5.15-3.4 5.15-6.355 0-2.148-1.158-3.383-3.03-3.383-2.958 0-5.168 3.401-5.168 6.355 0 2.148 1.177 3.384 3.048 3.384zm.143-.554c-.945 0-1.266-1.02-1.266-2.363 0-2.507 1.39-6.266 3.084-6.266.944 0 1.265 1.02 1.265 2.363 0 2.506-1.372 6.266-3.083 6.266zm8.53 4.171l.106-.52c-1.23-.017-1.586-.142-1.586-.554 0-.125.035-.25.089-.448l.695-2.792c.356.43.927.698 1.711.698 2.691 0 5.703-3.312 5.703-7.09 0-1.665-.713-2.65-1.942-2.65-1.515 0-3.351 2.239-4.385 4.494l1.176-4.493h-.267l-3.083.77-.054.268 1.052.59-2.584 10.366c-.179.68-.482.788-1.39.842l-.107.519h4.865zm.819-4.225c-.588 0-1.105-.34-1.337-.895.874-3.939 3.084-6.875 4.42-6.875.606 0 .82.609.82 1.504-.018 2.757-1.836 6.266-3.903 6.266zm9.617.609c1.568 0 2.78-.895 3.92-2.578l-.338-.269c-.873 1.11-1.711 1.701-2.727 1.701-1.158 0-1.853-.913-1.853-2.524 0-.215.017-.448.035-.663 2.852-.573 5.56-1.342 5.56-3.598 0-.985-.694-1.808-2.227-1.808-2.887 0-5.311 3.294-5.311 6.427 0 1.987 1.105 3.312 2.94 3.312zm-.91-4.762c.321-2.167 1.551-4.386 2.977-4.386.624 0 .873.465.873 1.038 0 1.754-1.283 2.739-3.85 3.348z"
          fillRule="nonzero"
        />
      </g>
    </g>
  </svg>
);
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <g fill="none" fill-rule="evenodd" opacity=".5">
      <g>
        <g>
          <g transform="translate(-247 -20) translate(247 19) translate(0 1)">
            <circle cx="10" cy="10" r="10" fill="#29292A" />
            <path
              fill="#FFF"
              fill-rule="nonzero"
              d="M6 7v6c0 .552.448 1 1 1h1V6H7c-.552 0-1 .448-1 1zm7-1H8.667v2H14V7c0-.552-.448-1-1-1zm-4.333 8H13c.552 0 1-.448 1-1V8.667H8.667V14z"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const CityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <g fill="none" fill-rule="evenodd">
      <g>
        <g>
          <g transform="translate(-363 -20) translate(247 19) translate(116 1)">
            <circle cx="10" cy="10" r="10" fill="#29292A" />
            <path
              fill="#949494"
              fill-rule="nonzero"
              d="M8.667 14h2.666V6H8.667v8zm1-6.667h.666V8h-.666v-.667zm0 1.334h.666v.666h-.666v-.666zm0 1.333h.666v.667h-.666V10zM7.333 7c0-.184-.149-.333-.333-.333-.184 0-.333.149-.333.333v1.333H6V14h2V8.333h-.667V7zm0 4.333h-.666v-.666h.666v.666zm0-1.333h-.666v-.667h.666V10zM12 8.333V14h2V8.333h-2zm1.333 3h-.666v-.666h.666v.666zm0-1.333h-.666v-.667h.666V10z"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const ProfileIcon =  () => (
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="35.000000pt" height="35.000000pt" viewBox="0 0 64.000000 64.000000"
    preserveAspectRatio="xMidYMid meet">

    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
    fill="#FFFFFF" stroke="none">
    <path d="M216 604 c-71 -22 -159 -112 -180 -184 -34 -115 -12 -206 73 -291 85
    -85 176 -107 291 -73 75 22 162 109 184 184 34 115 12 206 -73 291 -85 84
    -180 108 -295 73z m226 -41 c92 -51 146 -155 135 -261 -15 -145 -149 -254
    -295 -239 -145 15 -254 149 -239 295 11 102 92 201 191 232 57 17 150 5 208
    -27z"/>
    <path d="M215 536 c-60 -28 -87 -56 -114 -116 -29 -64 -27 -125 7 -190 27 -54
    61 -83 48 -42 -5 14 2 28 24 50 39 39 64 47 101 32 23 -10 35 -10 58 0 37 15
    62 7 101 -32 22 -22 29 -36 24 -50 -4 -14 -2 -19 7 -16 25 7 69 108 69 157 0
    51 -35 135 -69 165 -34 31 -37 10 -3 -28 16 -19 35 -51 42 -72 13 -40 8 -120
    -10 -154 -11 -21 -13 -20 -55 19 -25 23 -49 41 -55 41 -6 0 -6 9 0 26 19 49
    12 93 -19 125 -78 78 -183 -15 -141 -125 6 -17 6 -26 0 -26 -6 0 -30 -18 -55
    -41 -42 -39 -44 -40 -55 -19 -6 11 -14 43 -17 70 -14 123 86 230 215 230 17 0
    32 5 32 10 0 19 -85 10 -135 -14z m142 -98 c32 -30 31 -87 -3 -127 -33 -39
    -55 -39 -88 0 -68 81 15 198 91 127z"/>
    <path d="M380 540 c0 -12 28 -25 36 -17 3 3 -4 10 -15 17 -15 7 -21 7 -21 0z"/>
    <path d="M201 156 c-8 -9 -11 -19 -7 -23 9 -9 29 13 24 27 -2 8 -8 7 -17 -4z"/>
    <path d="M400 158 c0 -18 18 -34 28 -24 3 4 -2 14 -11 23 -16 16 -17 16 -17 1z"/>
    <path d="M250 124 c0 -8 5 -12 10 -9 6 3 10 10 10 16 0 5 -4 9 -10 9 -5 0 -10
    -7 -10 -16z"/>
    <path d="M300 120 c0 -11 5 -20 10 -20 6 0 10 9 10 20 0 11 -4 20 -10 20 -5 0
    -10 -9 -10 -20z"/>
    <path d="M350 131 c0 -6 5 -13 10 -16 6 -3 10 1 10 9 0 9 -4 16 -10 16 -5 0
    -10 -4 -10 -9z"/>
    </g>
  </svg>
);

const ContentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <g fill="none" fill-rule="evenodd">
      <g>
        <g>
          <g transform="translate(-452 -20) translate(247 19) translate(205 1)">
            <circle cx="10" cy="10" r="10" fill="#29292A" />
            <path
              fill="#949494"
              fill-rule="nonzero"
              d="M11.667 6v2h2l-2-2zM11 6H7.667C7.298 6 7 6.298 7 6.667v6.666c0 .369.298.667.667.667H13c.368 0 .667-.298.667-.667V8.667H11V6zm1 6.667H8.667c-.184 0-.334-.15-.334-.334 0-.184.15-.333.334-.333H12c.184 0 .333.15.333.333 0 .184-.149.334-.333.334zm0-2.334c.184 0 .333.15.333.334 0 .184-.149.333-.333.333H8.667c-.184 0-.334-.15-.334-.333 0-.184.15-.334.334-.334H12z"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const CategoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
  >
    <g fill="none" fill-rule="evenodd">
      <g>
        <g>
          <g transform="translate(-553 -19) translate(247 19) translate(306)">
            <circle cx="11" cy="11" r="11" fill="#29292A" />
            <path
              fill="#949494"
              fill-rule="nonzero"
              d="M14.769 12.95l-.962-.412-2.583.923-.224.08-.224-.08-2.583-.923-.962.412c-.144.062-.236.206-.23.363.004.157.104.295.252.347L11 15l3.747-1.34c.148-.052.248-.19.253-.347.005-.157-.087-.3-.231-.363zM7.253 9.327L11 10.667l3.747-1.34c.148-.053.248-.19.253-.347.005-.157-.087-.301-.231-.363L11 7 7.231 8.617c-.144.062-.236.206-.23.363.004.156.104.294.252.347zm7.516 1.457l-.962-.413-2.583.923-.224.08-.224-.08-2.583-.923-.962.413c-.144.062-.236.205-.23.362.004.157.104.295.252.348L11 12.834l3.747-1.34c.148-.053.248-.191.253-.348.005-.157-.087-.3-.231-.362z"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const ComponentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
  >
    <g fill="none" fill-rule="evenodd">
      <g>
        <g>
          <g transform="translate(-671 -19) translate(247 19) translate(424)">
            <circle cx="11" cy="11" r="11" fill="#29292A" />
            <path
              fill="#949494"
              fill-rule="nonzero"
              d="M9.4 12H7.6c-.16 0-.312.063-.424.176-.113.112-.176.265-.176.424v1.8c0 .16.063.312.176.424.112.113.265.176.424.176h1.8c.331 0 .6-.269.6-.6v-1.8c0-.331-.269-.6-.6-.6zm0-4H7.6c-.16 0-.312.063-.424.176C7.063 8.288 7 8.44 7 8.6v1.8c0 .16.063.312.176.424.112.113.265.176.424.176h1.8c.331 0 .6-.269.6-.6V8.6c0-.331-.269-.6-.6-.6zm5-1h-1.8c-.16 0-.312.063-.424.176-.113.112-.176.265-.176.424v1.8c0 .16.063.312.176.424.112.113.265.176.424.176h1.8c.331 0 .6-.269.6-.6V7.6c0-.331-.269-.6-.6-.6zm-1.333 5h-1.8c-.16 0-.312.063-.425.176-.112.112-.175.265-.175.424v1.8c0 .16.063.312.175.424.113.113.266.176.425.176h1.8c.331 0 .6-.269.6-.6v-1.8c0-.331-.269-.6-.6-.6z"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const TagCloseButton = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <path
      fill="#4B68EF"
      d="M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm2.746 8.92c.147.148.205.363.15.564-.053.202-.21.359-.412.413-.201.054-.416-.004-.563-.151L7 7.825l-1.921 1.92c-.228.229-.597.229-.825 0-.228-.227-.228-.596 0-.824L6.175 7l-1.92-1.92c-.148-.148-.206-.363-.152-.564.054-.202.211-.359.413-.413.201-.054.416.004.563.151L7 6.175l1.92-1.92c.148-.15.364-.21.566-.156.203.054.361.212.415.415.054.202-.006.418-.155.565L7.825 7l1.92 1.92z"
    />
  </svg>
);

const ArrowButtonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26"
  >
    <g fill="none" fill-rule="evenodd">
      <g>
        <g>
          <g transform="translate(-957 -794) translate(813 794) translate(144)">
            <rect width="26" height="26" fill="#4B68EF" rx="4" />
            <path
              fill="#FFF"
              d="M10.713 11h4.393c.553 0 1 .448 1 1 0 .291-.126.568-.347.758l-2.186 1.883c-.374.322-.927.323-1.302.003l-2.207-1.883c-.42-.359-.47-.99-.112-1.41.19-.223.468-.351.76-.351z"
              transform="rotate(-90 12.9 13.1)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const ArrowButtonIcon1 = () => (
  
<svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="31.5" y="32.291" width="31" height="31" rx="3.5" transform="rotate(-180 31.5 32.291)" fill="white"/>
<path d="M20.16 21.381L15.58 16.791L20.16 12.201L18.75 10.791L12.75 16.791L18.75 22.791L20.16 21.381Z" fill="#C4CDD5"/>
<rect x="31.5" y="32.291" width="31" height="31" rx="3.5" transform="rotate(-180 31.5 32.291)" stroke="#DFE3E8"/>
</svg>



);

const ArrowButtonIcon2 = () => (
  
  

<svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.15997 11.381L3.57997 6.79102L8.15997 2.20102L6.74997 0.791016L0.749974 6.79101L6.74997 12.791L8.15997 11.381Z" fill="#C4CDD5"/>
</svg>


  
  
  
  );

  const PageButtonIcon = () => (
  
    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="31.5" y="32.291" width="31" height="31" rx="3.5" transform="rotate(-180 31.5 32.291)" fill="white"/>
    <path d="M20.16 21.381L15.58 16.791L20.16 12.201L18.75 10.791L12.75 16.791L18.75 22.791L20.16 21.381Z" fill="#C4CDD5"/>
    <rect x="31.5" y="32.291" width="31" height="31" rx="3.5" transform="rotate(-180 31.5 32.291)" stroke="#DFE3E8"/>
    </svg>
    
    
    
    );
const ChevronButtonIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    {...props}
  >
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(-242 -198) translate(201 196) translate(41 2)">
        <rect
          width="19"
          height="19"
          x=".5"
          y=".5"
          fill="#FFF"
          stroke="#E4E8F0"
          rx="2"
        />
        <path
          stroke="#7A869A"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M6 9L9.945 12 14 9"
        />
      </g>
    </g>
  </svg>
);

const PanoramaImage = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="31"
    height="23"
    viewBox="0 0 31 23"
  >
    <g fill="none" fill-rule="evenodd">
      <g fill="#7A869A" fill-rule="nonzero">
        <g>
          <g>
            <path
              d="M236.958 104.778c1.427 0 2.584-1.144 2.584-2.556 0-1.411-1.157-2.555-2.584-2.555-1.426 0-2.583 1.144-2.583 2.555 0 1.412 1.157 2.556 2.583 2.556zM244.715 92c-.078 0-.155.007-.231.02-9.252 1.611-18.716 1.611-27.968 0-.076-.013-.153-.02-.23-.02-.341-.001-.668.131-.91.37-.24.237-.376.56-.376.896v20.468c0 .336.136.66.377.897s.568.37.908.369c.078 0 .155-.007.231-.02 9.252-1.611 18.716-1.611 27.968 0 .076.013.153.02.23.02.341.001.668-.131.91-.37.24-.237.376-.56.376-.896V93.266c0-.336-.136-.66-.377-.897s-.568-.37-.908-.369zm-2.59 18.733c-2.468-.338-4.955-.557-7.443-.68l-8.057-9.109-7.75 8.762v-13.44c7.713 1.06 15.537 1.06 23.25 0v14.467z"
              transform="translate(-497 -203) translate(242) translate(40 111)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const CheckBoxTick = ({ ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
   
    <g fill="none" fillRule="evenodd">
      <rect
        stroke="#4B68EF"
        strokeWidth={2}
        fill="#4B68EF"
        width={16}
        height={16}
        rx={2}
      />
      <path
        d="M5.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L7 8.586 5.707 7.293z"
        fill="#FFF"
      />
    </g>
  </svg>
);
const TrashSquareButton = ({ ...props }) => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{'Delete'}</title>
    <g fillRule="nonzero" fill="none">
      <rect fillOpacity={0.3} fill="#000" width={30} height={30} rx={2} />
      <path
        d="M10.534 20.903c.035.617.517 1.098 1.1 1.097h6.732c.583.001 1.065-.48 1.1-1.097l.484-8.236h-9.9l.484 8.236zm9.416-10.57H18.3V9.75c0-.966-.739-1.75-1.65-1.75h-3.3c-.911 0-1.65.784-1.65 1.75v.583h-1.65c-.304 0-.55.261-.55.584 0 .322.246.583.55.583h9.9c.304 0 .55-.261.55-.583 0-.323-.246-.584-.55-.584zm-2.75 0h-4.4V9.75c0-.322.246-.583.55-.583h3.3c.304 0 .55.26.55.583v.583z"
        fill="#FFF"
      />
    </g>
  </svg>
);
const TickSquareButton = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
  >
    <g fill="none" fill-rule="evenodd">
      <g fill-rule="nonzero">
        <g>
          <g>
            <g
              fill="#000"
              fill-opacity=".3"
              transform="translate(-702 -153) translate(282 111) translate(420 42)"
            >
              <rect width="30" height="30" rx="2" />
            </g>
            <path
              fill="#FFF"
              d="M19.95 10.05c-2.002-2.002-5.013-2.6-7.629-1.517C9.705 9.616 8 12.169 8 15c0 2.831 1.705 5.384 4.321 6.467 2.616 1.083 5.627.485 7.629-1.517 2.733-2.734 2.733-7.166 0-9.9zm-1.59 2.996l-3.856 4.499-2.77-2.078c-.168-.125-.256-.33-.23-.537.024-.207.158-.386.35-.467.192-.082.413-.055.58.07l1.896 1.422 3.144-3.668c.135-.158.345-.232.55-.194.205.039.374.183.443.38.07.197.028.415-.107.573z"
              transform="translate(-702 -153) translate(282 111) translate(420 42)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const RadioButtonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <g fill="none" fill-rule="evenodd">
      <g fill="#4B68EF" fill-rule="nonzero">
        <path
          d="M5.64 5.643c-.954.953-1.239 2.387-.723 3.633.516 1.245 1.73 2.057 3.078 2.057 1.347 0 2.562-.812 3.077-2.057.516-1.246.23-2.68-.722-3.633-1.3-1.302-3.41-1.302-4.71 0zm8.008-3.3C10.526-.78 5.464-.78 2.342 2.343c-3.123 3.124-3.123 8.19 0 11.314 3.122 3.124 8.184 3.124 11.306 0C15.153 12.16 16 10.124 16 8s-.847-4.16-2.352-5.657zm-1.413 9.9c-1.715 1.716-4.294 2.229-6.535 1.3C3.46 12.615 2 10.427 2 8S3.459 3.385 5.7 2.457c2.24-.929 4.82-.416 6.535 1.3 1.134 1.12 1.772 2.649 1.772 4.243 0 1.594-.638 3.123-1.772 4.243z"
          transform="translate(-298 -1004) translate(242) translate(40 383) translate(16 621)"
        />
      </g>
    </g>
  </svg>
);
const ZoomOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
  >
    <g fill="none" fill-rule="evenodd">
      <g fill="#FFF" fill-rule="nonzero">
        <g>
          <g>
            <g>
              <path
                d="M12.804 2.201C10.458-.149 6.844-.677 3.924.906 1.005 2.49-.525 5.804.165 9.054c.69 3.249 3.434 5.657 6.745 5.918l-.03.028H15V7.503c.003-1.99-.788-3.897-2.196-5.302zM11.48 11.48c-2.196 2.196-5.756 2.196-7.952 0-2.196-2.196-2.196-5.756 0-7.952 2.196-2.196 5.756-2.196 7.952 0 1.063 1.05 1.662 2.481 1.662 3.976 0 1.494-.599 2.926-1.662 3.976zM8.128 6.878H4.379c-.345 0-.625.28-.625.625s.28.625.625.625h6.248c.345 0 .624-.28.624-.625s-.28-.625-.624-.625h-2.5z"
                transform="translate(-654 -335) translate(242) translate(42 111) translate(370 224)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const ZoomInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
  >
    <g fill="none" fill-rule="evenodd">
      <g fill="#FFF" fill-rule="nonzero">
        <g>
          <g>
            <g>
              <path
                d="M34.804 2.201c-2.346-2.35-5.96-2.878-8.88-1.295-2.92 1.583-4.45 4.898-3.76 8.148.69 3.249 3.434 5.657 6.745 5.918l-.03.028H37V7.503c.003-1.99-.788-3.897-2.196-5.302zM33.48 11.48c-2.196 2.196-5.756 2.196-7.952 0-2.196-2.196-2.196-5.756 0-7.952 2.196-2.196 5.756-2.196 7.952 0 1.063 1.05 1.662 2.481 1.662 3.976 0 1.494-.599 2.926-1.662 3.976zm-.852-4.601h-2.5v-2.5c0-.344-.28-.624-.624-.624-.345 0-.625.28-.625.625v2.499H26.38c-.345 0-.625.28-.625.625s.28.625.625.625h2.5v2.499c0 .345.279.624.624.624s.625-.28.625-.624v-2.5h2.499c.345 0 .624-.28.624-.624 0-.345-.28-.625-.624-.625z"
                transform="translate(-676 -335) translate(242) translate(42 111) translate(370 224)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const RotateLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="16"
    viewBox="0 0 14 16"
  >
    <g fill="none" fill-rule="evenodd">
      <g fill="#FFF" fill-rule="nonzero">
        <g>
          <g>
            <g>
              <path
                d="M7.672 2.328C11.225 2.674 14 5.608 14 9.178c0 3.49-2.654 6.373-6.094 6.822v-2.326c2.14-.425 3.75-2.276 3.75-4.496 0-2.3-1.729-4.206-3.984-4.538v2.243L2.985 3.442 7.672 0v2.328zM2.704 14.65c.949.71 2.087 1.188 3.328 1.35v-2.326c-.599-.118-1.156-.35-1.648-.668l-1.68 1.644zm-1.326-1.298C.654 12.424.165 11.31 0 10.095h2.375c.122.586.357 1.131.683 1.613l-1.68 1.644zm-.05-8.285C.632 5.983.162 7.074 0 8.26h2.375c.139-.668.426-1.283.825-1.812L1.33 5.068z"
                transform="translate(-699 -334) translate(242) translate(42 111) translate(415 223)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const RotateRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="16"
    viewBox="0 0 14 16"
  >
    <g fill="none" fill-rule="evenodd">
      <g fill="#FFF" fill-rule="nonzero">
        <g>
          <g>
            <g>
              <path
                d="M28.672 2.328C32.225 2.674 35 5.608 35 9.178c0 3.49-2.654 6.373-6.094 6.822v-2.326c2.14-.425 3.75-2.276 3.75-4.496 0-2.3-1.729-4.206-3.984-4.538v2.243l-4.687-3.441L28.672 0v2.328zM23.704 14.65c.949.71 2.087 1.188 3.328 1.35v-2.326c-.599-.118-1.156-.35-1.648-.668l-1.68 1.644zm-1.326-1.298c-.724-.928-1.213-2.042-1.378-3.257h2.375c.122.586.357 1.131.683 1.613l-1.68 1.644zm-.05-8.285c-.697.916-1.167 2.007-1.328 3.193h2.375c.139-.668.426-1.283.825-1.812l-1.871-1.38z"
                transform="translate(-720 -334) translate(242) translate(42 111) translate(415 223) matrix(-1 0 0 1 56 0)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <g fill="none" fill-rule="evenodd">
      <g fill="#7A869A" fill-rule="nonzero">
        <g>
          <path
            d="M90 417h-6v-6c0-1.105-.895-2-2-2s-2 .895-2 2v6h-6c-1.105 0-2 .895-2 2s.895 2 2 2h6v6c0 1.105.895 2 2 2s2-.895 2-2v-6h6c1.105 0 2-.895 2-2s-.895-2-2-2z"
            transform="translate(-314 -409) translate(242)"
          />
        </g>
      </g>
    </g>
  </svg>
);
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="14"
    viewBox="0 0 12 14"
  >
    <g fill="none" fill-rule="evenodd">
      <g fill="#7a869a" fill-rule="nonzero">
        <g>
          <path
            d="M24.4 15v3.5H28L24.4 15zm-1.2 0h-6c-.663 0-1.2.522-1.2 1.167v11.666c0 .645.537 1.167 1.2 1.167h3.6v-2.333h-1.551c-.243 0-.462-.142-.555-.36-.093-.218-.041-.47.13-.636L22 22.583l3.176 3.088c.171.167.223.418.13.636-.093.217-.312.36-.554.36H23.2V29h3.6c.663 0 1.2-.522 1.2-1.167v-8.166h-4.8V15z"
            transform="translate(-802 -137) translate(786 122)"
          />
        </g>
      </g>
    </g>
  </svg>
);
const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <g fill="none" fill-rule="evenodd">
      <g fill="#7A869A" fill-rule="nonzero">
        <g>
          <path
            d="M15.583 17.916h1.75v.584c0 .644.523 1.167 1.167 1.167s1.167-.523 1.167-1.167v-2.333c0-.645-.523-1.167-1.167-1.167s-1.167.522-1.167 1.167v.583h-1.75c-.322 0-.583.26-.583.583 0 .322.261.583.583.583zm0 4.668h7.584v-1.167h-7.584c-.322 0-.583.261-.583.583 0 .322.261.584.583.584zM29 17.333c0-.322-.261-.583-.583-.583h-7.584v1.167h7.584c.322 0 .583-.262.583-.584zm-14 9.333c0 .323.261.584.583.584H18.5v-1.167h-2.917c-.322 0-.583.261-.583.583zm13.417-5.249h-1.75v-.584c0-.644-.523-1.166-1.167-1.166s-1.167.522-1.167 1.166v2.334c0 .644.523 1.166 1.167 1.166s1.167-.522 1.167-1.166v-.583h1.75c.322 0 .583-.262.583-.584 0-.322-.261-.583-.583-.583zm0 4.666H22V25.5c0-.644-.522-1.167-1.167-1.167-.644 0-1.166.523-1.166 1.167v2.333c0 .645.522 1.167 1.166 1.167.645 0 1.167-.522 1.167-1.167v-.583h6.417c.322 0 .583-.261.583-.584 0-.322-.261-.583-.583-.583z"
            transform="translate(-745 -137) translate(730 122)"
          />
        </g>
      </g>
    </g>
  </svg>
);

const CloseIcon = ({
  width = 24,
  height = 24,
  color = '#131415',
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{'close'}</title>
    <path
      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.707 15.293a1 1 0 11-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 12 7.293 8.707a1 1 0 111.414-1.414L12 10.586l3.293-3.293a1 1 0 111.414 1.414L13.414 12l3.293 3.293z"
      fill={color}
      fillRule="nonzero"
    />
  </svg>
);
const LogoutIcon = ({ color = '#5d6476', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={color}
      d="M13.967,21.3l1.866,1.867L22.5,16.5,15.833,9.833,13.967,11.7l3.467,3.467H4.5v2.667H17.366ZM25.833,4.5H7.167A2.674,2.674,0,0,0,4.5,7.167V12.5H7.167V7.167H25.833V25.833H7.167V20.5H4.5v5.333A2.674,2.674,0,0,0,7.167,28.5H25.833A2.674,2.674,0,0,0,28.5,25.833V7.167A2.674,2.674,0,0,0,25.833,4.5Z"
      transform="translate(-4.5 -4.5)"
    />
  </svg>
);
const TrendingIcon = ({width=24,height=14,...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 14"
    {...props}
  >
    <g
      fill="none"
      fill-rule="evenodd"
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      transform="translate(1 1)"
    >
      <path d="M22 0l-9.5 9.5-5-5L0 12" />
      <path d="M16 0h6v6" />
    </g>
  </svg>

 
);

const SearchIcon = () => (
  <svg width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27 31C31.4183 31 35 27.4183 35 23C35 18.5817 31.4183 15 27 15C22.5817 15 19 18.5817 19 23C19 27.4183 22.5817 31 27 31Z" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M37 33L32.65 28.65" stroke="#37352F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="0.5" y="0.5" width="55" height="47" rx="9.5" stroke="black" stroke-opacity="0.1"/>
</svg>

);

const FilterIcon2 =() => (
  
<svg width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M38 15H18L26 24.46V31L30 33V24.46L38 15Z" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="0.5" y="0.5" width="55" height="47" rx="9.5" stroke="black" stroke-opacity="0.1"/>
</svg>

);

const StarIcon = () => (
  
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F2733C" stroke="#F2733C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const CancelICon = () => (
  
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L6 18" stroke="#37352F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 6L18 18" stroke="#37352F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const PodcastIcon = () => (
  
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 23C18 20.799 15.3 19 12 19C8.7 19 6 20.799 6 23" stroke="#AFAFAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 15C13.656 15 15 13.656 15 12C15 10.344 13.656 9 12 9C10.344 9 9 10.344 9 12C9 13.656 10.344 15 12 15Z" stroke="#AFAFAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5185 16.296C18.4435 15.109 18.9995 13.621 18.9995 12C18.9995 8.134 15.8665 5 11.9995 5C8.13351 5 4.99951 8.134 4.99951 12C4.99951 13.621 5.55651 15.109 6.48051 16.296" stroke="#AFAFAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.589 18.862C22.094 16.98 23 14.597 23 12C23 5.924 18.075 1 12 1C5.925 1 1 5.924 1 12C1 14.597 1.906 16.98 3.411 18.862" stroke="#AFAFAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const TrashIcon = () => (

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18ZM20 6H16V5C16 4.20435 15.6839 3.44129 15.1213 2.87868C14.5587 2.31607 13.7956 2 13 2H11C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5V6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7C3 7.26522 3.10536 7.51957 3.29289 7.70711C3.48043 7.89464 3.73478 8 4 8H5V19C5 19.7956 5.31607 20.5587 5.87868 21.1213C6.44129 21.6839 7.20435 22 8 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19V8H20C20.2652 8 20.5196 7.89464 20.7071 7.70711C20.8946 7.51957 21 7.26522 21 7C21 6.73478 20.8946 6.48043 20.7071 6.29289C20.5196 6.10536 20.2652 6 20 6ZM10 5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V6H10V5ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V8H17V19ZM14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18Z" fill="white"/>
</svg>

);

export {
  DashboardIcon,
  CityIcon,
  ContentIcon,
  CategoryIcon,
  ComponentIcon,
  AppLogo,
  ArrowButtonIcon,
  ArrowButtonIcon2,
  ArrowButtonIcon1,
  PageButtonIcon,
  PanoramaImage,
  ChevronButtonIcon,
  CheckBoxTick,
  RadioButtonIcon,
  TrashSquareButton,
  TickSquareButton,
  ZoomInIcon,
  ZoomOutIcon,
  RotateLeftIcon,
  RotateRightIcon,
  PlusIcon,
  FilterIcon,
  UploadIcon,
  CloseIcon,
  TagCloseButton,
  LogoutIcon,
  TrendingIcon,
  ProfileIcon,
  SearchIcon,
  FilterIcon2,
  StarIcon,
  CancelICon,
  PodcastIcon,
  TrashIcon,

};