import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Copy, Check, Wallet, Shield, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PaymentSection() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [transactionHash, setTransactionHash] = useState("")
  const [selectedChain, setSelectedChain] = useState("")
  const { toast } = useToast()

  const walletAddresses = [
    {
      name: "EVM Chains",
      symbol: "ETH/BNB/MATIC",
      address: "0x7e0ef8e47e855b500bb539b2af9d717a54ba37d4",
      color: "primary",
      stablecoins: ["USDT", "USDC", "DAI"],
      networks: ["Ethereum", "BNB Chain", "Polygon"]
    },
    {
      name: "Solana",
      symbol: "SOL",
      address: "EWFoMPtypm39n2oNXcQabZsehCHjWNSXMD1fhZmVKgfH",
      color: "solana",
      stablecoins: ["USDT", "USDC"]
    },
    {
      name: "TON",
      symbol: "TON",
      address: "UQAmmrRmkcCRjebpNqPVCqalLhl940bbW9ozr-vWoX5i2Xs6",
      color: "ton",
      stablecoins: ["USDT"]
    },
    {
      name: "TRON",
      symbol: "TRX",
      address: "TRdSKkkYRpnD4b4byn92dpZZiSFk5VHDTX",
      color: "tron",
      stablecoins: ["USDT", "USDC"]
    }
  ]

  const copyToClipboard = async (address: string, chainName: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      setSelectedChain(chainName)
      toast({
        title: "Address Copied!",
        description: `${chainName} wallet address copied to clipboard`,
      })
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the address manually",
        variant: "destructive"
      })
    }
  }

  const handleSubmitTransaction = () => {
    if (!transactionHash.trim()) {
      toast({
        title: "Missing Transaction Hash",
        description: "Please enter your transaction hash",
        variant: "destructive"
      })
      return
    }

    if (!selectedChain) {
      toast({
        title: "Select Payment Chain",
        description: "Please copy a wallet address first to select your payment chain",
        variant: "destructive"
      })
      return
    }

    // Here you would typically send the data to your backend
    // For now, we'll simulate success and redirect to confirmation
    localStorage.setItem('transactionData', JSON.stringify({
      hash: transactionHash,
      chain: selectedChain,
      timestamp: new Date().toISOString()
    }))

    window.location.href = '/confirmation'
  }

  return (
    <section className="py-20 bg-background" id="payment">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get Your Copy Now
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-4xl font-bold text-green-600">$5</span>
              <span className="text-2xl line-through text-muted-foreground">$10</span>
              <Badge variant="destructive" className="text-lg px-4 py-2">50% OFF</Badge>
            </div>
            <p className="text-xl text-muted-foreground">
              Pay with stablecoins (USDT, USDC, DAI) on your preferred blockchain
            </p>
          </div>

          {/* Payment Instructions */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>How to Purchase</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-semibold">Copy Wallet Address</p>
                    <p className="text-sm text-muted-foreground">Choose your preferred blockchain</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="font-semibold">Send $5 in Stablecoins</p>
                    <p className="text-sm text-muted-foreground">USDT, USDC, or DAI</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="font-semibold">Submit Transaction Hash</p>
                    <p className="text-sm text-muted-foreground">Paste your TX hash below</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Addresses */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {walletAddresses.map((wallet, index) => (
              <Card 
                key={index} 
                className={`group hover:shadow-xl transition-all duration-300 border-2 ${
                  selectedChain === wallet.name ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wallet className={`h-5 w-5 text-${wallet.color}`} />
                      <span>{wallet.name}</span>
                    </div>
                    <Badge variant="outline">{wallet.symbol}</Badge>
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {wallet.stablecoins.map((coin, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {coin}
                        </Badge>
                      ))}
                    </div>
                    {wallet.networks && (
                      <div className="flex flex-wrap gap-1">
                        {wallet.networks.map((network, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {network}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Wallet Address:</p>
                    <p className="font-mono text-sm break-all">{wallet.address}</p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(wallet.address, wallet.name)}
                    className="w-full"
                    variant={copiedAddress === wallet.address ? "default" : "outline"}
                  >
                    {copiedAddress === wallet.address ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Address
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Transaction Hash Submission */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Submit Your Transaction</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedChain && (
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Selected Chain: <span className="font-bold">{selectedChain}</span>
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="transaction-hash">Transaction Hash</Label>
                <Input
                  id="transaction-hash"
                  placeholder="Paste your transaction hash here..."
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  className="font-mono"
                />
              </div>
              
              <Button 
                onClick={handleSubmitTransaction}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3"
                size="lg"
              >
                Submit Transaction & Get Access
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                After submission, you'll receive further instructions to get your eBook
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}