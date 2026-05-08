export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationService {
  name: string;
  price: string;
  duration: string;
}

export interface LocationPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  neighborhood: string;
  tagline: string;
  driveTime: string;
  distanceNote: string;
  intro: string;
  localContext: string;
  directions: string;
  highlights: string[];
  faqs: LocationFAQ[];
}

export const SERVICES_LIST: LocationService[] = [
  { name: 'Haircut', price: '$30', duration: '30 min' },
  { name: 'Beard Trim', price: '$25', duration: '15 min' },
  { name: 'Haircut & Beard', price: '$50', duration: '45 min' },
  { name: "Kid's Cut (Under 10)", price: '$25', duration: '30 min' },
  { name: 'Hot Towel Shave', price: '$25', duration: '30 min' },
  { name: 'Clip & Chill Package', price: '$110', duration: '90 min' },
];

export const locations: Record<string, LocationPageData> = {
  'barber-erin-mills': {
    slug: 'barber-erin-mills',
    metaTitle: 'Barber in Erin Mills | Clip & Chill — Your Neighbourhood Barber',
    metaDescription:
      'Clip & Chill is your neighbourhood barber in Erin Mills, Mississauga. Right on Erin Mills Pkwy — 5-star rated, walk-ins welcome. Book online today.',
    h1: 'Your Barber in Erin Mills',
    neighborhood: 'Erin Mills',
    tagline: "We're not near Erin Mills — we're in Erin Mills.",
    driveTime: 'In your neighbourhood',
    distanceNote: '4099 Erin Mills Pkwy #4',
    intro:
      "Clip & Chill isn't just close to Erin Mills — we're right in it. Our barbershop sits on Erin Mills Pkwy, the main artery of the neighbourhood, making us the most convenient option for residents who want a high-quality cut without driving across town.",
    localContext:
      "Erin Mills is one of Mississauga's most established and family-friendly communities. It's a neighbourhood built around convenience — and a barbershop should be no different. Whether you live near Erin Mills Town Centre, along The Collegeway, or closer to Folkway Dr, we're just minutes away.",
    directions:
      "We're at 4099 Erin Mills Pkwy #4, in the plaza on the east side of Erin Mills Pkwy just south of Folkway Dr. Free parking is directly in front. From most parts of Erin Mills, it's a 3–7 minute drive.",
    highlights: [
      'Located directly on Erin Mills Pkwy — heart of the neighbourhood',
      '5.0 Google rating with 406 reviews from Erin Mills residents and beyond',
      'Walk-ins welcome — no appointment needed',
      'Open 7 days: Mon–Sat 10am–8pm, Sun 11am–7pm',
      'Free parking in the plaza lot',
      'Precision fades, beard sculpting, hot towel shaves & more',
    ],
    faqs: [
      {
        question: 'Is Clip & Chill located inside Erin Mills?',
        answer:
          "Yes — we're at 4099 Erin Mills Pkwy #4, directly on the main road through Erin Mills. You don't need to leave the neighbourhood for a great cut.",
      },
      {
        question: 'Do I need an appointment as an Erin Mills resident?',
        answer:
          "Walk-ins are welcome every day. We'd recommend booking online through Squire on weekends to skip any wait, but during the week you can usually walk right in.",
      },
      {
        question: "What's the closest barbershop to Erin Mills Town Centre?",
        answer:
          'Clip & Chill is less than 2 minutes from Erin Mills Town Centre by car, heading south on Erin Mills Pkwy past Folkway Dr.',
      },
      {
        question: 'What haircut styles are popular with Erin Mills clients?',
        answer:
          'Skin fades and taper fades are our most requested styles across all age groups. We also do a lot of kids\' cuts, beard combos, and the full Clip & Chill Package for clients who want the complete grooming experience.',
      },
      {
        question: 'How much does a haircut cost in Erin Mills at Clip & Chill?',
        answer:
          'Haircuts start at $30. Beard trims are $25. The combo is $50. Kids\' cuts (under 10) are $25. Full pricing is on our booking page.',
      },
    ],
  },

  'barber-mississauga': {
    slug: 'barber-mississauga',
    metaTitle: 'Barber in Mississauga | Clip & Chill — Rated #1 in the City',
    metaDescription:
      'Looking for a barber in Mississauga? Clip & Chill is the city\'s top-rated barbershop — 406 five-star reviews. Erin Mills Pkwy. Walk-ins welcome.',
    h1: 'Barber in Mississauga',
    neighborhood: 'Mississauga',
    tagline: "Mississauga's top-rated barbershop — 406 five-star reviews and counting.",
    driveTime: 'Central Mississauga location',
    distanceNote: 'Serving all of Mississauga',
    intro:
      "Clip & Chill is Mississauga's most-reviewed barbershop, with a perfect 5.0 Google rating across 406+ reviews. We're based in Erin Mills — a central, accessible location that clients from Streetsville, Churchill Meadows, Meadowvale, Port Credit, and beyond make the trip for.",
    localContext:
      "Mississauga is a city of neighbourhoods, each with its own character. Whether you're coming from the east end near Square One, from the west near Streetsville, or from the north near Meadowvale — we're centrally located on Erin Mills Pkwy with easy access from Eglinton Ave, The Collegeway, and Dundas St W.",
    directions:
      "Find us at 4099 Erin Mills Pkwy #4. From the QEW or Hwy 403, take the Erin Mills Pkwy exit and head north — we're in the plaza just south of Folkway Dr. From the 401, take Erin Mills Pkwy south. Free parking on-site.",
    highlights: [
      'Most-reviewed barbershop in Mississauga — 406 Google reviews',
      'Perfect 5.0 star rating — consistent, repeatable quality',
      'Central Erin Mills location — accessible from across the city',
      'Walk-ins welcome, appointments preferred on weekends',
      'All services: cuts, fades, beard trims, hot towel shaves',
      'Online booking via Squire — ready in under 60 seconds',
    ],
    faqs: [
      {
        question: 'What is the best barbershop in Mississauga?',
        answer:
          'By Google review count and rating, Clip & Chill at 4099 Erin Mills Pkwy is the top-rated barbershop in Mississauga — 406 reviews at a perfect 5.0.',
      },
      {
        question: 'Where in Mississauga is Clip & Chill?',
        answer:
          "We're in the Erin Mills neighbourhood at 4099 Erin Mills Pkwy #4, Mississauga ON L5L 3P9. It's a 10–20 minute drive from most areas of Mississauga.",
      },
      {
        question: 'Do you serve clients from all over Mississauga?',
        answer:
          "Yes — we regularly see clients from Streetsville, Port Credit, Churchill Meadows, Meadowvale, Clarkson, and Lakeview. Many drive 15–25 minutes specifically to visit us.",
      },
      {
        question: 'Is there easy parking at your Mississauga barbershop?',
        answer:
          'Yes — there is a free parking lot directly in front of our shop in the plaza on Erin Mills Pkwy. No paid parking or street hunting.',
      },
      {
        question: 'Are you open on weekends in Mississauga?',
        answer:
          "Yes — Monday to Saturday 10am–8pm and Sunday 11am–7pm. We're one of the few shops in Mississauga open 7 days with extended hours.",
      },
    ],
  },

  'barber-streetsville': {
    slug: 'barber-streetsville',
    metaTitle: 'Barber near Streetsville | Clip & Chill — 8 Min from the Village',
    metaDescription:
      'Barber near Streetsville, Mississauga. Clip & Chill is 8 minutes away on Erin Mills Pkwy — 5-star rated, expert fades. Walk-ins welcome. Book online.',
    h1: 'Barber near Streetsville',
    neighborhood: 'Streetsville',
    tagline: '8 minutes from Streetsville village — the sharpest cut in the area.',
    driveTime: '~8 min from Streetsville',
    distanceNote: 'via Eglinton Ave W',
    intro:
      "If you're in Streetsville and looking for a genuinely great haircut, Clip & Chill is your closest premium option — just 8 minutes west along Eglinton Ave W onto Erin Mills Pkwy. It's a short drive that Streetsville regulars make every few weeks.",
    localContext:
      "Streetsville is one of Mississauga's most charming neighbourhoods — a walkable village with a strong local identity. But when it comes to barbershops, proximity doesn't always mean quality. Clip & Chill sits just west on Erin Mills Pkwy and consistently outranks every option closer to the village.",
    directions:
      "From Streetsville, head west on Queen St S or Eglinton Ave W. Turn left (south) onto Erin Mills Pkwy. We're at 4099 Erin Mills Pkwy #4, in the plaza on your left just south of Folkway Dr. The drive is about 8 minutes from the heart of Streetsville.",
    highlights: [
      '~8 minute drive from Streetsville village centre',
      'Easy route: Eglinton Ave W to Erin Mills Pkwy',
      'Free parking directly at the shop',
      'Rated 5.0 with 406 Google reviews',
      'Precision fades, beard sculpting & classic cuts',
      'Walk-ins welcome Mon–Sun',
    ],
    faqs: [
      {
        question: 'How far is Clip & Chill from Streetsville?',
        answer:
          'About 8 minutes by car — head west on Eglinton Ave W and turn south onto Erin Mills Pkwy. We\'re in the plaza just south of Folkway Dr.',
      },
      {
        question: 'Is there a good barbershop in Streetsville itself?',
        answer:
          "There are a few options in Streetsville, but Clip & Chill — just 8 minutes away on Erin Mills Pkwy — is consistently the highest-rated barbershop in the area with 406 five-star Google reviews.",
      },
      {
        question: 'Can I walk in from Streetsville without an appointment?',
        answer:
          'Yes — walk-ins are welcome every day. During weekday mornings and early afternoons, waits are usually minimal. Weekends are busier, so booking ahead is smart.',
      },
      {
        question: 'What route should I take from Streetsville to Clip & Chill?',
        answer:
          'Take Eglinton Ave W west to Erin Mills Pkwy. Turn left and head south. Look for the plaza on your left — 4099 Erin Mills Pkwy #4. Free parking in the lot.',
      },
      {
        question: 'Do many Streetsville clients come to Clip & Chill?',
        answer:
          'Yes — we have a number of regular clients from Streetsville who make the 8-minute drive specifically for the quality and consistency of our cuts.',
      },
    ],
  },

  'barber-churchill-meadows': {
    slug: 'barber-churchill-meadows',
    metaTitle: 'Barber near Churchill Meadows | Clip & Chill — 10 Min Away',
    metaDescription:
      'Barber near Churchill Meadows, Mississauga. Clip & Chill is 10 minutes away — 5-star rated, precision fades, walk-ins welcome. Book online today.',
    h1: 'Barber near Churchill Meadows',
    neighborhood: 'Churchill Meadows',
    tagline: '10 minutes from Churchill Meadows — Mississauga\'s top-rated barbershop.',
    driveTime: '~10 min from Churchill Meadows',
    distanceNote: 'via Eglinton Ave W',
    intro:
      "Churchill Meadows residents don't have to go far for a standout haircut. Clip & Chill is about 10 minutes west via Eglinton Ave W — close enough to make it a regular stop, with quality that makes it worth the drive.",
    localContext:
      "Churchill Meadows is a large, modern Mississauga neighbourhood with a mix of families and professionals. The area has grown significantly, and residents have high expectations for the services they use. Clip & Chill meets that bar — a modern, clean, skilled barbershop that delivers every time.",
    directions:
      "From Churchill Meadows, head west on Eglinton Ave W past Winston Churchill Blvd. Continue west until you reach Erin Mills Pkwy. Turn left (south). We're at 4099 Erin Mills Pkwy #4, in the plaza on the left just south of Folkway Dr. About 10 minutes from most parts of Churchill Meadows.",
    highlights: [
      '~10 minute drive from Churchill Meadows',
      'Simple route: Eglinton Ave W west to Erin Mills Pkwy',
      'Precision fades, beard sculpting & kids\' cuts',
      '5.0 Google rating — 406 verified reviews',
      'Walk-ins welcome every day of the week',
      'Free parking — no stress, no meters',
    ],
    faqs: [
      {
        question: 'How far is Clip & Chill from Churchill Meadows?',
        answer:
          "About 10 minutes by car heading west on Eglinton Ave W and then south on Erin Mills Pkwy. We're at 4099 Erin Mills Pkwy #4.",
      },
      {
        question: 'Is there a barbershop closer to Churchill Meadows?',
        answer:
          "There are some options in the area, but Clip & Chill — 10 minutes west — is the highest-rated barbershop in this part of Mississauga, with 406 five-star Google reviews.",
      },
      {
        question: 'Do you do kids\' haircuts for Churchill Meadows families?',
        answer:
          "Absolutely. Kids' cuts are $25 for children under 10. We're a popular choice for families in Churchill Meadows, with patient and experienced barbers for younger clients.",
      },
      {
        question: 'What are the hours? Can I go before or after work?',
        answer:
          "We're open Monday to Saturday 10am–8pm and Sunday 11am–7pm. Our 8pm close on weekdays makes it easy to drop in after work.",
      },
      {
        question: 'Do I need to book ahead from Churchill Meadows?',
        answer:
          "Walk-ins are always welcome. For a guaranteed time, especially on weekends, booking via Squire is easy and takes under a minute.",
      },
    ],
  },

  'barber-utm': {
    slug: 'barber-utm',
    metaTitle: 'Barber near UTM | Clip & Chill — 10 Min from Campus',
    metaDescription:
      'Barber near University of Toronto Mississauga (UTM). Clip & Chill is 10 min from campus — expert fades, $30 cuts, walk-ins welcome. Book online today.',
    h1: 'Barber near UTM',
    neighborhood: 'University of Toronto Mississauga',
    tagline: '10 minutes from UTM — the campus barbershop that actually delivers.',
    driveTime: '~10 min from UTM campus',
    distanceNote: 'via Mississauga Rd or Erin Mills Pkwy',
    intro:
      "UTM students and staff don't have to settle for whatever's on campus or head downtown for a proper haircut. Clip & Chill is just 10 minutes from UTM on Erin Mills Pkwy — a quick drive or bus ride for a cut that's worth making the trip.",
    localContext:
      "The University of Toronto Mississauga campus draws students from across the GTA who often aren't familiar with the surrounding area. Clip & Chill is the standout option nearby — a modern, welcoming barbershop with fair pricing and barbers who deliver consistently sharp results whether you're on a student schedule or not.",
    directions:
      "From UTM, head north on Mississauga Rd to Eglinton Ave W and turn left, then right onto Erin Mills Pkwy — or take Mississauga Rd north and merge onto Erin Mills Pkwy directly. We're at 4099 Erin Mills Pkwy #4. About 10 minutes from the main campus gates. MiWay bus routes also run along Erin Mills Pkwy.",
    highlights: [
      '~10 minute drive from UTM main campus',
      'Accessible by MiWay transit on Erin Mills Pkwy',
      'Precision fades, textured cuts & classic styles',
      'Haircuts from $30 — fair and transparent pricing',
      'Walk-ins welcome — no membership or loyalty card needed',
      '5.0 Google rating with 406 reviews',
    ],
    faqs: [
      {
        question: 'How far is Clip & Chill from UTM?',
        answer:
          "About 10 minutes by car from the main UTM campus via Mississauga Rd north to Erin Mills Pkwy. We're at 4099 Erin Mills Pkwy #4.",
      },
      {
        question: 'Can I get there from UTM by transit?',
        answer:
          'Yes — MiWay bus routes run along Erin Mills Pkwy. Check the MiWay trip planner for current routes from UTM to the Erin Mills Pkwy/Folkway Dr area.',
      },
      {
        question: 'Is there student pricing at Clip & Chill?',
        answer:
          "We keep our pricing straightforward: haircuts from $30, beard trims $25. No separate student tier — just honest pricing that's already competitive.",
      },
      {
        question: 'Can UTM students walk in without booking?',
        answer:
          'Absolutely — walk-ins welcome every day. Weekday afternoons tend to be less busy. If you have a specific time that works around your schedule, booking via Squire takes under a minute.',
      },
      {
        question: 'What styles do UTM students usually get?',
        answer:
          'Skin fades and taper fades are most popular, often combined with scissor work on top. We work with all hair textures — straight, wavy, curly, and coily.',
      },
    ],
  },

  'barber-oakville': {
    slug: 'barber-oakville',
    metaTitle: 'Barber near Oakville | Clip & Chill — 15 Min from the Border',
    metaDescription:
      'Barber near Oakville, ON. Clip & Chill in Mississauga is 15 min from the Oakville border — 5-star rated, expert fades & cuts. Walk-ins welcome. Book now.',
    h1: 'Barber near Oakville',
    neighborhood: 'Oakville border area',
    tagline: '15 minutes from north Oakville — worth every minute of the drive.',
    driveTime: '~15 min from Oakville',
    distanceNote: 'via Erin Mills Pkwy or Dundas St W',
    intro:
      "Oakville has barbershops, but Clip & Chill — just 15 minutes away in Erin Mills, Mississauga — consistently offers something hard to find locally: a modern, expert barbershop with a perfect Google rating and no compromise on quality. For north Oakville residents, it's a short drive that's quickly become a regular trip.",
    localContext:
      "North Oakville and the Mississauga border area (around Dundas St W and Ninth Line) are just a short drive from Clip & Chill. Residents in communities like Preserve, Rural Oakville, or along Dundas St can reach us in 12–18 minutes depending on starting point.",
    directions:
      "From north Oakville, take Erin Mills Pkwy north into Mississauga. We're at 4099 Erin Mills Pkwy #4 — about 12–15 minutes north of Dundas St. Alternatively, take Dundas St W into Mississauga and head north on Erin Mills Pkwy. Free parking in the plaza lot.",
    highlights: [
      '~15 minute drive from north Oakville via Erin Mills Pkwy',
      'Free parking on-site — no hassle',
      '5.0 Google rating with 406 reviews',
      'Precision fades, beard sculpting & hot towel shaves',
      'Walk-ins welcome Mon–Sun',
      'Open late: Mon–Sat until 8pm',
    ],
    faqs: [
      {
        question: 'How far is Clip & Chill from Oakville?',
        answer:
          "From north Oakville near Dundas St W and Ninth Line, it's about 12–15 minutes north on Erin Mills Pkwy. We're at 4099 Erin Mills Pkwy #4 in Mississauga.",
      },
      {
        question: 'Why do Oakville clients drive to Clip & Chill?',
        answer:
          "Our 406 five-star Google reviews speak for themselves. Clients from Oakville regularly tell us it's worth the short drive for the consistency and quality they can't find closer to home.",
      },
      {
        question: 'What route should I take from Oakville to Clip & Chill?',
        answer:
          'Take Erin Mills Pkwy north from Dundas St W into Mississauga. We\'re in the plaza on the right side of Erin Mills Pkwy, just south of Folkway Dr. Free parking in the lot.',
      },
      {
        question: 'Are walk-ins available for Oakville clients?',
        answer:
          'Yes — walk-ins are welcome every day. If you\'re making the drive from Oakville, booking ahead via Squire means you go straight to the chair with no wait.',
      },
      {
        question: 'What services are available that justify the Oakville drive?',
        answer:
          "Precision skin fades, beard sculpting with hot towel, hot towel shaves, grooming facials, kids' cuts — and the full Clip & Chill Package ($110) for clients who want the complete experience.",
      },
    ],
  },

  'barber-meadowvale': {
    slug: 'barber-meadowvale',
    metaTitle: 'Barber near Meadowvale | Clip & Chill — 10 Min South on Erin Mills Pkwy',
    metaDescription:
      'Barber near Meadowvale, Mississauga. Clip & Chill is 10 min south on Erin Mills Pkwy — 5-star rated, precision cuts. Walk-ins welcome. Book online today.',
    h1: 'Barber near Meadowvale',
    neighborhood: 'Meadowvale',
    tagline: '10 minutes south on Erin Mills Pkwy — and well worth it.',
    driveTime: '~10 min from Meadowvale',
    distanceNote: 'via Erin Mills Pkwy',
    intro:
      "For Meadowvale residents, Clip & Chill is a 10-minute drive straight down Erin Mills Pkwy — one of the most direct commutes to a top-rated barbershop in Mississauga. No detours, no highway. Just a straight shot south to a barbershop that consistently delivers.",
    localContext:
      "Meadowvale is a well-established Mississauga neighbourhood with a mix of families, young professionals, and long-time residents who have high standards. Clip & Chill has become the go-to for many Meadowvale clients who want a precision cut without making the longer trip to Mississauga's busier corridors.",
    directions:
      "From Meadowvale, head south on Erin Mills Pkwy. Continue south past The Collegeway and Folkway Dr — we're in the plaza on your right at 4099 Erin Mills Pkwy #4. The drive is straightforward and takes about 10 minutes from most parts of Meadowvale. Free parking in the lot.",
    highlights: [
      '~10 minute straight drive south on Erin Mills Pkwy',
      'No highway — simple, direct route',
      'Free parking directly in front of the shop',
      '5.0 Google rating with 406 reviews',
      'Skin fades, beard trims, kids\' cuts & more',
      'Open 7 days a week — early morning to 8pm',
    ],
    faqs: [
      {
        question: 'How far is Clip & Chill from Meadowvale?',
        answer:
          "About 10 minutes south on Erin Mills Pkwy. We're at 4099 Erin Mills Pkwy #4 — it's a simple, direct drive with no highway needed.",
      },
      {
        question: 'Is there a good barbershop in Meadowvale itself?',
        answer:
          "There are a few options in the Meadowvale area, but Clip & Chill — 10 minutes south — is the highest-rated barbershop in this part of Mississauga with 406 five-star Google reviews.",
      },
      {
        question: 'Can Meadowvale clients walk in?',
        answer:
          "Yes — walk-ins are welcome every day. Given the short drive, it's easy to check availability and walk in during quieter periods (weekday mornings and early afternoons).",
      },
      {
        question: "What's the best way to get to Clip & Chill from Meadowvale?",
        answer:
          'Head south on Erin Mills Pkwy. Pass The Collegeway and continue south past Folkway Dr. The plaza is on your right — 4099 Erin Mills Pkwy #4. Free parking.',
      },
      {
        question: 'Do Meadowvale families bring their kids to Clip & Chill?',
        answer:
          "Yes — kids' cuts are $25 for under-10s and we see a lot of Meadowvale families. Our barbers are patient and experienced with younger clients.",
      },
    ],
  },
};
