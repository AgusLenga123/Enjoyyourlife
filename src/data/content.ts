// All landing copy lives here so the client can edit text without touching components.

export const brand = {
  name: 'ENJOYOURLIFE.ENGLISH',
  short: 'Enjoyourlife.English',
};

// Default links. PUBLIC_CALENDLY_URL / PUBLIC_VSL_URL env vars override them if set.
export const links = {
  calendly: 'https://calendly.com/enjoyourlife_english/asesoria-inicial-enjoyourlife-english',
  vsl: 'https://youtu.be/cne9MMclOog',
};

export const contact = {
  // International format, digits only (used for wa.me and tel: links)
  phone: '5491162624321',
  phoneDisplay: '+54 9 11 6262-4321',
  whatsappMessage: 'Hola! Vi la landing de Enjoyourlife.English y quiero más información sobre el programa 1:1.',
};

export const hero = {
  badge: 'Inglés profesional para expertos IT con experiencia',
  titleLead: 'Tu experiencia como Developer merece',
  titleHighlight: 'demostrarse también en inglés',
  subtitle:
    'Prepará tu comunicación en inglés para entrevistas técnicas y oportunidades internacionales para expresar tus conocimientos con claridad y seguridad.',
  cta: 'Quiero prepararme para oportunidades internacionales',
};

export const features = [
  { icon: 'monitor', title: 'Entrevistas técnicas y conductuales con IA' },
  { icon: 'roleplay', title: 'Simulaciones y roleplays de trabajo' },
  { icon: 'chart', title: 'Enfoque exclusivo para Developers' },
] as const;

export const marquee = [
  'Technical interviews',
  'System design',
  'Behavioral questions',
  'Daily stand-ups',
  'Code reviews',
  'Architecture decisions',
  'Stakeholder meetings',
  'STAR method',
  'Trade-offs',
  'Live coding',
];

export const pain = {
  titleLead: 'Tenés mucha experiencia y aún así no lográs',
  titleHighlight: 'demostrarlo en inglés',
  intro:
    'Muchos Developers con experiencia entienden el inglés, pero tienen dificultades para expresarse con claridad cuando necesitan explicar sus proyectos, justificar decisiones o responder preguntas inesperadas en entrevistas y meetings.',
  cards: [
    {
      icon: 'message',
      text: 'Te preguntan por tu proyecto y terminás enumerando tecnologías sin mostrar tu verdadero aporte.',
    },
    {
      icon: 'code',
      text: 'Sabés por qué elegiste una arquitectura, pero te cuesta justificar esa decisión en inglés.',
    },
    {
      icon: 'users',
      text: 'Durante una meeting entendés la conversación, pero te cuesta intervenir de forma natural.',
    },
  ],
} as const;

export const testimonials = {
  eyebrow: 'Casos de éxito',
  title: 'De tener experiencia a comunicarla con más claridad en inglés',
  subtitle:
    'Experiencias reales de Developers que entrenaron su comunicación profesional con Enjoyourlife.English',
  cta: 'Quiero aplicar al programa 1:1',
  items: [
    {
      quote: 'Pude expresarme mucho mejor en mis entrevistas y demostrar realmente mi experiencia.',
      body: 'Antes me costaba explicar el contexto de mis proyectos y justificar decisiones técnicas. Con el entrenamiento pude estructurar mejor mis respuestas y ganar confianza en las entrevistas.',
      author: 'Developer, Argentina',
      // Testimonial video: YouTube/Vimeo link or a file in /public (e.g. '/videos/caso-1.mp4')
      video: '',
      from: 'De sentirme inseguro',
      to: 'a comunicar mi experiencia con claridad.',
    },
    {
      quote: 'Las simulaciones me ayudaron a ganar confianza y responder con más claridad en situaciones reales.',
      body: 'Las clases son muy prácticas y enfocadas en entrevistas y trabajo real. Pude practicar preguntas técnicas y también cómo hablar sobre mi experiencia de una forma más natural.',
      author: 'Software Engineer, LATAM',
      video: '',
      from: 'De respuestas cortas',
      to: 'a conversaciones más completas y naturales.',
    },
    {
      quote: 'El enfoque en entrevistas técnicas marcó la diferencia. Sentí que había practicado situaciones muy similares.',
      body: 'Trabajamos preguntas técnicas, casos reales y también cómo comunicar mis decisiones. Esto me ayudó a sentirme mucho más preparado.',
      author: 'Developer, Argentina',
      video: '',
      from: 'De pensar en español',
      to: 'a responder con fluidez y seguridad en inglés.',
    },
  ],
};

