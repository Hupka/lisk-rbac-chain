
import { useCookies } from 'react-cookie';
import { Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { useState,Fragment } from 'react';
/* eslint-disable  */

export const Dashboard = () => {
	const [setupState, setSetupState] = useState(false);
	const [tryConnect, setTryConnect] = useState(false);
	const [show, setShow] = useState(false)
	const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
	let defaultUrl = 'http://localhost:4000'
	// set url if available
	if(cookies['api-url']){
		defaultUrl = cookies['api-url']
	}
	const [url, setUrl] = useState(defaultUrl)

	function handleUrlFieldChange(event){
		// set all loading states an alerts to false
		setSetupState(false)
		setShow(false)
		setTryConnect(false)
		// 

		event.preventDefault();
    	setUrl(event.target.value);
	}
	return  (
		<div className="max-w-3xl flex flex-col items-center mx-auto py-8 px-4 overflow-hidden">
			<img
				className="h-16 w-auto"
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				src={`${process.env.PUBLIC_URL}assets/icon.svg`}
				alt="Workflow"
			/>
			<p className="text-2xl font-bold pb-5 pt-4">Welcome in the Lisk RBAC Console!</p>
			<p className="text-sm">Start by providing the URL to the Lisk RBAC module’s HTTP API.</p>
			<form className="mt-5 pt-2 sm:flex sm:items-center w-96">
				<div className="w-full sm:max-w-xs">
					<input
						type="text"
						name="connected"
						id="connected"
						className="py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-solid border-gray-300 rounded-md"
						placeholder="http://localhost:4000"
						onChange={(e) => handleUrlFieldChange(e)}
						value={url}
					/>
				</div>
				<button
					type="button"
					// TODO: missing valitation here
					onClick={async () => {
						setTryConnect(true);
						// try to call
						try{
							const result = await fetch(url +  `/rbac/roles`)
							if (result.status === 200) {
								// firest remove Cookie
								removeCookie('api-url')
								// set new Cookie
								console.log("settign url", url)
								setCookie('api-url',url)
								// change button color
								setTryConnect(false)
								setSetupState(true);
							}
							else{
								// TODO:catch more errors
								setShow(true)
							}
						}catch(err){
							// user maybe mixed up url, so that fetch would crash --> could be done cleaner 
							setShow(true)
						}
					}}
					// maybe not the best way to do it, but shortens code
					className={
						(tryConnect ? 'animate-pulse ' : '') +
						' mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
					}
				>
					{!setupState ? 'Connect':'Connected'}
					
				</button>
				<div
        aria-live="assertive"
        className="fixed mt-24 inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ExclamationIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">No Connection!</p>
                    <p className="mt-1 text-sm text-gray-500">False Url or Api not running.</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
					type="button"
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
			</form>
		</div>
	) 
};
