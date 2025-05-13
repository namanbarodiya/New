// This is a mock implementation for the MVP
// In a real application, you would connect to the OpenAI API

export interface AIResponse {
  success: boolean;
  data: any;
  error?: string;
}

export async function generateSummary(articleTitle: string, articleContent?: string): Promise<AIResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock response based on article title
  const bulletPoints = [
    `Key takeaway 1: ${articleTitle.split(' ').slice(0, 3).join(' ')} represents a significant advancement in technology.`,
    `Key takeaway 2: This innovation could potentially transform how businesses operate in the digital landscape.`,
    `Key takeaway 3: Industry experts predict widespread adoption within the next 12-18 months.`,
    `Key takeaway 4: Companies should start exploring implementation strategies to stay competitive.`,
  ];
  
  return {
    success: true,
    data: {
      summary: bulletPoints,
    },
  };
}

export async function askQuestion(question: string, articleTitle: string, articleContent?: string): Promise<AIResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock responses based on common questions
  const responses: Record<string, string> = {
    "what is this about": `This article discusses ${articleTitle}, focusing on its potential impact on businesses and the technology landscape.`,
    "why is this important": `${articleTitle} is important because it represents a significant advancement that could transform how companies operate and compete in the digital economy.`,
    "how can businesses benefit": `Businesses can benefit from ${articleTitle.split(' ').slice(0, 3).join(' ')} by improving operational efficiency, enhancing customer experiences, and potentially unlocking new revenue streams.`,
    "when will this be available": `Based on the article, early adoption is already happening, with widespread availability expected within the next 12-18 months.`,
    "what are the limitations": `While promising, this technology has limitations including integration challenges with legacy systems, potential regulatory hurdles, and the need for specialized expertise during implementation.`,
  };
  
  // Default response for other questions
  let answer = `Based on the article about ${articleTitle}, `;
  
  // Check if question matches any predefined responses
  for (const [key, response] of Object.entries(responses)) {
    if (question.toLowerCase().includes(key)) {
      answer = response;
      break;
    }
  }
  
  // If no match, provide a generic but contextual response
  if (answer === `Based on the article about ${articleTitle}, `) {
    answer += `the information you're asking about isn't explicitly covered in the content. However, the article primarily focuses on the technology's applications, benefits, and potential industry impact. For more specific details, you might want to consult additional sources.`;
  }
  
  return {
    success: true,
    data: {
      answer,
    },
  };
}