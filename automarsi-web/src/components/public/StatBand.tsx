import type { ReactNode } from 'react'

type StatBandItem = {
  value: string
  label: string
  icon?: ReactNode
}

type StatBandProps = {
  items: StatBandItem[]
}

function StatBand({ items }: StatBandProps) {
  return (
    <section className="rounded-lg bg-slate-950 px-5 py-6 text-white">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            {item.icon ? (
              <div className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-red-400">
                {item.icon}
              </div>
            ) : null}
            <div>
              <p className="text-xl font-semibold">{item.value}</p>
              <p className="text-xs text-slate-400">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatBand
