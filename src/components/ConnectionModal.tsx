
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PCConfiguration } from '@/services/mockApi';

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  pcConfig: PCConfiguration;
}

const ConnectionModal: React.FC<ConnectionModalProps> = ({ isOpen, onClose, pcConfig }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-accent">Connected to {pcConfig.name}</DialogTitle>
          <DialogDescription>
            Your cloud PC is now ready and running
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Display the static image */}
          <div className="w-full bg-black rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Cloud PC Desktop Environment"
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Your {pcConfig.name} is now running with {pcConfig.cpu}, {pcConfig.gpu}, and {pcConfig.ram}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionModal;
