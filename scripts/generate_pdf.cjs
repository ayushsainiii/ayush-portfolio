const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

function generateResumePDF() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt", // using points (1 pt = 1/72 inch) for pixel-perfect typesetting
    format: "letter", // Letter standard for professional resumes
  });

  const pageWidth = doc.internal.pageSize.width; // 612 pt
  const pageHeight = doc.internal.pageSize.height; // 792 pt
  
  const leftMargin = 40;
  const rightMargin = 40;
  const contentWidth = pageWidth - leftMargin - rightMargin; // 532 pt

  let y = 35; // Start y position

  // Draw Header
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(20, 20, 20);
  doc.text("AYUSH SAINI", pageWidth / 2, y, { align: "center" });

  y += 18;
  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 40);
  const contactStr = "+91-9520582736   |   ayushsaini13january@gmail.com   |   github.com/ayushsainiii   |   linkedin.com/in/ayushsaini";
  doc.text(contactStr, pageWidth / 2, y, { align: "center" });

  y += 15;

  const drawSectionHeading = (title) => {
    y += 12;
    doc.setFont("times", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(30, 30, 30);
    doc.text(title, leftMargin, y);
    
    y += 4;
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, pageWidth - rightMargin, y);
    y += 12;
  };

  // --- EDUCATION ---
  drawSectionHeading("Education");

  const education = [
    {
      degree: "Master of Computer Applications",
      inst: "KIET Group of Institutions",
      loc: "Ghaziabad, UP",
      date: "2024 - 2026"
    },
    {
      degree: "Bachelor of Computer Applications (75.97%)",
      inst: "S.D. College of Management Studies",
      loc: "Muzaffarnagar, UP",
      date: "2021 - 2024"
    },
    {
      degree: "Senior Secondary (75.6%)",
      inst: "L J P S V M Inter College (UP Board)",
      loc: "Muzaffarnagar, UP",
      date: "2021"
    },
    {
      degree: "Secondary (84.33%)",
      inst: "L J P S V M Inter College (UP Board)",
      loc: "Muzaffarnagar, UP",
      date: "2019"
    }
  ];

  education.forEach((item) => {
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.text(item.degree, leftMargin, y);
    doc.text(item.date, pageWidth - rightMargin, y, { align: "right" });

    y += 11;
    doc.setFont("times", "italic");
    doc.setFontSize(9.5);
    doc.text(item.inst, leftMargin, y);
    doc.text(item.loc, pageWidth - rightMargin, y, { align: "right" });
    y += 14;
  });

  // --- SKILLS ---
  drawSectionHeading("Skills");

  const skills = [
    { label: "Programming & Development", val: "Java, C, C++, JavaScript, HTML5, CSS3, SQL, MySQL" },
    { label: "Frontend Technologies", val: "React.js, Tailwind CSS, Bootstrap, Responsive Design" },
    { label: "Tools & Platforms", val: "Git, GitHub, VS Code" },
    { label: "Soft Skills", val: "Problem Solving, Team Collaboration, Code Review" }
  ];

  skills.forEach((skill) => {
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.text(`${skill.label}: `, leftMargin, y);
    
    const labelWidth = doc.getTextWidth(`${skill.label}: `);
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text(skill.val, leftMargin + labelWidth, y);
    y += 13;
  });

  // --- EXPERIENCE ---
  drawSectionHeading("Experience");

  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.text("Web Developer Intern", leftMargin, y);
  doc.text("June 2025 - July 2025", pageWidth - rightMargin, y, { align: "right" });

  y += 11;
  doc.setFont("times", "italic");
  doc.setFontSize(9.5);
  doc.text("Codec Technologies", leftMargin, y);
  
  doc.setFont("times", "normal");
  doc.text("Tech Stack: HTML, CSS, JavaScript, React.js", pageWidth - rightMargin, y, { align: "right" });

  y += 12;

  const expBullets = [
    "Engineered 5+ reusable React.js components for admin dashboards and client portals, reducing development time by 30%.",
    "Integrated REST APIs to build dynamic, data-driven web application features, improving data accuracy and responsiveness.",
    "Resolved 15+ bugs through structured debugging and code reviews with senior developers, enhancing application stability."
  ];

  expBullets.forEach((bullet) => {
    doc.setFont("times", "normal");
    doc.setFontSize(9.5);
    doc.text("•", leftMargin + 6, y);
    
    const splitText = doc.splitTextToSize(bullet, contentWidth - 15);
    doc.text(splitText, leftMargin + 16, y);
    y += (splitText.length * 11) + 2;
  });

  // --- PROJECTS ---
  drawSectionHeading("Projects");

  // Project 1
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.text("AI-Powered Document Assistant", leftMargin, y);
  const proj1Width = doc.getTextWidth("AI-Powered Document Assistant");
  
  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.text(" | C++, Ollama, HNSW, REST API", leftMargin + proj1Width, y);
  doc.setFont("times", "bold");
  doc.text("Apr 2026 - June 2026", pageWidth - rightMargin, y, { align: "right" });

  y += 12;
  const proj1Bullets = [
    "Architected an AI-powered document assistant with 3 search algorithms (HNSW, KD-Tree, Brute Force) and 3 distance metrics, achieving sub-100ms response time.",
    "Built a C++ vector search engine indexing 768-dim embeddings via Ollama LLM, enabling semantic search over 20+ documents.",
    "Designed RESTful APIs for document ingestion, vector indexing, and AI Q&A; integrated an interactive web UI with real-time algorithm comparison."
  ];

  proj1Bullets.forEach((bullet) => {
    doc.setFont("times", "normal");
    doc.setFontSize(9.5);
    doc.text("•", leftMargin + 6, y);
    
    const splitText = doc.splitTextToSize(bullet, contentWidth - 15);
    doc.text(splitText, leftMargin + 16, y);
    y += (splitText.length * 11) + 2;
  });

  y += 4;

  // Project 2
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.text("Deep Packet Inspection System", leftMargin, y);
  const proj2Width = doc.getTextWidth("Deep Packet Inspection System");
  
  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.text(" | C++, PCAP, Multi-threading", leftMargin + proj2Width, y);
  doc.setFont("times", "bold");
  doc.text("Nov 2025 - Dev 2025", pageWidth - rightMargin, y, { align: "right" });

  y += 12;
  const proj2Bullets = [
    "Built a multi-threaded DPI engine in C++ with 2 Load Balancers + 4 Fast Path threads to parse and filter live PCAP network traffic.",
    "Implemented 4-layer protocol parsing and Five-Tuple flow tracking to maintain stateful TCP/UDP connection records across all packets.",
    "Extracted SNI from TLS Client Hello to classify 10+ applications and enforced IP, app, and domain-based blocking rules with filtered PCAP output."
  ];

  proj2Bullets.forEach((bullet) => {
    doc.setFont("times", "normal");
    doc.setFontSize(9.5);
    doc.text("•", leftMargin + 6, y);
    
    const splitText = doc.splitTextToSize(bullet, contentWidth - 15);
    doc.text(splitText, leftMargin + 16, y);
    y += (splitText.length * 11) + 2;
  });

  // --- AWARDS & CERTIFICATIONS ---
  drawSectionHeading("Awards & Certifications");

  const certifications = [
    "Cybersecurity – Cisco Networking Academy (May 2025): Network security, threat analysis, vulnerability assessment, and secure system design.",
    "Python Essentials 1 & 2 – Cisco Networking Academy (May 2025): Python programming, OOP, data structures, functions, and file handling via hands-on projects.",
    "Introduction to Artificial Intelligence – LinkedIn (Apr 2025): Machine learning, neural networks, NLP basics, and real-world AI application design.",
    "AWS Cloud Foundations – AWS Academy Graduate (Apr 2025): AWS core services (EC2, S3, IAM), cloud architecture, security, and billing management."
  ];

  certifications.forEach((cert) => {
    doc.setFont("times", "normal");
    doc.setFontSize(9.5);
    doc.text("•", leftMargin + 6, y);
    
    const splitText = doc.splitTextToSize(cert, contentWidth - 15);
    doc.text(splitText, leftMargin + 16, y);
    y += (splitText.length * 11) + 2;
  });

  const publicDir = path.join(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  const pdfBuffer = doc.output("arraybuffer");
  fs.writeFileSync(path.join(publicDir, "Ayush_Saini_Resume.pdf"), Buffer.from(pdfBuffer));
  console.log("PDF generated successfully at public/Ayush_Saini_Resume.pdf!");
}

generateResumePDF();
