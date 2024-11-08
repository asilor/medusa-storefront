### Prerequisites

Ensure that you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/asilor/medusa-storefront
```

2. Navigate to the project directory:

```bash
cd medusa-storefront
```

3. Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project directory. Add the necessary environment variables.

```plaintext
VITE_MEDUSA_BACKEND_URL=
VITE_MEDUSA_PUBLISHABLE_KEY=
```

### Running in Development

Start the development server:

```bash
npm run dev
```

This will start the application at http://localhost:5173.

### Deployment

By commiting the changes the application will be automatically deployed.