import type React from "react";
import {
  CheckCircle,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Award,
  HeartHandshake,
} from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  stats: string;
}

export default function WhyChooseUs() {
  const features: Feature[] = [
    {
      icon: Users,
      title: "Largest Talent Pool",
      description:
        "Access to over 2M+ active job seekers and 50K+ verified companies worldwide",
      stats: "2M+ Candidates",
    },
    {
      icon: Zap,
      title: "Lightning Fast Matching",
      description:
        "Our AI-powered algorithm matches the right candidates with the right opportunities in seconds",
      stats: "10x Faster",
    },
    {
      icon: Shield,
      title: "Verified & Trusted",
      description:
        "All profiles are verified and companies are thoroughly vetted for authenticity and reliability",
      stats: "100% Verified",
    },
    {
      icon: TrendingUp,
      title: "95% Success Rate",
      description:
        "Industry-leading placement success rate with satisfied employers and job seekers",
      stats: "95% Success",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to help you navigate your job search or hiring process",
      stats: "24/7 Available",
    },
    {
      icon: Award,
      title: "Award Winning Platform",
      description:
        "Recognized as the #1 job portal platform by industry experts and user reviews",
      stats: "#1 Rated",
    },
  ];

  const benefits: string[] = [
    "Advanced search filters and smart recommendations",
    "Real-time notifications for new opportunities",
    "Professional profile builder and resume tools",
    "Direct messaging between employers and candidates",
    "Interview scheduling and management tools",
    "Salary insights and market analytics",
    "Mobile app for job searching on the go",
    "Career guidance and professional development resources",
  ];

  const stats = [
    { number: "2M+", label: "Active Job Seekers" },
    { number: "50K+", label: "Verified Companies" },
    { number: "1M+", label: "Successful Placements" },
    { number: "150+", label: "Countries Served" },
  ];

  const trustIndicators = [
    { icon: HeartHandshake, label: "Fortune 500" },
    { icon: Award, label: "Industry Leaders" },
    { icon: TrendingUp, label: "Growing Startups" },
  ];

  return (
    <section
      className={`py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            Why Choose <span className="text-sky-600">iLink?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join millions of professionals who trust our platform to find their
            dream jobs and top talent. Experience the difference with our
            cutting-edge technology and personalized approach.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 border border-white/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-sky-600">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="px-3 py-1 rounded-full border border-blue-200 text-sky-600 text-sm font-medium">
                    {feature.stats}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-900">
                Everything You Need in One Platform
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                From job discovery to career growth, we provide comprehensive
                tools and resources to support every step of your professional
                journey.
              </p>
              <div className="grid gap-4">
                {benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {benefits.slice(4).map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-sky-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-gray-600 mb-8">
            Trusted by leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <IconComponent className="h-6 w-6" />
                  <span className="font-semibold">{indicator.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
