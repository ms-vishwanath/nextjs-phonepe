"use client"
import { Button } from '@/components/ui/button'
import apiClient from '@/lib/apiClient.utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Page() {
  const [amount, setAmount] = useState<number>(2)

  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const INIT_Payment = async () => {
    try {
      setLoading(true)
      const response = await apiClient.post(`/payment`, {
        amount, uid: "askdh-asdsadasd-fbvddfgdf-sdfdsffd"
      })

      window.location.href = response.data.redirectUrl
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='absolute bottom-0 right-0 text-xs p-4'>
        <h1>Phonepe Payment Gateway NextJS Template</h1>
      </div>
      <div className='flex h-dvh flex-col justify-center items-center'>
        <div className=''>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => {
              INIT_Payment()
            }} disabled={loading}>
              {
                !loading ? `Pay ${amount}` : 'Loading..'
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
