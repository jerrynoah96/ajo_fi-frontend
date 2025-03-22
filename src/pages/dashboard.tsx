import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">Welcome back, Sarah</h1>
          <p className="text-gray-600">Manage your thrift groups and credit profile</p>
        </motion.div>

        {/* Active Thrift Groups Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Active Thrift Groups</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Join New Group
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Thrift Group Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Monthly Savings Group</h3>
                  <p className="text-gray-500 text-sm">10 members</p>
                </div>
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={75}
                    text={`75%`}
                    styles={buildStyles({
                      pathColor: '#2563EB',
                      textColor: '#2563EB',
                      trailColor: '#EFF6FF',
                    })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Contribution</span>
                  <span className="font-medium">March 15, 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">₦50,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Contributed</span>
                  <span className="font-medium">₦150,000</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <button className="w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>

            {/* Add more thrift group cards here */}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Make Contribution', icon: '💰' },
              { title: 'Withdraw Payout', icon: '💳' },
              { title: 'View Credit Score', icon: '📈' },
              { title: 'Request Credit', icon: '🏦' },
            ].map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-2">{action.icon}</div>
                <div className="font-medium">{action.title}</div>
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 