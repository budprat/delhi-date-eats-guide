# 🚀 Convex Setup Guide - Manual Steps

Since Convex requires interactive login, you'll need to complete these steps manually in your local terminal.

## Step 1: Initialize Convex (Interactive)

Open a new terminal in your project directory and run:

```bash
npm run convex:dev
```

This will prompt you to:

### First Time Setup
1. **Login to Convex**
   - You'll be asked: "Welcome to Convex! Would you like to login to your account?"
   - Press `y` to login
   - Your browser will open to authenticate
   - Sign up or sign in with GitHub, Google, or email

2. **Create a Project**
   - Choose: "Create a new project"
   - Project name: `delhi-date-eats-guide` (or your preferred name)

3. **Deploy**
   - Convex will automatically deploy your functions
   - You'll see output like:
   ```
   ✓ Deployment complete!
   ✓ Convex URL: https://xxxxxx.convex.cloud
   ```

4. **Copy Your Deployment URL**
   - Copy the URL that looks like: `https://xxxxx.convex.cloud`

## Step 2: Configure Environment Variables

1. Open `.env.local` in your project root
2. Add your Convex deployment URL:

```env
VITE_CONVEX_URL=https://your-deployment-url.convex.cloud
VITE_APP_URL=http://localhost:8080
```

**Important:** Replace `your-deployment-url` with the actual URL from Step 1!

## Step 3: Keep Convex Dev Running

Leave the terminal with `npm run convex:dev` running. This:
- Watches for changes in your `convex/` folder
- Auto-deploys updates
- Provides real-time logs
- Generates TypeScript types

You should see output like:
```
✓ 00:00:00 Convex dev server running
✓ Functions deployed
✓ Watching convex/ directory for changes...
```

## Step 4: Seed Your Database

### Option A: Using Convex Dashboard (Easiest)

1. Open your Convex dashboard: https://dashboard.convex.dev
2. Select your project: `delhi-date-eats-guide`
3. Go to **Functions** tab
4. Find `seedRestaurants:seedRestaurants`
5. Click **Run** button
6. You should see success message with 6 restaurants created

### Option B: Using CLI

In a new terminal (keep the dev server running):

```bash
npx convex run seedRestaurants:seedRestaurants
```

You should see:
```json
{
  "success": true,
  "message": "Successfully seeded restaurants",
  "count": 6,
  "ids": [...]
}
```

## Step 5: Verify Database

1. Go to your Convex dashboard
2. Click the **Data** tab
3. You should see your tables:
   - `restaurants` - 6 entries ✅
   - `users` - Empty (will populate when users sign up)
   - `favorites` - Empty
   - `reviews` - Empty
   - `bookings` - Empty
   - `datePlans` - Empty

4. Click on `restaurants` table to see your data

## Step 6: Start Your App

In another terminal window:

```bash
npm run dev
```

Your app should start at: http://localhost:8080

## Step 7: Test Everything

### Test 1: Verify Convex Connection
1. Open browser DevTools → Console
2. Navigate to http://localhost:8080
3. You should NOT see any Convex connection errors
4. Check Network tab for WebSocket connection to Convex

### Test 2: Sign Up
1. Click **Sign Up** in navbar
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: testpassword123
3. Click **Create Account**
4. You should be redirected to home page
5. Navbar should show your avatar

### Test 3: Check Database
1. Go back to Convex dashboard → Data tab
2. Click `users` table
3. You should see 1 entry with your test user! ✅

### Test 4: Sign In/Out
1. Click your avatar → Sign out
2. You should be signed out
3. Click **Sign In**
4. Enter your credentials
5. You should be signed back in ✅

## 🎯 Expected Terminal Output

When everything is working, you should have:

### Terminal 1: Convex Dev Server
```
✓ Convex dev server running
✓ Watching for changes in convex/
✓ Functions deployed:
  - restaurants:list
  - restaurants:get
  - restaurants:getRecommendations
  - users:createOrUpdateUser
  - bookings:createBooking
  [... and more]
```

### Terminal 2: Vite Dev Server
```
  VITE v5.4.1  ready in 500 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
```

## 🐛 Troubleshooting

### Issue: "Cannot find module 'convex/server'"
**Solution:** Make sure you've run `npm install` and Convex dev server is running

### Issue: App shows "Failed to fetch"
**Solution:**
1. Check `.env.local` has correct `VITE_CONVEX_URL`
2. Restart Vite dev server after changing `.env.local`
3. Make sure Convex dev server is running

### Issue: "VITE_CONVEX_URL is undefined"
**Solution:**
1. Create `.env.local` in project root (not in `src/`)
2. Add: `VITE_CONVEX_URL=https://your-url.convex.cloud`
3. Restart Vite: Stop and run `npm run dev` again

### Issue: Seed script doesn't work
**Solution:**
1. Make sure Convex dev server is running
2. Check dashboard for any function errors
3. Try running from dashboard Functions tab instead of CLI

### Issue: Browser shows blank page
**Solution:**
1. Open DevTools Console
2. Look for errors
3. Common fix: Restart both Convex and Vite servers

## 📋 Quick Reference

### Start Both Servers
```bash
# Terminal 1
npm run convex:dev

# Terminal 2 (new terminal)
npm run dev
```

### Stop Servers
- Press `Ctrl+C` in each terminal

### View Logs
- Convex logs: Terminal 1
- Vite logs: Terminal 2
- Function logs: Convex dashboard → Logs tab

### Useful Commands
```bash
# See all Convex functions
npx convex functions

# Clear all data (careful!)
npx convex run seedRestaurants:clearRestaurants

# Re-seed database
npx convex run seedRestaurants:seedRestaurants

# Deploy to production
npm run convex:deploy
```

## ✅ Success Checklist

After completing all steps, verify:

- [ ] `npm run convex:dev` is running without errors
- [ ] `.env.local` has correct `VITE_CONVEX_URL`
- [ ] Dashboard shows 6 restaurants in database
- [ ] `npm run dev` starts successfully
- [ ] Home page loads at http://localhost:8080
- [ ] Can sign up and see user in dashboard
- [ ] Can sign in and out
- [ ] Navbar shows user avatar when logged in

## 🎉 You're Ready!

Once all checks pass, you have:
- ✅ Real-time Convex database
- ✅ Working authentication
- ✅ 6 seeded restaurants
- ✅ Type-safe backend functions
- ✅ Development environment ready

**Next:** We can proceed to Phase 2 - Migrating pages to use Convex data!

---

Need help? Check:
- Convex Docs: https://docs.convex.dev
- Convex Discord: https://convex.dev/community
- Project setup guide: PHASE1_SETUP.md
