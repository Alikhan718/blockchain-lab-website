// Blockchain Lab Website JavaScript

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const langButtons = document.querySelectorAll('.lang-btn');

// Mobile Navigation Toggle
function updateNavHeightVar() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const h = nav.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-height', h + 'px');
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        updateNavHeightVar();
    });
}

window.addEventListener('resize', updateNavHeightVar);
document.addEventListener('DOMContentLoaded', updateNavHeightVar);

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Language switching functionality
const translations = {
    ru: {
        // Navigation
        'nav.home': 'Главная',
        'nav.about': 'О нас',
        'nav.research': 'Исследования',
        'nav.education': 'Образование',
        'nav.projects': 'Проекты',
        'nav.team': 'Команда',
        'nav.news': 'Новости',
        'nav.contact': 'Контакты',
        
        // Hero Section
        'hero.title': 'Blockchain & Fintech Lab',
        'hero.subtitle': 'Powered by Nazarbayev University',
        'hero.description': 'Создаем будущее цифрового Казахстана. Исследования. Образование. Внедрение.',
        'hero.btn1': 'Проекты',
        'hero.btn2': 'Курсы',
        'hero.btn3': 'РЕГИСТРАЦИЯ НА ОТКРЫТИЕ',
        
        // About Section
        'about.title': 'О лаборатории',
        'about.subtitle': 'Первая в Казахстане и СНГ университетская блокчейн-лаборатория',
        'about.mission': 'Наша миссия',
        'about.mission.text': 'Стать катализатором цифровой трансформации Казахстана через создание центра превосходства в области блокчейн-технологий, который интегрирует передовые исследования, образование мирового уровня и практическое внедрение решений для государства и бизнеса.',
        'about.problem': 'Проблема',
        'about.problem.text': 'Отсутствие безопасной, децентрализованной среды для хранения государственных данных и проведения исследований в области блокчейн-технологий.',
        'about.solution': 'Решение',
        'about.solution.text': 'Создание комплексной экосистемы, объединяющей исследования, образование и коммерциализацию блокчейн-технологий.',
        'about.stats.investment': 'млн. тенге инвестиций',
        'about.stats.graduates': 'выпускников в год',
        'about.stats.directions': 'пилотных проектов',
        'about.partners': 'Наши партнеры',
        
        // Research Section
        'research.title': 'Исследования и R&D',
        'research.subtitle': 'Разработка и передовые исследования',
        'research.kazsmartchain': 'KazSmartChain',
        'research.kazsmartchain.text': 'Разработка приватного блокчейна для государственных нужд с фокусом на безопасность и масштабируемость.',
        'research.smartcontracts': 'Смарт-контракты',
        'research.smartcontracts.text': 'Создание смарт-контрактов для автоматизации государственных услуг и повышения прозрачности.',
        'research.defi': 'DeFi & CBDC',
        'research.defi.text': 'Исследования в области децентрализованных финансов и цифровых валют центральных банков.',
        'research.did': 'Цифровые ID',
        'research.did.text': 'Разработка децентрализованных идентификаторов (DID) для безопасной аутентификации.',
        'research.dao': 'DAO',
        'research.dao.text': 'Создание децентрализованных автономных организаций для управления и принятия решений.',
        'research.tokenization': 'Токенизация',
        'research.tokenization.text': 'Исследования по токенизации активов: образования, полезных ископаемых, углеродного следа.',
        'research.outputs': 'Научные результаты',
        'research.publications': 'публикаций в IEEE, Springer',
        'research.patents': 'патентов',
        'research.hackathons': 'хакатона в год',
        
        // Education Section
        'education.title': 'Образование',
        'education.subtitle': 'Подготовка нового поколения блокчейн-специалистов',
        'education.student': 'Студенческие курсы',
        'education.student.text': 'Элективные курсы для студентов Назарбаев Университета',
        'education.professional': 'Профессиональные курсы',
        'education.professional.text': 'B2B и B2C программы для специалистов',
        'education.workshops': 'Мастер-классы',
        'education.workshops.text': 'Практические воркшопы и хакатоны',
        'education.graduates': 'выпускников в первый год',
        'education.courses': 'курсов в семестр',
        'education.online': 'онлайн доступ к материалам',
        
        // Projects Section
        'projects.title': 'Ключевые проекты',
        'projects.subtitle': 'Пилотные проекты и коммерциализация',
        'projects.jasaim': 'Jasaim Blockchain',
        'projects.jasaim.text': 'Децентрализованная система верификации дипломов и академических записей. Обеспечивает прозрачность и защиту от подделок.',
        'projects.kazsmartchain': 'KazSmartChain',
        'projects.kazsmartchain.text': 'Национальная приватная блокчейн-инфраструктура для государственных органов и образовательных учреждений.',
        'projects.dao': 'DAO & Impact Fund',
        'projects.dao.text': 'Децентрализованная модель управления и инвестиций для поддержки инновационных проектов в сфере блокчейн.',
        
        // Team Section
        'team.title': 'Команда',
        'team.subtitle': 'Эксперты в области блокчейн-технологий',
        'team.jasaim': 'Руководитель от JASAIM',
        'team.jasaim.text': 'Эксперт в области блокчейн-технологий и криптографии',
        'team.yazici': 'Проф. Adnan Yazici',
        'team.yazici.text': 'Куратор от Назарбаев Университета',
        'team.tyler': 'Проф. Benjamin Tyler',
        'team.tyler.text': 'Научный руководитель исследований',
        'team.join': 'Присоединяйтесь к команде',
        'team.join.text': 'Мы ищем талантливых исследователей, разработчиков и специалистов в области блокчейн-технологий',
        'team.apply': 'Подать заявку',
        
        // News Section
        'news.title': 'Новости и события',
        'news.subtitle': 'Последние обновления и предстоящие мероприятия',
        'news.hackathon': 'Запуск первого хакатона Blockchain Lab',
        'news.hackathon.text': 'Приглашаем студентов и разработчиков принять участие в 48-часовом хакатоне по разработке блокчейн-решений для образования.',
        'news.ieee': 'Публикация в IEEE',
        'news.ieee.text': 'Наша команда опубликовала исследование по безопасности приватных блокчейнов в журнале IEEE Transactions.',
        'news.partnership': 'Партнерство с госорганами',
        'news.partnership.text': 'Подписано соглашение о сотрудничестве с Министерством цифрового развития РК.',
        'news.more': 'Подробнее →',
        'news.read': 'Читать →',
        
        // Contact Section
        'contact.title': 'Контакты',
        'contact.subtitle': 'Свяжитесь с нами для сотрудничества',
        'contact.address': 'Адрес',
        'contact.address.text': 'г. Астана, Назарбаев Университет<br>Blockchain & Fintech Lab',
        'contact.email': 'Email',
        'contact.phone': 'Телефон',
        'contact.form': 'Свяжитесь с нами',
        'contact.name': 'Ваше имя',
        'contact.email.placeholder': 'Email',
        'contact.type': 'Тип обращения',
        'contact.partnership': 'Партнерство',
        'contact.education': 'Образование',
        'contact.research': 'Исследования',
        'contact.other': 'Другое',
        'contact.message': 'Сообщение',
        'contact.send': 'Отправить',
        
        // Footer
        'footer.copyright': '© 2025 Blockchain & Fintech Lab. Powered by Nazarbayev University.'
    },
    
    en: {
        // Navigation
        'nav.about': 'About Us',
        'nav.research': 'Research',
        'nav.education': 'Education',
        'nav.projects': 'Projects',
        'nav.team': 'Team',
        'nav.news': 'News',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.title': 'Blockchain & Fintech Lab',
        'hero.subtitle': 'Powered by Nazarbayev University',
        'hero.description': 'Building the future of digital Kazakhstan. Research. Education. Implementation.',
        'hero.btn1': 'Projects',
        'hero.btn2': 'Courses',
        'hero.btn3': 'OPENING RSVP',
        
        // About Section
        'about.title': 'About the Laboratory',
        'about.subtitle': 'First university blockchain laboratory in Kazakhstan and CIS',
        'about.mission': 'Our Mission',
        'about.mission.text': 'Become a catalyst for digital transformation of Kazakhstan through creating a center of excellence in blockchain technologies, which integrates cutting-edge research, world-class education and practical implementation of solutions for the government and business.',
        'about.problem': 'Problem',
        'about.problem.text': 'Lack of secure, decentralized environment for storing government data and conducting blockchain technology research.',
        'about.solution': 'Solution',
        'about.solution.text': 'Creating a comprehensive ecosystem that combines research, education and commercialization of blockchain technologies.',
        'about.stats.investment': 'million tenge investment',
        'about.stats.graduates': 'graduates per year',
        'about.stats.directions': 'pilot projects',
        'about.partners': 'Our Partners',
        
        // Research Section
        'research.title': 'Research & R&D',
        'research.subtitle': 'Development and cutting-edge research',
        'research.kazsmartchain': 'KazSmartChain',
        'research.kazsmartchain.text': 'Development of private blockchain for government needs with focus on security and scalability.',
        'research.smartcontracts': 'Smart Contracts',
        'research.smartcontracts.text': 'Creating smart contracts for automating government services and increasing transparency.',
        'research.defi': 'DeFi & CBDC',
        'research.defi.text': 'Research in decentralized finance and central bank digital currencies.',
        'research.did': 'Digital IDs',
        'research.did.text': 'Development of decentralized identifiers (DID) for secure authentication.',
        'research.dao': 'DAO',
        'research.dao.text': 'Creating decentralized autonomous organizations for governance and decision-making.',
        'research.tokenization': 'Tokenization',
        'research.tokenization.text': 'Research on asset tokenization: education, minerals, carbon footprint.',
        'research.outputs': 'Research Outputs',
        'research.publications': 'publications in IEEE, Springer',
        'research.patents': 'patents',
        'research.hackathons': 'hackathons per year',
        
        // Education Section
        'education.title': 'Education',
        'education.subtitle': 'Training the next generation of blockchain specialists',
        'education.student': 'Student Courses',
        'education.student.text': 'Elective courses for Nazarbayev University students',
        'education.professional': 'Professional Courses',
        'education.professional.text': 'B2B and B2C programs for specialists',
        'education.workshops': 'Master Classes',
        'education.workshops.text': 'Practical workshops and hackathons',
        'education.graduates': 'graduates in first year',
        'education.courses': 'courses per semester',
        'education.online': 'online access to materials',
        
        // Projects Section
        'projects.title': 'Key Projects',
        'projects.subtitle': 'Pilot projects and commercialization',
        'projects.jasaim': 'Jasaim Blockchain',
        'projects.jasaim.text': 'Decentralized system for diploma and academic record verification. Ensures transparency and protection against forgery.',
        'projects.kazsmartchain': 'KazSmartChain',
        'projects.kazsmartchain.text': 'National private blockchain infrastructure for government agencies and educational institutions.',
        'projects.dao': 'DAO & Impact Fund',
        'projects.dao.text': 'Decentralized model of governance and investment for supporting innovative blockchain projects.',
        
        // Team Section
        'team.title': 'Team',
        'team.subtitle': 'Experts in blockchain technologies',
        'team.jasaim': 'JASAIM Lead',
        'team.jasaim.text': 'Expert in blockchain technologies and cryptography',
        'team.yazici': 'Prof. Adnan Yazici',
        'team.yazici.text': 'Curator from Nazarbayev University',
        'team.tyler': 'Prof. Benjamin Tyler',
        'team.tyler.text': 'Research Director',
        'team.join': 'Join the Team',
        'team.join.text': 'We are looking for talented researchers, developers and specialists in blockchain technologies',
        'team.apply': 'Apply',
        
        // News Section
        'news.title': 'News & Events',
        'news.subtitle': 'Latest updates and upcoming events',
        'news.hackathon': 'First Blockchain Lab Hackathon Launch',
        'news.hackathon.text': 'We invite students and developers to participate in a 48-hour hackathon for developing blockchain solutions for education.',
        'news.ieee': 'IEEE Publication',
        'news.ieee.text': 'Our team published research on private blockchain security in IEEE Transactions journal.',
        'news.partnership': 'Government Partnership',
        'news.partnership.text': 'Agreement signed for cooperation with the Ministry of Digital Development of Kazakhstan.',
        'news.more': 'Learn more →',
        'news.read': 'Read →',
        
        // Contact Section
        'contact.title': 'Contact',
        'contact.subtitle': 'Get in touch for collaboration',
        'contact.address': 'Address',
        'contact.address.text': 'Astana, Nazarbayev University<br>Blockchain & Fintech Lab',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.form': 'Contact Us',
        'contact.name': 'Your name',
        'contact.email.placeholder': 'Email',
        'contact.type': 'Inquiry type',
        'contact.partnership': 'Partnership',
        'contact.education': 'Education',
        'contact.research': 'Research',
        'contact.other': 'Other',
        'contact.message': 'Message',
        'contact.send': 'Send',
        
        // Footer
        'footer.copyright': '© 2025 Blockchain & Fintech Lab. Powered by Nazarbayev University.',
        
        // Education Gallery
        'education.gallery.title': 'Education Gallery',
        'education.gallery.subtitle': 'Moments from the educational process',
        'education.gallery.item1.title': 'Professional Courses',
        'education.gallery.item1.desc': 'B2B training in blockchain and AI',
        'education.gallery.item2.title': 'Master Classes',
        'education.gallery.item2.desc': 'Practical sessions from experts',
        'education.gallery.item3.title': 'NU Elective Course',
        'education.gallery.item3.desc': 'Joint development with SEDS',
        'education.gallery.item4.title': 'TechOrda',
        'education.gallery.item4.desc': 'IT specialists development program',
        'education.gallery.item5.title': 'Students',
        'education.gallery.item5.desc': 'Active participation in learning',
        'education.gallery.item6.title': 'Certificates',
        'education.gallery.item6.desc': 'Official learning documents'
    },
    
    kz: {
        // Navigation
        'nav.home': 'Басты бет',
        'nav.about': 'Біз туралы',
        'nav.research': 'Зерттеулер',
        'nav.education': 'Білім беру',
        'nav.projects': 'Жобалар',
        'nav.team': 'Команда',
        'nav.news': 'Жаңалықтар',
        'nav.contact': 'Байланыс',
        
        // Hero Section
        'hero.title': 'Blockchain & Fintech Lab',
        'hero.subtitle': 'Nazarbayev University қолдауымен',
        'hero.description': 'Қазақстанның цифрлық болашағын құрамыз. Зерттеулер. Білім беру. Енгізу.',
        'hero.btn1': 'Жобалар',
        'hero.btn2': 'Курстар',
        'hero.btn3': 'Ашылуына тіркелу',
        
        // About Section
        'about.title': 'Зертхана туралы',
        'about.subtitle': 'Қазақстан мен ТМД-дағы алғашқы университет блокчейн-зертханасы',
        'about.mission': 'Біздің миссия',
        'about.mission.text': 'Қазақстанның цифрлық трансформациясын қолайластыру үшін блокчейн технологияларындағы ең жақсы орталықты құру, бұл өзекті зерттеулерді, ең жақсы білім беру және практикалық шешімдерді біріктіреді.',
        'about.problem': 'Мәселе',
        'about.problem.text': 'Мемлекеттік мәліметтерді сақтау және блокчейн-технологиялары саласында зерттеулер жүргізу үшін қауіпсіз, децентрализацияланған ортаның болмауы.',
        'about.solution': 'Шешім',
        'about.solution.text': 'Блокчейн-технологияларының зерттеулерін, білім беруді және коммерцияландыруды біріктіретін кешенді экожүйені құру.',
        'about.stats.investment': 'млн. тенге инвестиция',
        'about.stats.graduates': 'жылына түлек',
        'about.stats.directions': 'пилот проекттер',
        'about.partners': 'Біздің серіктестер',
        
        // Research Section
        'research.title': 'Зерттеулер және R&D',
        'research.subtitle': 'Дамыту және алдыңғы қатарлы зерттеулер',
        'research.kazsmartchain': 'KazSmartChain',
        'research.kazsmartchain.text': 'Мемлекеттік қажеттіліктер үшін қауіпсіздік пен масштабталуға назар аудара отырып, жеке блокчейн дамыту.',
        'research.smartcontracts': 'Смарт-келісімшарттар',
        'research.smartcontracts.text': 'Мемлекеттік қызметтерді автоматтандыру және мемлекеттік қызметтерді автоматтандыру үшін смарт-келісімшарттар жасау.',
        'research.defi': 'DeFi & CBDC',
        'research.defi.text': 'Децентрализацияланған қаржы және орталық банктердің цифрлық валюталары саласындағы зерттеулер.',
        'research.did': 'Цифрлық ID',
        'research.did.text': 'Қауіпсіз аутентификация үшін децентрализацияланған идентификаторлар (DID) дамыту.',
        'research.dao': 'DAO',
        'research.dao.text': 'Басқару және шешім қабылдау үшін децентрализацияланған автономды ұйымдар құру.',
        'research.tokenization': 'Токенизация',
        'research.tokenization.text': 'Активтерді токенизациялау бойынша зерттеулер: білім беру, пайдалы қазбалар, көміртегі ізі.',
        'research.outputs': 'Ғылыми нәтижелер',
        'research.publications': 'IEEE, Springer журналдарындағы жарияланымдар',
        'research.patents': 'патент',
        'research.hackathons': 'жылына хакатон',
        
        // Education Section
        'education.title': 'Білім беру',
        'education.subtitle': 'Блокчейн-мамандарының жаңа ұрпағын дайындау',
        'education.student': 'Студенттік курс',
        'education.student.text': 'Nazarbayev University студенттеріне арналған таңдаулы курс',
        'education.professional': 'Кәсіби курс',
        'education.professional.text': 'Мамандарға арналған B2B және B2C бағдарламалар',
        'education.workshops': 'Мастер-класс',
        'education.workshops.text': 'Практикалық семинарлар мен хакатондар',
        'education.graduates': 'бірінші жылы түлек',
        'education.courses': 'семестрде курс',
        'education.online': 'материалдарға онлайн қол жетімділік',
        
        // Projects Section
        'projects.title': 'Негізгі жобалар',
        'projects.subtitle': 'Пилоттық жобалар және коммерцияландыру',
        'projects.jasaim': 'Jasaim Blockchain',
        'projects.jasaim.text': 'Дипломдар мен академиялық жазбаларды тексеру үшін децентрализацияланған жүйе. Ашықтық пен қолдан жасалған қорғанысты қамтамасыз етеді.',
        'projects.kazsmartchain': 'KazSmartChain',
        'projects.kazsmartchain.text': 'Мемлекеттік органдар мен білім беру мекемелеріне арналған ұлттық жеке блокчейн-инфрақұрылымы.',
        'projects.dao': 'DAO & Impact Fund',
        'projects.dao.text': 'Блокчейн саласындағы инновациялық жобаларды қолдау үшін децентрализацияланған басқару және инвестиция моделі.',
        
        // Team Section
        'team.title': 'Команда',
        'team.subtitle': 'Блокчейн-технологиялары саласындағы сарапшылар',
        'team.jasaim': 'JASAIM жетекшісі',
        'team.jasaim.text': 'Блокчейн-технологиялары және криптография саласындағы сарапшы',
        'team.yazici': 'Проф. Adnan Yazici',
        'team.yazici.text': 'Nazarbayev University кураторы',
        'team.tyler': 'Проф. Benjamin Tyler',
        'team.tyler.text': 'Зерттеулер директоры',
        'team.join': 'Командаға қосылу',
        'team.join.text': 'Біз блокчейн-технологиялары саласындағы талантты зерттеушілер, әзірлеушілер мен мамандарды іздейміз',
        'team.apply': 'Өтініш беру',
        
        // News Section
        'news.title': 'Жаңалықтар мен оқиғалар',
        'news.subtitle': 'Соңғы жаңартулар мен алдағы іс-шаралар',
        'news.hackathon': 'Алғашқы Blockchain Lab хакатонын іске қосу',
        'news.hackathon.text': 'Біз студенттер мен әзірлеушілерді білім беру үшін блокчейн-шешімдерін әзірлеу бойынша 48 сағаттық хакатонға қатысуға шақырамыз.',
        'news.ieee': 'IEEE-де жариялау',
        'news.ieee.text': 'Біздің команда IEEE Transactions журналында жеке блокчейндердің қауіпсіздігі туралы зерттеуді жариялады.',
        'news.partnership': 'Мемлекеттік органдармен серіктестік',
        'news.partnership.text': 'Қазақстан Республикасының Цифрлық даму министрлігімен ынтымақтастық туралы келісімшартқа қол қойылды.',
        'news.more': 'Толығырақ →',
        'news.read': 'Оқу →',
        
        // Contact Section
        'contact.title': 'Байланыс',
        'contact.subtitle': 'Серіктестік үшін бізбен байланысыңыз',
        'contact.address': 'Мекенжай',
        'contact.address.text': 'Астана қ., Nazarbayev University<br>Blockchain & Fintech Lab',
        'contact.email': 'Email',
        'contact.phone': 'Телефон',
        'contact.form': 'Бізбен байланыс',
        'contact.name': 'Сіздің атыңыз',
        'contact.email.placeholder': 'Email',
        'contact.type': 'Сұрау түрі',
        'contact.partnership': 'Серіктестік',
        'contact.education': 'Білім беру',
        'contact.research': 'Зерттеулер',
        'contact.other': 'Басқа',
        'contact.message': 'Хабарлама',
        'contact.send': 'Жіберу',
        
        // Footer
        'footer.copyright': '© 2025 Blockchain & Fintech Lab. Nazarbayev University қолдауымен.',
        
        // Education Gallery
        'education.gallery.title': 'Білім беру галереясы',
        'education.gallery.subtitle': 'Білім беру процесінен сәттер',
        'education.gallery.item1.title': 'Кәсіби курстар',
        'education.gallery.item1.desc': 'Блокчейн және ИИ бойынша B2B оқыту',
        'education.gallery.item2.title': 'Мастер-кластар',
        'education.gallery.item2.desc': 'Сарапшылардан практикалық сабақтар',
        'education.gallery.item3.title': 'НУ элективтік курсы',
        'education.gallery.item3.desc': 'SEDS-пен бірлескен әзірлеу',
        'education.gallery.item4.title': 'TechOrda',
        'education.gallery.item4.desc': 'IT мамандарын дамыту бағдарламасы',
        'education.gallery.item5.title': 'Студенттер',
        'education.gallery.item5.desc': 'Оқытуда белсенді қатысу',
        'education.gallery.item6.title': 'Сертификаттар',
        'education.gallery.item6.desc': 'Оқыту туралы ресми құжаттар'
    }
};

