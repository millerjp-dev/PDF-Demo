This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumptions

There are only 2 types of documents for each catagory, "changes" and "original"

## Design

Tradeoffs: Using a few 3rd party packages: 

"pdfjs-dist": "^4.8.69",
  Contains the worker for the pdf

"react-pdf": "^9.2.1",
  Used to display PDFs

"rxjs": "^7.8.2"
  Used for Subjects to easily connect distant/multiple components
  
"@mui/icons-material": "^7.3.4",
  Icons for styling


## Desicions
While I did use Material Icons, I decided to not use any 3rd party like Material-UI for components
I tried to make this component as expandable as possible, so it should be able to accept more types of documents without modification.

## Future Improvements:
Stop container of PDF from shifting when loading or changing pages initially
