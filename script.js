// Blockchain Lab Website JavaScript

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const langButtons = document.querySelectorAll('.lang-btn');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

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
        'hero.btn1': 'Узнать о проектах',
        'hero.btn2': 'Партнерство',
        'hero.btn3': 'Записаться на курс',
        
        // About Section
        'about.title': 'О лаборатории',
        'about.subtitle': 'Первая в Казахстане и СНГ университетская блокчейн-лаборатория',
        'about.mission': 'Наша миссия',
        'about.mission.text': 'Разработка KazSmartChain — национальной приватной блокчейн-инфраструктуры для повышения прозрачности, цифрового суверенитета и защиты данных госорганов и вузов.',
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
        'contact.form': 'Обратная связь',
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
        'hero.btn1': 'Learn about projects',
        'hero.btn2': 'Partnership',
        'hero.btn3': 'Enroll in course',
        
        // About Section
        'about.title': 'About the Laboratory',
        'about.subtitle': 'First university blockchain laboratory in Kazakhstan and CIS',
        'about.mission': 'Our Mission',
        'about.mission.text': 'Development of KazSmartChain — national private blockchain infrastructure to enhance transparency, digital sovereignty and data protection for government agencies and universities.',
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
        'contact.form': 'Contact Form',
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
        'hero.btn1': 'Жобалар туралы білу',
        'hero.btn2': 'Серіктестік',
        'hero.btn3': 'Курсқа жазылу',
        
        // About Section
        'about.title': 'Зертхана туралы',
        'about.subtitle': 'Қазақстан мен ТМД-дағы алғашқы университет блокчейн-зертханасы',
        'about.mission': 'Біздің миссия',
        'about.mission.text': 'KazSmartChain дамыту — мемлекеттік органдар мен университеттердің мәліметтерін қорғау, цифрлық егемендікті және мемлекеттік органдар мен университеттердің мәліметтерін қорғау үшін ұлттық жеке блокчейн-инфрақұрылымын дамыту.',
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
        'contact.form': 'Кері байланыс',
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
        'education.gallery.item2.title': 'Мастер-класстар',
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

// Navbar scroll effect
// Отключено: всегда темная шапка с glow
// window.addEventListener('scroll', () => {
//     const navbar = document.querySelector('.navbar');
//     if (window.scrollY > 100) {
//         navbar.style.background = 'rgba(255, 255, 255, 0.98)';
//         navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
//     } else {
//         navbar.style.background = 'rgba(255, 255, 255, 0.95)';
//         navbar.style.boxShadow = 'none';
//     }
// });

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

// Mobile menu close on outside click
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
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
    }, 5000);
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