let currentLanguage = 'ru';

// Language switching
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        if (lang !== currentLanguage) {
            currentLanguage = lang;
            updateLanguage(lang);
            updateActiveLanguageButton(button);
        }
    });
});

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    // placeholders
    const phElements = document.querySelectorAll('[data-translate-placeholder]');
    phElements.forEach(element => {
        const key = element.dataset.translatePlaceholder;
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });
    // value
    const valElements = document.querySelectorAll('[data-translate-value]');
    valElements.forEach(element => {
        const key = element.dataset.translateValue;
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('value', translations[lang][key]);
        }
    });
}

function updateActiveLanguageButton(activeButton) {
    langButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    // Add data-translate attributes to HTML elements
    addTranslationAttributes();
    updateLanguage(currentLanguage);
});

function addTranslationAttributes() {
    // This function would add data-translate attributes to elements
    // For now, we'll handle translations manually in the HTML
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar + Back-to-top scroll effect
function applyScrollClasses() {
    const threshold = 20;
    if (window.scrollY > threshold) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', applyScrollClasses, { passive: true });
document.addEventListener('DOMContentLoaded', applyScrollClasses);

// Back-to-top button creation (single, reused on all pages)
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('backToTopBtn')) {
        const btn = document.createElement('button');
        btn.id = 'backToTopBtn';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '↑';
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(btn);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.research-card, .education-card, .project-card, .team-member, .news-card');
    animatedElements.forEach(el => observer.observe(el));
});

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Blockchain animation enhancement
function enhanceBlockchainAnimation() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach((block, index) => {
        block.addEventListener('mouseenter', () => {
            block.style.transform = 'scaleY(2)';
            block.style.background = 'linear-gradient(135deg, #162c1b 0%, #d2ff1e 100%)';
        });
        
        block.addEventListener('mouseleave', () => {
            block.style.transform = 'scaleY(1)';
            block.style.background = 'linear-gradient(135deg, #d2ff1e 0%, #162c1b 100%)';
        });
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    enhanceBlockchainAnimation();
});

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .output-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
});

