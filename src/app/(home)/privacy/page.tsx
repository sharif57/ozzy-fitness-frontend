export default function PrivacyPolicy() {
    return (
      <div className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
        <div className="space-y-6  pr-4">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
              website or services.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Personal information (e.g., name, email address, phone number)</li>
              <li>Account information</li>
              <li>Payment information</li>
              <li>Communication data</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Providing and maintaining our services</li>
              <li>Improving our services</li>
              <li>Communicating with you</li>
              <li>Analyzing usage of our services</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Sharing of Your Information</h2>
            <p>We may share your information with third parties in certain situations, such as:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and interests</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from
              unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
            <p>
              You have certain rights regarding your personal information, including the right to access, correct, or
              delete your data. To exercise these rights, please contact us using the information provided below.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the Last updated date.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">
              Email: privacy@example.com
              <br />
              Address: 123 Privacy Street, Anytown, AN 12345
            </p>
          </section>
  
          <p className="text-sm text-gray-500 mt-6">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    )
  }
  
  