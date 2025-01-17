const destinations = [
  {
    id: 1,
    name: "Antalya, Turkey",
    image: require("../../assets/images/antalya.jpeg"),
    description: "Antalya is a holiday paradise...",
    museums: [
      {
        id: "1",
        title: "Arkeoloji Müzesi",
        image: require("../../assets/images/arkeoloji_muzesi.jpg"),
      },
      {
        id: "2",
        title: "Side Sualtı Müzesi",
        image: require("../../assets/images/side_sualti_muzesi.jpg"),
      },
      {
        id: "3",
        title: "Alanya Kalesi",
        image: require("../../assets/images/alanya_kalesi.jpg"),
      },
    ],
    natureHighlights: [
      {
        id: "1",
        title: "Düden Şelalesi",
        image: require("../../assets/images/duden_selalesi.jpg"),
      },
      {
        id: "2",
        title: "Kekova Adası",
        image: require("../../assets/images/kekova_adasi.jpg"),
      },
      {
        id: "3",
        title: "Karain Mağarası",
        image: require("../../assets/images/karain_magarasi.jpg"),
      },
      {
        id: "4",
        title: "Göynük Kanyonu",
        image: require("../../assets/images/goynuk_kanyonu.jpg"),
      },
    ],
    hotels: [
      {
        id: "1",
        name: "Falcon Hotel",
        image: require("../../assets/images/falcon_hotel.jpg"),
        rating: 4.3,
        comments: 21280,
      },
      {
        id: "2",
        name: "Granada Luxury Belek",
        image: require("../../assets/images/granada_luxury_belek.jpg"),
        rating: 2.5,
        comments: 10456,
      },
    ],
    foods: [
      "Frigya Biber Dolması",
      "Bergamot Reçeli",
      "Antalya Piyazı",
      "Enginarlı Girit Kebabı",
    ],
    restaurants: [
      {
        id: "1",
        name: "Seraser Fine Dining Restaurant",
        image: require("../../assets/images/seraser_restaurant.jpg"),
        rating: 3.0,
        comments: 15879,
      },
    ],
    activities: [
      {
        id: "1",
        title: "Tazı Kanyonu'nda zipline",
        image: require("../../assets/images/tazi_kanyonu.jpg"),
      },
      {
        id: "2",
        title: "Köprülü Kanyon'da rafting",
        image: require("../../assets/images/koprulu_kanyon.jpg"),
      },
      {
        id: "3",
        title: "Alanya'da tekne turları",
        image: require("../../assets/images/alanya_tekne_turu.jpg"),
      },
    ],
  },
  {
    id: 2,
    name: "İstanbul, Turkey",
    image: require("../../assets/images/istanbul.jpeg"),
    description: "Istanbul is the heart of Turkey...",
    museums: [
      {
        id: "4",
        title: "İstanbul Modern",
        image: require("../../assets/images/istanbul_modern.jpeg"),
      },
      {
        id: "5",
        title: "Topkapı Sarayı",
        image: require("../../assets/images/topkapi_sarayi.jpeg"),
      },
    ],
    natureHighlights: [
      {
        id: "1",
        title: "Belgrad Ormanı",
        image: require("../../assets/images/belgrad_ormani.jpeg"),
      },
      {
        id: "2",
        title: "Emirgan Korusu",
        image: require("../../assets/images/emirgan_korusu.jpeg"),
      },
    ],
    hotels: [
      {
        id: "3",
        name: "Pera Palace Hotel",
        image: require("../../assets/images/pera_palace_hotel.jpeg"),
        rating: 4.7,
        comments: 8590,
      },
      {
        id: "4",
        name: "Ciragan Palace Kempinski",
        image: require("../../assets/images/ciragan_palace.jpeg"),
        rating: 4.8,
        comments: 12845,
      },
    ],
    foods: ["Kebap", "Simit", "Baklava", "Dolma"],
    restaurants: [
      {
        id: "2",
        name: "Nusr-Et Steakhouse",
        image: require("../../assets/images/nusr_et.jpeg"),
        rating: 4.5,
        comments: 24589,
      },
    ],
    activities: [
      {
        id: "4",
        title: "Boğaz'da tekne turu",
        image: require("../../assets/images/bogaz_tekne_turu.jpeg"),
      },
      {
        id: "5",
        title: "Tarihi Yarımada'da yürüyüş",
        image: require("../../assets/images/tarihi_yarimada.jpeg"),
      },
    ],
  },
  {
    id: 3,
    name: "Muğla, Turkey",
    image: require("../../assets/images/mugla.jpeg"), // Yeni görsel
    description: "Muğla is a perfect blend of history and nature...",
    museums: [
      {
        id: "6",
        title: "Bodrum Deniz Müzesi",
        image: require("../../assets/images/bodrum_deniz_muzesi.jpeg"),
      },
      {
        id: "7",
        title: "Knidos Antik Kenti",
        image: require("../../assets/images/knidos_antik_kenti.jpeg"),
      },
    ],
    natureHighlights: [
      {
        id: "1",
        title: "Ölüdeniz",
        image: require("../../assets/images/oludeniz.jpeg"),
      },
      {
        id: "2",
        title: "Saklıkent Kanyonu",
        image: require("../../assets/images/saklikent_kanyonu.jpeg"),
      },
    ],
    hotels: [
      {
        id: "5",
        name: "Hilton Bodrum",
        image: require("../../assets/images/hilton_bodrum.jpeg"),
        rating: 4.9,
        comments: 14236,
      },
    ],
    foods: ["Çökertme Kebabı", "Sarıyer Böreği", "Lokum"],
    restaurants: [
      {
        id: "3",
        name: "Mekan Bodrum",
        image: require("../../assets/images/mekan_bodrum.jpeg"),
        rating: 4.6,
        comments: 3201,
      },
      {
        id: "4",
        name: "Deniz Restaurant",
        image: require("../../assets/images/deniz_restaurant.jpeg"),
        rating: 4.8,
        comments: 4215,
      },
    ],

    activities: [
      {
        id: "5",
        title: "Ölüdeniz'de paraşütle atlama",
        image: require("../../assets/images/oludeniz_parasut.jpeg"),
      },
      {
        id: "6",
        title: "Datça sahillerinde dalış",
        image: require("../../assets/images/datca_dalis.jpeg"),
      },
    ],
  },

  {
    id: 4,
    name: "İzmir, Turkey",
    image: require("../../assets/images/izmir.jpg"), // İzmir için uygun bir görsel ekleyin
    description:
      "İzmir is a beautiful coastal city with rich history and culture...",
    museums: [
      {
        id: "8",
        title: "İzmir Arkeoloji Müzesi",
        image: require("../../assets/images/izmir_arkeoloji_muzesi.jpeg"),
      },
      {
        id: "9",
        title: "Efes Antik Kenti",
        image: require("../../assets/images/efes_antik_kenti.jpeg"),
      },
    ],
    natureHighlights: [
      {
        id: "1",
        title: "Çeşme Plajları",
        image: require("../../assets/images/cesme_plajlari.jpeg"),
      },
      {
        id: "2",
        title: "Karagöl Tabiat Parkı",
        image: require("../../assets/images/karagol_tabiat_parki.jpeg"),
      },
    ],
    hotels: [
      {
        id: "6",
        name: "Swissotel Büyük Efes",
        image: require("../../assets/images/swissotel_buyuk_efes.jpeg"),
        rating: 4.8,
        comments: 11234,
      },
      {
        id: "7",
        name: "Hilton İzmir",
        image: require("../../assets/images/hilton_izmir.jpeg"),
        rating: 4.5,
        comments: 9876,
      },
    ],
    foods: ["Boyoz", "İzmir Kumrusu", "Lokma Tatlısı", "Midye Dolma"],
    restaurants: [
      {
        id: "3",
        name: "Tarihi Asansör Restoran",
        image: require("../../assets/images/tarihi_asansor_restoran.jpeg"),
        rating: 4.3,
        comments: 14567,
      },
    ],
    activities: [
      {
        id: "7",
        title: "Kordon'da yürüyüş",
        image: require("../../assets/images/kordon_yuruyus.jpeg"),
      },
      {
        id: "8",
        title: "Saat Kulesi'ni ziyaret",
        image: require("../../assets/images/saat_kulesi.jpeg"),
      },
    ],
  },
];

export default destinations;