// HERO: 3D-ish blocks animation on canvas + typewriter headline
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    function resize() {
        const { clientWidth, clientHeight } = canvas;
        canvas.width = clientWidth * DPR;
        canvas.height = clientHeight * DPR;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const nodes = [];
    const cubes = [];
    const shards = [];
    const pulses = [];
    const COLORS = ['#d2ff1e', '#162c1b'];
    const MAX_NODES = canvas.clientWidth < 900 ? 28 : 42;
    const MAX_CUBES = canvas.clientWidth < 900 ? 16 : 28;
    const MAX_SHARDS = canvas.clientWidth < 900 ? 16 : 28;

    // Parallax tracking for a subtle depth effect
    let targetParallax = { x: 0, y: 0 };
    let parallax = { x: 0, y: 0 };
    window.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetParallax.x = (e.clientX - cx) / cx; // -1..1
        targetParallax.y = (e.clientY - cy) / cy;
    }, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    function spawnNode() {
        const x = Math.random() * canvas.clientWidth;
        const y = Math.random() * canvas.clientHeight;
        const z = Math.random() * 1.0 + 0.4; // depth for parallax (0.4..1.4)
        const vx = (Math.random() - 0.5) * 0.25;
        const vy = (Math.random() - 0.5) * 0.25;
        nodes.push({ x, y, z, vx, vy });
    }

    function spawnCube() {
        const s = 8 + Math.random() * 20;
        const x = Math.random() * canvas.clientWidth;
        const y = Math.random() * canvas.clientHeight;
        const z = Math.random() * 1.0 + 0.4;
        const r = Math.random() * Math.PI * 2; // rotation
        const vr = (Math.random() - 0.5) * 0.0025; // slow rotation
        const vx = (Math.random() - 0.5) * 0.2;
        const vy = (Math.random() - 0.5) * 0.2;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        cubes.push({ x, y, z, s, r, vr, vx, vy, color });
    }

    for (let i = 0; i < MAX_NODES; i++) spawnNode();
    for (let i = 0; i < MAX_CUBES; i++) spawnCube();
    // shards
    for (let i = 0; i < MAX_SHARDS; i++) {
        const x = Math.random() * canvas.clientWidth;
        const y = Math.random() * canvas.clientHeight;
        const s = 6 + Math.random() * 16;
        const a = Math.random() * Math.PI * 2;
        const va = (Math.random() - 0.5) * 0.004;
        const speed = 0.2 + Math.random() * 0.6;
        const dir = Math.random() * Math.PI * 2;
        const vx = Math.cos(dir) * speed;
        const vy = Math.sin(dir) * speed;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        shards.push({ x, y, s, a, va, vx, vy, color });
    }

    function drawGlassLine(x1, y1, x2, y2, a) {
        // glassy neon line
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, 'rgba(210,255,30,' + a + ')');
        grad.addColorStop(1, 'rgba(22,44,27,' + a + ')');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawGlassCube(c) {
        // wireframe cube with slight glow
        const s = c.s;
        const r = c.r;
        const cos = Math.cos(r), sin = Math.sin(r);
        const depth = s * 0.75;
        const pts = [
            { x: -s, y: -s }, { x: s, y: -s }, { x: s, y: s }, { x: -s, y: s }
        ].map(p => ({ x: c.x + (p.x * cos - p.y * sin) * c.z, y: c.y + (p.x * sin + p.y * cos) * c.z }));
        const ptsTop = pts.map(p => ({ x: p.x + depth * 0.5, y: p.y - depth * 0.8 }));

        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 1.2;
        // base
        drawGlassLine(pts[0].x, pts[0].y, pts[1].x, pts[1].y, 0.25);
        drawGlassLine(pts[1].x, pts[1].y, pts[2].x, pts[2].y, 0.25);
        drawGlassLine(pts[2].x, pts[2].y, pts[3].x, pts[3].y, 0.25);
        drawGlassLine(pts[3].x, pts[3].y, pts[0].x, pts[0].y, 0.25);
        // top
        drawGlassLine(ptsTop[0].x, ptsTop[0].y, ptsTop[1].x, ptsTop[1].y, 0.25);
        drawGlassLine(ptsTop[1].x, ptsTop[1].y, ptsTop[2].x, ptsTop[2].y, 0.25);
        drawGlassLine(ptsTop[2].x, ptsTop[2].y, ptsTop[3].x, ptsTop[3].y, 0.25);
        drawGlassLine(ptsTop[3].x, ptsTop[3].y, ptsTop[0].x, ptsTop[0].y, 0.25);
        // pillars
        for (let i = 0; i < 4; i++) {
            drawGlassLine(pts[i].x, pts[i].y, ptsTop[i].x, ptsTop[i].y, 0.25);
        }
        ctx.globalAlpha = 1;
    }

    function drawShard(s) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.a);
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-s.s, 0);
        ctx.lineTo(0, -s.s * 0.6);
        ctx.lineTo(s.s, 0);
        ctx.lineTo(0, s.s * 0.6);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    function drawPulse(p) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = 'rgba(210,255,30,0.85)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function emitPulse(ax, ay, bx, by) {
        pulses.push({ ax, ay, bx, by, t: 0 });
    }

    setInterval(() => {
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        const b = nodes[Math.floor(Math.random() * nodes.length)];
        if (a && b) emitPulse(a.x, a.y, b.x, b.y);
    }, 900);

    function shade(hex, amt) {
        // simple hex shade
        let col = hex.replace('#','');
        if (col.length === 3) col = col.split('').map(c=>c+c).join('');
        const num = parseInt(col, 16);
        let r = (num >> 16) + amt;
        let g = ((num >> 8) & 0x00FF) + amt;
        let b = (num & 0x0000FF) + amt;
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));
        return '#' + (r<<16 | g<<8 | b).toString(16).padStart(6, '0');
    }

    function tick() {
        // Smooth parallax
        parallax.x = lerp(parallax.x, targetParallax.x, 0.05);
        parallax.y = lerp(parallax.y, targetParallax.y, 0.05);

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        // subtle background tint
        ctx.fillStyle = 'rgba(33,33,33,0.25)';
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        // update nodes (parallax network)
        for (const n of nodes) {
            n.x += n.vx * n.z;
            n.y += n.vy * n.z;
            if (n.x < -40) n.x = canvas.clientWidth + 40;
            if (n.x > canvas.clientWidth + 40) n.x = -40;
            if (n.y < -40) n.y = canvas.clientHeight + 40;
            if (n.y > canvas.clientHeight + 40) n.y = -40;
        }

        // draw links with glass glow (parallax offset)
        const ox = parallax.x * 10;
        const oy = parallax.y * 10;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                const maxDist = 140;
                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.35;
                    drawGlassLine(a.x + ox, a.y + oy, b.x + ox, b.y + oy, alpha);
                }
            }
        }

        // pulses moving along links
        for (let k = pulses.length - 1; k >= 0; k--) {
            const p = pulses[k];
            p.t += 0.02;
            if (p.t >= 1) { pulses.splice(k, 1); continue; }
            p.x = lerp(p.ax, p.bx, p.t);
            p.y = lerp(p.ay, p.by, p.t);
            drawPulse(p);
        }

        // update and draw glass cubes
        for (const c of cubes) {
            c.r += c.vr;
            c.x += c.vx * c.z;
            c.y += c.vy * c.z;
            if (c.x < -60) c.x = canvas.clientWidth + 60;
            if (c.x > canvas.clientWidth + 60) c.x = -60;
            if (c.y < -60) c.y = canvas.clientHeight + 60;
            if (c.y > canvas.clientHeight + 60) c.y = -60;
            drawGlassCube(c);
        }

        // shards
        for (const s of shards) {
            s.a += s.va;
            s.x += s.vx + parallax.x * 0.6;
            s.y += s.vy + parallax.y * 0.6;
            const w = canvas.clientWidth, h = canvas.clientHeight;
            if (s.x < -60) s.x = w + 60; if (s.x > w + 60) s.x = -60;
            if (s.y < -60) s.y = h + 60; if (s.y > h + 60) s.y = -60;
            drawShard(s);
        }

        requestAnimationFrame(tick);
    }
    tick();
}

function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const items = ['Learn and Understand', 'Build and Integrate', 'Control and Regulate'];
    let idx = 0;
    let char = 0;
    let deleting = false;
    let pause = 0;

    el.style.borderRight = '2px solid #d2ff1e';
    el.style.paddingRight = '4px';

    function step() {
        const current = items[idx];
        if (pause > 0) { pause--; return queueNext(60); }

        if (!deleting) {
            char++;
            el.textContent = current.slice(0, char);
            if (char === current.length) {
                deleting = true;
                pause = 45; // pause at end
            }
            return queueNext(40 + Math.random()*40);
        } else {
            char--;
            el.textContent = current.slice(0, char);
            if (char === 0) {
                deleting = false;
                idx = (idx + 1) % items.length;
                pause = 18; // pause before typing next
            }
            return queueNext(30 + Math.random()*30);
        }
    }

    function queueNext(delay) {
        setTimeout(step, delay);
    }

    step();
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
    initTypewriter();
});

// Mobile menu close on outside click
document.addEventListener('click', (e) => {
    if (!hamburger || !navMenu) return;
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger && navMenu) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Dropdown menu logic
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    const menu = toggle.nextElementSibling;
    if (!menu) return;
    // Desktop: open on hover/focus
    toggle.addEventListener('mouseenter', () => menu.style.opacity = '1');
    toggle.addEventListener('mouseleave', () => menu.style.opacity = '');
    menu.addEventListener('mouseenter', () => menu.style.opacity = '1');
    menu.addEventListener('mouseleave', () => menu.style.opacity = '');
    // Mobile: open on click (только если это button, а не ссылка)
    if (toggle.tagName === 'BUTTON') {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = menu.classList.contains('open');
            document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
            if (!isOpen) menu.classList.add('open');
            else menu.classList.remove('open');
        });
    }
});
// Close dropdowns on outside click
window.addEventListener('click', (e) => {
    if (![...dropdownToggles].some(t => t.contains(e.target)) && ![...document.querySelectorAll('.dropdown-menu')].some(m => m.contains(e.target))) {
        document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
    }
});

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
});

