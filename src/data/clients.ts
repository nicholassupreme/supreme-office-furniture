// Clients shown on the homepage logo wall.
// `src` is a file in /public/clients or a remote logo URL (Wikipedia / the company's own site).
// `onDark`: the only available logo is white-on-transparent, so it is shown as a dark silhouette.
export type Client = { name: string; logo: { src: string; w: number; h: number; onDark?: boolean } };

export const clients: Client[] = [
  {
    "name": "RHB Bank",
    "logo": {
      "src": "/clients/rhb.svg",
      "w": 144,
      "h": 52
    }
  },
  {
    "name": "Bank Negara Malaysia",
    "logo": {
      "src": "/clients/bank-negara.png",
      "w": 88,
      "h": 108
    }
  },
  {
    "name": "Universiti Malaya",
    "logo": {
      "src": "/clients/universiti-malaya.png",
      "w": 157,
      "h": 46
    }
  },
  {
    "name": "Concentrix",
    "logo": {
      "src": "/clients/concentrix.png",
      "w": 294,
      "h": 51
    }
  },
  {
    "name": "Universiti Tunku Abdul Rahman (UTAR)",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/en/f/f1/Universiti_Tunku_Abdul_Rahman_Logo.jpg",
      "w": 338,
      "h": 170
    }
  },
  {
    "name": "Top Glove Corporation",
    "logo": {
      "src": "/clients/top-glove.png",
      "w": 106,
      "h": 115
    }
  },
  {
    "name": "Sime Darby",
    "logo": {
      "src": "/clients/sime-darby.png",
      "w": 101,
      "h": 98
    }
  },
  {
    "name": "Parker Hannifin",
    "logo": {
      "src": "/clients/parker.png",
      "w": 478,
      "h": 185
    }
  },
  {
    "name": "Northport (M) Berhad",
    "logo": {
      "src": "/clients/northport.png",
      "w": 93,
      "h": 108
    }
  },
  {
    "name": "MMC Gamuda KVMRT (T)",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/9/9b/MMC-Gamuda_Logo.svg",
      "w": 1702,
      "h": 250
    }
  },
  {
    "name": "Kumpulan Wang Simpanan Pekerja (KWSP)",
    "logo": {
      "src": "/clients/kwsp.png",
      "w": 118,
      "h": 115
    }
  },
  {
    "name": "Sime Industrial",
    "logo": {
      "src": "/clients/sime-industrial.png",
      "w": 573,
      "h": 240
    }
  },
  {
    "name": "SME Bank",
    "logo": {
      "src": "/clients/sme-bank.png",
      "w": 600,
      "h": 218
    }
  },
  {
    "name": "FELDA / FGV",
    "logo": {
      "src": "/clients/felda.png",
      "w": 104,
      "h": 104
    }
  },
  {
    "name": "EcoWorld Foundation",
    "logo": {
      "src": "https://ecoworld.my/wp-content/themes/ecoworld-2021/img/logo-2.svg",
      "w": 250,
      "h": 59
    }
  },
  {
    "name": "Nord-Lock Group",
    "logo": {
      "src": "/clients/nord-lock.png",
      "w": 600,
      "h": 149
    }
  },
  {
    "name": "Tenaga Nasional Berhad",
    "logo": {
      "src": "/clients/tnb.png",
      "w": 156,
      "h": 66
    }
  },
  {
    "name": "Malaysia Airlines",
    "logo": {
      "src": "/clients/malaysia-airlines.png",
      "w": 146,
      "h": 33
    }
  },
  {
    "name": "MISC Berhad",
    "logo": {
      "src": "/clients/misc.png",
      "w": 143,
      "h": 53
    }
  },
  {
    "name": "Taylor's University",
    "logo": {
      "src": "/clients/taylors.png",
      "w": 537,
      "h": 200
    }
  },
  {
    "name": "DRB-HICOM",
    "logo": {
      "src": "/clients/drb-hicom.png",
      "w": 159,
      "h": 39
    }
  },
  {
    "name": "UEM Land",
    "logo": {
      "src": "/clients/uem-land.png",
      "w": 158,
      "h": 87
    }
  },
  {
    "name": "UEM Sunrise",
    "logo": {
      "src": "/clients/uem-sunrise.png",
      "w": 157,
      "h": 86
    }
  },
  {
    "name": "Sunway University",
    "logo": {
      "src": "/clients/sunway-university.png",
      "w": 595,
      "h": 240
    }
  },
  {
    "name": "Shell Malaysia",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/en/e/e8/Shell_logo.svg",
      "w": 150,
      "h": 139
    }
  },
  {
    "name": "Bank Pembangunan Malaysia",
    "logo": {
      "src": "/clients/bpmb.png",
      "w": 153,
      "h": 57
    }
  },
  {
    "name": "Agrobank",
    "logo": {
      "src": "/clients/agrobank.png",
      "w": 155,
      "h": 55
    }
  },
  {
    "name": "Sunway Group",
    "logo": {
      "src": "/clients/sunway.png",
      "w": 600,
      "h": 93
    }
  },
  {
    "name": "The New Straits Times Press",
    "logo": {
      "src": "/clients/nst.png",
      "w": 159,
      "h": 42
    }
  },
  {
    "name": "Econsave Cash & Carry",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/8/83/Econsave_logo.png",
      "w": 457,
      "h": 100
    }
  },
  {
    "name": "TGV Cinemas",
    "logo": {
      "src": "/clients/tgv.png",
      "w": 157,
      "h": 61
    }
  },
  {
    "name": "HeiTech Padu",
    "logo": {
      "src": "/clients/heitech.png",
      "w": 97,
      "h": 115
    }
  },
  {
    "name": "TH Plantations",
    "logo": {
      "src": "/clients/th-plantations.png",
      "w": 144,
      "h": 87
    }
  },
  {
    "name": "Mycron Steel",
    "logo": {
      "src": "https://mycronsteel.com/assets/images/mycron-logo-1.png",
      "w": 850,
      "h": 234
    }
  },
  {
    "name": "Universiti Putra Malaysia",
    "logo": {
      "src": "/clients/upm.png",
      "w": 159,
      "h": 75
    }
  },
  {
    "name": "Multimedia University",
    "logo": {
      "src": "/clients/mmu.png",
      "w": 158,
      "h": 42
    }
  },
  {
    "name": "SIRIM Berhad",
    "logo": {
      "src": "/clients/sirim.png",
      "w": 86,
      "h": 106
    }
  },
  {
    "name": "Harvey Norman",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/en/8/83/Harvey-norman-brand.svg",
      "w": 440,
      "h": 74
    }
  },
  {
    "name": "SYABAS",
    "logo": {
      "src": "/clients/syabas.png",
      "w": 100,
      "h": 117
    }
  },
  {
    "name": "Tourism Selangor",
    "logo": {
      "src": "/clients/tourism-selangor.png",
      "w": 136,
      "h": 38
    }
  },
  {
    "name": "Kementerian Kewangan Malaysia",
    "logo": {
      "src": "/clients/mof.png",
      "w": 159,
      "h": 88
    }
  },
  {
    "name": "SP Setia Berhad",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/6/69/SPsetialogo.png",
      "w": 584,
      "h": 203
    }
  },
  {
    "name": "Perbadanan Putrajaya",
    "logo": {
      "src": "/clients/putrajaya.png",
      "w": 92,
      "h": 118
    }
  },
  {
    "name": "Jabatan Perdana Menteri",
    "logo": {
      "src": "/clients/jpm.png",
      "w": 124,
      "h": 92
    }
  },
  {
    "name": "Jabatan Perkhidmatan Awam",
    "logo": {
      "src": "/clients/jpa.png",
      "w": 96,
      "h": 115
    }
  },
  {
    "name": "POSCO Malaysia",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/0/05/POSCO_logo.svg",
      "w": 1024,
      "h": 277
    }
  },
  {
    "name": "Jabatan Akauntan Negara",
    "logo": {
      "src": "/clients/anm.png",
      "w": 118,
      "h": 110
    }
  },
  {
    "name": "Jabatan Kerja Raya",
    "logo": {
      "src": "/clients/jkr.png",
      "w": 154,
      "h": 113
    }
  },
  {
    "name": "Jabatan Kastam Diraja Malaysia",
    "logo": {
      "src": "/clients/kastam.png",
      "w": 143,
      "h": 116
    }
  },
  {
    "name": "NTT MSC",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/e/e2/NTT_Data_2025.svg",
      "w": 160,
      "h": 33
    }
  },
  {
    "name": "Jabatan Imigresen",
    "logo": {
      "src": "/clients/imigresen.png",
      "w": 102,
      "h": 111
    }
  },
  {
    "name": "Jabatan Pendaftaran Negara",
    "logo": {
      "src": "/clients/jpn.png",
      "w": 125,
      "h": 116
    }
  },
  {
    "name": "Jabatan Pengangkutan Jalan",
    "logo": {
      "src": "/clients/jpj.png",
      "w": 111,
      "h": 112
    }
  },
  {
    "name": "Berjaya Roasters (Kenny Rogers Roasters)",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/en/5/57/Logo_for_Kenny_Rogers_Roasters.jpg",
      "w": 230,
      "h": 121
    }
  },
  {
    "name": "Polis Diraja Malaysia",
    "logo": {
      "src": "/clients/pdrm.png",
      "w": 105,
      "h": 114
    }
  },
  {
    "name": "Jabatan Bomba dan Penyelamat",
    "logo": {
      "src": "/clients/bomba.png",
      "w": 91,
      "h": 113
    }
  },
  {
    "name": "Jabatan Ketenteraan Awam",
    "logo": {
      "src": "/clients/atm.png",
      "w": 109,
      "h": 113
    }
  },
  {
    "name": "Ahmad Zaki Resources (AZRB)",
    "logo": {
      "src": "https://static.wixstatic.com/media/bc4239_68175b5fbe5d40758d073f8ebc65e46a~mv2.jpg/v1/fit/w_480,h_176,q_90/azrb.jpg",
      "w": 3509,
      "h": 1287
    }
  },
  {
    "name": "Suruhanjaya Pilihan Raya",
    "logo": {
      "src": "/clients/spr.png",
      "w": 96,
      "h": 115
    }
  },
  {
    "name": "Radio Televisyen Malaysia",
    "logo": {
      "src": "/clients/rtm.png",
      "w": 159,
      "h": 65
    }
  },
  {
    "name": "Jabatan Peguam Negara",
    "logo": {
      "src": "/clients/peguam-negara.png",
      "w": 70,
      "h": 115
    }
  },
  {
    "name": "Delloyd Industries",
    "logo": {
      "src": "https://delloyd.com/wp-content/uploads/2023/10/Logo-01.png",
      "w": 658,
      "h": 225,
      "onDark": true
    }
  },
  {
    "name": "Jabatan Perangkaan Malaysia (DOSM)",
    "logo": {
      "src": "/clients/dosm.png",
      "w": 431,
      "h": 228
    }
  },
  {
    "name": "Jabatan Meteorologi Malaysia",
    "logo": {
      "src": "/clients/metmalaysia.png",
      "w": 153,
      "h": 73
    }
  },
  {
    "name": "Jabatan Alam Sekitar",
    "logo": {
      "src": "/clients/jas.png",
      "w": 107,
      "h": 117
    }
  },
  {
    "name": "Tanjong",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Tanjong_Logo.svg",
      "w": 284,
      "h": 87
    }
  },
  {
    "name": "Jabatan Pengairan dan Saliran",
    "logo": {
      "src": "/clients/jps.png",
      "w": 155,
      "h": 82
    }
  },
  {
    "name": "Jabatan Kimia Malaysia",
    "logo": {
      "src": "/clients/kimia.png",
      "w": 144,
      "h": 78
    }
  },
  {
    "name": "Jabatan Ukur dan Pemetaan",
    "logo": {
      "src": "/clients/jupem.png",
      "w": 122,
      "h": 114
    }
  },
  {
    "name": "Jabatan Perancangan Bandar dan Desa",
    "logo": {
      "src": "/clients/planmalaysia.png",
      "w": 118,
      "h": 118
    }
  },
  {
    "name": "Jabatan Tenaga Manusia",
    "logo": {
      "src": "/clients/jtm.png",
      "w": 142,
      "h": 101
    }
  },
  {
    "name": "Jabatan Pembangunan Wanita",
    "logo": {
      "src": "/clients/jpw.png",
      "w": 136,
      "h": 124
    }
  },
  {
    "name": "Pokka Ace",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Pokka_logo.png",
      "w": 300,
      "h": 87
    }
  },
  {
    "name": "Jabatan Latihan Khidmat Negara",
    "logo": {
      "src": "/clients/khidmat-negara.png",
      "w": 83,
      "h": 113
    }
  },
  {
    "name": "Jabatan Perikanan Malaysia",
    "logo": {
      "src": "/clients/perikanan.png",
      "w": 160,
      "h": 71
    }
  },
  {
    "name": "FAMA",
    "logo": {
      "src": "/clients/fama.png",
      "w": 68,
      "h": 102
    }
  },
  {
    "name": "Lembaga Pertubuhan Peladang",
    "logo": {
      "src": "/clients/peladang.png",
      "w": 139,
      "h": 120
    }
  },
  {
    "name": "Institut Kraf Negara",
    "logo": {
      "src": "/clients/kraftangan.png",
      "w": 66,
      "h": 97
    }
  },
  {
    "name": "Dewan Bahasa dan Pustaka",
    "logo": {
      "src": "/clients/dbp.png",
      "w": 159,
      "h": 82
    }
  },
  {
    "name": "Perpustakaan Negara Malaysia",
    "logo": {
      "src": "/clients/pnm.png",
      "w": 112,
      "h": 117
    }
  },
  {
    "name": "Yayasan Kebajikan Negara",
    "logo": {
      "src": "/clients/ykn.png",
      "w": 112,
      "h": 113
    }
  },
  {
    "name": "Dewan Bandaraya Kuala Lumpur",
    "logo": {
      "src": "/clients/dbkl.png",
      "w": 93,
      "h": 115
    }
  },
  {
    "name": "Malaysia Bible Seminary",
    "logo": {
      "src": "https://ed.mbs.org.my/wp-content/uploads/2021/06/mbs.logo_.web2_.png",
      "w": 265,
      "h": 201
    }
  },
  {
    "name": "Majlis Bandaraya Petaling Jaya",
    "logo": {
      "src": "/clients/mbpj.png",
      "w": 102,
      "h": 115
    }
  },
  {
    "name": "Majlis Perbandaran Klang",
    "logo": {
      "src": "/clients/mp-klang.png",
      "w": 102,
      "h": 110
    }
  },
  {
    "name": "Majlis Agama Islam Selangor",
    "logo": {
      "src": "/clients/mais.png",
      "w": 75,
      "h": 116
    }
  },
  {
    "name": "Methodist Church in Malaysia",
    "logo": {
      "src": "https://upload.wikimedia.org/wikipedia/en/6/68/Methodist_malaysia.png",
      "w": 98,
      "h": 95
    }
  },
  {
    "name": "Jabatan Mufti Negeri Selangor",
    "logo": {
      "src": "/clients/mufti-selangor.png",
      "w": 99,
      "h": 106
    }
  },
  {
    "name": "Mahkamah Rendah Syariah",
    "logo": {
      "src": "/clients/mahkamah-syariah.png",
      "w": 129,
      "h": 103
    }
  },
  {
    "name": "Pejabat Pendidikan Daerah Klang",
    "logo": {
      "src": "/clients/ppd-klang.png",
      "w": 114,
      "h": 116
    }
  }
];
