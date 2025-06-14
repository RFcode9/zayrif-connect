
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import PCManager from '@/components/PCManager';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Show empty state for new users
  const [rentalHistory] = useState([]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="font-heading text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">{user.name}</span>
              </h1>
              <p className="text-muted-foreground">Manage your cloud PCs and rental history</p>
            </div>
            <Button 
              className="tech-button text-foreground mt-4 md:mt-0"
              onClick={() => navigate('/customize')}
            >
              + New PC Configuration
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-effect border-border/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">2</div>
                <div className="text-sm text-muted-foreground">Active PCs</div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-border/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">24.5h</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-border/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">₹38,750</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-border/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">99.8%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Rentals - Now using PCManager */}
            <Card className="glass-effect border-border/20">
              <CardHeader>
                <CardTitle className="text-accent">YOUR PC'S</CardTitle>
              </CardHeader>
              <CardContent>
                <PCManager />
              </CardContent>
            </Card>

            {/* Rental History */}
            <Card className="glass-effect border-border/20">
              <CardHeader>
                <CardTitle className="text-accent">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rentalHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground">No recent activity</div>
                  </div>
                ) : (
                  <>
                    {rentalHistory.map((rental) => (
                      <div key={rental.id} className="p-4 border border-border/20 rounded-lg tech-button">
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
                    <Button variant="outline" className="w-full border-border/20 hover:border-accent/50">
                      View Full History
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="glass-effect border-border/20 mt-8">
            <CardHeader>
              <CardTitle className="text-accent">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="border-border/20 hover:border-accent/50 h-16 flex flex-col tech-button"
                  onClick={() => navigate('/customize')}
                >
                  <span className="text-2xl mb-1">🎮</span>
                  <span>Gaming PC</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border/20 hover:border-accent/50 h-16 flex flex-col tech-button"
                  onClick={() => navigate('/customize')}
                >
                  <span className="text-2xl mb-1">🎬</span>
                  <span>Video Editing</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border/20 hover:border-accent/50 h-16 flex flex-col tech-button"
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
