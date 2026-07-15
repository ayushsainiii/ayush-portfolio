import React from "react";

export default function PrintResume() {
  return (
    <div className="hidden print:block bg-white text-black p-8 max-w-[21cm] mx-auto font-serif text-[11.5px] leading-relaxed select-text" id="print-resume-container">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold tracking-wide uppercase text-black font-serif">Ayush Saini</h1>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-xs font-serif text-gray-800">
          <span className="flex items-center gap-1">
            📞 +91-9520582736
          </span>
          <span className="flex items-center gap-1">
            ✉️ ayushsaini13january@gmail.com
          </span>
          <span className="flex items-center gap-1">
            🌐 github.com/ayushsainiii
          </span>
          <span className="flex items-center gap-1">
            🔗 linkedin.com/in/ayushsaini
          </span>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2">Education</h2>
        <div className="space-y-2">
          {/* Master of Computer Applications */}
          <div>
            <div className="flex justify-between font-bold text-[12px]">
              <span>Master of Computer Applications</span>
              <span>2024 - 2026</span>
            </div>
            <div className="flex justify-between text-gray-800 italic text-[11.5px]">
              <span>KIET Group of Institutions</span>
              <span>Ghaziabad, UP</span>
            </div>
          </div>

          {/* Bachelor of Computer Applications */}
          <div>
            <div className="flex justify-between font-bold text-[12px]">
              <span>Bachelor of Computer Applications (75.97%)</span>
              <span>2021 - 2024</span>
            </div>
            <div className="flex justify-between text-gray-800 italic text-[11.5px]">
              <span>S.D. College of Management Studies</span>
              <span>Muzaffarnagar, UP</span>
            </div>
          </div>

          {/* Senior Secondary */}
          <div>
            <div className="flex justify-between font-bold text-[12px]">
              <span>Senior Secondary (75.6%)</span>
              <span>2021</span>
            </div>
            <div className="flex justify-between text-gray-800 italic text-[11.5px]">
              <span>L J P S V M Inter College (UP Board)</span>
              <span>Muzaffarnagar, UP</span>
            </div>
          </div>

          {/* Secondary */}
          <div>
            <div className="flex justify-between font-bold text-[12px]">
              <span>Secondary (84.33%)</span>
              <span>2019</span>
            </div>
            <div className="flex justify-between text-gray-800 italic text-[11.5px]">
              <span>L J P S V M Inter College (UP Board)</span>
              <span>Muzaffarnagar, UP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2">Skills</h2>
        <div className="space-y-1">
          <div>
            <strong className="font-bold">Programming & Development:</strong> Java, C, C++, JavaScript, HTML5, CSS3, SQL, MySQL
          </div>
          <div>
            <strong className="font-bold">Frontend Technologies:</strong> React.js, Tailwind CSS, Bootstrap, Responsive Design
          </div>
          <div>
            <strong className="font-bold">Tools & Platforms:</strong> Git, GitHub, VS Code
          </div>
          <div>
            <strong className="font-bold">Soft Skills:</strong> Problem Solving, Team Collaboration, Code Review
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2">Experience</h2>
        <div>
          <div className="flex justify-between font-bold text-[12px]">
            <span>Web Developer Intern</span>
            <span>June 2025 - July 2025</span>
          </div>
          <div className="flex justify-between text-gray-800 italic text-[11.5px] mb-1">
            <span>Codec Technologies</span>
            <span>Tech Stack: HTML, CSS, JavaScript, React.js</span>
          </div>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Engineered 5+ reusable React.js components for admin dashboards and client portals, reducing development time by 30%.</li>
            <li>Integrated REST APIs to build dynamic, data-driven web application features, improving data accuracy and responsiveness.</li>
            <li>Resolved 15+ bugs through structured debugging and code reviews with senior developers, enhancing application stability.</li>
          </ul>
        </div>
      </div>

      {/* Projects Section */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2">Projects</h2>
        <div className="space-y-2">
          {/* AI-Powered Document Assistant */}
          <div>
            <div className="flex justify-between font-bold text-[12px]">
              <span>AI-Powered Document Assistant | <span className="italic font-normal">C++, Ollama, HNSW, REST API</span></span>
              <span>Apr 2026 - June 2026</span>
            </div>
            <ul className="list-disc pl-4 space-y-0.5 mt-0.5">
              <li>Architected an AI-powered document assistant with 3 search algorithms (HNSW, KD-Tree, Brute Force) and 3 distance metrics, achieving sub-100ms response time.</li>
              <li>Built a C++ vector search engine indexing 768-dim embeddings via Ollama LLM, enabling semantic search over 20+ documents.</li>
              <li>Designed RESTful APIs for document ingestion, vector indexing, and AI Q&A; integrated an interactive web UI with real-time algorithm comparison.</li>
            </ul>
          </div>

          {/* Deep Packet Inspection System */}
          <div>
            <div className="flex justify-between font-bold text-[12px]">
              <span>Deep Packet Inspection System | <span className="italic font-normal">C++, PCAP, Multi-threading</span></span>
              <span>Nov 2025 - Dec 2025</span>
            </div>
            <ul className="list-disc pl-4 space-y-0.5 mt-0.5">
              <li>Built a multi-threaded DPI engine in C++ with 2 Load Balancers + 4 Fast Path threads to parse and filter live PCAP network traffic.</li>
              <li>Implemented 4-layer protocol parsing and Five-Tuple flow tracking to maintain stateful TCP/UDP connection records across all packets.</li>
              <li>Extracted SNI from TLS Client Hello to classify 10+ applications and enforced IP, app, and domain-based blocking rules with filtered PCAP output.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Awards & Certifications Section */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2">Awards & Certifications</h2>
        <ul className="list-disc pl-4 space-y-0.5">
          <li><strong>Cybersecurity – Cisco Networking Academy</strong> (May 2025): Network security, threat analysis, vulnerability assessment, and secure system design.</li>
          <li><strong>Python Essentials 1 & 2 – Cisco Networking Academy</strong> (May 2025): Python programming, OOP, data structures, functions, and file handling via hands-on projects.</li>
          <li><strong>Introduction to Artificial Intelligence – LinkedIn</strong> (Apr 2025): Machine learning, neural networks, NLP basics, and real-world AI application design.</li>
          <li><strong>AWS Cloud Foundations – AWS Academy Graduate</strong> (Apr 2025): AWS core services (EC2, S3, IAM), cloud architecture, security, and billing management.</li>
        </ul>
      </div>
    </div>
  );
}