// Export functions for global use
window.scrollToSection = scrollToSection;

// Добавить переводы для новых пунктов меню
Object.assign(translations.ru, {
    'projects.kazsmartchain': 'KazSmartChain',
    'projects.ediploma': 'eDiploma',
    'projects.apartchain': 'ApartChain',
    'projects.dao': 'DAO',
    'education.courses': 'Курсы',
    'education.workshops': 'Мастер-классы',
    'education.elective': 'Элективный курс НУ',
    'education.techorda': 'TechOrda',
});
Object.assign(translations.en, {
    'projects.kazsmartchain': 'KazSmartChain',
    'projects.ediploma': 'eDiploma',
    'projects.apartchain': 'ApartChain',
    'projects.dao': 'DAO',
    'education.courses': 'Courses',
    'education.workshops': 'Workshops',
    'education.elective': 'NU Elective',
    'education.techorda': 'TechOrda',
});
Object.assign(translations.kz, {
    'projects.kazsmartchain': 'KazSmartChain',
    'projects.ediploma': 'eDiploma',
    'projects.apartchain': 'ApartChain',
    'projects.dao': 'DAO',
    'education.courses': 'Курстар',
    'education.workshops': 'Мастер-кластар',
    'education.elective': 'NU элективі',
    'education.techorda': 'TechOrda',
});

