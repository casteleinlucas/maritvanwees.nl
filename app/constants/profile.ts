// the details on the page (source: marit's own texts, 2026-10-31; e-mail and linkedin from the
// first version of this page, 2026-09-28)
export const PROFILE = {
  name: 'Marit van Wees',
  tagline: 'Business-minded. Equestrian-driven.',
  disciplines: ['Equestrian Industry', 'Marketing', 'Sales', 'Business Development'],
  // the title in search results says what she does; shared links carry the tagline instead
  searchTitle: 'Marit van Wees · Marketing & sales in de paardenbranche',
  // the meta description and the text under a shared link: under 155 characters, so search
  // results show it whole
  description:
    'Marketing- en salesprofessional in de internationale paardenbranche. Projectmanager bij Equimarketing, student aan Avans en zelf actief paardensporter.',
  // for the structured data (json-ld) that ties the site to her name in search
  jobTitle: 'Project Manager',
  employer: 'Equimarketing',
  school: 'Avans Hogeschool',
  email: 'maritvanwees@gmail.com',
  // the subject a mail from the page starts with
  emailSubject: 'Kennismaking',
  linkedin: 'https://www.linkedin.com/in/marit-van-wees-b62150317/',
  // the forest shoot is by ByMarita; who took the arena photos is not known yet
  photoCredit: 'ByMarita Fotografie & Media en [fotograaf sportfoto’s]',
} as const

// the register in chapter III: where she works and studies, in her own words
export const EXPERIENCE = [
  {
    numeral: 'I',
    name: 'Equimarketing',
    role: 'Project Manager',
    text: 'Binnen Equimarketing ben ik werkzaam als projectmanager in een professionele omgeving waar marketing, strategie en de hippische sector samenkomen. In deze rol ontwikkel ik mijn organisatorische, commerciële en strategische vaardigheden binnen een branche waar mijn passie ligt.',
  },
  {
    numeral: 'II',
    name: 'Epplejeck',
    role: 'Equestrian Retail',
    text: 'Bij Epplejeck combineer ik mijn passie voor paarden met mijn interesse in retail en commercie. Hier doe ik praktijkervaring op in klantgericht werken, verkoop en de dynamiek van een toonaangevende hippische retailer.',
  },
  {
    numeral: 'III',
    name: 'Avans University of Applied Sciences',
    role: 'Entrepreneurship & Retail Management',
    text: 'Naast mijn werk volg ik de hbo-opleiding Ondernemerschap & Retail Management aan Avans Hogeschool. Hier verdiep ik me in ondernemerschap, bedrijfsstrategie, marketing en commerciële ontwikkeling, waarbij ik theoretische inzichten verbind aan de praktijk.',
  },
] as const
