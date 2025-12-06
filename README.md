# Job Board Dashboard

A job search application I built while learning React Query and advanced state management patterns. It lets you browse jobs, filter by category, and save interesting positions for later.

**[Live Demo](https://job-dasboard.vercel.app/)**

## What I Built

This started as a learning project for Week 4 of my full-stack developer journey, but I ended up building something I'm genuinely proud of. The app fetches real job listings from The Muse API and provides a smooth, responsive experience for browsing and saving jobs.

The most interesting challenge was managing state across URL parameters, React Query cache, and localStorage - making sure everything stayed in sync without over-complicating the code.

## Key Features

**Job Browsing**

- Browse thousands of real job listings
- Filter by 13 different categories (Engineering, Design, etc.)
- Pagination that actually works with browser back/forward buttons
- Every job has detailed information and direct application links

**Saving Jobs**

- Save jobs you're interested in with one click
- Your saved jobs persist in localStorage (they're still there after closing the browser)
- Unsave from anywhere - the UI updates everywhere automatically thanks to React Query

**The Little Things**

- Cards fade in one by one instead of popping in all at once
- Responsive design that actually works on mobile (tested down to iPhone SE)
- Smart back button that remembers where you came from
- Loading skeletons so you know something's happening
- Empty states that don't just say "no results" - they guide you to the next action

## Tech Stack

I chose this stack because I wanted to learn industry-standard tools:

- **React 18** with **TypeScript** - Type safety caught so many bugs before runtime
- **React Query** - Game changer for server state. The automatic caching and background refetching is magic
- **React Router v6** - URL state management was trickier than I expected, but now I understand why everyone uses URLs for state
- **Tailwind CSS** - For consistent design system and mobile-first responsive utilities
- **Vite** - Dev server that actually starts instantly

The API is from The Muse, which has real job data from actual companies.

## Project Structure

I organized the code into clear layers after realizing my first attempt was getting messy:

```
src/
├── api/           # Pure functions - no React here
├── hooks/         # React-specific logic
├── components/    # UI components
├── pages/         # Full page components
├── types/         # TypeScript interfaces
└── constants/     # Shared constants
```

This separation made it way easier to debug and test things in isolation.

## What I Learned

**React Query is powerful but has a learning curve**

Initially, I tried to manage everything with useState and useEffect. It worked, but keeping the UI in sync was a nightmare. React Query solved this by treating server data as a cache instead of local state. The automatic invalidation after mutations is brilliant.

**URL state management is underrated**

Putting the current page and filter in the URL seemed like extra work at first, but it made everything better:

- Users can bookmark specific searches
- Browser back/forward just works
- Sharing links is easy
- No complex state synchronization needed

**Mobile-first is the right approach**

I tested on mobile after building for desktop first and had to redo a bunch of stuff. Started over with iPhone SE as the baseline and worked up. Much better workflow.

**TypeScript saves time in the long run**

Yes, it slowed me down at first. But catching bugs at compile time instead of at 2 AM after deployment? Worth it.

## Getting Started

```bash
# Clone and install
git clone https://github.com/devolveo/job-dasboard.git
cd job-board
npm install

# Run development server
npm run dev
# Open http://localhost:5173
```

## Challenges I Solved

**The Pagination Bug**

Had a weird edge case where empty categories showed "Page 5 of 1" which makes no sense. Fixed it by hiding pagination when there are no results, but then realized that was inconsistent with my pattern of disabling (not hiding) unavailable features. Ended up keeping the pagination visible but disabled with "No pages" text.

**Animation Timing**

Cards were supposed to fade in with a stagger effect, but they all appeared at once. Turned out I was putting the animation delay on a wrapper div while the animation class was on the child. Once I moved them to the same element, it worked perfectly.

**Mobile Menu**

The burger menu appeared/disappeared instantly which felt jarring. Added a slide-down animation with CSS keyframes and made the burger icon rotate 90 degrees when opening. Small detail, but it makes a big difference.

## What's Next

This is the frontend piece. I'm planning to:

1. Build a Node.js backend with Express
2. Add user authentication
3. Store saved jobs in a PostgreSQL database
4. Add job application tracking
5. Maybe add real-time notifications when new jobs match your filters

## Running the Code

The project is pretty straightforward to run locally. Just make sure you have Node 20+ installed.

If you want to see it live, I deployed it to Vercel: **[your-deployment-url]**

## About Me

I'm a developer transitioning from IT infrastructure to full-stack development. I spent years working with PHP and messaging systems, and I'm bringing that backend knowledge to modern JavaScript frameworks.

**Connect with me:**

- Portfolio: [your-portfolio.com]
- LinkedIn: [your-linkedin]
- GitHub: [@yourusername]
- Email: your.email@example.com

## Credits

Built with guidance from Claude AI as my mentor. The Muse API provided all the job data. Tailwind made the styling actually fun.

---

This project represents about 20-25 hours of focused work over Week 4 of my learning journey. Not perfect, but it works well and taught me a ton about React ecosystem best practices.
