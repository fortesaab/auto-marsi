export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

type CalculateMonthlyPaymentParams = {
  vehiclePrice: number
  downPayment: number
  months: number
  annualRate: number
}

export function calculateMonthlyPayment({
  vehiclePrice,
  downPayment,
  months,
  annualRate,
}: CalculateMonthlyPaymentParams): number {
  const principal = Math.max(vehiclePrice - downPayment, 0)

  if (principal === 0 || months <= 0) {
    return 0
  }

  const monthlyRate = annualRate / 100 / 12

  if (monthlyRate === 0) {
    return principal / months
  }

  return (
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -months))
  )
}
