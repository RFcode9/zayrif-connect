
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRental } from '@/contexts/RentalContext';
import { useState } from 'react';
import ConnectionModal from '@/components/ConnectionModal';
import { PCConfiguration } from '@/services/mockApi';

const Pricing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { deployPC, isLoading } = useRental();
  const [selectedPC, setSelectedPC] = useState<PCConfiguration | null>(null);
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  const pricingTiers = [
    {
      name: "Lite",
      description: "Perfect for students and light usage",
      price: "₹45,000",
      period: "one-time purchase",
      features: [
        "GTX 1660 Super GPU",
        "Intel i5 CPU",
        "16GB RAM",
        "500GB SSD",
        "1080p Support",
        "Basic Support"
      ],
      color: "border-border/20 hover:border-primary/50",
      buttonStyle: "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      config: {
        cpu: "Intel Core i5-12400K",
        gpu: "NVIDIA GTX 1660 Super",
        ram: "16GB DDR4",
        storage: "500GB NVMe SSD"
      }
    },
    {
      name: "Creator",
      description: "High-end specs for content creators",
      price: "₹120,000",
      period: "one-time purchase",
      popular: true,
      features: [
        "RTX 4080 GPU",
        "AMD Ryzen 9 CPU",
        "32GB RAM",
        "1TB NVMe SSD",
        "4K Support",
        "Priority Support",
        "Adobe Suite Pre-installed"
      ],
      color: "neon-border bg-accent/5",
      buttonStyle: "tech-button text-foreground",
      config: {
        cpu: "AMD Ryzen 9 7900X",
        gpu: "NVIDIA RTX 4080",
        ram: "32GB DDR5",
        storage: "1TB NVMe SSD"
      }
    },
    {
      name: "Pro",
      description: "Ultimate performance for professionals",
      price: "₹200,000",
      period: "one-time purchase",
      features: [
        "RTX 4090 GPU",
        "Intel Xeon CPU",
        "64GB RAM",
        "2TB NVMe SSD",
        "8K Support",
        "24/7 Premium Support",
        "All Software Licenses",
        "Dedicated Instance"
      ],
      color: "border-accent/50 hover:border-accent",
      buttonStyle: "border-accent text-accent hover:bg-accent hover:text-accent-foreground",
      config: {
        cpu: "Intel Xeon W-3175X",
        gpu: "NVIDIA RTX 4090",
        ram: "64GB DDR5",
        storage: "2TB NVMe SSD"
      }
    }
  ];

  const customFeatures = [
    "⚡ Instant deployment",
    "🔒 Enterprise security",
    "🌍 Global data centers",
    "💾 Persistent storage options",
    "🔧 Custom configurations",
    "📊 Usage analytics"
  ];

  const handlePurchasePC = async (tier: typeof pricingTiers[0]) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const pcConfig = {
      name: `${tier.name} Pre-configured PC`,
      useCase: 'pre-configured',
      cpu: tier.config.cpu,
      gpu: tier.config.gpu,
      ram: tier.config.ram,
      storage: tier.config.storage,
      resolution: '1080p',
      duration: 'Purchased',
      hourlyRate: parseInt(tier.price.replace('₹', '').replace(',', '')),
    };

    try {
      const deployedPC = await deployPC(pcConfig);
      // Wait for deployment to complete (simulated)
      setTimeout(() => {
        setSelectedPC(deployedPC);
        setShowConnectionModal(true);
      }, 3000);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to deploy PC:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Purchase your perfect cloud PC with no hidden fees, no long-term contracts. 
              One-time purchase, lifetime access.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`glass-effect ${tier.color} relative overflow-hidden`}>
                {tier.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="bg-accent text-accent-foreground rounded-bl-lg rounded-tr-lg px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="font-heading text-2xl mb-2">{tier.name}</CardTitle>
                  <p className="text-muted-foreground mb-4">{tier.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-accent">{tier.price}</span>
                    <span className="text-muted-foreground ml-2">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="text-accent mr-2">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className={`w-full ${tier.buttonStyle}`}
                    onClick={() => handlePurchasePC(tier)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Deploying...' : 'Start Using'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Configuration */}
          <Card className="glass-effect border-border/20 mb-16">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-heading text-3xl font-bold mb-4">
                    Need a <span className="gradient-text">Custom Configuration?</span>
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Build your perfect cloud PC with our advanced customization tool. 
                    Choose your exact specifications and purchase your ideal setup.
                  </p>
                  <Button 
                    className="tech-button text-foreground"
                    onClick={() => navigate('/customize')}
                  >
                    Configure Custom PC
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {customFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-8">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="glass-effect border-border/20 text-left">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-accent mb-2">How does the purchase work?</h3>
                  <p className="text-sm text-muted-foreground">
                    One-time purchase gives you lifetime access to your cloud PC. 
                    No recurring fees, just purchase and start using immediately.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-effect border-border/20 text-left">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-accent mb-2">Can I save my work?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! All your files are automatically saved to persistent storage. 
                    You can access them from any device, anytime.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-effect border-border/20 text-left">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-accent mb-2">What's included in the purchase?</h3>
                  <p className="text-sm text-muted-foreground">
                    Your purchase includes the complete PC configuration, persistent storage, 
                    and lifetime access to your cloud workstation.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-effect border-border/20 text-left">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-accent mb-2">Enterprise solutions?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer custom enterprise packages with dedicated resources, 
                    volume discounts, and enhanced security features.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Modal */}
      {selectedPC && (
        <ConnectionModal
          isOpen={showConnectionModal}
          onClose={() => setShowConnectionModal(false)}
          pcConfig={selectedPC}
        />
      )}
    </div>
  );
};

export default Pricing;
