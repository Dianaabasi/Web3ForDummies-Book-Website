import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { 
  Coins, 
  Shield, 
  Wallet, 
  TrendingUp, 
  Network, 
  Zap,
  Globe,
  Lock
} from "lucide-react"

export function BookContentSection() {
  const chapters = [
    {
      icon: Globe,
      title: "Introduction to Web3",
      description: "Understanding the fundamentals of the decentralized web and its revolutionary potential"
    },
    {
      icon: Network,
      title: "Blockchain Technology",
      description: "Deep dive into how blockchain works, consensus mechanisms, and network architectures"
    },
    {
      icon: Coins,
      title: "Cryptocurrencies & Tokens",
      description: "Learn about Bitcoin, Ethereum, altcoins, and the different types of digital assets"
    },
    {
      icon: Wallet,
      title: "Digital Wallets & Security",
      description: "How to safely store, manage, and protect your digital assets and private keys"
    },
    {
      icon: TrendingUp,
      title: "DeFi (Decentralized Finance)",
      description: "Explore lending, borrowing, yield farming, and the future of financial services"
    },
    {
      icon: Shield,
      title: "NFTs & Digital Ownership",
      description: "Understanding Non-Fungible Tokens, digital art, and provable ownership"
    },
    {
      icon: Zap,
      title: "Smart Contracts & dApps",
      description: "How decentralized applications work and their real-world use cases"
    },
    {
      icon: Lock,
      title: "Security Best Practices",
      description: "Protecting yourself from scams, hacks, and common pitfalls in the Web3 space"
    }
  ]

  return (
    <section className="py-20 bg-background" id="content">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            What You'll Learn
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This comprehensive guide covers everything you need to know to get started in the Web3 ecosystem, 
            from basic concepts to advanced strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {chapters.map((chapter, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border hover:border-primary/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <chapter.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {chapter.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {chapter.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Perfect for Beginners & Enthusiasts
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're completely new to Web3 or looking to deepen your understanding, 
                this book provides clear explanations, practical examples, and actionable insights 
                to help you navigate the exciting world of decentralized technologies.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}