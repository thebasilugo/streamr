import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" className="mb-4">
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-400">Last updated: March 29, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to StreamR. These Terms of Service govern your use of our website and services. By accessing or
              using StreamR, you agree to be bound by these Terms.
            </p>

            <h2>2. Definitions</h2>
            <p>
              "Service" refers to the StreamR website and platform. "User" refers to any individual who accesses or uses
              the Service. "Content" refers to all movies, series, and other media available on the Service.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To access certain features of the Service, you must register for an account. You agree to provide accurate
              information during the registration process and to keep your account credentials secure. You are
              responsible for all activities that occur under your account.
            </p>

            <h2>4. Content Usage</h2>
            <p>
              All Content available on StreamR is protected by copyright and other intellectual property laws. Users may
              stream Content for personal, non-commercial use only. Downloading Content is permitted only where
              explicitly allowed and for personal use only. Redistribution, reproduction, or public display of any
              Content is strictly prohibited.
            </p>

            <h2>5. User Conduct</h2>
            <p>
              Users agree not to: - Use the Service for any illegal purpose - Attempt to gain unauthorized access to any
              part of the Service - Use automated means to access or collect data from the Service - Post false,
              misleading, or offensive content in reviews or comments - Harass or harm other users
            </p>

            <h2>6. Termination</h2>
            <p>
              StreamR reserves the right to terminate or suspend your account at any time for violations of these Terms
              or for any other reason. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h2>7. Disclaimers</h2>
            <p>
              The Service is provided "as is" without warranties of any kind. StreamR does not guarantee that the
              Service will be uninterrupted or error-free.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              StreamR shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use of or inability to use the Service.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              StreamR reserves the right to modify these Terms at any time. We will provide notice of significant
              changes. Your continued use of the Service after such modifications constitutes your acceptance of the
              updated Terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
              StreamR operates, without regard to its conflict of law provisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

