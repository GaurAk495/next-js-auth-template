# Next.js Auth Template

A comprehensive, production-ready authentication template built with **Next.js 16**, **Better Auth**, **Prisma**, and **PostgreSQL**. This project provides a solid foundation for building secure web applications with built-in email and social authentication.

## 🚀 Features

- **Authentication**: Complete auth system using [Better Auth](https://better-auth.com/).
  - Email & Password (Login, Register).
  - Social Login (Google, GitHub).
  - Email Verification.
  - Password Reset & Forgot Password flows.
  - Secure Session Management.
- **Database**: **PostgreSQL** managed via **Prisma ORM**.
- **Styling**: Modern UI with **Tailwind CSS v4**.
- **Email**: Transactional emails (Verification, Password Reset) using **Nodemailer** (configured for ZeptoMail).
- **Type Safety**: Full TypeScript support.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Auth**: [Better Auth](https://better-auth.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)

- **Email**: [Nodemailer](https://nodemailer.com/)

## 📂 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/       # Auth routes (login, register, etc.)
│   │   ├── (app)/        # Protected app routes
│   │   └── api/          # API routes
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities and configurations (Auth, Prisma, Email)
│   └── actions/          # Server actions
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
└── ...
```

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd next-js-auth-template
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Better Auth
BETTER_AUTH_SECRET="your-super-secret-key"
BETTER_AUTH_URL="http://localhost:3000" # or your production URL

# Social Auth Providers
NEXT_GOOGLE_CLIENT_ID="your-google-client-id"
NEXT_GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXT_GITHUB_CLIENT_ID="your-github-client-id"
NEXT_GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (ZeptoMail/Nodemailer)
NEXT_ZEPTO_HOST="smtp.zeptomail.com"
NEXT_ZEPTO_PORT="587"
NEXT_ZEPTO_USER="your-zepto-user"
NEXT_ZEPTO_PASS="your-zepto-password"
NEXT_FROM_EMAIL="noreply@yourdomain.com"
```

### 4. Database Setup

Generate the Prisma client and push the schema to your database:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (development)
npx prisma migrate dev --name init
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint.
- `npm run postinstall`: Generates Prisma client (runs automatically after install).
- `npm run migrate:prod`: Deploys Prisma migrations for production.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
