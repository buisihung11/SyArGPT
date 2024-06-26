type PromptInfo = {
  name: string
  prompt: string
}

export const sampleData: PromptInfo[] = [
  {
    name: "PDF Ai Chatbot",
    prompt: `Cloud architecture for a service that can take PDF files and allow users to have AI chat sessions regarding the content of the PDF files.
  
      - Vectorize the PDF files using AWS Bedrock Embedding API
      - Store them on a cloud vector database
      - store the text chunks in a separate storage.
      
      During a chat session, when a user asks a question
      - turn the question in to a vector using AWS Bedrock
      - query the vector database
      - Use query result vectors to retrieve the associated text chunks.
      - Query AWS Bedrock with the retrieved text chunks and the original user question
      - Return results from AWS Bedrock to the user. 
      Use AWS infrastructure where applicable.
      `
  },
  {
    name: "Git Marketplace",
    prompt: `
      Cloud architecture for a marketplace for freelance developers to find work. Allow authentication via GitHub and LinkedIn.
      Use machine learning to recommend listings.
      Use React for the frontend
      Use a graph database to store user activities, use a SQL database for job listings. Use AWS infrastructure where applicable.
      `
  },
  {
    name: "Wallet Application",
    prompt: `The Wallet application aims to offer users a secure and convenient way to manage their finances, including storing, sending, and receiving money, paying for services, and tracking financial activities. Key features include user authentication (via email, phone, Google, Facebook),money management (add money, send/receive money, request money), payment services (QR code payments, direct payments), transaction history (view and filter transactions), security features (two-factor authentication, activity monitoring, data encryption), and customer support (in-app chat and email support).\nThe application will leverage various AWS services: AWS Cognito for user authentication, Amazon RDS for data storage, AWS Lambda for payment processing, AWS CloudTrail and Shield for security and monitoring, Amazon SageMaker for machine learning, Amazon QuickSight for analytics, and Amazon SNS/SQS for messaging and notifications. The technology stack includes React.js for the frontend, Node.js for the backend, MySQL/PostgreSQL with Amazon RDS for the database, and Stripe for payment processing. This setup ensures a robust, scalable, and secure financial management platform.`
  },
  {
    name: "Banking System",
    prompt: `Design a banking system architecture`
  }
]

