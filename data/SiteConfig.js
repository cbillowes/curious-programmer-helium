module.exports = {
  siteTitle: "Curious Programmer", // Site title.
  siteTitleShort: "{ curious }", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Curious Programmer", // Alternative site title for SEO.
  siteLogo: "/images/logos/logo.png", // Logo used for SEO and manifest.
  siteUrl: "https://curiousprogrammer.io", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  blogPostDir: "posts", // The name of directory that contains your posts.
  defaultOgImage: "/images/og/default-og-image.png",
  siteDescription: "A curious place for a curious mind.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/feed.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "UA-77127562-2", // GA tracking ID.
  disqusShortname: "curious-programmer", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userName: "Clarice Bouwer", // Username to display in the author segment.
  userTwitter: "cbillowes", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Johannesburg, South Africa", // User location to display in the author segment.
  userAvatar: "https://en.gravatar.com/userimage/34549463/acc6b8778c7b14437b7590078012302e.png?size", // User avatar to display in the author segment.
  userDescription:
    "I am a curious software developer eager to share what I learn with you.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/Vagr9K/gatsby-advanced-starter",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/Vagr9K",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:vagr9k@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};
