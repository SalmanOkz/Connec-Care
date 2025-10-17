This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

file structure
.
├── public                              -> Stores assets like images, accessible by the web server
├── src
│   ├── @core                           -> Template's core files
│   ├── @layouts                        -> Template's layout files
│   ├── @menu                           -> Template's menu files
│   ├── app                             -> App router to handle the template's routings
│   ├── assets                          -> Static assets, like Svg
│   ├── components                      -> Reusable components for the users
│   ├── configs                         -> Configuration files
│   │   ├── i18n.ts                     -> i18n configurations
│   │   ├── primaryColorConfig          -> Primary color configurations
│   │   └── themeConfig.ts              -> Template configurations
│   ├── contexts                        -> Your context files go here
│   ├── data                            -> Data files (navigation structure, search data, etc.)
│   │   ├── dictionaries                -> Translation data for localization
│   │   ├── navigation                  -> Vertical & Horizontal static navigation menu data
│   │   └── searchData.ts               -> Data related to search
│   ├── fake-db                         -> A mock database setup, usually for testing or development purposes
│   ├── hocs                            -> Higher Order Components
│   ├── hooks                           -> Custom hooks
│   |   └── useIntersection             -> Hook to detect when an element enters the viewport - used only for the front pages
│   ├── libs                            -> External libraries Third party libraries
│   │   ├── styles                      -> Styles for third party libraries
│   │   ├── ApexCharts                  -> Renders charts in client side
│   │   ├── Recharts                    -> Renders charts in client side
│   │   ├── ReactPlayer                 -> Renders video player in client side
│   │   └── auth.ts                     -> Authentication using NextAuth.js
│   ├── prisma                          -> Prisma ORM files, including database schema
│   │   ├── migrations                  -> Database schema change history
│   │   ├── dev.db                      -> SQLite database
│   │   └── schema.prisma               -> Model and schema definitions for Prisma
|   ├── redux-store                     -> Redux Store setup
|   |   └── ReduxProvider.tsx           -> Redux provider
|   |   └── index.ts                    -> Central Redux store configuration, combines all reducers and configures middleware
|   |   └── slices                      -> Redux slices (individual pieces of state)
│   ├── remove-translation-scripts      -> Script for removing translations from the template
│   ├── types                           -> Type definitions
│   ├── utils                           -> Utility functions
│   └── views                           -> Files that are included in app folder
├── .editorconfig                       -> Configuration file for the editor
├── .env.example                        -> Example environment variables file
├── .eslintrc.js                        -> ESLint configurations (Linting code)
├── .gitignore                          -> Specifies intentionally untracked files to ignore
├── .npmrc                              -> Configuration for npm
├── .prettierrc.json                    -> Prettier configuration for code formatting
├── .stylelintrc.json                   -> Stylelint configuration for style files
├── next.config.mjs                     -> Configuration file for Next.js
├── package.json                        -> Lists dependencies and project metadata
├── pnpm-lock.yaml                      -> Lock file for pnpm, ensuring consistent installations
├── postcss.config.mjs                   -> Configuration for PostCSS.
├── tailwind.config.ts                  -> Configuration for Tailwind CSS
└── tsconfig.json                       -> TypeScript configuration file
Api folder structure
app
├── [lang]                      -> A dynamic folder for language-specific content, adaptable based on different
|   |                              language codes.
│   ├── (blank-layout-pages)    -> Contains pages that use a blank layout, typically for minimalistic pages like login
│   ├── (dashboard)             -> Houses the main template pages, central to your admin interface
│   ├── [...not-found]          -> A catch-all directory for handling 404 or 'page not found' scenarios
│   ├── layout.tsx              -> The main layout component, which wraps all pages
├── api                         -> Central location for API-related scripts and services
│   ├── auth                    -> Authentication-related scripts and services
│   └── login                   -> Specific scripts or functions related to the login process
├── globals.css                 -> A CSS file that contains global styles applicable across the entire application
└── favicon.ico                 -> The application's favicon 


### Dashboard page is in file
SRC->Compunents->layouts->vertical->verticalmenu.tsx

## also documentation link each and every thing is included in this documentation
https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation/docs/guide/overview/getting-started/
