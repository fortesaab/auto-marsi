import type { en } from './en'

export const sq: typeof en = {
  common: {
    brand: 'AutoMarsi',
    browse: 'Shfleto',
    language: 'Gjuha',
    tryAgain: 'Provo perseri',
    loading: 'Duke u ngarkuar',
    locationUnavailable: 'Lokacioni nuk eshte i disponueshem',
    mileageUnavailable: 'Kilometrazhi nuk eshte i disponueshem',
    photosComingSoon: 'Fotot do te shtohen se shpejti',
    noImage: 'Pa foto',
    sending: 'Duke derguar...',
    name: 'Emri',
    phone: 'Telefoni',
    email: 'Email',
    message: 'Mesazhi',
  },
  nav: {
    home: 'Ballina',
    inventory: 'Vetura',
    about: 'Rreth nesh',
    services: 'Sherbimet',
    financing: 'Financimi',
    contact: 'Kontakti',
  },
  footer: {
    inventory: 'Vetura',
    company: 'Kompania',
    contact: 'Kontakti',
    allVehicles: 'Te gjitha veturat',
    financingGuidance: 'Keshillim per financim',
    contactTeam: 'Kontakto ekipin',
    description:
      'Vetura te perzgjedhura, komunikim i qarte dhe percjellje nga salloni per shoferet ne Kosove.',
    copyright: '(c) 2026 AutoMarsi. Te gjitha te drejtat e rezervuara.',
  },
  appointment: {
    scheduledTitle: 'Termini juaj eshte caktuar',
    updatedTitle: 'Termini juaj eshte perditesuar',
    scheduledSubject: 'Termini juaj ne AutoMarsi eshte caktuar',
    updatedSubject: 'Termini juaj ne AutoMarsi eshte perditesuar',
  },
  contact: {
    phone: '+383 44 123 456',
    email: 'info@automarsi.com',
    location: 'Prishtine, Kosove',
    locationLabel: 'Lokacioni',
    response: 'Pergjigja',
    responseValue: 'Zakonisht brenda orarit te punes',
    eyebrow: 'Kontakti',
    title: 'Pyet para se te vizitosh.',
    description:
      'Dergo pyetje per disponueshmeri, financim, nderrim veture ose vizite ne sallon. Ekipi i AutoMarsi do te te kontaktoje qarte.',
    nextEyebrow: 'Cfare ndodh me pas',
    nextDescription:
      'Mesazhi yt kthehet ne kerkese ne panelin admin. Ekipi e shqyrton, pergjigjet dhe cakton vizite ne sallon nese nevojitet.',
    formTitle: 'Na dergo mesazh',
    formDescription: 'Ndaji te dhenat dhe trego per cfare ke nevoje.',
    successToast: 'Mesazhi u dergua me sukses.',
    successMessage:
      'Kerkesa u dergua me sukses. Ekipi i AutoMarsi do te te kontaktoje se shpejti.',
    intentLabel: 'Per cfare mund te ndihmojme?',
    messagePlaceholder: 'Na trego cfare po kerkon...',
    sendMessage: 'Dergo mesazh',
    inquirySent: 'Kerkesa u dergua',
    intents: {
      general: 'Pyetje e pergjithshme',
      availability: 'Disponueshmeria e vetures',
      visit: 'Rezervo vizite ne sallon',
      financing: 'Pyetje per financim',
    },
  },
  home: {
    heroTitle: 'Vetura cilesore. Hapa te qarte.',
    heroDescription:
      'Shfleto vetura te perzgjedhura, pyet per disponueshmeri dhe vazhdo me percjellje reale nga ekipi i AutoMarsi.',
    browseInventory: 'Shfleto veturat',
    contactTeam: 'Kontakto ekipin',
    selectedActiveVehicles: 'Vetura aktive te perzgjedhura',
    showroomFollowUp: 'Percjellje nga salloni',
    whyEyebrow: 'Pse AutoMarsi',
    whyTitle: 'Menyre praktike per te kaluar nga shfletimi te vizita.',
    whyDescription:
      'Faqja publike dhe paneli admin punojne bashke, qe klientet te shohin vetura aktive dhe ekipi te menaxhoje cdo kerkese qarte.',
    trustItems: [
      {
        title: 'Vetura te perzgjedhura',
        description: 'Listimet aktive menaxhohen nga paneli AutoMarsi.',
      },
      {
        title: 'Percjellje e qarte',
        description: 'Cdo kerkese arrin te ekipi per pergjigje te duhur.',
      },
      {
        title: 'Mbeshtejte nga salloni',
        description:
          'Klientet mund te pyesin, krahasojne dhe vizitojne me besim.',
      },
    ],
    stats: {
      vehicles: 'Vetura ne stok',
      years: 'Vite ne biznes',
      conversations: 'Biseda me kliente',
      flow: 'Proces i qarte percjelljeje',
    },
  },
  inventory: {
    eyebrow: 'Vetura',
    title: 'Gjej veturen e duhur.',
    description:
      'Perdor filtrat per te shfletuar veturat aktive te publikuara nga ekipi i AutoMarsi.',
    loadingVehicles: 'Duke ngarkuar veturat',
    loadingAvailable: 'Duke ngarkuar veturat e disponueshme...',
    vehicleFound: 'veture u gjet',
    vehiclesFound: 'vetura u gjeten',
    couldNotLoad: 'Inventari nuk mund te ngarkohej.',
    noVehicles: 'Nuk u gjet asnje veture.',
    noVehiclesDescription:
      'Provo te ndryshosh marken, modelin, cmimin ose fjalet kyce.',
    filters: {
      title: 'Filtrat',
      reset: 'Pastro',
      make: 'Marka',
      model: 'Modeli',
      keyword: 'Fjale kyce',
      year: 'Viti',
      minPrice: 'Cmimi min.',
      maxPrice: 'Cmimi max.',
      fuelType: 'Karburanti',
      transmission: 'Transmisioni',
      bodyType: 'Tipi i trupit',
      loadingMakes: 'Duke ngarkuar markat...',
      allMakes: 'Te gjitha markat',
      selectMakeFirst: 'Zgjidh marken fillimisht',
      loadingModels: 'Duke ngarkuar modelet...',
      allModels: 'Te gjitha modelet',
      searchPlaceholder: 'Titulli, pershkrimi, lokacioni',
      any: 'Cdo',
    },
    values: {
      diesel: 'Dizel',
      petrol: 'Benzine',
      hybrid: 'Hibrid',
      electric: 'Elektrike',
      automatic: 'Automatik',
      manual: 'Manual',
      sedan: 'Sedan',
      suv: 'SUV',
      hatchback: 'Hatchback',
      wagon: 'Karavan',
      coupe: 'Coupe',
    },
    card: {
      viewDetails: 'Shiko detajet',
      photosComingSoon: 'Fotot do te shtohen se shpejti',
    },
    featured: {
      eyebrow: 'Vetura',
      title: 'Vetura te shtuara se fundmi.',
      description:
        'Shfleto listime reale aktive te publikuara nga paneli admin i AutoMarsi.',
      viewAll: 'Shiko te gjitha veturat',
      loading: 'Duke ngarkuar veturat e perzgjedhura...',
      couldNotLoad: 'Veturat nuk mund te ngarkoheshin.',
      empty: 'Veturat e reja do te shfaqen ketu se shpejti.',
    },
    pagination: {
      page: 'Faqja',
      of: 'nga',
      previous: 'Prapa',
      next: 'Para',
    },
  },
  listingDetails: {
    loading: 'Duke ngarkuar detajet e vetures...',
    couldNotLoad: 'Kjo veture nuk mund te ngarkohej.',
    notFound: 'Vetura nuk u gjet.',
    backToInventory: 'Kthehu te veturat',
    activeListing: 'Listim aktiv',
    fallbackDescription:
      'Kontakto AutoMarsi per disponueshmeri, gjendje dhe percjellje ne sallon per kete veture.',
    features: 'Pajisjet',
    galleryFallbackTitle: 'Fotot do te shtohen se shpejti',
    galleryFallbackDescription:
      'Kjo veture eshte e disponueshme, por fotot ende nuk jane ngarkuar.',
    imageSingular: 'foto',
    imagePlural: 'foto',
    viewImage: 'Shiko foton',
    specs: {
      price: 'Cmimi i vetures',
      year: 'Viti',
      fuel: 'Karburanti',
      transmission: 'Transmisioni',
      body: 'Trupi',
      color: 'Ngjyra',
      condition: 'Gjendja',
      engine: 'Motori',
      power: 'Fuqia',
      note:
        'Disponueshmeria dhe detajet finale konfirmohen nga AutoMarsi.',
    },
    inquiry: {
      title: 'Pyet per kete veture',
      description: 'Leri te dhenat dhe ekipi do te te kontaktoje.',
      responseTime: 'Zakonisht brenda orarit te punes.',
      intentLabel: 'Une dua te',
      askQuestion: 'Bej nje pyetje',
      bookViewing: 'Rezervoj shikim',
      discussFinancing: 'Diskutoj financimin',
      messagePlaceholder: 'Jam i interesuar per kete veture...',
      successToast: 'Kerkesa u dergua me sukses.',
      send: 'Dergo kerkesen',
    },
    reassurance: {
      title: 'Cfare ndodh me pas?',
      description: 'Percjellje e shkurter dhe transparente nga AutoMarsi.',
      items: [
        {
          title: 'Disponueshmeria konfirmohet',
          description: 'Ne konfirmojme disponueshmerine para vizites tende.',
        },
        {
          title: 'Percjellje e qarte',
          description: 'Ekipi te kontakton me hapat praktik te radhes.',
        },
        {
          title: 'Pergjigje gjate orarit',
          description:
            'Shumica e kerkesave trajtohen gjate orarit te sallonit.',
        },
      ],
    },
  },
  about: {
    eyebrow: 'Rreth AutoMarsi',
    title: 'Autosallon praktik me proces te qarte per klientin.',
    description:
      'AutoMarsi lidh veturat reale aktive me klientet qe duan informacion te qarte para vizites ne sallon.',
    body:
      'Faqja publike eshte e lidhur me procesin admin, qe listimet, kerkesat dhe percjellja nga salloni te mbeten te organizuara qe nga mesazhi i pare.',
    browseVehicles: 'Shfleto veturat',
    contactTeam: 'Kontakto ekipin',
    mattersEyebrow: 'Cfare ka rendesi',
    processEyebrow: 'Procesi yne',
    processTitle: 'Nga interesi online te vizita ne sallon.',
    processDescription: 'Proces i thjeshte qe mban klientin dhe ekipin te qarte.',
    ctaEyebrow: 'Vizito AutoMarsi',
    ctaTitle: 'Fillo me nje veture qe te pelqen.',
    ctaDescription:
      'Shfleto inventarin aktiv dhe dergo kerkese kur do me shume detaje, disponueshmeri ose udhezim nga salloni.',
    viewInventory: 'Shiko inventarin',
    principles: [
      {
        title: 'Inventar i perzgjedhur',
        description:
          'Klientet shohin vetura aktive te pergatitura per interes real.',
      },
      {
        title: 'Komunikim i qarte',
        description:
          'Pyetjet dhe kerkesat per vizite hyjne ne procesin admin.',
      },
      {
        title: 'Percjellje njerezore',
        description: 'Ekipi shqyrton cdo kerkese para hapit te radhes.',
      },
    ],
    processSteps: [
      {
        title: 'Vetura publikohet',
        description: 'Ekipi i AutoMarsi krijon dhe aktivizon listimin.',
      },
      {
        title: 'Klienti pyet',
        description:
          'Klienti dergon pyetje, kerkese per shikim ose interes per financim.',
      },
      {
        title: 'Ekipi vazhdon',
        description:
          'Ekipi konfirmon disponueshmerine dhe cakton hapin e radhes.',
      },
    ],
  },
  services: {
    eyebrow: 'Sherbimet',
    title: 'Mbeshtejte praktike para dhe pas zgjedhjes se vetures.',
    description:
      'AutoMarsi e mban procesin te thjeshte: shfleto, pyet, vizito dhe vendos me informacion te qarte nga ekipi.',
    browseCars: 'Shfleto veturat',
    contactUs: 'Na kontakto',
    needHelp: 'Ke nevoje per ndihme?',
    askBeforeVisit: 'Pyet para se te vizitosh.',
    helpDescription:
      'Dergo pyetje per disponueshmeri, financim, nderrim veture ose percjellje nga salloni.',
    sendInquiry: 'Dergo kerkese',
    items: [
      {
        title: 'Udhezim per vetura',
        description:
          'I ndihmojme klientet te krahasojne veturat sipas buxhetit, perdorimit dhe nevojave praktike.',
      },
      {
        title: 'Informacion i qarte ne listim',
        description:
          'Veturat e publikuara perfshijne detajet kryesore qe klientet duan para pyetjeve shtese.',
      },
      {
        title: 'Diskutim per nderrim veture',
        description:
          'Klientet mund te pyesin ekipin per hapat e mundshem te trade-in para vizites.',
      },
      {
        title: 'Udhezim per financim',
        description:
          'I ndihmojme klientet te pergatisin pyetjet e duhura para shqyrtimit te kushteve reale.',
      },
      {
        title: 'Mbeshtejte per blerje',
        description:
          'Ekipi ndihmon me hapat praktik te blerjes, dokumentet dhe udhezimin per regjistrim.',
      },
      {
        title: 'Percjellje pas shitjes',
        description:
          'Klientet mund te mbeten ne kontakt per pyetje dhe udhezim per servis pas blerjes.',
      },
    ],
  },
  financing: {
    eyebrow: 'Financimi',
    title: 'Planifiko hapin e radhes para vizites.',
    description:
      'Perdor kete faqe si udhezim para bisedes me AutoMarsi. Vleresimi te ndihmon te pergatisesh pyetje me te mira, jo aprovim te garantuar.',
    body:
      'Financimi varet nga kushtet reale, te dhenat e klientit, cmimi i vetures dhe oferta finale qe shqyrtohet nga klienti. Asgje ne kete faqe nuk ruhet ose dergohet ne banke.',
    browseVehicles: 'Shfleto veturat',
    askAboutFinancing: 'Pyet per financim',
    calculator: {
      title: 'Planifikues buxheti',
      description: 'Vlereso pagesen mujore te perafert.',
      estimatedMonthly: 'Pagesa mujore e perafert',
      financedAmount: 'Shuma e financuar',
      vehiclePrice: 'Cmimi i vetures',
      downPayment: 'Parapagimi',
      term: 'Afati',
      rate: 'Norma %',
      months: 'muaj',
      note:
        'Vetem vleresim. Kushtet finale, normat, aprovimi dhe pagesat mujore shqyrtohen veqmas.',
      askAboutEstimate: 'Pyet per vleresimin',
    },
    steps: {
      eyebrow: 'Si funksionon',
      title: 'Biseda e thjeshte, jo premtim.',
      items: [
        {
          title: 'Zgjidh veturen',
          description: 'Fillo nga inventari aktiv.',
        },
        {
          title: 'Pyet qarte',
          description: 'Dergo pyetjet permes kontaktit.',
        },
        {
          title: 'Shqyrto kushtet',
          description: 'Krahaso kushtet reale para vendimit.',
        },
      ],
    },
    cta: {
      eyebrow: 'Pyetje per financim',
      title: 'Fillo me veturen qe te pelqen.',
      description:
        'Shfleto inventarin aktiv ose kontakto ekipin e AutoMarsi per disponueshmeri, percjellje nga salloni dhe udhezim per financim.',
      viewInventory: 'Shiko inventarin',
      contactTeam: 'Kontakto ekipin',
    },
  },
}
