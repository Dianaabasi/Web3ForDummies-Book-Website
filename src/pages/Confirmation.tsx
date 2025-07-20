import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MessageCircle, Clock, ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface TransactionData {
  hash: string
  chain: string
  timestamp: string
}

const Confirmation = () => {
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('transactionData')
    if (data) {
      setTransactionData(JSON.parse(data))
    }
  }, [])

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hi! I just purchased the "Web3 for Dummies" eBook. Here are my transaction details:\n\n` +
      `Transaction Hash: ${transactionData?.hash}\n` +
      `Blockchain: ${transactionData?.chain}\n` +
      `Timestamp: ${transactionData?.timestamp}\n\n` +
      `Please send me the PDF. Thanks!`
    )
    
    const whatsappUrl = `https://wa.me/2349076959871?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  if (!transactionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No transaction data found. Please complete your purchase first.</p>
            <Button asChild className="mt-4">
              <a href="/">Go Back to Purchase</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Transaction Confirmation</h1>
          <ThemeToggle />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Transaction Submitted!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your transaction has been recorded.
            </p>
          </div>

          {/* Transaction Details */}
          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Transaction Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Blockchain Network</label>
                  <div className="mt-1">
                    <Badge variant="outline" className="font-mono">
                      {transactionData.chain}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Transaction Hash</label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p className="font-mono text-sm break-all">{transactionData.hash}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Submitted At</label>
                  <div className="mt-1">
                    <p className="text-sm">{new Date(transactionData.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Message */}
          <Card className="border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                Did you really pay?
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300 mb-4">
                We're processing your transaction. To receive your eBook immediately, please contact us on WhatsApp 
                with your transaction details. Our team will verify your payment and send you the PDF directly.
              </p>
              
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> This helps us ensure legitimate purchases and provide you with immediate access to your eBook.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-whatsapp/10 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="h-8 w-8 text-whatsapp" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Get Your eBook Now!</h3>
                <p className="text-muted-foreground mb-6">
                  Click the button below to contact us on WhatsApp. We'll verify your payment and send you the PDF immediately.
                </p>
              </div>

              <Button
                onClick={handleWhatsAppContact}
                size="lg"
                className="bg-whatsapp hover:bg-whatsapp/90 text-white font-semibold px-8 py-4 text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact on WhatsApp
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Your transaction details will be automatically included in the message
              </p>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">What happens next?</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>1. Contact us on WhatsApp using the button above</p>
                <p>2. We'll verify your transaction on the blockchain</p>
                <p>3. You'll receive the "Web3 for Dummies" PDF within minutes</p>
                <p>4. Start your Web3 journey immediately!</p>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center">
            <Button variant="outline" asChild>
              <a href="/">← Back to Home</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation