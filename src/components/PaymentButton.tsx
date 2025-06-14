
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PCConfiguration } from '@/services/mockApi';
import { useRental } from '@/contexts/RentalContext';

interface PaymentButtonProps {
  pcConfig: PCConfiguration;
  disabled?: boolean;
  children: React.ReactNode;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ pcConfig, disabled, children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { createPayment } = useRental();

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const checkoutUrl = await createPayment(pcConfig);
      
      // Open Stripe checkout in a new tab (mock)
      window.open(checkoutUrl, '_blank');
      
      // Simulate payment completion after 3 seconds
      setTimeout(() => {
        setIsProcessing(false);
        // In a real app, this would be handled by Stripe webhooks
        console.log('Mock payment completed for PC:', pcConfig.name);
      }, 3000);
    } catch (error) {
      setIsProcessing(false);
      console.error('Payment failed:', error);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isProcessing}
      className="bg-accent text-accent-foreground hover:bg-accent/90"
    >
      {isProcessing ? 'Processing...' : children}
    </Button>
  );
};

export default PaymentButton;
