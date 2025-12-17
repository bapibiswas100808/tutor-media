export interface ClassItem {
  name: string;
  icon: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  subjects?: string[];
  duration?: string;
}

export interface MediumData {
  name: string;
  slug: string;
  image: string;
  description: string;
  classes: ClassItem[];
}

export const mediumsData: MediumData[] = [
  // Bangla Medium
  {
    name: "Bangla Medium",
    slug: "bangla-medium",
    image: "/images/tutoringServices/bangla-medium.png",
    description:
      "Comprehensive tutoring for Bangla medium students from Play to HSC level",
    classes: [
      {
        name: "Play",
        icon: "🎒",
        slug: "play",
        title: "Play Group Education",
        subtitle: "হাসিখুশি শৈশব ও শিক্ষার প্রথম ধাপ",
        description:
          "প্লে-গ্রুপ হলো শিশুর ঘর থেকে স্কুলের পরিবেশে মানিয়ে নেওয়ার প্রথম ধাপ। আমাদের বিশেষায়িত শিক্ষকরা খেলার ছলে শিশুদের সামাজিকীকরণ, কথা বলা এবং নিয়ম মেনে চলার অভ্যাস গড়ে তোলেন। আমরা নিশ্চিত করি যেন পড়ালেখা তাদের কাছে ভয়ের কারণ না হয়ে আনন্দের উৎস হয়।",
        image: "/images/banglaMedium/play.png",
        subjects: [
          "মৌখিক ছড়া আবৃত্তি ও গান (Rhymes)",
          "রঙ, ফল, ও পশু-পাখি পরিচিতি",
          "বসা এবং মনোযোগ দেওয়ার অভ্যাস গঠন",
          "ফাইন মোটর স্কিল (হাতের আঙুলের ব্যবহার)",
        ],
        duration: "6 months - 1 year",
      },
      {
        name: "Nursery",
        icon: "🎒",
        slug: "nursery",
        title: "Nursery Level Education",
        subtitle: "কৌতূহলী মনের সঠিক বিকাশ",
        description:
          "নার্সারি ক্লাসে আমরা শিশুদের অক্ষরের সাথে পরিচয় করিয়ে দিই। পেন্সিল ধরা থেকে শুরু করে সুন্দর হাতের লেখার ভিত্তি এখান থেকেই তৈরি হয়। আমাদের টিউটররা প্রতিটি শিশুকে আলাদা যত্ন নেন যাতে তারা আত্মবিশ্বাসের সাথে বর্ণমালা ও সংখ্যা শিখতে পারে।",
        image: "/images/banglaMedium/nursery.png",
        subjects: [
          "বাংলা ও ইংরেজি বর্ণমালা লিখন ও পঠন",
          "১-৫০ পর্যন্ত সংখ্যা গণনা ও ধারণা",
          "শব্দ গঠন ও ছোট বাক্যে কথা বলা",
          "ড্রয়িং ও ক্রিয়েটিভ অ্যাক্টিভিটি",
        ],
        duration: "1 year",
      },
      {
        name: "KG",
        icon: "🎒",
        slug: "kg",
        title: "Kindergarten Education",
        subtitle: "প্রাইমারি স্কুলের জন্য পূর্ণাঙ্গ প্রস্তুতি",
        description:
          "কেজি ক্লাসটি প্লে-স্কুল এবং ফরমাল স্কুলের সেতুবন্ধন। এই ধাপে আমরা বাংলা ও ইংরেজি রিডিং পড়ার ওপর জোর দিই। গণিতের প্রাথমিক যোগ-বিয়োগ এবং সাধারণ জ্ঞানের মাধ্যমে শিশুদের প্রাইমারি লেভেলের চ্যালেঞ্জ মোকাবিলার জন্য প্রস্তুত করা হয়।",
        image: "/images/banglaMedium/kg.png",
        subjects: [
          "যুক্তবর্ণ ছাড়া শব্দ ও বাক্য গঠন",
          "বেসিক যোগ, বিয়োগ ও নামতা (১-১০)",
          "Seven Days, Months & Seasons পরিচিতি",
          "ইসলামি বা নৈতিক শিক্ষা ও আদব-কায়দা",
        ],
        duration: "1 year",
      },
      {
        name: "Class 1",
        icon: "📘",
        slug: "class-1",
        title: "Class 1 Tutoring",
        subtitle: "প্রাতিষ্ঠানিক শিক্ষার আত্মবিশ্বাসী শুরু",
        description:
          "প্রথম শ্রেণিতে বইয়ের সংখ্যা বাড়ে এবং পড়ালেখার কাঠামো নির্দিষ্ট হয়। আমাদের অভিজ্ঞ টিউটররা এনসিটিবি (NCTB) পাঠ্যবই অনুসরণ করে বাংলা ও ইংরেজি রিডিং এবং গণিতের ভীতি দূর করতে সাহায্য করেন।",
        image: "/images/banglaMedium/class-1.jpg",
        subjects: [
          "সাবলীলভাবে বাংলা ও ইংরেজি রিডিং পড়া",
          "গণিতের কথায় লেখা ও স্থানীয় মান নির্ণয়",
          "যুক্তবর্ণের সঠিক ব্যবহার ও শব্দ গঠন",
          "ইংরেজি ভোকাবুলারি বা শব্দভাণ্ডার বৃদ্ধি",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 2",
        icon: "📘",
        slug: "class-2",
        title: "Class 2 Tutoring",
        subtitle: "নিয়মিত পড়ার অভ্যাস ও ভিত্তি মজবুতকরণ",
        description:
          "দ্বিতীয় শ্রেণিতে আমরা শিক্ষার্থীদের বানান এবং ব্যাকরণের প্রাথমিক বিষয়গুলোতে সচেতন করি। গণিতের গুণ-ভাগ এবং জ্যামিতিক আকৃতির সাথে পরিচয় করিয়ে দেওয়া হয়, যা পরবর্তী ক্লাসের জন্য অপরিহার্য।",
        image: "/images/banglaMedium/class-2.jpg",
        subjects: [
          "ইংরেজি গ্রামারের বেসিক (Noun, Pronoun)",
          "হাতের লেখা সুন্দর ও দ্রুত করার টেকনিক",
          "গণিতের গুণের নামতা ও শাব্দিক সমস্যা",
          "প্যারাগ্রাফ বা অনুচ্ছেদ লেখার শুরু",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 3",
        icon: "📘",
        slug: "class-3",
        title: "Class 3 Tutoring",
        subtitle: "নতুন বিষয় ও ধারণার সাথে পরিচিতি",
        description:
          "তৃতীয় শ্রেণিতে 'বাংলাদেশ ও বিশ্বপরিচয়', 'প্রাথমিক বিজ্ঞান' এবং 'ধর্ম' বিষয়গুলো যুক্ত হয়। সিলেবাসের এই বিস্তৃতিতে শিক্ষার্থীরা যেন খেই হারিয়ে না ফেলে, সেজন্য আমাদের মেন্টররা প্রতিটি বিষয় বুঝিয়ে পড়ান।",
        image: "/images/banglaMedium/class-3.jpg",
        subjects: [
          "বিজ্ঞান ও সমাজ বইয়ের রিডিং ও প্রশ্ন উত্তর",
          "Tense ও Sentence Structure-এর ব্যবহার",
          "বড় সংখ্যার যোগ-বিয়োগ-গুণ-ভাগ",
          "কম্পিউটার বা আইসিটি (ICT)-র প্রাথমিক ধারণা",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 4",
        icon: "📘",
        slug: "class-4",
        title: "Class 4 Tutoring",
        subtitle: "সৃজনশীল প্রশ্ন পদ্ধতির অনুশীলন",
        description:
          "চতুর্থ শ্রেণি থেকেই মূলত সৃজনশীল বা কাঠামোবদ্ধ প্রশ্ন পদ্ধতির চর্চা শুরু হয়। মুখস্থ না করে কীভাবে উদ্দীপক (Stem) পড়ে উত্তর লিখতে হয়, আমাদের টিউটররা সেই কৌশল শেখান। জ্যামিতি এবং ইংরেজি গ্রামারে বিশেষ জোর দেওয়া হয়।",
        image: "/images/banglaMedium/class-4.jpg",
        subjects: [
          "সৃজনশীল প্রশ্নের উত্তর লেখার নিয়ম",
          "জ্যামিতি: রেখা, কোণ ও ত্রিভুজ অঙ্কন",
          "Parts of Speech ও Punctuation-এর ব্যবহার",
          "গাণিতিক প্রতীকের ব্যবহার ও ভগ্নাংশ",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 5",
        icon: "📒",
        slug: "class-5",
        title: "Class 5 - PSC Preparation",
        subtitle: "পিএসসি (PSC) সিলেবাস ও স্কলারশিপ প্রস্তুতি",
        description:
          "প্রাইমারি জীবনের শেষ ধাপ এটি। বৃত্তি পরীক্ষা বা সমাপনী পরীক্ষার প্রস্তুতির জন্য আমরা স্পেশাল কেয়ার দিই। প্রতিটি বিষয়ের অধ্যায়ভিত্তিক অনুশীলন এবং মডেল টেস্টের মাধ্যমে আমরা জিপিএ-৫ নিশ্চিত করার লক্ষ্য নিয়ে কাজ করি।",
        image: "/images/banglaMedium/class-5.jpg",
        subjects: [
          "NCTB প্রশ্নের কাঠামো অনুযায়ী পূর্ণাঙ্গ প্রস্তুতি",
          "গণিতের সৃজনশীল সমস্যা সমাধান (শতকরা, গড়)",
          "Wh-Questions ও Unseen Passage সমাধান",
          "বিগত বছরের প্রশ্ন ও মডেল টেস্ট অনুশীলন",
        ],
        duration: "Full Academic Year + Exam Prep",
      },
      {
        name: "Class 6",
        icon: "📒",
        slug: "class-6",
        title: "Class 6 - PSC Preparation",
        subtitle: "হাইস্কুলে পদার্পণ ও নতুন কারিকুলাম",
        description:
          "হাইস্কুলে ওঠার পর 'পাটিগণিত'-এর সাথে 'বীজগণিত' (Algebra) যুক্ত হয়, যা শিক্ষার্থীদের কাছে সম্পূর্ণ নতুন। এছাড়াও বিজ্ঞান ও আইসিটি বিষয়গুলো বিস্তারিত হয়। এই ট্রানজিশন পিরিয়ডে আমরা শিক্ষার্থীদের কনসেপ্ট ক্লিয়ার করতে সাহায্য করি।",
        image: "/images/banglaMedium/class-6.jpg",
        subjects: [
          "বীজগণিতের সূত্র ও চলকের ধারণা (Algebra Basics)",
          "তথ্য ও যোগাযোগ প্রযুক্তি (ICT) পরিচিতি",
          "ইংরেজি ফ্রি-হ্যান্ড রাইটিং স্কিল ডেভেলপমেন্ট",
          "বিজ্ঞানের পরীক্ষণ ও লজিক্যাল ব্যাখ্যা",
        ],
        duration: "Full Academic Year + Exam Prep",
      },
      {
        name: "Class 7",
        icon: "📒",
        slug: "class-7",
        title: "Class 7 - PSC Preparation",
        subtitle: "বিশ্লেষণধর্মী ও লজিক্যাল দক্ষতা বৃদ্ধি",
        description:
          "সপ্তম শ্রেণিতে পড়াশোনার গভীরতা বাড়ে। গণিতে জ্যামিতি ও তথ্য উপাত্ত এবং ইংরেজিতে ভয়েস চেঞ্জ ও ন্যারেশনের মতো জটিল বিষয়গুলো সহজভাবে বুঝিয়ে দেওয়া হয়। আমরা শিক্ষার্থীদের মুখস্থের বদলে বুঝে পড়ার প্রতি উৎসাহিত করি।",
        image: "/images/banglaMedium/class-7.jpg",
        subjects: [
          "বীজগণিতীয় রাশির গুণ-ভাগ ও উৎপাদক",
          "ইংরেজি গ্রামারের অ্যাডভান্সড টপিকস",
          "সৃজনশীল বিজ্ঞানের গাণিতিক সমস্যা",
          "বিশ্বপরিচয় ও ম্যাপ রিডিং দক্ষতা",
        ],
        duration: "Full Academic Year + Exam Prep",
      },
      {
        name: "Class 8",
        icon: "📚",
        slug: "class-8",
        title: "Class 8 - JSC Foundation",
        subtitle: "জেএসসি (JSC) সিলেবাস ও সলিড ফাউন্ডেশন",
        description:
          "অষ্টম শ্রেণি হলো নবম শ্রেণিতে গ্রুপ (সায়েন্স/আর্টস/কমার্স) নির্বাচনের ভিত্তি। জেএসসি বা বার্ষিক পরীক্ষার সিলেবাস কাভার করার পাশাপাশি আমরা গণিত ও বিজ্ঞানে বিশেষ জোর দিই, যাতে ভবিষ্যতে সায়েন্স নিতে ইচ্ছুক শিক্ষার্থীদের ভিত্তি মজবুত হয়।",
        image: "/images/banglaMedium/class-8.jpg",
        subjects: [
          "পাটিগণিত, বীজগণিত ও জ্যামিতির সম্পূর্ণ সিলেবাস",
          "বিজ্ঞানের রাসায়নিক বিক্রিয়া ও বর্তনী",
          "ইংরেজি গ্রামার ও কম্পোজিশনে পূর্ণ দক্ষতা",
          "JSC বা স্ট্যান্ডার্ড মানের মডেল টেস্ট",
        ],
        duration: "Full Academic Year + Exam Prep",
      },
      {
        name: "Class 9",
        icon: "📖",
        slug: "class-9",
        title: "Class 9 - SSC Foundation",
        subtitle: "বিভাগ নির্বাচন ও ক্যারিয়ারের ভিত্তি স্থাপন",
        description:
          "জীবনের সবচেয়ে গুরুত্বপূর্ণ মোড়। সায়েন্স (পদার্থ, রসায়ন, উচ্চতর গণিত), কমার্স (হিসাববিজ্ঞান, ফিন্যান্স) কিংবা আর্টস—বিভাগ যাই হোক, আমাদের এক্সপার্ট টিউটররা প্রতিটি বিষয়ের গভীরে গিয়ে পড়ান। বেসিক কনসেপ্ট ক্লিয়ার করাই এই বছরের মূল লক্ষ্য।",
        image: "/images/banglaMedium/class-9.jpg",
        subjects: [
          "বিভাগভিত্তিক (Group Subjects) গভীর আলোচনা",
          "উচ্চতর গণিত ও বিজ্ঞানের ব্যবহারিক থিওরি",
          "হিসাববিজ্ঞান ও ব্যবসায় উদ্যোগের গাণিতিক সমাধান",
          "কঠিন অধ্যায়গুলোর সহজ ব্যাখ্যা ও নোটস",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 10",
        icon: "📑",
        slug: "class-10",
        title: "Class 10 - SSC Examination",
        subtitle: "এসএসসি (SSC) এক্সাম ও জিপিএ-৫ মিশন",
        description:
          "দশম শ্রেণি মানেই রিভিশন এবং পরীক্ষার কৌশল আয়ত্ত করা। টেস্ট পেপার সলভ, টাইম ম্যানেজমেন্ট এবং বোর্ড স্ট্যান্ডার্ড পরীক্ষার মাধ্যমে আমরা শিক্ষার্থীদের এসএসসির চূড়ান্ত লড়াইয়ের জন্য প্রস্তুত করি। আমাদের লক্ষ্য—সেরা ফলাফল।",
        image: "/images/banglaMedium/class-10.jpg",
        subjects: [
          "টেস্ট পেপার সলভ ও বোর্ড প্রশ্ন বিশ্লেষণ",
          "MCQ-তে ভালো করার শর্টকাট টেকনিক",
          "সৃজনশীল প্রশ্নের মানসম্মত উত্তর লেখার কৌশল",
          "Model Test ও ইন্টেন্সিভ কেয়ার",
        ],
        duration: "Full Year + Intensive Exam Prep",
      },
      {
        name: "Class 11",
        icon: "📃",
        slug: "class-11",
        title: "Class 11 - HSC Foundation",
        subtitle: "কলেজ লাইফের চ্যালেঞ্জ ও অ্যাডভান্সড লার্নিং",
        description:
          "এসএসসির তুলনায় এইচএসসির সিলেবাস অনেক বিশাল, কিন্তু সময় কম। কলেজ জীবনের শুরুতেই সঠিক গাইডলাইন না পেলে শিক্ষার্থীরা পিছিয়ে পড়ে। আমরা ক্যালকুলাস, অর্গানিক কেমিস্ট্রি বা ইকোনমিক্সের মতো কঠিন বিষয়গুলোকে শুরু থেকেই সহজ করে তুলি।",
        image: "/images/banglaMedium/class-11.jpg",
        subjects: [
          "১ম ও ২য় পত্রের বেসিক কনসেপ্ট ক্লিয়ারেন্স",
          "Engineering/Medical এডমিশনের প্রাক-প্রস্তুতি",
          "জটিল গাণিতিক ও বৈজ্ঞানিক তত্ত্বের সমাধান",
          "ICT প্রোগ্রামিং (C, HTML) ও ডাটাবেস",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 12",
        icon: "📄",
        slug: "class-12",
        title: "Class 12 - HSC Excellence",
        subtitle: "এইচএসসি (HSC) জয় ও বিশ্ববিদ্যালয় স্বপ্ন",
        description:
          "এইচএসসি পরীক্ষার ভালো ফলাফলের ওপর নির্ভর করে ভালো বিশ্ববিদ্যালয়ে ভর্তির সুযোগ। আমাদের টিউটররা বোর্ড পরীক্ষার রিভিশনের পাশাপাশি এডমিশন টেস্টের জন্য প্রয়োজনীয় টিপস দেন। শেষ মুহূর্তের প্রস্তুতিতে আমরা কোনো ছাড় দিই না।",
        image: "/images/banglaMedium/class-12.jpg",
        subjects: [
          "সাজেশন ভিত্তিক চূড়ান্ত রিভিশন প্রোগ্রাম",
          "বুয়েট/মেডিকেল/ভার্সিটি স্ট্যান্ডার্ড প্রশ্ন সলভ",
          "টাইম ম্যানেজমেন্ট ও এক্সাম হ্যাকস",
          "ফাইনাল মডেল টেস্ট ও পারফরম্যান্স এনালাইসিস",
        ],
        duration: "Full Year + Intensive Prep + Admission Coaching",
      },
    ],
  },
  // English Medium
  {
    name: "English Medium",
    slug: "english-medium",
    image: "/images/tutoringServices/english-medium.png",

    description:
      "Expert tutoring for international curricula including Cambridge, Edexcel, and IB",
    classes: [
      {
        name: "Pre-Schooling",
        slug: "pre-schooling",
        icon: "🧸",
        title: "Early Childhood Learning",
        subtitle: "A Nurturing Start to Discovery",
        image: "/images/englishMedium/pre-schooling.png",
        description:
          "The very first step away from home should be filled with warmth. Our pre-schooling program focuses on emotional comfort and separation anxiety management, helping toddlers interact with the world through sensory play and care.",
        subjects: [
          "Social interaction and sharing",
          "Basic sensory recognition (colors, sounds)",
          "Listening skills and following simple cues",
          "Fine motor skills (holding objects, stacking)",
        ],
        duration: "1 Year",
      },

      {
        name: "Play Group",
        slug: "play-group",
        icon: "🎈",
        title: "Play Group Classes",
        subtitle: "Learning Through Joyful Exploration",
        image: "/images/englishMedium/play-group.png",
        description:
          "Curiosity peaks at this age. We channel that energy into structured play. Our tutors use interactive methods to introduce the basics of language and logic without any academic pressure, ensuring your child loves the concept of learning.",
        subjects: [
          "Introduction to Phonics (Sounds)",
          "Number recognition (1-10)",
          "Creative arts and crafts",
          "Oral vocabulary building",
        ],
        duration: "1 Year",
      },

      {
        name: "KG (Kindergarten)",
        slug: "kg",
        icon: "🎒",
        title: "Kindergarten Program",
        subtitle: "Bridging Play and Formal Schooling",
        image: "/images/englishMedium/kg.png",
        description:
          "KG is the preparatory ground for Big School. We focus on transitioning from oral learning to writing. Our mentors ensure your child develops the patience to sit, write, and read, setting a strong foundation for Standard 1.",
        subjects: [
          "Writing alphabets and basic words",
          "Introduction to simple addition/subtraction",
          "Reading short sentences fluently",
          "Environmental awareness and manners",
        ],
        duration: "1 Year",
      },

      // Standard 1–9
      {
        name: "Standard 1",
        slug: "standard-1",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Building Strong Academic Roots",
        image: "/images/englishMedium/standard-1.png",
        description:
          "As formal exams begin, many students face a confidence dip. We provide gentle, personalized support to help them navigate their first textbooks, ensuring they grasp the core concepts of Math and English rather than just memorizing.",
        subjects: [
          "Sentence construction and grammar basics",
          "Arithmetic logic (beyond counting)",
          "Introduction to General Science",
          "Handwriting and presentation skills",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 2",
        slug: "standard-2",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Growing Confidence in Core Subjects",
        image: "/images/englishMedium/standard-2.png",
        description:
          "We encourage independent thinking. At this stage, our tutors focus on reading comprehension and mental math. We ensure that the student isn't just copying from the board but understanding the 'why' behind every answer.",
        subjects: [
          "Creative writing (short paragraphs)",
          "Multiplication tables and division logic",
          "Spelling and vocabulary expansion",
          "Basic scientific observation skills",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 3",
        slug: "standard-3",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Exploring New Subjects with Ease",
        image: "/images/englishMedium/standard-3.png",
        description:
          "The curriculum expands here. As Science and Geography become more detailed, we help students connect textbook theories with real-world examples. This prevents rote learning and builds a genuine interest in the subjects.",
        subjects: [
          "Reading comprehension and inference",
          "Fractions, Geometry, and Measurements",
          "Introduction to Literature",
          "Computer literacy basics",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 4",
        slug: "standard-4",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Mastering Logic and Analysis",
        image: "/images/englishMedium/standard-4.png",
        description:
          "The academic workload increases significantly in Standard 4. Our tutors focus on time management and structured answering techniques. We strengthen the foundation in Grammar and Math to prepare them for upper primary challenges.",
        subjects: [
          "Advanced Grammar (Tenses, Parts of Speech)",
          "Mathematical problem solving (Word Problems)",
          "Detailed Science concepts (Life cycles, Matter)",
          "Geography and Map reading",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 5",
        slug: "standard-5",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Preparation for Middle School",
        image: "/images/englishMedium/standard-5.png",
        description:
          "This is a transition year. We prepare students for the rigors of middle school by introducing more complex analytical skills. Our focus is on ensuring they are self-disciplined and ready for subject-specialized learning.",
        subjects: [
          "Essay writing and structuring arguments",
          "Decimals, percentages, and data handling",
          "History and social studies analysis",
          "Critical thinking and comprehension",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 6",
        slug: "standard-6",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "The Shift to Critical Thinking",
        image: "/images/englishMedium/standard-6.png",
        description:
          "In Standard 6, students move from 'learning facts' to 'analyzing facts'. Our subject-specialist tutors guide them through Algebra, Literature analysis, and the Scientific Method, ensuring they don't struggle with the jump in syllabus difficulty.",
        subjects: [
          "Algebra basics and Geometry proofs",
          "Analysis of Literature and Poetry",
          "Physics, Chemistry, and Biology basics",
          "ICT theory and application",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 7",
        slug: "standard-7",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Strengthening the Academic Core",
        image: "/images/englishMedium/standard-7.png",
        description:
          "A crucial year for building the stamina required for O Levels. We focus on weakness identification—fixing any gaps in Math or English basics—so that the student enters Standard 8 with zero academic backlog.",
        subjects: [
          "Complex algebraic equations",
          "Creative and argumentative writing",
          "Laboratory skills and scientific reporting",
          "World History and Geography depth",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 8",
        slug: "standard-8",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "The Pre-O Level Launchpad",
        image: "/images/englishMedium/standard-8.png",
        description:
          "Standard 8 is where the O Level journey effectively begins. We help students and parents decide on subject combinations (Science/Commerce) and start introducing O Level style questions to build familiarity and confidence.",
        subjects: [
          "Introduction to O Level syllabus topics",
          "Advanced mathematical reasoning",
          "Economics or Accounting basics (if applicable)",
          "Analytical skills for Science subjects",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 9",
        slug: "standard-9",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Mastering the Syllabus Early",
        image: "/images/englishMedium/standard-9.png",
        description:
          "The countdown begins. We cover a significant portion of the O Level syllabus in Standard 9. Our tutors emphasize 'Concept over Memorization,' ensuring students can tackle the tricky, unseen questions typical of Cambridge/Edexcel exams.",
        subjects: [
          "In-depth coverage of Pure Science/Commerce subjects",
          "Advanced Math (D-Maths/B-Maths)",
          "Structuring answers for maximum marks",
          "Regular unit tests and assessment",
        ],
        duration: "1 Year / Grade",
      },

      // O Level
      {
        name: "O Level",
        slug: "o-level",
        icon: "📘",
        title: "O Level Education",
        subtitle: "achieving Excellence in Board Exams",
        image: "/images/englishMedium/o-level.png",
        description:
          "It’s not just about hard work; it’s about strategy. We focus on Past Paper drilling, time management, and understanding the specific marking schemes of Cambridge/Edexcel. Our goal is to secure those A*s for a top college entry.",
        subjects: [
          "10+ years of Past Paper solution practice",
          "Mock Exams under strict time conditions",
          "Exam hacks and error-avoidance strategies",
          "Full syllabus revision and doubt clearing",
        ],
        duration: "2 Years (IGCSE)",
      },

      // A Level AS
      {
        name: "A Level AS",
        slug: "a-level-as",
        icon: "📗",
        title: "A Level AS",
        subtitle: "Adapting to Advanced Academics",
        image: "/images/englishMedium/a-level-as.png",
        description:
          "The jump from O to A Levels is massive. Many students struggle with the depth required. Our specialized mentors provide intensive support in core subjects, ensuring the student adapts to the analytical and research-based approach of AS Level.",
        subjects: [
          "In-depth theory of chosen subjects (Physics, Chem, Econ, etc.)",
          "Calculus and Mechanics (Maths)",
          "Critical analysis and essay writing skills",
          "University application guidance foundation",
        ],
        duration: "1 Year (Grade 11)",
      },

      // A Level A2
      {
        name: "A Level A2",
        slug: "a-level-a2",
        icon: "📕",
        title: "A Level A2",
        subtitle: "The Final Step to Top Universities",
        image: "/images/englishMedium/a-level-a2.png",
        description:
          "This is the career-defining year. We provide rigorous academic support for the A2 finals while also offering mentorship for university applications. We ensure your child leaves school with the grades and the confidence to compete globally.",
        subjects: [
          "Advanced theoretical concepts and applications",
          "Solving complex, multi-step problems",
          "Final preparation for Board Exams",
          "Guidance on University admission tests (SAT/IELTS support)",
        ],
        duration: "1 Year (Grade 12)",
      },
    ],
  },
  // English Version
  {
    name: "English Version",
    slug: "english-version",
    image: "/images/tutoringServices/english-version.png",

    description:
      "English Version curriculum following national board with English medium instruction",
    classes: [
      // Play
      {
        name: "Play Group",
        slug: "play-group",
        icon: "🧸",
        title: "Play Group Early Learning",
        subtitle: "Interactive Early Development",
        image: "/images/englishVersion/play-group.png",
        description:
          "We create a playful environment where children get comfortable with English instructions while enjoying typical Bangladeshi childhood games. Our focus is on removing the fear of a foreign language through sensory activities and social interaction.",
        subjects: [
          "Basic English vocabulary & phonics",
          "Social skills and following instructions",
          "Recognition of colors, shapes, and numbers",
          "Fine motor skills (drawing, holding objects)",
        ],
        duration: "1 Year",
      },

      // Nursery
      {
        name: "Nursery",
        slug: "nursery",
        icon: "🌱",
        title: "Nursery Level",
        subtitle: "Building a Strong Foundation",
        image: "/images/englishVersion/nursery.png",
        description:
          "Nursery is where the academic journey begins. We introduce alphabets and numbers using the National Curriculum guidelines but with modern teaching aids. We ensure your child develops a love for reading and writing in English early on.",
        subjects: [
          "Writing English and Bangla alphabets",
          "Number counting and basic values",
          "Simple conversation skills in English",
          "Rhymes and storytelling",
        ],
        duration: "1 Year",
      },

      // KG
      {
        name: "KG (Kindergarten)",
        slug: "kg",
        icon: "🎒",
        title: "Kindergarten Program",
        subtitle: "Preparation for Formal Schooling",
        image: "/images/englishVersion/kg.png",
        description:
          "KG bridges the gap between play and textbooks. We focus on reading fluency and handwriting. Our tutors ensure that children can understand and respond to questions in English, preparing them for the Class 1 syllabus.",
        subjects: [
          "Reading short sentences clearly",
          "Introduction to basic math (Add/Subtract)",
          "Writing words and simple sentences",
          "General Knowledge and etiquette",
        ],
        duration: "1 Year",
      },

      // Classes 1–12
      {
        name: "Class 1",
        slug: "class-1",
        icon: "📚",
        title: "Class 1 Primary Education",
        subtitle: "Confident Start to Board Curriculum",
        image: "/images/englishVersion/class-1.png",
        description:
          "Class 1 introduces formal textbooks. The challenge for English Version students is understanding the English translation of the Board books. Our tutors simplify these texts, making learning easy and enjoyable without the language barrier.",
        subjects: [
          "Fluent reading of NCTB English text",
          "Basic grammar and sentence construction",
          "Mathematics: Word problems in English",
          "Introduction to environment and science",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 2",
        slug: "class-2",
        icon: "📚",
        title: "Class 2 Primary Education",
        subtitle: "Developing Core Skills",
        image: "/images/englishVersion/class-2.png",
        description:
          "We focus on strengthening the basics of Math and English Grammar. Since English Version students must answer in English, we emphasize correct spelling and sentence structure from this early stage to prevent future struggles.",
        subjects: [
          "Grammar: Tenses and Parts of Speech",
          "Multiplication tables and mental math",
          "Handwriting improvement",
          "Creative writing (Paragraphs)",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 3",
        slug: "class-3",
        icon: "📚",
        title: "Class 3 Primary Education",
        subtitle: "Mastering New Subjects",
        image: "/images/englishVersion/class-3.png",
        description:
          "With the introduction of 'Science' and 'Bangladesh & Global Studies,' the vocabulary load increases. Our mentors help students grasp these new terms in English while keeping the core concepts clear as per the Board syllabus.",
        subjects: [
          "Understanding scientific terms in English",
          "Reading comprehension skills",
          "Solving math problems with logic",
          "Introduction to ICT basics",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 4",
        slug: "class-4",
        icon: "📚",
        title: "Class 4 Primary Education",
        subtitle: "Introduction to Creative Writing",
        image: "/images/englishVersion/class-4.png",
        description:
          "This is a crucial year for mastering the 'Creative Question' (Srijonshil) method. We teach students how to structure their answers in English—moving away from memorization to analytical writing.",
        subjects: [
          "Answering Creative Questions (CQ) in English",
          "Geometry basics (Angles, Shapes)",
          "Advanced grammar and composition",
          "Critical thinking skills",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 5",
        slug: "class-5",
        icon: "📚",
        title: "Class 5 Primary Final",
        subtitle: "Primary Scholarship Preparation",
        image: "/images/englishVersion/class-5.png",
        description:
          "The final year of primary school requires focused preparation. Whether for PECE or school finals, we cover the entire NCTB syllabus with rigorous model tests. We ensure students can write standard answers in English that yield high marks.",
        subjects: [
          "Full syllabus revision and suggestion",
          "Solving Creative Math problems",
          "Unseen passages and comprehension",
          "Time management for exams",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 6",
        slug: "class-6",
        icon: "📚",
        title: "Class 6 Middle School",
        subtitle: "Transition to High School Syllabus",
        image: "/images/englishVersion/class-6.png",
        description:
          "The jump to Algebra and higher-level Science can be tricky in the English Version. Our tutors explain the concepts clearly and ensure students are using the correct English terminologies for Math and Science proofs.",
        subjects: [
          "Algebra basics and Geometry theorems",
          "ICT theory and practical application",
          "Scientific explanations in English",
          "Free-hand writing skills",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 7",
        slug: "class-7",
        icon: "📚",
        title: "Class 7 Middle School",
        subtitle: "Building Analytical Depth",
        image: "/images/englishVersion/class-7.png",
        description:
          "We focus on deep understanding. Students learn to analyze literary texts and solve complex math problems. Our goal is to make them proficient in the language so that 'translating thoughts to English' doesn't slow them down during exams.",
        subjects: [
          "Advanced Algebra and Geometry",
          "English Grammar: Voice, Narration",
          "Creative Science application",
          "Global Studies analysis",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 8",
        slug: "class-8",
        icon: "📚",
        title: "Class 8 Middle School",
        subtitle: "Foundation for Board Exams",
        image: "/images/englishVersion/class-8.png",
        description:
          "Class 8 is critical for building a strong base for the future. We provide intensive coaching for Math and Science, ensuring students are ready for the JSC standard. We focus on accuracy in writing Creative Answers in English.",
        subjects: [
          "Complete coverage of Math & Science",
          "Answering techniques for full marks",
          "Model Tests based on Board patterns",
          "Preparation for Group Selection (Science/Biz)",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 9",
        slug: "class-9",
        icon: "📚",
        title: "Class 9 Secondary School",
        subtitle: "Specialized Group Coaching",
        image: "/images/englishVersion/class-9.png",
        description:
          "Whether it’s Physics/Chemistry or Accounting/Finance, the terminology in English Version is specific. Our expert tutors bridge the gap between complex theories and the Board’s requirement for English answers.",
        subjects: [
          "In-depth Science/Commerce theory in English",
          "Higher Math & Biology practicals",
          "Solving difficult Creative Questions",
          "Chapter-wise notes and analysis",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 10",
        slug: "class-10",
        icon: "📘",
        title: "Class 10 Secondary School",
        subtitle: "SSC Preparation & Excellence",
        image: "/images/englishVersion/class-10.png",
        description:
          "The target is GPA 5. We focus on Test Paper solving, Board Question analysis, and strict time management. We ensure your child’s answer scripts meet the highest standards of the English Version Board examiners.",
        subjects: [
          "Intensive Test Paper practice",
          "MCQ shortcuts and techniques",
          "Final revision and suggestions",
          "Mock Exams with feedback",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 11",
        slug: "class-11",
        icon: "📗",
        title: "Class 11 Higher Secondary",
        subtitle: "Mastering the College Syllabus",
        image: "/images/englishVersion/class-11.png",
        description:
          "The HSC syllabus is vast. We help students navigate the thick English Version textbooks of Physics, Chemistry, and Math. Our tutors focus on concept clarity, which is essential for both Board exams and University admission.",
        subjects: [
          "Advanced Calculus and Scientific theories",
          "Organic Chemistry & Physics derivations",
          "ICT Programming and Logic",
          "Pre-admission foundation tips",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 12",
        slug: "class-12",
        icon: "📕",
        title: "Class 12 Higher Secondary",
        subtitle: "HSC Final Prep & Admission Target",
        image: "/images/englishVersion/class-12.png",
        description:
          "It’s the final lap. We provide strategic preparation for HSC, focusing on high-scoring topics. Simultaneously, we guide students on how to handle admission tests (BUET/Medical/Varsity) where concepts must be crystal clear.",
        subjects: [
          "Solving Board Standard Creative Questions",
          "Past Year Question Analysis",
          "Model Tests and error correction",
          "Guidance for University Admission tests",
        ],
        duration: "1 Year",
      },
    ],
  },
  // Madrasah Medium
  {
    name: "Madrasah Medium",
    slug: "madrasah-medium",
    image: "/images/tutoringServices/madrasah-medium.png",

    description: "Islamic education combined with modern academic subjects",
    classes: [
      // Play
      {
        name: "Play Group",
        slug: "play-group",
        icon: "🧸",
        title: "Play Group Early Learning",
        subtitle: "খেলার ছলে দ্বীনি শিক্ষার হাতেখড়ি",
        image: "/images/madrasahMedium/play.png",
        description:
          "ছোট্ট সোনামণিদের শিক্ষাজীবনের শুরুটা হোক আনন্দময় ও নিরাপদ পরিবেশে। আমাদের অভিজ্ঞ টিউটররা খেলার মাধ্যমে শিশুদের আরবী হরফ চেনা, ছোট ছোট দুআ এবং বাংলা-ইংরেজি বর্ণমালার সাথে পরিচয় করিয়ে দেন। আমরা নিশ্চিত করি যেন শিশুরা ছোটবেলা থেকেই ইসলামিক আদব-কায়দা এবং নৈতিক মূল্যবোধের সাথে বেড়ে ওঠে।",
        subjects: [
          "মৌখিক আরবী ও বাংলা বর্ণমালা",
          "ছোট দুআ ও সালাম বিনিময়",
          "মজার ছড়া ও গল্প",
          "রং ও আকার পরিচিতি",
        ],
        duration: "1 Year",
      },

      // Nursery
      {
        name: "Nursery",
        slug: "nursery",
        icon: "🌱",
        title: "Nursery Level",
        subtitle: "লেখা ও পড়ার প্রাথমিক ভিত্তি গঠন",
        image: "/images/madrasahMedium/nursery.png",
        description:
          "নার্সারি ক্লাসে আমরা শিশুদের হাতে ধরে লেখা শেখানো এবং পড়ার প্রতি আগ্রহ তৈরিতে গুরুত্ব দিই। এই বয়সে শিশুদের মস্তিষ্কের বিকাশের জন্য আমাদের টিউটররা সৃজনশীল পদ্ধতির ব্যবহার করেন। নূরানী কায়দার প্রাথমিক পাঠের পাশাপাশি গণিত ও ইংরেজির বেসিক কনসেপ্টগুলো খুব যত্ন সহকারে শেখানো হয়।",
        subjects: [
          "হরফ ও বর্ণমালা লেখা",
          "সংখ্যা গণনা ও প্রাথমিক গণিত",
          "আরবী ও বাংলা শব্দ গঠন",
          "দৈনন্দিন সুন্নাহ ও আদব",
        ],
        duration: "1 Year",
      },

      // KG
      {
        name: "KG (Kindergarten)",
        slug: "kg",
        icon: "🎒",
        title: "Kindergarten Program",
        subtitle: "প্রথম শ্রেণির জন্য পূর্ণাঙ্গ প্রস্তুতি",
        image: "/images/madrasahMedium/kg.png",
        description:
          "কেজি ক্লাস হলো ফরমাল স্কুলে প্রবেশের পূর্বপ্রস্তুতি। আমাদের পাঠ্যক্রম এমনভাবে সাজানো হয়েছে যেখানে শিশুরা সাবলীলভাবে রিডিং পড়া এবং সাধারণ যোগ-বিয়োগ শিখতে পারে। আমরা শিশুদের ইবাদত ও পড়ালেখার মধ্যে ভারসাম্য বজায় রাখতে শেখাই, যা তাদের পরবর্তী ক্লাসের জন্য আত্মবিশ্বাসী করে তোলে।",
        subjects: [
          "সাবলীল রিডিং পড়া (বাংলা ও ইংরেজি)",
          "ছোট সূরা ও কালিমা",
          "সাধারণ জ্ঞান ও পরিবেশ পরিচিতি",
          "হাতের লেখা সুন্দর করা",
        ],
        duration: "1 Year",
      },

      // Classes 1–10
      // ...Array.from({ length: 10 }, (_, i) => ({
      //   name: `Class ${i + 1}`,
      //   slug: `class-${i + 1}`,
      //   icon: "📚",
      //   title: `Class ${i + 1} Education`,
      //   subtitle: "Primary to Secondary School Curriculum",
      //   image: `/images/madrasahMedium/class-${i + 1}.png`,
      //   description:
      //     "Structured learning across core subjects with exam preparation, practical exercises, and skill development.",
      //   subjects: [
      //     "English",
      //     "Bangla",
      //     "Mathematics",
      //     "Science",
      //     "Social Studies",
      //     "ICT",
      //   ],
      //   duration: "1 Year",
      // })),
      {
        name: "Class 1",
        slug: "class-1",
        icon: "📘",
        title: "Class 1 Foundation Education",
        subtitle: "ইবতেদায়ী শিক্ষার আনুষ্ঠানিক সূচনা",
        image: "/images/madrasahMedium/class-1.png",
        description:
          "প্রথম শ্রেণিতে শিশুরা মাদ্রাসার মূল কারিকুলামের সাথে পরিচিত হয়। আমাদের টিউটররা প্রতিটি ছাত্রের মেধা অনুযায়ী পড়া বুঝিয়ে দেন। সহীহ কুরআন তিলাওয়াতের পাশাপাশি বাংলা, ইংরেজি এবং গণিতের শক্ত ভিত্তি গড়ে তোলাই আমাদের লক্ষ্য। ক্লাসের পড়া ক্লাসে শেষ করার মাধ্যমে আমরা শিশুদের ওপর চাপ কমাই।",
        subjects: [
          "সহীহ কায়দা ও আমপারা শিক্ষা",
          "ইংরেজি ও বাংলা ব্যাকরণের প্রাথমিক ধারণা",
          "গাণিতিক সমস্যার সমাধান",
          "ইসলামিক গল্প ও নৈতিকতা",
        ],
        duration: "1 Year",
      },
      {
        name: "Class 2",
        slug: "class-2",
        icon: "📗",
        title: "Class 2 Primary Education",
        subtitle: "বেসিক নলেজ ও স্কিল ডেভেলপমেন্ট",
        image: "/images/madrasahMedium/class-2.png",
        description:
          "দ্বিতীয় শ্রেণিতে আমরা শিক্ষার্থীদের পড়ার দক্ষতা এবং বোঝার ক্ষমতা বৃদ্ধিতে জোর দিই। আরবী ভাষা শিক্ষার পাশাপাশি আধুনিক গণিত এবং ইংরেজির ওপর বিশেষ গুরুত্ব দেওয়া হয়। আমাদের অভিজ্ঞ টিউটররা নিশ্চিত করেন যেন ছাত্রছাত্রীরা আনন্দের সাথে শিখতে পারে এবং তাদের ফলাফলে ধারাবাহিক উন্নতি বজায় থাকে।",
        subjects: [
          "নাজরা কুরআন তিলাওয়াত",
          "বাংলা ও ইংরেজি রিডিং ও রাইটিং",
          "গুণ ও ভাগের ধারণা",
          "সালাতের নিয়মাবলী ও দুআ",
        ],
        duration: "1 Year",
      },
      {
        name: "Class 3",
        slug: "class-3",
        icon: "📕",
        title: "Class 3 Primary Education",
        subtitle: "বিজ্ঞান ও পরিবেশ শিক্ষার পরিচিতি",
        image: "/images/madrasahMedium/class-3.png",
        description:
          "তৃতীয় শ্রেণি থেকে শিক্ষার্থীদের কারিকুলামে নতুন বিষয় যুক্ত হয়। আমরা বিজ্ঞানের প্রাথমিক ধারণা, সমাজ এবং দ্বীনি শিক্ষার বিষয়গুলো সহজ ও সাবলীলভাবে উপস্থাপন করি। মুখস্থ না করে বুঝে পড়ার অভ্যাস গড়ে তোলা এবং সৃজনশীল মেধা বিকাশে আমাদের টিউটররা নিরলসভাবে কাজ করেন।",
        subjects: [
          "তাজবীদ সহকারে কুরআন মাজিদ",
          "প্রাথমিক বিজ্ঞান ও সমাজ",
          "ইংরেজি গ্রামার ও টেন্স",
          "মাসনুন দুআ ও হাদিস",
        ],
        duration: "1 Year",
      },
      {
        name: "Class 4",
        slug: "class-4",
        icon: "📙",
        title: "Class 4 Primary Education",
        subtitle: "সৃজনশীল ও বিশ্লেষণধর্মী শিক্ষা",
        image: "/images/madrasahMedium/class-4.png",
        description:
          "চতুর্থ শ্রেণিতে পড়ালেখার গভীরতা কিছুটা বাড়ে। আমাদের টিউটররা ছাত্রদের আরবী ব্যাকরণ, গণিতের জ্যামিতি এবং ইংরেজি কম্পোজিশনের মতো বিষয়গুলোতে দক্ষ করে তোলেন। পিএসসি বা ইবতেদায়ী সমাপনী পরীক্ষার আগের বছর হিসেবে আমরা এই ক্লাসেই ছাত্রদের ভিত্তি মজবুত করার দিকে নজর দিই।",
        subjects: [
          "আরবী ২য় পত্র ও ব্যাকরণ",
          "সৃজনশীল গণিত ও জ্যামিতি",
          "ইংরেজি স্পোকেন ও রাইটিং",
          "আকাইদ ও ফিকহ",
        ],
        duration: "1 Year",
      },
      {
        name: "Class 5",
        slug: "class-5",
        icon: "📒",
        title: "Class 5 Primary Completion",
        subtitle: "ইবতেদায়ী সমাপনী পরীক্ষার স্পেশাল কেয়ার",
        image: "/images/madrasahMedium/class-5.png",
        description:
          "পঞ্চম শ্রেণির শিক্ষার্থীদের জন্য আমাদের রয়েছে বিশেষ ইবতেদায়ী সমাপনী প্রস্তুতি প্রোগ্রাম। ১০ বছরের অভিজ্ঞতায় আমরা জানি কীভাবে ছাত্রদের বোর্ড পরীক্ষার জন্য প্রস্তুত করতে হয়। নিয়মিত মডেল টেস্ট, রিভিশন এবং টাইম ম্যানেজমেন্ট শেখানোর মাধ্যমে আমরা নিশ্চিত করি আপনার সন্তানের জিপিএ-৫ এবং স্কলারশিপ।",
        subjects: [
          "পূর্ণাঙ্গ বোর্ড সিলেবাস রিভিশন",
          "মডেল টেস্ট ও প্রশ্ন সমাধান",
          "সৃজনশীল প্রশ্নের উত্তর লেখার কৌশল",
          "পরীক্ষার ভীতি দূরীকরণ",
        ],
        duration: "1 Year",
      },
      {
        name: "Class 6",
        slug: "class-6",
        icon: "📓",
        title: "Class 6 Secondary Education",
        subtitle: "জুনিয়র দাখিল স্তরের আধুনিক শিক্ষা",
        image: "/images/madrasahMedium/class-6.png",
        description:
          "হাইস্কুল বা জুনিয়র দাখিল স্তরে পা রাখার এই সময়ে আমরা শিক্ষার্থীদের তথ্যপ্রযুক্তি (ICT) এবং আধুনিক বিজ্ঞানের সাথে পরিচয় করিয়ে দিই। আরবী সাহিত্যের পাশাপাশি ইংরেজি এবং গণিতে দুর্বলতা কাটানোর জন্য আমাদের রয়েছে অভিজ্ঞ সাবজেক্ট টিউটর। আমরা ছাত্রদের স্বাবলম্বী শিক্ষার্থী হিসেবে গড়ে তুলি।",
        subjects: [
          "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)",
          "বীজগণিত ও জ্যামিতি",
          "আরবী সাহিত্য ও নাহু-সরফ",
          "কমিউনিকেটিভ ইংলিশ",
        ],
        duration: "1 Year",
      },
      {
        name: "Class 7",
        slug: "class-7",
        icon: "📔",
        title: "Class 7 Secondary Education",
        subtitle: "বিষয়ভিত্তিক গভীর জ্ঞান অর্জন",
        image: "/images/madrasahMedium/class-7.png",
        description:
          "সপ্তম শ্রেণিতে আমরা শিক্ষার্থীদের প্রতিটি বিষয়ের গভীরে গিয়ে শেখার প্রতি উৎসাহিত করি। বিজ্ঞান, গণিত এবং আরবী বিষয়গুলোর জটিল টপিকগুলো সহজ উদাহরণের মাধ্যমে বুঝিয়ে দেওয়া হয়। আমাদের লক্ষ্য হলো শিক্ষার্থীদের জেডিসি পরীক্ষার জন্য আগে থেকেই মানসিকভাবে প্রস্তুত করা।",
        subjects: [
          "উচ্চতর গণিত ও বিজ্ঞান অনুশীলন",
          "আরবী ও বাংলা ব্যাকরণ",
          "ইতিহাস ও বাংলাদেশ স্টাডিজ",
          "সৃজনশীল লেখার দক্ষতা",
        ],
        duration: "1 Year",
      },
      {
        name: "Class 8",
        slug: "class-8",
        icon: "📚",
        title: "Class 8 Junior School Certificate",
        subtitle: "জেডিসি পরীক্ষার নিশ্চিত প্রস্তুতি",
        image: "/images/madrasahMedium/class-8.png",
        description:
          "জেডিসি (JDC) পরীক্ষার্থীদের জন্য আমাদের টিউটররা নিবিড় তত্ত্বাবধান প্রদান করেন। সিলেবাস দ্রুত শেষ করে আমরা রিভিশন এবং বিগত বছরের প্রশ্ন সমাধানের ওপর জোর দিই। সায়েন্স এবং ম্যাথের ভীতি দূর করে আমরা শিক্ষার্থীদের আত্মবিশ্বাসী করে তুলি, যা তাদের ভালো ফলাফলের নিশ্চয়তা দেয়।",
        subjects: [
          "জেডিসি পরীক্ষার পূর্ণাঙ্গ প্রস্তুতি",
          "টেস্ট পেপার সলভ ও মডেল টেস্ট",
          "আরবী, গণিত ও ইংরেজির বিশেষ ক্লাস",
          "বোর্ড পরীক্ষার টিপস ও ট্রিক্স",
        ],
        duration: "1 Year",
      },
      {
        name: "Class 9",
        slug: "class-9",
        icon: "🎓",
        title: "Class 9 SSC Preparation",
        subtitle: "দাখিল স্তরে বিভাগভিত্তিক স্পেশালাইজেশন",
        image: "/images/madrasahMedium/class-9.png",
        description:
          "নবম শ্রেণিতে শিক্ষার্থীরা বিজ্ঞান, সাধারণ বা মুজাব্বিদ বিভাগ বেছে নেয়। আমাদের অভিজ্ঞ টিউটররা (বুয়েট/মেডিকেল/বিশ্ববিদ্যালয় শিক্ষার্থী) জটিল বিষয়গুলো যেমন পদার্থ, রসায়ন বা উচ্চতর ফিকহ খুব সহজভাবে বুঝিয়ে দেন। বোর্ড পরীক্ষার ভিত্তি গড়ার জন্য এটিই সেরা সময়।",
        subjects: [
          "বিভাগভিত্তিক (Science/General) বিষয়",
          "হাদিস শরীফ ও উসুলুল হাদিস",
          "উচ্চতর গণিত ও পদার্থবিজ্ঞান",
          "ক্যারিয়ার গাইডলাইন ও মেন্টরশিপ",
        ],
        duration: "1 Year",
      },
      {
        name: "Class 10",
        slug: "class-10",
        icon: "🏆",
        title: "Class 10 SSC Final Preparation",
        subtitle: "দাখিল পরীক্ষার চূড়ান্ত প্রস্তুতি ও রিভিশন",
        image: "/images/madrasahMedium/class-10.png",
        description:
          "দাখিল পরীক্ষার্থীদের জন্য আমাদের রয়েছে ক্র্যাশ কোর্স এবং নিবিড় রিভিশন প্রোগ্রাম। আমরা শিক্ষার্থীদের প্রতিটি বিষয়ের খুঁটিনাটি ঝালিয়ে নিই এবং তাদের দুর্বলতাগুলো চিহ্নিত করে সমাধান করি। আমাদের লক্ষ্য শুধু পাস করা নয়, বরং গোল্ডেন এ-প্লাস অর্জন করা এবং ভালো কলেজে ভর্তির সুযোগ তৈরি করা।",
        subjects: [
          "দাখিল পরীক্ষার ফাইনাল সাজেশন",
          "টাইম ম্যানেজমেন্ট ও এক্সাম স্ট্র্যাটেজি",
          "সকল বিষয়ের মডেল টেস্ট",
          "মানসিক প্রস্তুতি ও মোটিভেশন",
        ],
        duration: "1 Year",
      },

      // Alim 1st Year
      {
        name: "Alim 1st Year",
        slug: "alim-1st-year",
        icon: "📘",
        title: "Alim 1st Year",
        subtitle: "উচ্চশিক্ষার ভিত্তি ও আলিম সিলেবাস",
        image: "/images/madrasahMedium/alim-1st-year.png",
        description:
          "কলেজ বা মাদ্রাসার এই স্তরটি বিশ্ববিদ্যালয় ভর্তির জন্য অত্যন্ত গুরুত্বপূর্ণ। আমাদের টিউটররা আলিম সিলেবাসের পাশাপাশি অ্যাডমিশন টেস্টের বেসিক কনসেপ্টগুলো ক্লিয়ার করে দেন। আরবী সাহিত্য, বালাগাত এবং আইসিটি বা বিজ্ঞানের বিষয়গুলোতে সমান গুরুত্ব দিয়ে আমরা শিক্ষার্থীদের গড়ে তুলি।",
        subjects: [
          "আলিম পাঠ্যক্রমের গভীর বিশ্লেষণ",
          "উচ্চতর আরবী ও ইংরেজি",
          "বিশ্ববিদ্যালয় ভর্তির প্রাথমিক ধারণা",
          "সৃজনশীল নোট তৈরি ও অনুশীলন",
        ],
        duration: "1 Year",
      },

      // Alim 2nd Year
      {
        name: "Alim 2nd Year",
        slug: "alim-2nd-year",
        icon: "📗",
        title: "Alim 2nd Year",
        subtitle: "আলিম ফাইনাল ও ভার্সিটি অ্যাডমিশন প্রস্তুতি",
        image: "/images/madrasahMedium/alim-2nd-year.png",
        description:
          "আলিম পরীক্ষার্থীদের জন্য এটি চূড়ান্ত সময়। আমরা বোর্ড পরীক্ষার প্রস্তুতির পাশাপাশি ঢাকা বিশ্ববিদ্যালয় বা ইসলামিক বিশ্ববিদ্যালয়গুলোর ভর্তি পরীক্ষার জন্য গাইডলাইন প্রদান করি। আমাদের অভিজ্ঞ মেন্টরদের তত্ত্বাবধানে শিক্ষার্থীরা বোর্ড পরীক্ষায় সেরা ফলাফল এবং স্বপ্নের ক্যাম্পাসে ভর্তির যোগ্যতা অর্জন করে।",
        subjects: [
          "আলিম বোর্ড পরীক্ষার ফাইনাল রিভিশন",
          "বিশ্ববিদ্যালয় ভর্তি কোচিং (Gha/Kha Unit)",
          "বিগত বছরের প্রশ্ন বিশ্লেষণ",
          "ক্যারিয়ার ও উচ্চশিক্ষা পরামর্শ",
        ],
        duration: "1 Year",
      },
    ],
  },
  // Admission test\
  {
    name: "Admission test",
    slug: "admission-test",
    image: "/images/tutoringServices/admission-test.png",

    description: "Admission test education for skill development",
    classes: [
      {
        name: "Engineering University Admission",
        slug: "engineering-university-admission",
        icon: "🏗️",
        title: "Engineering University Admission",
        subtitle: "Prepare for Engineering Entrance Exams",
        image: "/images/engineering-ua.jpg",
        description:
          "Comprehensive guidance for engineering university admission including exam strategies, subject preparation, and practical problem-solving skills.",
        subjects: [
          "Physics",
          "Chemistry",
          "Mathematics",
          "English",
          "General Knowledge",
        ],
        duration: "1 Year",
      },

      {
        name: "Public University Admission",
        slug: "public-university-admission",
        icon: "🏛️",
        title: "Public University Admission",
        subtitle: "Prepare for Public University Entrance Tests",
        image: "/images/public-university-ua.jpg",
        description:
          "Guidance for all public university entrance exams, focusing on key subjects, exam strategies, and mock tests for top performance.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "General Knowledge",
          "IQ & Logical Reasoning",
        ],
        duration: "1 Year",
      },

      {
        name: "Medical College Admission (Private)",
        slug: "medical-college-private-admission",
        icon: "🏥",
        title: "Medical College Admission (Private)",
        subtitle: "Medical Entrance Preparation",
        image: "/images/medical-college-private.jpg",
        description:
          "Preparation for private medical college admissions. Includes biology, chemistry, physics, English, and past exam pattern practice.",
        subjects: [
          "Biology",
          "Chemistry",
          "Physics",
          "English",
          "Logical Reasoning",
        ],
        duration: "1 Year",
      },

      {
        name: "National University Admission",
        slug: "national-university-admission",
        icon: "🎓",
        title: "National University Admission",
        subtitle: "NU Undergraduate Preparation",
        image: "/images/nu-admission.jpg",
        description:
          "Guidance for National University undergraduate admission tests. Covers core subjects, study strategies, and past question practice.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "General Knowledge",
          "ICT Basics",
        ],
        duration: "1 Year",
      },

      {
        name: "Cadet College Admission",
        slug: "cadet-college-admission",
        icon: "🎖️",
        title: "Cadet College Admission",
        subtitle: "Prepare for Cadet College Entrance",
        image: "/images/cadet-admission.jpg",
        description:
          "Comprehensive preparation for cadet college entrance exams including academic subjects, physical fitness, IQ tests, and interview preparation.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "IQ & Logical Reasoning",
          "Physical Fitness",
        ],
        duration: "1 Year",
      },

      {
        name: "School Admission",
        slug: "school-admission",
        icon: "🏫",
        title: "School Admission",
        subtitle: "Prepare for School Entrance Tests",
        image: "/images/school-admission.jpg",
        description:
          "Preparation for school admission exams for primary and secondary levels. Covers basic subjects, logical reasoning, and general knowledge.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "General Knowledge",
          "IQ & Logical Reasoning",
        ],
        duration: "1 Year",
      },
    ],
  },
  // Religious Studies
  {
    name: "ধর্মীয় ও নৈতিক শিক্ষা",
    slug: "religious-studies",
    image: "/images/tutoringServices/religious-studies.png",
    description:
      "শুদ্ধাচার, নৈতিকতা এবং আত্মিক প্রশান্তির জন্য সঠিক ধর্মীয় শিক্ষা নিশ্চিত করুন।",
    classes: [
      {
        name: "Islamic Studies",
        slug: "islamic-studies",
        icon: "🕌",
        title: "Islamic Studies",
        subtitle: "সহীহ কুরআন ও সুন্নাহর আলোকে জীবন গঠন",
        image: "/images/religiousStudies/islamic-studies.png",
        description:
          "আধুনিক ব্যস্ততায় যেন সন্তানের দ্বীনি শিক্ষা পিছিয়ে না পড়ে। আমাদের অভিজ্ঞ হাফেজ ও আলেমগণ পরম যত্নে আপনার সন্তানকে সহীহ শুদ্ধভাবে কুরআন তিলাওয়াত, নামাজের নিয়ম এবং ইসলামের বুনিয়াদি বিষয়গুলো শেখাবেন। আমরা কেবল আরবী পড়া নয়, বরং ইসলামি আদব-কায়দা ও চরিত্র গঠনে গুরুত্ব দিই।",
        subjects: [
          "সহীহ তাজবীদসহ কুরআন শিক্ষা (Quran with Tajweed)",
          "নামাজ ও ওজুর সঠিক নিয়ম (Fiqh & Salah)",
          "প্রয়োজনীয় দোয়া, হাদিস ও মাসআলা-মাসায়েল",
          "নবী-রাসূলদের জীবনী ও ইসলামি ইতিহাস",
        ],
        duration: "1 Year",
      },

      {
        name: "Hinduism Studies",
        slug: "hinduism-studies",
        icon: "🛕",
        title: "Hinduism Studies",
        subtitle: "সনাতন ধর্মের জ্ঞান ও আধ্যাত্মিক বিকাশ",
        image: "/images/religiousStudies/hinduism-studies.png",
        description:
          "আপনার সন্তানের মনে ধর্মের প্রতি শ্রদ্ধা ও আধ্যাত্মিক চেতনার উন্মেষ ঘটাতে আমাদের এই আয়োজন। অভিজ্ঞ পণ্ডিতদের তত্ত্বাবধানে গীতা পাঠ, মন্ত্র উচ্চারণ এবং ধর্মানুষ্ঠানের সঠিক নিয়ম শেখানো হয়। পাশাপাশি রামায়ণ ও মহাভারতের শিক্ষণীয় গল্পের মাধ্যমে তাদের নৈতিক চরিত্র গঠনে সহায়তা করা হয়।",
        subjects: [
          "শুদ্ধ উচ্চারণে বেদ ও গীতা পাঠ (Gita & Vedas)",
          "নিত্যকর্ম, মন্ত্র ও শ্লোক শিক্ষা",
          "পূজা-পার্বণের নিয়ম ও আচার-অনুষ্ঠান",
          "ধর্মীয় নীতি ও মহাপুরুষদের জীবনী",
        ],
        duration: "1 Year",
      },

      {
        name: "Buddhism Studies",
        slug: "buddhism-studies",
        icon: "🕉️",
        title: "Buddhism Studies",
        subtitle: "শান্তি, মৈত্রী ও প্রজ্ঞার অনুশীলন",
        image: "/images/religiousStudies/buddhism-studies.png",
        description:
          "গৌতম বুদ্ধের অহিংসা ও শান্তির বাণী আপনার সন্তানের জীবনে ছড়িয়ে দিতে আমাদের অভিজ্ঞ ভিক্ষু ও ধর্মগুরুরা সহায়তা করবেন। ত্রিপিটকের মূল শিক্ষা, শীল পালন এবং ধ্যানের (Meditation) মাধ্যমে আমরা শিক্ষার্থীদের মানসিক প্রশান্তি ও মানবিক গুণাবলী অর্জনে উদ্বুদ্ধ করি।",
        subjects: [
          "ত্রিপিটক ও বুদ্ধের জীবনী (Life of Buddha)",
          "পঞ্চশীল ও অষ্টশীল পালন",
          "ধ্যান বা মেডিটেশনের প্রাথমিক ধাপ",
          "বৌদ্ধ সংস্কৃতি ও জাতকের গল্প",
        ],
        duration: "1 Year",
      },

      {
        name: "Christianity Studies",
        slug: "christianity-studies",
        icon: "✝️",
        title: "Christianity Studies",
        subtitle: "যীশুর প্রেম ও সেবার মহৎ শিক্ষা",
        image: "/images/religiousStudies/christianity-studies.png",
        description:
          "বাইবেলের পবিত্র বাণী এবং যীশু খ্রিস্টের ত্যাগের আদর্শ নিয়ে আমাদের এই কোর্স। চার্চের ইতিহাস, প্রার্থনা সঙ্গীত এবং মানবসেবার গুরুত্ব সম্পর্কে শিশুদের শিক্ষা দেওয়া হয়। আমরা নিশ্চিত করি যেন শিক্ষার্থীরা সৎ, সত্যবাদী এবং সহানুভূতিশীল মানুষ হিসেবে গড়ে ওঠে।",
        subjects: [
          "পবিত্র বাইবেল পাঠ ও ব্যাখ্যা (Bible Studies)",
          "প্রার্থনা ও ধর্মীয় সঙ্গীত (Prayer & Hymns)",
          "খ্রিস্টান মূল্যবোধ ও নৈতিকতা",
          "চার্চের ইতিহাস ও সাধুদের জীবনী",
        ],
        duration: "1 Year",
      },
    ],
  },
  // Arts & Creativity\
  {
    name: "Arts & Creativity",
    slug: "arts-creativity",
    image: "/images/tutoringServices/arts&creativity.png",
    description: "Creative arts education for developing artistic talents",
    classes: [
      {
        name: "Drawing",
        icon: "🎨",
        slug: "drawing",
        title: "Drawing & Sketching",
        subtitle: "Master the Art of Drawing",
        description:
          "Our drawing program teaches fundamental techniques from basic sketching to advanced realistic drawing. Students learn perspective, shading, proportion, and various drawing styles. Whether you're a beginner or want to refine your skills, our experienced art instructors provide personalized guidance to develop your artistic abilities.",
        image: "/images/drawing.jpg",
        subjects: [
          "Basic Sketching",
          "Shading Techniques",
          "Perspective Drawing",
          "Portrait Drawing",
          "Still Life",
          "Composition",
        ],
        duration: "3-6 Months (Beginner to Advanced)",
      },
      {
        name: "Painting",
        icon: "🎨",
        slug: "painting",
        title: "Painting & Color Theory",
        subtitle: "Express Yourself Through Colors",
        description:
          "Learn various painting techniques including watercolor, acrylic, and oil painting. Our classes cover color theory, composition, different painting styles, and creative expression. Students explore various subjects from landscapes to abstract art, developing their unique artistic voice under guidance of professional artists.",
        image: "/images/painting.jpg",
        subjects: [
          "Watercolor Techniques",
          "Acrylic Painting",
          "Oil Painting Basics",
          "Color Mixing",
          "Landscape Painting",
          "Abstract Art",
        ],
        duration: "4-8 Months per Medium",
      },
      {
        name: "Sculpture",
        icon: "🎨",
        slug: "sculpture",
        title: "Sculpture & 3D Art",
        subtitle: "Create Three-Dimensional Masterpieces",
        description:
          "Sculpture classes teach the art of creating three-dimensional forms using various materials including clay, plaster, and mixed media. Students learn fundamental techniques, understand form and space, and develop skills in both traditional and contemporary sculpture methods. Perfect for those interested in exploring 3D artistic expression.",
        image: "/images/sculpture.jpg",
        subjects: [
          "Clay Modeling",
          "Carving Techniques",
          "Casting Methods",
          "Form & Structure",
          "Relief Sculpture",
          "Contemporary Sculpture",
        ],
        duration: "6-12 Months",
      },
      {
        name: "Photography",
        icon: "🎨",
        slug: "photography",
        title: "Photography & Visual Arts",
        subtitle: "Capture the World Through Your Lens",
        description:
          "Photography course covers both technical and artistic aspects of creating compelling images. Learn camera operation, composition rules, lighting techniques, and post-processing. Students explore various genres including portrait, landscape, street, and commercial photography while developing their unique photographic style.",
        image: "/images/photography.jpg",
        subjects: [
          "Camera Basics",
          "Composition Rules",
          "Lighting Techniques",
          "Portrait Photography",
          "Photo Editing",
          "Digital Workflow",
        ],
        duration: "3-6 Months",
      },
      {
        name: "Music",
        icon: "🎨",
        slug: "music",
        title: "Music Education",
        subtitle: "Discover Your Musical Potential",
        description:
          "Music classes offer comprehensive training in vocal or instrumental music. Learn music theory, rhythm, melody, and performance techniques. Whether you want to learn classical music, contemporary styles, or traditional instruments, our qualified music teachers provide structured lessons tailored to your goals and skill level.",
        image: "/images/music.jpg",
        subjects: [
          "Music Theory",
          "Instrument Training",
          "Vocal Training",
          "Rhythm & Melody",
          "Music Reading",
          "Performance Skills",
        ],
        duration: "Ongoing (Monthly Basis)",
      },
    ],
  },
  // Skill Development\
  {
    name: "Skill Development",
    slug: "skill-development",
    image: "/images/tutoringServices/professional-skill-development.png",

    description:
      "Courses designed to enhance professional skills for career growth and workplace excellence",
    classes: [
      {
        name: "Communication Skills",
        icon: "🗣️",
        slug: "communication-skills",
        title: "Effective Communication",
        subtitle: "Master Verbal & Written Communication",
        description:
          "Learn how to communicate effectively in professional environments. Topics include email writing, presentation skills, public speaking, interpersonal communication, and active listening. Ideal for enhancing workplace performance and career opportunities.",
        image: "/images/communication-skills.jpg",
        subjects: [
          "Verbal Communication",
          "Written Communication",
          "Public Speaking",
          "Presentation Skills",
          "Active Listening",
          "Interpersonal Skills",
        ],
        duration: "2-4 Months",
      },
      {
        name: "Leadership & Management",
        icon: "📈",
        slug: "leadership-management",
        title: "Leadership & Management",
        subtitle: "Develop Leadership and Team Management Skills",
        description:
          "Gain the knowledge and skills to lead teams effectively. Learn about leadership styles, team dynamics, project management, conflict resolution, and decision-making to become an effective manager or team leader.",
        image: "/images/leadership-management.jpg",
        subjects: [
          "Leadership Styles",
          "Team Management",
          "Project Management",
          "Conflict Resolution",
          "Decision Making",
          "Time Management",
        ],
        duration: "3-6 Months",
      },
      {
        name: "Digital Skills",
        icon: "💻",
        slug: "digital-skills",
        title: "Digital Skills Training",
        subtitle: "Enhance Your Digital Literacy",
        description:
          "Learn essential digital skills for the modern workplace. Topics include MS Office, Google Workspace, basic coding, digital marketing, social media management, and data analysis.",
        image: "/images/digital-skills.jpg",
        subjects: [
          "MS Office & Google Workspace",
          "Basic Coding",
          "Digital Marketing",
          "Social Media Management",
          "Data Analysis",
          "Online Collaboration Tools",
        ],
        duration: "2-5 Months",
      },
      {
        name: "Entrepreneurship",
        icon: "🚀",
        slug: "entrepreneurship",
        title: "Entrepreneurship & Business Skills",
        subtitle: "Start and Grow Your Own Business",
        description:
          "Develop business and entrepreneurial skills. Learn business planning, finance basics, marketing, leadership, and innovation strategies to successfully start or manage a business.",
        image: "/images/entrepreneurship.jpg",
        subjects: [
          "Business Planning",
          "Financial Management",
          "Marketing & Sales",
          "Innovation & Creativity",
          "Leadership Skills",
          "Startup Strategies",
        ],
        duration: "3-6 Months",
      },
      {
        name: "Professional Certifications",
        icon: "📜",
        slug: "professional-certifications",
        title: "Certifications & Career Advancement",
        subtitle: "Boost Your Career with Certifications",
        description:
          "Prepare for professional certifications that enhance career opportunities. Includes project management, IT certifications, language proficiency, and other skill-specific certifications.",
        image: "/images/professional-certifications.jpg",
        subjects: [
          "Project Management Certifications",
          "IT & Software Certifications",
          "Language Proficiency Exams",
          "Career Development",
          "Skill-Specific Training",
          "Continuous Learning",
        ],
        duration: "Ongoing (Monthly or Flexible)",
      },
    ],
  },
  // Language Training
  {
    name: "Language Training",
    slug: "language-training",
    image: "/images/tutoringServices/language-training.png",

    description:
      "Professional language courses for communication and certification",
    classes: [
      {
        name: "English",
        icon: "🗣️",
        slug: "english",
        title: "English Language Training",
        subtitle: "Speak with Confidence and Clarity",
        description:
          "Hesitation is the biggest barrier to career growth. Our Spoken English program moves beyond textbooks to real-world conversation. Whether you are a student or a corporate professional, we help you remove grammatical fear, fix your pronunciation, and speak fluently in any environment.",
        image: "/images/languageTraining/english.png",
        subjects: [
          "Fluency building & public speaking",
          "Professional email writing & presentation",
          "Accent neutralization & pronunciation",
          "Grammar correction for daily use",
        ],
        duration: "3-12 Months (Beginner to Advanced)",
      },
      {
        name: "IELTS",
        icon: "🗣️",
        slug: "ielts",
        title: "IELTS Preparation",
        subtitle: "Your Gateway to Global Education",
        description:
          "Cracking IELTS isn't just about knowing English; it's about knowing the exam strategy. Our certified mentors provide module-specific training (Listening, Reading, Writing, Speaking) to help you secure your desired Band Score (6.5 to 8.0+) for UK, Canada, or Australia.",
        image: "/images/languageTraining/ielts.png",
        subjects: [
          "Writing Task 1 & 2 (Structure & Vocabulary)",
          "Speaking Mock Tests with feedback",
          "Time management for Reading passages",
          "Listening tips to catch fast accents",
        ],
        duration: "2-4 Months Intensive Course",
      },
      {
        name: "TOEFL",
        icon: "🗣️",
        slug: "toefl",
        title: "TOEFL Test Preparation",
        subtitle: "Excel in North American Admissions",
        description:
          "TOEFL is the gold standard for US universities. Our course is designed to master the 'Internet-Based Test (iBT)' format. We focus on integrated tasks where you have to listen, read, and speak simultaneously, ensuring you are ready for the academic rigor of American campuses.",
        image: "/images/languageTraining/toefl.png",
        subjects: [
          "Note-taking strategies for lectures",
          "Integrated Speaking & Writing tasks",
          "Academic vocabulary enrichment",
          "Full-length computer-based Mock Tests",
        ],
        duration: "2-3 Months Focused Training",
      },
      {
        name: "German",
        icon: "🗣️",
        slug: "german",
        title: "German Language Course",
        subtitle: "Unlock Opportunities in Germany",
        description:
          "Germany is a top destination for engineers and higher studies. We offer structured courses from A1 (Beginner) to B2 (Advanced) following the Goethe-Institut standards. Our instructors focus on grammar accuracy and speaking so you can survive and thrive in a German-speaking environment.",
        image: "/images/languageTraining/german.png",
        subjects: [
          "A1 to B2 level complete grammar",
          "Preparation for Goethe-Zertifikat exams",
          "German culture and daily life conversation",
          "Visa interview preparation",
        ],
        duration: "3-4 Months per Level",
      },
      {
        name: "PTE",
        icon: "🗣️",
        slug: "pte",
        title: "PTE Academic Preparation",
        subtitle: "The Fast-Track to Migration",
        description:
          "PTE is the modern choice for students and migrants to Australia and the UK. Since it is AI-scored, we teach you the specific 'algorithms' and 'templates' to maximize your score. Our intensive practice ensures you master the computer-based format quickly.",
        image: "/images/languageTraining/pte.png",
        subjects: [
          "Speaking fluency tricks for AI scoring",
          "Essay and summary writing templates",
          "Describe Image & Retell Lecture strategies",
          "Real-time scored Mock Tests",
        ],
        duration: "1-2 Months Intensive Training",
      },
    ],
  },
  // Job Preparation\
  {
    name: "Job Preparation",
    slug: "job-preparation",
    image: "/images/tutoringServices/job-preparation.png",

    description: "Comprehensive programs to prepare for career and job success",
    classes: [
      {
        name: "Resume & Cover Letter",
        icon: "📝",
        slug: "resume-cover-letter",
        title: "Resume and Cover Letter Writing",
        subtitle: "Craft a Winning Resume",
        description:
          "Learn how to create professional resumes and cover letters that stand out to employers. Includes formatting, highlighting skills, and tailoring applications for specific jobs.",
        image: "/images/resume-cover-letter.jpg",
        subjects: [
          "Resume Formatting",
          "Cover Letter Writing",
          "Professional Language",
          "Tailoring Applications",
          "Highlighting Achievements",
          "ATS Optimization",
        ],
        duration: "1-2 Months",
      },
      {
        name: "Interview Skills",
        icon: "🎤",
        slug: "interview-skills",
        title: "Interview Preparation",
        subtitle: "Ace Your Job Interviews",
        description:
          "Master techniques for successful job interviews including behavioral questions, technical questions, and professional presentation. Gain confidence and communication skills for various job roles.",
        image: "/images/interview-skills.jpg",
        subjects: [
          "Mock Interviews",
          "Behavioral Questions",
          "Technical Questions",
          "Communication Skills",
          "Body Language",
          "Confidence Building",
        ],
        duration: "1-3 Months",
      },
      {
        name: "Aptitude & Reasoning",
        icon: "🧠",
        slug: "aptitude-reasoning",
        title: "Aptitude and Logical Reasoning",
        subtitle: "Develop Problem Solving Skills",
        description:
          "Prepare for aptitude and reasoning tests used in recruitment. Focus on quantitative ability, logical reasoning, and analytical thinking to excel in competitive exams.",
        image: "/images/aptitude-reasoning.jpg",
        subjects: [
          "Quantitative Aptitude",
          "Logical Reasoning",
          "Data Interpretation",
          "Analytical Thinking",
          "Problem Solving Techniques",
          "Practice Tests",
        ],
        duration: "2-4 Months",
      },
      {
        name: "Soft Skills & Communication",
        icon: "💬",
        slug: "soft-skills-communication",
        title: "Soft Skills and Communication",
        subtitle: "Enhance Workplace Readiness",
        description:
          "Develop essential soft skills required in the workplace, including effective communication, teamwork, time management, and leadership qualities for professional success.",
        image: "/images/soft-skills.jpg",
        subjects: [
          "Effective Communication",
          "Teamwork & Collaboration",
          "Time Management",
          "Problem Solving",
          "Leadership Skills",
          "Professional Etiquette",
        ],
        duration: "2-3 Months",
      },
      {
        name: "Job Portals & Networking",
        icon: "🌐",
        slug: "job-portals-networking",
        title: "Job Portals and Networking",
        subtitle: "Find and Secure Job Opportunities",
        description:
          "Learn how to effectively use online job portals and professional networking platforms. Tips for networking, personal branding, and job search strategies to maximize career opportunities.",
        image: "/images/job-networking.jpg",
        subjects: [
          "LinkedIn Profile Optimization",
          "Job Portal Registration",
          "Networking Strategies",
          "Personal Branding",
          "Application Tracking",
          "Professional Online Presence",
        ],
        duration: "1-2 Months",
      },
    ],
  },
];
