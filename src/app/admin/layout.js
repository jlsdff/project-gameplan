import React from 'react'
import AdminProvider from '@/providers/adminProvider'

export default function AdminLayout({children}) {
  return (
    <>
    <AdminProvider>{children}</AdminProvider>
    </>
  )
}
