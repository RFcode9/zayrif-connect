
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold mb-2">
              Profile <span className="gradient-text">Settings</span>
            </h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <Card className="glass-effect border-border/20">
                <CardHeader>
                  <CardTitle className="text-accent">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-accent text-accent-foreground text-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={user.name}
                        className="bg-background border-border/20"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user.email}
                        className="bg-background border-border/20"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" className="border-border/20">
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="border-border/20">
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Account Actions */}
            <div className="space-y-6">
              <Card className="glass-effect border-border/20">
                <CardHeader>
                  <CardTitle className="text-accent">Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">Premium</div>
                    <div className="text-sm text-muted-foreground">Current Plan</div>
                  </div>
                  <Button variant="outline" className="w-full border-border/20">
                    Upgrade Plan
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={logout}
                  >
                    Sign Out
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border/20">
                <CardHeader>
                  <CardTitle className="text-accent">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active PCs:</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Usage:</span>
                    <span className="font-semibold">124.5h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Month:</span>
                    <span className="font-semibold">₹38,750</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
