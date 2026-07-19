# Project Brief: The Boulders Shopping Centre Redesign

**Author:** Kabelo Mathapo  
**Course:** AI Software Engineering, Melsoft Academy  
**Company:** The Boulders Shopping Centre  
**Industry:** Retail and shopping centre  
**Current website:** https://boulders.co.za/  
**Live concept:** https://boulders-shopping-centre-2.vercel.app/

## 1. Which company did I choose?

I chose Boulders Shopping Centre, a retail centre on Old Pretoria Road in Midrand. The centre serves shoppers who need groceries, fashion, health and beauty services, food, banking, and other everyday services in one place.

## 2. How did I find the company?

I chose a business in the Midrand area because I wanted to redesign a place that I could understand from a local customer’s point of view. The Boulders is a recognisable centre in the area, so I could form an opinion based on the tasks a real shopper would try to complete instead of building a fictional business website.

## 3. Why did I choose this company specifically?

I chose The Boulders because the business has a clear local identity, but its current digital experience does not make the most important customer tasks easy enough. A shopping-centre website should quickly answer four questions: Is the centre open, is a specific store there, what is happening, and how do I get there? This gave me a practical redesign problem with clear improvements that I could demonstrate through code.

## 4. Why does the website need a redesign?

### 4.1 The page identity is too generic

The retrieved homepage is presented with the generic title “Redefine Retail” instead of leading with The Boulders Shopping Centre. This weakens search visibility and makes the centre feel like a section of a landlord website rather than a destination with its own identity.

### 4.2 Store discovery needs to be faster

A shopper should not have to scan a long directory to find one brand. My redesign adds instant search, category filters, floor filters, sorting, and an open-now option.

### 4.3 Important visit information needs to be visible

Trading hours, address, parking, and accessibility information should be easy to reach from any page. The redesign adds a live centre-status bar and a dedicated visit page.

### 4.4 Navigation should work on every screen size

The previous prototype hid its navigation on mobile without replacing it with a mobile menu. The React version includes an accessible responsive menu and consistent navigation across all routes.

### 4.5 The content needs clearer calls to action

Each page now has a specific job. The home page introduces the centre and guides users to the directory, events, or visit information. The directory helps users locate stores. The events page helps people plan a visit. The leasing page helps prospective tenants view concept units and make an enquiry.

### 4.6 Business claims must be trustworthy

The first prototype included figures and testimonials that had not been verified. I removed or labelled these as concept data. A real client should confirm tenant information, event dates, unit availability, rental figures, footfall statistics, contact details, and testimonials before publication.

## 5. What did I build?

I rebuilt the concept as a Vite React application styled with Tailwind CSS. I focused on the tasks people are most likely to complete on a shopping-centre website:

- finding a store quickly
- checking whether the centre or a store is open
- seeing upcoming activities
- planning a visit
- viewing leasing opportunities

The project uses reusable components for the header, footer, layout, buttons, section headings, cards, and icons. React hooks manage the theme, live South African time, search, filters, sorting, mobile navigation, and form feedback. React Router connects the pages without duplicating layout code.

## 6. Design direction

I kept the earth-toned visual character of the original concept and developed it into one consistent system:

- porcelain and bone backgrounds for warmth
- brass accents for identity and calls to action
- deep ink surfaces for contrast
- Unbounded for display headings
- Inter for readable body copy
- JetBrains Mono for status labels and data
- rounded cards, subtle borders, and restrained motion

The visual direction is intended to feel local, modern, and more memorable than a generic corporate mall template.

## 7. How the redesign addresses the problems

| Problem | Solution in the redesign |
| --- | --- |
| Generic page identity | Clear Boulders branding, titles, and metadata |
| Difficult store discovery | Controlled React search, categories, floors, sorting, and open-now filter |
| Poor mobile navigation | Responsive menu with accessible controls |
| Important hours buried | Live status bar and dedicated visit page |
| Repeated page code | Shared React layout and components |
| Static DOM scripting | React state and derived data |
| Risky unsupported claims | Removed, softened, or clearly labelled as concept data |
| Route refresh risk on Vercel | SPA rewrite configuration |

## 8. Technical approach

- Vite
- React functional components
- React hooks
- React Router
- Tailwind CSS
- Responsive layouts for mobile, tablet, and desktop
- Accessible labels, focus states, landmarks, and controls
- Local theme persistence
- Vercel deployment configuration

## 9. Research references

- Official website: https://boulders.co.za/
- The original Boulders website and the supplied prototype files were used as the starting point for this project.

