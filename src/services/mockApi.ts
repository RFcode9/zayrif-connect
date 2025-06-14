
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

  // Simulate PC deployment
  async deployPC(config: Omit<PCConfiguration, 'id' | 'status'>): Promise<PCConfiguration> {
    const deployedPC: PCConfiguration = {
      ...config,
      id: `pc-${Date.now()}`,
      status: 'deploying',
      deployedAt: new Date().toISOString(),
      expiresAt: this.calculateExpiryTime(config.duration)
    };

    this.rentals.push(deployedPC);

    // Simulate deployment time
    setTimeout(() => {
      deployedPC.status = 'running';
    }, 3000);

    return deployedPC;
  }

  // Get all user rentals
  async getUserRentals(): Promise<PCConfiguration[]> {
    return this.rentals;
  }

  // Start/Stop PC
  async togglePC(pcId: string): Promise<PCConfiguration | null> {
    const pc = this.rentals.find(r => r.id === pcId);
    if (!pc) return null;

    pc.status = pc.status === 'running' ? 'stopped' : 'running';
    return pc;
  }

  // Create Stripe payment session (mock)
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

  // Simulate payment completion
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
