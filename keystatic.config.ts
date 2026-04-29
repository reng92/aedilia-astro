import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  // In locale per dev, Cloud per produzione
  storage: process.env.KEYSTATIC_STORAGE_KIND === 'cloud'
    ? {
        kind: 'cloud',
        // Cambia con il tuo team/progetto da keystatic.cloud
        project: process.env.KEYSTATIC_CLOUD_PROJECT as `${string}/${string}`,
      }
    : { kind: 'local' },

  ui: {
    brand: {
      name: 'Aedilia CMS',
    },
  },

  collections: {
    portfolio: collection({
      label: 'Portfolio Lavori',
      slugField: 'title',
      path: 'src/content/portfolio/*',
      format: { data: 'json' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Titolo lavoro',
            description: 'Es: Pavimentazione stradale Caserta 2024',
          },
        }),
        category: fields.select({
          label: 'Categoria',
          options: [
            { label: 'Asfalto', value: 'asfalto' },
            { label: 'Segnaletica', value: 'segnaletica' },
            { label: 'Strade', value: 'strade' },
            { label: 'TLC', value: 'tlc' },
            { label: 'Acquedotto', value: 'acquedotto' },
            { label: 'Arredo urbano', value: 'arredo' },
          ],
          defaultValue: 'asfalto',
        }),
        location: fields.text({
          label: 'Luogo',
          description: 'Es: Caserta',
        }),
        image: fields.image({
          label: 'Foto',
          directory: 'public/images/portfolio',
          publicPath: '/images/portfolio/',
        }),
        description: fields.text({
          label: 'Descrizione (opzionale)',
          description: 'Appare al passaggio del mouse. Es: Pavimentazione stradale · Caserta',
        }),
      },
    }),
  },

  singletons: {
    sito: singleton({
      label: 'Impostazioni Sito',
      path: 'src/data/sito',
      format: { data: 'json' },
      schema: {
        ragioneSociale: fields.text({ label: 'Ragione sociale' }),
        nomeBreve: fields.text({ label: 'Nome breve (per display)' }),
        telefono: fields.text({
          label: 'Telefono visibile',
          description: 'Es: +39 327 029 4375',
        }),
        telefonoRaw: fields.text({
          label: 'Telefono per href',
          description: 'Es: +393270294375 (senza spazi)',
        }),
        whatsapp: fields.text({
          label: 'WhatsApp (solo cifre, senza +)',
          description: 'Es: 393270294375',
        }),
        email: fields.text({ label: 'Email' }),
        pec: fields.text({ label: 'PEC' }),
        indirizzo: fields.text({ label: 'Indirizzo' }),
        localita: fields.text({ label: 'Comune' }),
        provincia: fields.text({ label: 'Provincia (sigla)' }),
        cap: fields.text({ label: 'CAP' }),
        piva: fields.text({ label: 'P.IVA' }),
        rea: fields.text({ label: 'REA' }),
        capSociale: fields.text({ label: 'Capitale sociale' }),
        annoFondazione: fields.text({ label: 'Anno di fondazione' }),
        ga4: fields.text({
          label: 'Google Analytics 4 ID',
          description: 'Es: G-XXXXXXXXXX',
        }),
      },
    }),

    home: singleton({
      label: 'Home — Testi Hero',
      path: 'src/data/home',
      format: { data: 'json' },
      schema: {
        heroTag: fields.text({
          label: 'Sottotitolo hero',
          description: 'Es: Costruttori dal 1978 · Caserta · Napoli · Campania',
        }),
        heroLine1: fields.text({ label: 'Hero — riga 1', description: 'Es: Infrastrutture' }),
        heroLine2: fields.text({ label: 'Hero — riga 2 (in corsivo dorato)', description: 'Es: durano.' }),
        heroLine3: fields.text({ label: 'Hero — riga 3', description: 'Es: Campania' }),
        heroLine4: fields.text({ label: 'Hero — riga 4 (in corsivo dorato)', description: 'Es: avanza.' }),
        heroDescription: fields.text({
          label: 'Descrizione hero',
          multiline: true,
        }),
      },
    }),

    chiSiamo: singleton({
      label: 'Chi Siamo — Testi',
      path: 'src/data/chi-siamo',
      format: { data: 'json' },
      schema: {
        titolo: fields.text({ label: 'Titolo pagina' }),
        intro1: fields.text({ label: 'Paragrafo 1', multiline: true }),
        intro2: fields.text({ label: 'Paragrafo 2', multiline: true }),
        intro3: fields.text({ label: 'Paragrafo 3', multiline: true }),
        anni: fields.text({ label: 'Anni di attività', description: 'Es: 40+' }),
        cantieri: fields.text({ label: 'Cantieri completati', description: 'Es: 500+' }),
      },
    }),
  },
});