// Extend translations for new homepage keys
Object.assign(translations.ru, {
  'about.stats.investment.label': 'млн. тенге инвестиций',
  'about.stats.graduates.label': 'выпускников в год',
  'about.stats.directions.label': 'основных направления',
  'seds.title': 'Сотрудничество с SEDS',
  'seds.description': 'Мы тесно сотрудничаем с <strong>School of Engineering and Digital Sciences</strong> Назарбаев Университета для проведения передовых исследований в области блокчейн-технологий и финтеха.',
  'seds.feature1.title': 'Академическое сотрудничество',
  'seds.feature1.text': 'Совместные исследования с профессорами и студентами SEDS',
  'seds.feature2.title': 'Лабораторные ресурсы',
  'seds.feature2.text': 'Доступ к современному оборудованию и вычислительным мощностям',
  'seds.feature3.title': 'Образовательные программы',
  'seds.feature3.text': 'Разработка курсов и программ по блокчейн-технологиям',
  'plans.title': 'Планы исследований',
  'plans.card1.year': '2025-2026',
  'plans.card1.title': 'Запуск KazSmartChain',
  'plans.card1.text': 'Полномасштабное развертывание приватного блокчейна для государственных нужд Казахстана с интеграцией с существующими системами.',
  'plans.card1.f1': 'Тестирование в пилотных регионах',
  'plans.card1.f2': 'Интеграция с госуслугами',
  'plans.card1.f3': 'Обучение специалистов',
  'plans.card2.year': '2026-2027',
  'plans.card2.title': 'Международное сотрудничество',
  'plans.card2.text': 'Расширение исследований на международном уровне с партнерами из СНГ, Европы и Азии.',
  'plans.card2.f1': 'Совместные проекты с зарубежными университетами',
  'plans.card2.f2': 'Участие в международных конференциях',
  'plans.card2.f3': 'Обмен опытом и технологиями',
  'plans.card3.year': '2027-2028',
  'plans.card3.title': 'Инновационные решения',
  'plans.card3.text': 'Разработка прорывных технологий в области DeFi, NFT, метавселенной и квантово-устойчивых блокчейнов.',
  'plans.card3.f1': 'Квантово-устойчивая криптография',
  'plans.card3.f2': 'Экосистема DeFi для Казахстана',
  'plans.card3.f3': 'Цифровые активы и NFT',
  'home.projects.ksc.text': 'Государственная блокчейн-платформа для цифровой трансформации Казахстана. Обеспечивает суверенность, безопасность и масштабируемость, поддерживает токенизацию, цифровую идентичность и прозрачный обмен данными для государственных и частных сервисов.',
  'home.projects.ksc.li1': 'Токенизация активов и цифровая идентичность',
  'home.projects.ksc.li2': 'Прозрачность для госуслуг и бизнеса, снижение мошенничества',
  'home.projects.ksc.li3': 'Технологическая независимость и совместимость',
  'home.projects.cta.title': 'Все проекты лаборатории',
  'home.projects.cta.subtitle': 'Ознакомьтесь с нашими инициативами',
  'button.aboutProject': 'О проекте'
});

Object.assign(translations.en, {
  'about.stats.investment.label': 'million tenge investment',
  'about.stats.graduates.label': 'graduates per year',
  'about.stats.directions.label': 'main directions',
  'seds.title': 'Partnership with SEDS',
  'seds.description': 'We closely collaborate with <strong>School of Engineering and Digital Sciences</strong> of Nazarbayev University to conduct cutting-edge research in blockchain and fintech.',
  'seds.feature1.title': 'Academic Collaboration',
  'seds.feature1.text': 'Joint research with SEDS professors and students',
  'seds.feature2.title': 'Lab Resources',
  'seds.feature2.text': 'Access to modern equipment and compute power',
  'seds.feature3.title': 'Educational Programs',
  'seds.feature3.text': 'Developing blockchain technology courses and programs',
  'plans.title': 'Research Roadmap',
  'plans.card1.year': '2025-2026',
  'plans.card1.title': 'KazSmartChain Launch',
  'plans.card1.text': 'Full-scale deployment of private blockchain for Kazakhstan government needs with integrations.',
  'plans.card1.f1': 'Pilots in selected regions',
  'plans.card1.f2': 'Integration with eGov services',
  'plans.card1.f3': 'Specialist training',
  'plans.card2.year': '2026-2027',
  'plans.card2.title': 'International Collaboration',
  'plans.card2.text': 'Expanding research with partners from CIS, Europe and Asia.',
  'plans.card2.f1': 'Joint projects with foreign universities',
  'plans.card2.f2': 'Participation in international conferences',
  'plans.card2.f3': 'Knowledge and technology exchange',
  'plans.card3.year': '2027-2028',
  'plans.card3.title': 'Innovative Solutions',
  'plans.card3.text': 'Developing breakthrough technologies in DeFi, NFTs, metaverse and quantum-resistant blockchains.',
  'plans.card3.f1': 'Quantum-resistant cryptography',
  'plans.card3.f2': 'National DeFi ecosystem',
  'plans.card3.f3': 'Digital assets and NFTs',
  'home.projects.ksc.text': 'National blockchain platform for Kazakhstan. Ensures sovereignty, security and scalability, supports tokenization, digital identity and trusted data exchange.',
  'home.projects.ksc.li1': 'Asset tokenization and digital identity',
  'home.projects.ksc.li2': 'Transparency for public services and business',
  'home.projects.ksc.li3': 'Technological independence and interoperability',
  'home.projects.cta.title': 'All Lab Projects',
  'home.projects.cta.subtitle': 'Explore our initiatives',
  'button.aboutProject': 'About Project'
});

Object.assign(translations.kz, {
  'about.stats.investment.label': 'млн. тенге инвестиция',
  'about.stats.graduates.label': 'жылына түлек',
  'about.stats.directions.label': 'негізгі бағыт',
  'seds.title': 'SEDS-пен серіктестік',
  'seds.description': 'Біз Nazarbayev University-дің <strong>School of Engineering and Digital Sciences</strong> факультетімен блокчейн мен финтех бойынша алдыңғы қатарлы зерттеулер жүргіземіз.',
  'seds.feature1.title': 'Академиялық ынтымақтастық',
  'seds.feature1.text': 'SEDS профессорлары мен студенттерімен бірлескен зерттеулер',
  'seds.feature2.title': 'Зертханалық ресурстар',
  'seds.feature2.text': 'Қазіргі жабдықтар мен есептеу қуатына қолжетімділік',
  'seds.feature3.title': 'Білім беру бағдарламалары',
  'seds.feature3.text': 'Блокчейн технологиялары бойынша курстар әзірлеу',
  'plans.title': 'Зерттеу жоспары',
  'plans.card1.year': '2025-2026',
  'plans.card1.title': 'KazSmartChain іске қосу',
  'plans.card1.text': 'Қазақстанның мемлекеттік қажеттіліктері үшін жеке блокчейнді толық көлемде іске қосу.',
  'plans.card1.f1': 'Пилоттық өңірлерде тестілеу',
  'plans.card1.f2': 'eGov қызметтерімен интеграция',
  'plans.card1.f3': 'Мамандарды оқыту',
  'plans.card2.year': '2026-2027',
  'plans.card2.title': 'Халықаралық ынтымақтастық',
  'plans.card2.text': 'ТМД, Еуропа және Азия серіктестерімен зерттеулерді кеңейту.',
  'plans.card2.f1': 'Шетел университеттерімен бірлескен жобалар',
  'plans.card2.f2': 'Халықаралық конференцияларға қатысу',
  'plans.card2.f3': 'Тәжірибе және технология алмасу',
  'plans.card3.year': '2027-2028',
  'plans.card3.title': 'Инновациялық шешімдер',
  'plans.card3.text': 'DeFi, NFT, метаверс және квантқа төзімді блокчейндер бойынша шешімдер.',
  'plans.card3.f1': 'Квантқа төзімді криптография',
  'plans.card3.f2': 'Ұлттық DeFi экожүйесі',
  'plans.card3.f3': 'Цифрлық активтер және NFT',
  'home.projects.ksc.text': 'Қазақстан үшін ұлттық блокчейн платформасы. Егемендік, қауіпсіздік және масштабталуды қамтамасыз етеді; токенизация, цифрлық идентификация және сенімді деректер алмасуды қолдайды.',
  'home.projects.ksc.li1': 'Активтерді токенизациялау және цифрлық идентификация',
  'home.projects.ksc.li2': 'Мемлекеттік қызметтер мен бизнес үшін ашықтық',
  'home.projects.ksc.li3': 'Технологиялық тәуелсіздік және үйлесімділік',
  'home.projects.cta.title': 'Зертхана жобалары',
  'home.projects.cta.subtitle': 'Біздің бастамаларды қараңыз',
  'button.aboutProject': 'Жоба туралы'
});

