import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from './provider'
import NavBar from '@/components/navbar/NavBar'
import Modal from '@/components/Modal/Modal'

export const metadata: Metadata = {
  title: 'Dev Plan Pro',
  description: 'CPSC597_Final_Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">
        <AuthProvider>
          <NavBar/>
          {children}
          <Modal/>
        </AuthProvider>
      </body>
    </html>
  );
}
