
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRental } from '@/contexts/RentalContext';

const Customize = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { deployPC, isLoading } = useRental();
  
  const [config, setConfig] = useState({
    name: '',
    useCase: '',
    cpu: '',
    gpu: '',
    ram: '',
    storage: '',
    duration: '',
    purchaseType: 'rent' // 'rent' or 'buy'
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const useCases = [
    { value: 'gaming', label: 'Gaming', icon: '🎮' },
    { value: 'video-editing', label: 'Video Editing', icon: '🎬' },
    { value: '3d-rendering', label: '3D Rendering', icon: '🎨' },
    { value: 'machine-learning', label: 'Machine Learning', icon: '🤖' },
    { value: 'general', label: 'General Purpose', icon: '💻' }
  ];

  const cpuOptions = [
    { value: 'intel-i7', label: 'Intel Core i7-13700K', price: 56, buyPrice: 45000 },
    { value: 'intel-i9', label: 'Intel Core i9-13900K', price: 90, buyPrice: 65000 },
    { value: 'ryzen-7', label: 'AMD Ryzen 7 7800X3D', price: 67, buyPrice: 52000 },
    { value: 'ryzen-9', label: 'AMD Ryzen 9 7950X', price: 112, buyPrice: 75000 },
    { value: 'xeon', label: 'Intel Xeon W-3175X', price: 168, buyPrice: 120000 }
  ];

  const gpuOptions = [
    { value: 'rtx-3080', label: 'NVIDIA RTX 3080', price: 90, buyPrice: 85000 },
    { value: 'rtx-4080', label: 'NVIDIA RTX 4080', price: 134, buyPrice: 125000 },
    { value: 'rtx-4090', label: 'NVIDIA RTX 4090', price: 202, buyPrice: 180000 },
    { value: 'quadro', label: 'NVIDIA Quadro RTX 8000', price: 280, buyPrice: 250000 },
    { value: 'rx-7900', label: 'AMD RX 7900 XTX', price: 112, buyPrice: 95000 }
  ];

  const ramOptions = [
    { value: '16gb', label: '16GB DDR5', price: 22, buyPrice: 12000 },
    { value: '32gb', label: '32GB DDR5', price: 45, buyPrice: 25000 },
    { value: '64gb', label: '64GB DDR5', price: 90, buyPrice: 48000 },
    { value: '128gb', label: '128GB DDR5', price: 168, buyPrice: 95000 }
  ];

  const storageOptions = [
    { value: '1tb-ssd', label: '1TB NVMe SSD', price: 11, buyPrice: 8500 },
    { value: '2tb-ssd', label: '2TB NVMe SSD', price: 22, buyPrice: 16000 },
    { value: '4tb-ssd', label: '4TB NVMe SSD', price: 45, buyPrice: 32000 },
    { value: '8tb-ssd', label: '8TB NVMe SSD', price: 90, buyPrice: 65000 }
  ];

  const updatePrice = (newConfig: typeof config) => {
    const cpu = cpuOptions.find(c => c.value === newConfig.cpu);
    const gpu = gpuOptions.find(g => g.value === newConfig.gpu);
    const ram = ramOptions.find(r => r.value === newConfig.ram);
    const storage = storageOptions.find(s => s.value === newConfig.storage);
    
    if (newConfig.purchaseType === 'buy') {
      const buyPrice = (cpu?.buyPrice || 0) + (gpu?.buyPrice || 0) + (ram?.buyPrice || 0) + (storage?.buyPrice || 0);
      setEstimatedPrice(buyPrice);
    } else {
      const rentPrice = (cpu?.price || 0) + (gpu?.price || 0) + (ram?.price || 0) + (storage?.price || 0);
      setEstimatedPrice(rentPrice);
    }
  };

  const calculateTotalCost = () => {
    if (config.purchaseType === 'buy') {
      return estimatedPrice; // One-time purchase price
    }
    if (!config.duration) return estimatedPrice;
    const hours = parseInt(config.duration.split(' ')[0]) || 1;
    return estimatedPrice * hours;
  };

  const handleConfigChange = (key: string, value: string) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    updatePrice(newConfig);
  };

  const isConfigComplete = config.name && config.useCase && config.cpu && config.gpu && config.ram && config.storage && 
    (config.purchaseType === 'buy' || config.duration);

  const handleDeploy = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isConfigComplete) return;

    const pcConfig = {
      name: config.name,
      useCase: config.useCase,
      cpu: cpuOptions.find(c => c.value === config.cpu)?.label || '',
      gpu: gpuOptions.find(g => g.value === config.gpu)?.label || '',
      ram: ramOptions.find(r => r.value === config.ram)?.label || '',
      storage: storageOptions.find(s => s.value === config.storage)?.label || '',
      resolution: '1080p',
      duration: config.purchaseType === 'buy' ? 'Purchased' : config.duration,
      hourlyRate: config.purchaseType === 'buy' ? calculateTotalCost() : estimatedPrice,
    };

    try {
      await deployPC(pcConfig);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to deploy PC:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Customize Your <span className="gradient-text">Dream PC</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Build the perfect cloud workstation for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Configuration Name */}
              <Card className="glass-effect border-border/20">
                <CardHeader>
                  <CardTitle className="text-accent">Configuration Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="configName">Give your configuration a unique name</Label>
                    <Input
                      id="configName"
                      placeholder="e.g., My Gaming Beast, Work Station Pro, etc."
                      value={config.name}
                      onChange={(e) => handleConfigChange('name', e.target.value)}
                      className="bg-background border-border/20"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Purchase Type Selection */}
              <Card className="glass-effect border-border/20">
                <CardHeader>
                  <CardTitle className="text-accent">Choose Your Option</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={config.purchaseType}
                    onValueChange={(value) => handleConfigChange('purchaseType', value)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border/20 hover:border-accent/50 transition-colors">
                      <RadioGroupItem value="rent" id="rent" />
                      <Label htmlFor="rent" className="cursor-pointer">
                        <div className="font-semibold">Rent PC</div>
                        <div className="text-sm text-muted-foreground">Pay per hour usage</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border/20 hover:border-accent/50 transition-colors">
                      <RadioGroupItem value="buy" id="buy" />
                      <Label htmlFor="buy" className="cursor-pointer">
                        <div className="font-semibold">Buy PC</div>
                        <div className="text-sm text-muted-foreground">One-time purchase</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Use Case */}
              <Card className="glass-effect border-border/20">
                <CardHeader>
                  <CardTitle className="text-accent">Select Your Use Case</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {useCases.map((useCase) => (
                      <button
                        key={useCase.value}
                        onClick={() => handleConfigChange('useCase', useCase.value)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 tech-button ${
                          config.useCase === useCase.value
                            ? 'neon-border bg-accent/10'
                            : 'border-border/20 hover:border-accent/50'
                        }`}
                      >
                        <div className="text-2xl mb-2">{useCase.icon}</div>
                        <div className="font-semibold">{useCase.label}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Hardware Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-effect border-border/20">
                  <CardHeader>
                    <CardTitle className="text-accent">CPU</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('cpu', value)}>
                      <SelectTrigger className="bg-background border-border/20">
                        <SelectValue placeholder="Select CPU" />
                      </SelectTrigger>
                      <SelectContent>
                        {cpuOptions.map((cpu) => (
                          <SelectItem key={cpu.value} value={cpu.value}>
                            {cpu.label} ({config.purchaseType === 'buy' ? `₹${cpu.buyPrice}` : `+₹${cpu.price}/hr`})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-border/20">
                  <CardHeader>
                    <CardTitle className="text-accent">GPU</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('gpu', value)}>
                      <SelectTrigger className="bg-background border-border/20">
                        <SelectValue placeholder="Select GPU" />
                      </SelectTrigger>
                      <SelectContent>
                        {gpuOptions.map((gpu) => (
                          <SelectItem key={gpu.value} value={gpu.value}>
                            {gpu.label} ({config.purchaseType === 'buy' ? `₹${gpu.buyPrice}` : `+₹${gpu.price}/hr`})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-border/20">
                  <CardHeader>
                    <CardTitle className="text-accent">RAM</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('ram', value)}>
                      <SelectTrigger className="bg-background border-border/20">
                        <SelectValue placeholder="Select RAM" />
                      </SelectTrigger>
                      <SelectContent>
                        {ramOptions.map((ram) => (
                          <SelectItem key={ram.value} value={ram.value}>
                            {ram.label} ({config.purchaseType === 'buy' ? `₹${ram.buyPrice}` : `+₹${ram.price}/hr`})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-border/20">
                  <CardHeader>
                    <CardTitle className="text-accent">Storage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('storage', value)}>
                      <SelectTrigger className="bg-background border-border/20">
                        <SelectValue placeholder="Select Storage" />
                      </SelectTrigger>
                      <SelectContent>
                        {storageOptions.map((storage) => (
                          <SelectItem key={storage.value} value={storage.value}>
                            {storage.label} ({config.purchaseType === 'buy' ? `₹${storage.buyPrice}` : `+₹${storage.price}/hr`})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>

              {/* Rental Duration - Only show for rent option */}
              {config.purchaseType === 'rent' && (
                <Card className="glass-effect border-border/20">
                  <CardHeader>
                    <CardTitle className="text-accent">Rental Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('duration', value)}>
                      <SelectTrigger className="bg-background border-border/20">
                        <SelectValue placeholder="Select Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 hour">1 Hour</SelectItem>
                        <SelectItem value="4 hours">4 Hours</SelectItem>
                        <SelectItem value="8 hours">8 Hours</SelectItem>
                        <SelectItem value="24 hours">24 Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Configuration Summary */}
            <div className="lg:col-span-1">
              <Card className="glass-effect border-border/20 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-accent">Configuration Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-6">
                    {config.purchaseType === 'buy' ? (
                      <>
                        <div className="text-3xl font-bold text-primary">₹{estimatedPrice.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">one-time purchase</div>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-accent">₹{estimatedPrice}</div>
                        <div className="text-xs text-muted-foreground">per hour</div>
                        {config.duration && (
                          <>
                            <div className="text-3xl font-bold text-primary mt-2">₹{calculateTotalCost()}</div>
                            <div className="text-sm text-muted-foreground">total cost</div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {config.name && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-semibold">{config.name}</span>
                    </div>
                  )}

                  {config.purchaseType && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{config.purchaseType === 'buy' ? 'Purchase' : 'Rental'}</span>
                    </div>
                  )}

                  {config.useCase && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Use Case:</span>
                      <span>{useCases.find(u => u.value === config.useCase)?.label}</span>
                    </div>
                  )}

                  {config.cpu && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPU:</span>
                      <span>{cpuOptions.find(c => c.value === config.cpu)?.label}</span>
                    </div>
                  )}

                  {config.gpu && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GPU:</span>
                      <span>{gpuOptions.find(g => g.value === config.gpu)?.label}</span>
                    </div>
                  )}

                  {config.ram && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RAM:</span>
                      <span>{ramOptions.find(r => r.value === config.ram)?.label}</span>
                    </div>
                  )}

                  {config.storage && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span>{storageOptions.find(s => s.value === config.storage)?.label}</span>
                    </div>
                  )}

                  {config.duration && config.purchaseType === 'rent' && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{config.duration}</span>
                    </div>
                  )}

                  <Button 
                    className="w-full tech-button text-foreground mt-6"
                    disabled={!isConfigComplete || isLoading}
                    onClick={handleDeploy}
                  >
                    {isLoading ? 'Processing...' : isConfigComplete ? (config.purchaseType === 'buy' ? 'Purchase Configuration' : 'Deploy Configuration') : 'Complete Configuration'}
                  </Button>

                  {isConfigComplete && !isAuthenticated && (
                    <p className="text-xs text-muted-foreground text-center">
                      Login required to {config.purchaseType === 'buy' ? 'purchase' : 'deploy'} your PC
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
