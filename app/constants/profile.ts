// the details on the page (source: marit's own texts, 2026-10-31; linkedin from the first version
// of this page, 2026-09-28; e-mail corrected 2026-11-01)
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
  email: 'maritvanwees13@gmail.com',
  // the subject a mail from the page starts with
  emailSubject: 'Kennismaking',
  linkedin: 'https://www.linkedin.com/in/marit-van-wees-b62150317/',
  // the forest shoot is by ByMarita; who took the arena photos is not known yet, so the credit
  // names only the shoot
  photoCredit: 'Bosfoto’s door ByMarita Fotografie & Media',
} as const

// where she works and studies (chapter "experience"), from her own texts with the repeats taken out
export const EXPERIENCE = [
  {
    name: 'Equimarketing',
    role: 'Project Manager',
    url: 'https://equimarketing.nl/teammembers/marit/',
    text: 'Als projectmanager werk ik in een professionele omgeving waar marketing, strategie en de hippische sector samenkomen. Hier ontwikkel ik mijn organisatorische, commerciële en strategische vaardigheden, in de branche waar mijn hart ligt.',
  },
  {
    name: 'Epplejeck',
    role: 'Equestrian Retail',
    url: 'https://www.epplejeck.com',
    text: 'Bij deze toonaangevende hippische retailer doe ik praktijkervaring op in verkoop en klantgericht werken. Ik zie van dichtbij hoe een winkel in deze markt draait, van de vloer tot het assortiment.',
  },
  {
    name: 'Avans Hogeschool',
    role: 'Entrepreneurship & Retail Management',
    url: 'https://www.avans.nl',
    text: 'Naast mijn werk volg ik de hbo-opleiding Ondernemerschap & Retail Management. Ik verdiep me in ondernemerschap, bedrijfsstrategie, marketing en commerciële ontwikkeling, en wat ik leer pas ik direct toe in de praktijk.',
  },
] as const
