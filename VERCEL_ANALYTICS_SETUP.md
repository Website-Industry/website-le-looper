# Getting started with Vercel Web Analytics

This guide will help you get started with using Vercel Web Analytics on your project, showing you how to enable it, add the package to your project, deploy your app to Vercel, and view your data in the dashboard.

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
- The Vercel CLI installed. If you don't have it, you can install it using the following command:

```bash
# Using pnpm
pnpm i vercel

# Using yarn
yarn i vercel

# Using npm
npm i vercel

# Using bun
bun i vercel
```

## Enable Web Analytics in Vercel

On the [Vercel dashboard](/dashboard), select your Project and then click the **Analytics** tab and click **Enable** from the dialog.

> **💡 Note:** Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.

## Add `@vercel/analytics` to your project

Using the package manager of your choice, add the `@vercel/analytics` package to your project:

```bash
# Using pnpm
pnpm i @vercel/analytics

# Using yarn
yarn i @vercel/analytics

# Using npm
npm i @vercel/analytics

# Using bun
bun i @vercel/analytics
```

## Integration for Static HTML Sites

For plain HTML sites like this project, add the following script to your `.html` files:

```html
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

> **💡 Note:** When using the HTML implementation, there is no need to install the `@vercel/analytics` package if you're only using the script tag. However, there is no route support.

### Recommended: Using the `inject` Function

For better integration with module bundlers and modern JavaScript workflows, you can use the `inject` function. This approach is recommended if your site uses a build process.

1. Create or update `analytics.js`:

```javascript
import { inject } from '@vercel/analytics';
inject();
```

2. Add the script tag to your HTML files:

```html
<script type="module" src="analytics.js"></script>
```

> **💡 Note:** There is no route support with the `inject` function.

## Deploy your app to Vercel

Deploy your app using the following command:

```bash
vercel deploy
```

If you haven't already, we also recommend [connecting your project's Git repository](https://vercel.com/docs/git#deploying-a-git-repository), which will enable Vercel to deploy your latest commits to main without terminal commands.

Once your app is deployed, it will start tracking visitors and page views.

> **💡 Note:** If everything is set up properly, you should be able to see a Fetch/XHR request in your browser's Network tab from `/_vercel/insights/view` when you visit any page.

## View your data in the dashboard

Once your app is deployed, and users have visited your site, you can view your data in the dashboard.

To do so, go to your [dashboard](https://vercel.com/dashboard), select your project, and click the **Analytics** tab.

After a few days of visitors, you'll be able to start exploring your data by viewing and [filtering](https://vercel.com/docs/analytics/filtering) the panels.

Users on Pro and Enterprise plans can also add [custom events](https://vercel.com/docs/analytics/custom-events) to their data to track user interactions such as button clicks, form submissions, or purchases.

## Privacy and Compliance

Learn more about how Vercel supports [privacy and data compliance standards](https://vercel.com/docs/analytics/privacy-policy) with Vercel Web Analytics.

## Next steps

Now that you have Vercel Web Analytics set up, you can explore the following topics to learn more:

- [Learn how to use the `@vercel/analytics` package](https://vercel.com/docs/analytics/package)
- [Learn how to set custom events](https://vercel.com/docs/analytics/custom-events)
- [Learn about filtering data](https://vercel.com/docs/analytics/filtering)
- [Read about privacy and compliance](https://vercel.com/docs/analytics/privacy-policy)
- [Explore pricing](https://vercel.com/docs/analytics/limits-and-pricing)
- [Troubleshooting](https://vercel.com/docs/analytics/troubleshooting)

## Le Looper Project Configuration

This project uses Vercel Web Analytics with the `inject()` function approach. The configuration is as follows:

- **Analytics Package**: `@vercel/analytics` (v1.6.1 or later)
- **Implementation**: Using the `inject()` function in `analytics.js`
- **Integration**: Script tag in HTML files (`<script type="module" src="analytics.js"></script>`)
- **Data Collection**: Automatic page views and user interactions tracking
- **Dashboard**: Available at [Vercel Dashboard](https://vercel.com/dashboard)

### Current Implementation

The project currently has:
1. `@vercel/analytics` installed as a dependency
2. `analytics.js` file with the `inject()` function call
3. Script tag in HTML files to load the analytics module

This configuration automatically collects:
- Page views
- Navigation events
- User interactions
- Performance metrics

No additional configuration is required to start collecting analytics data once deployed to Vercel.
