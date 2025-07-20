import { Navbar } from "@/components/navbar"
import { PaymentSection } from "@/components/payment-section"

const Payment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PaymentSection />
    </div>
  );
};

export default Payment;