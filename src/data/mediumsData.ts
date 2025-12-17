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
        subtitle: "Building Foundation for Early Learners",
        description:
          "Our Play Group program focuses on developing fundamental learning skills through interactive play-based activities. We help children develop social skills, basic language abilities, and motor skills in a nurturing environment. Expert teachers use age-appropriate methods to make learning fun and engaging while preparing children for their academic journey.",
        image: "/images/banglaMedium/play.png",
        subjects: [
          "Basic Bangla",
          "Numbers",
          "Colors & Shapes",
          "Rhymes",
          "Drawing",
        ],
        duration: "6 months - 1 year",
      },
      {
        name: "Nursery",
        icon: "🎒",
        slug: "nursery",
        title: "Nursery Level Education",
        subtitle: "Nurturing Young Minds with Care",
        description:
          "The Nursery program builds upon foundational skills with structured learning activities. Children learn basic Bangla alphabets, numbers, and develop early reading skills. Our experienced tutors create a supportive environment that encourages curiosity, creativity, and confidence in young learners.",
        image: "/images/banglaMedium/nursery.png",
        subjects: [
          "Bangla Alphabets",
          "English Basics",
          "Mathematics",
          "General Knowledge",
          "Creative Arts",
        ],
        duration: "1 year",
      },
      {
        name: "KG",
        icon: "🎒",
        slug: "kg",
        title: "Kindergarten Education",
        subtitle: "Preparing for Primary School Success",
        description:
          "Our KG program provides comprehensive preparation for primary education. Students strengthen their Bangla and English language skills, develop mathematical thinking, and enhance their problem-solving abilities. We focus on building confidence and independence to ensure smooth transition to formal schooling.",
        image: "/images/banglaMedium/kg.png",
        subjects: [
          "Bangla",
          "English",
          "Mathematics",
          "Environment Studies",
          "ICT Basics",
        ],
        duration: "1 year",
      },
      {
        name: "Class 1",
        icon: "📘",
        slug: "class-1",
        title: "Class 1 Tutoring",
        subtitle: "Starting the Academic Journey Right",
        description:
          "Class 1 marks the beginning of formal education. Our tutors help students adapt to structured learning while making studies enjoyable. We cover all subjects prescribed in the Bangla medium curriculum, ensuring strong fundamentals in language, mathematics, and general knowledge.",
        image: "/images/banglaMedium/class-1.jpg",
        subjects: [
          "Bangla",
          "English",
          "Mathematics",
          "Bangladesh & Global Studies",
          "Science",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 2",
        icon: "📘",
        slug: "class-2",
        title: "Class 2 Tutoring",
        subtitle: "Starting the Academic Journey Right",
        description:
          "Class 1 marks the beginning of formal education. Our tutors help students adapt to structured learning while making studies enjoyable. We cover all subjects prescribed in the Bangla medium curriculum, ensuring strong fundamentals in language, mathematics, and general knowledge.",
        image: "/images/banglaMedium/class-2.jpg",
        subjects: [
          "Bangla",
          "English",
          "Mathematics",
          "Bangladesh & Global Studies",
          "Science",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 3",
        icon: "📘",
        slug: "class-3",
        title: "Class 3 Tutoring",
        subtitle: "Starting the Academic Journey Right",
        description:
          "Class 3 marks the beginning of formal education. Our tutors help students adapt to structured learning while making studies enjoyable. We cover all subjects prescribed in the Bangla medium curriculum, ensuring strong fundamentals in language, mathematics, and general knowledge.",
        image: "/images/banglaMedium/class-3.jpg",
        subjects: [
          "Bangla",
          "English",
          "Mathematics",
          "Bangladesh & Global Studies",
          "Science",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 4",
        icon: "📘",
        slug: "class-4",
        title: "Class 4 Tutoring",
        subtitle: "Starting the Academic Journey Right",
        description:
          "Class 4 marks the beginning of formal education. Our tutors help students adapt to structured learning while making studies enjoyable. We cover all subjects prescribed in the Bangla medium curriculum, ensuring strong fundamentals in language, mathematics, and general knowledge.",
        image: "/images/banglaMedium/class-4.jpg",
        subjects: [
          "Bangla",
          "English",
          "Mathematics",
          "Bangladesh & Global Studies",
          "Science",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 5",
        icon: "📒",
        slug: "class-5",
        title: "Class 5 - PSC Preparation",
        subtitle: "Excellence in Primary School Certificate",
        description:
          "Class 5 is crucial as students prepare for their first major public examination - PSC. Our expert tutors provide comprehensive coverage of all subjects, regular practice tests, and exam strategies. We focus on concept clarity, problem-solving skills, and exam technique to ensure outstanding results.",
        image: "/images/banglaMedium/class-5.jpg",
        subjects: [
          "Bangla",
          "English",
          "Mathematics",
          "Bangladesh & Global Studies",
          "Science",
          "Islam/Hindu Religion",
        ],
        duration: "Full Academic Year + Exam Prep",
      },
      {
        name: "Class 6",
        icon: "📒",
        slug: "class-6",
        title: "Class 6 - PSC Preparation",
        subtitle: "Excellence in Primary School Certificate",
        description:
          "Class 6 is crucial as students prepare for their first major public examination - PSC. Our expert tutors provide comprehensive coverage of all subjects, regular practice tests, and exam strategies. We focus on concept clarity, problem-solving skills, and exam technique to ensure outstanding results.",
        image: "/images/banglaMedium/class-6.jpg",
        subjects: [
          "Bangla",
          "English",
          "Mathematics",
          "Bangladesh & Global Studies",
          "Science",
          "Islam/Hindu Religion",
        ],
        duration: "Full Academic Year + Exam Prep",
      },
      {
        name: "Class 7",
        icon: "📒",
        slug: "class-7",
        title: "Class 7 - PSC Preparation",
        subtitle: "Excellence in Primary School Certificate",
        description:
          "Class 7 is crucial as students prepare for their first major public examination - PSC. Our expert tutors provide comprehensive coverage of all subjects, regular practice tests, and exam strategies. We focus on concept clarity, problem-solving skills, and exam technique to ensure outstanding results.",
        image: "/images/banglaMedium/class-7.jpg",
        subjects: [
          "Bangla",
          "English",
          "Mathematics",
          "Bangladesh & Global Studies",
          "Science",
          "Islam/Hindu Religion",
        ],
        duration: "Full Academic Year + Exam Prep",
      },
      {
        name: "Class 8",
        icon: "📚",
        slug: "class-8",
        title: "Class 8 - JSC Foundation",
        subtitle: "Preparing for Junior School Certificate",
        description:
          "Class 8 prepares students for JSC examination with in-depth subject knowledge. Our tutors provide specialized guidance in all subjects, helping students master complex concepts in mathematics, science, and languages. Regular assessments and personalized attention ensure academic excellence.",
        image: "/images/banglaMedium/class-8.jpg",
        subjects: [
          "Bangla",
          "English",
          "Mathematics",
          "Science",
          "Bangladesh & Global Studies",
          "ICT",
          "Religion",
        ],
        duration: "Full Academic Year + Exam Prep",
      },
      {
        name: "Class 9",
        icon: "📖",
        slug: "class-9",
        title: "Class 9 - SSC Foundation",
        subtitle: "Building Strong SSC Foundation",
        description:
          "Class 9 is the foundation year for SSC. Students choose their groups (Science/Commerce/Arts) and begin specialized study. Our experienced tutors provide comprehensive support in all subjects, helping students build strong conceptual understanding and develop effective study habits for success in SSC.",
        image: "/images/banglaMedium/class-9.jpg",
        subjects: [
          "Bangla",
          "English",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Higher Mathematics",
          "ICT",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 10",
        icon: "📑",
        slug: "class-10",
        title: "Class 10 - SSC Examination",
        subtitle: "Achieving SSC Excellence",
        description:
          "Class 10 is the final year before SSC board examination. Our expert tutors provide intensive preparation with comprehensive revision, problem-solving practice, and exam techniques. We conduct regular mock tests, provide detailed feedback, and ensure students are fully prepared for their SSC examination.",
        image: "/images/banglaMedium/class-10.jpg",
        subjects: [
          "All SSC Subjects",
          "Creative Question Practice",
          "MCQ Mastery",
          "Exam Strategies",
        ],
        duration: "Full Year + Intensive Exam Prep",
      },
      {
        name: "Class 11",
        icon: "📃",
        slug: "class-11",
        title: "Class 11 - HSC Foundation",
        subtitle: "Starting Higher Secondary Education",
        description:
          "Class 11 introduces advanced concepts in chosen streams (Science/Commerce/Arts). Our qualified tutors help students adapt to college-level studies, providing expert guidance in complex topics. We focus on building analytical skills and deep subject understanding essential for HSC success.",
        image: "/images/banglaMedium/class-11.jpg",
        subjects: [
          "Bangla",
          "English",
          "ICT",
          "Group-Specific Subjects (Physics, Chemistry, Biology/Accounting, Business/History, Geography)",
        ],
        duration: "Full Academic Year",
      },
      {
        name: "Class 12",
        icon: "📄",
        slug: "class-12",
        title: "Class 12 - HSC Excellence",
        subtitle: "Mastering HSC for University Admission",
        description:
          "Class 12 is critical for HSC examination and university admission. Our expert tutors provide comprehensive preparation covering all syllabus topics, advanced problem-solving, and exam strategies. We conduct extensive mock tests and provide personalized guidance to help students achieve their dream results and secure university admission.",
        image: "/images/banglaMedium/class-12.jpg",
        subjects: [
          "All HSC Subjects",
          "Advanced Topics",
          "University Admission Preparation",
          "Creative & Analytical Skills",
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
        subtitle: "Foundation of Growth & Play Learning",
        image: "/images/englishMedium/pre-schooling.png",
        description:
          "Pre-schooling focuses on developing social, motor, and early cognitive skills. Our approach is centered on interactive learning, emotional comfort, and growth mindset.",
        subjects: [
          "Basic Reading",
          "Alphabet Recognition",
          "Drawing & Coloring",
          "Music & Rhymes",
          "Motor Skills Activities",
        ],
        duration: "1 Year",
      },

      {
        name: "Play Group",
        slug: "play-group",
        icon: "🎈",
        title: "Play Group Classes",
        subtitle: "Learn Through Games",
        image: "/images/englishMedium/play-group.png",
        description:
          "Play group enhances curiosity through fun learning activities. Children learn through visual, sound, and sensory exploration.",
        subjects: [
          "Basic Letters",
          "Counting Numbers",
          "Shapes & Colors",
          "Story Time",
          "Physical Activities",
        ],
        duration: "1 Year",
      },

      {
        name: "KG (Kindergarten)",
        slug: "kg",
        icon: "🎒",
        title: "Kindergarten Program",
        subtitle: "Emotional, Social & Academic Readiness",
        image: "/images/englishMedium/kg.png",
        description:
          "KG helps students prepare for primary education with structured academic practices and creative development.",
        subjects: [
          "English Basics",
          "Mathematics Basics",
          "Bangla Alphabet",
          "Art & Drawing",
          "General Knowledge",
        ],
        duration: "1 Year",
      },

      // Standard 1–9
      {
        name: "Standard 1",
        slug: "standard-1",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Fundamental Academic Development",
        image: "/images/englishMedium/standard-1.png",
        description:
          "We provide full support across school subjects with personalized attention, exam preparation, and guidance for continuous improvement.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
          "Religion",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 2",
        slug: "standard-2",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Fundamental Academic Development",
        image: "/images/englishMedium/standard-2.png",
        description:
          "We provide full support across school subjects with personalized attention, exam preparation, and guidance for continuous improvement.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
          "Religion",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 3",
        slug: "standard-3",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Fundamental Academic Development",
        image: "/images/englishMedium/standard-3.png",
        description:
          "We provide full support across school subjects with personalized attention, exam preparation, and guidance for continuous improvement.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
          "Religion",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 4",
        slug: "standard-4",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Fundamental Academic Development",
        image: "/images/englishMedium/standard-4.png",
        description:
          "We provide full support across school subjects with personalized attention, exam preparation, and guidance for continuous improvement.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
          "Religion",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 5",
        slug: "standard-5",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Fundamental Academic Development",
        image: "/images/englishMedium/standard-5.png",
        description:
          "We provide full support across school subjects with personalized attention, exam preparation, and guidance for continuous improvement.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
          "Religion",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 6",
        slug: "standard-6",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Fundamental Academic Development",
        image: "/images/englishMedium/standard-6.png",
        description:
          "We provide full support across school subjects with personalized attention, exam preparation, and guidance for continuous improvement.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
          "Religion",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 7",
        slug: "standard-7",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Fundamental Academic Development",
        image: "/images/englishMedium/standard-7.png",
        description:
          "We provide full support across school subjects with personalized attention, exam preparation, and guidance for continuous improvement.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
          "Religion",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 8",
        slug: "standard-8",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Fundamental Academic Development",
        image: "/images/englishMedium/standard-8.png",
        description:
          "We provide full support across school subjects with personalized attention, exam preparation, and guidance for continuous improvement.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
          "Religion",
        ],
        duration: "1 Year / Grade",
      },
      {
        name: "Standard 9",
        slug: "standard-9",
        icon: "📚",
        title: "Primary to Junior Secondary",
        subtitle: "Fundamental Academic Development",
        image: "/images/englishMedium/standard-9.png",
        description:
          "We provide full support across school subjects with personalized attention, exam preparation, and guidance for continuous improvement.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
          "Religion",
        ],
        duration: "1 Year / Grade",
      },

      // O Level
      {
        name: "O Level",
        slug: "o-level",
        icon: "📘",
        title: "O Level Education",
        subtitle: "Cambridge International (IGCSE)",
        image: "/images/englishMedium/o-level.png",
        description:
          "Comprehensive tutoring based on Cambridge and Edexcel syllabuses. We focus on exam strategies, topic mastery, and analytical problem solving.",
        subjects: [
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "English Language",
          "Computer Science",
          "Economics",
          "Accounting",
        ],
        duration: "2 Years (IGCSE)",
      },

      // A Level AS
      {
        name: "A Level AS",
        slug: "a-level-as",
        icon: "📗",
        title: "A Level AS",
        subtitle: "Advanced Subsidiary Level",
        image: "/images/englishMedium/a-level-as.png",
        description:
          "AS Level focuses on solid academic foundations for specialized A2 studies. We help learners develop conceptual mastery to secure top grades.",
        subjects: [
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Economics",
          "Computer Science",
          "Psychology",
        ],
        duration: "1 Year (Grade 11)",
      },

      // A Level A2
      {
        name: "A Level A2",
        slug: "a-level-a2",
        icon: "📕",
        title: "A Level A2",
        subtitle: "Advanced Level Qualification",
        image: "/images/englishMedium/a-level-a2.png",
        description:
          "A2 Level deepens academic understanding and prepares students for university entrance. We emphasize exam techniques, research skills, and advanced reasoning.",
        subjects: [
          "Advanced Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Economics",
          "Computer Science",
          "Psychology",
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
        subtitle: "Fun-based Child Development",
        image: "/images/englishVersion/play-group.png",
        description:
          "A playful learning environment for young children. Focus on sensory activities, social interaction, language development, and creativity through songs, toys, and guided play.",
        subjects: [
          "Early Language",
          "Creative Play",
          "Motor Skills",
          "Story Time",
          "Art & Craft",
          "Music & Rhymes",
        ],
        duration: "1 Year",
      },

      // Nursery
      {
        name: "Nursery",
        slug: "nursery",
        icon: "🌱",
        title: "Nursery Level",
        subtitle: "Foundation Stage Learning",
        image: "/images/englishVersion/nursery.png",
        description:
          "Nursery introduces basic early education skills. Students learn letters, shapes, colors, counting, social communication, and curiosity-driven activities.",
        subjects: [
          "Alphabet",
          "Number Basics",
          "Drawing",
          "Rhymes",
          "Story Learning",
          "Physical Play",
        ],
        duration: "1 Year",
      },

      // KG
      {
        name: "KG (Kindergarten)",
        slug: "kg",
        icon: "🎒",
        title: "Kindergarten Program",
        subtitle: "Emotional, Social & Academic Readiness",
        image: "/images/englishVersion/kg.png",
        description:
          "KG helps students prepare for primary education with structured academic practices and creative development.",
        subjects: [
          "English Basics",
          "Mathematics Basics",
          "Bangla Alphabet",
          "Art & Drawing",
          "General Knowledge",
        ],
        duration: "1 Year",
      },

      // Classes 1–12
      {
        name: "Class 1",
        slug: "class-1",
        icon: "📚",
        title: "Class 1 Primary Education",
        subtitle: "Early Formal Education",
        image: "/images/englishVersion/class-1.png",
        description:
          "Introduction to structured learning with fundamental topics in language, math, science, and environment.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "Art & Craft",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 2",
        slug: "class-2",
        icon: "📚",
        title: "Class 2 Primary Education",
        subtitle: "Concept Building & Skill Growth",
        image: "/images/englishVersion/class-2.png",
        description:
          "Strengthening base concepts with improved reading ability, basic calculations, environmental awareness, and creative expression.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "Art & Craft",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 3",
        slug: "class-3",
        icon: "📚",
        title: "Class 3 Primary Education",
        subtitle: "Intermediate Basics",
        image: "/images/englishVersion/class-3.png",
        description:
          "Students learn structured subjects like grammar, basic geometry, science experiments, and beginner-level computing.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Computer Basics",
          "Social Studies",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 4",
        slug: "class-4",
        icon: "📚",
        title: "Class 4 Primary Education",
        subtitle: "Logical & Analytical Skills",
        image: "/images/englishVersion/class-4.png",
        description:
          "Critical thinking through problem-solving tasks, advanced language structure, project-based science, and basic technology literacy.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "ICT",
          "Social Studies",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 5",
        slug: "class-5",
        icon: "📚",
        title: "Class 5 Primary Final",
        subtitle: "Primary Board Exam Preparation",
        image: "/images/englishVersion/class-5.png",
        description:
          "Foundation-to-exam level preparation for primary certificate exams, focusing on writing, reasoning, science, and math accuracy.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 6",
        slug: "class-6",
        icon: "📚",
        title: "Class 6 Middle School",
        subtitle: "Junior Secondary Academic Growth",
        image: "/images/englishVersion/class-6.png",
        description:
          "Covers standard middle school curriculum for foundational secondary education. Includes science, math, language, and ICT skills.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 7",
        slug: "class-7",
        icon: "📚",
        title: "Class 7 Middle School",
        subtitle: "Academic Development",
        image: "/images/englishVersion/class-7.png",
        description:
          "Students strengthen analytical and problem-solving skills while preparing for higher secondary curriculum.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 8",
        slug: "class-8",
        icon: "📚",
        title: "Class 8 Middle School",
        subtitle: "Academic Growth",
        image: "/images/englishVersion/class-8.png",
        description:
          "Focus on science, mathematics, social knowledge, and English language proficiency to prepare for SSC studies.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 9",
        slug: "class-9",
        icon: "📚",
        title: "Class 9 Secondary School",
        subtitle: "SSC Preparation",
        image: "/images/englishVersion/class-9.png",
        description:
          "Students prepare for SSC level with strong foundation in core subjects, exam-oriented practice, and analytical skills development.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "ICT",
          "Social Studies",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 10",
        slug: "class-10",
        icon: "📘",
        title: "Class 10 Secondary School",
        subtitle: "SSC Board Examination",
        image: "/images/englishVersion/class-10.png",
        description:
          "Final year before SSC exams. Focus on exam preparation, revision, problem solving, and advanced concept mastery.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "ICT",
          "Social Studies",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 11",
        slug: "class-11",
        icon: "📗",
        title: "Class 11 Higher Secondary",
        subtitle: "HSC Preparation / AS Level",
        image: "/images/englishVersion/class-11.png",
        description:
          "Introduction to higher secondary curriculum. Focus on advanced concepts, subject specialization, and exam strategies.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Economics",
          "ICT",
        ],
        duration: "1 Year",
      },

      {
        name: "Class 12",
        slug: "class-12",
        icon: "📕",
        title: "Class 12 Higher Secondary",
        subtitle: "HSC Preparation / A2 Level",
        image: "/images/englishVersion/class-12.png",
        description:
          "Final year preparation for university entrance and higher secondary completion. Focus on exam readiness, practicals, and subject mastery.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Economics",
          "ICT",
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
        subtitle: "Fun-based Child Development",
        image: "/images/madrasahMedium/play.png",
        description:
          "A playful learning environment for young children. Focus on sensory activities, social interaction, language development, and creativity through songs, toys, and guided play.",
        subjects: [
          "Early Language",
          "Creative Play",
          "Motor Skills",
          "Story Time",
          "Art & Craft",
          "Music & Rhymes",
        ],
        duration: "1 Year",
      },

      // Nursery
      {
        name: "Nursery",
        slug: "nursery",
        icon: "🌱",
        title: "Nursery Level",
        subtitle: "Foundation Stage Learning",
        image: "/images/madrasahMedium/nursery.png",
        description:
          "Nursery introduces basic early education skills. Students learn letters, shapes, colors, counting, social communication, and curiosity-driven activities.",
        subjects: [
          "Alphabet",
          "Number Basics",
          "Drawing",
          "Rhymes",
          "Story Learning",
          "Physical Play",
        ],
        duration: "1 Year",
      },

      // KG
      {
        name: "KG (Kindergarten)",
        slug: "kg",
        icon: "🎒",
        title: "Kindergarten Program",
        subtitle: "Emotional, Social & Academic Readiness",
        image: "/images/madrasahMedium/kg.png",
        description:
          "KG helps students prepare for primary education with structured academic practices and creative development.",
        subjects: [
          "English Basics",
          "Mathematics Basics",
          "Bangla Alphabet",
          "Art & Drawing",
          "General Knowledge",
        ],
        duration: "1 Year",
      },

      // Classes 1–10
      ...Array.from({ length: 10 }, (_, i) => ({
        name: `Class ${i + 1}`,
        slug: `class-${i + 1}`,
        icon: "📚",
        title: `Class ${i + 1} Education`,
        subtitle: "Primary to Secondary School Curriculum",
        image: `/images/madrasahMedium/class-${i + 1}.png`,
        description:
          "Structured learning across core subjects with exam preparation, practical exercises, and skill development.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Science",
          "Social Studies",
          "ICT",
        ],
        duration: "1 Year",
      })),

      // Alim 1st Year
      {
        name: "Alim 1st Year",
        slug: "alim-1st-year",
        icon: "📘",
        title: "Alim 1st Year",
        subtitle: "Higher Secondary Education",
        image: "/images/madrasahMedium/alim-1st-year.png",
        description:
          "Introduction to higher secondary curriculum with a focus on academic growth, advanced concepts, and exam preparation.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Islamic Studies",
          "ICT",
        ],
        duration: "1 Year",
      },

      // Alim 2nd Year
      {
        name: "Alim 2nd Year",
        slug: "alim-2nd-year",
        icon: "📗",
        title: "Alim 2nd Year",
        subtitle: "Higher Secondary Completion",
        image: "/images/madrasahMedium/alim-2nd-year.png",
        description:
          "Final year for Alim program, focusing on exam readiness, research, practicals, and university preparation.",
        subjects: [
          "English",
          "Bangla",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Islamic Studies",
          "ICT",
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
    name: "Religious Studies",
    slug: "religious-studies",
    image: "/images/tutoringServices/religious-studies.png",
    description:
      "Islamic education and Quranic studies for spiritual development",
    classes: [
      {
        name: "Islamic Studies",
        slug: "islamic-studies",
        icon: "🕌",
        title: "Islamic Studies",
        subtitle: "Comprehensive Islamic Education",
        image: "/images/religiousStudies/islamic-studies.png",
        description:
          "Learn the fundamentals of Islam including Quran, Hadith, Fiqh, and Islamic history. Focus on moral values, spiritual development, and practical applications in daily life.",
        subjects: [
          "Quran & Tafsir",
          "Hadith Studies",
          "Fiqh (Islamic Jurisprudence)",
          "Islamic History",
          "Aqidah & Moral Values",
        ],
        duration: "1 Year",
      },

      {
        name: "Hinduism Studies",
        slug: "hinduism-studies",
        icon: "🛕",
        title: "Hinduism Studies",
        subtitle: "Comprehensive Hindu Philosophy",
        image: "/images/religiousStudies/hinduism-studies.png",
        description:
          "Explore Hindu scriptures, philosophies, rituals, and cultural practices. Develop understanding of ethics, spirituality, and traditional values.",
        subjects: [
          "Vedas & Upanishads",
          "Puranas",
          "Hindu Rituals & Practices",
          "Hindu Philosophy",
          "Ethics & Morality",
        ],
        duration: "1 Year",
      },

      {
        name: "Buddhism Studies",
        slug: "buddhism-studies",
        icon: "🕉️",
        title: "Buddhism Studies",
        subtitle: "Introduction to Buddhist Teachings",
        image: "/images/religiousStudies/buddhism-studies.png",
        description:
          "Study the teachings of Buddha, Buddhist philosophy, meditation practices, and ethical principles for personal growth and spiritual awareness.",
        subjects: [
          "Life of Buddha",
          "Buddhist Philosophy",
          "Meditation Practices",
          "Ethics & Moral Conduct",
          "Buddhist Texts",
        ],
        duration: "1 Year",
      },

      {
        name: "Christianity Studies",
        slug: "christianity-studies",
        icon: "✝️",
        title: "Christianity Studies",
        subtitle: "Comprehensive Christian Education",
        image: "/images/religiousStudies/christianity-studies.png",
        description:
          "Learn about Christian beliefs, Bible teachings, church history, ethics, and spiritual development according to Christian values.",
        subjects: [
          "Bible Studies",
          "Church History",
          "Christian Ethics & Values",
          "Christian Practices",
          "Spiritual Development",
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
        subtitle: "Master Communication Skills",
        description:
          "Our English language program develops all four skills: speaking, listening, reading, and writing. Whether for academic purposes, professional advancement, or personal development, our qualified instructors use communicative methods and modern materials to help learners achieve fluency and confidence in English.",
        image: "/images/languageTraining/english.png",
        subjects: [
          "Speaking & Conversation",
          "Grammar",
          "Vocabulary Building",
          "Reading Comprehension",
          "Writing Skills",
          "Pronunciation",
        ],
        duration: "3-12 Months (Beginner to Advanced)",
      },
      {
        name: "IELTS",
        icon: "🗣️",
        slug: "ielts",
        title: "IELTS Preparation",
        subtitle: "Achieve Your Target Band Score",
        description:
          "IELTS preparation requires strategic training and practice. Our certified instructors provide comprehensive coaching for all four modules: Listening, Reading, Writing, and Speaking. We use official Cambridge materials, conduct regular mock tests, and provide personalized feedback to help you achieve your target band score for study abroad or immigration.",
        image: "/images/languageTraining/ielts.png",
        subjects: [
          "Listening Strategies",
          "Reading Techniques",
          "Writing Task 1 & 2",
          "Speaking Practice",
          "Mock Tests",
          "Score Enhancement",
        ],
        duration: "2-4 Months Intensive Course",
      },
      {
        name: "TOEFL",
        icon: "🗣️",
        slug: "toefl",
        title: "TOEFL Test Preparation",
        subtitle: "Excel in TOEFL for US Universities",
        description:
          "TOEFL is essential for admission to North American universities. Our experienced instructors provide expert training in all TOEFL sections: Reading, Listening, Speaking, and Writing. We use ETS materials, provide computer-based practice, and teach time management strategies to help you achieve high scores.",
        image: "/images/languageTraining/toefl.png",
        subjects: [
          "Reading Comprehension",
          "Academic Listening",
          "Integrated Speaking",
          "Independent Writing",
          "Computer-Based Practice",
          "Test Strategies",
        ],
        duration: "2-3 Months Focused Training",
      },
      {
        name: "German",
        icon: "🗣️",
        slug: "german",
        title: "German Language Course",
        subtitle: "Learn German from A1 to C2",
        description:
          "German language skills open opportunities for study and work in Germany. Our qualified native and non-native instructors teach all levels from A1 to C2 following the CEFR framework. We focus on practical communication skills, grammar, vocabulary, and cultural understanding essential for success in German-speaking environments.",
        image: "/images/languageTraining/german.png",
        subjects: [
          "Speaking & Conversation",
          "Grammar & Sentence Structure",
          "Vocabulary",
          "Reading & Writing",
          "German Culture",
          "TestDaF/Goethe Prep",
        ],
        duration: "3-4 Months per Level",
      },
      {
        name: "PTE",
        icon: "🗣️",
        slug: "pte",
        title: "PTE Academic Preparation",
        subtitle: "Master PTE for Quick Results",
        description:
          "PTE Academic is a computer-based English test accepted worldwide. Our expert trainers provide comprehensive preparation covering all sections: Speaking & Writing, Reading, and Listening. We use Pearson official materials, provide AI-scored practice, and teach specific strategies for this unique test format to help you achieve your desired score.",
        image: "/images/languageTraining/pte.png",
        subjects: [
          "Speaking Tasks",
          "Writing Essays",
          "Reading Strategies",
          "Listening Techniques",
          "Computer Skills",
          "Score Optimization",
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
