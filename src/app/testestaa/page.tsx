import Head from 'next/head';

export default function Home() {
  return (
    <div className="font-sans antialiased text-gray-900">
      <Head>
        <title>Your Website Title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        {/* ...Your Account Creation Form Here... */}
      </div>

      {/* Services Section */}
      <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute left-full transform translate-x-1/2"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <svg
            className="absolute right-full bottom-0 transform -translate-x-1/2"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum
              cupiditate veritatis in accusamus quisquam.
            </p>
          </div>
          <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            {/* 1st item */}
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">{/* Your Image Here */}</div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href="#" className="hover:underline">
                      {/* Service Category */}
                      Service Category
                    </a>
                  </p>
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">
                      {/* Service Title */}
                      Service Title
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {/* Service Description */}
                      Service Description
                    </p>
                  </a>
                </div>
              </div>
            </div>
            {/* More items... */}
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="relative bg-indigo-700 rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="relative pt-12 pb-16 px-6 sm:pb-24 sm:px-16 lg:px-20">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Get in touch</span>
                <span className="block">Let's talk about your project</span>
              </h2>
              <div className="mt-6 text-base text-indigo-50 max-w-3xl">{/* Your content */}</div>
              <a
                href="#"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-lg font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Contact us
              </a>
            </div>
            {/* Contact form goes here */}
          </div>
        </div>
      </div>
    </div>
  );
}

//랜딩페이지테스트
