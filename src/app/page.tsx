"use client"

import { useEffect } from "react"
import CardDetails from "./components/CardDetails"
import Price from "./components/Price"

export default function Page() {
  useEffect(() => {
    document.title = "Stripe Checkout Page"
  }, [])

  return (
    <div className="flex min-h-screen w-full sm:flex-1">
      <div className="w-full flex">
        <div className="w-full bg-[#02101E] flex justify-end pr-8">
          <Price />
        </div>
        <div className="w-full overflow-y-auto bg-white">
          <CardDetails />
        </div>
      </div>
    </div>
  )
}

