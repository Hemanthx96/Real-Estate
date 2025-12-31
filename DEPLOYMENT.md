# Step-by-Step Guide to Deploy on Vercel

## Prerequisites
- GitHub account (free)
- Vercel account (free)

## Method 1: Deploy via Vercel Dashboard (Recommended - Easiest)

### Step 1: Initialize Git Repository
```bash
# Initialize git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Real estate website"
```

### Step 2: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `real-estate-website` (or any name you prefer)
   - Make it **Public** or **Private** (both work)
   - **Don't** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Push your code to GitHub:**
   ```bash
   # Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/real-estate-website.git
   
   # Rename branch to main (if needed)
   git branch -M main
   
   # Push to GitHub
   git push -u origin main
   ```

### Step 3: Deploy to Vercel

1. **Sign up/Login to Vercel:**
   - Go to https://vercel.com
   - Sign up or log in (you can use GitHub to sign in)

2. **Import your project:**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select your GitHub repository (`real-estate-website`)
   - Click "Import"

3. **Configure your project:**
   - **Framework Preset:** Vite (should auto-detect)
   - **Root Directory:** ./ (leave as default)
   - **Build Command:** `npm run build` (should be auto-filled)
   - **Output Directory:** `dist` (should be auto-filled)
   - **Install Command:** `npm install` (should be auto-filled)

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)
   - Your site will be live at `your-project-name.vercel.app`

### Step 4: Custom Domain (Optional)
- Go to your project settings on Vercel
- Click "Domains"
- Add your custom domain if you have one

---

## Method 2: Deploy via Vercel CLI (Alternative)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
# From your project directory
vercel

# For production deployment
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- Project name? (Press enter for default)
- Directory? `./` (Press enter)
- Override settings? **No**

---

## Important Notes

1. **Build Output:** Vite builds to the `dist` folder by default, which Vercel recognizes automatically.

2. **Environment Variables:** If you add environment variables later, you can add them in Vercel Dashboard → Project Settings → Environment Variables.

3. **Automatic Deployments:** 
   - Every push to your main branch will automatically trigger a new deployment
   - Vercel creates a preview URL for every pull request

4. **Free Tier Limits:**
   - 100GB bandwidth per month
   - Unlimited deployments
   - Automatic HTTPS
   - Global CDN

5. **Updating your site:**
   ```bash
   # Make changes to your code
   git add .
   git commit -m "Update website"
   git push
   # Vercel will automatically redeploy!
   ```

---

## Troubleshooting

**Build fails?**
- Make sure `package.json` has the build script
- Check that all dependencies are in `package.json`
- Review build logs in Vercel dashboard

**404 errors?**
- Make sure `index.html` is in the root directory
- Check that the build output directory is `dist`

**Styles not loading?**
- Verify CSS file paths are correct
- Check that all assets are in the public folder (if using any)

