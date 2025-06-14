// Mock API service to simulate backend functionality
export interface PCConfiguration {
  id: string;
  name: string;
  useCase: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  resolution: string;
  duration: string;
  hourlyRate: number;
  status: 'available' | 'deploying' | 'running' | 'stopped';
  deployedAt?: string;
  expiresAt?: string;
  anydeskId?: string;
  anydeskPassword?: string;
}

export interface PaymentSession {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  pcConfigId: string;
  sessionUrl: string;
}

class MockApiService {
  private rentals: PCConfiguration[] = [];
  private paymentSessions: PaymentSession[] = [];

  // Generate AnyDesk credentials
  private generateAnydeskCredentials() {
    const anydeskId = Math.floor(100000000 + Math.random() * 900000000).toString();
    const anydeskPassword = Math.random().toString(36).substring(2, 10);
    return { anydeskId, anydeskPassword };
  }

  // Simulate PC deployment
  async deployPC(config: Omit<PCConfiguration, 'id' | 'status'>): Promise<PCConfiguration> {
    const anydeskCredentials = this.generateAnydeskCredentials();
    
    const deployedPC: PCConfiguration = {
      ...config,
      id: `pc-${Date.now()}`,
      status: 'deploying',
      deployedAt: new Date().toISOString(),
      expiresAt: this.calculateExpiryTime(config.duration),
      ...anydeskCredentials
    };

    this.rentals.push(deployedPC);

    // Simulate deployment time
    setTimeout(() => {
      deployedPC.status = 'running';
    }, 3000);

    return deployedPC;
  }

  async getUserRentals(): Promise<PCConfiguration[]> {
    return this.rentals;
  }

  async togglePC(pcId: string): Promise<PCConfiguration | null> {
    const pc = this.rentals.find(r => r.id === pcId);
    if (!pc) return null;

    pc.status = pc.status === 'running' ? 'stopped' : 'running';
    return pc;
  }

  async createPaymentSession(pcConfig: PCConfiguration): Promise<PaymentSession> {
    const session: PaymentSession = {
      id: `sess_${Date.now()}`,
      amount: this.calculateTotalCost(pcConfig),
      currency: 'usd',
      status: 'pending',
      pcConfigId: pcConfig.id,
      sessionUrl: `https://checkout.stripe.com/pay/mock-session-${Date.now()}`
    };

    this.paymentSessions.push(session);
    return session;
  }

  async completePayment(sessionId: string): Promise<PaymentSession | null> {
    const session = this.paymentSessions.find(s => s.id === sessionId);
    if (!session) return null;

    session.status = 'completed';
    return session;
  }

  private calculateExpiryTime(duration: string): string {
    const now = new Date();
    const hours = parseInt(duration.split(' ')[0]) || 1;
    now.setHours(now.getHours() + hours);
    return now.toISOString();
  }

  private calculateTotalCost(config: PCConfiguration): number {
    const hours = parseInt(config.duration.split(' ')[0]) || 1;
    return config.hourlyRate * hours * 100; // Convert to cents
  }
}

export const mockApi = new MockApiService();
