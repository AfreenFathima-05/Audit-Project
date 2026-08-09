export const siteData = {
  firmName: "Aurilious & Co.",
  tagline: "Clear Numbers. Confident Decisions.",
  contact: {
    address: "Level 42, Financial District Tower\n100 Enterprise Way\nMetropolis, 10001",
    phone: "+1 (555) 019-8234",
    email: "consultations@aurilious.co",
    businessHours: "Monday – Friday, 8:30 AM – 6:00 PM",
  },
  credentials: {
    name: "Aurilious & Co. Advisory Group",
    qualification: "Chartered Accountants",
    certification: "Certified Public Accountants (CPA)",
    experience: "25+ Years",
    philosophy: "We believe that behind every balance sheet is a vision for the future. Our mission is to translate complex financial data into clear, actionable strategies that empower our clients to build sustainable, scalable growth.",
    stats: [
      { label: "Corporate Clients", value: "500+" },
      { label: "Audits Completed", value: "2,500+" },
      { label: "Global Partners", value: "12" },
    ]
  },
  services: [
    {
      id: "01",
      title: "Audit & Assurance",
      description: "Rigorous examination of your financial records to ensure accuracy, transparency, and compliance with statutory requirements.",
      longDescription: "Our Audit & Assurance practice goes far beyond merely ticking boxes. We dive deep into the DNA of your business to understand your operations, risks, and internal controls. By conducting rigorous, independent examinations of your financial statements, we provide stakeholders—from investors to regulatory bodies—with the absolute confidence that your numbers reflect reality. Whether it's a mandatory statutory audit or an internal review to tighten your operations, our seasoned professionals bring an objective, eagle-eyed perspective to protect your business's integrity.",
      deliverables: ["Statutory Audits", "Internal Audits", "Tax Audits", "Due Diligence"],
      image: "/generated_images/audit_assurance_hero_1786286897449.png"
    },
    {
      id: "02",
      title: "Taxation",
      description: "Strategic tax planning and preparation to minimize liability while maintaining strict adherence to current tax regulations.",
      longDescription: "Navigating the labyrinth of modern tax codes requires more than just compliance; it demands proactive strategy. Our Taxation services are designed to legally minimize your tax burden while ensuring you remain completely off the radar for disputes or penalties. We map out your entire corporate structure, cross-border transactions, and capital investments to find optimal tax efficiencies. From filing complex corporate returns to managing high-stakes tax assessments, we act as your formidable shield and strategist in the tax domain.",
      deliverables: ["Corporate Tax Planning", "International Taxation", "Transfer Pricing", "Tax Assessments"],
      image: "/src/assets/11.png"
    },
    {
      id: "03",
      title: "GST Services",
      description: "Comprehensive Goods and Services Tax advisory, including registration, filing, and dispute resolution.",
      longDescription: "Since its inception, GST has dramatically altered the compliance landscape. Our specialized GST wing is entirely dedicated to ensuring your business masters this indirect tax regime without operational friction. We handle the heavy lifting of multi-state registrations, meticulous monthly filings, and maximizing your Input Tax Credit (ITC) so cash isn't needlessly locked up. If disputes or departmental audits arise, our seasoned litigators step in to resolve matters swiftly, minimizing disruption to your daily commerce.",
      deliverables: ["GST Registration & Filings", "Input Tax Credit (ITC) Advisory", "GST Audits", "Litigation Support"],
      image: "/src/assets/12.png"
    },
    {
      id: "04",
      title: "Accounting",
      description: "Meticulous bookkeeping and financial reporting, giving you clear visibility into your day-to-day financial health.",
      longDescription: "Clean, accurate, and real-time accounting is the bedrock of any successful enterprise. We offer end-to-end accounting solutions that transform messy financial records into crystal-clear dashboards. By outsourcing your bookkeeping and payroll to us, you eliminate overhead and gain access to institutional-grade financial reporting. We don't just record history; we provide Management Information Systems (MIS) reporting that highlights trends, flags cash flow bottlenecks, and helps you make confident, data-backed decisions every single day.",
      deliverables: ["Bookkeeping Outsourcing", "Payroll Management", "MIS Reporting", "Financial Statement Prep"],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "05",
      title: "Financial Consulting",
      description: "Expert guidance on mergers, acquisitions, risk management, and long-term financial strategy.",
      longDescription: "When your business is ready for the next massive leap—be it an acquisition, a merger, or a significant capital restructuring—our Financial Consulting team acts as your elite advisory board. We bring decades of Wall Street and corporate finance experience to the table, delivering unvarnished, practical advice. From conducting exhaustive business valuations that uncover hidden assets, to identifying catastrophic blind spots through our risk assessment protocols, we ensure your boldest moves are your safest ones.",
      deliverables: ["M&A Advisory", "Business Valuation", "Risk Assessment", "Capital Restructuring"],
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "06",
      title: "Compliance Advisory",
      description: "Proactive structuring and review to ensure your business remains compliant with evolving regulatory landscapes.",
      longDescription: "Regulatory goalposts are constantly moving, and a single misstep can cost a company its reputation or operating license. Our Compliance Advisory service is a proactive radar system for your business. We meticulously structure your operations to align perfectly with Company Law, FEMA, and industry-specific regulations. Our secretarial services ensure your board meetings, filings, and corporate governance are impeccable, allowing you to focus on growth while we secure your regulatory perimeter.",
      deliverables: ["Company Law Compliance", "FEMA Advisory", "Secretarial Services", "Regulatory Approvals"],
      image: "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?q=80&w=2070&auto=format&fit=crop"
    },
  ],
  industries: [
    {
      name: "Manufacturing",
      description: "Cost auditing, supply chain financial optimization, and capital asset management for large-scale production facilities.",
      image: "/src/assets/13.png",
      caseStudy: {
        client: "Apex Industrial Group",
        challenge: "Apex was experiencing a mysterious 14% bleed in their gross margins despite record sales volume, leading to severe cash flow crunches.",
        solution: "We deployed our senior audit team to conduct a forensic cost audit across their 3 main facilities. We uncovered massive inefficiencies in raw material procurement and obsolete inventory valuation.",
        results: "By restructuring their supply chain financing and adjusting their capital asset depreciation models, we restored margins to 22% and unlocked $3.2M in trapped working capital."
      }
    },
    {
      name: "Retail & E-commerce",
      description: "Inventory valuation, multi-state GST compliance, and cash-flow optimization for high-volume retail operations.",
      image: "/src/assets/14.png",
      caseStudy: {
        client: "Lumina Retail Network",
        challenge: "Managing operations across 12 states, Lumina faced staggering penalties due to misaligned GST filings and a chaotic multi-warehouse inventory system.",
        solution: "We implemented an automated, cloud-based inventory valuation system and centralized their GST compliance. Our team also filed for retroactive Input Tax Credits that had been overlooked.",
        results: "Reclaimed $450,000 in lost tax credits, completely eliminated state penalties, and reduced monthly financial closing time from 15 days to just 3."
      }
    },
    {
      name: "Information Technology",
      description: "R&D tax credits, software capitalization, and international transfer pricing for global tech firms.",
      image: "/src/assets/15.png",
      caseStudy: {
        client: "Nexus Software Solutions",
        challenge: "Expanding operations to Europe and Asia created a tax nightmare. Nexus was facing double taxation and had entirely missed claiming credits for their massive R&D spend.",
        solution: "Our international tax specialists established a robust transfer pricing framework between their global subsidiaries. We simultaneously conducted an R&D audit to classify eligible development hours.",
        results: "Reduced global effective tax rate by 18%, successfully claimed $1.1M in R&D tax credits, and established a legally sound framework for future global expansion."
      }
    },
    {
      name: "Healthcare",
      description: "Regulatory compliance, revenue cycle analysis, and medical practice valuations for healthcare providers.",
      image: "/src/assets/16.png",
      caseStudy: {
        client: "St. Jude Regional Medical",
        challenge: "The hospital's revenue cycle was broken. Claims were being denied at a rate of 28%, and their aging accounts receivable threatened daily operations.",
        solution: "We performed a deep-dive audit into their billing codes and insurance claim processes. We redesigned their internal controls and trained their staff on compliance-first billing.",
        results: "Claim denial rate plummeted to 4%. Cash flow improved by $2.5M within the first quarter, allowing the hospital to finally purchase critical new imaging equipment."
      }
    },
    {
      name: "Real Estate",
      description: "Project financing advisory, REIT compliance, and complex property tax structuring.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
      caseStudy: {
        client: "Vanguard Property Developers",
        challenge: "Vanguard was struggling to secure a $50M syndicated loan for a massive mixed-use development due to opaque historical financial reporting.",
        solution: "We rebuilt their financial statements from the ground up, implementing rigorous percentage-of-completion accounting. We also prepared a bulletproof project financing memorandum for the banks.",
        results: "The loan was oversubscribed and secured at an interest rate 1.5% lower than initially projected. The project broke ground 2 months ahead of schedule."
      }
    },
    {
      name: "Professional Services",
      description: "Partnership accounting, profit allocation strategies, and succession planning for service firms.",
      image: "/src/assets/17.png",
      caseStudy: {
        client: "Harrison & Associates Legal",
        challenge: "A 40-partner law firm was experiencing intense internal friction due to an outdated, inequitable profit allocation model and no clear succession plan for retiring founders.",
        solution: "We engineered a dynamic profit allocation matrix based on origination, execution, and management metrics. We also established a tax-efficient buyout strategy for retiring partners.",
        results: "Partner retention increased to 100% over the next two years. The founders successfully transitioned their equity, ensuring the firm's legacy without crippling its cash reserves."
      }
    },
  ],
  principles: [
    {
      id: "01",
      title: "Accuracy",
      description: "Uncompromising precision in every ledger, report, and filing.",
      longDescription: "Accuracy isn't just about getting the math right; it's about the profound impact that precise data has on human decisions. We treat every number as a critical piece of truth. By implementing multi-tiered review processes, we ensure that the financial intelligence we deliver to your desk is flawless, allowing you to make high-stakes decisions without a shadow of a doubt."
    },
    {
      id: "02",
      title: "Confidentiality",
      description: "Absolute discretion and secure handling of your most sensitive data.",
      longDescription: "We understand that we hold the keys to your most sensitive corporate secrets. Our commitment to confidentiality goes beyond standard non-disclosure agreements. We employ bank-grade digital security and enforce a strict culture of discretion. Your strategic moves, financial vulnerabilities, and proprietary data remain strictly within the vault of our trusted partnership."
    },
    {
      id: "03",
      title: "Transparency",
      description: "Clear, honest communication about your financial standing and obligations.",
      longDescription: "We don't hide behind accounting jargon or complex spreadsheets. We believe our true value lies in translating complex financial realities into plain, actionable language. Whether the news is an unexpected tax benefit or a looming cash flow crisis, we deliver it straight. You will always know exactly where your business stands, giving you the power to steer the ship effectively."
    },
    {
      id: "04",
      title: "Practical Advice",
      description: "Actionable insights designed to drive real-world business outcomes.",
      longDescription: "Theory is useless if it can't be executed on the factory floor or in the boardroom. Our advice is deeply rooted in the harsh realities of doing business. We don't just point out problems; we engineer pragmatic, scalable solutions. Every strategy we propose is tested against the ultimate metric: will this actively improve your business's bottom line?"
    },
  ],
  process: [
    {
      id: "01",
      title: "Initial Consultation",
      description: "We discuss your business needs, current challenges, and long-term objectives.",
      deliverable: "Needs Assessment Report"
    },
    {
      id: "02",
      title: "Document Collection",
      description: "Secure gathering of your financial records, ledgers, and previous filings.",
      deliverable: "Secure Data Vault Access"
    },
    {
      id: "03",
      title: "Audit Planning",
      description: "Development of a tailored strategy to review and verify your financial data.",
      deliverable: "Custom Audit Strategy Document"
    },
    {
      id: "04",
      title: "Audit Execution",
      description: "Rigorous analysis, cross-referencing, and verification of all financial statements.",
      deliverable: "Interim Findings Review"
    },
    {
      id: "05",
      title: "Report Submission",
      description: "Delivery of a comprehensive, clear, and actionable final report.",
      deliverable: "Final Audit Report & Advisory Session"
    },
  ],
  testimonials: [
    {
      quote: "Aurilious & Co completely transformed our financial architecture. Their insights didn't just ensure compliance—they unlocked millions in operational efficiency and catalyzed our global expansion.",
      name: "Eleanor Vance",
      business: "Vance Manufacturing Group",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "Confidential, precise, and highly professional. They handle our complex tax structures with an expertise that gives us complete peace of mind.",
      name: "Marcus Thorne",
      business: "Thorne & Associates Architecture",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "The clarity they brought to our financial reporting has been instrumental in our recent expansion. A truly premium advisory partner.",
      name: "Sophia Lin",
      business: "Lumin IT Solutions",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
    },
  ],
  faqs: [
    {
      question: "What does an audit involve?",
      answer: "An audit involves a systematic, independent examination of your financial statements, records, and operations to ensure they accurately represent your financial position and comply with relevant accounting standards.",
    },
    {
      question: "What documents are generally required?",
      answer: "Typically, we require your previous year's financial statements, general ledger, bank statements, tax returns, payroll records, and documentation of major assets and liabilities.",
    },
    {
      question: "Do you provide GST and taxation services?",
      answer: "Yes, we offer comprehensive taxation and GST services, from strategic planning and registration to ongoing filing and compliance management.",
    },
    {
      question: "Can you support ongoing accounting requirements?",
      answer: "Absolutely. We provide tailored ongoing accounting solutions to ensure your day-to-day financial operations are accurate and up-to-date.",
    },
    {
      question: "How do I schedule a consultation?",
      answer: "You can schedule a consultation by filling out the appointment request form on this website, or by contacting our office directly via phone or email.",
    },
  ],
  insights: [
    {
      category: "Compliance",
      title: "Statutory Audit Deadlines Every Business Should Track in 2026",
      excerpt: "A practical calendar of the filing and audit-completion dates that most commonly get missed, and how to build a buffer around each one.",
      readTime: "6 min read",
    },
    {
      category: "Taxation",
      title: "GST Input Tax Credit: Common Reconciliation Errors",
      excerpt: "Why ITC claims get rejected at assessment stage, and the reconciliation checks that catch mismatches before they become penalties.",
      readTime: "5 min read",
    },
    {
      category: "Financial Advisory",
      title: "Reading Your Audit Report: What Partners Actually Look At",
      excerpt: "A breakdown of the sections of a finalized audit report that lenders, investors and boards scrutinize most closely.",
      readTime: "7 min read",
    },
    {
      category: "Compliance",
      title: "Internal Controls: Building a Framework That Survives Scrutiny",
      excerpt: "The difference between controls that exist on paper and controls that actually hold up during an external review.",
      readTime: "8 min read",
    },
    {
      category: "Startups",
      title: "Choosing an Entity Structure Before Your First Audit",
      excerpt: "How the legal structure you register under shapes your compliance burden, tax exposure and audit scope from year one.",
      readTime: "6 min read",
    },
    {
      category: "Taxation",
      title: "Income Tax Filing for Businesses With Multi-State Operations",
      excerpt: "Where state-level compliance requirements diverge from central filing, and how to keep both in sync without duplicate work.",
      readTime: "5 min read",
    },
  ],
};
