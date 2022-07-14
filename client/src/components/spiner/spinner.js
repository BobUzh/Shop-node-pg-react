import React from 'react';

const Sp = () => {
    return (
        <div className="App">
            <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <g fill="#61DAFB">
                    <circle cx="30" cy="50" fill="#fdff42" r="20">
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="-0.5s"></animate>
                    </circle>
                    <circle cx="70" cy="50" fill="#1bb3fd" r="20">
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="0s"></animate>
                    </circle>
                    <circle cx="30" cy="50" fill="#fdff42" r="20">
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="-0.5s"></animate>
                        <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" dur="1s" repeatCount="indefinite"></animate>
                    </circle>
                </g>
            </svg>
        </div>
    );
};

export default Sp;