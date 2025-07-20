import { Button } from "./ui/button"
import { Card } from "./ui/card"
import bookCover from "../assets/web3-book-cover.jpg"
import { ArrowRight, Star, Users, BookOpen } from "lucide-react"

export function HeroSection() {

  return (
    <section className="min-h-screen flex items-center justify-center bg-web3-gradient relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-web3-gold rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Book cover */}
          <div className="flex justify-center lg:justify-end">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-2xl animate-float">
              <img 
                src="/lovable-uploads/6cead823-ceb3-4ef4-805d-65da89ed276e.png" 
                alt="Web3 for Dummies Book Cover"
                className="w-80 h-auto rounded-lg shadow-lg"
              />
            </Card>
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left space-y-6 text-white">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Web3 for
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Dummies
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-2xl">
                Your complete guide to understanding Web3, Blockchain, NFTs, DeFi, and the decentralized future.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">500+ Readers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">Beginner Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">Comprehensive Guide</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <span className="text-3xl font-bold text-green-400">$5</span>
                <span className="text-lg line-through text-gray-400">$10</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  50% OFF
                </span>
              </div>
              <p className="text-sm text-gray-300">
                Pay with USDT, USDC, or DAI on multiple blockchains
              </p>
            </div>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg animate-pulse-glow group"
              asChild
            >
              <a href="/payment">
                Buy Now & Get Instant Access
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}