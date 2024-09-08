// app/[shortcode]/page.tsx
'use client'; // This directive makes this file a Client Component

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
    params: {
        shortcode: string;
    };
}

const RedirectPage = ( { params }: Props ) => {
    const [ error, setError ] = useState<string | null>( null );
    const { shortcode } = params;

    useEffect( () => {
        const fetchRealUrl = async () => {
            if ( !shortcode ) return;

            try {
                const response = await fetch( `http://localhost:5000/api/url/${shortcode}` );
                if ( response.ok ) {
                    const data = await response.json();
                    const { originalUrl } = data;
                    console.log(originalUrl)

                    // Redirect to the real URL
                    window.location.href = originalUrl;
                    // Redirect to the real URL
                    // window.location.replace( originalUrl ); // Use replace to avoid adding to the browser history
                } else {
                    setError( 'The requested URL could not be found.' );
                }
            } catch ( error ) {
                console.error( 'Error fetching the real URL:', error );
                setError( 'An error occurred while processing your request.' );
            }
        };

        fetchRealUrl();
    }, [] );

    // Display error message if there is an error
    if ( error ) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-8">
                <div className="mx-auto">
                    <h1 className="text-5xl font-extrabold text-red-600 mb-4">404 Not Found</h1>
                    <p className="text-xl text-gray-700 mb-6">
                        This shorten link does not exist.
                    </p>
                    <div className="flex flex-col md:flex-row justify-around mb-6 gap-8">
                        <div className="flex-1 bg-white p-12  flex flex-col items-center justify-center text-center">
                            <svg className='w-16 mb-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <rect width="24" height="24" fill="none" />
                                    <path d="M14.8283 13.4142L19.071 9.17156C19.071 9.17156 20.4852 7.75734 18.3639 5.63603C16.2426 3.51472 14.8283 4.92892 14.8283 4.92892C14.8283 4.92892 11.9999 7.75735 10.5857 9.17156" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16.5961 14.4749L19.4246 15.182" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.5355 15.5355L17.6568 17.6568" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.4748 16.5962L15.1819 19.4246" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.40374 9.52512L4.57531 8.81802" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.46442 8.46448L6.3431 6.34316" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.52509 7.40381L8.81798 4.57538" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.17148 10.5858L4.92884 14.8284C4.92884 14.8284 3.51462 16.2426 5.63594 18.364C7.75727 20.4853 9.17148 19.0711 9.17148 19.0711C9.17148 19.0711 11.9999 16.2427 13.4141 14.8284" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_15_104">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                Check the Link
                            </h2>
                            <p className="text-lg text-gray-600">
                                Review the link if it has any typographical error.
                            </p>
                        </div>
                        <div className="flex-1 bg-white p-12 flex flex-col items-center justify-center text-center">
                            <svg className='w-16 mb-4' version="1.1" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32">
                                <style type="text/css">
                                </style>
                                <path d="M4,4v20h14l0,6l6-6h4V4H4z M26,22h-2.828L20,25.172L20,22H6V6h20V22z M14,12h-2
	c0-1.607,1.065-4,4-4s4,2.393,4,4c0,1.41-0.819,3.423-3,3.897V17h-2v-3h1c1.903,0,2-1.666,2-2c-0.008-0.464-0.174-2-2-2
	C14.097,10,14,11.666,14,12z M15,18h2v2h-2V18z"/>
                            </svg>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                Ask for the Correct Link
                            </h2>
                            <p className="text-lg text-gray-600">
                                Reach out to the sender of this link to resend the correct one.
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-300 mt-6"
                    >
                        Go Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    // Return null if no error and redirection is in progress
    return null;
};

export default RedirectPage;
