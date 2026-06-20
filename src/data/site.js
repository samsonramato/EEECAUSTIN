// Centralized site content (preserves original Amharic + English copy)

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/events', label: 'Events' },
  { to: '/donate', label: 'Donate' },
  { to: '/contact', label: 'Contact' },
]

export const contact = {
  address: '14400 Immanuel Rd, Pflugerville, TX, United States, Texas',
  email: 'eeecaustin@gmail.com',
  phones: ['+1 512 701-6531', '+1 512 293-9293'],
  facebook: 'https://www.facebook.com/profile.php?id=100066275576397',
  youtube: 'https://www.youtube.com/playlist?list=PL8KjhzsBXNmBLJYpihUjrzvkMvov_tvTT',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.847399765715!2d-97.62757402438095!3d30.412071174740625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cf8d0895835d%3A0x61455e3592e3b398!2sEthiopian%20Emmanuel%20Evangelical%20Church%20Austin!5e0!3m2!1sen!2sus!4v1742345376271!5m2!1sen!2sus',
}

// Weekly gatherings — TODO: confirm exact times with the church office before launch.
export const serviceTimes = [
  { icon: 'fa-church', day: 'Sunday', name: 'Worship Service', time: '10:00 AM – 12:30 PM', am: 'የእሁድ አምልኮ' },
  { icon: 'fa-hands-praying', day: 'Wednesday', name: 'Prayer & Worship', time: '6:30 PM – 7:30 PM', am: 'የጸሎትና የአምልኮ' },
  { icon: 'fa-book-bible', day: 'Friday', name: 'Bible Study', time: '7:00 PM – 9:00 PM', am: 'የመጽሐፍ ቅዱስ ጥናት' },
]

// Upcoming events — edit freely; past events can simply be removed.
export const events = [
  {
    title: 'Sunday Worship & Fellowship',
    am: 'የእሁድ አምልኮና ኅብረት',
    date: 'Every Sunday',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    desc: 'Gather with the family of God for worship, the Word, and fellowship over coffee afterward.',
    icon: 'fa-church',
    recurring: true,
  },
  {
    title: 'Midweek Prayer & Worship',
    am: 'የጸሎትና የአምልኮ ጊዜ',
    date: 'Every Wednesday',
    time: '6:30 PM',
    location: 'Main Sanctuary',
    desc: 'Gather midweek to seek God together in prayer, praise, and worship.',
    icon: 'fa-hands-praying',
    recurring: true,
  },
  {
    title: 'Bible Study',
    am: 'የመጽሐፍ ቅዱስ ጥናት',
    date: 'Every Friday',
    time: '7:00 PM',
    location: 'Fellowship Hall',
    desc: 'Go deeper into Scripture together with teaching, discussion, and prayer.',
    icon: 'fa-book-bible',
    recurring: true,
  },
]

// Ways to give — update the placeholders with the church's real giving details.
export const giving = {
  intro:
    'Your generosity helps us proclaim the Gospel, serve our community, and care for one another. Every gift, large or small, is a seed sown into the Kingdom of God.',
  verse: {
    text: 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.',
    ref: '2 Corinthians 9:7',
  },
  methods: [
    {
      icon: 'fa-mobile-screen-button',
      title: 'Give Online',
      desc: 'Send your tithes and offerings quickly and securely through Zelle using the church email.',
      detail: 'eeecaustin@gmail.com',
    },
    {
      icon: 'fa-hand-holding-dollar',
      title: 'In Person',
      desc: 'Place your gift in the offering during any of our weekly services. All are received with gratitude.',
      detail: 'During Sunday worship',
    },
    {
      icon: 'fa-envelope-open-text',
      title: 'By Mail',
      desc: 'Mail a check made out to Ethiopian Emmanuel Evangelical Church to our address.',
      detail: '14400 Immanuel Rd, Pflugerville, TX',
    },
  ],
}

// Statement of Faith (home) — Amharic + English
export const faithAmharic = `የኢትዮጵያውያን አማኑኤል ወንጌላውያን አማኞች ቤተክርስትያን ኦስተን ቴክሳስ የእግዚአብሔርን አምላክነት የጌታ ኢየሱስ ክርስቶስን አዳኝነትና የመንፈስ ቅዱስን ሥራ በኦስተን ቴክሳስና በተለያዪ ቦታዎች በማወጅ የእግዚአብሔር መንግሥትን እያሰፋፋች ያለች፣ ያለመኑትን እንዲያምኑ፣ ያመኑት ደግሞ በእግዚአብሔር ጸጋ እንዲያድጉና እንዲጸኑ በትጋት እይሰራች ያለች ቤተክርስቲያን ናት። ይህንን ሃላፊነት በትጋት እንድንወጣ ባለፉት ዓመታት የረዳንን እግዚአብሔርን እያመሰገንን ከፊታችን ላለው የሥራ ዘመን በበለጠ ትጋት የእግዚአብሔርን መንግሥት ለማስፋት እየሰራች ትገኛለች። ይህንን ከክርስቶስ የተቀበልነውን ሃላፊነት የምንተገብርበት ዋና መመሪያችን የሕያው እግዚአብሔር ቃል የሆነው መጽሐፍ ቅዱስ ነው። በበለጠ ለመረዳት የቤተክርስቲያኒቱን`

