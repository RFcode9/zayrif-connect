
import { Card, CardContent } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    {
      title: "Gamers",
      description: "Experience AAA titles at max settings with RTX 4090 GPUs and instant streaming",
      icon: "🎮",
      color: "from-primary to-accent"
    },
    {
      title: "Video Editors", 
      description: "Edit 4K/8K footage seamlessly with professional-grade workstations",
      icon: "🎬",
      color: "from-accent to-primary"
    },
    {
      title: "3D Artists",
      description: "Render complex scenes faster with powerful CPUs and unlimited VRAM",
      icon: "🎨",
      color: "from-primary to-accent"
    },
    {
      title: "AI Developers",
      description: "Train models with high-end GPUs and pre-installed ML frameworks",
      icon: "🤖",
      color: "from-accent to-primary"
    }
  ];

  const benefits = [
    {
      title: "No Hardware Costs",
      description: "Skip the $5000+ investment. Pay only for what you use.",
      icon: "💰"
    },
    {
      title: "Ultra Performance",
      description: "Latest generation hardware, always updated and optimized.",
      icon: "⚡"
    },
    {
      title: "Plug & Play",
      description: "Connect from any device, anywhere. Setup in under 2 minutes.",
      icon: "🔌"
    },
    {
      title: "Global Access",
      description: "Low-latency servers worldwide for seamless remote computing.",
      icon: "🌍"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Who is this for */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Who is <span className="gradient-text">Zayrif Connect</span> for?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From casual gaming to professional workflows, our cloud PCs adapt to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="glass-effect border-primary/20 hover:border-accent/50 transition-all duration-300 hover:glow-effect">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Zayrif Connect */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Why <span className="gradient-text">Zayrif Connect?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="glass-effect border-primary/20 hover:border-accent/50 transition-all duration-300 hover:glow-effect">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
