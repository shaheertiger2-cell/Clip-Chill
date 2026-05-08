export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

export const blogs: Record<string, BlogMeta> = {
  'best-cheap-haircut-mississauga': {
    slug: 'best-cheap-haircut-mississauga',
    title: 'The Ultimate Guide to Finding the Best Cheap Haircut in Mississauga',
    description: 'Looking for a high-quality yet affordable haircut in Mississauga? Discover why Clip & Chill is the #1 rated spot for the best cheap haircut in Mississauga.',
    category: 'Local Guide',
    date: '2026-03-05',
  },
  'best-barber-shop-erin-mills': {
    slug: 'best-barber-shop-erin-mills',
    title: 'Best Barber Shop in Erin Mills: What to Look For',
    description: "Moving to Erin Mills or tired of inconsistent cuts? Here's exactly what separates a great barbershop from the rest — and why Clip & Chill consistently tops the list.",
    category: 'Local Guide',
    date: '2026-05-08',
  },
  'skin-fade-vs-taper-fade': {
    slug: 'skin-fade-vs-taper-fade',
    title: "Skin Fade vs Taper Fade: What's the Difference and Which Should You Get?",
    description: "Skin fade or taper fade? Most guys aren't sure what to ask for. Here's a clear breakdown of the difference — and how to pick the right one for your hair and lifestyle.",
    category: 'Grooming Guide',
    date: '2026-05-08',
  },
  'how-often-should-men-get-a-haircut': {
    slug: 'how-often-should-men-get-a-haircut',
    title: "How Often Should Men Get a Haircut? A Barber's Honest Answer",
    description: "The honest answer depends on your style and hair type. Our barbers break down exactly how often you should be in the chair — and what happens when you wait too long.",
    category: 'Grooming Guide',
    date: '2026-05-08',
  },
  'best-haircuts-for-men-mississauga': {
    slug: 'best-haircuts-for-men-mississauga',
    title: 'Best Haircuts for Men in Mississauga Right Now',
    description: "From skin fades to textured crops — the styles Mississauga men are booking most in 2025, what each works best on, and how to ask for it at the barber.",
    category: 'Style Guide',
    date: '2026-05-08',
  },
  'beard-trim-guide': {
    slug: 'beard-trim-guide',
    title: 'Beard Trim Guide: Keeping Your Beard Sharp Between Barber Visits',
    description: "A shaped beard looks great for about a week. Here's how to maintain it at home — and when it's time to let your barber take over.",
    category: 'Grooming Guide',
    date: '2026-05-08',
  },
  'barber-shop-near-erin-mills-town-centre': {
    slug: 'barber-shop-near-erin-mills-town-centre',
    title: 'Barber Shop Near Erin Mills Town Centre: Everything You Need to Know',
    description: "If you're near Erin Mills Town Centre and need a great barber, here's everything — location, parking, services, and how to book.",
    category: 'Local Guide',
    date: '2026-05-08',
  },
  'mens-haircut-cost-mississauga': {
    slug: 'mens-haircut-cost-mississauga',
    title: "How Much Does a Men's Haircut Cost in Mississauga? (2025 Guide)",
    description: "Haircut prices in Mississauga range from $20 to $80+. Here's a clear breakdown of what each tier actually gets you — and what a fair price looks like for the quality.",
    category: 'Pricing Guide',
    date: '2026-05-08',
  },
};

export const blogList = Object.values(blogs).sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
