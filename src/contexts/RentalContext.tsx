
import React, { createContext, useContext, useState, useCallback } from 'react';
import { PCConfiguration, PaymentSession, mockApi } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';

interface RentalContextType {
  rentals: PCConfiguration[];
  isLoading: boolean;
  deployPC: (config: Omit<PCConfiguration, 'id' | 'status'>) => Promise<void>;
  togglePC: (pcId: string) => Promise<void>;
  removePC: (pcId: string) => Promise<void>;
  refreshRentals: () => Promise<void>;
  createPayment: (pcConfig: PCConfiguration) => Promise<string>;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rentals, setRentals] = useState<PCConfiguration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const refreshRentals = useCallback(async () => {
    try {
      const userRentals = await mockApi.getUserRentals();
      setRentals(userRentals);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch rentals",
        variant: "destructive",
      });
    }
  }, [toast]);

  const deployPC = useCallback(async (config: Omit<PCConfiguration, 'id' | 'status'>) => {
    setIsLoading(true);
    try {
      await mockApi.deployPC(config);
      await refreshRentals();
      toast({
        title: "Success",
        description: "PC deployment initiated! Your instance will be ready in a few moments.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deploy PC",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [refreshRentals, toast]);

  const togglePC = useCallback(async (pcId: string) => {
    try {
      await mockApi.togglePC(pcId);
      await refreshRentals();
      toast({
        title: "Success",
        description: "PC status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update PC status",
        variant: "destructive",
      });
    }
  }, [refreshRentals, toast]);

  const removePC = useCallback(async (pcId: string) => {
    try {
      // Filter out the PC from local state immediately
      setRentals(currentRentals => currentRentals.filter(rental => rental.id !== pcId));
      
      // Simulate API call to remove PC
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Success",
        description: "PC removed successfully",
      });
    } catch (error) {
      // Refresh rentals to revert the optimistic update
      await refreshRentals();
      toast({
        title: "Error",
        description: "Failed to remove PC",
        variant: "destructive",
      });
    }
  }, [refreshRentals, toast]);

  const createPayment = useCallback(async (pcConfig: PCConfiguration): Promise<string> => {
    try {
      const session = await mockApi.createPaymentSession(pcConfig);
      toast({
        title: "Payment Session Created",
        description: "Redirecting to Stripe checkout...",
      });
      return session.sessionUrl;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create payment session",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const value: RentalContextType = {
    rentals,
    isLoading,
    deployPC,
    togglePC,
    removePC,
    refreshRentals,
    createPayment,
  };

  return (
    <RentalContext.Provider value={value}>
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => {
  const context = useContext(RentalContext);
  if (context === undefined) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};
