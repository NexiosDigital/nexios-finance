// src/app/dashboard-test/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'

export default function DashboardTestPage() {
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSessionInfo(data)
    }
    
    checkSession()
  }, [])
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Teste</h1>
      <p>Esta página não requer autenticação e mostra os dados da sessão</p>
      
      <pre className="bg-gray-800 p-4 rounded mt-4 overflow-auto">
        {JSON.stringify(sessionInfo, null, 2)}
      </pre>
      
      <div className="mt-4">
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          Ir para o Dashboard Real
        </button>
      </div>
    </div>
  )
}