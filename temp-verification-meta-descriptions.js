// Meta Description Character Count Verification
const descriptions = {
  home: "Get expert SEO services that boost organic traffic and rankings. Marden SEO delivers proven strategies for businesses ready to dominate search results.",
  about: "Meet the SEO expert behind Marden SEO. Learn about proven experience in search engine optimization, app development, and digital marketing success stories.",
  services: "Discover comprehensive SEO services including technical optimization, content strategy, and link building. Proven results for businesses seeking higher rankings.",
  servicesPricing: "Exceptional web development and educational services. Choose from done-for-you sites, self-paced learning, or personalized coaching. Transparent pricing.",
  blog: "Expert SEO tips, strategies, and insights to help you improve search visibility and stay ahead of the competition. Latest trends and best practices available.",
  contact: "Ready to boost your online presence? Contact Marden SEO for a free consultation. Get expert SEO and app development services tailored to your business needs.",
  workflowAutomation: "Streamline your business processes with custom workflow automation using n8n, Zapier alternatives, and bespoke solutions. Increase efficiency and reduce manual work.",
  appBuilding: "Professional custom application development using React, modern frameworks, and cutting-edge technologies. Scalable solutions for your business needs and growth.",
  portfolio: "Explore successful SEO campaigns and app development projects. Real results, measurable improvements, and satisfied clients across various industries."
};

console.log("Meta Description Character Count Analysis:");
console.log("=" .repeat(60));

Object.entries(descriptions).forEach(([page, description]) => {
  const charCount = description.length;
  const status = charCount >= 150 && charCount <= 160 ? "✅ OPTIMAL" : 
                charCount >= 145 && charCount <= 165 ? "⚠️ ACCEPTABLE" : 
                "❌ NEEDS ADJUSTMENT";
  
  console.log(`${page.padEnd(20)} | ${charCount.toString().padStart(3)} chars | ${status}`);
});

console.log("\n" + "=" .repeat(60));
console.log("Target: 150-160 characters for optimal search engine display");
console.log("Acceptable: 145-165 characters (minor buffer zone)");
