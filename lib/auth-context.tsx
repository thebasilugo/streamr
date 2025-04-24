"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the token with your API
        const storedUser = localStorage.getItem("streamr_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, this would call your API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock successful login
        if (email === "user@example.com" && password === "password") {
          const mockUser = {
            id: "1",
            name: "Test User",
            email: "user@example.com",
          }
          setUser(mockUser)
          localStorage.setItem("streamr_user", JSON.stringify(mockUser))
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would call your API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: "1",
          name,
          email,
        }
        setUser(mockUser)
        localStorage.setItem("streamr_user", JSON.stringify(mockUser))
        resolve()
      }, 1000)
    })
  }

  const logout = async () => {
    // In a real app, this would call your API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(null)
        localStorage.removeItem("streamr_user")
        resolve()
      }, 500)
    })
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

