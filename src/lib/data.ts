// Single source of truth for site content — sourced from Maharshi_s_Resume_all.pdf.

export const personal = {
  name: "Maharshi Vaghela",
  first: "Maharshi",
  role: "Software Development Engineer 2",
  company: "GoDaddy",
  location: "Pune, India",
  email: "maharshivaghela1712@gmail.com",
  phone: "+91-9712209887",
  resume: "/resume.pdf",
  photo: "/img/me.jpg",
  summary:
    "Versatile Software Engineer with 4+ years of experience building scalable distributed systems, AI-powered products, and data-intensive platforms — across backend, frontend, cloud infrastructure, ML/AI integration and data engineering.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/maharshi-vaghela-17122000" },
    { label: "GitHub", href: "https://github.com/maharshi1712" },
    { label: "LeetCode", href: "https://leetcode.com/maharshi1712" },
    { label: "HackerRank", href: "https://www.hackerrank.com/maharshi1712" },
  ],
};

export const stats = [
  { value: 4, suffix: "+", label: "Years shipping production systems" },
  { value: 3, suffix: "", label: "Companies — GoDaddy, Swiggy, PeopleStrong" },
  { value: 1500, suffix: "+", label: "APIs secured with payload checksums" },
  { value: 50, suffix: "%", label: "Fewer unauthorized login attempts" },
];

export const capabilities = [
  { title: "Backend Engineering", desc: "Golang, Java, Spring Boot, Node.js — microservices, REST, gRPC and GraphQL built for high throughput and low latency." },
  { title: "Distributed Systems", desc: "Event-driven architecture, Kafka pipelines, CQRS and domain-driven design for systems that stay up under load." },
  { title: "AI / ML Integration", desc: "OpenAI API, LangChain, RAG pipelines, prompt engineering and LLM fine-tuning wired into real products." },
  { title: "Cloud & DevOps", desc: "AWS Lambda, ECS, DynamoDB, Textract, SQS/SNS, Docker, Kubernetes, Terraform and CI/CD with GitHub Actions." },
  { title: "Data Engineering", desc: "Databricks, Spark, Airflow and ETL/ELT — reporting pipelines and stream processing at scale." },
  { title: "Frontend & Product", desc: "React, Next.js, Angular and Tailwind — premium, mobile-first interfaces with SSR/SSG." },
];

export const experience = [
  {
    role: "Software Development Engineer 2",
    company: "GoDaddy",
    logo: "/img/logos/godaddy.png",
    period: "Apr 2026 — Present",
    location: "Pune, India",
    points: [
      "Building large-scale domain marketplace and auction systems — search, listing and lifecycle management of domains.",
      "Designing scalable microservices for domain auctions, bidding workflows and real-time updates.",
      "Optimizing APIs for high throughput and low latency across search and auction operations.",
    ],
    tech: ["Golang", "Microservices", "Distributed Systems", "Auctions"],
  },
  {
    role: "Software Engineer 1",
    company: "Swiggy — Instamart Ads",
    logo: "/img/logos/swiggy.png",
    period: "Jan 2025 — Apr 2026",
    location: "Remote, India",
    headline: "₹1 Cr revenue uplift in 5 days",
    points: [
      "Built the backend for Pre-Search Page Ads in Instamart — ₹1 Cr revenue uplift within 5 days of launch during a sale.",
      "Led end-to-end RO Automation: advertiser PDFs processed via AWS Lambda + Textract into DynamoDB.",
      "Budget-breach monitoring cron with Kafka event publishing for automated downstream alerts.",
      "Dynamic dimension mapping in the Databricks Ads Reporting pipeline; Prometheus metrics for cron and Kafka health.",
    ],
    tech: ["Golang", "AWS Lambda", "Textract", "DynamoDB", "Kafka", "Databricks", "Prometheus"],
  },
  {
    role: "Software Engineer 2",
    company: "PeopleStrong",
    logo: "/img/logos/peoplestrong.png",
    period: "Dec 2023 — Dec 2024",
    location: "Gurugram, India",
    headline: "−20% admin burden, +30% satisfaction",
    points: [
      "Architected a secure WhatsApp-based onboarding flow — 20% less admin burden, 30% happier candidates.",
      "Led three SDE1s building a MySQL → Apache SOLR scheduler for fast full-text candidate search.",
      "OTP rate limiting that cut unauthorized access attempts by 50%.",
      "Logging, metrics and alerting across user and third-party comms — 50 fewer incidents a month.",
    ],
    tech: ["Java", "Spring Boot", "Angular", "SOLR", "MariaDB"],
  },
  {
    role: "Software Engineer 1",
    company: "PeopleStrong",
    logo: "/img/logos/peoplestrong.png",
    period: "Jan 2022 — Nov 2023",
    location: "Gurugram, India",
    headline: "3rd place — Gen AI Hackathon",
    points: [
      "Server-level checksum validation of request/response payloads — data integrity for 1500+ APIs.",
      "Naukri job posting & applicant integration contributing 2% of total product revenue.",
      "3rd in the Gen AI Hackathon: ChatGPT-powered search with 85% extraction accuracy.",
    ],
    tech: ["Java", "Spring Boot", "Hibernate", "ChatGPT API", "PostgreSQL"],
  },
];