// Partners Marquee seamless loop
function duplicateMarqueeTrack() {
    const track = document.querySelector('.marquee-track');
    if (track && !track.classList.contains('marquee-duplicated')) {
        track.innerHTML += track.innerHTML;
        track.classList.add('marquee-duplicated');
    }
}
document.addEventListener('DOMContentLoaded', duplicateMarqueeTrack);

// Carousel functionality
let currentSlideIndex = 0;
const totalSlides = 4;

function initializeCarousel() {
    const carousel = document.querySelector('.carousel-track');
    if (!carousel) return;
    
    // Auto-rotate carousel every 5 seconds
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateCarousel();
    }, 7000);
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;
    updateCarousel();
}

function currentSlide(slideIndex) {
    currentSlideIndex = slideIndex - 1;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    
    if (carousel) {
        carousel.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }
    
    if (dots) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCarousel);

// KSC interactive values and timeline
(function(){
  const valuesList = document.getElementById('kscValuesList');
  const detail = document.getElementById('kscValuesDetail');
  if (valuesList && detail) {
    const titleEl = document.getElementById('kscDetailTitle');
    const bodyEl = document.getElementById('kscDetailBody');
    const banner = detail.querySelector('.ksc-detail-banner');

    const data = {
      sovereignty: {
        title: 'Суверенность и контроль',
        text: 'Данные и ключевые реестры управляются в национальном периметре. Политики доступа и конфиденциальности соответствуют законодательству Казахстана.',
        img: '../assets/images/illustrations/law.png'
      },
      security: {
        title: 'Безопасность и доверие',
        text: 'Криптографическая неизменяемость записей, прослеживаемость действий и контроль доступа формируют доверие между ведомствами, бизнесом и гражданами.',
        img: '../assets/images/illustrations/security.png'
      },
      scalability: {
        title: 'Масштабируемость',
        text: 'Оптимизированные консенсус‑протоколы, шардинг и батчинг транзакций обеспечивают высокую пропускную способность при низких задержках.',
        img: '../assets/images/illustrations/scalability.png'
      },
      interop: {
        title: 'Интероперабельность',
        text: 'Поддержка стандартов совместимости, мостов и API‑шлюзов позволяет безопасно интегрировать внешние экосистемы и решения.',
        img: '../assets/images/illustrations/interop.png'
      }
    };

    const apply = (key) => {
      const item = data[key];
      if (!item) return;
      detail.classList.add('is-updating');
      window.setTimeout(() => {
        titleEl.textContent = item.title;
        bodyEl.textContent = item.text;
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.title;
        img.onerror = () => { img.style.display = 'none'; };
        banner.innerHTML = '';
        banner.prepend(img);
        window.setTimeout(() => detail.classList.remove('is-updating'), 20);
      }, 120);
    };

    valuesList.querySelectorAll('.ksc-value-item').forEach(li => {
      const key = li.getAttribute('data-key');
      const handler = () => {
        valuesList.querySelectorAll('.ksc-value-item').forEach(o => o.classList.remove('active'));
        li.classList.add('active');
        apply(key);
      };
      li.addEventListener('mouseenter', handler);
      li.addEventListener('focus', handler);
      li.addEventListener('click', handler);
    });
  }

  const timeline = document.getElementById('kscTimeline');
  if (timeline) {
    const progress = document.getElementById('kscTimelineProgress');
    const points = timeline.querySelectorAll('.ksc-timeline-point');
    const setActive = (idx) => {
      points.forEach((p,i)=>{
        p.classList.toggle('active', i === idx);
      });
      const widths = [33.33, 66.66, 100];
      progress.style.width = widths[idx] + '%';
    };
    points.forEach((p,i)=>{
      p.addEventListener('mouseenter', ()=> setActive(i));
      p.addEventListener('focus', ()=> setActive(i));
      p.addEventListener('click', ()=> setActive(i));
    });
  }
})();

Object.assign(translations.ru, {
  'team.member1.name': 'Сериков Сырым',
  'team.member1.role': 'Председатель консорциума<br><strong>CEO JASAIM</strong>',
  'team.member2.name': 'Сейткадыров Алихан',
  'team.member2.role': 'Зам. Председателя консорциума<br><strong>CTO JASAIM</strong>',
  'team.member3.name': 'Проф. Adnan Yazici',
  'team.member3.role': 'Научный руководитель<br><strong>School of Engineering and Digital Sciences</strong>',
  'education.card1.title': 'Профессиональные курсы',
  'education.card1.text': 'B2B и B2C программы для отдельных специалистов и компаний по направлениям Блокчейн, ИИ и Блокчейн криминалистики',
  'education.card1.li1': 'Блокчейн-разработка',
  'education.card1.li2': 'Искусственный интеллект в блокчейне',
  'education.card1.li3': 'Блокчейн криминалистика',
  'education.card1.li4': 'Криптоэкономика',
  'education.card2.title': 'Мастер-классы',
  'education.card2.text': 'Практические воркшопы и хакатоны по направлениям Блокчейн, ФинТех, Криминалистика',
  'education.card2.li1': 'Разработка dApps',
  'education.card2.li2': 'Аудит смарт-контрактов',
  'education.card2.li3': 'Управление DAO',
  'education.card2.li4': 'ФинТех решения',
  'education.card3.title': 'Элективный курс НУ',
  'education.card3.text': 'Курс в программе Назарбаевского университета, разрабатываемый совместно с факультетом SEDS. Планируется к внедрению весной 2026 года',
  'education.card3.li1': 'Основы блокчейн-технологий',
  'education.card3.li2': 'Криптография и безопасность',
  'education.card3.li3': 'Смарт-контракты и DeFi',
  'education.card3.li4': 'Практические проекты',
  'education.card4.title': 'TechOrda',
  'education.card4.text': 'Программа развития человеческого капитала в IT сфере. Предоставляет субсидирование обучения для подготовки IT-специалистов в частных школах Республики Казахстан.',
  'education.card4.subtitle': 'Наши курсы в TechOrda:',
  'button.learnMore': 'Узнать подробнее',
  'button.read': 'Ознакомиться',
  'button.schoolPage': 'Перейти на страницу школы',
  'education.stats1': 'выпускников в первый год',
  'education.stats2': 'корпоративных клиентов',
  'education.stats3': 'трудоустройств в первый год',
  'news.item1.date': '1 Октября 2025',
  'news.item1.title': 'Открытие Blockchain & Fintech Lab',
  'news.item1.text': 'Приглашаем студентов принять участие на открытии Blockchain & Fintech Lab на территории Назарбаев Университета',
  'news.item2.date': '10 Октября 2025',
  'news.item2.title': 'Проведение первого хакатона Blockchain Lab',
  'news.item2.text': 'Приглашаем студентов принять участие в хакатоне по разработке блокчейн-решений для образования.',
  'news.item3.date': '5 Октября 2025',
  'news.item3.title': 'Запуск первого студенческого курса',
  'news.item3.text': 'Приглашаем студентов принять участие в первом студенческом курсе по блокчейн-технологиям.',
});

