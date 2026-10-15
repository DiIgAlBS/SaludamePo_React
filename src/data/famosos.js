const famosos = [
  {
    id: 1,
    nombre: "Barney",
    categoria: "Personajes Animados",
    descripcion: "Canciones y saludos llenos de amor y cariño para los más pequeños.",
    precio: 15000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    nombre: "Bob Esponja",
    categoria: "Personajes Animados",
    descripcion: "¡Un saludo alegre y lleno de energía directo desde Fondo de Bikini!",
    precio: 20000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    nombre: "Burbuja",
    categoria: "Personajes Animados",
    descripcion: "Tierno saludo con la voz oficial de Las Chicas Superpoderosas.",
    precio: 18000,
    popular: true,
    imagen: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    nombre: "Eric Cartman",
    categoria: "Caricaturas",
    descripcion: "Saludo humorístico e irreverente al estilo de South Park.",
    precio: 20000,
    popular: true,
    imagen: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    nombre: "Dora la Exploradora",
    categoria: "Personajes Animados",
    descripcion: "¡Una gran aventura interactiva para felicitar en su día!",
    precio: 15000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    nombre: "Elmo",
    categoria: "Personajes Animados",
    descripcion: "¡Un saludo muy feliz y divertido directo desde Plaza Sésamo!",
    precio: 15000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    nombre: "Naruto Uzumaki",
    categoria: "Anime / Doblaje",
    descripcion: "¡Un saludo ninja lleno de energía y determinación, de veras!",
    precio: 22000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    nombre: "Pablo",
    categoria: "Personajes Animados",
    descripcion: "Saludos musicales para vivir aventuras imaginarias e inolvidables.",
    precio: 16000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    nombre: "Peppa Pig",
    categoria: "Personajes Animados",
    descripcion: "Un dulce saludo lleno de risas para celebrar a los más pequeños.",
    precio: 15000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    nombre: "Shrek",
    categoria: "Personajes Animados",
    descripcion: "Un saludo directo desde el pantano con mucho humor y carisma.",
    precio: 20000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 11,
    nombre: "Botota Fox",
    categoria: "Famosos Nacionales",
    descripcion: "Saludos desinhibidos, llenos de chispa y buen humor.",
    precio: 25000,
    popular: true,
    imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 12,
    nombre: "Che Copete",
    categoria: "Humor Nacional",
    descripcion: "¡El rey de la noche! Saludos pícaros e inolvidables.",
    precio: 25000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 13,
    nombre: "La Chilindrina",
    categoria: "Personajes Icónicos",
    descripcion: "Un saludo nostálgico e ingenioso directo de la vecindad.",
    precio: 20000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 14,
    nombre: "El Chino (Atletas de la Risa)",
    categoria: "Humor Nacional",
    descripcion: "Risas garantizadas y chistes rápidos con la chispa del Chino.",
    precio: 25000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 15,
    nombre: "Huaso Filomeno",
    categoria: "Humor Nacional",
    descripcion: "Típico humor sureño, dichos campesinos y buenas historias.",
    precio: 22000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 16,
    nombre: "Kena Larraín",
    categoria: "Personajes TV",
    descripcion: "¡Un saludo icónico e histriónico al más puro estilo Casado con Hijos!",
    precio: 25000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 17,
    nombre: "Stefan Kramer",
    categoria: "Famosos Nacionales",
    descripcion: "Imitaciones personalizadas para sorprender en cualquier ocasión.",
    precio: 30000,
    popular: true,
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 18,
    nombre: "Miguelito",
    categoria: "Humor Nacional",
    descripcion: "Toda la picardía y travesuras del personaje estelar de la TV.",
    precio: 22000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 19,
    nombre: "Naya Fácil",
    categoria: "Famosos / Influencers",
    descripcion: "¡Un saludo facilin lleno de energía, frases típicas y buena onda!",
    precio: 25000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 20,
    nombre: "El Pato (Atletas de la Risa)",
    categoria: "Humor Nacional",
    descripcion: "Toda la buena onda del Pato con el sello único de Los Atletas de la Risa.",
    precio: 25000,
    popular: false,
    imagen: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80"
  }
];
export default famosos;