export const restaurantInfo = {
  name: "Julio's Asadero",
  slogan: "El auténtico sabor al carbón",
  logo: "/logo-julios.png", // Tu archivo guardado en la carpeta public/
  whatsapp: "+527551316825", // Número para WhatsApp (código de país + 10 dígitos)
  phone: "+527551316825", // Número para llamada directa
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    googleMapsReview: "https://maps.app.goo.gl/ja3xcymkJpJoKpp27" // Aquí pondrás el link real del negocio en Maps
  },
  promoBanner: {
    tag: "Especial de la semana",
    title: "¡Jueves de Pozole!",
    subtitle: "Verde, Blanco o Rojo • Pollo, Puerco o Mixto. ¡Incluye botana!",
    categoryTarget: "Jueves de Pozole"
  },
  initialReviews: [
    {
      id: 1,
      author: "Carlos M.",
      rating: 5,
      date: "Hace 2 días",
      comment: "La parrillada mediana rinde muchísimo y el pollo piña-habanero está brutal."
    },
    {
      id: 2,
      author: "Fernanda R.",
      rating: 5,
      date: "Hace 1 semana",
      comment: "Súper rápido pedir desde el menú digital, llegó todo calientito y con todas sus salsas."
    }
  ]
};

export const menuData = [
  // PARRILLADAS
  {
    id: 1,
    category: "Parrilladas",
    name: "Parrillada Chica (2 Personas)",
    badge: "Popular",
    price: 320,
    description: "Incluye: sirloin, chorizo, costilla de res, chorizo y/o chistorra.",
    includes: "Guacamole, frijoles, ensalada, arroz, espagueti, cebolla asada, chiles toreados, tortillas y salsa.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80", // Puedes cambiar por "/foto-mesa.jpg"
    optionsTitle: "Preferencia de embutido",
    options: ["Con Chorizo y Chistorra", "Solo Chorizo", "Solo Chistorra"]
  },
  {
    id: 2,
    category: "Parrilladas",
    name: "Parrillada Mediana (4 Personas)",
    badge: "Familiar",
    price: 580,
    description: "Incluye: sirloin, chorizo, costilla de res, chuleta de puerco, salchichón, chistorra y refresco de 1.5 litros.",
    includes: "Guacamole, frijoles, ensalada, arroz, espagueti, cebolla asada, chiles toreados, tortillas y salsa.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" // Puedes cambiar por "/foto-chorizo.jpg"
  },
  {
    id: 3,
    category: "Parrilladas",
    name: "Parrillada Grande (6 Personas)",
    badge: "La más completa",
    price: 820,
    description: "Incluye: sirloin, chorizo, costilla de res, chuleta, salchichón, chistorra, pollo y refresco de 1.5 litros.",
    includes: "Guacamole, frijoles, ensalada, arroz, espagueti, cebolla asada, chiles toreados, tortillas y salsa.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80"
  },

  // POLLO AL CARBÓN
  {
    id: 4,
    category: "Pollo al Carbón",
    name: "Paquete 1 Pollo Completo",
    badge: "Paquete Estrella",
    price: 295,
    description: "Pollo entero asado al carbón preparado con tu sabor favorito.",
    includes: "Ensalada, arroz, espagueti, 10 tortillas, refresco 2 litros, salsa, cebolla y chile asado.",
    image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Elige tu sabor favorito",
    options: [
      "Natural", "BBQ", "Habanero", "Pastor", "Chipotle", "Piña",
      "Adobado", "Tamarindo", "Piña - Habanero", "Flaming Hot", "Búfalo Hot"
    ]
  },
  {
    id: 5,
    category: "Pollo al Carbón",
    name: "Paquete 1/2 Pollo",
    price: 185,
    description: "Medio pollo al carbón bañado o marinado en tu salsa favorita.",
    includes: "Ensalada, arroz, 5 tortillas, refresco 1.5 litros y salsa.",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Elige tu sabor favorito",
    options: [
      "Natural", "BBQ", "Habanero", "Pastor", "Chipotle", "Piña",
      "Adobado", "Tamarindo", "Piña - Habanero", "Flaming Hot", "Búfalo Hot"
    ]
  },
  {
    id: 6,
    category: "Pollo al Carbón",
    name: "1/4 Promo Pollo",
    badge: "Individual",
    price: 110,
    description: "Cuarto de pollo al carbón ideal para comer rico y rápido.",
    includes: "Ensalada, arroz, tortillas, refresco chico y salsa.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Elige tu sabor favorito",
    options: ["Natural", "BBQ", "Habanero", "Pastor", "Chipotle", "Adobado", "Búfalo Hot"]
  },
  {
    id: 7,
    category: "Pollo al Carbón",
    name: "Pollo Sencillo (Sin refresco)",
    price: 230,
    description: "Disponible en 1 Pollo, 1/2 (Medio) o 1/4 (Cuarto).",
    includes: "Ensalada, arroz y salsa.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Selecciona tamaño",
    options: ["1 Pollo Sencillo", "1/2 Pollo Sencillo", "1/4 Pollo Sencillo"]
  },

  // CARNE ASADA
  {
    id: 8,
    category: "Carne Asada",
    name: "Carne Asada por Kilo / Medio Kilo",
    badge: "Para compartir",
    price: 420,
    description: "Elige tu corte favorito recién salido del asador. Se vende por 1 Kilo o 1/2 Kilo.",
    includes: "Guacamole, frijoles, ensalada, arroz, espagueti, salsa, cebolla asada, chiles toreados y tortillas.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Elige corte y porción",
    options: [
      "1 KG - Arrachera", "1/2 KG - Arrachera",
      "1 KG - Sirloin", "1/2 KG - Sirloin",
      "1 KG - Costilla de Res", "1/2 KG - Costilla de Res",
      "1 KG - Chuleta de Puerco", "1 KG - Chorizo"
    ]
  },
  {
    id: 9,
    category: "Carne Asada",
    name: "Carne Asada Individual",
    price: 155,
    description: "Platillo individual servido en 1 orden o 1/2 orden con guarniciones.",
    includes: "Guarniciones de la casa, tortillas y salsa.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Elige tu carne",
    options: [
      "Arrachera", "Sirloin", "Chorizo", "Costilla de Res",
      "Costilla de Puerco", "Chuleta de Puerco", "Chistorra", "Chinchulín (Frita)"
    ]
  },

  // TACOS Y QUESADILLAS
  {
    id: 10,
    category: "Tacos y Quesadillas",
    name: "Tacos al Carbón",
    price: 28,
    description: "Tacos bien servidos con carne recién asada al carbón.",
    includes: "Cebolla, cilantro, limones y salsas.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Elige de qué los quieres",
    options: [
      "Arrachera", "Chinchulines", "Costilla de Res",
      "Chuleta de Puerco", "Sirloin", "Chorizo", "Mixto", "Chistorra"
    ]
  },
  {
    id: 11,
    category: "Tacos y Quesadillas",
    name: "Quesadillas al Asador",
    price: 45,
    description: "Con abundante queso fundido y tu ingrediente favorito.",
    includes: "Guarnición de salsas de la casa.",
    image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Elige tu ingrediente",
    options: ["Arrachera", "Tripa", "Sirloin", "Costilla de Res", "Chorizo", "Mixta", "Chuleta", "Solo Queso"]
  },

  // CARNITAS Y GORDITAS
  {
    id: 12,
    category: "Carnitas y Gorditas",
    name: "Carnitas de Puerco (Tacos o por Kilo)",
    price: 260,
    description: "Tradicionales carnitas suaves y jugosas. Pregunta por existencia de Manitas.",
    includes: "Tortillas, salsa, verdura y limones.",
    image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Presentación y tipo",
    options: ["1 KG Surtido", "1 KG Maciza", "1/2 KG Surtido", "1/4 KG Surtido", "Orden de Tacos (Maciza/Buche/Surtido)"]
  },
  {
    id: 13,
    category: "Carnitas y Gorditas",
    name: "Gorditas Rellenas",
    price: 32,
    description: "Gorditas recién hechas rellenas de guisos tradicionales.",
    includes: "Salsa roja o verde y verdura.",
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Elige el relleno",
    options: ["Carnitas", "Chicharrón", "Requesón"]
  },

  // JUEVES DE POZOLE
  {
    id: 14,
    category: "Jueves de Pozole",
    name: "Pozole Tradicional (Un solo tamaño)",
    badge: "Solo Jueves",
    price: 125,
    description: "Elige tu favorito: Verde, Blanco o Rojo. Con carne de Pollo, Puerco o Mixto.",
    includes: "¡Incluye botana completa! Lechuga, rábanos, cebolla, orégano, tostadas y limones.",
    image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Personaliza tu Pozole",
    options: [
      "Rojo - Puerco", "Rojo - Pollo", "Rojo - Mixto",
      "Verde - Pollo", "Verde - Puerco", "Blanco - Puerco", "Blanco - Mixto"
    ]
  },
  {
    id: 15,
    category: "Jueves de Pozole",
    name: "Patitas en Vinagre / Tostadas de Pollo",
    price: 65,
    description: "El complemento perfecto para tu jueves pozolero.",
    includes: "Crema, queso, salsa y verdura al gusto.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Elige tu antojo",
    options: ["Patitas en Vinagre (1 Orden)", "Tostadas de Pollo (3 Piezas)"]
  },

  // EXTRAS Y POSTRES
  {
    id: 16,
    category: "Extras y Postres",
    name: "Guarniciones Extra",
    price: 45,
    description: "Complementa tu parrillada o pollo con porciones adicionales.",
    includes: "Porción lista para compartir.",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Selecciona tu extra",
    options: [
      "Guacamole", "Frijoles Charros", "Cebolla y Chile Asado",
      "Espagueti", "Arroz", "Ensalada de Col", "Gorditas de Harina"
    ]
  },
  {
    id: 17,
    category: "Extras y Postres",
    name: "Postres de la Casa",
    badge: "Dulce final",
    price: 50,
    description: "Cierra tu comida con nuestros postres caseros.",
    includes: "Porción individual.",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
    optionsTitle: "Elige tu postre",
    options: ["Flan Napolitano", "Plátano Asado"]
  }
];