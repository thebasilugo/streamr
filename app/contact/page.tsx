"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, this would send the form data to your API
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/">
            <Button variant="outline" className="mb-8">
              Back to Home
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-400">Have a question, suggestion, or need help? We'd love to hear from you.</p>
          </div>

          {isSubmitted ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Thank You!</CardTitle>
                <CardDescription className="text-gray-400">Your message has been sent successfully.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We've received your message and will get back to you as soon as possible.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setIsSubmitted(false)} className="bg-teal-600 hover:bg-teal-700">
                  Send Another Message
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill out the form below and we'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject} required>
                      <SelectTrigger id="subject" className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="min-h-32 bg-zinc-800 border-zinc-700"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-400">support@streamr.com</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
              <p className="text-gray-400">Monday - Friday, 9am - 5pm EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

