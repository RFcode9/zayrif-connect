
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import PCManager from '@/components/PCManager';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [rentalHistory] = useState([
    {
      id: 3,
      name: "AI Workstation",
      date: "2024-01-10",
      duration: "4h 30m",
      cost: "$67.50"
    },
    {
      id: 4,
      name: "3D Rendering Beast",
      date: "2024-01-08", 
      duration: "8h 15m",
      cost: "$165.00"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="font-heading text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">Alex</span>
              </h1>
              <p className="text-muted-foreground">Manage your cloud PCs and rental history</p>
            </div>
            <Button 
              className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4 md:mt-0"
              onClick={() => navigate('/customize')}
            >
              + New PC Configuration
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">2</div>
                <div className="text-sm text-muted-foreground">Active PCs</div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">24.5h</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">$485</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">99.8%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Rentals - Now using PCManager */}
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-accent">Active Cloud PCs</CardTitle>
              </CardHeader>
              <CardContent>
                <PCManager />
              </CardContent>
            </Card>

            {/* Rental History */}
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-accent">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rentalHistory.map((rental) => (
                  <div key={rental.id} className="p-4 border border-primary/20 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">{rental.name}</h3>
                      <span className="text-sm font-semibold text-accent">{rental.cost}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{rental.date}</span>
                      <span>{rental.duration}</span>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full border-primary/20 hover:border-accent/50">
                  View Full History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="glass-effect border-primary/20 mt-8">
            <CardHeader>
              <CardTitle className="text-accent">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="border-primary/20 hover:border-accent/50 h-16 flex flex-col"
                  onClick={() => navigate('/customize')}
                >
                  <span className="text-2xl mb-1">🎮</span>
                  <span>Gaming PC</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary/20 hover:border-accent/50 h-16 flex flex-col"
                  onClick={() => navigate('/customize')}
                >
                  <span className="text-2xl mb-1">🎬</span>
                  <span>Video Editing</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary/20 hover:border-accent/50 h-16 flex flex-col"
                  onClick={() => navigate('/customize')}
                >
                  <span className="text-2xl mb-1">🤖</span>
                  <span>AI Workstation</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
