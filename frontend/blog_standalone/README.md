# Standalone Blog/Stories Module

This directory contains all the necessary files to integrate the TravStory Blog (Stories) page into your project.

## Structure

- `src/pages/Stories.jsx`: The main page component.
- `src/components/stories/`: All UI components used by the Stories page.
- `src/utils/unsplash.js`: Utility for fetching dynamic photos (requires Unsplash API key).
- `public/`: Static assets (backgrounds and featured images).

## Integration Steps

1. **Copy Files**: Copy the `src` and `public` folders into your React project.
2. **Install Dependencies**: Ensure you have the following packages installed:
   ```bash
   npm install framer-motion lucide-react react-router-dom
   ```
3. **Configure Tailwind**: The components use Tailwind CSS. Make sure your `tailwind.config.js` includes the paths to these new components.
4. **Environment Variables**: Add your Unsplash Access Key to your `.env` file:
   ```env
   VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
   ```
5. **Add Route**: Import and use the `Stories` component in your router:
   ```jsx
   import Stories from './pages/Stories';
   // ... in your routes
   <Route path="/stories" element={<Stories />} />
   ```

## Note on Images
The `Stories` page uses some images from the `public/` directory. Ensure these are placed in your project's `public/` folder so they can be referenced as `/image_name.ext`.
