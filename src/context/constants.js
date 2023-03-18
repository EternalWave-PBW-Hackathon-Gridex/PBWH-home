export const SUPPORT_WALLET_KEYS = {
  MetaMask: "MetaMask",
  CoinBase: "Coinbase Wallet",
  Portis: "Portis",
  WalletConnect: "WalletConnect"
};

export const CHAINS = {
  POLYGON: {
    id: 137,
    token: "MATIC",
    label: "Matic Mainnet",
    rpcUrl:
      "https://polygon-mainnet.g.alchemy.com/v2/c0qTDpStzHbCw_Dd602hhSDDu6PnkA1l"
  },
  MUMBAI: {
    id: 80001,
    token: "MATIC",
    label: "Matic Mumbai",
    rpcUrl:
      "https://polygon-mumbai.g.alchemy.com/v2/3WownnAxK78B8VT6h0KWrbtNJZvbg7kY"
  }
};

export const RESOURCES = {
  ICON: `<svg width="40" height="40" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_101_10055)">
    <path d="M512 0H0V512H512V0Z" fill="#AA00FF"/>
    <path d="M247.34 228.06C308.44 232.61 359.43 184.38 359.43 124.25C359.43 92.0601 344.81 63.2901 321.86 44.2001C321.25 43.6901 320.42 44.5001 320.91 45.1401C332.33 60.0501 338.78 78.9601 337.79 99.4101C335.77 140.83 302.53 174.8 261.16 177.65C212.92 180.97 172.75 142.81 172.75 95.2801C172.75 76.4101 179.09 59.0301 189.74 45.1301C190.23 44.4901 189.41 43.6801 188.79 44.1901C164.18 64.6601 149.15 96.2501 151.44 131.26C154.8 182.59 196.05 224.25 247.35 228.07L247.34 228.06Z" fill="white"/>
    <path d="M312.01 140.38C309.32 138.48 306.48 136.8 303.56 135.3C297.13 131.99 290.27 129.5 283.27 127.69C275.85 125.76 268.22 124.58 260.57 124.21L275.22 82.15L255.31 25L235.4 82.15L250.05 124.21C242.39 124.58 234.77 125.76 227.35 127.69C220.35 129.51 213.5 131.99 207.06 135.3C204.14 136.8 201.3 138.48 198.61 140.38C198.06 140.77 196.97 141.21 197.31 141.89C197.95 143.17 199.99 145.34 201.26 146.7C202.82 148.39 204.47 149.99 206.19 151.51C210.79 155.58 215.96 158.91 221.33 161.88C224.81 163.8 228.6 165.46 232.42 166.56C238.41 168.43 244.51 169.53 250.76 169.97C250.81 169.97 250.86 169.97 250.9 169.97C252.29 170.06 253.68 170.11 255.1 170.12C255.12 170.12 255.14 170.12 255.17 170.12C255.17 170.12 255.27 170.12 255.32 170.12C255.37 170.12 255.42 170.12 255.47 170.12C255.47 170.12 255.52 170.12 255.54 170.12C256.95 170.12 258.35 170.07 259.74 169.97C259.79 169.97 259.83 169.97 259.88 169.97C266.13 169.53 272.23 168.43 278.22 166.56C282.04 165.47 285.84 163.8 289.31 161.88C294.68 158.92 299.84 155.58 304.45 151.51C306.17 149.99 307.82 148.38 309.38 146.7C310.64 145.34 312.68 143.17 313.32 141.89C313.66 141.21 312.57 140.77 312.02 140.38H312.01Z" fill="white"/>
    <path d="M134.18 251.28C150.86 272.75 176.44 286.74 201.95 294.97C209.41 297.38 217 299.11 224.8 299.99L202.98 223.43C199.29 221.51 195.59 219.75 192.19 217.34C188.75 214.9 185.41 212.33 182.22 209.59C176.39 204.58 170.84 198.93 166.89 192.28C166.82 192.16 166.21 191.28 166.27 191.19C155.77 208.09 144.47 224.98 133.97 241.88C132.96 243.5 131.91 245.29 132.11 247.19C132.27 248.73 133.23 250.06 134.18 251.28Z" fill="white"/>
    <path d="M160.44 284.83C152.87 279.99 145.94 274.35 140.22 267.83C140.1 268.02 139.98 268.21 139.87 268.4C129.49 285.11 119.11 301.81 108.73 318.52C107.72 320.14 106.67 321.93 106.87 323.83C106.98 324.91 107.5 325.89 108.12 326.8C115.45 334.43 123.84 341.04 133.19 345.87L133.42 345.99C152.47 357.52 174.71 363.7 196.77 366.84C200.57 367.38 204.37 367.84 208.14 368.21C212.53 352.09 224.8 308.85 224.8 308.84C202.53 305 179.53 297.03 160.44 284.83Z" fill="white"/>
    <path d="M376.45 251.28C359.77 272.75 334.19 286.74 308.68 294.97C301.22 297.38 293.63 299.11 285.83 299.99L307.65 223.43C311.34 221.51 315.04 219.75 318.44 217.34C321.88 214.9 325.22 212.33 328.41 209.59C334.24 204.58 339.79 198.93 343.74 192.28C343.81 192.16 344.42 191.28 344.36 191.19C354.86 208.09 366.16 224.98 376.66 241.88C377.67 243.5 378.72 245.29 378.52 247.19C378.36 248.73 377.4 250.06 376.45 251.28Z" fill="white"/>
    <path d="M350.19 284.83C357.76 279.99 364.69 274.35 370.41 267.83C370.53 268.02 370.65 268.21 370.76 268.4C381.14 285.11 391.52 301.81 401.9 318.52C402.91 320.14 403.96 321.93 403.76 323.83C403.65 324.91 403.13 325.89 402.51 326.8C395.18 334.43 386.79 341.04 377.44 345.87L377.21 345.99C358.16 357.52 335.92 363.7 313.86 366.84C310.06 367.38 306.26 367.84 302.49 368.21C298.1 352.09 285.83 308.85 285.83 308.84C308.1 305 331.1 297.03 350.19 284.83Z" fill="white"/>
    <path d="M277.46 310.03H259H251.63H233.16L222.02 352.93H249.54H261.08H288.61L277.46 310.03Z" fill="white"/>
    <path d="M106.09 418.93C106.92 417.3 107.73 415.41 108.51 413.26C111.14 414.78 114.2 415.96 117.68 416.82C121.16 417.68 124.41 418.1 127.41 418.1C130.41 418.1 132.65 417.83 133.91 417.29C135.17 416.75 135.8 416.17 135.8 415.54C135.8 413.28 132.35 412.15 125.46 412.15C117.9 412.15 112.42 411.36 109.01 409.79C105.6 408.22 103.9 405.67 103.9 402.15C103.9 397.15 105.97 393.46 110.12 391.09C114.27 388.72 119.66 387.53 126.29 387.53C130.14 387.53 134.1 388.02 138.16 389C142.22 389.98 145.87 391.33 149.14 393.03C148.06 395.47 146.94 398.46 145.75 401.98C145.53 402.72 145.34 403.28 145.19 403.65C143.3 402.13 140.45 400.86 136.63 399.84C132.81 398.82 129.44 398.31 126.51 398.31C122.99 398.31 120.62 398.54 119.4 399C118.18 399.46 117.57 400.14 117.57 401.03C117.57 401.92 118.41 402.63 120.1 403.17C121.79 403.71 124.22 403.98 127.41 403.98C135.26 403.98 140.97 404.88 144.53 406.68C148.09 408.48 149.86 411.23 149.86 414.93C149.86 420.12 147.97 423.85 144.19 426.13C140.41 428.41 134.69 429.55 127.02 429.55C122.91 429.55 118.72 429.1 114.46 428.19C110.2 427.28 106.36 425.96 102.96 424.22C104.22 422.33 105.27 420.57 106.1 418.94L106.09 418.93Z" fill="white"/>
    <path d="M201.1 388.65C200.84 394.91 200.71 401.64 200.71 408.82C200.71 416 200.84 422.73 201.1 428.99H188.04V413.87H167.59V428.99H154.53C154.83 421.8 154.98 415.08 154.98 408.82C154.98 402.56 154.83 395.83 154.53 388.65H167.59V403.77H188.04V388.65H201.1Z" fill="white"/>
    <path d="M211.64 424.02C207.64 420.33 205.64 415.15 205.64 408.49C205.64 401.83 207.63 396.75 211.61 393.04C215.59 389.33 221.84 387.48 230.37 387.48C238.9 387.48 245.2 389.33 249.18 393.04C253.16 396.75 255.15 401.9 255.15 408.49C255.15 415.08 253.17 420.38 249.2 424.05C245.23 427.72 238.95 429.55 230.36 429.55C221.77 429.55 215.63 427.71 211.63 424.02H211.64ZM239.26 415.85C241.07 414.28 241.98 411.82 241.98 408.49C241.98 405.16 241.07 402.8 239.26 401.21C237.44 399.62 234.48 398.82 230.37 398.82C226.26 398.82 223.35 399.62 221.53 401.21C219.71 402.8 218.81 405.23 218.81 408.49C218.81 411.75 219.72 414.23 221.53 415.83C223.34 417.42 226.29 418.22 230.37 418.22C234.45 418.22 237.45 417.43 239.26 415.86V415.85Z" fill="white"/>
    <path d="M281.75 405.99H305.48V429H295.7L294.53 419.16C293.42 422.68 291.44 425.29 288.58 427C285.73 428.71 282.24 429.56 278.13 429.56C274.39 429.56 271.06 428.73 268.15 427.06C265.24 425.39 262.96 423 261.31 419.89C259.66 416.78 258.84 413.15 258.84 409C258.84 402.37 260.82 397.12 264.79 393.27C268.75 389.42 274.92 387.49 283.3 387.49C288.08 387.49 292.29 388.27 295.94 389.82C299.59 391.38 302.69 393.79 305.25 397.05C303.58 397.9 300.32 399.61 295.47 402.16L294.08 402.94C292.63 401.5 290.95 400.41 289.02 399.69C287.09 398.97 285.06 398.61 282.91 398.61C279.35 398.61 276.7 399.55 274.96 401.42C273.22 403.29 272.35 405.6 272.35 408.34C272.35 411.3 273.29 413.69 275.16 415.51C277.03 417.33 279.89 418.23 283.75 418.23C285.42 418.23 287.04 417.99 288.61 417.51C290.18 417.03 291.51 416.19 292.58 415.01H281.74V406.01L281.75 405.99Z" fill="white"/>
    <path d="M343.35 388.59H357.13V410.71C357.05 416.16 355.19 420.66 351.54 424.21C347.89 427.76 341.75 429.54 333.12 429.54C324.49 429.54 318.39 427.84 315.17 424.46C311.95 421.07 310.37 416.62 310.45 411.09V388.58H324.23V410.2C324.23 411.83 324.35 413.16 324.59 414.17C324.83 415.19 325.61 416.14 326.92 417.03C328.23 417.92 330.36 418.36 333.28 418.36C336.47 418.36 338.8 417.91 340.28 417C341.76 416.09 342.64 415.08 342.92 413.97C343.2 412.86 343.34 411.43 343.34 409.69V388.57L343.35 388.59Z" fill="white"/>
    <path d="M409.05 388.7C408.79 394.96 408.66 401.67 408.66 408.82C408.66 415.97 408.79 422.73 409.05 428.99H389.15L375.7 398.65L376.7 428.99H362.42C362.72 421.8 362.87 415.08 362.87 408.82C362.87 402.56 362.72 395.89 362.42 388.7H382.87L396.37 419.88L395.43 388.7H409.05Z" fill="white"/>
    </g>
    <defs>
    <clipPath id="clip0_101_10055">
    <rect width="512" height="512" fill="white"/>
    </clipPath>
    </defs>
    </svg>`,
  BANNER: `<svg width="204" height="72" viewBox="0 0 1500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_101_7550)">
    <rect width="1500" height="500" fill="white"/>
    <path d="M1500 0H0V500H1500V0Z" fill="#E7773A"/>
    <path d="M485.275 22H1014.74L1389 478H111L485.275 22Z" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M197.752 372.301H1302.25" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M263.766 291.876H1236.23" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M315.681 228.623H1184.32" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M357.577 177.576H1142.42" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M392.104 135.511H1107.9" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M421.051 100.248H1078.95" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M445.659 70.269H1054.34" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M466.847 44.4565H1033.15" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M955.901 22L1247 478" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M897.076 22L1105 478" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M838.242 22L963 478" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M779.417 22L821.003 478" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M720.583 22L678.997 478" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M661.758 22L537 478" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M602.924 22L395.003 478" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M544.099 22L252.997 478" stroke="#363536" stroke-width="0.63" stroke-miterlimit="10"/>
    <path d="M464.24 248.49C465.989 245.009 467.519 241.422 468.82 237.75C474.269 240.808 480.124 243.077 486.21 244.49C492.237 246.033 498.429 246.846 504.65 246.91C510.48 246.91 514.65 246.4 516.98 245.39C519.31 244.38 520.57 243.26 520.57 242.07C520.57 237.777 514.033 235.634 500.96 235.64C486.627 235.64 476.23 234.147 469.77 231.16C463.31 228.174 460.077 223.344 460.07 216.67C460.07 207.177 464.007 200.177 471.88 195.67C479.753 191.164 489.973 188.94 502.54 189C510.124 189.034 517.677 189.97 525.04 191.79C532.266 193.48 539.259 196.049 545.86 199.44C543.82 204.067 541.677 209.734 539.43 216.44C539.01 217.85 538.66 218.9 538.43 219.6C534.837 216.72 529.427 214.314 522.2 212.38C515.955 210.565 509.502 209.563 503 209.4C496.333 209.4 491.837 209.837 489.51 210.71C487.183 211.584 486.013 212.867 486 214.56C486 216.254 487.597 217.607 490.79 218.62C493.983 219.634 498.603 220.144 504.65 220.15C519.55 220.15 530.37 221.854 537.11 225.26C543.85 228.667 547.223 233.884 547.23 240.91C547.23 250.737 543.647 257.814 536.48 262.14C529.313 266.467 518.46 268.627 503.92 268.62C495.91 268.585 487.926 267.706 480.1 266C472.528 264.456 465.192 261.925 458.28 258.47C460.456 255.26 462.446 251.928 464.24 248.49Z" fill="#AA00FF"/>
    <path d="M644.81 191.06C644.323 202.933 644.08 215.683 644.08 229.31C644.08 242.937 644.323 255.69 644.81 267.57H620.05V238.9H581.27V267.57H556.5C557.06 253.943 557.34 241.19 557.34 229.31C557.34 217.43 557.06 204.68 556.5 191.06H581.27V219.73H620.05V191.06H644.81Z" fill="#AA00FF"/>
    <path d="M665.19 258.14C657.603 251.147 653.807 241.327 653.8 228.68C653.8 216.18 657.577 206.417 665.13 199.39C672.683 192.363 684.54 188.85 700.7 188.85C716.927 188.85 728.817 192.363 736.37 199.39C743.923 206.417 747.7 216.18 747.7 228.68C747.7 241.4 743.943 251.237 736.43 258.19C728.917 265.143 717.007 268.62 700.7 268.62C684.613 268.62 672.777 265.127 665.19 258.14ZM717.56 242.65C721 239.663 722.723 234.997 722.73 228.65C722.73 222.47 721.007 217.87 717.56 214.85C714.113 211.83 708.493 210.32 700.7 210.32C692.967 210.32 687.38 211.83 683.94 214.85C680.5 217.87 678.78 222.47 678.78 228.65C678.78 234.91 680.5 239.547 683.94 242.56C687.38 245.573 692.967 247.083 700.7 247.09C708.5 247.11 714.12 245.63 717.56 242.65Z" fill="#AA00FF"/>
    <path d="M798.57 223.94H843.57V267.57H825L822.79 248.92C820.683 255.587 816.927 260.54 811.52 263.78C806.113 267.02 799.507 268.633 791.7 268.62C785.088 268.743 778.562 267.108 772.79 263.88C767.236 260.7 762.721 255.98 759.79 250.29C756.552 243.894 754.941 236.798 755.1 229.63C755.1 217.05 758.86 207.11 766.38 199.81C773.9 192.51 785.597 188.843 801.47 188.81C809.687 188.643 817.852 190.147 825.47 193.23C832.447 196.227 838.536 200.969 843.15 207C839.99 208.62 833.807 211.853 824.6 216.7L822 218.14C819.285 215.419 816.014 213.318 812.41 211.98C808.703 210.6 804.776 209.902 800.82 209.92C794.073 209.92 789.05 211.697 785.75 215.25C782.423 218.796 780.627 223.509 780.75 228.37C780.75 233.99 782.523 238.52 786.07 241.96C789.617 245.4 795.047 247.12 802.36 247.12C805.484 247.127 808.591 246.669 811.58 245.76C814.477 244.894 817.081 243.251 819.11 241.01H798.57V223.94Z" fill="#AA00FF"/>
    <path d="M915.76 191H941.9V232.9C941.747 243.233 938.213 251.77 931.3 258.51C924.387 265.25 912.743 268.62 896.37 268.62C879.79 268.62 868.457 265.407 862.37 258.98C856.283 252.553 853.283 244.107 853.37 233.64V191H879.51V232C879.452 234.528 879.681 237.054 880.19 239.53C880.65 241.47 882.12 243.28 884.62 244.96C887.12 246.64 891.13 247.49 896.69 247.49C902.73 247.49 907.153 246.63 909.96 244.91C912.767 243.19 914.433 241.273 914.96 239.16C915.546 236.498 915.812 233.775 915.75 231.05L915.76 191Z" fill="#AA00FF"/>
    <path d="M1040.72 191.17C1040.24 203.057 1040 215.77 1040 229.31C1040 242.85 1040.25 255.603 1040.74 267.57H1003L977.48 210L979.38 267.54H952.3C952.86 253.913 953.14 241.16 953.14 229.28C953.14 217.4 952.86 204.687 952.3 191.14H991.08L1016.69 250.26L1014.9 191.14L1040.72 191.17Z" fill="#AA00FF"/>
    <path d="M643.88 318.26C640.88 315.593 639.38 311.747 639.38 306.72C639.38 301.693 640.88 297.723 643.88 294.81C646.887 291.89 651.553 290.43 657.88 290.43C666.747 290.43 672.683 293.473 675.69 299.56C672.646 300.666 669.679 301.976 666.81 303.48C665.992 301.905 664.642 300.672 663 300C661.308 299.254 659.479 298.866 657.63 298.86C654.963 298.86 652.963 299.57 651.63 300.99C650.321 302.479 649.611 304.401 649.639 306.384C649.667 308.366 650.43 310.268 651.78 311.72C653.193 313.14 655.36 313.85 658.28 313.85C660.202 313.938 662.114 313.539 663.84 312.69C665.245 311.858 666.308 310.554 666.84 309.01C669.14 310.243 672.087 311.63 675.68 313.17C675.064 314.773 674.124 316.232 672.92 317.457C671.716 318.682 670.272 319.646 668.68 320.29C665.266 321.655 661.617 322.335 657.94 322.29C651.573 322.297 646.887 320.953 643.88 318.26Z" fill="#363536"/>
    <path d="M704.75 321.88C704.223 320.28 703.507 318.28 702.6 315.88H689.17L687.07 321.88H676.5L688.29 291.31H703.78L715.65 321.88H704.75ZM700.2 309.29C699.14 306.337 698.047 303.39 696.92 300.45L695.92 297.71C694.927 300.27 693.48 304.13 691.58 309.29H700.2Z" fill="#363536"/>
    <path d="M750.27 307.69C749.083 309.37 747.043 310.59 744.15 311.35C744.412 311.686 744.649 312.04 744.86 312.41L751.69 321.88H740.23C738.997 319.58 737.047 316.323 734.38 312.11H728.19V321.88H718.26C718.48 316.433 718.59 311.34 718.59 306.6C718.59 301.86 718.48 296.763 718.26 291.31H728.19V291.36H736.82C742.487 291.36 746.447 292.27 748.7 294.09C749.798 294.978 750.674 296.111 751.258 297.397C751.841 298.684 752.116 300.089 752.06 301.5C752.135 303.701 751.508 305.869 750.27 307.69ZM728.19 299.44V304.24H733.88C735.686 304.265 737.492 304.188 739.29 304.01C740.181 303.955 741.049 303.703 741.83 303.27C742.065 303.106 742.254 302.885 742.38 302.628C742.506 302.371 742.564 302.086 742.55 301.8C742.562 301.524 742.508 301.249 742.391 300.998C742.275 300.747 742.099 300.529 741.88 300.36C741.104 299.929 740.237 299.686 739.35 299.65C737.532 299.485 735.706 299.415 733.88 299.44H728.19Z" fill="#363536"/>
    <path d="M791.38 300.15C786.973 300.01 782.693 299.927 778.54 299.9V321.9H768V299.9C763.82 299.9 759.553 299.983 755.2 300.15V291.31H791.37L791.38 300.15Z" fill="#363536"/>
    <path d="M804.48 314.17C815.147 314.123 822.88 313.97 827.68 313.71C827.487 314.888 827.367 316.077 827.32 317.27C827.32 318.49 827.26 320.03 827.26 321.88H794.55C794.77 316.433 794.883 311.34 794.89 306.6C794.897 301.86 794.783 296.763 794.55 291.31H827.26V298.93H804.48V302.93C805.813 302.93 807.813 302.93 810.48 302.93C814.94 302.93 819.557 302.843 824.33 302.67V310C819.563 309.833 814.947 309.747 810.48 309.74C807.813 309.74 805.813 309.757 804.48 309.79V314.17Z" fill="#363536"/>
    <path d="M842 313.38C850.14 313.32 856.877 313.177 862.21 312.95C861.854 314.302 861.63 315.685 861.54 317.08C861.45 318.4 861.41 320 861.41 321.88H831.77C831.99 316.433 832.1 311.34 832.1 306.6C832.1 301.86 831.99 296.763 831.77 291.31H842V313.38Z" fill="#363536"/>
    <path d="M709.18 166.71L708.89 146.17H706.89C706.286 149.727 705.427 153.236 704.32 156.67C703.251 159.98 701.802 163.155 700 166.13L696.82 164.34C697.807 161.432 698.573 158.454 699.11 155.43C699.63 152.43 700 149.37 700.24 146.17H697.24L696.24 140.96L708.86 139.51L708.8 134.51H698.91L697.91 116.33L704.74 117.14V129.1L708.74 128.23L708.56 114.69L715.56 115.5L715 166L709.18 166.71ZM748.3 123.54C746.471 125.755 744.435 127.791 742.22 129.62C739.794 131.644 737.231 133.498 734.55 135.17C731.836 136.885 729.024 138.441 726.13 139.83C723.407 141.149 720.605 142.298 717.74 143.27L716 140C717.333 139.46 718.667 138.86 720 138.2C721.33 137.55 722.65 136.85 724 136.12H723.71C722.972 136.108 722.253 135.879 721.644 135.462C721.035 135.044 720.562 134.456 720.285 133.772C720.008 133.087 719.939 132.336 720.086 131.612C720.233 130.889 720.59 130.224 721.112 129.702C721.634 129.18 722.298 128.823 723.022 128.676C723.746 128.529 724.497 128.598 725.181 128.875C725.866 129.152 726.454 129.625 726.871 130.234C727.289 130.843 727.518 131.562 727.53 132.3C727.506 133.005 727.306 133.692 726.95 134.3C729.061 132.969 731.067 131.478 732.95 129.84C734.718 128.307 736.327 126.598 737.75 124.74H732.75C733.299 125.323 733.609 126.09 733.62 126.89C733.62 127.749 733.279 128.574 732.671 129.181C732.063 129.789 731.239 130.13 730.38 130.13C729.521 130.13 728.697 129.789 728.089 129.181C727.481 128.574 727.14 127.749 727.14 126.89C727.151 126.09 727.461 125.323 728.01 124.74H726.39C724.997 125.707 723.607 126.617 722.22 127.47C720.833 128.323 719.407 129.133 717.94 129.9L715.94 126.9C718.299 125.19 720.525 123.305 722.6 121.26C724.635 119.232 726.473 117.015 728.09 114.64L736.14 116.72C735.64 117.22 735.14 117.72 734.63 118.14C734.12 118.56 733.63 119.02 733.13 119.44L744.99 118.34L748.3 123.54ZM728.68 163.93V160.75L735.68 159.59V148.59H717.22L716.06 143.84L735.63 142.4V135.45L742.8 136.03L742.57 141.93L747.72 141.53V148.59H742.34L741.64 166.7L728.68 163.93ZM730.47 154.79C730.473 155.415 730.347 156.033 730.099 156.606C729.851 157.179 729.487 157.695 729.03 158.12C728.593 158.569 728.07 158.926 727.493 159.169C726.916 159.413 726.296 159.539 725.67 159.54C724.41 159.54 723.202 159.04 722.311 158.149C721.42 157.258 720.92 156.05 720.92 154.79C720.92 153.53 721.42 152.322 722.311 151.431C723.202 150.541 724.41 150.04 725.67 150.04C726.296 150.041 726.916 150.167 727.493 150.411C728.07 150.655 728.593 151.011 729.03 151.46C729.486 151.886 729.849 152.402 730.097 152.975C730.345 153.548 730.472 154.166 730.47 154.79Z" fill="#363536"/>
    <path d="M781.9 159.71L781.73 166.13L775.73 166.71V159.71H754.36L753.2 155.54L775.71 154.62V151.9H759.33L758.33 132.34H765.39V134L775.75 133.53V130.93H763.38L762.23 127.23L775.71 126.36V123.36H761.48V129.78L755.34 130.36L754.34 116.41H761.52V118.5L804.23 116.41L803.18 129.78L797.05 130.36V123.36H782.77L782.71 125.96L795.62 125.15V130.94H782.62L782.56 133.2L800.21 132.39L799.21 151.95H782.08L782.02 154.38L805.28 153.38V159.75L781.9 159.71ZM775.71 138H765.35V141.24L775.71 140.72V138ZM775.71 144.65H765.35V148L775.71 147.48V144.65ZM793.13 144.65H782.25L782.19 147.14L793.13 146.56V144.65ZM793.13 138H782.42V140.37L793.18 139.85L793.13 138Z" fill="#363536"/>
    </g>
    <defs>
    <clipPath id="clip0_101_7550">
    <rect width="1500" height="500" fill="white"/>
    </clipPath>
    </defs>
    </svg>`
};

