import { useState } from "react"


export const Dashboard = () => {
    const [setupState, setSetupState] = useState(false)
    return (
      !setupState ? <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-2 lg:px-4">
          <div className="">  {/* max-w-md  space-y-8 */}
            <div>
              <img
                className="mx-auto h-12 w-auto"
                // need to be changed to black
                src={`${process.env.PUBLIC_URL}Logo.svg`}
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome in the Lisk RBAC Console!</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
               Start by providing the URL to the Lisk RBAC modules HTTP API
              </p>
            </div>
            <form className="mt-5 sm:flex sm:items-center" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="w-full">
                <div>
                  <label htmlFor="api-url" className="sr-only">
                   Api URL
                  </label>
                  <input
                    id="api-url"
                    name="url"
                    type="input"
                    autoComplete="http://localhost:4000"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="http://localhost:4000"
                  />
                </div>
              </div>
    
             
    
              <div>
                <button
                  type="submit"
                  // TODO: missing valitation here
                  onClick={() => {
                    setSetupState(!setupState)
                }}
                  className="group m-2 { animate-pulse} relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Connect
                </button>
              </div>
            </form>
          </div>
        </div>
        :<p className="text-yellow-700 text-center">Display information about the current state of the Blockain. For example Block-Height</p>
        )
    
}