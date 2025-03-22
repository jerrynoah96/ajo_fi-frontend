import { motion } from 'framer-motion';
import { HeroIllustration } from '@/components/HeroIllustration';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center"
        >
          <h1 className="text-5xl font-bold mb-6">
            Welcome to AjoFi
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8"
          >
            The Future of Blockchain-Powered Thrift & Credit
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Become a Validator
            </button>
          </motion.div>
        </motion.div>

        {/* Add the illustration component */}
        <HeroIllustration />
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {['Join Thrift', 'Contribute', 'Withdraw', 'Credit Growth'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-600 font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold mb-2">{step}</h3>
                <p className="text-gray-600">Description of {step.toLowerCase()} process...</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
} 