import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRental } from '@/contexts/RentalContext';
import PaymentButton from './PaymentButton';
import ConnectionModal from './ConnectionModal';
import { PCConfiguration } from '@/services/mockApi';
import { Play, Pause, Square, Trash2, Monitor } from 'lucide-react';

const PCManager: React.FC = () => {
  const { rentals, isLoading, togglePC, refreshRentals, removePC } = useRental();
  const [selectedPC, setSelectedPC] = useState<PCConfiguration | null>(null);
  const [showConnectionModal, setShowConnectionModal] = useState(false);

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
    return `₹${(cents / 100).toFixed(0)}`;
  };

  const calculateTotalCost = (config: PCConfiguration) => {
    const hours = parseInt(config.duration.split(' ')[0]) || 1;
    return config.hourlyRate * hours;
  };

  const handleConnect = (pc: PCConfiguration) => {
    setSelectedPC(pc);
    setShowConnectionModal(true);
  };

  const handleRemovePC = async (pcId: string) => {
    if (window.confirm('Are you sure you want to remove this PC? This action cannot be undone.')) {
      await removePC(pcId);
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-effect border-border/20">
        <CardContent className="p-6 text-center">
          <div className="text-accent">Loading your cloud PCs...</div>
        </CardContent>
      </Card>
    );
  }

  if (rentals.length === 0) {
    return (
      <Card className="glass-effect border-border/20">
        <CardContent className="p-6 text-center">
          <div className="text-muted-foreground mb-4">No cloud PCs deployed yet</div>
          <Button 
            onClick={() => window.location.href = '/customize'}
            className="tech-button text-foreground"
          >
            Deploy Your First PC
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {rentals.map((rental) => (
          <Card key={rental.id} className="glass-effect border-border/20">
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
                    ₹{calculateTotalCost(rental)}
                  </p>
                </div>
              </div>
              
              {rental.expiresAt && (
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">Expires:</span>
                  <p className="text-sm">{new Date(rental.expiresAt).toLocaleString()}</p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {rental.status === 'running' && (
                  <Button 
                    size="sm" 
                    className="tech-button text-foreground flex items-center gap-2"
                    onClick={() => handleConnect(rental)}
                  >
                    <Monitor className="w-4 h-4" />
                    Connect
                  </Button>
                )}
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-border/20 tech-button flex items-center gap-2"
                  onClick={() => togglePC(rental.id)}
                  disabled={rental.status === 'deploying'}
                >
                  {rental.status === 'running' ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : rental.status === 'stopped' ? (
                    <>
                      <Play className="w-4 h-4" />
                      Start
                    </>
                  ) : (
                    'Deploying...'
                  )}
                </Button>

                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-border/20 tech-button flex items-center gap-2"
                  onClick={() => togglePC(rental.id)}
                  disabled={rental.status === 'deploying'}
                >
                  <Square className="w-4 h-4" />
                  Stop
                </Button>

                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-destructive/50 hover:bg-destructive hover:text-destructive-foreground tech-button flex items-center gap-2"
                  onClick={() => handleRemovePC(rental.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Remove PC
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

      {selectedPC && (
        <ConnectionModal
          isOpen={showConnectionModal}
          onClose={() => setShowConnectionModal(false)}
          pcConfig={selectedPC}
        />
      )}
    </>
  );
};

export default PCManager;