export const faithEnglish = `is actively advancing the Kingdom of God by proclaiming the divine nature of God, the salvific role of Jesus Christ, and the transformative work of the Holy Spirit, not only in Austin but also in various locations. Our earnest endeavor is to inspire faith in those who do not believe and foster the growth and perseverance of believers through the grace of God. We express gratitude to God for His assistance in fulfilling this responsibility in past years, and we are committed to even greater diligence in expanding God's kingdom in the upcoming period of service. The Bible, as the living Word of God, serves as our primary guide in carrying out the responsibilities entrusted to us by Christ.`

// Ministry quick-links (home features grid)
export const ministries = [
  { icon: 'fa-hands-praying', am: 'ጸሎት', en: 'Prayer', desc: 'የጸሎት ጥያቄ . . .' },
  { icon: 'fa-child', am: 'ልጆች', en: 'Children', desc: 'የልጆች አገልግሎት፣ ለወላጆች ጠቃሚ ጽሁፎች . . .' },
  { icon: 'fa-clipboard-list', am: 'ምዝገባ', en: 'Registration', desc: 'ማንኛውንም አይነት ምዝገባ' },
  { icon: 'fa-users', am: 'ወጣቶች', en: 'Youth', desc: 'Youth ministry' },
  { icon: 'fa-bible', am: 'መጽሐፍ ቅዱስ ጥናት', en: 'Bible Study', desc: 'የመጽሐፍ ቅዱስ ጥናት ለመካፈል እና ማጥኛ ጽሁፎች . . .' },
  { icon: 'fa-gift', am: 'ስጦታ', en: 'Give', desc: 'በስጦታዎ አብረውን ለማገልገል . . .' },
  { icon: 'fa-video', am: 'ሚድያ', en: 'Media', desc: 'ስብከቶችን ለማዳመጥ . . .' },
  { icon: 'fa-handshake', am: 'ለመያያዝ', en: 'Stay Connected', desc: 'አባል ለመሆን፣ በቤተሰብ ኅብረት ለመያያዝ . . .' },
]

// Services page
export const services = [
  {
    icon: 'fa-church',
    title: 'Worship Services',
    desc: 'Join us for our Sunday worship services and experience inspiring messages, uplifting music, and fellowship.',
  },
  {
    icon: 'fa-users',
    title: 'Community Outreach',
    desc: 'We actively engage in community programs, supporting those in need with resources and spiritual guidance.',
  },
  {
    icon: 'fa-book-open',
    title: 'Bible Study',
    desc: 'Deepen your understanding of God’s word through our regular Bible study sessions available for all age groups.',
  },
  {
    icon: 'fa-child',
    title: 'Children’s Ministry',
    desc: 'We offer engaging activities and spiritual lessons designed specifically for children.',
  },
  {
    icon: 'fa-hands-praying',
    title: 'Prayer Meetings',
    desc: 'Participate in our weekly prayer meetings to seek God’s guidance and blessings together as a congregation.',
  },
  {
    icon: 'fa-handshake',
    title: 'Counseling Services',
    desc: 'We provide spiritual and life counseling for individuals and families in need of support.',
  },
]

// About page
export const aboutMission = [
  'Proclaim the Word of God with clarity and conviction.',
  'Foster spiritual growth through worship, Bible study, and prayer.',
  'Serve the community with love, compassion, and humility.',
  'Equip believers to fulfill their God-given purpose and calling.',
]

// All congregation photos (verified to exist on disk)
export const galleryImages = [
  '/image/photo1.jpg',
  '/image/photo2.png',
  '/image/photo3.png',
  '/image/photo4.jpg',
  '/image/photo5.jpg',
  '/image/photo6.jpg',
  '/image/photo7.png',
  '/image/photo8.jpg',
  '/image/photo9.jpg',
  '/image/photo10.jpg',
  '/image/prayer.png',
]

// Hero slideshow images (hero background + every gallery photo)
export const heroImages = ['/image/hero-bg.jpg', ...galleryImages]

// Core values strip
export const values = [
  { icon: 'fa-dove', title: 'Worship', desc: 'Encountering God together in spirit and truth.' },
  { icon: 'fa-people-group', title: 'Fellowship', desc: 'A loving family rooted in Christ and community.' },
  { icon: 'fa-book-bible', title: 'Discipleship', desc: 'Growing in the Word and walking in faith.' },
  { icon: 'fa-hand-holding-heart', title: 'Service', desc: 'Sharing God’s love with Austin and beyond.' },
]
