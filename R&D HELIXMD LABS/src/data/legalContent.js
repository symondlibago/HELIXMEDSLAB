/**
 * Policy copy, transcribed verbatim from "HelixMD Labs - updated policies.pdf".
 *
 * Do not paraphrase this text — it is legal copy supplied by the client.
 * Square-bracket placeholders ([X years], [10], [State], the arbitration
 * clause) are still unresolved in the source document and are reproduced as-is
 * so they stay visible until counsel fills them in. The one exception is
 * "[support email]", which the same document resolves to the address below in
 * each of its Contact Us sections.
 */

export const LEGAL_LAST_UPDATED = "July 31, 2026";
export const SUPPORT_EMAIL = "support@helixmdlabs.com";

export const POLICIES = [
  {
    id: "privacy",
    title: "Privacy Policy",
    summary:
      "How we collect, use, disclose and protect your information.",
    intro:
      'HelixMD Labs ("HelixMD Labs," "we," "us," or "our") values your privacy. This Privacy Policy describes how we collect, use, disclose, and protect information when you visit our website, create an account, place an order, or otherwise interact with us. This policy applies to all visitors, including individual consumers, licensed healthcare professionals, researchers, and business/wholesale customers. By using our site, you agree to this policy.',
    sections: [
      {
        heading: "1. Information We Collect",
        body: "We collect information you provide directly, such as your name, email, phone number, shipping and billing address, payment details (processed through our payment processor), order history, and any professional or research credentials you submit if you order as a licensed provider or institution. If you apply for a business or wholesale account, we may collect your company name and tax identification information. We also collect information automatically, including IP address, browser and device type, and site usage data through cookies and analytics tools, and we may receive information from third parties such as payment processors, shipping carriers, and identity/credential verification services.",
      },
      {
        heading: "2. How We Use Information",
        body: "We use this information to create and manage accounts, verify credentials where applicable, process and fulfill orders, provide customer support, communicate order and shipping updates, prevent fraud, comply with legal and regulatory obligations, and, with your consent where required, send marketing communications.",
      },
      {
        heading: "3. How We Share Information",
        body: "We do not sell your personal information. We share data with service providers who help us operate (payment processing, shipping, hosting, email, analytics), when required by law or legal process, in connection with a business transfer such as a merger or acquisition, with your consent, or in aggregated/de-identified form.",
      },
      {
        heading: "4. Data Retention",
        body: "We retain account and order records for as long as needed to fulfill orders, meet tax and accounting obligations, and resolve disputes, and generally for a period of [X years] after your last transaction unless a longer period is required by law.",
      },
      {
        heading: "5. Data Security",
        body: "We use reasonable administrative, technical, and physical safeguards to protect your information, including encryption in transit. No method of transmission or storage is completely secure, and you're responsible for safeguarding your account credentials.",
      },
      {
        heading: "6. Cookies and Tracking",
        body: 'We use essential, analytics, functional, and (if applicable) marketing cookies. You can control cookies through your browser settings, though disabling some may limit site functionality. We do not currently respond to browser "Do Not Track" signals.',
      },
      {
        heading: "7. Your Rights and Choices",
        body: `You may access, update, or request deletion of your account information, and opt out of marketing emails at any time, by contacting us at ${SUPPORT_EMAIL}.`,
      },
      {
        heading: "8. California Privacy Rights (CCPA/CPRA)",
        body: `If you're a California resident, you have the right to know what personal information we collect and why, request deletion (subject to legal exceptions), request correction of inaccurate information, and not be discriminated against for exercising these rights. HelixMD Labs does not sell personal information or share it for cross-context behavioral advertising. To exercise these rights, contact us at ${SUPPORT_EMAIL}; we will verify your request and respond within 45 days as required by law.`,
      },
      {
        heading: "9. Children's Privacy",
        body: "Our site is not directed to individuals under 18, and we do not knowingly collect information from minors.",
      },
      {
        heading: "10. Third-Party Links and Platform",
        body: "Our site may link to third-party sites we don't control, and may be hosted on a third-party e-commerce platform that processes data on our behalf under its own privacy terms.",
      },
      {
        heading: "11. Changes to This Policy",
        body: "We may update this policy periodically and will post the revised version with a new effective date.",
      },
      {
        heading: "12. Contact Us",
        body: `HelixMD Labs, Email: ${SUPPORT_EMAIL}`,
      },
    ],
  },

  {
    id: "refunds",
    title: "Refund and Order Resolution Policy",
    summary: "Fulfillment issues, the 30-day guarantee and cancellations.",
    sections: [
      {
        heading: "Overview",
        body: "HelixMD Labs supplies compounded peptides to consumers, licensed healthcare professionals, researchers, and business customers. Because of the nature of our products, we maintain a focused refund policy centered on order fulfillment accuracy rather than general returns.",
      },
      {
        heading: "General Policy",
        body: "Refunds are issued only where there has been a fulfillment issue on our part, meaning your order arrived damaged, incorrect, incomplete, or was not delivered. We do not offer refunds for change of mind, ordering mistakes by the customer, or products that have been opened or used, except as covered under the 30-Day Product Guarantee below.",
      },
      {
        heading: "30-Day Product Guarantee",
        body: `All eligible orders are covered by our 30-day product guarantee. If you experience a covered issue within 30 days of delivery, contact us at ${SUPPORT_EMAIL} with your order number and a description of the issue so we can evaluate eligibility and next steps (replacement or refund, at our discretion).`,
      },
      {
        heading: "Reporting a Fulfillment Issue",
        body: `If your order arrives damaged, incorrect, or incomplete, notify us at ${SUPPORT_EMAIL} within 2 days of delivery, including your order number, a description of the issue, and photos where applicable. We'll review the claim and provide a resolution, which may include a replacement or refund to your original payment method.`,
      },
      {
        heading: "Non-Delivery",
        body: "If tracking shows your order as delivered but you did not receive it, or if a shipment is lost in transit, contact us promptly so we can investigate with the carrier and determine an appropriate resolution.",
      },
      {
        heading: "Order Cancellations",
        body: `Orders may be canceled only prior to shipment. Once an order has been processed for fulfillment, it cannot be modified or canceled. Contact ${SUPPORT_EMAIL} as soon as possible if you need to cancel.`,
      },
      {
        heading: "Processing Time",
        body: "Approved refunds are issued to your original payment method within [10] business days, though your bank may take additional time to post the funds.",
      },
      {
        heading: "Storage and Handling After Delivery",
        body: "Peptides require proper storage after delivery. We are not responsible for degradation resulting from improper storage, handling, or use after the product has been delivered.",
      },
      {
        heading: "Contact Us",
        body: `HelixMD Labs, email: ${SUPPORT_EMAIL}`,
      },
    ],
  },

  {
    id: "shipping",
    title: "Shipping and Distribution Policy",
    summary: "Processing times, courier service and delivery issues.",
    sections: [
      {
        heading: "Overview",
        body: "HelixMD Labs ships compounded peptide products within the United States. Orders are processed on business days and shipped via a priority 2-day courier service to help maintain product integrity during transit.",
      },
      {
        heading: "Order Processing",
        body: "Orders are processed on business days only. Orders placed on weekends or holidays will begin processing on the next business day.",
      },
      {
        heading: "Shipping Method and Timing",
        body: "All domestic orders ship via priority 2-day courier service. Once your order leaves our facility, you'll receive an emailed tracking confirmation so you can follow delivery progress.",
      },
      {
        heading: "International Shipping",
        body: "We currently ship only within the United States and do not offer international shipping.",
      },
      {
        heading: "Delivery Issues",
        body: `If tracking indicates your package was delivered but you can't locate it, please check with neighbors/your building and contact the carrier directly, and reach out to us at ${SUPPORT_EMAIL} if you need further assistance.`,
      },
      {
        heading: "Storage Upon Receipt",
        body: "Please store your product according to the instructions included with your order immediately upon delivery to preserve product quality.",
      },
      {
        heading: "Contact Us",
        body: `HelixMD Labs, email: ${SUPPORT_EMAIL}`,
      },
    ],
  },

  {
    id: "terms",
    title: "Terms of Service",
    summary: "The agreement governing use of this site and our products.",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: 'By accessing or using the HelixMD Labs website ("Site") or purchasing our products, you agree to be bound by these Terms and our Privacy Policy. If you don\'t agree, please don\'t use the Site.',
      },
      {
        heading: "2. Who Can Use the Site",
        body: "Our products are available to general consumers, licensed healthcare professionals, researchers, and business/wholesale customers, each subject to any additional eligibility or credentialing requirements we may require for certain product lines or order types.",
      },
      {
        heading: "3. No Medical Advice",
        body: "Information on the Site is for general informational purposes only and is not medical, clinical, or treatment advice. Nothing on the Site should be construed as a recommendation regarding the appropriateness of any product for a particular person's use. Customers are responsible for understanding applicable laws governing their purchase, possession, and use of our products in their jurisdiction.",
      },
      {
        heading: "4. Accounts",
        body: "You must be at least 18 years old to create an account or place an order. You're responsible for maintaining the confidentiality of your account credentials and for all activity under your account, and for providing accurate registration and credentialing information where applicable.",
      },
      {
        heading: "5. Acceptable Use",
        body: "You agree not to misrepresent your identity or credentials, use automated tools to scrape or access the Site without authorization, interfere with Site operations, or use the Site for any unlawful purpose.",
      },
      {
        heading: "6. Intellectual Property",
        body: "All content on the Site — including text, graphics, logos, and product information — is owned by HelixMD Labs or its licensors and protected by applicable intellectual property laws. You're granted a limited, non-exclusive, revocable license to use the Site for its intended purpose; you may not copy, modify, or redistribute Site content without our permission.",
      },
      {
        heading: "7. Product Information",
        body: "We aim to provide accurate product descriptions but do not warrant that all content is complete or error-free. Prices and availability are subject to change without notice.",
      },
      {
        heading: "8. Disclaimers",
        body: 'THE SITE AND OUR CONTENT ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, TO THE MAXIMUM EXTENT PERMITTED BY LAW.',
      },
      {
        heading: "9. Limitation of Liability",
        body: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, HELIXMD LABS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SITE OR PRODUCTS, AND OUR TOTAL LIABILITY WILL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM.",
      },
      {
        heading: "10. Indemnification",
        body: "You agree to indemnify and hold HelixMD Labs harmless from claims arising out of your misuse of the Site, violation of these Terms, or violation of applicable law.",
      },
      {
        heading: "11. Governing Law and Disputes",
        body: "These Terms are governed by the laws of [State], and disputes will be resolved as described in [arbitration/venue clause — to be finalized with counsel].",
      },
      {
        heading: "12. Termination",
        body: "We may suspend or terminate your access to the Site at any time for violation of these Terms or other reasonable cause.",
      },
      {
        heading: "13. Changes to Terms",
        body: "We may update these Terms periodically; continued use of the Site after changes constitutes acceptance.",
      },
      {
        heading: "14. Contact Us",
        body: `HelixMD Labs, email: ${SUPPORT_EMAIL}`,
      },
    ],
  },
];
