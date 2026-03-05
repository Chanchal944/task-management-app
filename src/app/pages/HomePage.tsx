import { useOutletContext } from "react-router";

interface HomePageContext {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export function HomePage() {
  const { isLoggedIn, onLoginClick, onRegisterClick } = useOutletContext<HomePageContext>();

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 md:py-10 max-w-7xl">
      <section className="mb-12 md:mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6 md:p-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Welcome to TaskFlow</h2>
          <p className="text-blue-100 text-lg md:text-xl mb-2">
            Your smart daily task management solution. Stay organized, boost productivity, and achieve your goals.
          </p>
          <p className="text-blue-200 text-base md:text-lg">
            Built with modern web technologies for a seamless desktop experience.
          </p>
          {!isLoggedIn && (
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center">
              <button
                onClick={onRegisterClick}
                className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-colors text-base md:text-lg whitespace-nowrap w-full sm:w-auto"
              >
                Get Started - Register Now
              </button>
              <button
                onClick={onLoginClick}
                className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-colors text-base md:text-lg whitespace-nowrap w-full sm:w-auto"
              >
                Already Have Account? Login
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="bg-blue-100 w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 md:w-8 h-6 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Easy Task Management</h3>
          <p className="text-gray-600 text-base md:text-lg">
            Create, organize, and manage your tasks with an intuitive interface designed for productivity.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="bg-green-100 w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 md:w-8 h-6 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Track Progress</h3>
          <p className="text-gray-600 text-base md:text-lg">
            Monitor your productivity with real-time statistics and visual insights into your task completion.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="bg-orange-100 w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 md:w-8 h-6 md:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Smart Filtering</h3>
          <p className="text-gray-600 text-base md:text-lg">
            Quickly find what you need with powerful filters for completed, pending, and all tasks.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 rounded-lg p-6 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Start Managing Your Tasks Today</h2>
        <p className="text-gray-600 text-base md:text-lg mb-6">
          Join thousands of users who have simplified their task management with TaskFlow.
        </p>
        {!isLoggedIn && (
          <button
            onClick={onLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 md:px-10 py-3 md:py-4 rounded-lg transition-colors text-base md:text-lg"
          >
            Get Started for Free
          </button>
        )}
      </section>
    </div>
  );
}