export const faq = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Preguntas antes de aplicar',
  items: [
    {
      q: '¿Necesito tener un nivel avanzado de inglés?',
      a: [
        'No necesariamente. Lo importante es que tengas una base de inglés que te permita comprender y comunicar ideas y experiencia profesional como Developer.',
        'El programa está pensado para Developers que ya estudiaron inglés, pero necesitan mejorar su speaking para explicar proyectos, defender decisiones técnicas y desenvolverse con mayor seguridad en entrevistas y situaciones profesionales.',
        'Durante el diagnóstico evaluaremos si tu nivel actual es adecuado para el programa.',
      ],
    },
    {
      q: '¿El programa es exclusivamente para Developers?',
      a: [
        'Sí, el enfoque está diseñado específicamente para profesionales del desarrollo de software. Trabajamos con situaciones reales de su entorno: entrevistas técnicas, explicación de proyectos, decisiones de arquitectura, resolución de problemas y comunicación con equipos internacionales.',
        'No es un curso de inglés general: el entrenamiento se adapta a los desafíos profesionales de un Developer.',
      ],
    },
    {
      q: '¿Qué voy a trabajar durante los 90 días?',
      a: [
        'Vas a entrenar tu comunicación oral en inglés a través de un programa estructurado y personalizado. Trabajaremos respuestas para entrevistas, cómo explicar tu experiencia y tus proyectos, vocabulario profesional, argumentación técnica y situaciones de comunicación laboral.',
        'El objetivo es que puedas comunicar tus conocimientos con claridad y seguridad en cualquier contexto profesional.',
      ],
    },
    {
      q: '¿Cómo funciona la práctica con inteligencia artificial?',
      a: [
        'Además de las sesiones 1:1, vas a practicar con simulaciones de entrevistas técnicas y conductuales asistidas por IA. Podés entrenar tus respuestas cuando quieras y recibir feedback inmediato sobre claridad, estructura y vocabulario.',
        'Así llegás a cada sesión con más práctica acumulada y aprovechamos el tiempo 1:1 para lo que más impacto tiene.',
      ],
    },
    {
      q: '¿Trabajamos preguntas de entrevistas técnicas?',
      a: [
        'Sí. Practicamos preguntas técnicas y conductuales reales: cómo presentar tu stack, contar un proyecto mostrando tu impacto, justificar decisiones de arquitectura, explicar trade-offs y responder preguntas inesperadas sin perder claridad.',
      ],
    },
    {
      q: '¿Puedo practicar situaciones de trabajo además de entrevistas?',
      a: [
        'Sí. Hacemos roleplays de situaciones laborales reales: daily stand-ups, code reviews, demos, reuniones con clientes o stakeholders y conversaciones con equipos internacionales, para que puedas intervenir de forma natural.',
      ],
    },
    {
      q: '¿Cómo sé si este programa es para mí?',
      a: [
        'Si sos Developer con experiencia, entendés inglés pero te cuesta expresarte con la misma seguridad que en español, el programa está pensado para vos.',
        'En la llamada de consultoría evaluamos tu nivel y tus objetivos, y te decimos con honestidad si el programa se ajusta a tu perfil.',
      ],
    },
    {
      q: '¿Cuál es la inversión?',
      a: [
        'La inversión depende del plan y del nivel de acompañamiento que necesites. Te la compartimos en la llamada de consultoría, una vez que entendamos tu situación y confirmemos que el programa es adecuado para vos.',
      ],
    },
  ],
};

export const booking = {
  eyebrow: 'Agendá tu llamada',
  title: 'Reservá tu llamada de consultoría',
  text: 'Reservá una llamada para conversar sobre tu experiencia, tus objetivos profesionales y las situaciones en inglés que necesitás mejorar. Vamos a evaluar si el programa se ajusta a tu perfil y a tus objetivos.',
  note: [
    'Vamos a realizar una evaluación 1:1 + feedback personalizado.',
    'Agendá un horario en el que realmente puedas participar.',
  ],
};

export const finalCta = {
  title: 'Es momento de escalar tu carrera profesional hablando inglés fluido con Enjoyourlife.English',
  cta: 'Agendá tu llamada',
};

export const stickyCta = {
  textMobile: 'Tu experiencia, también en inglés',
  textLead: 'Tu experiencia como Developer merece',
  textHighlight: 'demostrarse también en inglés',
  cta: 'Agendá tu llamada',
};