export const vpBankChallenges: PromptInfo[] = [
  {
    name: "Challenge 1 - Secure Web Application on Cloud",
    prompt: `
        A bank has an external facing web application that is deployed as a microservice using AWS
        container and serverless services. After running the application on AWS for a year, we have
        encountered various web application vulnerabilities that have led to the exploitation of
        misconfigured AWS resources and coding issues.
        We are looking for a solution that can proactively protect our web application from public attacks.
        The solution should follow the OWASP Top 10 security standards. Additionally, the solution should
        proactively monitor and ensure that all cloud resources adhere to cloud security best practices and
        the bank's internal standards.
        In summary, we need a solution that can:
        • Protect the application from attacks by following OWASP Top 10 guidelines
        • Proactively monitor our AWS resources to ensure proper configuration as per cloud security best
        practices and the bank's standards
        • Help avoid exploitation of misconfigurations and coding vulnerabilities in the future
      `
  },
  {
    name: "Challenge 2 - Modernize Web Application on Cloud",
    prompt: `
        A bank's IT division wants to modernize their three-tiered web application from their on-premises
        servers to the AWS cloud. Their current on-premises setup includes Web servers that serve the
        website content and a MySQL database that stores the content.
        They have some issues with their application today:
        • Heavy traffic from marketing campaigns crashes the application
        • Manual application updates deployment risks to system availability
        • Have to take the site down in the midnight to deploy updates
        • No tool to monitor infrastructure and application status
        To provide a better experience for customers, they want t
      `
  },
  {
    name: "Challenge 3 - Talent Acquisition Search Application",
    prompt: `
        A bank’s HR division wants to Develop a model application to support the Bank Talent Acquisition
        (TA) team in finding suitable candidates from the existing CV database. The application will be built
        using modern technology, leveraging AWS cloud services, and harnessing the power of generative AI
        for conversational interaction with TA users.
        The application should have the following capabilities:
        • Automate data processing to handle unstructured data in various formats (PDF, Word, and Excel)
        for identification, sorting, and categorization into usable data.
        • Provide a simple front end for end users (TA) to input search queries, view response results, and list
        the top 5 Candidates in order of matching score. Candidate with higher suitability will displayed
        first, while less suitable ones will highlighted differently. TA users should be able to view aggregates
        such as the number of submitted CVs falling under enterprise development, average percentage of
        individuals with particular skills, etc.
      `
  },
  {
    name: "Challenge 4 - Customer Lifetime Value Optimization",
    prompt: `
        In today's interconnected digital landscape, businesses operate within complex ecosystems where
        data flows seamlessly across various platforms. The challenge is to leverage this wealth of data to
        enhance Customer Lifetime Value (CLV) systematically. Participants in this hackathon will explore
        innovative solutions to optimize CLV within a data ecosystem, fostering customer loyalty and
        sustained revenue growth
        In this hackathon, participants will leverage ecosystem’s fictionalized datasets to explore techniques
        for systematically enhancing CLV. Example focus areas include predicting high-value customer
        segments, optimizing cross-platform advertising, and crafting personalized recommendations to
        improve retention.
        Successful solutions will creatively harness the provided data to foster loyalty and sustained revenue
        growth. Participants can showcase machine learning, statistical modeling, or other analytical
        approaches within their proposals. However, business viability and intuitive interpretation of models
        are key evaluation criteria. They can simulate data to demonstrate challenges and build the
        prototype
      `
  },
  {
    name: `Challenge 5 - Customer 360`,
    prompt: `
        In the ecosystems, it’s challenging to obtain a holistic view of customer profiles (a single customer
          ID) across different subsidiaries and a view of customer interactions across different channels
          leading to fragmented data, inefficiencies in communication and missed opportunities for
          personalized engagement and cross-sell opportunities
          In this hackathon, participants will creatively create a comprehensive and accurate profile of each
          customer by aggregating data from various touchpoints. Participants can showcase how they design
          and create data models, build ETL pipelines and enrich data from different data sources by
          leveraging different database systems, big data platform and programing languages for data
          processing and transformation. They can simulate data to demonstrate challenges and build the
          prototype
      `
  },
  {
    name: `Challenge 6 - Design and Develop a Data Tokenization System`,
    prompt: `
        The goal of this challenge is to design and develop a robust data tokenization system capable of
        preserving the original format and statistical distribution of sensitive data while ensuring data
        security and compliance.
        The system should support the tokenization of the following data types:
        - Name
        - Email address
        - Phone number
        - Credit/debit card number
        - Date of birth
        - Identification number (e.g., Social Security Number, National ID)
        - Numeric data (e.g., account numbers, transaction IDs)
        The tokenization process must ensure that the original data format and statistical distribution are
        maintained after tokenization.
      `
  },
  {
    name: "Challenge 7 - Architecture Design Generator",
    prompt: `
        Everyday, there are projects/initiatives/developments which are initiated in the bank. Some of them are complex enough to require serious efforts to create the right design of the solution. 
        The design includes but is not limited to software architecture, integration architecture, data architecture, with consideration about security, maintainability, scalability, availability, etc. 
        This task is often done in collaboration between development teams and architecture team. However, due to limited capacity of the centralized architecture team, some projects might need to wait and could not be processed
        in expected time.
        To solve this problem, the bank wants to leverage the power of generative AI and open knowledge on Internet (for example: architecture blueprint shared by AWS, etc.) and on Intranet to help teams and architects generate the first draft of designs based on the description of the requirements.
      `
  }
]
