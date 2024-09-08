"use client"; // This tells Next.js to treat this component as a client component

import { Fragment, useState } from "react";
// import Header from '@/app/components/Header';

export default function Home() {
  const [ longUrl, setLongUrl ] = useState( '' );
  const [ shortUrl, setShortUrl ] = useState( '' );
  const [ error, setError ] = useState( '' );
  // const [ customAlias, setCustomAlias ] = useState( '' );

  const handleGenerateShortUrl = async () => {
    // Reset errors and shortUrl before making a new request
    setError( '' );
    setShortUrl( '' );

    // Basic validation for the long URL
    if ( !longUrl || ( !longUrl.startsWith( 'http://' ) && !longUrl.startsWith( 'https' ) ) ) {
      setError( 'Please enter a valid URL.' );
      return;
    }

    // Validation for the custom alias
    // if ( customAlias.length > 30 ) {
    //   setError( 'Custom alias cannot be longer than 30 characters.' );
    //   return;
    // }

    try {
      // Replace this URL with your backend endpoint for generating short URLs
      const response = await fetch( 'http://localhost:5000/api/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( { originalUrl: longUrl } ),
      } );

      if ( response.ok ) {
        const data = await response.json();
        setShortUrl( `${window.location.origin}/${data.shortUrl}` );
      } else {
        console.error( 'Failed to generate short URL' );
      }
    } catch ( error ) {
      console.error( 'Error:', error );
    }
  };

  return (
    <Fragment>
      {/* <Header /> */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Shorten your <span className="text-indigo-600">loooooong</span> URLs like never before
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-6">
            Easily turn your lengthy URLs into concise, shareable links.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <input
              type="text"
              value={ longUrl }
              onChange={ ( e ) => setLongUrl( e.target.value ) }
              placeholder="Enter your long URL"
              className="w-full md:w-2/3 p-4 mb-4 md:mb-0 md:mr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={ handleGenerateShortUrl }
              className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white text-md font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Generate Short URL
            </button>
          </div>
          { error && (
            <div className="mt-2 text-red-600">
              <p>{ error }</p>
            </div>
          ) }
          { shortUrl && (
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-lg text-gray-700">Short URL:</p>
                <a
                  href={ shortUrl }
                  className="text-indigo-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  { shortUrl }
                </a>
              </div>
            </div>
          ) }
        </div>
      </div>
    </Fragment>
  );
}
