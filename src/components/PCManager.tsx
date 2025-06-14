
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRental } from '@/contexts/RentalContext';
import PaymentButton from './PaymentButton';
import { PCConfiguration } from '@/services/mockApi';

const PCManager: React.FC = () => {
  const { rentals, isLoading, togglePC, refreshRentals } = useRental();

  useEffect(() => {
    refreshRentals();
  }, [refreshRentals]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-accent text-accent-foreground';
      case 'stopped': return 'bg-muted text-muted-foreground';
      case 'deploying': return 'bg-yellow-500 text-yellow-50';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const calculateTotalCost = (config: PCConfiguration) => {
    const hours = parseInt(config.duration.split(' ')[0]) || 1;
    return config.hourlyRate * hours * 100; // Convert to cents
  };

  if (isLoading) {
    return (
      <Card className="glass-effect border-primary/20">
        <CardContent className="p-6 text-center">
          <div className="text-accent">Loading your cloud PCs...</div>
        </CardContent>
      </Card>
    );
  }

  if (rentals.length === 0) {
    return (
      <Card className="glass-effect border-primary/20">
        <CardContent className="p-6 text-center">
          <div className="text-muted-foreground mb-4">No cloud PCs deployed yet</div>
          <Button 
            onClick={() => window.location.href = '/customize'}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Deploy Your First PC
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {rentals.map((rental) => (
        <Card key={rental.id} className="glass-effect border-primary/20">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-accent">{rental.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {rental.cpu} • {rental.gpu} • {rental.ram}
                </p>
              </div>
              <Badge className={getStatusColor(rental.status)}>
                {rental.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm text-muted-foreground">Duration:</span>
                <p className="font-semibold">{rental.duration}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Total Cost:</span>
                <p className="font-semibold text-accent">
                  {formatCurrency(calculateTotalCost(rental))}
                </p>
              </div>
            </div>
            
            {rental.expiresAt && (
              <div className="mb-4">
                <span className="text-sm text-muted-foreground">Expires:</span>
                <p className="text-sm">{new Date(rental.expiresAt).toLocaleString()}</p>
              </div>
            )}

            <div className="flex gap-2">
              {rental.status === 'running' && (
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Connect
                </Button>
              )}
              
              <Button 
                size="sm" 
                variant="outline" 
                className="border-primary/20"
                onClick={() => togglePC(rental.id)}
                disabled={rental.status === 'deploying'}
              >
                {rental.status === 'running' ? 'Stop' : 'Start'}
              </Button>
              
              {rental.status === 'available' && (
                <PaymentButton pcConfig={rental}>
                  Pay & Deploy
                </PaymentButton>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PCManager;
