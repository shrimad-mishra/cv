export const profile = {
  name: 'Shrimad Mishra',
  role: 'Senior Software Engineer @ Exotel',
  location: 'Bengaluru',
  headline: 'I build production AI voicebots and multi-agent systems.',
  summary:
    "~5 years at Cogno AI / Exotel building high-scale, real-time backend systems. I started Exotel's voicebot from scratch and scaled it into a production-grade Go platform on LangGraph, MCP and Pipecat.",
  tags: ['Generative AI', 'Voicebots', 'Multi-Agent Systems', 'LangGraph', 'Kubernetes', 'AWS', 'CI/CD'],
  email: 'mshrimad@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shrimad-mishra',
  github: 'https://github.com/shrimad-mishra',
  resume: '/Shrimad_Mishra_Resume.pdf',
  photo: '/profile.jpg',
  education: 'B.E. Computer Science and Engineering, Dr. Ambedkar Institute of Technology',
}

export const stats = [
  { value: '50+', label: 'production deploys per week, zero downtime' },
  { value: '60%', label: 'fewer bugs from backend reliability work' },
  { value: '70%', label: 'faster load time via DB and backend optimisation' },
  { value: '40%', label: 'less support overhead from BERT-based NLU' },
]

export const experience = [
  {
    when: 'Oct 2024 – Present',
    title: 'Senior Software Engineer',
    company: 'Exotel · Bengaluru',
    points: [
      'Own the Voicebot end-to-end, scaling it from a Python/Django prototype into a production-grade Go service.',
      'Redesigned the conversation engine from a single LLM call into a LangGraph multi-agent supervisor architecture.',
      'Added Model Context Protocol (MCP) support and integrated Pipecat for real-time, low-latency voice streaming.',
      'Built the SIP connector handling call signaling and real-time media; reduced response latency with conversational audio fillers.',
      'Containerized all services (Docker, Kubernetes) on multi-cloud AWS + Oracle OCI; CI/CD shipping 50+ deploys a week.',
      'Built the customer-facing voicebot dashboard (React, Java) with Keycloak auth and Apache Superset analytics.',
      'Received multiple Medallions of Honor for voicebot and automation infrastructure.',
    ],
  },
  {
    when: 'Jan 2022 – Sep 2024',
    title: 'Software Engineer',
    company: 'Cogno AI (acquired by Exotel) · Bengaluru',
    note: 'Joined as a contractor in Jan 2022; full-time from Aug 2022.',
    points: [
      'Owned the Chatbot and Co-browsing products: BERT-based intent and entity engine (-40% support overhead), real-time WebSocket co-browse for web and Android, and an early RAG chatbot.',
      'Cut bugs by 60% and client-reported issues by ~45%; reduced load time by 70%.',
      'Built real-time Airflow pipelines (sub-3s latency) and OpenSearch / Logstash / Filebeat observability.',
      'Started the Voicebot from scratch in Aug 2023 and delivered the initial MVP in Python/Django.',
    ],
  },
  {
    when: 'Jun 2021 – Aug 2021',
    title: 'Machine Learning Engineer Intern',
    company: 'Applex.in · Kolkata',
    points: [
      'Image-to-text extraction for the Snaplingo app (95% accuracy) and a computer-vision table detection module (90%+ parsing accuracy).',
    ],
  },
]

export const projects = [
  {
    title: 'AI Agent for Autonomous Operations',
    text: 'LLM-driven agent that turns natural-language instructions into actions through tool calling: files, resources and multi-step workflows.',
    stack: 'Python · LLM · Tool calling',
    link: 'https://github.com/shrimad-mishra/ai-agents',
    cta: 'View on GitHub',
  },
  {
    title: 'Disease Prediction with ML',
    text: 'Django web app that predicts likely diseases from symptoms using Decision Tree, Random Forest and Naive Bayes models.',
    stack: 'Django · scikit-learn',
    link: 'https://github.com/shrimad-mishra/Disease-Prediction-Using-ML-and-Django',
    cta: 'View on GitHub',
  },
  {
    title: 'Chatbot using NLTK',
    text: 'Rule- and NLP-based chatbot built with NLTK that answers questions from a custom knowledge base.',
    stack: 'Python · NLTK · NLP',
    link: 'https://github.com/shrimad-mishra/Chatbot-Using-Nltk',
    cta: 'View on GitHub',
  },
]

export const publications = [
  {
    title: 'Prediction of Knee-Replacement using Deep-Learning Approach',
    venue: 'IEEE · Oct 2022',
    text: 'Peer-reviewed research, co-authored with faculty at Dr. Ambedkar Institute of Technology, applying deep learning to predict the need for knee replacement and support earlier orthopedic diagnosis.',
    link: 'https://ieeexplore.ieee.org/document/9936520',
    code: 'https://github.com/shrimad-mishra/prediction_replacement_and_diagnosis_of_osteoarthritis',
  },
]

export const certificates = [
  { title: 'Neural Networks and Deep Learning', issuer: 'Coursera (DeepLearning.AI)' },
  { title: 'Python', issuer: 'HackerRank' },
  { title: 'AWS Machine Learning', issuer: 'Certificate of Participation' },
]

export const skills = [
  { title: 'AI & Agentic Systems', items: 'LangGraph (multi-agent), LangChain, MCP, RAG, Vector Embeddings, BERT, Azure OpenAI, Prompt Engineering' },
  { title: 'Voice & Real-Time', items: 'Pipecat, SIP, WebSockets, real-time media pipelines' },
  { title: 'Languages & Backend', items: 'Go, Python, Java, JavaScript · Django, Flask, REST, Microservices, Kafka, Nginx, React' },
  { title: 'Cloud, DevOps & Data', items: 'Docker, Kubernetes, AWS, Oracle OCI, CI/CD, Jenkins · PostgreSQL, Redis, OpenSearch, Airflow, Superset, Keycloak' },
]
