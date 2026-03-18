# Blog Structure

Your blog is ready! The `/blog/` page is live with a "coming soon" message. When you're ready to publish your first post, follow the instructions below.

## How to Add a New Blog Post

1. **Create a new folder** in `/blog/` with your post URL slug
   - Example: `/blog/how-to-choose-web-designer/`

2. **Copy the template files** from `/blog/example-post/`
   - Copy `index.html` to your new folder
   - Copy `post.css` to your new folder
   - (The example-post folder is just a template - it's not visible on the site)

3. **Update the HTML**
   - Change the `<title>` tag
   - Update meta description
   - Update canonical URL
   - Update Open Graph tags
   - Update Article schema (headline, datePublished, dateModified)
   - Replace example content with your actual blog post

4. **Add the post to the blog listing**
   - Edit `/blog/index.html`
   - Duplicate the `.blog-card` example
   - Update the date, title, description, and link

5. **Update the sitemap** (optional but recommended)
   - Add your new post URL to `/sitemap.xml`

## SEO Tips for Blog Posts

- **Titles**: Include your target keyword, keep under 60 characters
- **Meta descriptions**: Compelling summary, 150-160 characters
- **Headings**: Use H1 for title, H2 for main sections, H3 for subsections
- **Content length**: Aim for 800-1500 words for SEO value
- **Keywords**: Use naturally throughout, don't stuff
- **Images**: Add relevant images with alt text (coming soon)
- **Links**: Link to relevant pages on your site and external resources

## Recommended Blog Topics

### SEO/Technical
- "How to Choose a Web Designer in Melbourne"
- "Website Refresh vs Rebuild: Which Does Your Business Need?"
- "5 Signs Your Website Needs an Update in 2026"
- "What Makes a Website Fast? Performance Tips for Small Businesses"

### Design/UX
- "Web Design Trends Melbourne Businesses Should Know"
- "The ROI of Good Design: Why Investing in Your Website Pays Off"
- "Mobile-First Design: Why Your Website Must Work on Phones"
- "Color Psychology in Branding: Choosing the Right Palette"

### Business/Strategy
- "Do I Really Need a Custom Website? Template vs Custom Comparison"
- "How Long Does It Take to Build a Website? Timeline Breakdown"
- "Website Maintenance 101: What You Need to Keep Your Site Running"
- "Branding Basics: More Than Just a Logo"

### Local/Melbourne
- "Best Web Designers in Melbourne: What to Look For"
- "Supporting Local: Why Melbourne Businesses Choose Local Designers"
- "Melbourne Business Spotlight" (feature your clients)

## Design Notes

- The blog uses your existing site styles (`styles.css`)
- Individual posts have their own `post.css` for content formatting
- The design matches your site's aesthetic (dark background, light text, Instrument Serif for headings)
- Mobile responsive out of the box
