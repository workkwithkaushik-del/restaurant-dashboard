import { useEffect } from 'react';
import { toast } from 'sonner';

export function useWebSocketSimulation(role) {
  useEffect(() => {
    // Only simulate live orders/alerts if we are not in the strategy view (keep strategy calm)
    if (role === 'strategy') return;

    const ticketInterval = setInterval(() => {
      // 30% chance to receive a live order every 15 seconds
      if (Math.random() > 0.7) {
        const id = Math.floor(1000 + Math.random() * 9000);
        const channels = ["Delivery", "Dine-in", "Takeaway"];
        const randomChannel = channels[Math.floor(Math.random() * channels.length)];
        
        toast.message(`New ${randomChannel} Order!`, {
          description: `Order AL-${id} just arrived in the kitchen queue.`,
          duration: 5000,
        });
      }
    }, 15000);

    const alertInterval = setInterval(() => {
      // 10% chance to receive a critical alert every 30 seconds
      if (Math.random() > 0.9) {
        toast.error('System Alert: Fridge Temperature Warning', {
          description: 'Walk-in fridge #2 at Central Square is above optimal limits.',
          duration: 10000,
        });
      }
    }, 30000);

    return () => {
      clearInterval(ticketInterval);
      clearInterval(alertInterval);
    };
  }, [role]);
}
