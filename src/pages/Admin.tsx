import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThemeToggle } from "@/components/theme-toggle"
import { Check, X, Search, Eye, Calendar, Hash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Transaction {
  id: string
  hash: string
  chain: string
  timestamp: string
  status: 'pending' | 'confirmed' | 'rejected'
  amount?: string
}

const Admin = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const { toast } = useToast()

  // Simple authentication
  const handleLogin = () => {
    if (password === "admin123") { 
      setIsAuthenticated(true)
      loadTransactions()
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password",
        variant: "destructive"
      })
    }
  }

  const loadTransactions = () => {
    //Load from localStorage
    const stored = localStorage.getItem('adminTransactions')
    if (stored) {
      setTransactions(JSON.parse(stored))
    } else {
      // Sample data for demonstration
      const sampleTransactions: Transaction[] = [
        {
          id: '1',
          hash: '0x1234567890abcdef1234567890abcdef12345678',
          chain: 'Ethereum',
          timestamp: new Date().toISOString(),
          status: 'pending',
          amount: '$5'
        },
        {
          id: '2',
          hash: 'EWFoMPtypm39n2oNXcQabZsehCHjWNSXMD1fhZmVKgfH',
          chain: 'Solana',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          status: 'confirmed',
          amount: '$5'
        }
      ]
      setTransactions(sampleTransactions)
      localStorage.setItem('adminTransactions', JSON.stringify(sampleTransactions))
    }
  }

  const updateTransactionStatus = (id: string, status: 'confirmed' | 'rejected') => {
    const updatedTransactions = transactions.map(tx =>
      tx.id === id ? { ...tx, status } : tx
    )
    setTransactions(updatedTransactions)
    localStorage.setItem('adminTransactions', JSON.stringify(updatedTransactions))
    
    toast({
      title: "Status Updated",
      description: `Transaction ${status}`,
    })
  }

  const filteredTransactions = transactions.filter(tx =>
    tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.chain.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
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
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <a href="/">← Back to Site</a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{transactions.length}</div>
              <div className="text-sm text-muted-foreground">Total Transactions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {transactions.filter(tx => tx.status === 'confirmed').length}
              </div>
              <div className="text-sm text-muted-foreground">Confirmed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {transactions.filter(tx => tx.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600">
                {transactions.filter(tx => tx.status === 'rejected').length}
              </div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Hash className="h-5 w-5" />
              <span>Transaction Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by transaction hash or chain..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={loadTransactions}>
                Refresh
              </Button>
            </div>

            {/* Transactions Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction Hash</TableHead>
                    <TableHead>Chain</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-mono text-sm">
                          {transaction.hash.substring(0, 20)}...
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.chain}</Badge>
                      </TableCell>
                      <TableCell>{transaction.amount || '$5'}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span className="text-sm">
                            {new Date(transaction.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {transaction.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTransactionStatus(transaction.id, 'confirmed')}
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTransactionStatus(transaction.id, 'rejected')}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              navigator.clipboard.writeText(transaction.hash)
                              toast({ title: "Copied!", description: "Transaction hash copied to clipboard" })
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No transactions found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Admin