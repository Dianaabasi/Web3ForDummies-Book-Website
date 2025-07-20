import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { ExternalLink, Users, BookOpen, Award } from "lucide-react"

export function AuthorSection() {
  const socialLinks = [
    {
      name: "X (Twitter)",
      url: "https://x.com/AhbeeDnoble",
      icon: "𝕏"
    },
    {
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/diana-abasi-ekpenyong-065345204",
      icon: "💼"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1KSiiDG3XL/",
      icon: "📘"
    },
    {
      name: "Cryptonians X",
      url: "https://x.com/0xCryptonians",
      icon: "🚀"
    },
    {
      name: "Telegram Community",
      url: "https://t.me/+9L0OdIKVpz1lNjJk",
      icon: "💬"
    }
  ]

  return (
    <section className="py-20 bg-muted/30" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About the Author
            </h2>
          </div>

          <Card className="overflow-hidden border-border shadow-xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Author Image Placeholder */}
                <div className="lg:col-span-1 bg-gradient-to-br from-primary to-accent p-8 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                    <img 
                      src="/lovable-uploads/7d879fca-d0c9-4093-81c9-028b0efd4867.png" 
                      alt="Dnoble.eth - Author Photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Author Content */}
                <div className="lg:col-span-2 p-8 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-primary mb-4">
                      Dnoble.eth
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Award className="h-4 w-4" />
                        <span className="text-sm">Cryptopreneur</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">Web3 Educator</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">CRYPTONIANS Founder</span>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-foreground leading-relaxed">
                      Dnoble.eth is a passionate Cryptopreneur, Web3 educator, amongst others, and he's the founder of 
                      <strong className="text-primary"> CRYPTONIANS</strong>, a vibrant community that's passionate about Web3 education 
                      and driving crypto adoption across Africa. The community is focused on onboarding and raising the next 
                      generation of pioneers into the decentralized internet.
                    </p>
                    
                    <p className="text-foreground leading-relaxed">
                      With a clear, beginner friendly teaching style, Dnoble.eth breaks down complex Web3 concepts and 
                      delivers real world insights. He believes Web3 is not just a trend, it's a revolution in ownership, 
                      value, and freedom.
                    </p>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/20 mt-6">
                      <p className="text-center font-semibold text-primary text-lg">
                        Join the Movement. Become a CRYPTONIAN.
                      </p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Connect & Join the Community</h4>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((social, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-primary/20 hover:border-primary hover:bg-primary/10"
                        >
                          <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                            <span>{social.icon}</span>
                            <span>{social.name}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}