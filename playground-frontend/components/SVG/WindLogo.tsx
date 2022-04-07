const WindLogo = () => {
    return (
        <svg
            viewBox="0 0 96 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bounce"
        >
            <path d="M0 0V64H78L36 39.1642L0 0Z" fill="#25E3D8" />
            <path d="M96 0V64H18L60 39.1642L96 0Z" fill="#25E3D8" />
            <g filter="url(#filter0_i_2_11)">
                <path d="M47 6L8 64H86L47 6Z" fill="#00F8E9" />
            </g>
            <defs>
                <filter
                    id="filter0_i_2_11"
                    x="8"
                    y="6"
                    width="78"
                    height="62"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="12" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.939516 0 0 0 1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_2_11"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default WindLogo;
