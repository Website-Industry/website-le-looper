# Vercel Web Analytics Setup for Le Looper

This document describes how Vercel Web Analytics has been configured and integrated into the Le Looper website project.

## Overview

Vercel Web Analytics is integrated into the Le Looper website to track visitor behavior and page views. This guide provides information on how the analytics are set up and how to view the data in the Vercel dashboard.

## Prerequisites

- A Vercel account (create one at https://vercel.com/signup if needed)
- A Vercel project connected to this repository
- The Vercel CLI installed (optional, for local testing)

### Installing the Vercel CLI

If you want to use the Vercel CLI locally:

```bash
# Using pnpm
pnpm i -g vercel

# Using yarn
yarn global add vercel

# Using npm
npm i -g vercel

# Using bun
bun install -g vercel
```

## Current Setup

### Package Installation

The `@vercel/analytics` package has been added to the project dependencies:

```json
{
  "dependencies": {
    "@vercel/analytics": "^1.6.1"
  }
}
```

### Integration in HTML Files

Since this is a static HTML/CSS/JavaScript project, Vercel Web Analytics is implemented using the plain HTML approach. The following script has been added to all HTML files in the `<head>` section:

```html
<script defer src="/_vercel/insights/script.js"></script>
```

The script files are:
- `index.html` - Main landing page
- `valeurs.html` - Manifesto and values page
- `horizon-live-coding.html` - Horizon Live Coding format page
- `workflow.html` - Workflow format page

### How It Works

The `/_vercel/insights/script.js` script:
1. Automatically tracks page views
2. Collects visitor information (anonymously)
3. Sends telemetry data to Vercel's analytics servers
4. Respects privacy standards and compliance regulations

**Note:** When using the HTML script implementation, there is no route detection support, but the analytics will still track page views and visitor behavior.

## Enabling Web Analytics in Vercel Dashboard

### Step 1: Access the Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the Le Looper project

### Step 2: Enable Web Analytics

1. Click the **Analytics** tab in your project dashboard
2. Click **Enable** from the dialog box

**Important:** Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.

## Deploying the Project

To deploy the project to Vercel with analytics enabled:

```bash
vercel deploy
```

Or, if you have connected your Git repository:
- Push your changes to the main branch
- Vercel will automatically deploy your latest commits

Once deployed, the analytics script will start tracking visitors and page views.

## Viewing Analytics Data

### Step 1: Deploy Your Application

Make sure your application is deployed to Vercel and has received visitors.

### Step 2: Access the Analytics Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the Le Looper project
3. Click the **Analytics** tab

### Step 3: Explore Your Data

After a few days of visitors, you'll be able to:
- View visitor counts and page views
- Filter data by time period
- Analyze page performance
- Track user interactions

Users on Pro and Enterprise plans can also add [custom events](/docs/analytics/custom-events) to track specific user interactions such as:
- Button clicks
- Form submissions
- Link clicks to Discord, Instagram, or Facebook
- Event sign-ups

## Verification

### Network Verification

To verify that analytics are working correctly:

1. Deploy your application to Vercel
2. Visit any page on your website
3. Open your browser's Developer Tools (F12)
4. Go to the **Network** tab
5. Look for a request to `/_vercel/insights/view`
6. If you see this request, analytics are working correctly

## Privacy and Compliance

Vercel Web Analytics respects privacy standards and compliance regulations including:
- GDPR compliance
- CCPA compliance
- No personally identifiable information (PII) collection
- User data is anonymized

For more information, see the [Privacy and Compliance documentation](/docs/analytics/privacy-policy).

## Troubleshooting

### Analytics Not Showing Data

1. **Verify deployment**: Make sure your project is deployed to a Vercel domain
2. **Check the script**: Verify that `/_vercel/insights/script.js` is loading in your Network tab
3. **Wait for data**: It may take a few hours for data to appear in the dashboard
4. **Enable in dashboard**: Confirm that Web Analytics is enabled in your Vercel project settings

### Script Not Loading

If the `/_vercel/insights/script.js` script is not loading:

1. Check the browser console for errors
2. Verify your project is deployed to Vercel
3. Ensure Web Analytics is enabled in the Vercel dashboard
4. Try clearing your browser cache

## Next Steps

- [Learn how to use the @vercel/analytics package](/docs/analytics/package)
- [Learn how to set up custom events](/docs/analytics/custom-events)
- [Learn about filtering data](/docs/analytics/filtering)
- [Read about privacy and compliance](/docs/analytics/privacy-policy)
- [Explore pricing and limits](/docs/analytics/limits-and-pricing)
- [View troubleshooting guide](/docs/analytics/troubleshooting)

## Additional Resources

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Le Looper Website](https://www.lelooper.org)
- [Le Looper Discord Community](#) - See CONFIG in script.js for the Discord invite link

---

**Last updated:** January 2025
**Analytics Version:** @vercel/analytics@1.6.1
