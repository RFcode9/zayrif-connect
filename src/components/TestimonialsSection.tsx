
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Content Creator",
      content: "Zayrif Connect revolutionized my workflow. I can edit 4K videos from my laptop while traveling. The performance is incredible!",
      avatar: "🎬",
      rating: 5
    },
    {
      name: "Sarah Johnson", 
      role: "Game Streamer",
      content: "No more lag, no more hardware upgrades. I stream AAA games at max settings and my audience loves the quality.",
      avatar: "🎮",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "AI Researcher", 
      content: "Training deep learning models on Zayrif Connect is a game-changer. The GPU power is unmatched and cost-effective.",
      avatar: "🤖",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Trusted by <span className="gradient-text">Creators Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how professionals are transforming their workflows with cloud computing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-effect border-primary/20 hover:border-accent/50 transition-all duration-300 hover:glow-effect">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-accent">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent">⭐</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
