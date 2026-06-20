import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON parsing middleware with a generous payload limit (for Base64 image uploads)
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ limit: '20mb', extended: true }));

  const persistentStorePath = path.join(process.cwd(), 'src', 'persistent_store.json');

  // Load configuration
  app.get('/api/all-config', (req, res) => {
    try {
      if (fs.existsSync(persistentStorePath)) {
        const data = fs.readFileSync(persistentStorePath, 'utf-8');
        return res.json(JSON.parse(data));
      } else {
        return res.status(404).json({ error: 'Config file not found' });
      }
    } catch (error) {
      console.error('Error reading persistent configs:', error);
      return res.status(500).json({ error: 'Failed to read configurations' });
    }
  });

  // Save configuration
  app.post('/api/save-config', (req, res) => {
    try {
      const { siteConfig, fareConfig, reviews, photos, slides } = req.body;
      
      // Basic structure validation
      if (!siteConfig || !fareConfig || !reviews || !photos || !slides) {
        return res.status(400).json({ error: 'Missing required configuration sections' });
      }

      const updatedPayload = { siteConfig, fareConfig, reviews, photos, slides };
      fs.writeFileSync(persistentStorePath, JSON.stringify(updatedPayload, null, 2), 'utf-8');
      
      console.log('Site configurations persistently saved on server disk.');
      return res.json({ success: true });
    } catch (error) {
      console.error('Error saving persistent configs:', error);
      return res.status(500).json({ error: 'Failed to save configurations' });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MANS.PET full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
