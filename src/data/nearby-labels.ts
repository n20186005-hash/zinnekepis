import type { Locale } from '@/i18n/routing';
import type { Access, Area } from './nearby';

type Labels = {
  title: string;
  areas: Record<Area, string>;
  back: string;
  home: string;
  manager: string;
  unknown: string;
  source: string;
  address: string;
  highlights: string;
  history: string;
  visit: string;
  photo: string;
  placeholder: string;
  thumbnail: string;
  route: string;
  walk: string;
  transit: string;
  map: string;
  region: string;
  faq: string;
  access: string;
  accessAnswers: Record<Access, string>;
  combine: string;
  nearby: string;
  checked: string;
};

export const labels: Record<Locale, Labels> = {
  en: {
    title: 'Places to visit near Zinneke Pis', areas: {west: 'Saint-Géry and Sainte-Catherine', centre: 'Grand Place and the lower town', upper: 'Mont des Arts and the royal quarter', marolles: 'Sablon and the Marolles'},
    back: 'All nearby places', home: 'Zinneke Pis visitor guide', manager: 'Who manages this place?', unknown: 'Management body to be verified', source: 'Official visitor information', address: 'Address',
    highlights: 'What to look for', history: 'History', visit: 'Plan your visit', photo: 'Photo tips', placeholder: 'Site photograph pending', thumbnail: 'Resized for display', route: 'Walking and public transport',
    walk: 'Walking directions from Het Zinneke', transit: 'Plan your trip with STIB–MIVB', map: 'Map of this place', region: 'Brussels-Capital Region map', faq: 'Frequently asked questions',
    access: 'Do I need to arrange entry in advance?', accessAnswers: {outdoors: 'This guide describes what you can see from public space. Follow any local barriers or event diversions.', venue: 'Check the venue’s current opening and booking information before setting out.', worship: 'Check the church’s visitor information before entering. Services and ceremonies take priority.', mixed: 'You can see the exterior from public space. Use the operator’s information to plan any interior visit.'},
    combine: 'What can I visit nearby?', nearby: 'Continue exploring Brussels', checked: 'Sources checked',
  },
  fr: {
    title: 'Que voir près de Zinneke Pis ?', areas: {west: 'Saint-Géry et Sainte-Catherine', centre: 'Grand-Place et bas de la ville', upper: 'Mont des Arts et quartier royal', marolles: 'Sablon et Marolles'},
    back: 'Tous les lieux à proximité', home: 'Guide de Zinneke Pis', manager: 'Gestion du lieu', unknown: 'Gestionnaire à vérifier', source: 'Informations officielles', address: 'Adresse',
    highlights: 'À observer', history: 'Histoire', visit: 'Préparer la visite', photo: 'Conseils photo', placeholder: 'Photo du lieu à ajouter', thumbnail: 'Image redimensionnée', route: 'À pied et en transports en commun',
    walk: 'Itinéraire à pied depuis Het Zinneke', transit: 'Préparer le trajet avec la STIB', map: 'Carte du lieu', region: 'Carte de la Région de Bruxelles-Capitale', faq: 'Questions fréquentes',
    access: 'Faut-il préparer son entrée ?', accessAnswers: {outdoors: 'La visite décrite se fait depuis l’espace public. Suivez les déviations et barrières éventuelles.', venue: 'Avant de partir, vérifiez les horaires et les conditions de réservation auprès du lieu.', worship: 'Consultez les informations de visite. Les offices et les cérémonies restent prioritaires.', mixed: 'L’extérieur se voit depuis l’espace public. Pour entrer, consultez les informations du gestionnaire.'},
    combine: 'Que voir à proximité ?', nearby: 'Poursuivre la visite de Bruxelles', checked: 'Sources consultées le',
  },
  nl: {
    title: 'Bezienswaardigheden rond Zinneke Pis', areas: {west: 'Sint-Goriks en Sint-Katelijne', centre: 'Grote Markt en benedenstad', upper: 'Kunstberg en Koninklijke Wijk', marolles: 'Zavel en Marollen'},
    back: 'Alle plekken in de buurt', home: 'Bezoekersgids Zinneke Pis', manager: 'Wie beheert deze plek?', unknown: 'Beheerder nog te verifiëren', source: 'Officiële bezoekersinformatie', address: 'Adres',
    highlights: 'Waarop letten', history: 'Geschiedenis', visit: 'Je bezoek plannen', photo: 'Fototips', placeholder: 'Foto van deze plek volgt', thumbnail: 'Verkleind voor weergave', route: 'Te voet en met het openbaar vervoer',
    walk: 'Wandelroute vanaf Het Zinneke', transit: 'Plan je rit bij de MIVB', map: 'Kaart van deze plek', region: 'Kaart van het Brussels Hoofdstedelijk Gewest', faq: 'Veelgestelde vragen',
    access: 'Moet ik mijn bezoek vooraf regelen?', accessAnswers: {outdoors: 'Deze gids beschrijft wat je vanuit de openbare ruimte ziet. Volg eventuele afzettingen en omleidingen.', venue: 'Controleer vooraf de actuele openingstijden en reserveringsvoorwaarden bij de locatie.', worship: 'Controleer de bezoekinformatie van de kerk. Diensten en ceremonies krijgen voorrang.', mixed: 'De buitenkant zie je vanuit de openbare ruimte. Raadpleeg de beheerder voor een bezoek binnen.'},
    combine: 'Wat kan ik in de buurt bezoeken?', nearby: 'Ontdek meer van Brussel', checked: 'Bronnen geraadpleegd op',
  },
  zh: {
    title: '布鲁塞尔撒尿小狗雕像周边景点', areas: {west: '圣热里与圣凯瑟琳街区', centre: '大广场与老城下城区', upper: '艺术山与皇家街区', marolles: '萨布隆与马罗勒街区'},
    back: '全部周边景点', home: '撒尿小狗雕像游览指南', manager: '管理方', unknown: '管理方待核实', source: '官方游览资料', address: '地址',
    highlights: '现场看点', history: '历史', visit: '游览建议', photo: '拍照建议', placeholder: '实景待补', thumbnail: '缩放展示', route: '步行和公共交通',
    walk: '查看从撒尿小狗雕像出发的步行路线', transit: '用 STIB–MIVB 查询公共交通', map: '景点地图', region: '布鲁塞尔首都大区地图', faq: '常见问题',
    access: '参观前需要预约吗？', accessAnswers: {outdoors: '本指南介绍从公共空间可见的部分。遇到围栏或活动改道时，请按现场指引通行。', venue: '出发前请向场馆核对开放时间和预约要求。', worship: '进入教堂前请查阅参观说明。礼拜与仪式优先。', mixed: '外观可从公共空间观看。计划入内时，请查询管理方发布的参观信息。'},
    combine: '可以和附近哪些景点一起游览？', nearby: '继续探索布鲁塞尔', checked: '资料查阅日期',
  },
};
