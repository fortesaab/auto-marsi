import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type InventoryStatusChartProps = {
  active: number
  draft: number
  sold: number
  archived: number
}

const colors = {
  Active: '#3dd68c',
  Draft: '#6b7280',
  Sold: '#9b7fe8',
  Archived: '#f0605a',
}

function InventoryStatusChart({
  active,
  draft,
  sold,
  archived,
}: InventoryStatusChartProps) {
  const data = [
    { name: 'Active', value: active },
    { name: 'Draft', value: draft },
    { name: 'Sold', value: sold },
    { name: 'Archived', value: archived },
  ]
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="grid items-center gap-2 p-4 sm:grid-cols-[160px_1fr]">
      <div className="h-40">
        {total === 0 ? (
          <div className="grid h-full place-items-center">
            <div className="grid size-28 place-items-center rounded-full border-8 border-muted text-center">
              <span className="text-xs text-muted-foreground">
                No inventory
              </span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={46}
                outerRadius={66}
                strokeWidth={0}
              >
                {data.map((item) => (
                  <Cell
                    key={item.name}
                    fill={colors[item.name as keyof typeof colors]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#1c2230',
                  border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: 6,
                  color: '#e8ecf2',
                  fontSize: 12,
                }}
                itemStyle={{ color: '#e8ecf2' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid gap-2">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-xs"
          >
            <span className="flex items-center gap-2 text-muted-foreground">
              <span
                className="size-2 rounded-full"
                style={{
                  background: colors[item.name as keyof typeof colors],
                }}
              />
              {item.name}
            </span>
            <span className="font-semibold tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InventoryStatusChart
