import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useState } from 'react'
import { LuCheck } from 'react-icons/lu'

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
    <div className='min-h-screen bg-ds-page font-body px-6 py-12 lg:py-20 relative'>
      <button onClick={() => navigate("/")} className='absolute top-8 left-8 flex items-center gap-2 text-ds-text-sec hover:text-ds-accent transition-colors font-medium text-sm'>
        &larr; Back to Home
      </button>

      <motion.div initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 max-w-2xl mx-auto mt-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold font-display text-ds-text mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-ds-text-sec">Choose the perfect plan for your learning needs. No hidden fees.</p>
      </motion.div>

      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
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
  
  // Highlight the card if it's explicitly selected OR if it's the popular one (and nothing else is selected)
  const isHighlighted = isSelected || (popular && !selectedPrice);
  
  return (
    <motion.div
      onClick={() => setSelectedPrice(amount)}
      whileHover={{ y: -6 }}
      className={`relative cursor-pointer
      rounded-[24px] p-8 bg-ds-surface
      transition-all duration-300
      ${popular ? 'md:scale-105 z-10 shadow-2xl border-2 border-ds-accent' : 'shadow-lg border border-ds-border'}
      ${isSelected && !popular ? 'border-ds-border-focus ring-4 ring-ds-border-focus/10 shadow-2xl scale-[1.02] z-20' : ''}
    `}>
      {popular && 
        <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
          <span className='text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-ds-accent text-white shadow-md'>
            Most Popular
          </span>
        </div>
      }
      {isSelected && !popular &&
        <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
          <span className='text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-ds-border-focus text-white shadow-md'>
            Selected
          </span>
        </div>
      }
      
      <div className="text-center mt-2">
        <h2 className='text-2xl font-bold font-heading text-ds-text'>{title}</h2>
        <p className='text-sm text-ds-text-sec mt-2 h-10'>{description}</p>
      </div>

      <div className='mt-6 text-center border-b border-ds-border pb-8'>
        <p className='text-4xl lg:text-5xl font-extrabold font-display text-ds-text'>{price}</p>
        <p className='text-sm font-semibold text-ds-accent mt-2'>{credits}</p>
      </div>

      <ul className='mt-8 space-y-4 text-sm text-ds-text-sec'>
        {features.map((f, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="text-ds-accent mt-0.5"><LuCheck size={18} /></span>
            <span className="leading-tight">{f}</span>
          </li>
        ))}
      </ul>

      <button
        disabled={isPayingThisCard}
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount);
        }}
        className={`w-full mt-10 py-3.5 
        rounded-full font-semibold font-heading text-base transition-all
        ${isPayingThisCard
            ? "bg-ds-section cursor-not-allowed text-ds-text-muted border border-ds-border"
            : isHighlighted
              ? "text-white hover:opacity-90"
              : "bg-ds-btn-sec-bg text-ds-btn-sec-text hover:bg-ds-btn-sec-hover"}`}
        style={(!isPayingThisCard && isHighlighted) ? { background: 'linear-gradient(135deg, #3B5FE3 0%, #5B7FFF 100%)', boxShadow: '0 4px 20px 0 rgba(59,95,227,0.35)' } : {}}
      >
        {isPayingThisCard ? "Processing..." : "Select Plan"}
      </button>

    </motion.div>
  )
}

export default Pricing