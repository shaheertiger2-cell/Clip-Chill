export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServicePageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  intro: string;
  price: string;
  duration: string;
  keyFeatures: string[];
  faqs: ServiceFAQ[];
}

export const services: Record<string, ServicePageData> = {
  'barber-shop-mississauga': {
    slug: 'barber-shop-mississauga',
    metaTitle: 'Barber Shop Mississauga | Clip & Chill — 5-Star Rated',
    metaDescription:
      'Top-rated barber shop in Mississauga. Precision haircuts, skin fades, beard trims & more. 406 five-star Google reviews. Walk-ins welcome — book online today.',
    h1: 'Barber Shop in Mississauga',
    tagline: "Mississauga's most-reviewed barbershop — 406 five-star Google reviews.",
    intro:
      "Clip & Chill is a modern barbershop at 4099 Erin Mills Pkwy in Mississauga. We specialize in precision fades, classic men's haircuts, beard sculpting, and hot towel shaves — all in a relaxed, welcoming atmosphere. Whether you walk in or book ahead, you'll leave looking sharp.",
    price: 'From $30',
    duration: '30–45 min',
    keyFeatures: [
      'Precision haircuts for all hair types & textures',
      'Skin fades, taper fades & classic scissor cuts',
      'Beard sculpting & hot towel straight razor shave',
      'Walk-ins welcome — appointments preferred on weekends',
      'Online booking via Squire — takes 60 seconds',
      'Clean, modern atmosphere — relaxing from start to finish',
    ],
    faqs: [
      {
        question: 'Where is Clip & Chill Barbershop in Mississauga?',
        answer:
          "We're at 4099 Erin Mills Pkwy #4, Mississauga, ON L5L 3P9 — just off the Erin Mills Pkwy and Folkway Dr intersection, minutes from Erin Mills Town Centre. Free parking is in the plaza lot.",
      },
      {
        question: 'How much does a haircut cost at Clip & Chill?',
        answer:
          "A standard men's haircut is $30. Beard trims are $25. The Haircut & Beard Combo is $50. Kids' cuts (under 10) are $25. The full Clip & Chill Package is $110.",
      },
      {
        question: 'Do you accept walk-ins?',
        answer:
          'Yes — walk-ins are welcome every day based on availability. To guarantee your spot, especially on weekends, we recommend booking online through Squire.',
      },
      {
        question: 'What are your hours?',
        answer: "Monday to Saturday 10am–8pm, Sunday 11am–7pm. We're open 7 days a week.",
      },
      {
        question: "Do you do kids' haircuts?",
        answer:
          "Absolutely. Kids' cuts for children under 10 are $25. Our barbers are patient and experienced with younger clients, including first-timers.",
      },
    ],
  },

  'barbershop-erin-mills': {
    slug: 'barbershop-erin-mills',
    metaTitle: 'Barber Shop Erin Mills | Clip & Chill — #1 Rated',
    metaDescription:
      'Best barbershop in Erin Mills, Mississauga. Precision fades, beard trims & hot towel shaves. 406 five-star Google reviews. Walk-ins welcome — book online.',
    h1: 'Barber Shop in Erin Mills',
    tagline: "Erin Mills' #1 rated barbershop — 400+ five-star Google reviews.",
    intro:
      'Located right on Erin Mills Pkwy, Clip & Chill is the neighbourhood barbershop that Erin Mills residents trust. We deliver precision cuts and grooming services in a relaxed, modern atmosphere — every single time.',
    price: 'From $30',
    duration: '30–45 min',
    keyFeatures: [
      'Right on Erin Mills Pkwy — easy free parking',
      "Precision fades & classic men's cuts",
      'Beard sculpting & grooming treatments',
      'Hot towel shaves & skincare facials',
      'Walk-ins welcome every day of the week',
      'Minutes from Erin Mills Town Centre',
    ],
    faqs: [
      {
        question: 'Is Clip & Chill the best barber in Erin Mills?',
        answer:
          'With a 5.0 Google rating across 406+ reviews, Clip & Chill consistently ranks as the top-rated barbershop in Erin Mills. Clients travel from across Mississauga to visit us.',
      },
      {
        question: 'Where exactly is the barbershop in Erin Mills?',
        answer:
          "We're at 4099 Erin Mills Pkwy #4 — in the plaza on Erin Mills Pkwy, south of Folkway Dr. There's a free parking lot directly in front of the shop.",
      },
      {
        question: 'Do I need an appointment for a haircut in Erin Mills?',
        answer:
          'Walk-ins are always welcome. For guaranteed availability — especially Fridays and Saturdays — we recommend booking online through Squire.',
      },
      {
        question: 'What haircut styles do you specialize in?',
        answer:
          'We specialize in skin fades, taper fades, scissor cuts, buzz cuts, and classic pompadours. Our barbers work with all hair textures including thick, curly, and fine hair.',
      },
      {
        question: 'Are you open on weekends in Erin Mills?',
        answer:
          "Yes — we're open Monday to Saturday 10am–8pm and Sunday 11am–7pm. Booking ahead is recommended for weekend visits.",
      },
    ],
  },

  'mens-haircut-mississauga': {
    slug: 'mens-haircut-mississauga',
    metaTitle: "Men's Haircut Mississauga | Clip & Chill Barbershop",
    metaDescription:
      "Professional men's haircuts in Mississauga from $30. Precision cuts, fades & classic styles. 406 five-star Google reviews. Walk-ins welcome — book at Clip & Chill.",
    h1: "Men's Haircut in Mississauga",
    tagline: "Sharp, precise, every time. Mississauga's favourite men's cut studio.",
    intro:
      "At Clip & Chill, every men's haircut is a precision service — not a quick assembly line. Your barber consults with you on hair type, face shape, and style goals before picking up the scissors. The result speaks for itself.",
    price: '$30',
    duration: '30 min',
    keyFeatures: [
      'Personal consultation before every cut',
      'Scissors & clipper work for a natural, blended finish',
      'Suitable for all hair textures — straight, wavy, curly',
      'Hot towel & straight razor neck shave included',
      'Clean, precise lines every single visit',
      'Classic styles to modern cuts — we do it all',
    ],
    faqs: [
      {
        question: "How much does a men's haircut cost in Mississauga?",
        answer:
          "At Clip & Chill, a standard men's haircut is $30. Long haircuts are $35. The Haircut & Beard Combo is $50.",
      },
      {
        question: "How long does a men's haircut take?",
        answer:
          'Most cuts take 30 minutes. More detailed styles or longer hair may take up to 45 minutes.',
      },
      {
        question: 'Do your barbers work with curly or textured hair?',
        answer:
          'Yes — our barbers are experienced with all hair types: straight, wavy, curly, coily, and everything in between.',
      },
      {
        question: 'What should I bring to my appointment?',
        answer:
          'Just yourself. A reference photo helps if you have a style in mind — but our barbers are great at working from a description too.',
      },
      {
        question: 'Is there parking near Clip & Chill in Mississauga?',
        answer:
          "Yes — there's a free parking lot directly in front of the shop at 4099 Erin Mills Pkwy #4.",
      },
    ],
  },

  'skin-fade-mississauga': {
    slug: 'skin-fade-mississauga',
    metaTitle: 'Skin Fade Mississauga | Expert Fades at Clip & Chill',
    metaDescription:
      'Precision skin fade in Mississauga at Clip & Chill. Rated 5.0 ⭐ with 406 reviews. Low, mid & high fades. All hair textures. Walk-ins welcome — book online.',
    h1: 'Skin Fade in Mississauga',
    tagline: 'Precision skin fades, taper fades & drop fades — dialled in every time.',
    intro:
      "The skin fade is our most-requested service — and for good reason. Our barbers dial in the perfect gradient from skin to length, leaving a clean, sharp finish that holds up for weeks. Whether you want a low, mid, or high fade, we've got you covered.",
    price: '$30',
    duration: '30 min',
    keyFeatures: [
      'Low, mid & high fades available',
      'Skin fade, taper fade & drop fade options',
      'Works with all hair textures — including curly & coily',
      'Razor-sharp lines & seamlessly blended finish',
      'Can be combined with scissor work on top',
      'Included in the standard $30 haircut — no upcharge',
    ],
    faqs: [
      {
        question: 'What is the difference between a skin fade and a taper fade?',
        answer:
          'A skin fade goes all the way down to bare skin (zero guard), while a taper fade blends to a very short length without going fully bald. Both create a clean gradient effect.',
      },
      {
        question: 'How often should I get a fade?',
        answer:
          'Most clients come back every 2–4 weeks to keep their fade looking sharp. Skin fades grow out more visibly, so every 2–3 weeks is ideal.',
      },
      {
        question: 'Do you offer skin fades for curly hair?',
        answer:
          'Absolutely. Our barbers are trained on all hair textures — including thick, coily, and curly hair, as well as high-top fades and textured crop fades.',
      },
      {
        question: 'Can I book a skin fade online?',
        answer:
          'Yes — book a "Haircut" via Squire and let your barber know you want a skin fade when you arrive. No extra charge for the fade style.',
      },
      {
        question: "What's the price of a skin fade at Clip & Chill?",
        answer:
          'The skin fade is included in our standard $30 haircut. No upcharge for the style.',
      },
    ],
  },

  'beard-trim-mississauga': {
    slug: 'beard-trim-mississauga',
    metaTitle: 'Beard Trim Mississauga | Clip & Chill Barbershop',
    metaDescription:
      'Professional beard trim & sculpting in Mississauga from $25. Hot towel & straight razor finish. 406 five-star Google reviews. Walk-ins welcome — book now.',
    h1: 'Beard Trim in Mississauga',
    tagline: 'From stubble to full beard — sculpted to complement your face shape.',
    intro:
      "A well-groomed beard makes all the difference. At Clip & Chill, our beard trims aren't just a quick tidy-up — they're a full sculpting service. We shape, line, and detail your beard to complement your face shape and hair length.",
    price: '$25',
    duration: '15 min',
    keyFeatures: [
      'Full beard sculpt & shaping with scissors and clipper',
      'Hot towel treatment to prep skin & soften hair',
      'Straight razor lines on neck & cheek line',
      'Beard oil & moisturizer applied at finish',
      'Works for all beard lengths and densities',
      'Combine with a haircut for $50 — most popular pairing',
    ],
    faqs: [
      {
        question: 'How much does a beard trim cost in Mississauga?',
        answer:
          'A standalone beard trim at Clip & Chill is $25. The Haircut & Beard Combo is $50 — our most popular service pairing.',
      },
      {
        question: 'What does a beard trim include?',
        answer:
          'Our beard trim includes a hot towel prep, full beard sculpt and shaping, straight razor work on the neckline and cheek line, and a moisturizing oil finish.',
      },
      {
        question: 'Do you do beard trims without a haircut?',
        answer:
          'Yes — standalone beard trims are available at $25 and take about 15 minutes.',
      },
      {
        question: 'Can you shape a beard for my face shape?',
        answer:
          'Absolutely. Our barbers assess your face shape and sculpt the beard to balance and enhance your features — oval, square, round, or otherwise.',
      },
      {
        question: 'Do you do hot towel shaves in Mississauga?',
        answer:
          'Yes — we offer full hot towel straight razor shaves at $25. This is a separate service from the beard trim and includes a complete face shave.',
      },
    ],
  },

  'kids-haircut-mississauga': {
    slug: 'kids-haircut-mississauga',
    metaTitle: "Kids Haircut Mississauga | Clip & Chill — Children Welcome",
    metaDescription:
      "Kids' haircuts in Mississauga — $25 for children under 10. Patient, experienced barbers at Clip & Chill, Erin Mills. Walk-ins welcome — book online today.",
    h1: "Kids' Haircut in Mississauga",
    tagline: "Patient, friendly & precise — a great first barbershop experience.",
    intro:
      "We love cutting kids' hair. Our barbers are patient, calm, and experienced with younger clients — including first-timers. Kids' cuts at Clip & Chill are $25 for children under 10, and we take the time to make sure every child leaves happy.",
    price: '$25',
    duration: '30 min',
    keyFeatures: [
      'Kids under 10 — $25',
      'Patient, experienced barbers with younger clients',
      'First-haircut experience handled with care',
      'Any style: buzz cut, fade, scissor cut or taper',
      'Clean, modern & welcoming space',
      'Walk-ins welcome — book ahead on busy weekends',
    ],
    faqs: [
      {
        question: "How much does a kids' haircut cost in Mississauga?",
        answer:
          "A kids' haircut for children under 10 is $25 at Clip & Chill. Standard adult pricing applies for ages 10 and up.",
      },
      {
        question: 'Are your barbers experienced with kids?',
        answer:
          'Yes — we regularly cut hair for younger kids, including first-timers. Our barbers are patient and calm with children who may be nervous or fidgety.',
      },
      {
        question: "What age does the kids' rate apply to?",
        answer:
          "The $25 kids' rate applies to children under 10. For older children and teens, the standard $30 haircut rate applies.",
      },
      {
        question: "Do I need to book ahead for a kids' haircut?",
        answer:
          'Walk-ins are welcome, but we recommend booking online to avoid waits — especially on weekends when the shop is busiest.',
      },
      {
        question: 'What styles can kids get?',
        answer:
          'We do everything for kids: buzz cuts, scissor cuts, fades, and taper cuts. Parents are welcome to bring a reference photo.',
      },
    ],
  },

  'haircut-erin-mills-town-centre': {
    slug: 'haircut-erin-mills-town-centre',
    metaTitle: 'Haircut near Erin Mills Town Centre | Clip & Chill',
    metaDescription:
      'Haircut near Erin Mills Town Centre, Mississauga. Clip & Chill Barbershop is a 2-min drive away — 5.0 stars, 406 reviews. Walk in or book online today.',
    h1: 'Haircut near Erin Mills Town Centre',
    tagline: 'The top-rated barbershop closest to Erin Mills Town Centre.',
    intro:
      "Shopping at Erin Mills Town Centre and need a sharp haircut nearby? Clip & Chill is a 2-minute drive away at 4099 Erin Mills Pkwy. Walk in before or after your shopping — no appointment needed.",
    price: 'From $30',
    duration: '30 min',
    keyFeatures: [
      '2 minutes from Erin Mills Town Centre by car',
      'Free parking in the plaza lot — no stress',
      'Walk-ins welcome Monday through Sunday',
      'Precision fades, beard trims & classic cuts',
      '5.0 Google rating with 400+ reviews',
      'Open 7 days a week — long hours',
    ],
    faqs: [
      {
        question: 'What is the closest barbershop to Erin Mills Town Centre?',
        answer:
          'Clip & Chill at 4099 Erin Mills Pkwy #4 is approximately 2 minutes from Erin Mills Town Centre by car — the closest high-rated barbershop to the mall.',
      },
      {
        question: 'Is Clip & Chill walking distance from Erin Mills Town Centre?',
        answer:
          "It's about a 10–15 minute walk from the Town Centre, or a quick 2-minute drive south on Erin Mills Pkwy. Free parking is available at the shop.",
      },
      {
        question: 'Can I walk in without an appointment near Erin Mills Town Centre?',
        answer:
          "Yes — walk-ins are welcome daily. For weekend visits, booking ahead via Squire ensures you don't have to wait.",
      },
      {
        question: 'What are the hours of the barbershop near Erin Mills Town Centre?',
        answer:
          "Monday to Saturday 10am–8pm, Sunday 11am–7pm. We're open every day of the week.",
      },
      {
        question: 'What services are available near Erin Mills Town Centre?',
        answer:
          "We offer haircuts ($30), beard trims ($25), haircut & beard combos ($50), kids' cuts ($25), hot towel shaves ($25), and the full Clip & Chill Package ($110).",
      },
    ],
  },

  'walk-in-barber-mississauga': {
    slug: 'walk-in-barber-mississauga',
    metaTitle: 'Walk-In Barber Mississauga | Clip & Chill — Open Daily',
    metaDescription:
      'Walk-in barber in Mississauga at Clip & Chill. No appointment needed — open 7 days a week. Expert fades & precision cuts. 406 five-star reviews. Visit today.',
    h1: 'Walk-In Barber in Mississauga',
    tagline: 'No appointment? No problem. Walk in any day and get a great cut.',
    intro:
      "Clip & Chill welcomes walk-ins every day of the week. While booking ahead guarantees your spot, we always do our best to accommodate walk-in clients. Our doors are open Monday through Sunday — drop in whenever you're ready.",
    price: 'From $30',
    duration: '30 min',
    keyFeatures: [
      'Walk-ins welcome 7 days a week',
      'Minimal wait times outside of peak hours',
      'Open early, close late — fits any schedule',
      'Book online if you want a guaranteed time slot',
      'All services available as walk-in — no restrictions',
      'No membership or pre-payment required',
    ],
    faqs: [
      {
        question: 'Can I walk into Clip & Chill without an appointment?',
        answer:
          'Yes — walk-ins are welcome every day. We fit walk-ins based on barber availability. For weekends and Fridays, booking ahead is recommended to avoid a wait.',
      },
      {
        question: 'What are the best times to walk in without a long wait?',
        answer:
          'Weekday mornings (10am–noon) and early afternoons (1–3pm) are typically quietest. Saturday afternoons and Fridays after 5pm tend to be the busiest.',
      },
      {
        question: "What's the wait time for walk-ins?",
        answer:
          'During quiet periods, walk-ins can often be taken immediately. During peak times, expect a 15–30 minute wait. Booking online via Squire eliminates the wait entirely.',
      },
      {
        question: 'Do you charge more for walk-ins than booked appointments?',
        answer:
          'No — pricing is the same whether you walk in or book ahead. Haircuts start at $30.',
      },
      {
        question: "What's the address for the walk-in barber in Mississauga?",
        answer:
          '4099 Erin Mills Pkwy #4, Mississauga, ON L5L 3P9. Free parking is available in the plaza lot directly in front of the shop.',
      },
    ],
  },

  'barbershop-near-utm': {
    slug: 'barbershop-near-utm',
    metaTitle: 'Barbershop near University of Toronto Mississauga | Clip & Chill',
    metaDescription:
      'Barbershop near University of Toronto Mississauga (UTM). Clip & Chill is 10 min from campus — expert fades, precision cuts, walk-ins welcome. Book online.',
    h1: 'Barbershop near University of Toronto Mississauga',
    tagline: 'The top-rated barbershop for UTM students — 10 minutes from campus.',
    intro:
      "Clip & Chill is the closest premium barbershop to the University of Toronto Mississauga campus. Located on Erin Mills Pkwy — a 10-minute drive or bus ride from UTM — we're the top pick for students who want a sharp cut without heading downtown.",
    price: 'From $30',
    duration: '30 min',
    keyFeatures: [
      '10 minutes from UTM campus by car',
      'Accessible by MiWay transit via Erin Mills Pkwy',
      'Skin fades, textured cuts & classic styles',
      'Walk-ins welcome every day — no booking required',
      '5.0 Google rating with 400+ reviews',
      'Affordable pricing starting at $30',
    ],
    faqs: [
      {
        question: 'What is the closest barbershop to UTM?',
        answer:
          'Clip & Chill at 4099 Erin Mills Pkwy #4, Mississauga is approximately 10 minutes from the University of Toronto Mississauga campus by car.',
      },
      {
        question: 'How do I get to Clip & Chill from UTM?',
        answer:
          'Drive south on Mississauga Rd to Erin Mills Pkwy and head north — about 10 minutes. MiWay transit routes also connect the campus to the Erin Mills Pkwy corridor.',
      },
      {
        question: 'Is there student pricing at Clip & Chill?',
        answer:
          "Our standard haircut is $30 — competitive pricing without a separate student rate. Kids' cuts for under-10s are $25.",
      },
      {
        question: 'Do you need a reservation as a student?',
        answer:
          'Walk-ins are always welcome. During busy periods (Fridays, weekends), booking online through Squire ensures you get in without a wait.',
      },
      {
        question: 'What haircut styles are available near UTM?',
        answer:
          'We offer skin fades, taper fades, textured crops, scissor cuts, buzz cuts, and classic cuts. Our barbers work with all hair textures.',
      },
    ],
  },
};
