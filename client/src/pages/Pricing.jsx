import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useState } from 'react'

function Pricing() {
  const navigate = useNavigate()
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount);
      setPaying(true);

    } catch (error) {
      console.error("Error occurred while processing payment:", error);
    }
  }
  return (
    <div className='min-h-screen bg-[#F7F4FC] font-[Inter] px-6 py-10 relative'>
      <button onClick={() => navigate("/")} className='flex items-center gap-2 text-[#6B647F] hover:text-[#372F52] mb-6'>
        Back
      </button>

      <motion.div initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 ">
        <h1 className="text-3xl font-bold font-[Poppins] text-[#372F52]">Buy Credits</h1>
        <p className="text-[#6B647F] mt-2">Choose the perfect plan for your needs.</p>
      </motion.div>

      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>

        <PricingCard
          title="Starter"
          price="Rs. 100"
          amount={100}
          credits="50 Credits"
          description="Perfect for quick revisions"
          features={["Generate AI notes",
            "Exam-focused answers",
            "Diagram & charts support",
            "Fast generation"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount} />

        <PricingCard
          title="Popular"
          price="Rs. 250"
          amount={250}
          credits="150 Credits"
          description="Best for regular users"
          features={["All Starter features",
            "Priority support",
            "Extended usage limits",
            "Access to premium features"
          ]}
          popular={true}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount} />

        <PricingCard
          title="Pro"
          price="Rs. 500"
          amount={500}
          credits="300 Credits"
          description="Perfect for power users"
          features={["All Popular features",
            "Exclusive content access",
            "Advanced analytics",
            "Personalized recommendations"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount} />

      </div>

    </div>
  )
}
function PricingCard({ title, price, amount, credits, description, features, popular, selectedPrice, setSelectedPrice, onBuy, paying, payingAmount }) {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;
  return (
    <motion.div
      onClick={() => setSelectedPrice(amount)}
      whileHover={{ y: -4 }}
      className={`relative cursor-pointer
      rounded-2xl p-6 bg-[#FBF9F6]
      border transition
      ${isSelected
          ? "border-[#A79CD6]"
          : popular
            ? "border-[#B9AEE0]"
            : "border-[#E4DEF3]"}
    `}>
      {popular && !isSelected &&
        <span className='absolute top-4 right-4 text-xs px-2 py-1 rounded bg-[#F6DDE8] text-[#372F52]'>Popular</span>
      }
      {isSelected &&
        <span className='absolute top-4 right-4 text-xs px-2 py-1 rounded bg-[#B9AEE0] text-[#372F52]'>Selected</span>
      }
      <h2 className='text-xl font-semibold font-[Poppins] text-[#372F52]'>{title}</h2>
      <p className='text-sm text-[#6B647F] mt-1'>{description}</p>

      <div className='mt-4'>
        <p className='text-3xl font-bold text-[#372F52]'>{price}</p>
        <p className='text-sm text-[#A79CD6]'>{credits}</p>
      </div>

      <button
        disabled={isPayingThisCard}
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount);
        }}
        className={`w-full mt-5 py-2 
        rounded-xl font-medium transition
        ${isPayingThisCard
            ? "bg-[#E4DEF3] cursor-not-allowed text-[#6B647F]"
            : isSelected
              ? "bg-[#A79CD6] text-[#372F52]"
              : "bg-[#B9AEE0] text-[#372F52] hover:bg-[#A79CD6]"}`}
      >
        {isPayingThisCard ? "Redirecting..." : "Buy Now"}
      </button>

      <ul className='mt-5 space-y-2 text-sm text-[#6B647F]'>
        {features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-[#7FA870]">✓</span>
            {f}
          </li>
        ))}
      </ul>

    </motion.div>
  )
}
export default Pricing