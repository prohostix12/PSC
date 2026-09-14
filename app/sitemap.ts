import { MetadataRoute } from 'next';
import getClientPromise from '../lib/mongodb';
import { blogSlug } from './lib/blogUtils';
import { eventSlug } from './lib/eventUtils';
import { programSlug } from './lib/programUtils';
import { getSiteUrl } from './lib/getSiteUrl';

const DB_NAME = 'psc';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl() || '';
  
  const sitemapUrls: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/about-psc`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/blogs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteUrl}/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/notification`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${siteUrl}/success-stories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/refer-and-earn`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/courses/ai-integrated-accounting-taxation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/courses/ai-integrated-digital-marketing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/courses/business-administration-hospital-management`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  try {
    const client = await getClientPromise();
    const db = client.db(DB_NAME);

    // Fetch Programs
    const programs = await db.collection('programs').find({}).toArray();
    programs.forEach(program => {
      if (program.name) {
        sitemapUrls.push({
          url: `${siteUrl}/courses/${programSlug(String(program.name))}`,
          lastModified: program.createdAt ? new Date(program.createdAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    });

    // Fetch Blogs
    const blogs = await db.collection('blogs').find({}).toArray();
    blogs.forEach(blog => {
      if (blog.subject) {
        sitemapUrls.push({
          url: `${siteUrl}/blogs/${blogSlug(String(blog.subject))}`,
          lastModified: blog.createdAt ? new Date(blog.createdAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });

    // Fetch Events
    const events = await db.collection('events').find({}).toArray();
    events.forEach(event => {
      if (event.eventName) {
        sitemapUrls.push({
          url: `${siteUrl}/events/${eventSlug(String(event.eventName))}`,
          lastModified: event.createdAt ? new Date(event.createdAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  } catch (error) {
    console.error('Error generating sitemap dynamic routes:', error);
  }

  return sitemapUrls;
}
