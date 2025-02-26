'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, DollarSign, Heart, ArrowRight } from 'lucide-react'
import { ClientBoundary } from '@/components/client-boundary'
import { cn } from '@/lib/utils'

const DONATION_AMOUNTS = [10, 25, 50, 100, 250, 500]

function DonateContent() {
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Here you would typically handle the donation process
    console.log('Donation submitted:', amount || customAmount)
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Heart className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Make a Difference Today
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Your donation helps us empower youth through education, leadership development, and community engagement.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-card rounded-xl p-6 shadow-lg border">
          <h2 className="text-2xl font-semibold mb-6">Choose Amount</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {DONATION_AMOUNTS.map((preset) => (
              <Button
                key={preset}
                type="button"
                variant={amount === preset.toString() ? "default" : "outline"}
                className="h-16 text-lg"
                onClick={() => {
                  setAmount(preset.toString())
                  setCustomAmount('')
                }}
              >
                ${preset}
              </Button>
            ))}
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-muted-foreground">
              Custom Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setAmount('')
                }}
                className="pl-9"
                placeholder="Enter custom amount"
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-lg border">
          <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Card Number
                </label>
                <Input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Expiry Date
                  </label>
                  <Input type="text" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    CVC
                  </label>
                  <Input type="text" placeholder="123" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Name on Card
                </label>
                <Input type="text" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Email
                </label>
                <Input type="email" placeholder="john@example.com" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg"
              disabled={isSubmitting || (!amount && !customAmount)}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Donate ${amount || customAmount || '0'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <h3 className="font-semibold mb-2">Secure Payment</h3>
          <p className="text-sm text-muted-foreground">Your payment information is encrypted and secure.</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <h3 className="font-semibold mb-2">Tax Deductible</h3>
          <p className="text-sm text-muted-foreground">Your donation may be tax deductible in your country.</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <h3 className="font-semibold mb-2">100% Impact</h3>
          <p className="text-sm text-muted-foreground">Every dollar goes directly to supporting our programs.</p>
        </div>
      </div>
    </div>
  )
}

export default function DonatePage() {
  return (
    <ClientBoundary>
      <DonateContent />
    </ClientBoundary>
  )
}
