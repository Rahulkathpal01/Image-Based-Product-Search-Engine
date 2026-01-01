# **App Name**: ImagoFind

## Core Features:

- Image Upload and Preview: Enable users to upload product images via React, with a live preview.
- AI-Powered Tag Extraction: Leverage Google Gemini Vision to analyze uploaded images and extract relevant object labels and attributes. Act as a tool by inferring the presence of tags.
- Catalog Indexing: Store extracted image tags and associated product metadata (descriptions, URLs, etc.) in MongoDB with text indexing for efficient search.
- Search API Endpoint: Create an Express.js API endpoint to handle image tag queries and match them against indexed product descriptions.
- Ranked Result Display: Present product search results in a responsive Ant Design grid, ranked by relevance based on tag matching.

## Style Guidelines:

- Primary color: Deep Blue (#1A535C) for a professional and trustworthy feel.
- Background color: Light Gray (#E8E8E8) for a clean and modern interface.
- Accent color: Orange (#F26419) for highlighting key elements like search buttons.
- Body and headline font: 'Inter' sans-serif font for a clean and modern aesthetic.
- Use clear, minimalist icons from Ant Design to represent categories and actions.
- Implement a responsive grid layout using Ant Design to ensure optimal viewing across devices.
- Incorporate subtle transition animations to enhance user experience during search and navigation.