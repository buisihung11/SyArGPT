<div align="center"><a name="readme-top"></a>

[![][image-banner]][deployment-link]

<br/>

# SyArGPT

An AI Application that generates diagram from user system requirements

</div>

## 👋🏻 Getting Started

### Requirements

-   Generate System Architecture from User requirements
-   Follow AWS Well Architecture
-   Can export result to **drawio** or **Mermaid**
-   Support **justification/explanation** where user can add more input from first result
-   Leverage the power of generative AI and
    -   open knowledge on Internet (for example: architecture blueprint shared by AWS, etc.)
    -   on Intranet
-   The design output must consider the security, maintainability, scalability,...

## ✨ Features

### General process

[![][general-process]][deployment-link]

### App Screenshot

[![][app-screenshot]][deployment-link]

### `1` Generate diagram from prompt

### `2` Justify result from system

### `3` Export result to draw.io or mermaid format

### `4` Generate explanation/document for diagram

### `5` Generate code templates (Terraform) able to run plan based on design

### `6` Import knowledge base

### `7` Cost estimation

### `8` Authentication

- [ ] Setup Clerk, SignIn and SignOut Page
- [ ] Setup Clerk with Supabase DB

## 🧱 Technologies

-   **Frontend**: Next.js, TypeScript TailwindCSS, ShadCN
-   **Backend**: Python, AWS Lambda, TypeScript, LangChain
-   **Service**: AWS EC2, AWS Bedrock, AWS S3, AWS Lambda, AWS API Gateway

## Setup local

### 1. Authentication

#### 1.1 Clerk

TODO

#### 1.2 Integrate Clerk with Supabase (Optional)

Since we used Clerk as a separate auth library in this project, there are some additional steps need to setup in order to work with Supabase if we want to use the RLS (Row Level Security) of PostgreQL

1. Setup a custom JWT Template for Clerk
2. Setup Supabase client to use the custom JWT to auth the request
3. Create RLS policy 

See how to setup Clerk with Supabase [here](https://clerk.com/docs/integrations/databases/supabase)

#### 1.3 Create webhook for Clerk

To create User data in our own database (Supabase), we will use Webhook feature of Clerk to create user data whenever a new user is created within Clerk

See how to setup [here](https://clerk.com/docs/integrations/webhooks/sync-data)


### 2. Database

In this project we will use **Supabase** as database provider for PostgreQL and **Prisma** library as DatabaseORM 

#### 2.1 Setup Supabase

TODO

#### 2.2 Setup Prisma

See how to setup Prisma with Supabase [here](https://supabase.com/partners/integrations/prisma) 

## ⌨️ Development

### System Architecture

[![][system-arch]][deployment-link]

### Component Architect

[![][component-arch]][deployment-link]

TODO

## Contributors

-   [buisihung11](https://github.com/buisihung11)
-   [tangthienan1](https://github.com/tangthienan1)
-   [hdduytran](https://github.com/hdduytran)

[image-banner]: https://github.com/buisihung11/SyArGPT/blob/main/assets/banner.png?raw=true
[component-arch]: https://github.com/buisihung11/SyArGPT/blob/main/assets/ComponentArchitect.png?raw=true
[deployment-link]: https://syargpt.vercel.app
[system-arch]: https://github.com/buisihung11/SyArGPT/blob/main/assets/system-architecture.png?raw=true
[general-process]: https://github.com/buisihung11/SyArGPT/blob/main/assets/general-process.png?raw=true
[app-screenshot]: https://github.com/buisihung11/SyArGPT/blob/main/assets/app-screenshot.jpeg?raw=true
