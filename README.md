# 🚀 T3_Gallery

A robust Next.js application built on the T3 Stack, featuring efficient file uploads, rate-limiting, and user analytics. The project is designed for performance, scalability, and secure operations with integrations like Drizzle ORM, Clerk, Upstash, PostHog, and Sentry. Deployed seamlessly on Vercel

## 🌟 Features

- T3 Stack: TypeScript-first development with Next.js, TailwindCSS, and tRPC.
- Database: Powered by Drizzle ORM for type-safe database queries.
- File Uploads: Secure and rate-limited uploads, locked down for unauthorized users.
- User Management: Authentication and user management via Clerk.
- Rate Limiting: Integrated Upstash Redis to control API request limits.
- Analytics: Advanced tracking and insights using PostHog.
- Error Monitoring: Real-time error tracking with Sentry.
- Deployment: Hosted and optimized on Vercel.

## Stack

| **Technology**    | **Description**                            |
| ----------------- | ------------------------------------------ |
| **Next.js**       | Framework for server-side rendering (SSR). |
| **tRPC**          | Type-safe API integration.                 |
| **Drizzle ORM**   | Database queries with strict typing.       |
| **Clerk**         | Authentication and user session handling.  |
| **Upstash Redis** | API rate limiting and caching.             |
| **PostHog**       | Analytics and user behavior tracking.      |
| **Sentry**        | Error monitoring and debugging.            |
| **Vercel**        | Scalable deployment platform.              |

## ⚙️ Installation and Setup

clone the github repo:

```bash
git clone https://github.com/AkramRamoul/gallery.git

cd galley
```

Install Dependencies:

```
npm install
```

Environment Variables: Create a .env file in the root directory with the following variables:

```
POSTGRES_URL=

POSTGRES_URL_NON_POOLING=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

UPLOADTHING_TOKEN=

NEXT_PUBLIC_POSTHOG_KEY=

UPSTASH_REDIS_REST_URL=

UPSTASH_REDIS_REST_TOKEN=
```

Run Database Migrations (using Drizzle ORM):

```
npm run db:push
```

Start the Development Server:

```
npm run dev

```

## Deployment

This project is deployed on Vercel for scalability and performance. To deploy:

    1. Push your code to a GitHub repository.
    2. Connect the repository to Vercel.
    3. Configure environment variables in Vercel's dashboard.
    4. Deploy the application!

## Analytics and Monitoring

PostHog

- Integrated for real-time analytics and user behavior tracking.
- To access, configure the API key in the .env file.
  Sentry
- Enables error tracking and performance monitoring.
- Ensure SENTRY_DSN is properly configured for full-stack error monitoring.

## Security Features

- Rate Limiting: Prevent API abuse using Upstash Redis.
- Locked Uploads: Ensure secure file handling with proper authorization checks.
- Authentication: Robust user sessions managed by Clerk.

## Contact

- Author: Akram Ramoul
- Email: ahmedakramramoul@gmil.com
- GitHub: AkramRamoul(https://github.com/AkramRamoul)
