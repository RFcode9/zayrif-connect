
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navbar from '@/components/Navbar';

const Support = () => {
  const [ticketData, setTicketData] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate ticket submission
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setTicketData({ subject: '', message: '', priority: 'medium' });
  };

  const faqItems = [
    {
      question: "How do I connect to my cloud PC?",
      answer: "Once your PC is deployed, click the 'Connect' button in your dashboard. We provide multiple connection methods including web browser, RDP client, and our custom streaming app for the best performance."
    },
    {
      question: "What if my PC freezes or becomes unresponsive?",
      answer: "You can restart your cloud PC from the dashboard by clicking the 'Restart' button. If the issue persists, our monitoring system will automatically detect and resolve most problems. For urgent issues, contact our 24/7 support team."
    },
    {
      question: "Can I store my files permanently?",
      answer: "Yes! We offer persistent storage options. Your files in the Documents, Desktop, and designated folders are automatically saved. You can also purchase additional permanent storage space from your dashboard."
    },
    {
      question: "How do I upgrade my PC specifications?",
      answer: "You can upgrade your PC specs anytime from the dashboard. Stop your current instance, modify the configuration, and restart with new specifications. You'll only pay for the new specs from that point forward."
    },
    {
      question: "What software is pre-installed?",
      answer: "All our PCs come with Windows 11, essential drivers, and browsers. Our Creator tier includes Adobe Creative Suite, and Pro tier includes professional software licenses. You can also install any software you need."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We use enterprise-grade encryption, isolated virtual environments, and comply with SOC 2 and GDPR standards. Your data is backed up automatically and never shared with third parties."
    }
  ];

  const supportChannels = [
    {
      title: "24/7 Live Chat",
      description: "Get instant help from our support team",
      icon: "💬",
      action: () => setIsChatOpen(true)
    },
    {
      title: "Knowledge Base",
      description: "Browse our comprehensive guides and tutorials",
      icon: "📚",
      action: () => window.open('https://docs.zayrif.com', '_blank')
    },
    {
      title: "Community Forum",
      description: "Connect with other users and share tips",
      icon: "👥",
      action: () => window.open('https://community.zayrif.com', '_blank')
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      icon: "🎥",
      action: () => window.open('https://www.youtube.com/zayrif', '_blank')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              How can we <span className="gradient-text">help you?</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get the support you need, when you need it. Our team is here 24/7 to ensure 
              your cloud computing experience is seamless.
            </p>
          </div>

          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="glass-effect border-primary/20 hover:border-accent/50 transition-all duration-300 hover:glow-effect cursor-pointer" onClick={channel.action}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{channel.icon}</div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{channel.title}</h3>
                  <p className="text-muted-foreground text-sm">{channel.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FAQ Section */}
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-accent text-2xl">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-primary/20">
                      <AccordionTrigger className="text-left hover:text-accent">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Submit Ticket */}
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-accent text-2xl">Submit Support Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={ticketData.subject}
                      onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                      className="bg-background border-primary/20 focus:border-accent"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <select
                      id="priority"
                      value={ticketData.priority}
                      onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
                      className="w-full p-2 bg-background border border-primary/20 rounded-md focus:border-accent focus:outline-none"
                    >
                      <option value="low">Low - General question</option>
                      <option value="medium">Medium - Non-urgent issue</option>
                      <option value="high">High - Affects my work</option>
                      <option value="urgent">Urgent - System down</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Detailed Description</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide as much detail as possible about your issue..."
                      rows={5}
                      value={ticketData.message}
                      onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                      className="bg-background border-primary/20 focus:border-accent resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Submit Ticket
                  </Button>
                </form>

                <div className="mt-6 p-4 border border-accent/20 rounded-lg bg-accent/5">
                  <h4 className="font-semibold text-accent mb-2">Response Times</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Urgent: Within 1 hour</li>
                    <li>• High: Within 4 hours</li>
                    <li>• Medium: Within 24 hours</li>
                    <li>• Low: Within 48 hours</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Chat Simulation */}
          {isChatOpen && (
            <div className="fixed bottom-4 right-4 w-80 h-96 bg-background border border-primary/20 rounded-lg shadow-2xl z-50 glass-effect">
              <div className="p-4 border-b border-primary/20 flex justify-between items-center">
                <h3 className="font-semibold text-accent">Live Support Chat</h3>
                <button onClick={() => setIsChatOpen(false)} className="text-muted-foreground hover:text-foreground">
                  ✕
                </button>
              </div>
              <div className="p-4 h-64 overflow-y-auto">
                <div className="space-y-4">
                  <div className="text-sm bg-accent/10 p-3 rounded-lg">
                    <strong className="text-accent">Support Agent:</strong> Hello! I'm here to help. What can I assist you with today?
                  </div>
                  <div className="text-sm bg-primary/10 p-3 rounded-lg ml-4">
                    <strong>You:</strong> Hi! I need help connecting to my cloud PC.
                  </div>
                  <div className="text-sm bg-accent/10 p-3 rounded-lg">
                    <strong className="text-accent">Support Agent:</strong> I'd be happy to help! Can you tell me if you're seeing any specific error messages?
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-primary/20">
                <div className="flex space-x-2">
                  <Input placeholder="Type your message..." className="bg-background border-primary/20" />
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Send</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