Object.assign(translations.en, {
  'team.member1.name': 'Syrym Serikov',
  'team.member1.role': 'Chairman of the Lab<br><strong>CEO JASAIM</strong>',
  'team.member2.name': 'Alikhan Seitkadyrov',
  'team.member2.role': 'Deputy Chairman<br><strong>CTO JASAIM</strong>',
  'team.member3.name': 'Prof. Adnan Yazici',
  'team.member3.role': 'Research Supervisor<br><strong>School of Engineering and Digital Sciences</strong>',
  'education.card1.title': 'Professional Courses',
  'education.card1.text': 'B2B and B2C programs for individuals and companies in Blockchain, AI and Blockchain Forensics',
  'education.card1.li1': 'Blockchain Development',
  'education.card1.li2': 'AI in Blockchain',
  'education.card1.li3': 'Blockchain Forensics',
  'education.card1.li4': 'Crypto-economics',
  'education.card2.title': 'Master Classes',
  'education.card2.text': 'Practical workshops and hackathons in Blockchain, FinTech and Forensics',
  'education.card2.li1': 'dApps Development',
  'education.card2.li2': 'Smart Contract Auditing',
  'education.card2.li3': 'DAO Governance',
  'education.card2.li4': 'FinTech Solutions',
  'education.card3.title': 'NU Elective Course',
  'education.card3.text': 'An NU program course developed jointly with SEDS. Planned for Spring 2026 rollout',
  'education.card3.li1': 'Blockchain Fundamentals',
  'education.card3.li2': 'Cryptography and Security',
  'education.card3.li3': 'Smart Contracts and DeFi',
  'education.card3.li4': 'Practical Projects',
  'education.card4.title': 'TechOrda',
  'education.card4.text': 'A program to develop human capital in IT. Provides subsidized training for IT specialists in private schools of Kazakhstan.',
  'education.card4.subtitle': 'Our TechOrda courses:',
  'button.learnMore': 'Learn more',
  'button.read': 'Explore',
  'button.schoolPage': 'Go to School Page',
  'education.stats1': 'graduates in the first year',
  'education.stats2': 'corporate clients',
  'education.stats3': 'placements in the first year',
  'news.item1.date': '1 October 2025',
  'news.item1.title': 'Blockchain & Fintech Lab Opening',
  'news.item1.text': 'We invite students to the grand opening of the Blockchain & Fintech Lab at Nazarbayev University',
  'news.item2.date': '10 October 2025',
  'news.item2.title': 'First Blockchain Lab Hackathon',
  'news.item2.text': 'Join the hackathon to build blockchain solutions for education.',
  'news.item3.date': '5 October 2025',
  'news.item3.title': 'First Course Launch',
  'news.item3.text': 'Enrollment opens for the first course on blockchain technologies.',
});

Object.assign(translations.kz, {
  'team.member1.name': 'Сериков Сырым',
  'team.member1.role': 'Зертхана Төрағасы<br><strong>CEO JASAIM</strong>',
  'team.member2.name': 'Сейтқадыров Алихан',
  'team.member2.role': 'Төраға орынбасары<br><strong>CTO JASAIM</strong>',
  'team.member3.name': 'Проф. Adnan Yazici',
  'team.member3.role': 'Зерттеулер жетекшісі<br><strong>School of Engineering and Digital Sciences</strong>',
  'education.card1.title': 'Кәсіби курстар',
  'education.card1.text': 'Блокчейн, ЖИ және Блокчейн криминалистикасы бағыттары бойынша жеке және компанияларға арналған B2B/B2C бағдарламалар',
  'education.card1.li1': 'Блокчейн-даму',
  'education.card1.li2': 'Блокчейндегі ЖИ',
  'education.card1.li3': 'Блокчейн криминалистикасы',
  'education.card1.li4': 'Криптоэкономика',
  'education.card2.title': 'Мастер-кластар',
  'education.card2.text': 'Блокчейн, ФинТех және Криминалистика бағыттарындағы практикалық воркшоптар мен хакатондар',
  'education.card2.li1': 'dApps әзірлеу',
  'education.card2.li2': 'Смарт-келісімшарт аудиті',
  'education.card2.li3': 'DAO басқару',
  'education.card2.li4': 'FinTech шешімдер',
  'education.card3.title': 'НУ электив курсы',
  'education.card3.text': 'SEDS факультетімен бірлесіп әзірленген курс. 2026 көктемінде іске қосу жоспарланған',
  'education.card3.li1': 'Блокчейн негіздері',
  'education.card3.li2': 'Криптография және қауіпсіздік',
  'education.card3.li3': 'Смарт-келісімшарттар және DeFi',
  'education.card3.li4': 'Практикалық жобалар',
  'education.card4.title': 'TechOrda',
  'education.card4.text': 'IT саласындағы адами капиталды дамыту бағдарламасы. Қазақстандағы жеке мектептерде IT мамандарын дайындауға субсидия береді.',
  'education.card4.subtitle': 'Біздің TechOrda курстары:',
  'button.learnMore': 'Толығырақ білу',
  'button.read': 'Танысу',
  'button.schoolPage': 'Мектеп бетіне өту',
  'education.stats1': 'алғашқы жылы түлек',
  'education.stats2': 'корпоративтік клиент',
  'education.stats3': 'алғашқы жылы жұмысқа орналасу',
  'news.item1.date': '2025 ж. 1 қазан',
  'news.item1.title': 'Blockchain & Fintech Lab ашылуы',
  'news.item1.text': 'Назарбаев Университетіндегі Blockchain & Fintech Lab ашылуына шақырамыз',
  'news.item2.date': '2025 ж. 10 қазан',
  'news.item2.title': 'Алғашқы Blockchain Lab хакатоны',
  'news.item2.text': 'Білім беру үшін блокчейн-шешімдерді әзірлеу хакатонына қосылыңыз.',
  'news.item3.date': '2025 ж. 5 қазан',
  'news.item3.title': 'Алғашқы курс іске қосылуы',
  'news.item3.text': 'Блокчейн технологиялары бойынша алғашқы курсқа тіркелу ашылды.',
});
