export interface Team {
  code: string;
  name: string;
  fc: string;
  grp: string;
  pts: number;
  w: number;
  d: number;
  l: number;
  c1: [number, number, number];
  c2: [number, number, number];
}

export const TEAMS: Team[] = [
  {code:'MEX',name:'Meksika',    fc:'mx',     grp:'A',pts:5,w:1,d:2,l:0,c1:[0,104,71],    c2:[206,17,38]},
  {code:'KOR',name:'G.Kore',     fc:'kr',     grp:'A',pts:4,w:1,d:1,l:1,c1:[255,255,255], c2:[205,46,58]},
  {code:'CZE',name:'Çekya',      fc:'cz',     grp:'A',pts:3,w:1,d:0,l:2,c1:[215,20,26],   c2:[255,255,255]},
  {code:'RSA',name:'G.Afrika',   fc:'za',     grp:'A',pts:1,w:0,d:1,l:2,c1:[0,122,61],    c2:[0,0,0]},
  {code:'CAN',name:'Kanada',     fc:'ca',     grp:'B',pts:7,w:2,d:1,l:0,c1:[220,0,0],     c2:[255,255,255]},
  {code:'SUI',name:'İsviçre',    fc:'ch',     grp:'B',pts:5,w:1,d:2,l:0,c1:[220,0,0],     c2:[255,255,255]},
  {code:'QAT',name:'Katar',      fc:'qa',     grp:'B',pts:3,w:1,d:0,l:2,c1:[128,0,64],    c2:[255,255,255]},
  {code:'BIH',name:'Bosna Hrsk', fc:'ba',     grp:'B',pts:1,w:0,d:1,l:2,c1:[0,0,153],     c2:[255,206,0]},
  {code:'BRA',name:'Brezilya',   fc:'br',     grp:'C',pts:7,w:2,d:1,l:0,c1:[0,156,59],    c2:[254,223,0]},
  {code:'MAR',name:'Fas',        fc:'ma',     grp:'C',pts:5,w:1,d:2,l:0,c1:[198,12,48],   c2:[0,98,51]},
  {code:'SCO',name:'İskoçya',    fc:'gb-sct', grp:'C',pts:3,w:1,d:0,l:2,c1:[0,56,168],   c2:[255,255,255]},
  {code:'HAI',name:'Haiti',      fc:'ht',     grp:'C',pts:0,w:0,d:0,l:3,c1:[0,9,104],     c2:[209,16,35]},
  {code:'USA',name:'ABD',        fc:'us',     grp:'D',pts:6,w:2,d:0,l:1,c1:[60,59,110],   c2:[178,34,52]},
  {code:'AUS',name:'Avustralya', fc:'au',     grp:'D',pts:5,w:1,d:2,l:0,c1:[0,0,139],     c2:[255,255,255]},
  {code:'TUR',name:'Türkiye',    fc:'tr',     grp:'D',pts:4,w:1,d:1,l:1,c1:[227,10,23],   c2:[255,255,255]},
  {code:'PAR',name:'Paraguay',   fc:'py',     grp:'D',pts:1,w:0,d:1,l:2,c1:[214,0,0],     c2:[0,56,168]},
  {code:'GER',name:'Almanya',    fc:'de',     grp:'E',pts:7,w:2,d:1,l:0,c1:[20,20,20],    c2:[221,0,0]},
  {code:'CIV',name:'Fildişi Shl',fc:'ci',     grp:'E',pts:4,w:1,d:1,l:1,c1:[248,120,15],  c2:[0,127,57]},
  {code:'ECU',name:'Ekvador',    fc:'ec',     grp:'E',pts:3,w:1,d:0,l:2,c1:[252,209,22],  c2:[0,56,168]},
  {code:'CUW',name:'Curaçao',    fc:'cw',     grp:'E',pts:1,w:0,d:1,l:2,c1:[0,53,128],    c2:[255,215,0]},
  {code:'NED',name:'Hollanda',   fc:'nl',     grp:'F',pts:7,w:2,d:1,l:0,c1:[174,28,40],   c2:[255,255,255]},
  {code:'JPN',name:'Japonya',    fc:'jp',     grp:'F',pts:6,w:2,d:0,l:1,c1:[255,255,255], c2:[188,0,45]},
  {code:'SWE',name:'İsveç',      fc:'se',     grp:'F',pts:3,w:1,d:0,l:2,c1:[0,106,167],   c2:[254,204,0]},
  {code:'TUN',name:'Tunus',      fc:'tn',     grp:'F',pts:1,w:0,d:1,l:2,c1:[198,12,48],   c2:[255,255,255]},
  {code:'BEL',name:'Belçika',    fc:'be',     grp:'G',pts:7,w:2,d:1,l:0,c1:[20,20,20],    c2:[255,0,0]},
  {code:'EGY',name:'Mısır',      fc:'eg',     grp:'G',pts:5,w:1,d:2,l:0,c1:[198,12,48],   c2:[255,255,255]},
  {code:'IRN',name:'İran',       fc:'ir',     grp:'G',pts:3,w:1,d:0,l:2,c1:[0,134,61],    c2:[198,12,48]},
  {code:'NZL',name:'Y.Zelanda',  fc:'nz',     grp:'G',pts:0,w:0,d:0,l:3,c1:[0,0,102],     c2:[255,255,255]},
  {code:'ESP',name:'İspanya',    fc:'es',     grp:'H',pts:9,w:3,d:0,l:0,c1:[170,21,27],   c2:[241,191,0]},
  {code:'URU',name:'Uruguay',    fc:'uy',     grp:'H',pts:6,w:2,d:0,l:1,c1:[0,56,168],    c2:[255,255,255]},
  {code:'KSA',name:'S.Arabistan',fc:'sa',     grp:'H',pts:3,w:1,d:0,l:2,c1:[0,106,78],    c2:[255,255,255]},
  {code:'CPV',name:'Cabo Verde', fc:'cv',     grp:'H',pts:0,w:0,d:0,l:3,c1:[0,63,135],    c2:[207,30,37]},
  {code:'FRA',name:'Fransa',     fc:'fr',     grp:'I',pts:9,w:3,d:0,l:0,c1:[0,35,149],    c2:[237,65,53]},
  {code:'SEN',name:'Senegal',    fc:'sn',     grp:'I',pts:5,w:1,d:2,l:0,c1:[0,134,61],    c2:[252,209,22]},
  {code:'NOR',name:'Norveç',     fc:'no',     grp:'I',pts:3,w:1,d:0,l:2,c1:[215,0,0],     c2:[255,255,255]},
  {code:'IRQ',name:'Irak',       fc:'iq',     grp:'I',pts:0,w:0,d:0,l:3,c1:[0,122,61],    c2:[198,12,48]},
  {code:'ARG',name:'Arjantin',   fc:'ar',     grp:'J',pts:7,w:2,d:1,l:0,c1:[116,172,223], c2:[255,255,255]},
  {code:'AUT',name:'Avusturya',  fc:'at',     grp:'J',pts:4,w:1,d:1,l:1,c1:[198,12,48],   c2:[255,255,255]},
  {code:'ALG',name:'Cezayir',    fc:'dz',     grp:'J',pts:3,w:1,d:0,l:2,c1:[0,110,0],     c2:[255,255,255]},
  {code:'JOR',name:'Ürdün',      fc:'jo',     grp:'J',pts:1,w:0,d:1,l:2,c1:[20,20,20],    c2:[198,12,48]},
  {code:'POR',name:'Portekiz',   fc:'pt',     grp:'K',pts:7,w:2,d:1,l:0,c1:[0,102,0],     c2:[220,0,0]},
  {code:'COD',name:'K.Kongo',    fc:'cd',     grp:'K',pts:5,w:1,d:2,l:0,c1:[0,98,177],    c2:[220,20,20]},
  {code:'UZB',name:'Özbekistan', fc:'uz',     grp:'K',pts:3,w:1,d:0,l:2,c1:[27,117,55],   c2:[255,255,255]},
  {code:'COL',name:'Kolombiya',  fc:'co',     grp:'K',pts:1,w:0,d:1,l:2,c1:[252,209,22],  c2:[0,56,168]},
  {code:'ENG',name:'İngiltere',  fc:'gb-eng', grp:'L',pts:7,w:2,d:1,l:0,c1:[200,200,220], c2:[207,9,26]},
  {code:'CRO',name:'Hırvatistan',fc:'hr',     grp:'L',pts:5,w:1,d:2,l:0,c1:[220,0,0],     c2:[255,255,255]},
  {code:'GHA',name:'Gana',       fc:'gh',     grp:'L',pts:3,w:1,d:0,l:2,c1:[252,209,22],  c2:[0,0,0]},
  {code:'PAN',name:'Panama',     fc:'pa',     grp:'L',pts:0,w:0,d:0,l:3,c1:[255,255,255], c2:[0,43,127]},
];

export const TOP3_DATA = [
  {team: TEAMS.find(t => t.code === 'JPN')!, pts: 124567},
  {team: TEAMS.find(t => t.code === 'TUR')!, pts: 89432},
  {team: TEAMS.find(t => t.code === 'BRA')!, pts: 67891},
];

export const SORTED_TEAMS = [...TEAMS].sort((a, b) => b.pts - a.pts || b.w - a.w);
