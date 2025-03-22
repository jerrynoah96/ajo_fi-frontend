import Image from "next/image";
import Link from "next/link";
import { PlaceholderImage } from '@/components/Placeholder';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Decentralized Thrift & Credit System
              </h1>
              <p className="text-xl mb-8">
                Join trusted savings groups, access credit without collateral, and build your financial future with blockchain technology.
              </p>
              <div className="space-x-4">
                <Link href="/signup" 
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Get Started
                </Link>
                <Link href="#how-it-works"
                  className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <PlaceholderImage />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Join Thrift',
                description: 'Connect your wallet and join a trusted savings group',
                icon: '🤝'
              },
              {
                title: 'Contribute',
                description: 'Make periodic contributions to your group savings',
                icon: '💰'
              },
              {
                title: 'Withdraw',
                description: 'Access your funds when it is your turn',
                icon: '📤'
              },
              {
                title: 'Credit Growth',
                description: 'Build credit score and access larger loans',
                icon: '📈'
              }
            ].map((step, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AjoFi Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose AjoFi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Trustless System',
                description: 'Smart contracts ensure transparent and secure transactions',
                icon: '🔒'
              },
              {
                title: 'No Collateral',
                description: 'Access credit based on your participation and credit score',
                icon: '✨'
              },
              {
                title: 'Earn Rewards',
                description: 'Validators earn passive income for supporting the network',
                icon: '💎'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '$1M+',
                label: 'Total Value Locked'
              },
              {
                number: '1000+',
                label: 'Active Users'
              },
              {
                number: '100+',
                label: 'Validators'
              }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Start Your Financial Journey?</h2>
          <div className="space-x-4">
            <Link href="/signup"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
              Join a Thrift Group
            </Link>
            <Link href="/validator"
              className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition inline-block mt-4 md:mt-0">
              Become a Validator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
