
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Customize', path: '/customize' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Support', path: '/support' },
  ];

  const authenticatedNavItems = [
    ...navItems,
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const currentNavItems = isAuthenticated ? authenticatedNavItems : navItems;

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div 
              className="font-heading font-bold text-2xl gradient-text cursor-pointer"
              onClick={() => navigate('/')}
            >
              ZAYRIF CONNECT
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {currentNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-accent bg-accent/20'
                      : 'text-foreground hover:text-accent hover:bg-accent/10'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost"
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 hover:bg-accent/10"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{user?.name}</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border text-foreground hover:bg-destructive hover:text-destructive-foreground"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  className="tech-button text-foreground"
                  onClick={() => navigate('/login')}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-accent focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 glass-effect">
            {currentNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-accent bg-accent/20'
                    : 'text-foreground hover:text-accent hover:bg-accent/10'
                }`}
              >
                {item.name}
              </button>
            ))}
            {!isAuthenticated && (
              <div className="px-3 py-2 space-y-2">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full"
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  className="tech-button text-foreground w-full"
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
