
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';

const Customize = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    useCase: '',
    cpu: '',
    gpu: '',
    ram: '',
    storage: '',
    resolution: '',
    duration: ''
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
    { value: 'intel-i7', label: 'Intel Core i7-13700K', price: 5 },
    { value: 'intel-i9', label: 'Intel Core i9-13900K', price: 8 },
    { value: 'ryzen-7', label: 'AMD Ryzen 7 7800X3D', price: 6 },
    { value: 'ryzen-9', label: 'AMD Ryzen 9 7950X', price: 10 },
    { value: 'xeon', label: 'Intel Xeon W-3175X', price: 15 }
  ];

  const gpuOptions = [
    { value: 'rtx-3080', label: 'NVIDIA RTX 3080', price: 8 },
    { value: 'rtx-4080', label: 'NVIDIA RTX 4080', price: 12 },
    { value: 'rtx-4090', label: 'NVIDIA RTX 4090', price: 18 },
    { value: 'quadro', label: 'NVIDIA Quadro RTX 8000', price: 25 },
    { value: 'rx-7900', label: 'AMD RX 7900 XTX', price: 10 }
  ];

  const ramOptions = [
    { value: '16gb', label: '16GB DDR5', price: 2 },
    { value: '32gb', label: '32GB DDR5', price: 4 },
    { value: '64gb', label: '64GB DDR5', price: 8 },
    { value: '128gb', label: '128GB DDR5', price: 15 }
  ];

  const storageOptions = [
    { value: '1tb-ssd', label: '1TB NVMe SSD', price: 1 },
    { value: '2tb-ssd', label: '2TB NVMe SSD', price: 2 },
    { value: '4tb-ssd', label: '4TB NVMe SSD', price: 4 },
    { value: '8tb-ssd', label: '8TB NVMe SSD', price: 8 }
  ];

  const updatePrice = (newConfig: typeof config) => {
    const cpu = cpuOptions.find(c => c.value === newConfig.cpu)?.price || 0;
    const gpu = gpuOptions.find(g => g.value === newConfig.gpu)?.price || 0;
    const ram = ramOptions.find(r => r.value === newConfig.ram)?.price || 0;
    const storage = storageOptions.find(s => s.value === newConfig.storage)?.price || 0;
    
    setEstimatedPrice(cpu + gpu + ram + storage);
  };

  const handleConfigChange = (key: string, value: string) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    updatePrice(newConfig);
  };

  const isConfigComplete = Object.values(config).every(value => value !== '');

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
              {/* Use Case */}
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="text-accent">Select Your Use Case</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {useCases.map((useCase) => (
                      <button
                        key={useCase.value}
                        onClick={() => handleConfigChange('useCase', useCase.value)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          config.useCase === useCase.value
                            ? 'neon-border bg-accent/10'
                            : 'border-primary/20 hover:border-accent/50'
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
                <Card className="glass-effect border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-accent">CPU</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('cpu', value)}>
                      <SelectTrigger className="bg-background border-primary/20">
                        <SelectValue placeholder="Select CPU" />
                      </SelectTrigger>
                      <SelectContent>
                        {cpuOptions.map((cpu) => (
                          <SelectItem key={cpu.value} value={cpu.value}>
                            {cpu.label} (+${cpu.price}/hr)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-accent">GPU</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('gpu', value)}>
                      <SelectTrigger className="bg-background border-primary/20">
                        <SelectValue placeholder="Select GPU" />
                      </SelectTrigger>
                      <SelectContent>
                        {gpuOptions.map((gpu) => (
                          <SelectItem key={gpu.value} value={gpu.value}>
                            {gpu.label} (+${gpu.price}/hr)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-accent">RAM</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('ram', value)}>
                      <SelectTrigger className="bg-background border-primary/20">
                        <SelectValue placeholder="Select RAM" />
                      </SelectTrigger>
                      <SelectContent>
                        {ramOptions.map((ram) => (
                          <SelectItem key={ram.value} value={ram.value}>
                            {ram.label} (+${ram.price}/hr)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-accent">Storage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('storage', value)}>
                      <SelectTrigger className="bg-background border-primary/20">
                        <SelectValue placeholder="Select Storage" />
                      </SelectTrigger>
                      <SelectContent>
                        {storageOptions.map((storage) => (
                          <SelectItem key={storage.value} value={storage.value}>
                            {storage.label} (+${storage.price}/hr)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-effect border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-accent">Resolution Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('resolution', value)}>
                      <SelectTrigger className="bg-background border-primary/20">
                        <SelectValue placeholder="Select Resolution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1080p">Full HD (1080p)</SelectItem>
                        <SelectItem value="1440p">2K (1440p)</SelectItem>
                        <SelectItem value="4k">4K (2160p)</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-accent">Rental Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={(value) => handleConfigChange('duration', value)}>
                      <SelectTrigger className="bg-background border-primary/20">
                        <SelectValue placeholder="Select Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Configuration Summary */}
            <div className="lg:col-span-1">
              <Card className="glass-effect border-primary/20 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-accent">Configuration Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-accent">${estimatedPrice}</div>
                    <div className="text-sm text-muted-foreground">per hour</div>
                  </div>

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

                  <Button 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-6"
                    disabled={!isConfigComplete}
                    onClick={() => navigate('/login')}
                  >
                    {isConfigComplete ? 'Check Availability' : 'Complete Configuration'}
                  </Button>

                  {isConfigComplete && (
                    <p className="text-xs text-muted-foreground text-center">
                      Login required to check availability and deploy your PC
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