export const venture = {
  name: "ClearWork",
  href: "https://getclearwork.in",
  domain: "getclearwork.in",
  image: "/img/work/clearwork-app.jpg",
  tagline: "Find clients. Win them. Get paid.",
  pitch:
    "The all-in-one workspace for India's freelancers, consultants and agencies — from first lead to final payment, in one place.",
  features: [
    { title: "Lead CRM", desc: "Kanban pipeline, intake forms, source tracking and win rate." },
    { title: "Tracked proposals", desc: "AI-drafted, branded links that tell you when they're opened." },
    { title: "E-sign contracts", desc: "OTP signing with a timestamped audit trail — IT Act 2000." },
    { title: "GST invoices + UPI", desc: "Auto CGST/SGST/IGST, TDS flags and zero-fee UPI payments." },
  ],
  facts: [
    { value: "6+", label: "tools replaced" },
    { value: "₹0", label: "transaction fees" },
    { value: "₹249", label: "Pro / month" },
  ],
};

export const projects = [
  {
    title: "MyFinance",
    kind: "AI Finance Platform",
    year: "2024",
    href: "https://my-finance-1712.vercel.app",
    image: "/img/work/myfinance.jpg",
    color: "#ff5121",
    desc: "AI Financial Advisor, transaction imports, net-worth analysis, cash-flow forecasting, tax summary and goal planning — secured with Google OAuth.",
    tech: ["Next.js", "Node.js", "OpenAI API", "Google OAuth"],
  },
  {
    title: "Samay Innovation",
    kind: "Luxury Interiors Studio",
    year: "2024",
    href: "https://samayinnovation.com",
    image: "/img/work/samay.jpg",
    color: "#fcf2bd",
    desc: "Digital presence for an award-winning studio with 1000+ projects across India and the USA — portfolio browsing, Instagram feed and inquiry flow.",
    tech: ["React", "Next.js", "Vercel"],
  },
  {
    title: "Raju Pathak",
    kind: "Photography Director",
    year: "2024",
    href: "https://raju-pathak-photography.vercel.app",
    image: "/img/work/rajupathak.jpg",
    color: "#e2f2fd",
    desc: "Premium personal brand for a 30-year photography director (clients incl. Mont Blanc, 15+ countries) — auto-scrolling portfolio and storytelling layout.",
    tech: ["React", "Next.js", "Vercel"],
  },
  {
    title: "KéNailé",
    kind: "Beauty Studio + Booking",
    year: "2024",
    href: "https://kenaile-frontend.vercel.app",
    image: "/img/work/kenaile.jpg",
    color: "#760021",
    desc: "Turned a home beauty studio into a bookable business — service catalog, slot booking, testimonials and home-delivery funnel.",
    tech: ["React", "Next.js", "Vercel"],
  },
];

export const stack = [
  { label: "Languages", items: ["Golang", "Java", "Python", "TypeScript", "JavaScript", "C++", "SQL", "Bash"] },
  { label: "Backend", items: ["Spring Boot", "J2EE", "Node.js", "Express", "FastAPI", "Flask", "Hibernate", "gRPC", "GraphQL"] },
  { label: "Frontend", items: ["React", "Next.js", "Angular", "Tailwind CSS", "Material UI", "Flutter"] },
  { label: "AI / ML", items: ["OpenAI API", "LangChain", "RAG", "LLM Fine-tuning", "Hugging Face", "TensorFlow", "Scikit-learn"] },
  { label: "Data", items: ["Kafka", "Databricks", "Spark", "Airflow", "ETL/ELT", "Stream Processing"] },
  { label: "Cloud", items: ["AWS Lambda", "ECS", "S3", "SQS/SNS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"] },
  { label: "Databases", items: ["DynamoDB", "PostgreSQL", "MySQL", "Redis", "MongoDB", "Elasticsearch", "SOLR", "Neo4j"] },
  { label: "AI Dev Tools", items: ["Claude Code", "Cursor", "GitHub Copilot", "Agentic Coding", "AI Code Review"] },
];

export const marquee = ["Golang", "Kafka", "AWS", "Next.js", "DynamoDB", "LangChain", "Kubernetes", "Spring Boot", "Databricks", "Redis", "gRPC", "Terraform"];

export const education = {
  school: "DA-IICT",
  full: "Dhirubhai Ambani Institute of Information & Communication Technology",
  degree: "B.Tech, Information & Communication Technology",
  period: "2018 — 2022",
  location: "Gandhinagar, Gujarat",
};
