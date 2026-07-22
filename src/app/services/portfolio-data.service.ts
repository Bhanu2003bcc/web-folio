import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  github?: string;
  live?: string;
  featured: boolean;
  metrics?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  description: string[];
  tech: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade?: string;
}

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  readonly profile = {
    name: 'Bhanu Pratap Singh',
    title: 'Software Developer | AI Engineer',
    tagline: 'Building scalable backend systems',
    subtitle: 'Spring Boot · Microservices · Agentic Workflows',
    bio: `Passionate Software developer with 1/2+ years of experience architecting high-performance backend systems. I specialize in Spring Boot microservices, distributed systems, and cloud-native applications that serve millions of users.`,
    location: 'Bengaluru, India',
    email: 'bhanupratapsingh2939522@gmail.com',
    github: 'https://github.com/Bhanu2003bcc',
    linkedin: 'https://www.linkedin.com/in/bpsingh7507/',
    resume: 'https://drive.google.com/file/d/1Hpxbu3SY-ifeSN_GwTsMYe8SAe37HwLF/view?usp=sharing',
    yearsExp: 1/2,
    projects: 7,
    companies: 2,
  };

  readonly projects: Project[] = [
    {
      id: 1,
      title: 'Rent2Live - Room/Flat Rental Platform',
      description: 'Full stack production ready SaaS Product. Solving the problem of searching Room / flat for the working professional or new visitor in Noida. A Platform that shows authentic & perfect stay for working professional according to their requirement and location.',
      tech: ['Java 21', 'Spring Boot', 'Twilio OTP sms sender', 'Redis', 'PostgreSQL', 'Docker', 'Angular(AI help)'],
      category: 'Full Stack Product',
      github: 'https://github.com/Bhanu2003bcc/Roomconnect-server',
      live: 'https://rent2live.vercel.app/',
      featured: true,
      metrics: '100+ Active users · 90.97% uptime',
    },
    {
      id: 2,
      title: 'Selection Sure - SaaS Interview Platform',
      description: 'Full stack production ready SaaS Product. One shared link. Low-latency P2P video, a synchronized Monaco code editor, and instant workspace sync — so you can focus on the talent, not the tooling.',
      tech: ['Java 21', 'Spring Boot', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Docker', 'Java Email Sender', 'React'],
      category: 'Full Stack Product',
      github: 'https://github.com/Bhanu2003bcc/Intercode',
      live: 'https://selectionsure.vercel.app/',
      featured: true,
      metrics: '50+ Active users · 99.97% uptime',
    },
    {
      id: 3,
      title: 'Document RAG Pipeline',
      description: 'Production-ready Document RAG pipeline with semantic search, citations, and AI-powered question answering.',
      tech: ['Python', 'RAGAs', 'VectorDb', 'PostgreSQL', 'ORM', 'FastAPI', 'LangChain'],
      category: 'AI-based',
      github: 'https://github.com/Bhanu2003bcc/genaiRAG',
      live: 'https://rag-document-wheat.vercel.app/',
      featured: true,
      metrics: '500+ Concurrent users · <200ms latency',
    },
    {
      id: 4,
      title: 'Multi-Agent Research System',
      description: 'AI-powered research assistant with deep web search, intelligent reasoning, and citation-backed answers.',
      tech: ['FastAPI', 'Docker', 'LangChain', 'RAGAs', 'VectorDb', 'PostgreSQL', 'ORM', 'Python'],
      category: 'AI Research Paper',
      github: 'https://github.com/Bhanu2003bcc/Research_Agent',
      live: 'https://qwqn-re-search-it.hf.space/',
      featured: true,
      metrics: 'Used on college levels · 100+ Active users',
    },
    {
      id: 5,
      title: 'Distributed Cache Framework',
      description: 'Custom distributed caching solution built on top of Redis Cluster with automatic sharding, TTL management, and cache invalidation strategies.',
      tech: ['Java', 'Redis Cluster', 'Spring Cache', 'Lua Scripting', 'JUnit 5'],
      category: 'Security Architecture',
      github: 'https://github.com/Bhanu2003bcc/Grid07',
      featured: false,
      metrics: 'Used for academic purposes',
    },
    {
      id: 6,
      title: 'API Gateway & Rate Limiter',
      description: 'High-throughput API gateway with token bucket rate limiting, circuit breaker patterns, and centralized authentication.',
      tech: ['Spring Cloud Gateway', 'Resilience4j', 'Redis', 'JWT', 'Prometheus', 'Grafana', 'Payment GateWay'],
      category: 'API & Security',
      github: 'https://github.com/Bhanu2003bcc/CodeSync',
      featured: false,
    },
    {
      id: 7,
      title: 'Log Aggregation Pipeline',
      description: 'Real-time log aggregation, processing, and alerting pipeline using the ELK stack integrated with existing Spring Boot services.',
      tech: ['Spring Boot', 'Elasticsearch', 'Logstash', 'Kibana', 'Filebeat', 'AWS CloudWatch'],
      category: 'DevOps',
      github: '#',
      featured: false,
      
    },
  ];

  readonly skills: Skill[] = [
    // Core Java
    { name: 'Java 17/21', level: 96, category: 'Core' },
    { name: 'Spring Boot', level: 94, category: 'Core' },
    { name: 'Spring MVC', level: 92, category: 'Core' },
    { name: 'Spring Security', level: 88, category: 'Core' },
    { name: 'Hibernate / JPA', level: 90, category: 'Core' },
    // Databases
    { name: 'PostgreSQL', level: 90, category: 'Database' },
    { name: 'MySQL', level: 88, category: 'Database' },
    { name: 'Redis', level: 85, category: 'Database' },
    { name: 'MongoDB', level: 78, category: 'Database' },
    // Cloud & DevOps
    { name: 'AWS (EC2, RDS, S3, EKS)', level: 50, category: 'Cloud' },
    { name: 'Docker', level: 88, category: 'Cloud' },
    { name: 'CI/CD (GitHub Actions)', level: 30, category: 'Cloud' },
    // Messaging
    { name: 'Apache Kafka', level: 86, category: 'Messaging' },
    { name: 'RabbitMQ', level: 49, category: 'Messaging' },
    // Testing
    { name: 'JUnit 5 / Mockito', level: 92, category: 'Testing' },
    { name: 'Testcontainers', level: 80, category: 'Testing' },
  ];

  readonly experience: Experience[] = [
    {
      company: 'Self employed',
      role: 'Software Developer',
      period: 'Mar 2026 – Present',
      location: 'Remote',
      current: true,
      description: [
        'Architected a full-stack collaborative interview platform with Spring Boot, React, PostgreSQL, Redis, and WebRTC, enabling secure real-time video interviews and synchronized live coding.',
        'Built a Docker-based sandboxed code execution engine supporting Java, Python, Go, C++, and C with Redis Pub/Sub and STOMP WebSockets, achieving sub-50ms concurrent session messaging.',
        'Implemented secure JWT authentication, role-based access control, Flyway schema versioning, and REST APIs to deliver a production-ready SaaS interview platform.',
        'Engineered real-time collaboration using WebRTC and WebSockets, resolving ICE candidate race conditions through buffered signaling to improve connection reliability.'
      ],
      tech: ['Java 21', 'Spring Boot', 'Kafka', 'Redis', 'cloud', 'Kubernetes'],
    },
    
    {
      company: 'Texium Solutions',
      role: 'Backend Engineer',
      period: 'Aug 2025 – Dec 2025',
      location: 'Remote',
      current: false,
      description: [
        'Engineered enterprise ETL pipelines with Java and Spring Boot, enabling reliable migration of 100K+ records per day across heterogeneous data sources.',
        'Developed high-performance Content Discovery REST APIs with optimized SQL queries and indexing, improving data retrieval efficiency by 10%.',
        'Built scalable data ingestion modules supporting MongoDB and SQL backends, reducing manual data processing effort by 40% through clean object-oriented design.',
        'Improved backend quality by increasing JUnit test coverage to 80% while actively participating in code reviews and cross-functional engineering discussions.'
      ],
      tech: ['Java 17', 'Spring MVC', 'Hibernate', 'MongoDB', 'Maven', 'MySQL'],
    },
  ];

  readonly education: Education[] = [
    {
      institution: 'APJ Abdul Kalam Technical University',
      degree: 'B.Tech in Computer Science Engineering',
      period: '2022 – 2026',
      grade: 'CGPA: 7 / 10',
    },
  ];

  readonly certifications = [
    { name: 'Software Developer', issuer: 'Forage', year: '2026' },

  ];
}
