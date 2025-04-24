import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: March 29, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              At StreamR, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our service.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our Service, including:</p>
            <ul>
              <li>Personal information such as name, email address, and payment information</li>
              <li>Usage data including viewing history, ratings, and reviews</li>
              <li>Device information such as IP address, browser type, and operating system</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and send related information</li>
              <li>Personalize your experience and deliver content relevant to your interests</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our Service</li>
            </ul>

            <h2>4. Disclosure of Your Information</h2>
            <p>We may disclose your personal information:</p>
            <ul>
              <li>To comply with legal obligations</li>
              <li>To protect and defend our rights and property</li>
              <li>To service providers who perform services on our behalf</li>
              <li>With your consent or at your direction</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of
              transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>

            <h2>6. Your Choices</h2>
            <p>
              You can access, update, or delete your account information at any time through your account settings. You
              can also opt-out of receiving promotional emails by following the unsubscribe instructions in those
              emails.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years of age, and we do not knowingly collect personal
              information from children under 13.
            </p>

            <h2>8. Changes to Our Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@streamr.com.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

