import { useEffect, useState } from 'react'
import { getAllRecords } from './prisma'

// Recordの型定義
type Record = {
  id: string
  title: string
  time: number
  created_at: Date
}

function App() {
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true)
        const data = await getAllRecords()
        setRecords(data)
        setError(null)
      } catch (err) {
        console.error('レコードの取得中にエラーが発生しました:', err)
        setError('データの取得中にエラーが発生しました')
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">レコード一覧</h1>

      {loading && <p>データを読み込み中...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && records.length === 0 && (
        <p>レコードが見つかりませんでした。</p>
      )}

      {records.length > 0 && (
        <div className="grid gap-4">
          {records.map((record) => (
            <div key={record.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{record.title}</h2>
              {record.time && <p>時間: {record.time}</p>}
              <p className="text-sm text-gray-500">
                作成日時: {new Date(record.created_at).toLocaleString('ja-JP')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