export const I18N = {
  en: {
    connect: {
      selectingWallet: {
        header: "Available Wallets",
        sidebar: {
          heading: "Get Started",
          subheading: "Connect your wallet",
          paragraph:
            "Connecting your wallet is like “logging in” to Web3. Select your wallet from the options to get started."
        },
        recommendedWalletsPart1: "{app} only supports",
        recommendedWalletsPart2:
          "on this platform. Please use or install one of the supported wallets to continue",
        installWallet:
          "You do not have any wallets installed that {app} supports, please use a supported wallet",
        agreement: {
          agree: "I agree to the",
          terms: "Terms & Conditions",
          and: "and",
          privacy: "Privacy Policy"
        }
      },
      connectingWallet: {
        header:
          "{connectionRejected, select, false {Connecting to {wallet}...} other {Connection Rejected}}",
        sidebar: {
          subheading: "Approve Connection",
          paragraph:
            "Please approve the connection in your wallet and authorize access to continue."
        },
        mainText: "Connecting...",
        paragraph:
          "Make sure to select all accounts that you want to grant access to.",
        previousConnection:
          "{wallet} already has a pending connection request, please open the {wallet} app to login and connect.",
        rejectedText: "Connection Rejected!",
        rejectedCTA: "Click here to try again",
        primaryButton: "Back to wallets"
      },
      connectedWallet: {
        header: "Connection Successful",
        sidebar: {
          subheading: "Connection Successful!",
          paragraph: "Your wallet is now connected to {app}"
        },
        mainText: "Connected"
      }
    },
    modals: {
      actionRequired: {
        heading: "Action required in {wallet}",
        paragraph: "Please switch the active account in your wallet.",
        linkText: "Learn more.",
        buttonText: "Okay"
      },
      switchChain: {
        heading: "Switch Chain",
        paragraph1:
          "{app} requires that you switch your wallet to the {nextNetworkName} network to continue.",
        paragraph2:
          "*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet."
      },
      confirmDisconnectAll: {
        heading: "Disconnect all Wallets",
        description:
          "Are you sure that you would like to disconnect all your wallets?",
        confirm: "Confirm",
        cancel: "Cancel"
      }
    },
    accountCenter: {
      connectAnotherWallet: "Connect another Wallet",
      disconnectAllWallets: "Disconnect all Wallets",
      currentNetwork: "Current Network",
      appInfo: "App Info",
      learnMore: "Learn More",
      gettingStartedGuide: "Getting Started Guide",
      smartContracts: "Smart Contract(s)",
      explore: "Explore",
      backToApp: "Back to dapp",
      poweredBy: "powered by",
      addAccount: "Add Account",
      setPrimaryAccount: "Set Primary Account",
      disconnectWallet: "Disconnect Wallet",
      copyAddress: "Copy Wallet address"
    },
    notify: {
      transaction: {
        txRequest: "Your transaction is waiting for you to confirm",
        nsfFail: "You have insufficient funds for this transaction",
        txUnderpriced:
          "The gas price for your transaction is too low, try a higher gas price",
        txRepeat: "This could be a repeat transaction",
        txAwaitingApproval:
          "You have a previous transaction waiting for you to confirm",
        txConfirmReminder: "Please confirm your transaction to continue",
        txSendFail: "You rejected the transaction",
        txSent: "Your transaction has been sent to the network",
        txStallPending:
          "Your transaction has stalled before it was sent, please try again",
        txStuck: "Your transaction is stuck due to a nonce gap",
        txPool: "Your transaction has started",
        txStallConfirmed:
          "Your transaction has stalled and hasn't been confirmed",
        txSpeedUp: "Your transaction has been sped up",
        txCancel: "Your transaction is being canceled",
        txFailed: "Your transaction has failed",
        txConfirmed: "Your transaction has succeeded",
        txError: "Oops something went wrong, please try again",
        txReplaceError:
          "There was an error replacing your transaction, please try again"
      },
      watched: {
        txPool:
          "Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txSpeedUp:
          "Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been sped up",
        txCancel:
          "Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been canceled",
        txConfirmed:
          "Your account successfully {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txFailed:
          "Your account failed to {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txStuck: "Your transaction is stuck due to a nonce gap"
      },
      time: {
        minutes: "min",
        seconds: "sec"
      }
    }
  },
  ko: {
    connect: {
      selectingWallet: {
        header: "Available Wallets",
        sidebar: {
          heading: "Get Started",
          subheading: "Connect your wallet",
          paragraph:
            "Connecting your wallet is like “logging in” to Web3. Select your wallet from the options to get started."
        },
        recommendedWalletsPart1: "{app} only supports",
        recommendedWalletsPart2:
          "on this platform. Please use or install one of the supported wallets to continue",
        installWallet:
          "You do not have any wallets installed that {app} supports, please use a supported wallet",
        agreement: {
          agree: "I agree to the",
          terms: "Terms & Conditions",
          and: "and",
          privacy: "Privacy Policy"
        }
      },
      connectingWallet: {
        header:
          "{connectionRejected, select, false {Connecting to {wallet}...} other {Connection Rejected}}",
        sidebar: {
          subheading: "Approve Connection",
          paragraph:
            "Please approve the connection in your wallet and authorize access to continue."
        },
        mainText: "Connecting...",
        paragraph:
          "Make sure to select all accounts that you want to grant access to.",
        previousConnection:
          "{wallet} already has a pending connection request, please open the {wallet} app to login and connect.",
        rejectedText: "Connection Rejected!",
        rejectedCTA: "Click here to try again",
        primaryButton: "Back to wallets"
      },
      connectedWallet: {
        header: "Connection Successful",
        sidebar: {
          subheading: "Connection Successful!",
          paragraph: "Your wallet is now connected to {app}"
        },
        mainText: "Connected"
      }
    },
    modals: {
      actionRequired: {
        heading: "Action required in {wallet}",
        paragraph: "Please switch the active account in your wallet.",
        linkText: "Learn more.",
        buttonText: "Okay"
      },
      switchChain: {
        heading: "Switch Chain",
        paragraph1:
          "{app} requires that you switch your wallet to the {nextNetworkName} network to continue.",
        paragraph2:
          "*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet."
      },
      confirmDisconnectAll: {
        heading: "Disconnect all Wallets",
        description:
          "Are you sure that you would like to disconnect all your wallets?",
        confirm: "Confirm",
        cancel: "Cancel"
      }
    },
    accountCenter: {
      connectAnotherWallet: "Connect another Wallet",
      disconnectAllWallets: "Disconnect all Wallets",
      currentNetwork: "Current Network",
      appInfo: "App Info",
      learnMore: "Learn More",
      gettingStartedGuide: "Getting Started Guide",
      smartContracts: "Smart Contract(s)",
      explore: "Explore",
      backToApp: "Back to dapp",
      poweredBy: "powered by",
      addAccount: "Add Account",
      setPrimaryAccount: "Set Primary Account",
      disconnectWallet: "Disconnect Wallet",
      copyAddress: "Copy Wallet address"
    },
    notify: {
      transaction: {
        txRequest: "Your transaction is waiting for you to confirm",
        nsfFail: "You have insufficient funds for this transaction",
        txUnderpriced:
          "The gas price for your transaction is too low, try a higher gas price",
        txRepeat: "This could be a repeat transaction",
        txAwaitingApproval:
          "You have a previous transaction waiting for you to confirm",
        txConfirmReminder: "Please confirm your transaction to continue",
        txSendFail: "You rejected the transaction",
        txSent: "Your transaction has been sent to the network",
        txStallPending:
          "Your transaction has stalled before it was sent, please try again",
        txStuck: "Your transaction is stuck due to a nonce gap",
        txPool: "Your transaction has started",
        txStallConfirmed:
          "Your transaction has stalled and hasn't been confirmed",
        txSpeedUp: "Your transaction has been sped up",
        txCancel: "Your transaction is being canceled",
        txFailed: "Your transaction has failed",
        txConfirmed: "Your transaction has succeeded",
        txError: "Oops something went wrong, please try again",
        txReplaceError:
          "There was an error replacing your transaction, please try again"
      },
      watched: {
        txPool:
          "Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txSpeedUp:
          "Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been sped up",
        txCancel:
          "Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been canceled",
        txConfirmed:
          "Your account successfully {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txFailed:
          "Your account failed to {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
        txStuck: "Your transaction is stuck due to a nonce gap"
      },
      time: {
        minutes: "min",
        seconds: "sec"
      }
    }
  }
};
