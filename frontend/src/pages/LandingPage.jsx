import { ClipboardList, Users, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <main className="flex-1">
           {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to boost your productivity?
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Sign up today and start managing your tasks smarter, faster, and better.
        </p>
        <Link to='/register'><button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:bg-gray-100 transition">
          Get Started Now
        </button></Link>
        <Link to='/login'><button className="ml-4 bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:bg-gray-100 transition">
          Login
        </button></Link>
        
      </section>
      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          Powerful Features to Get Work Done
        </h2>
        <div className="grid gap-10 md:grid-cols-4 max-w-7xl mx-auto">
          <div className="rounded-2xl shadow-lg bg-white p-8 text-center hover:shadow-xl transition-shadow">
            <ClipboardList className="w-14 h-14 mx-auto text-blue-600 mb-5" />
            <h3 className="text-2xl font-semibold mb-3">Task Management</h3>
            <p className="text-gray-600">
              Create, update, and track tasks effortlessly with our App.
            </p>
          </div>

          <div className="rounded-2xl shadow-lg bg-white p-8 text-center hover:shadow-xl transition-shadow">
            <Users className="w-14 h-14 mx-auto text-green-600 mb-5" />
            <h3 className="text-2xl font-semibold mb-3">Team Collaboration</h3>
            <p className="text-gray-600">
              Assign tasks, share updates, and collaborate seamlessly with your team.
            </p>
          </div>

          <div className="rounded-2xl shadow-lg bg-white p-8 text-center hover:shadow-xl transition-shadow">
            <MessageSquare className="w-14 h-14 mx-auto text-purple-600 mb-5" />
            <h3 className="text-2xl font-semibold mb-3">Comments</h3>
            <p className="text-gray-600">
              Add comments to tasks to keep communication clear and organized.
            </p>
          </div>

          <div className="rounded-2xl shadow-lg bg-white p-8 text-center hover:shadow-xl transition-shadow">
            <ShieldCheck className="w-14 h-14 mx-auto text-teal-600 mb-5" />
            <h3 className="text-2xl font-semibold mb-3">Secure Authentication</h3>
            <p className="text-gray-600">
              Built-in authentication ensures your data is protected at all times.
            </p>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white border-t">
        <div className="max-w-5xl mx-auto text-center">
          {/* <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Why Choose Us?</h2> */}
          <p className="text-lg text-gray-600 mb-8">
            Our Task Manager App is designed with simplicity, scalability, and
            collaboration in mind. Whether you're a solo developer or part of a
            large team, you’ll have the tools you need to stay organized and
            productive.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md flex-1">
              <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
              <p className="text-gray-600">
                Connect seamlessly with your frontend or mobile app using
                RESTful endpoints.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-md flex-1">
              <h3 className="text-xl font-semibold mb-2">Productivity</h3>
              <p className="text-gray-600">
                Increase your productivity by scheduling and tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

 
    </main>
  );
};

export default LandingPage;