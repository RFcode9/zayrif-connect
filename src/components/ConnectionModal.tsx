
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PCConfiguration } from '@/services/mockApi';
import { Copy, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  pcConfig: PCConfiguration;
}

const ConnectionModal: React.FC<ConnectionModalProps> = ({ isOpen, onClose, pcConfig }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const connectViaAnyDesk = () => {
    if (pcConfig.anydeskId) {
      // Try to open AnyDesk with the ID
      const anydeskUrl = `anydesk:${pcConfig.anydeskId}`;
      window.location.href = anydeskUrl;
      
      toast({
        title: "Launching AnyDesk",
        description: "Opening AnyDesk application...",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-accent">Connect to {pcConfig.name}</DialogTitle>
          <DialogDescription>
            Use AnyDesk to connect to your cloud PC
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* AnyDesk ID */}
          <div className="space-y-2">
            <label className="text-sm font-medium">AnyDesk ID</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 p-2 bg-muted rounded-md font-mono text-sm">
                {pcConfig.anydeskId}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(pcConfig.anydeskId!, 'AnyDesk ID')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 p-2 bg-muted rounded-md font-mono text-sm">
                {showPassword ? pcConfig.anydeskPassword : '••••••••'}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(pcConfig.anydeskPassword!, 'Password')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Connection Methods */}
          <div className="space-y-3 pt-4 border-t">
            <Button
              onClick={connectViaAnyDesk}
              className="w-full tech-button text-foreground"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Launch AnyDesk
            </Button>
            
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Manual connection steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Open AnyDesk application</li>
                <li>Enter the AnyDesk ID: <code className="bg-muted px-1 rounded">{pcConfig.anydeskId}</code></li>
                <li>Click "Connect"</li>
                <li>Enter the password when prompted</li>
              </ol>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionModal;
