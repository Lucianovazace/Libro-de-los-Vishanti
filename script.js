const listaMedia = [
    // --- ROAD TO DOOMSDAY (ordenado por fecha de estreno) ---
    { titulo: "X-Men (2000)", categoria: "doomsday", tier: 3, tipo: "Película", poster: "https://i.pinimg.com/736x/f9/7c/3f/f97c3f94f67ca6fd6ae7ad0470d6d553.jpg" },
    { titulo: "X2: X-Men United", categoria: "doomsday", tier: 3, tipo: "Película", poster: "https://legacymovieposters.com/cdn/shop/products/x-men2.jpg?v=1668313148" },
    { titulo: "X-Men: The Last Stand", categoria: "doomsday", tier: 3, tipo: "Película", poster: "https://pics.filmaffinity.com/x3_x_men_3_the_last_stand-992099331-large.jpg" },
    { titulo: "X-Men Origins: Wolverine", categoria: "doomsday", tier: 4, tipo: "Película", poster: "https://i.blogs.es/b07389/x_men_origins_wolverine/450_1000.jpg" },
    { titulo: "X-Men: First Class", categoria: "doomsday", tier: 3, tipo: "Película", poster: "https://collider.com/wp-content/uploads/x-men-first-class-teaser-poster.jpg" },
    { titulo: "The Wolverine", categoria: "doomsday", tier: 4, tipo: "Película", poster: "https://www.mubis.es/media/articles/4563/45592/lobezno-inmortal-poster-imagenes-y-adelanto-del-primer-teaser-trailer-original.jpg" },
    { titulo: "X-Men: Days of Future Past", categoria: "doomsday", tier: 3, tipo: "Película", poster: "https://i0.wp.com/www.dorkaholics.com/wp-content/uploads/2014/04/9kcs.jpg?fit=692%2C1024&ssl=1" },
    { titulo: "Deadpool", categoria: "doomsday", tier: 4, tipo: "Película", poster: "https://m.media-amazon.com/images/I/71SBA4bdx8L._AC_UF894,1000_QL80_AIweblab1381794,T1_.jpg" },
    { titulo: "X-Men: Apocalypse", categoria: "doomsday", tier: 4, tipo: "Película", poster: "https://www.scifinow.co.uk/wp-content/uploads/2015/12/xmen_apocalypse_ver2.jpg" },
    { titulo: "Logan", categoria: "doomsday", tier: 1, tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/Logan_2017_teaser_original_film_art_5000x.webp?v=1677273260" },
    { titulo: "Avengers: Infinity War", categoria: "doomsday", tier: 1, tipo: "Película", poster: "https://www.blackfilm.com/read/wp-content/uploads/2017/11/Avengers-Infinity-War-Teaser-Poster.jpg" },
    { titulo: "Deadpool 2", categoria: "doomsday", tier: 4, tipo: "Película", poster: "https://preview.redd.it/new-deadpool-2-poster-v0-878r7e1hmle01.jpg?auto=webp&s=2f03e75ff6a45766bbbf16a95cbe0ecc3d6c7046" },
    { titulo: "Avengers: Endgame", categoria: "doomsday", tier: 1, tipo: "Película", poster: "https://cdn.marvel.com/content/2x/MLou2_Teaser_1-Sht_v6_Lg.jpg" },
    { titulo: "X-Men Dark Phoenix", categoria: "doomsday", tier: 4, tipo: "Película", poster: "https://m.media-amazon.com/images/I/81SP4dCrQyL.jpg" },
    { titulo: "The New Mutants", categoria: "doomsday", tier: 4, tipo: "Película", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5OVOtNIm-bqGtCUI1SICMA58EJGV7_5_y7oDu9Zf27WcV6YdCE64CVQSf&s=10" },
    { titulo: "WandaVision", categoria: "doomsday", tier: 1, tipo: "Serie", poster: "https://picarouno.com/wp-content/uploads/2025/12/wandavision_001-1037x1536.jpg" },
    { titulo: "The Falcon and The Winter Soldier", categoria: "doomsday", tier: 3, tipo: "Serie", poster: "https://www.hellofriki.com/wp-content/uploads/2020/12/falcon-soldado-de-invierno-serie-poste-691x1024.jpg" },
    { titulo: "Loki (Temporada 1)", categoria: "doomsday", tier: 1, tipo: "Serie", poster: "https://m.media-amazon.com/images/I/81fdQ6kl4JS.jpg" },
    { titulo: "Shang-Chi", categoria: "doomsday", tier: 3, tipo: "Película", poster: "https://m.media-amazon.com/images/I/81orh-NSiTL.jpg" },
    { titulo: "Spider-Man: No Way Home", categoria: "doomsday", tier: 2, tipo: "Película", poster: "https://placehold.co/300x450?text=No+Way+Home" },
    { titulo: "Dr. Strange: Multiverse of Madness", categoria: "doomsday", tier: 1, tipo: "Película", poster: "https://img.buzzfeed.com/buzzfeed-static/static/2022-02/18/13/asset/e9954361afcd/sub-buzz-772-1645190837-7.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto" },
    { titulo: "Ms. Marvel", categoria: "doomsday", tier: 3, tipo: "Serie", poster: "https://lumiere-a.akamaihd.net/v1/images/ms_979c8372.jpeg" },
    { titulo: "Thor: Love and Thunder", categoria: "doomsday", tier: 2, tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/fb83262af061c44d518c601e3956c3b4_2764x4096_e4f0eee2.jpeg" },
    { titulo: "Black Panther: Wakanda Forever", categoria: "doomsday", tier: 2, tipo: "Película", poster: "https://artofthemovies.co.uk/cdn/shop/products/IMG_0184-338579.jpg?v=1668148930&width=900" },
    { titulo: "Ant-Man and The Wasp: Quantumania", categoria: "doomsday", tier: 2, tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/antman_b843a521.jpeg?region=0,0,658,898" },
    { titulo: "Guardians of the Galaxy Vol. 3", categoria: "doomsday", tier: 3, tipo: "Película", poster: "https://assets-prd.ignimgs.com/2022/12/01/guardians-of-the-galaxy-vol-3-1669932411159.jfif" },
    { titulo: "Loki (Temporada 2)", categoria: "doomsday", tier: 1, tipo: "Serie", poster: "https://preview.redd.it/official-poster-for-loki-season-2-v0-mjczxxkptafb1.jpg?auto=webp&s=b52be74ed745f4c481074ffd739feb43c7c0214f" },
    { titulo: "The Marvels", categoria: "doomsday", tier: 2, tipo: "Película", poster: "https://placehold.co/300x450?text=The+Marvels" },
    { titulo: "Deadpool & Wolverine", categoria: "doomsday", tier: 1, tipo: "Película", poster: "https://m.media-amazon.com/images/I/61AwaBKmGXL.jpg" },
    { titulo: "Captain America: Brave New World", categoria: "doomsday", tier: 1, tipo: "Película", poster: "https://i.pinimg.com/736x/19/85/1d/19851d768bfcc73a6942ae30c69f03a8.jpg" },
    { titulo: "Thunderbolts*", categoria: "doomsday", tier: 1, tipo: "Película", poster: "https://m.media-amazon.com/images/I/71Y2ZfgT+4L.jpg" },
    { titulo: "The Fantastic Four: First Steps", categoria: "doomsday", tier: 1, tipo: "Película", poster: "https://brainstomping.com/wp-content/uploads/2025/07/fantastic-four-first-steps-primeros-pasos-cuatro-fantasticos-poster-marvel-mcu.jpg" },

    // --- MCU: SAGA DEL INFINITO ---
    { titulo: "Iron Man", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 1, crono: 4, poster: "https://i.pinimg.com/736x/59/51/d8/5951d8c40e27989167c9adb14567fb36.jpg" },
    { titulo: "The Incredible Hulk", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 2, crono: 6, poster: "https://m.media-amazon.com/images/M/MV5BMTUyNzk3MjA1OF5BMl5BanBnXkFtZTcwMTE1Njg2MQ@@._V1_.jpg" },
    { titulo: "Iron Man 2", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 3, crono: 5, poster: "https://m.media-amazon.com/images/I/81W+53+YFkL._AC_SY879_.jpg" },
    { titulo: "Thor", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 4, crono: 7, poster: "https://m.media-amazon.com/images/I/61MQ3JIiXmL.jpg" },
    { titulo: "Captain America: The First Avenger", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 5, crono: 2, poster: "https://m.media-amazon.com/images/I/81U9EbWexxL.jpg" },
    { titulo: "The Avengers", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 6, crono: 8, poster: "https://filmartgallery.com/cdn/shop/products/The-Avengers-Vintage-Movie-Poster-Original_1024x1024.jpg?v=1771946695" },
    { titulo: "Iron Man 3", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 7, crono: 10, poster: "https://collider.com/wp-content/uploads/iron-man-3-poster.jpg" },
    { titulo: "Thor: The Dark World", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 8, crono: 9, poster: "https://shoptrends.com/pub/media/catalog/product/p/o/pod5973-1.jpg" },
    { titulo: "Captain America: The Winter Soldier", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 9, crono: 11, poster: "https://www.hollywoodreporter.com/wp-content/uploads/2014/01/captain_america_the_winter_soldier.jpg" },
    { titulo: "Guardians of The Galaxy", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 10, crono: 12, poster: "https://collider.com/wp-content/uploads/guardians-of-the-galaxy-teaser-poster.jpg" },
    { titulo: "Avengers: Age of Ultron", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 11, crono: 14, poster: "https://collider.com/wp-content/uploads/avengers-age-of-ultron-poster1.jpg" },
    { titulo: "Ant-Man", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 12, crono: 15, poster: "https://m.media-amazon.com/images/I/81rPJLNidFL.jpg" },
    { titulo: "Captain America: Civil War", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 13, crono: 16, poster: "https://heroichollywood.com/wp-content/uploads/2015/11/img-26.jpg" },
    { titulo: "Doctor Strange", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 14, crono: 20, poster: "https://uruloki.org/felipeblog/images2016/20160412-doctorstrange.jpg" },
    { titulo: "Guardians of the Galaxy Vol. 2", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 15, crono: 13, poster: "https://external-preview.redd.it/official-guardians-of-the-galaxy-vol-2-teaser-poster-v0-TjDcWtSjsp7PD12icRxi9UVVWL-38pmlw29-42nNvOI.jpg?auto=webp&s=da143bea206173e3cc2b0d5a4e8f2f84b24a994e" },
    { titulo: "Spider-Man: Homecoming", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 16, crono: 19, poster: "https://m.media-amazon.com/images/I/A1mjWWH6mFL.jpg" },
    { titulo: "Thor: Ragnarok", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 17, crono: 21, poster: "https://tecolotito.elsiglodetorreon.com.mx/cdn-cgi/image/format=webp,width=1546,quality=75/i/2017/04/929651.jpeg" },
    { titulo: "Black Panther", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 18, crono: 18, poster: "https://www.blackfilm.com/read/wp-content/uploads/2017/06/Black-Panther-Teaser-Poster.jpg" },
    { titulo: "Ant-Man and The Wasp", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 19, crono: 22, poster: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLtqLiFTTgBzM0lEPQBOPMngE9PDz1hpIhLddHtm40y0kBH7ouoG1cPiHTqMwY8-3IPEL-SknAxPA_RrQHogXsiOm8vNQn5BlFaOuMq8k6rKgAgGE0kxtGnOH8SuLcSXQ_sTkE3bHTADk/s1600/Ant-Man_and_The_Wasp_poster_LatAm.JPG" },
    { titulo: "Avengers: Infinity War", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 20, crono: 23, poster: "https://www.blackfilm.com/read/wp-content/uploads/2017/11/Avengers-Infinity-War-Teaser-Poster.jpg" },
    { titulo: "Captain Marvel", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 21, crono: 3, poster: "https://cdn.marvel.com/content/2x/ow_character_1-sht_brie_v3_lg.webp" },
    { titulo: "Avengers: Endgame", categoria: "mcu-infinito", tipo: "Película", ordenSalida: 22, crono: 24, poster: "https://cdn.marvel.com/content/2x/MLou2_Teaser_1-Sht_v6_Lg.jpg" },

    // --- MCU: SAGA DEL MULTIVERSO ---
    { titulo: "Spider-Man: Far From Home", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 23, crono: 25, poster: "https://cdn.marvel.com/content/2x/ffh_poster_onesheet.webp" },
    { titulo: "WandaVision", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 24, crono: 27, poster: "https://picarouno.com/wp-content/uploads/2025/12/wandavision_001-1037x1536.jpg" },
    { titulo: "The Falcon and The Winter Soldier", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 25, crono: 28, poster: "https://www.hellofriki.com/wp-content/uploads/2020/12/falcon-soldado-de-invierno-serie-poste-691x1024.jpg" },
    { titulo: "Loki (Temporada 1)", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 26, crono: 29, poster: "https://m.media-amazon.com/images/I/81fdQ6kl4JS.jpg" },
    { titulo: "Black Widow", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 27, crono: 17, poster: "https://m.media-amazon.com/images/M/MV5BNjZjOGVhOTEtNzY4Mi00MjQzLTlmYjktNzMyMDExMWJlODEwXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Shang-Chi", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 28, crono: 31, poster: "https://m.media-amazon.com/images/I/81orh-NSiTL.jpg" },
    { titulo: "Eternals", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 29, crono: 32, poster: "https://image.tmdb.org/t/p/original/vgUZo9aVvRvCQFXwZC9zq3qCZT9.jpg" },
    { titulo: "Hawkeye", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 30, crono: 33, poster: "https://lumiere-a.akamaihd.net/v1/images/unknown_61ca7b47.png" },
    { titulo: "Spider-Man: No Way Home", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 31, crono: 35, poster: "https://www.cinemascomics.com/wp-content/uploads/2022/01/poster-Spider-man-no-way-home.jpg" },
    { titulo: "Moon Knight", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 32, crono: 36, poster: "https://m.media-amazon.com/images/I/71pAwt4KT6L.jpg" },
    { titulo: "Dr. Strange: Multiverse of Madness", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 33, crono: 37, poster: "https://img.buzzfeed.com/buzzfeed-static/static/2022-02/18/13/asset/e9954361afcd/sub-buzz-772-1645190837-7.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto" },
    { titulo: "Ms. Marvel", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 34, crono: 38, poster: "https://lumiere-a.akamaihd.net/v1/images/ms_979c8372.jpeg" },
    { titulo: "Thor: Love and Thunder", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 35, crono: 39, poster: "https://lumiere-a.akamaihd.net/v1/images/fb83262af061c44d518c601e3956c3b4_2764x4096_e4f0eee2.jpeg" },
    { titulo: "Yo Soy Groot", categoria: "mcu-multiverso", tipo: "Serie de Cortos", ordenSalida: 36, crono: 26, poster: "https://cdn.marvel.com/content/2x/iamgroot_lob_crd_04.jpg" },
    { titulo: "She-Hulk: Attorney at Law", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 37, crono: 40, poster: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/LXR4DQCCMFFW7CEWUE7QRUGJTU.jpg" },
    { titulo: "Hombre Lobo por la Noche", categoria: "mcu-multiverso", tipo: "Especial", ordenSalida: 38, crono: 30, poster: "https://m.media-amazon.com/images/M/MV5BODUzMGFkYzgtYzhjNC00ZmFjLTg3ZTYtYWJkMWRjMzJmYTQ2XkEyXkFqcGc@.V1.jpg" },
    { titulo: "Black Panther: Wakanda Forever", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 39, crono: 41, poster: "https://artofthemovies.co.uk/cdn/shop/products/IMG_0184-338579.jpg?v=1668148930&width=900" },
    { titulo: "Ant-Man and The Wasp: Quantumania", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 40, crono: 42, poster: "https://lumiere-a.akamaihd.net/v1/images/antman_b843a521.jpeg?region=0,0,658,898" },
    { titulo: "Guardians of the Galaxy Vol. 3", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 41, crono: 43, poster: "https://assets-prd.ignimgs.com/2022/12/01/guardians-of-the-galaxy-vol-3-1669932411159.jfif" },
    { titulo: "Loki (Temporada 2)", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 42, crono: 44, poster: "https://preview.redd.it/official-poster-for-loki-season-2-v0-mjczxxkptafb1.jpg?auto=webp&s=b52be74ed745f4c481074ffd739feb43c7c0214f" },
    { titulo: "Echo", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 43, crono: 34, poster: "https://m.media-amazon.com/images/I/81f3aW-ovVL.jpg" },
    { titulo: "Deadpool & Wolverine", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 44, crono: 45, poster: "https://m.media-amazon.com/images/I/61AwaBKmGXL.jpg" },
    { titulo: "Captain America: Brave New World", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 45, crono: 46, poster: "https://i.pinimg.com/736x/19/85/1d/19851d768bfcc73a6942ae30c69f03a8.jpg" },
    { titulo: "Thunderbolts*", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 46, crono: 47, poster: "https://m.media-amazon.com/images/I/71Y2ZfgT+4L.jpg" },
    { titulo: "The Fantastic Four: First Steps", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 47, crono: 49, poster: "https://brainstomping.com/wp-content/uploads/2025/07/fantastic-four-first-steps-primeros-pasos-cuatro-fantasticos-poster-marvel-mcu.jpg" },
    { titulo: "Ojos de Wakanda", categoria: "mcu-multiverso", tipo: "Serie (Antología)", ordenSalida: 48, crono: 1, poster: "https://cdn.marvel.com/content/2x/eyesofwakanda_lob_crd_02.jpg" },
    { titulo: "Wonder Man", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 49, crono: 48, poster: "https://cdn.marvel.com/content/2x/wonderman_lob_crd_03.jpg" },

    // --- ARROWVERSE ---
    { titulo: "Arrow", categoria: "arrowverse", tipoArrow: "principal", crono: 1, tipo: "Serie", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwxzfrMREXF6kfHXLmAJnhvUsAwyw6jgU_8P6tQure44F6W1hTMtwfFFsV&s=10" },
    { titulo: "The Flash", categoria: "arrowverse", tipoArrow: "principal", crono: 2, tipo: "Serie", poster: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/14/35/ustv-the-flash-poster.jpg" },
    { titulo: "Flash vs Arrow", categoria: "arrowverse", tipoArrow: "eventos", crono: 3, tipo: "Evento", poster: "https://m.media-amazon.com/images/I/51VWso60-0L._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Supergirl", categoria: "arrowverse", tipoArrow: "principal", crono: 4, tipo: "Serie", poster: "https://static.wikia.nocookie.net/supergirl/images/b/b6/Temporada_1_poster.png/revision/latest/scale-to-width-down/1200?cb=20160210130437&path-prefix=es" },
    { titulo: "Legends", categoria: "arrowverse", tipoArrow: "eventos", crono: 5, tipo: "Evento", poster: "https://i.pinimg.com/736x/b3/1a/41/b31a41a98c647c357a3ff53790666151.jpg" },
    { titulo: "DC's Legends of Tomorrow", categoria: "arrowverse", tipoArrow: "principal", crono: 6, tipo: "Serie", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR16L1B69PNDrGPa1F6IAudcuDxCRiJn4hBi61UsY9rIn5p5hKahadZ0TU&s=10" },
    { titulo: "Invasion!", categoria: "arrowverse", tipoArrow: "eventos", crono: 7, tipo: "Evento", poster: "https://cdn.hmv.com/r/w-640/hmv/files/d8/d8360880-fc10-4b55-a726-2f333d250df5.jpg" },
    { titulo: "Duet!", categoria: "arrowverse", tipoArrow: "eventos", crono: 8, tipo: "Evento", poster: "https://mundosuperman.com/wp-content/uploads/2017/03/53990.jpg" },
    { titulo: "Crisis on Earth-X", categoria: "arrowverse", tipoArrow: "eventos", crono: 9, tipo: "Evento", poster: "https://m.media-amazon.com/images/I/81tiQIJIhjL.jpg" },
    { titulo: "Black Lightning", categoria: "arrowverse", tipoArrow: "principal", crono: 10, tipo: "Serie", poster: "https://i.pinimg.com/564x/d5/44/a4/d544a4236f757cea8e84db91ffb92fff.jpg" },
    { titulo: "Elseworlds", categoria: "arrowverse", tipoArrow: "eventos", crono: 11, tipo: "Evento", poster: "https://imgix.bustle.com/inverse/7b/df/96/f8/9724/4533/a086/c46cb1152e80/the-poster-for-elseworlds.jpeg?w=262&h=328&fit=crop&crop=faces&dpr=2" },
    { titulo: "Batwoman", categoria: "arrowverse", tipoArrow: "principal", crono: 12, tipo: "Serie", poster: "https://i.ebayimg.com/images/g/kBIAAOSwvCBkZbNh/s-l1200.jpg" },
    { titulo: "Crisis on Infinite Earths", categoria: "arrowverse", tipoArrow: "eventos", crono: 13, tipo: "Evento", poster: "https://therealstanlee.com/main/wp-content/uploads/2019/11/EJ_vMjOUYAYQ2MZ-min-819x1024.jpg" },
    { titulo: "Armageddon", categoria: "arrowverse", tipoArrow: "eventos", crono: 14, tipo: "Evento", poster: "https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/11/The-Flash-Armageddon.jpg?resize=1280%2C1600&ssl=1" },

    // --- FOX: X-MEN ---
    { titulo: "X-Men (2000)", categoria: "fox-xmen", tipo: "Película", poster: "https://i.pinimg.com/736x/f9/7c/3f/f97c3f94f67ca6fd6ae7ad0470d6d553.jpg" },
    { titulo: "X2: X-Men United", categoria: "fox-xmen", tipo: "Película", poster: "https://legacymovieposters.com/cdn/shop/products/x-men2.jpg?v=1668313148" },
    { titulo: "X-Men: The Last Stand", categoria: "fox-xmen", tipo: "Película", poster: "https://pics.filmaffinity.com/x3_x_men_3_the_last_stand-992099331-large.jpg" },
    { titulo: "X-Men Origins: Wolverine", categoria: "fox-xmen", tipo: "Película", poster: "https://i.blogs.es/b07389/x_men_origins_wolverine/450_1000.jpg" },
    { titulo: "The Wolverine", categoria: "fox-xmen", tipo: "Película", poster: "https://www.mubis.es/media/articles/4563/45592/lobezno-inmortal-poster-imagenes-y-adelanto-del-primer-teaser-trailer-original.jpg" },
    { titulo: "X-Men: First Class", categoria: "fox-xmen", tipo: "Película", poster: "https://collider.com/wp-content/uploads/x-men-first-class-teaser-poster.jpg" },
    { titulo: "X-Men: Days of Future Past", categoria: "fox-xmen", tipo: "Película", poster: "https://i0.wp.com/www.dorkaholics.com/wp-content/uploads/2014/04/9kcs.jpg?fit=692%2C1024&ssl=1" },
    { titulo: "X-Men: Apocalypse", categoria: "fox-xmen", tipo: "Película", poster: "https://www.scifinow.co.uk/wp-content/uploads/2015/12/xmen_apocalypse_ver2.jpg" },
    { titulo: "X-Men Dark Phoenix", categoria: "fox-xmen", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81SP4dCrQyL.jpg" },
    { titulo: "Logan", categoria: "fox-xmen", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/Logan_2017_teaser_original_film_art_5000x.webp?v=1677273260" },
    { titulo: "Deadpool", categoria: "fox-xmen", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71SBA4bdx8L._AC_UF894,1000_QL80_AIweblab1381794,T1_.jpg" },
    { titulo: "Deadpool 2", categoria: "fox-xmen", tipo: "Película", poster: "https://preview.redd.it/new-deadpool-2-poster-v0-878r7e1hmle01.jpg?auto=webp&s=2f03e75ff6a45766bbbf16a95cbe0ecc3d6c7046" },

    // --- FOX: CUATRO FANTÁSTICOS ---
    { titulo: "Fantastic Four (2005)", categoria: "fox-ff", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71nlKnBmb4L.jpg" },
    { titulo: "Fantastic Four: Silver Surfer", categoria: "fox-ff", tipo: "Película", poster: "https://imaginus.ca/cdn/shop/products/A1432F_4e5006fc-9bff-4cc9-8ded-ec5b3c1ff9e4_1604x.jpg?v=1654713321" },

    // --- SONY ---
    { titulo: "Spider-Man (2002)", categoria: "sony-tobey", tipo: "Película", poster: "https://i.pinimg.com/736x/48/4b/8f/484b8f1cf95ff2ee83b5e10e80ec8875.jpg" },
    { titulo: "Spider-Man 2", categoria: "sony-tobey", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61Z0dKYVx8L.jpg" },
    { titulo: "Spider-Man 3", categoria: "sony-tobey", tipo: "Película", poster: "https://static.posters.cz/image/1300/1282.jpg" },
    
    { titulo: "The Amazing Spider-Man", categoria: "sony-andrew", tipo: "Película", poster: "https://www.mubis.es/media/articles/1554/15320/nuevo-poster-y-trailer-de-the-amazing-spider-man-original.jpg" },
    { titulo: "The Amazing Spider-Man 2", categoria: "sony-andrew", tipo: "Película", poster: "https://cdn.europosters.eu/image/750/20688.jpg" },
    
    // --- SONY SSU (Universo Spider-Man de Sony) ---
    { titulo: "Venom", categoria: "sony-ssu", tipo: "Película", poster: "https://ew.com/thmb/ZB6f77bkGWakc1G6ZMf84TWHfC8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/venom-dom-vnm_online_1sht_tsr_rd3dimax_01_rgb-2000-1aa5bc8ab6bf4dc38a719c55500ddbde.jpg" },
    { titulo: "Venom: Let There Be Carnage", categoria: "sony-ssu", tipo: "Película", poster: "https://m.media-amazon.com/images/I/91Aoh6wnnJL.jpg" },
    { titulo: "Morbius", categoria: "sony-ssu", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61H81z3Iu-L._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Madame Web", categoria: "sony-ssu", tipo: "Película", poster: "https://m.media-amazon.com/images/S/pv-target-images/cb36ea6f3f53777aea24eec9d1560470e6c6d1f260abc72bcb13ae9bccfcb678.jpg" },
    { titulo: "Venom: The Last Dance", categoria: "sony-ssu", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/316750.jpg" },
    { titulo: "Kraven the Hunter", categoria: "sony-ssu", tipo: "Película", poster: "https://www.infobae.com/new-resizer/TCpnPIXVaCBLAgI9qPNyP_LHIlI=/arc-anglerfish-arc2-prod-infobae/public/TIWZB56GRBGONDHJMXY5NJFWMY.jpg" },

    // --- DC COMICS (DCU, DCEU Principal, The Batman, Joker) ---
    { titulo: "The Suicide Squad", categoria: "dcu", tipo: "Película", poster: "https://postercity.com.ar/wp-content/uploads/2021/10/the-SUICIDE-SQUAD-60-X-90.jpg" },
    { titulo: "Peacemaker Temporada 1", categoria: "dcu", tipo: "Serie", poster: "https://static.wikia.nocookie.net/dcextendeduniverse/images/a/ad/Peacemaker_-_P%C3%B3ster_Oficial.png/revision/latest?cb=20211203144752&path-prefix=es" },
    { titulo: "Blue Beetle", categoria: "dcu", tipo: "Película", poster: "https://www.awn.com/sites/default/files/styles/original/public/image/attached/1058733-bbeetle1-1280.jpg?itok=NxX9BPXh" },
    { titulo: "Creature Commandos", categoria: "dcu", tipo: "Animación", poster: "https://static.dc.com/2024-11/ProdPage_CreatureCommandos_Thumb.jpg" },
    { titulo: "Superman", categoria: "dcu", tipo: "Película", poster: "https://m.media-amazon.com/images/I/712N7RdrlTL.jpg" },
    { titulo: "Peacemaker Temporada 2", categoria: "dcu", tipo: "Serie", poster: "https://m.media-amazon.com/images/M/MV5BZDIyMGU2NTktOTM3YS00OTRjLWJiMmItNDEyNjVhZTZiZGUxXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Supergirl", categoria: "dcu", tipo: "Película", poster: "https://cdn.kinocheck.com/i/1sxsgm3x7s.jpg" },
    { titulo: "Lanterns", categoria: "dcu", tipo: "Serie", poster: "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2026/06/Screenshot_20260604-112025_Threads.jpg" },
    
    // --- DCEU DE ZACK SNYDER (Con el orden pedido por Lando) ---
    { titulo: "Man of Steel", categoria: "dceu-snyder", tipo: "Película", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtrrTBfKpVp5mWI445MSXcFokIqvkHM737oEbS9U38ayvSDd4eIG8IVpkn&s=10" },
    { titulo: "Batman v Superman", categoria: "dceu-snyder", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81o7zaih1mL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Suicide Squad", categoria: "dceu-snyder", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/sk3FZgh3sRrmr8vyhaitNobMcfh.jpg" },
    { titulo: "Wonder Woman", categoria: "dceu-snyder", tipo: "Película", poster: "https://im.ziffdavisinternational.com/ign_es/screenshot/default/wonder-woman-sp_q9yz.jpg" },
    { titulo: "Zack Snyder's Justice League", categoria: "dceu-snyder", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNDA0MzM5YTctZTU2My00NGQ5LWE2NTEtNDM0MjZmMDBkOTZkXkEyXkFqcGc@._V1_.jpg" },
    
    // --- DCEU PRINCIPAL (orden de estreno) ---
    { titulo: "Man of Steel", categoria: "dceu-principal", tipo: "Película", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtrrTBfKpVp5mWI445MSXcFokIqvkHM737oEbS9U38ayvSDd4eIG8IVpkn&s=10" },
    { titulo: "Batman v Superman", categoria: "dceu-principal", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81o7zaih1mL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Suicide Squad", categoria: "dceu-principal", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/sk3FZgh3sRrmr8vyhaitNobMcfh.jpg" },
    { titulo: "Wonder Woman", categoria: "dceu-principal", tipo: "Película", poster: "https://im.ziffdavisinternational.com/ign_es/screenshot/default/wonder-woman-sp_q9yz.jpg" },
    { titulo: "Justice League", categoria: "dceu-principal", tipo: "Película", poster: "https://www.guioteca.com/comics/files/2017/10/justice-league-final-poster-1039055.jpeg" },
    { titulo: "Aquaman", categoria: "dceu-principal", tipo: "Película", poster: "https://deadline.com/wp-content/uploads/2018/07/aquaman-poster.jpg" },
    { titulo: "Shazam!", categoria: "dceu-principal", tipo: "Película", poster: "https://static.posters.cz/image/1300/71939.jpg" },
    { titulo: "Birds of Prey and The Fantabulous Emancipation of One Harley Quinn", categoria: "dceu-principal", tipo: "Película", poster: "https://ew.com/thmb/sT-h3pYSc53fKCWxtv5ro4Midno=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/birds-of-prey-2000-90f0db5838084a8a8c2eca14edd37e1f.jpg" },
    { titulo: "Wonder Woman 1984", categoria: "dceu-principal", tipo: "Película", poster: "https://cdn.europosters.eu/image/1300/83411.jpg" },
    { titulo: "The Suicide Squad", categoria: "dceu-principal", tipo: "Película", poster: "https://postercity.com.ar/wp-content/uploads/2021/10/the-SUICIDE-SQUAD-60-X-90.jpg" },
    { titulo: "Black Adam", categoria: "dceu-principal", tipo: "Película", poster: "https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/06/black-adam.jpg?resize=1638%2C2048&ssl=1" },
    { titulo: "Shazam! Fury of the Gods", categoria: "dceu-principal", tipo: "Película", poster: "https://cinembrollos.com/wp-content/uploads/2023/02/shazam_fury_of_the_gods_ver5_xlg.jpeg" },
    { titulo: "The Flash", categoria: "dceu-principal", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/317434.jpg" },
    { titulo: "Blue Beetle", categoria: "dceu-principal", tipo: "Película", poster: "https://www.awn.com/sites/default/files/styles/original/public/image/attached/1058733-bbeetle1-1280.jpg?itok=NxX9BPXh" },
    { titulo: "Aquaman and the Lost Kingdom", categoria: "dceu-principal", tipo: "Película", poster: "https://i.ebayimg.com/images/g/EPwAAOSwlWJlhaol/s-l1200.jpg" },
    
    // --- THE BATMAN ---
    { titulo: "The Batman", categoria: "the-batman", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71kUTilIdiL.jpg" },
    { titulo: "The Penguin", categoria: "the-batman", tipo: "Serie", poster: "https://m.media-amazon.com/images/I/81UqKIm2YhL.jpg" },
    
    // --- JOKER ---
    { titulo: "Joker", categoria: "joker", tipo: "Película", poster: "https://i.ebayimg.com/images/g/rI0AAOSw89NiRZ6k/s-l1200.jpg" },
    { titulo: "Joker: Folie à Deux", categoria: "joker", tipo: "Película", poster: "https://static.dc.com/2024-04/JOKER2_VERT_TSR_2764x4096_DOM.jpg" },

    // --- DC ELSEWORLDS: MULTIVERSO ---
    { titulo: "Stargirl", categoria: "dc-multiverso", subtipo: "liveaction", tipo: "Serie - Tierra 2", poster: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p18061959_b_v12_af.jpg" },
    { titulo: "Titans", categoria: "dc-multiverso", subtipo: "liveaction", tipo: "Serie - Tierra 9", poster: "https://image.tmdb.org/t/p/original/awneRTOXqumB1fOPoUIXjUqksh5.jpg" },
    { titulo: "Green Lantern", categoria: "dc-multiverso", subtipo: "liveaction", tipo: "Película - Tierra 12", poster: "https://m.media-amazon.com/images/I/71-ckdWvqfL.jpg" },
    { titulo: "Swamp Thing", categoria: "dc-multiverso", subtipo: "liveaction", tipo: "Serie - Tierra 19", poster: "https://m.media-amazon.com/images/M/MV5BMGQzYzgxZWQtZmI3YS00YTIzLTk4NmQtMGE0YTdiNGNlZjYxXkEyXkFqcGc@.V1.jpg" },

    // --- GAME OF THRONES (con doble orden: salida / cronológico) ---
    { titulo: "Game of Thrones", categoria: "game-of-thrones", tipo: "Serie", ordenSalida: 1, crono: 3, poster: "https://static.posters.cz/image/1300/135455.jpg" },
    { titulo: "House of the Dragon", categoria: "game-of-thrones", tipo: "Serie", ordenSalida: 2, crono: 1, poster: "https://i.pinimg.com/736x/4d/b6/39/4db639e88587f29b4b3207d12e90ebfa.jpg" },
    { titulo: "A Knight of the Seven Kingdoms", categoria: "game-of-thrones", tipo: "Serie", ordenSalida: 3, crono: 2, poster: "https://placehold.co/300x450?text=A+Knight+of+the+Seven+Kingdoms" },

    // --- DC COMICS: VIDEOJUEGOS ---
    { titulo: "Gotham Knights", categoria: "dc-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/I/81zkE4hKUjL.jpg" },
    // (Ver colección "Arkhamverse" más abajo, incluye Suicide Squad: Kill the Justice League)

    // --- STAR WARS: EPISODIOS ---
    { titulo: "Star Wars: Episodio I - La Amenaza Fantasma", categoria: "sw-episodios", crono: 2, tipo: "Película", poster: "https://postercity.com.ar/wp-content/uploads/2017/08/Episode1.jpg" },
    { titulo: "Star Wars: Episodio II - El Ataque de los Clones", categoria: "sw-episodios", crono: 3, tipo: "Película", poster: "https://m.media-amazon.com/images/I/61nFfWio-sL.AC_UF894,1000_QL80.jpg" },
    { titulo: "Star Wars: Episodio III - La Venganza de los Sith", categoria: "sw-episodios", crono: 6, tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/266305.jpg" },
    { titulo: "Star Wars: Episodio IV - Una Nueva Esperanza", categoria: "sw-episodios", crono: 14, tipo: "Película", poster: "https://cinemaposters.com.ar/wp-content/uploads/2020/09/Star-Wars-Episodio-IV-Una-Nueva-Esperanza-Cinema-Posters.jpg" },
    { titulo: "Star Wars: Episodio V - El Imperio Contraataca", categoria: "sw-episodios", crono: 15, tipo: "Película", poster: "https://cdn.europosters.eu/image/1300/251620.jpg" },
    { titulo: "Star Wars: Episodio VI - El Retorno del Jedi", categoria: "sw-episodios", crono: 16, tipo: "Película", poster: "https://static.wikia.nocookie.net/esstarwars/images/b/b2/ReturnOfTheJediPoster1983.jpg/revision/latest?cb=20200623214315" },
    { titulo: "Star Wars: Episodio VII - El Despertar de la Fuerza", categoria: "sw-episodios", crono: 22, tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/image_34e17244.jpeg" },
    { titulo: "Star Wars: Episodio VIII - Los Últimos Jedi", categoria: "sw-episodios", crono: 23, tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/image_b81e5aed.jpeg" },
    { titulo: "Star Wars: Episodio IX - El Ascenso de Skywalker", categoria: "sw-episodios", crono: 24, tipo: "Película", poster: "https://ew.com/thmb/ET-SRSQ4HIdJuBOZ7mAKXWOc3aQ=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/ecwe_nmu0aaqbms-2000-7ab12ead751644029b8235a49bdf9906.jpg" },

    // --- STAR WARS: LIVE ACTION (incluye Episodios en orden cronológico) ---
    { titulo: "The Acolyte", categoria: "sw-liveaction", crono: 1, tipo: "Serie", poster: "https://lumiere-a.akamaihd.net/v1/images/acolyte-key-art-poster_577d99a1.jpeg?region=0,0,729,1080" },
    { titulo: "Star Wars: Episodio I - La Amenaza Fantasma", categoria: "sw-liveaction", crono: 2, tipo: "Película", poster: "https://postercity.com.ar/wp-content/uploads/2017/08/Episode1.jpg" },
    { titulo: "Star Wars: Episodio II - El Ataque de los Clones", categoria: "sw-liveaction", crono: 3, tipo: "Película", poster: "https://m.media-amazon.com/images/I/61nFfWio-sL.AC_UF894,1000_QL80.jpg" },
    { titulo: "Star Wars: Episodio III - La Venganza de los Sith", categoria: "sw-liveaction", crono: 6, tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/266305.jpg" },
    { titulo: "Solo: A Star Wars Story", categoria: "sw-liveaction", crono: 8, tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/solo-theatrical-poster_f98a86eb.jpeg?region=0,0,864,1280" },
    { titulo: "Obi-Wan Kenobi", categoria: "sw-liveaction", crono: 10, tipo: "Serie", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Ea5Zhl73NttD-fuEjBpy5zvc0CHgbAK65cdKieScq9sYL53sOtIFfaMO&s=10" },
    { titulo: "Andor", categoria: "sw-liveaction", crono: 12, tipo: "Serie", poster: "https://lumiere-a.akamaihd.net/v1/images/andor-character-poster-cassian-andor_cacda283.jpeg" },
    { titulo: "Rogue One: A Star Wars Story", categoria: "sw-liveaction", crono: 13, tipo: "Película", poster: "https://im.ziffdavisinternational.com/ign_es/screenshot/default/cnamojjumaqgodbjpg-large_1nv3.jpg" },
    { titulo: "Star Wars: Episodio IV - Una Nueva Esperanza", categoria: "sw-liveaction", crono: 14, tipo: "Película", poster: "https://cinemaposters.com.ar/wp-content/uploads/2020/09/Star-Wars-Episodio-IV-Una-Nueva-Esperanza-Cinema-Posters.jpg" },
    { titulo: "Star Wars: Episodio V - El Imperio Contraataca", categoria: "sw-liveaction", crono: 15, tipo: "Película", poster: "https://cdn.europosters.eu/image/1300/251620.jpg" },
    { titulo: "Star Wars: Episodio VI - El Retorno del Jedi", categoria: "sw-liveaction", crono: 16, tipo: "Película", poster: "https://static.wikia.nocookie.net/esstarwars/images/b/b2/ReturnOfTheJediPoster1983.jpg/revision/latest?cb=20200623214315" },
    { titulo: "The Mandalorian", categoria: "sw-liveaction", crono: 17, tipo: "Serie", poster: "https://lumiere-a.akamaihd.net/v1/images/image_09049f79.jpeg" },
    { titulo: "The Book of Boba Fett", categoria: "sw-liveaction", crono: 18, tipo: "Serie", poster: "https://m.media-amazon.com/images/I/610KLfk0DZL.jpg" },
    { titulo: "Ahsoka", categoria: "sw-liveaction", crono: 19, tipo: "Serie", poster: "https://lumiere-a.akamaihd.net/v1/images/ahsoka-character-posters-ahsoka_bb400512.jpeg?width=1136" },
    { titulo: "Skeleton Crew", categoria: "sw-liveaction", crono: 20, tipo: "Serie", poster: "https://lumiere-a.akamaihd.net/v1/images/skeleton-crew-teaster-poster-4866453125478789_3179e794.jpeg?region=0,0,729,1080" },
    { titulo: "Star Wars: Episodio VII - El Despertar de la Fuerza", categoria: "sw-liveaction", crono: 22, tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/image_34e17244.jpeg" },
    { titulo: "Star Wars: Episodio VIII - Los Últimos Jedi", categoria: "sw-liveaction", crono: 23, tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/image_b81e5aed.jpeg" },
    { titulo: "Star Wars: Episodio IX - El Ascenso de Skywalker", categoria: "sw-liveaction", crono: 24, tipo: "Película", poster: "https://ew.com/thmb/ET-SRSQ4HIdJuBOZ7mAKXWOc3aQ=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/ecwe_nmu0aaqbms-2000-7ab12ead751644029b8235a49bdf9906.jpg" },

    // --- STAR WARS: ANIMACIÓN ---
    { titulo: "The Clone Wars (Película)", categoria: "sw-animacion", crono: 4, tipo: "Película", poster: "https://cdn.europosters.eu/image/750/3335.jpg" },
    { titulo: "The Clone Wars (Serie)", categoria: "sw-animacion", crono: 5, tipo: "Serie", poster: "https://i.ebayimg.com/images/g/nSIAAOSwVkdlOSVq/s-l1200.jpg" },
    { titulo: "The Bad Batch", categoria: "sw-animacion", crono: 7, tipo: "Serie", poster: "https://myhotposters.com/cdn/shop/products/mL5264_1024x1024.jpg?v=1748532845" },
    { titulo: "Star Wars: Tales of the Underworld", categoria: "sw-animacion", crono: 7.5, tipo: "Serie (Antología)", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNFK8wlF1QPEfZkNraIHz1OgEvm4VhlXvAJMCN8uV_9r5gUdFFbIirvigX&s=10" },
    { titulo: "Maul: Shadow Lord", categoria: "sw-animacion", crono: 9, tipo: "Audiodrama", poster: "https://cdn.europosters.eu/image/1300/307057.jpg" },
    { titulo: "Star Wars Rebels", categoria: "sw-animacion", crono: 11, tipo: "Serie", poster: "https://i.ebayimg.com/images/g/ZIkAAOSwVLRad2xL/s-l1200.jpg" },
    { titulo: "Star Wars: Tales of the Empire", categoria: "sw-animacion", crono: 18.5, tipo: "Serie (Antología)", poster: "https://lumiere-a.akamaihd.net/v1/images/tales-of-the-empire-key-art_2b34360a.jpeg?region=0,0,1688,2500" },
    { titulo: "Star Wars Resistance", categoria: "sw-animacion", crono: 21, tipo: "Serie", poster: "https://m.media-amazon.com/images/M/MV5BMTkyMTc3NjAwNF5BMl5BanBnXkFtZTgwNTU1ODIyNjM@.V1.jpg" },
    { titulo: "LEGO Star Wars: Terrifying Tales", categoria: "sw-animacion", crono: 25, tipo: "Especial", poster: "https://lumiere-a.akamaihd.net/v1/images/image_6c11e3f5.jpeg?region=0,0,675,1000" },
    { titulo: "LEGO Star Wars Holiday Special", categoria: "sw-animacion", crono: 26, tipo: "Especial", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS29ejXflK4z26fTsqGHjefu3vSJ2xatkwqtEVLO9U-rBdaX0bXX3GhiRI&s=10" },
    { titulo: "LEGO Star Wars: La Reconstrucción de la Galaxia", categoria: "sw-animacion", crono: 27, tipo: "Especial", poster: "https://lumiere-a.akamaihd.net/v1/images/lego-star-wars-rebuild-the-galaxy-sith_100358bf.jpeg" },
    { titulo: "LEGO Star Wars: La Reconstrucción de la Galaxia: Piezas del Pasado", categoria: "sw-animacion", crono: 28, tipo: "Especial", poster: "https://www.lucasfilm.com/app/uploads/lego-rebuild-the-galaxy-pieces-of-the-past-lfl-480x711.jpg" },
    { titulo: "LEGO Star Wars: All-Stars", categoria: "sw-animacion", crono: 29, tipo: "Especial", poster: "https://lumiere-a.akamaihd.net/v1/images/image_c0db4cb3.jpeg" },
    { titulo: "LEGO Star Wars: Crónicas Droide", categoria: "sw-animacion", crono: 30, tipo: "Especial", poster: "https://static.wikia.nocookie.net/esstarwars/images/d/d0/LEGO_Cr%C3%B3nicas_Droides.jpg/revision/latest/thumbnail/width/360/height/360?cb=20200911035550" },
    { titulo: "LEGO Star Wars: Vacaciones de Verano", categoria: "sw-animacion", crono: 31, tipo: "Especial", poster: "https://m.media-amazon.com/images/M/MV5BYjg3MTdiMTAtZWFhZS00Y2M0LWEwNzYtMjEyMTU0ZGYwOGJmXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Star Wars: Tales of the Jedi", categoria: "sw-animacion", crono: 1.5, tipo: "Serie (Antología)", poster: "https://lumiere-a.akamaihd.net/v1/images/tales-of-the-jedi-poster_dc892101.jpeg" },

    // --- STAR WARS: LIBROS Y CÓMICS ---
    { titulo: "Thrawn (Trilogía)", categoria: "sw-libros", tipo: "Libro", poster: "https://placehold.co/300x450?text=Thrawn" },
    { titulo: "Star Wars: Darth Vader (Cómic)", categoria: "sw-libros", tipo: "Cómic", poster: "https://placehold.co/300x450?text=Darth+Vader" },
    { titulo: "Star Wars: Doctor Aphra (Cómic)", categoria: "sw-libros", tipo: "Cómic", poster: "https://placehold.co/300x450?text=Doctor+Aphra" },
    { titulo: "Heir to the Empire", categoria: "sw-libros", tipo: "Libro", poster: "https://placehold.co/300x450?text=Heir+to+the+Empire" },

    // --- STAR WARS: VIDEOJUEGOS ---
    { titulo: "Star Wars Jedi: Fallen Order", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://lumiere-a.akamaihd.net/v1/images/image_25a0f282.jpeg" },
    { titulo: "Star Wars Jedi: Survivor", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/I/71g6jLNF04L.AC_UF894,1000_QL80.jpg" },
    { titulo: "Star Wars: Knights of the Old Republic", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://lumiere-a.akamaihd.net/v1/images/game_poster_knightsoftheoldrepub_1_d341747d.jpeg?region=0,0,500,750" },
    { titulo: "Star Wars Battlefront II", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BOTY3NzM1OTI3OV5BMl5BanBnXkFtZTgwOTUyNzMwMjI@._V1_.jpg" },
    { titulo: "LEGO Star Wars: The Complete Saga", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BM2Q4NzYzMDEtMGM1ZC00YTBkLTgyNzctYjFjYjAwZWY3NTJkXkEyXkFqcGc@.V1.jpg" },
    { titulo: "LEGO Star Wars III: The Clone Wars", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mOX8mHIXBiE73YDPXbNy50JeRmudW4Rps4JASYSDWsSgdUNSVF19NkA&s=10" },
    { titulo: "LEGO Star Wars: The Force Awakens", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BNjhiYmVmZmItOGE2MS00ZDQ4LTk4MDUtMzAyZjE0NmE3YjZjXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "LEGO Star Wars: The Skywalker Saga", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BZjJhMDExNmQtZDU0ZC00YTk5LThlMGQtNjU0NzZmN2JkOTczXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Star Wars: Squadrons", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://store-images.s-microsoft.com/image/apps.51514.71371953440216666.508e0708-a814-4f11-8420-5f620fd8ce09.59f15fb1-fb46-4166-b1ec-e8bb8d2b3350" },
    { titulo: "Star Wars: The Force Unleashed", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/I/71eWBotqfIL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Star Wars: The Force Unleashed II", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BMTc2YTQwZTEtNjgwNi00MDliLTk3MDYtYjU1MzNiNjNmNTIwXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Star Wars: Battlefront", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://static.wikia.nocookie.net/doblaje/images/2/22/Star_Wars_Battlefront_2015_box.jpg/revision/latest?cb=20171125004551&path-prefix=es" },
    { titulo: "Star Wars: Battlefront (Clásico)", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BZGE0ZTY3NTQtN2U5ZS00ZWExLTg3N2EtOTJkMDE5NTY2OTA2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Star Wars: Battlefront II (Clásico)", categoria: "sw-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BOWYyMGI5MWYtZGU4Zi00YzA2LTk0OGEtZmQ2OGJiYWJlZDA0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },

    // --- MARVEL: VIDEOJUEGOS (sueltos, ver colección "Insomniac" más abajo) ---
    { titulo: "Marvel's Guardians of the Galaxy", categoria: "marvel-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/I/81W8yPIxOlL.jpg" },
    { titulo: "Marvel's Avengers", categoria: "marvel-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BMzRkYmUyMGYtYjk4OC00M2NlLThjMDAtZmIwODI4MDI3YTJlXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Marvel Rivals", categoria: "marvel-videojuegos", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BMDExODM1MjItNDA1Zi00NGQ3LTkwYTctNmFhODhkNjRmNzJkXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Marvel Cosmic Invasion", categoria: "marvel-videojuegos", tipo: "Videojuego", poster: "https://store-images.s-microsoft.com/image/apps.45589.14072829118255167.ff1664d8-c187-4947-9c20-847c3ddd6dae.0288dbf2-a78d-45ed-a155-f539ce6bfd40" },

    // --- IT (colección "contenedor" con filtros) ---
    { titulo: "It", categoria: "it", subtipo: "muschietti", tipo: "Película", poster: "https://m.media-amazon.com/images/I/617t0rMU9vL.AC_UF894,1000_QL80.jpg" },
    { titulo: "It Parte Dos", categoria: "it", subtipo: "muschietti", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYzUxM2VhOGItZTY2My00OTA4LWI4NjUtMDA5YWJjM2M2NDJjXkEyXkFqcGc@.V1.jpg" },
    { titulo: "It: Bienvenidos a Derry", categoria: "it", subtipo: "muschietti", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/nyy3BITeIjviv6PFIXtqvc8i6xi.jpg" }
];

// ==========================================
// COLECCIONES (fichas que se abren y muestran progreso)
// ==========================================
const colecciones = [
    {
        id: "actores",
        titulo: "Actores",
        categoria: "explorar",
        poster: "https://placehold.co/300x450?text=Actores",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "directores",
        titulo: "Directores",
        categoria: "explorar",
        poster: "https://placehold.co/300x450?text=Directores",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "franquicias",
        titulo: "Franquicias",
        categoria: "explorar",
        poster: "https://placehold.co/300x450?text=Franquicias",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "game-of-thrones",
        titulo: "Game of Thrones",
        categoria: "franquicias",
        poster: "https://static.posters.cz/image/1300/135443.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "greta-gerwig",
        titulo: "Greta Gerwig",
        categoria: "directores",
        poster: "https://placehold.co/300x450?text=Greta+Gerwig",
        peliculas: [
            { titulo: "Nights and Weekends", poster: "https://m.media-amazon.com/images/M/MV5BMTU5NzM0NjUxOF5BMl5BanBnXkFtZTcwMjUyMTQ5MQ@@.V1.jpg" },
            { titulo: "Lady Bird", poster: "https://image.tmdb.org/t/p/original/gl66K7zRdtNYGrxyS2YDUP5ASZd.jpg" },
            { titulo: "Little Women", poster: "https://m.media-amazon.com/images/I/61TK-+geKPL.AC_UF894,1000_QL80.jpg" },
            { titulo: "Barbie", poster: "https://image.tmdb.org/t/p/original/dekMkQf0kqAmztUca9lX5e5Pjbp.jpg" }
        ]
    },
    {
        id: "christopher-nolan",
        titulo: "Christopher Nolan",
        categoria: "directores",
        poster: "https://w0.peakpx.com/wallpaper/37/420/HD-wallpaper-christopher-nolan-boss-tenet.jpg",
        peliculas: [
            { titulo: "Following", poster: "https://m.media-amazon.com/images/M/MV5BYTQxYzIwMTAtYjZlNi00YzkwLWI4ZGYtNzNlZjU3N2MyNzI4XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Memento", poster: "https://m.media-amazon.com/images/I/51jojzqpkPL.AC_UF894,1000_QL80.jpg" },
            { titulo: "Insomnia", poster: "https://m.media-amazon.com/images/M/MV5BOTE2NzQ0MzQtMDRmZi00ZWRiLWE4MDEtY2M1Mjc3OGY5N2JkXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Batman Begins", poster: "https://i.pinimg.com/736x/67/88/19/678819ae9fc2b7104ecc124f2e586c05.jpg" },
            { titulo: "The Prestige", poster: "https://www.originalfilmart.com/cdn/shop/products/prestige_2006_english_advance_original_film_art_5000x.jpg?v=1551795612" },
            { titulo: "The Dark Knight", poster: "https://www.movieposters.com/cdn/shop/files/darkknight.building.24x36_20e90057-f673-4cc3-9ce7-7b0d3eeb7d83_1024x1024.jpg?v=1762974221" },
            { titulo: "Inception", poster: "https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg" },
            { titulo: "The Dark Knight Rises", poster: "https://i.pinimg.com/736x/76/bd/14/76bd1451fa0d4e66a83095bfb5ad63a8.jpg" },
            { titulo: "Interstellar", poster: "https://m.media-amazon.com/images/I/91obuWzA3XL.jpg" },
            { titulo: "Dunkirk", poster: "https://i.etsystatic.com/36541132/r/il/7c267b/7018214484/il_570xN.7018214484_2wqe.jpg" },
            { titulo: "Tenet", poster: "https://www.originalfilmart.com/cdn/shop/files/tenet_2020_advance_original_film_art_37f46c8f-cdc8-468e-b8b5-2492200deb1c_5000x.webp?v=1756494471" },
            { titulo: "Oppenheimer", poster: "https://i.ebayimg.com/images/g/n9MAAOSw6mBktOuN/s-l1200.jpg" },
            { titulo: "The Odyssey", poster: "https://img.asmedia.epimg.net/resizer/v2/AP6RDKAGQVE4DEON7ETUS4UVM4.jpg?auth=5abec700c478bffaa862bc1e153efeb77076781fbd4dc9df918ddb11a11979ea&width=375" }
        ]
    },
    {
        id: "sw-visions",
        titulo: "Star Wars: Visions",
        categoria: "sw-animacion",
        poster: "https://lumiere-a.akamaihd.net/v1/images/image_5fcdd79b.jpeg",
        peliculas: [
            { titulo: "The Ninth Jedi", poster: "https://lumiere-a.akamaihd.net/v1/images/star-wars-the-ninth-jedi-teaser-poster-eng_2b2aba2f.jpeg?width=1136" }
        ]
    },
    {
        id: "tomorrowverse",
        titulo: "Tomorrowverse",
        categoria: "dc-animacion",
        poster: "https://image.tmdb.org/t/p/original/1KS9d4yun6Ok8u5m4lU9dpFbJcc.jpg",
        peliculas: [
            { titulo: "Superman: Man of Tomorrow", poster: "https://m.media-amazon.com/images/M/MV5BOTE2OWJlZTgtNTBlNC00MTVlLWIxNzItMzUyZjY3YTIwZTgxXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Justice Society: World War II", poster: "https://m.media-amazon.com/images/M/MV5BZjFkN2E5MWEtNjJjYy00Nzk3LTg0YzEtN2U5ZmM1YzdiMTczXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman: The Long Halloween - Part One", poster: "https://cdng.europosters.eu/pod_public/1300/318711.jpg" },
            { titulo: "Batman: The Long Halloween - Part Two", poster: "https://cdng.europosters.eu/pod_public/1300/318712.jpg" },
            { titulo: "Green Lantern: Beware My Power", poster: "https://cdng.europosters.eu/pod_public/1300/317857.jpg" },
            { titulo: "Legion of Super-Heroes", poster: "https://static.wikia.nocookie.net/tomorrowverse/images/9/92/Legion_Artwork2.jpeg/revision/latest/scale-to-width-down/1200?cb=20221210224747" },
            { titulo: "Justice League: Warworld", poster: "https://cdng.europosters.eu/pod_public/1300/317094.jpg" },
            { titulo: "Justice League: Crisis on Infinite Earths - Part One", poster: "https://m.media-amazon.com/images/M/MV5BNWQ1YWQwNWItNTI0NC00Mjk4LWJmOWItNDJmYjIzNzA3OWQ0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Justice League: Crisis on Infinite Earths - Part Two", poster: "https://cdng.europosters.eu/pod_public/1300/316398.jpg" },
            { titulo: "Justice League: Crisis on Infinite Earths - Part Three", poster: "https://m.media-amazon.com/images/M/MV5BMzZmODkzMGEtMzQ2OC00ZTY2LWFjNTUtMjBkZGFmMTU5ZmYxXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" }
        ]
    },
    {
        id: "dcamu",
        titulo: "DCAMU",
        categoria: "dc-animacion",
        poster: "https://images.theposterdb.com/prod/public/images/meta/collections/optimized/737528/poster.webp",
        peliculas: [
            { titulo: "Justice League: The Flashpoint Paradox", poster: "https://m.media-amazon.com/images/I/91KSyIrPxZL.AC_UF894,1000_QL80.jpg" },
            { titulo: "Justice League: War", poster: "https://image.tmdb.org/t/p/original/pdNprWYdgcB8z4FLD3BhRmhEys1.jpg" },
            { titulo: "Son of Batman", poster: "https://static.wikia.nocookie.net/dcanimatedmovieuniverse/images/7/78/Son_of_Batman.png/revision/latest/scale-to-width-down/1200?cb=20160221205814&path-prefix=es" },
            { titulo: "Justice League: Throne of Atlantis", poster: "https://m.media-amazon.com/images/M/MV5BNDFmNGY3NTMtZTI1Yi00MWFlLThlNWEtNTNkZmI4ZWJjZGM5XkEyXkFqcGc@.V1.jpg" },
            { titulo: "Batman vs. Robin", poster: "https://m.media-amazon.com/images/M/MV5BMjI0ODY2MDE5Nl5BMl5BanBnXkFtZTgwMTk0NTcyNTE@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman: Bad Blood", poster: "https://m.media-amazon.com/images/M/MV5BMzNjMzRmNzItNmIyOS00MGM1LWE2NTAtMDI0MzIwNTM1YzRmXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Justice League vs. Teen Titans", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Qd-aNwbWnuqHBTzO65hwgME_W9SGEJV234WmuJBw-qRWUShxuhTkyTM&s=10" },
            { titulo: "Justice League Dark", poster: "https://static.wikia.nocookie.net/batman/images/0/07/Justice_League_Dark_2017.jpg/revision/latest?cb=20161116213129&path-prefix=es" },
            { titulo: "Teen Titans: The Judas Contract", poster: "https://m.media-amazon.com/images/M/MV5BYzFmZWEwZDItZjhmNi00NmUwLWJhMWYtYmNiZTNmZTNjMGM5XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Suicide Squad: Hell to Pay", poster: "https://m.media-amazon.com/images/M/MV5BYmI4NjM2MjItYTU3My00YzE5LTg4MWQtM2UwNTM0ZDRlZDUxXkEyXkFqcGc@.V1.jpg" },
            { titulo: "The Death of Superman", poster: "https://m.media-amazon.com/images/M/MV5BOWJhNmYwYzgtYmUwYS00MzNhLTg2MzYtY2UxYzI2OGQyY2QyXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Constantine: City of Demons", poster: "https://cdn.kinocheck.com/i/w=1200/vuju4wtx61.jpg" },
            { titulo: "Reign of the Supermen", poster: "https://image.tmdb.org/t/p/original/l1wMgglw36ljZBEjm0iGWrmpDbC.jpg" },
            { titulo: "Batman: Hush", poster: "https://m.media-amazon.com/images/M/MV5BNDMxZjk0YzItZGIyMC00M2VjLWI3ZDAtM2IwZGFhMDMwZmRmXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Wonder Woman: Bloodlines", poster: "https://m.media-amazon.com/images/M/MV5BNjBjMzFhN2MtZmI4NS00YTM3LTk3MzctZjRlYjVjYjIwMjg4XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Justice League Dark: Apokalips War", poster: "https://m.media-amazon.com/images/M/MV5BNjIyNDg5ZWMtODI5ZC00M2NlLTk2NWYtZWEzOWJmYWVhMzY3XkEyXkFqcGc@.V1.jpg" }
        ]
    },
    {
        id: "peliculas-independientes",
        titulo: "Películas Independientes",
        categoria: "dc-animacion",
        poster: "https://i.pinimg.com/736x/10/3e/28/103e2858c657d918783491b46aababee.jpg",
        peliculas: [
            { titulo: "Superman: Doomsday", poster: "https://m.media-amazon.com/images/M/MV5BNTg2YzMxNGMtYmY2MS00Mjk1LTgwM2ItNzg3NDkwZWM3ZmRhXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Justice League: The New Frontier", poster: "https://m.media-amazon.com/images/M/MV5BNTU5NzM0NTU0NF5BMl5BanBnXkFtZTgwOTEyNzAwNzE@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman: Gotham Knight", poster: "https://image.tmdb.org/t/p/original/cIpswPrdfDhDZyOibu4rBpv6g6j.jpg" },
            { titulo: "Wonder Woman", poster: "https://m.media-amazon.com/images/M/MV5BZDUwZWIxNDItMjFmNi00ZjY4LWIzNTUtMmVhNmFhMjk0YjU4XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Green Lantern: First Flight", poster: "https://image.tmdb.org/t/p/original/g2nlapGaanfxsVhPWHth8FAdNrm.jpg" },
            { titulo: "Superman/Batman: Public Enemies", poster: "https://m.media-amazon.com/images/M/MV5BZTIxMjM4NmQtNmU0ZC00ZTFhLTg3NTktM2ExMjAxN2RhMDE3XkEyXkFqcGc@.V1.jpg" },
            { titulo: "Superman/Batman: Apocalypse", poster: "https://image.tmdb.org/t/p/original/3zZKtQAMcCWEq6EVh2mraJOAajY.jpg" },
            { titulo: "Justice League: Crisis on Two Earths", poster: "https://m.media-amazon.com/images/M/MV5BNTVlMjI4NzQtNTU0MC00Y2UwLWJkOWMtYjNmMzI2MTgwZjY1XkEyXkFqcGc@.V1.jpg" },
            { titulo: "Justice League: Doom", poster: "https://m.media-amazon.com/images/M/MV5BYmIwNjg5NjItZjRmZi00MDVlLThhYmQtNTBmNTRiY2I5Nzg1XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman: Under the Red Hood", poster: "https://m.media-amazon.com/images/M/MV5BOTI2MWFkNjQtMzViMy00ZGJjLThiYzQtY2M2NDFhMTcxYzRhXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "All-Star Superman", poster: "https://m.media-amazon.com/images/M/MV5BNDM0Nzc3YjAtODIwMy00NWZiLTk4YzgtZGQ0OTk1ZDRhYmNkXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Green Lantern: Emerald Knights", poster: "https://m.media-amazon.com/images/M/MV5BY2QyZjVhM2EtNWM2NC00OTY1LTlhNTItYWZkNDFiYmJjYjljXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Batman: Year One", poster: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8859432_p_v10_al.jpg" },
            { titulo: "Batman: The Dark Knight Returns Part 1", poster: "https://m.media-amazon.com/images/M/MV5BZDlhMmJiNGUtM2E2MS00ZmMxLWIyNjgtMGQ4NDBlZTliNmE4XkEyXkFqcGc@.V1.jpg" },
            { titulo: "Batman: The Dark Knight Returns Part 2", poster: "https://static.wikia.nocookie.net/batman/images/b/bc/The_Dark_Knight_Returns_-_Part_1_Poster.jpg/revision/latest?cb=20220731083755" },
            { titulo: "Superman vs. The Elite", poster: "https://m.media-amazon.com/images/M/MV5BNzRiMjc5ODktMjIxNi00YTVmLTk1Y2QtMmM5MDc4MzhjYjZkXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Superman: Unbound", poster: "https://m.media-amazon.com/images/M/MV5BMTkzMjczODQzMV5BMl5BanBnXkFtZTcwOTIyOTQ0OQ@@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman: Assault on Arkham", poster: "https://image.tmdb.org/t/p/original/7dF0MHMUMKdmCZdB1yPBbPSpokV.jpg" },
            { titulo: "Justice League: Gods and Monsters", poster: "https://m.media-amazon.com/images/M/MV5BYWQzOGM5ZjctZGFhOS00MjcyLTgzZmEtNGVjZjczZmFhNWQyXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman: The Killing Joke", poster: "https://cdng.europosters.eu/pod_public/1300/323460.jpg" },
            { titulo: "Batman: Gotham by Gaslight", poster: "https://i.ebayimg.com/images/g/oAIAAOSwv3NgYbIc/s-l1200.jpg" },
            { titulo: "Superman: Red Son", poster: "https://m.media-amazon.com/images/M/MV5BNGM0YTQ3MzktZWQ0Mi00MWNhLWJlYTQtOGYxYzhmMDBmMzA0XkEyXkFqcGc@.V1.jpg" },
            { titulo: "Batman: Soul of the Dragon", poster: "https://m.media-amazon.com/images/M/MV5BYzA4NmVhOTItNzg4MC00YTJjLTk5ZmMtYTJmY2NhM2ZiNmMyXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Injustice", poster: "https://i.pinimg.com/736x/10/3e/28/103e2858c657d918783491b46aababee.jpg" },
            { titulo: "Catwoman: Hunted", poster: "https://m.media-amazon.com/images/M/MV5BNzQyNTIxZDgtMGI5NS00ZDk2LWJlOTItMmJmYzdhMDIzYzljXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman and Superman: Battle of the Super Sons", poster: "https://m.media-amazon.com/images/M/MV5BNGRiMDYzMDQtMWI3ZC00MWEwLWJkYzYtNjQwNzZjODEzNmZiXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman: The Doom That Came to Gotham", poster: "https://static.dc.com/2023-04/Movies_Thumb_BatmanDoomCame2Gotham.jpg" },
            { titulo: "Crossover Justice League x RWBY Parte 1", poster: "https://m.media-amazon.com/images/M/MV5BNjE1ZWU2OWQtZTEwNS00ZDE2LTllMjgtZjA4YTNlMTQxYTUyXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Crossover Justice League x RWBY Parte 2", poster: "https://m.media-amazon.com/images/M/MV5BMjA5NmExM2QtNTI1MS00ZjM0LTg0ZmItNmIzYjVmZGZmZGEwXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Watchmen", poster: "https://m.media-amazon.com/images/M/MV5BMjc5NGFlMzMtZjkwZS00MzliLTg5NzktZDYzNGNhNjdjNzAzXkEyXkFqcGc@.V1.jpg" }
        ]
    },
    {
        id: "injustice",
        titulo: "Injustice",
        categoria: "dc-videojuegos",
        poster: "https://i.pinimg.com/736x/10/3e/28/103e2858c657d918783491b46aababee.jpg",
        esVideojuego: true,
        peliculas: [
            { titulo: "Injustice: Gods Among Us", poster: "https://m.media-amazon.com/images/M/MV5BZjVjNTg1MWUtM2ZhYi00YzA2LWI2ZTctZTVjNzFhZGM2NDMxXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Injustice 2", poster: "https://m.media-amazon.com/images/M/MV5BZWI5ZDhjMmItMGZiZi00M2VlLTgxMmMtNDIzZDg0Njk2NmE3XkEyXkFqcGc@.V1.jpg" }
        ]
    },
    {
        id: "arkhamverse",
        titulo: "Arkhamverse",
        categoria: "dc-videojuegos",
        poster: "https://cdn.europosters.eu/image/1300/167589.jpg",
        esVideojuego: true,
        peliculas: [
            { titulo: "Batman: Arkham Asylum", poster: "https://static.posters.cz/image/1300/167596.jpg" },
            { titulo: "Batman: Arkham City", poster: "https://static.posters.cz/image/1300/167587.jpg" },
            { titulo: "Batman: Arkham Origins", poster: "https://m.media-amazon.com/images/M/MV5BMWZiMGViNmMtMGQ0OS00MjBkLWEwNDItNzA3MzgxMjQ3Y2M4XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman: Arkham Knight", poster: "https://m.media-amazon.com/images/I/819Ow-bF-6L.jpg" },
            { titulo: "Suicide Squad: Kill the Justice League", poster: "https://m.media-amazon.com/images/M/MV5BZmYyMWVkMGMtMzk1NC00ZTFiLTg5MGEtMGQxODE0YTJlYzZkXkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "lego-dc",
        titulo: "LEGO DC",
        categoria: "dc-videojuegos",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy-P8ozs-75ixhoOjwsLnDm-azOf78e-BGJ6Lr0_bw1uHp0QaK1uVyKgY&s=10",
        esVideojuego: true,
        peliculas: [
            { titulo: "LEGO Batman: The Videogame", poster: "https://m.media-amazon.com/images/M/MV5BYjg1OGFiNjItNDJmNS00ZWNjLWJhZGUtNTY0Yzg4YmVkM2U0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "LEGO Batman 2: DC Super Heroes", poster: "https://m.media-amazon.com/images/M/MV5BMjgyMThmZTgtNzk5MS00ZWQ0LWJhYjMtNmI5NzhhNGM1MWU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "LEGO Batman 3: Beyond Gotham", poster: "https://m.media-amazon.com/images/M/MV5BN2E3ZGM5MTAtOGE3NS00OWMyLWFkNmMtOTVlODUwOWNmMWE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "LEGO DC Super-Villains", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtWxQKciBUEcUG1kHfFfAvAcWtvkUZ8j-eOgDLzz5EbuUXN5ts6tIcgqs&s=10" },
            { titulo: "LEGO Batman: Legacy of the Dark Knight", poster: "https://m.media-amazon.com/images/M/MV5BNDhlYTFmOGMtY2YxZi00ODczLTg0NTQtZDJiMzBjZWQ4YzU2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" }
        ]
    },
    {
        id: "insomniac",
        titulo: "Insomniac",
        categoria: "marvel-videojuegos",
        poster: "https://i.pinimg.com/736x/e1/ec/6d/e1ec6d6a442eeb11e7cd0cf6b8669614.jpg",
        esVideojuego: true,
        peliculas: [
            { titulo: "Marvel's Spider-Man", poster: "https://i.pinimg.com/736x/8a/0e/71/8a0e71a79745c31ad71f2a83f33b91e1.jpg" },
            { titulo: "Marvel's Spider-Man: Miles Morales", poster: "https://image.api.playstation.com/vulcan/ap/rnd/202008/1423/cZaoNGoCXpClHpljuPVPSUlw.jpg" },
            { titulo: "Marvel's Spider-Man 2", poster: "https://m.media-amazon.com/images/M/MV5BZmUwYTNjZTAtOTYxYS00NmM3LTkwODEtNWM2NDNlOGZlYzMyXkEyXkFqcGc@.V1.jpg" }
        ]
    },
    {
        id: "lego-marvel",
        titulo: "LEGO Marvel",
        categoria: "marvel-videojuegos",
        poster: "https://i.pinimg.com/736x/b1/81/e1/b181e1dbfcc00f18ed6661181c07e16e.jpg",
        esVideojuego: true,
        peliculas: [
            { titulo: "LEGO Marvel Super Heroes", poster: "https://m.media-amazon.com/images/M/MV5BOTA5ODA2NTI2M15BMl5BanBnXkFtZTgwNTcxMzU1MDE@._V1_.jpg" },
            { titulo: "LEGO Marvel's Avengers", poster: "https://icemanvideogames.com/cdn/shop/products/ps4_legoavengers_2_f47f382b-b692-4508-aed2-3b4299dfaeb7_1024x1024.jpg?v=1734139316" },
            { titulo: "LEGO Marvel Super Heroes 2", poster: "https://static.wikia.nocookie.net/marveldatabase/images/8/84/LEGO_Marvel_Super_Heroes_2_box_art.jpg/revision/latest?cb=20170516213944" }
        ]
    },
    {
        id: "batman-ben-affleck",
        titulo: "Batman: Ben Affleck",
        categoria: "dc-personajes",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTfVC1CneZcljEkjQExYzjKpYa_ShQDgjvQRB8vwEsfvXrX8zZ28KIcznR&s=10",
        peliculas: [
            { titulo: "Batman v Superman", poster: "https://m.media-amazon.com/images/I/81o7zaih1mL._AC_UF894,1000_QL80_.jpg" },
            { titulo: "Suicide Squad", poster: "https://image.tmdb.org/t/p/original/sk3FZgh3sRrmr8vyhaitNobMcfh.jpg" },
            { titulo: "Justice League", poster: "https://www.guioteca.com/comics/files/2017/10/justice-league-final-poster-1039055.jpeg" },
            { titulo: "The Flash", poster: "https://cdng.europosters.eu/pod_public/1300/317434.jpg" },
            { titulo: "Zack Snyder's Justice League", poster: "https://m.media-amazon.com/images/M/MV5BNDA0MzM5YTctZTU2My00NGQ5LWE2NTEtNDM0MjZmMDBkOTZkXkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "superman-henry-cavill",
        titulo: "Superman: Henry Cavill",
        categoria: "dc-personajes",
        poster: "https://i.ebayimg.com/00/s/MTYwMFgxMDc5/z/F~4AAOSwzDxi5tqG/$_57.JPG?set_id=880000500F",
        peliculas: [
            { titulo: "Man of Steel", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtrrTBfKpVp5mWI445MSXcFokIqvkHM737oEbS9U38ayvSDd4eIG8IVpkn&s=10" },
            { titulo: "Batman v Superman", poster: "https://m.media-amazon.com/images/I/81o7zaih1mL._AC_UF894,1000_QL80_.jpg" },
            { titulo: "Justice League", poster: "https://www.guioteca.com/comics/files/2017/10/justice-league-final-poster-1039055.jpeg" },
            { titulo: "Black Adam", poster: "https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/06/black-adam.jpg?resize=1638%2C2048&ssl=1" },
            { titulo: "The Flash", poster: "https://cdng.europosters.eu/pod_public/1300/317434.jpg" },
            { titulo: "Zack Snyder's Justice League", poster: "https://m.media-amazon.com/images/M/MV5BNDA0MzM5YTctZTU2My00NGQ5LWE2NTEtNDM0MjZmMDBkOTZkXkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "wonder-woman-gal-gadot",
        titulo: "Wonder Woman: Gal Gadot",
        categoria: "dc-personajes",
        poster: "https://i.ebayimg.com/images/g/3psAAOSw4P9i5ryR/s-l1200.jpg",
        peliculas: [
            { titulo: "Batman v Superman", poster: "https://m.media-amazon.com/images/I/81o7zaih1mL._AC_UF894,1000_QL80_.jpg" },
            { titulo: "Wonder Woman", poster: "https://im.ziffdavisinternational.com/ign_es/screenshot/default/wonder-woman-sp_q9yz.jpg" },
            { titulo: "Justice League", poster: "https://www.guioteca.com/comics/files/2017/10/justice-league-final-poster-1039055.jpeg" },
            { titulo: "Wonder Woman 1984", poster: "https://cdn.europosters.eu/image/1300/83411.jpg" },
            { titulo: "Shazam! Fury of the Gods", poster: "https://cinembrollos.com/wp-content/uploads/2023/02/shazam_fury_of_the_gods_ver5_xlg.jpeg" },
            { titulo: "The Flash", poster: "https://cdng.europosters.eu/pod_public/1300/317434.jpg" },
            { titulo: "Zack Snyder's Justice League", poster: "https://m.media-amazon.com/images/M/MV5BNDA0MzM5YTctZTU2My00NGQ5LWE2NTEtNDM0MjZmMDBkOTZkXkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "ben10-original",
        titulo: "Ben 10",
        categoria: "ben10",
        poster: "https://m.media-amazon.com/images/M/MV5BYWVjODZjNDgtYjk4ZS00OTg5LTg5NDQtZDMxZDQ4ZmM5MGJmXkEyXkFqcGc@.V1.jpg",
        peliculas: []
    },
    {
        id: "ben10-alienforce",
        titulo: "Ben 10: Alien Force",
        categoria: "ben10",
        poster: "https://m.media-amazon.com/images/M/MV5BOGQ5YWFjYjItODE5OC00ZDQxLTk5ZmYtNzY0YzM4NjIyMWFlXkEyXkFqcGc@.V1.jpg",
        peliculas: []
    },
    {
        id: "ben10-ultimatealien",
        titulo: "Ben 10: Ultimate Alien",
        categoria: "ben10",
        poster: "https://m.media-amazon.com/images/M/MV5BNWIxMjZmNTQtNzkxZi00NTU5LThhOGYtODEyZGYyNDdkNTQxXkEyXkFqcGc@.V1.jpg",
        peliculas: []
    },
    {
        id: "ben10-omniverse",
        titulo: "Ben 10 Omniverse",
        categoria: "ben10",
        poster: "https://image.tmdb.org/t/p/original/Re9I5tauOspaJxYCIqRqavKT4F.jpg",
        peliculas: []
    },
    {
        id: "ben10",
        titulo: "Ben 10",
        categoria: "franquicias",
        poster: "https://w0.peakpx.com/wallpaper/691/277/HD-wallpaper-ben-ten-logo-ben-10-ben-ten-ben-ten-omnitrix-green-omnitrix-ultimately-thumbnail.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "dragonball",
        titulo: "Dragon Ball",
        categoria: "franquicias",
        poster: "https://media.wallpics.app/thumbnails/2025/01/13/omBfHT0VjnNlR51OI3KSUfhOL6V5KioOmGKlSeOa_thumbnail_yP64.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "dragonball-z",
        titulo: "Dragon Ball Z",
        categoria: "dragonball",
        poster: "https://m.media-amazon.com/images/I/81fhdW8tx3L.jpg",
        peliculas: [
            { titulo: "Saga Saiyan", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSr-aKYyKPVySvy3CpUF--Z9UM-IVdRuDam6yMP8zxu6MUkNLSgMkLG0&s=10" },
            { titulo: "Saga de Freezer", poster: "https://static.wikia.nocookie.net/dragonball/images/2/2e/Arco_de_Freezer_Artwork_DBZ.png/revision/latest?cb=20180612015408&path-prefix=es" },
            { titulo: "Saga de Cell", poster: "https://www.wallister.de/cdn/shop/products/G868340_01.jpg?v=1677662334" },
            { titulo: "Saga de Majin Buu", poster: "https://i.pinimg.com/736x/8a/a2/e4/8aa2e46c01ae0c287901c25449979902.jpg" }
        ]
    },
    {
        id: "dragonball-super",
        titulo: "Dragon Ball Super",
        categoria: "dragonball",
        poster: "https://m.media-amazon.com/images/I/81Z-WeVM-sS._AC_UF894,1000_QL80_.jpg",
        peliculas: [
            { titulo: "Saga de Bills", poster: "https://image.tmdb.org/t/p/original/oV8aSngwg5YPpcaNvlC8VOMCYtK.jpg" },
            { titulo: "La Batalla de los Dioses", poster: "https://www.cinepremiere.com.mx/assets/images/noticias/2013/07-julio/DragonBallZ-batalla-poster.jpg" },
            { titulo: "Saga de la Resurrección de Freezer", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdp8uz95HVMymEVGeUIdyp0bl5juJj8QU0yCSGQqRLt9MVgZputG5v5dI&s=10" },
            { titulo: "La Resurrección de F", poster: "https://www.cinepremiere.com.mx/assets/images/noticias/2013/07-julio/DragonBallZ-batalla-poster.jpg" },
            { titulo: "Saga del Torneo del Universo 6", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9SdBgNJvPZZuQwqniUbOgAOyETZ30L8dDP1VwpIIyOw&s=10" },
            { titulo: "Saga de Black", poster: "https://i.pinimg.com/736x/a0/b0/73/a0b0732ee82a57b35ca1b379810196b4.jpg" },
            { titulo: "Saga del Torneo de Poder", poster: "https://i.pinimg.com/736x/c7/92/95/c79295cb907936831832bf5ec1ae17d5.jpg" },
            { titulo: "Dragon Ball Super: Broly", poster: "https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/media/imagenes/recursos/dragon-ball-super-broly-poster/138134866-1-esl-ES/Dragon-ball-super-Broly-poster.jpg" },
            { titulo: "Dragon Ball Super: Hero", poster: "https://m.media-amazon.com/images/I/61Oo8yO7qKL._AC_UF894,1000_QL80_.jpg" }
        ]
    },
    {
        id: "dragonball-historia-canon",
        titulo: "Historia Canon",
        categoria: "dragonball",
        poster: "https://i.pinimg.com/736x/ce/0a/2e/ce0a2ee7177fbfde6bb24596ee21ae5f.jpg",
        peliculas: [
            { titulo: "Saga Saiyan", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSr-aKYyKPVySvy3CpUF--Z9UM-IVdRuDam6yMP8zxu6MUkNLSgMkLG0&s=10" },
            { titulo: "Saga de Freezer", poster: "https://static.wikia.nocookie.net/dragonball/images/2/2e/Arco_de_Freezer_Artwork_DBZ.png/revision/latest?cb=20180612015408&path-prefix=es" },
            { titulo: "Saga de Cell", poster: "https://www.wallister.de/cdn/shop/products/G868340_01.jpg?v=1677662334" },
            { titulo: "Saga de Majin Buu", poster: "https://i.pinimg.com/736x/8a/a2/e4/8aa2e46c01ae0c287901c25449979902.jpg" },
            { titulo: "Saga de Bills", poster: "https://image.tmdb.org/t/p/original/oV8aSngwg5YPpcaNvlC8VOMCYtK.jpg" },
            { titulo: "La Batalla de los Dioses", poster: "https://www.cinepremiere.com.mx/assets/images/noticias/2013/07-julio/DragonBallZ-batalla-poster.jpg" },
            { titulo: "Saga de la Resurrección de Freezer", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdp8uz95HVMymEVGeUIdyp0bl5juJj8QU0yCSGQqRLt9MVgZputG5v5dI&s=10" },
            { titulo: "La Resurrección de F", poster: "https://www.cinepremiere.com.mx/assets/images/noticias/2013/07-julio/DragonBallZ-batalla-poster.jpg" },
            { titulo: "Saga del Torneo del Universo 6", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9SdBgNJvPZZuQwqniUbOgAOyETZ30L8dDP1VwpIIyOw&s=10" },
            { titulo: "Saga de Black", poster: "https://i.pinimg.com/736x/a0/b0/73/a0b0732ee82a57b35ca1b379810196b4.jpg" },
            { titulo: "Saga del Torneo de Poder", poster: "https://i.pinimg.com/736x/c7/92/95/c79295cb907936831832bf5ec1ae17d5.jpg" },
            { titulo: "Dragon Ball Super: Broly", poster: "https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/media/imagenes/recursos/dragon-ball-super-broly-poster/138134866-1-esl-ES/Dragon-ball-super-Broly-poster.jpg" },
            { titulo: "Dragon Ball Super: Hero", poster: "https://m.media-amazon.com/images/I/61Oo8yO7qKL._AC_UF894,1000_QL80_.jpg" }
        ]
    },
    {
        id: "dragonball-videojuegos",
        titulo: "Videojuegos",
        categoria: "dragonball",
        poster: "https://images.wallpapersden.com/image/download/dragon-ball-z-kakarot-game-poster_a2xsbGeUmZqaraWkpJRnamVlrWhqaGo.jpg",
        esVideojuego: true,
        peliculas: []
    },
    {
        id: "dragonball-todo",
        titulo: "Todo Dragon Ball",
        categoria: "dragonball",
        poster: "https://i.pinimg.com/originals/6f/4d/73/6f4d73d1afc0702a6e9d31f36d1628bc.jpg?nii=t",
        peliculas: [
            { titulo: "Saga Saiyan", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSr-aKYyKPVySvy3CpUF--Z9UM-IVdRuDam6yMP8zxu6MUkNLSgMkLG0&s=10" },
            { titulo: "Saga de Freezer", poster: "https://static.wikia.nocookie.net/dragonball/images/2/2e/Arco_de_Freezer_Artwork_DBZ.png/revision/latest?cb=20180612015408&path-prefix=es" },
            { titulo: "Saga de Cell", poster: "https://www.wallister.de/cdn/shop/products/G868340_01.jpg?v=1677662334" },
            { titulo: "Saga de Majin Buu", poster: "https://i.pinimg.com/736x/8a/a2/e4/8aa2e46c01ae0c287901c25449979902.jpg" },
            { titulo: "Saga de Bills", poster: "https://image.tmdb.org/t/p/original/oV8aSngwg5YPpcaNvlC8VOMCYtK.jpg" },
            { titulo: "La Batalla de los Dioses", poster: "https://www.cinepremiere.com.mx/assets/images/noticias/2013/07-julio/DragonBallZ-batalla-poster.jpg" },
            { titulo: "Saga de la Resurrección de Freezer", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdp8uz95HVMymEVGeUIdyp0bl5juJj8QU0yCSGQqRLt9MVgZputG5v5dI&s=10" },
            { titulo: "La Resurrección de F", poster: "https://www.cinepremiere.com.mx/assets/images/noticias/2013/07-julio/DragonBallZ-batalla-poster.jpg" },
            { titulo: "Saga del Torneo del Universo 6", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9SdBgNJvPZZuQwqniUbOgAOyETZ30L8dDP1VwpIIyOw&s=10" },
            { titulo: "Saga de Black", poster: "https://i.pinimg.com/736x/a0/b0/73/a0b0732ee82a57b35ca1b379810196b4.jpg" },
            { titulo: "Saga del Torneo de Poder", poster: "https://i.pinimg.com/736x/c7/92/95/c79295cb907936831832bf5ec1ae17d5.jpg" },
            { titulo: "Dragon Ball Super: Broly", poster: "https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/media/imagenes/recursos/dragon-ball-super-broly-poster/138134866-1-esl-ES/Dragon-ball-super-Broly-poster.jpg" },
            { titulo: "Dragon Ball Super: Hero", poster: "https://m.media-amazon.com/images/I/61Oo8yO7qKL._AC_UF894,1000_QL80_.jpg" }
        ]
    },
    {
        id: "it",
        titulo: "It",
        categoria: "franquicias",
        poster: "https://moviefilmsla.wordpress.com/wp-content/uploads/2017/07/9ecca-it_postereng1_mf.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "lego",
        titulo: "LEGO",
        categoria: "franquicias",
        poster: "https://w0.peakpx.com/wallpaper/185/537/HD-wallpaper-lego-brand-logo.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "lego-videojuegos",
        titulo: "LEGO Videojuegos",
        categoria: "lego",
        poster: "https://placehold.co/300x450?text=LEGO+Videojuegos",
        esVideojuego: true,
        peliculas: [
            { titulo: "LEGO Star Wars: The Complete Saga", poster: "https://m.media-amazon.com/images/M/MV5BM2Q4NzYzMDEtMGM1ZC00YTBkLTgyNzctYjFjYjAwZWY3NTJkXkEyXkFqcGc@.V1.jpg" },
            { titulo: "LEGO Indiana Jones: The Original Adventures", poster: "https://m.media-amazon.com/images/M/MV5BNzJhZDQ3MzgtMWE3MS00M2U0LWI4MDUtN2UxZmE3MDIxZDYxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "LEGO Batman: The Videogame", poster: "https://m.media-amazon.com/images/M/MV5BYjg1OGFiNjItNDJmNS00ZWNjLWJhZGUtNTY0Yzg4YmVkM2U0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "LEGO Indiana Jones 2: The Adventure Continues", poster: "https://m.media-amazon.com/images/M/MV5BNDg2NWI5MmUtNmYxYy00NDRhLWJjZjUtNmNhY2NjZGVmZjgxXkEyXkFqcGc@._V1_.jpg" },
            { titulo: "LEGO Harry Potter: Years 1-4", poster: "https://static.wikia.nocookie.net/harrypotter/images/f/f2/Lego_Harry_Potter_Years_1-4.jpg/revision/latest?cb=20240714143408" },
            { titulo: "LEGO Star Wars III: The Clone Wars", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mOX8mHIXBiE73YDPXbNy50JeRmudW4Rps4JASYSDWsSgdUNSVF19NkA&s=10" },
            { titulo: "LEGO Pirates of the Caribbean: The Video Game", poster: "https://static.wikia.nocookie.net/lego/images/0/00/Lego-Pirates.png/revision/latest?cb=20170412000441" },
            { titulo: "LEGO Harry Potter: Years 5-7", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyjMxJglqEX0Bc2YSBdH-PoLSx-e_GyUB3m0imvP9yVLg798SYP2Y5gaw&s=10" },
            { titulo: "LEGO Batman 2: DC Super Heroes", poster: "https://m.media-amazon.com/images/M/MV5BMjgyMThmZTgtNzk5MS00ZWQ0LWJhYjMtNmI5NzhhNGM1MWU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "LEGO The Lord of the Rings", poster: "https://m.media-amazon.com/images/M/MV5BYWUyOGRlYjEtNWI0ZS00YTZiLTkxOWYtMWE1NTU1ZjMwMzFmXkEyXkFqcGc@._V1_.jpg" },
            { titulo: "LEGO Marvel Super Heroes", poster: "https://m.media-amazon.com/images/M/MV5BOTA5ODA2NTI2M15BMl5BanBnXkFtZTgwNTcxMzU1MDE@._V1_.jpg" },
            { titulo: "LEGO: The Hobbit", poster: "https://m.media-amazon.com/images/M/MV5BMzc3ODhiYmQtZjRhZS00NTRhLTk5NTMtYjRmNjRjYTE4NjQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "LEGO Batman 3: Beyond Gotham", poster: "https://m.media-amazon.com/images/M/MV5BN2E3ZGM5MTAtOGE3NS00OWMyLWFkNmMtOTVlODUwOWNmMWE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "LEGO Jurassic World", poster: "https://i.etsystatic.com/20730899/r/il/ec922c/3399416948/il_fullxfull.3399416948_j66g.jpg" },
            { titulo: "LEGO Marvel's Avengers", poster: "https://icemanvideogames.com/cdn/shop/products/ps4_legoavengers_2_f47f382b-b692-4508-aed2-3b4299dfaeb7_1024x1024.jpg?v=1734139316" },
            { titulo: "LEGO Star Wars: The Force Awakens", poster: "https://m.media-amazon.com/images/M/MV5BNjhiYmVmZmItOGE2MS00ZDQ4LTk4MDUtMzAyZjE0NmE3YjZjXkEyXkFqcGc@._V1_.jpg" },
            { titulo: "LEGO Marvel Super Heroes 2", poster: "https://static.wikia.nocookie.net/marveldatabase/images/8/84/LEGO_Marvel_Super_Heroes_2_box_art.jpg/revision/latest?cb=20170516213944" },
            { titulo: "LEGO The Incredibles", poster: "https://store-images.s-microsoft.com/image/apps.47394.63814564947568672.1380b0de-7e85-4ee9-a156-948bc47549ea.9cd49bf2-2c46-4d1d-812c-ab716e7c55ad" },
            { titulo: "LEGO DC Super-Villains", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtWxQKciBUEcUG1kHfFfAvAcWtvkUZ8j-eOgDLzz5EbuUXN5ts6tIcgqs&s=10" },
            { titulo: "LEGO Star Wars: The Skywalker Saga", poster: "https://m.media-amazon.com/images/M/MV5BZjJhMDExNmQtZDU0ZC00YTk5LThlMGQtNjU0NzZmN2JkOTczXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "LEGO Batman: Legacy of the Dark Knight", poster: "https://m.media-amazon.com/images/M/MV5BNDhlYTFmOGMtY2YxZi00ODczLTg0NTQtZDJiMzBjZWQ4YzU2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" }
        ]
    },
    {
        id: "lego-audiovisual",
        titulo: "LEGO Audiovisual",
        categoria: "lego",
        poster: "https://placehold.co/300x450?text=LEGO+Audiovisual",
        peliculas: []
    }
];

// Inyecta las fichas de colección en su sección correspondiente
function renderizarColecciones() {
    const seccionesMap = {
        "dc-animacion": "seccion-dc-animacion",
        "dc-videojuegos": "seccion-dc-videojuegos",
        "dc-personajes": "seccion-dc-personajes",
        "explorar": "seccion-explorar",
        "lego": "seccion-lego",
        "ben10": "seccion-ben10",
        "marvel-videojuegos": "seccion-marvel-videojuegos",
        "dragonball": "seccion-dragonball",
        "sw-animacion": "seccion-sw-animacion",
        "franquicias": "seccion-franquicias",
        "directores": "seccion-directores"
    };

    colecciones.forEach(col => {
        const secId = seccionesMap[col.categoria];
        const sec = secId ? document.getElementById(secId) : null;
        const contenedor = sec ? sec.querySelector('.grilla-biblioteca') : null;
        if (!contenedor) return;

        let htmlColeccion;

        if (col.esContenedor) {
            // Ficha "carpeta": solo poster, título y botón Abrir (sin barra ni Marcar Visto)
            htmlColeccion = `
                <div class="tarjeta-media tarjeta-coleccion" data-coleccion="${col.id}">
                    <img src="${col.poster}" alt="${col.titulo}">
                    <h3>${col.titulo}</h3>
                    <p>Categoría</p>
                    <div class="botones-coleccion">
                        <button class="btn-abrir-coleccion" data-coleccion="${col.id}">Abrir 📂</button>
                    </div>
                </div>
            `;
        } else {
            const textoPendiente = col.esVideojuego ? 'Marcar Jugado' : 'Marcar Visto';
            const etiquetaTipo = col.esVideojuego ? 'Colección de Videojuegos' : 'Colección Animada';
            htmlColeccion = `
                <div class="tarjeta-media tarjeta-coleccion" data-coleccion="${col.id}" data-accion="${col.esVideojuego ? 'jugado' : 'visto'}">
                    <img src="${col.poster}" alt="${col.titulo}">
                    <h3>${col.titulo}</h3>
                    <p>${etiquetaTipo}</p>
                    <div class="barra-progreso-container">
                        <div class="barra-progreso-fill" id="barra-${col.id}-fill"></div>
                    </div>
                    <p class="barra-progreso-texto" id="barra-${col.id}-texto">0% completado</p>
                    <div class="botones-coleccion">
                        <button class="btn-accion">${textoPendiente}</button>
                        <button class="btn-abrir-coleccion" data-coleccion="${col.id}">Abrir 📂</button>
                    </div>
                </div>
            `;
        }
        contenedor.insertAdjacentHTML('beforeend', htmlColeccion);
    });

    document.querySelectorAll('.btn-abrir-coleccion').forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.stopPropagation();
            abrirColeccion(this.getAttribute('data-coleccion'));
        });
    });

    sincronizarVistos();
}

// Abre la sección de detalle de una colección, inyectando sus películas la primera vez
function abrirColeccion(colId) {
    const col = colecciones.find(c => c.id === colId);
    if (!col) return;

    const grilla = document.getElementById(`grilla-${colId}`);
    if (grilla && grilla.children.length === 0 && col.peliculas.length > 0) {
        const textoPendiente = col.esVideojuego ? 'Marcar Jugado' : 'Marcar Visto';
        col.peliculas.forEach(peli => {
            const htmlPelicula = `
                <div class="tarjeta-media" data-accion="${col.esVideojuego ? 'jugado' : 'visto'}">
                    <img src="${peli.poster}" alt="${peli.titulo}">
                    <h3>${peli.titulo}</h3>
                    <p>${col.esVideojuego ? 'Videojuego' : 'Película'}</p>
                    <button class="btn-accion">${textoPendiente}</button>
                </div>
            `;
            grilla.insertAdjacentHTML('beforeend', htmlPelicula);
        });
        sincronizarVistos();
        aplicarVistosGuardados(grilla);
        actualizarProgresoColeccion(colId);
    }

    const seccionDetalle = document.getElementById(`seccion-${colId}`);
    if (seccionDetalle) cambiarSeccion(seccionDetalle);
    if (!col.esContenedor) actualizarProgresoColeccion(colId);

    if (colId === 'it') {
        const btnMuschietti = document.querySelector('.btn-filtro-it[data-tipo="muschietti"]');
        if (btnMuschietti) btnMuschietti.click();
    }
}

// Calcula y pinta el % de películas vistas dentro de una colección
function actualizarProgresoColeccion(colId) {
    const grilla = document.getElementById(`grilla-${colId}`);
    if (!grilla) return;
    const total = grilla.children.length;
    const vistas = grilla.querySelectorAll('.tarjeta-media.vista').length;
    const porcentaje = total > 0 ? Math.round((vistas / total) * 100) : 0;

    const fill = document.getElementById(`barra-${colId}-fill`);
    const texto = document.getElementById(`barra-${colId}-texto`);
    if (fill) fill.style.width = porcentaje + '%';
    if (texto) texto.textContent = porcentaje + '% completado (' + vistas + '/' + total + ')';
}

function actualizarTodasLasColecciones() {
    colecciones.forEach(col => actualizarProgresoColeccion(col.id));
}

// ==========================================
// FUNCIÓN PARA INYECTAR LAS TARJETAS DINÁMICAMENTE
// ==========================================
function renderizarContenido() {
    const seccionesMap = {
        "doomsday": "seccion-doomsday",
        "mcu-infinito": "seccion-mcu-infinito",
        "mcu-multiverso": "seccion-mcu-multiverso",
        "fox-xmen": "seccion-fox-xmen",
        "fox-ff": "seccion-fox-ff",
        "sony-tobey": "seccion-sony-tobey",
        "sony-andrew": "seccion-sony-andrew",
        "sony-ssu": "seccion-sony-ssu",
        "dcu": "seccion-dcu",
        "dceu-snyder": "seccion-dceu-snyder",
        "dceu-principal": "seccion-dceu-principal",
        "the-batman": "seccion-the-batman",
        "joker": "seccion-joker",
        "dc-multiverso": "seccion-dc-multiverso",
        "dc-videojuegos": "seccion-dc-videojuegos",
        "dc-animacion": "seccion-dc-animacion",
        "sw-animacion": "seccion-sw-animacion",
        "sw-episodios": "seccion-sw-episodios",
        "sw-liveaction": "seccion-sw-liveaction",
        "sw-libros": "seccion-sw-libros",
        "sw-videojuegos": "seccion-sw-videojuegos",
        "marvel-videojuegos": "seccion-marvel-videojuegos",
        "dc-personajes": "seccion-dc-personajes",
        "it": "seccion-it",
        "game-of-thrones": "seccion-game-of-thrones"
    };

    listaMedia.forEach(item => {
        let contenedorDestino = null;
        
        if (item.categoria === "arrowverse") {
            contenedorDestino = document.getElementById("grilla-arrowverse");
        } else {
            const secId = seccionesMap[item.categoria];
            if (secId) {
                const sec = document.getElementById(secId);
                if (sec) {
                    contenedorDestino = sec.querySelector('.grilla-biblioteca');
                }
            }
        }

        if (contenedorDestino) {
            let ocultarEstilo = "";
            if (item.categoria === "arrowverse" && item.tipoArrow === "eventos") {
                ocultarEstilo = "display: none;";
            }

            const esVideojuego = item.tipo === "Videojuego";
            const textoInicial = esVideojuego ? "Marcar Jugado" : "Marcar Visto";

            const htmlTarjeta = `
                <div class="tarjeta-media" style="${ocultarEstilo}" data-tier="${item.tier || ''}" data-tipo="${item.tipoArrow || ''}" data-crono="${item.crono || ''}" data-subtipo="${item.subtipo || ''}" data-orden="${item.ordenSalida || ''}" data-accion="${esVideojuego ? 'jugado' : 'visto'}">
                    <img src="${item.poster}" alt="${item.titulo}">
                    <h3>${item.titulo}</h3>
                    <p>${item.tipo}</p>
                    <button class="btn-accion">${textoInicial}</button>
                </div>
            `;
            contenedorDestino.insertAdjacentHTML('beforeend', htmlTarjeta);
        }
    });

    sincronizarVistos();
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarContenido();
    renderizarColecciones();
});

// ==========================================
// SISTEMA DE VISTOS Y BIBLIOTECA
// ==========================================
function sincronizarVistos() {
    document.querySelectorAll('.btn-accion').forEach(boton => {
        const nuevoBoton = boton.cloneNode(true);
        boton.parentNode.replaceChild(nuevoBoton, boton);
    });

    document.querySelectorAll('.btn-accion').forEach(boton => {
        boton.addEventListener('click', function() {
            const tarjeta = this.closest('.tarjeta-media');
            const titulo = tarjeta.querySelector('h3').textContent;
            const esVideojuego = tarjeta.getAttribute('data-accion') === 'jugado';
            const textoPendiente = esVideojuego ? 'Marcar Jugado' : 'Marcar Visto';
            const marcandoComoVisto = this.textContent === textoPendiente;

            document.querySelectorAll('.tarjeta-media').forEach(t => {
                if (t.querySelector('h3').textContent === titulo) {
                    const btn = t.querySelector('.btn-accion');
                    if (!btn) return;
                    const esVJ = t.getAttribute('data-accion') === 'jugado';
                    const txtPendiente = esVJ ? 'Marcar Jugado' : 'Marcar Visto';
                    const txtCompletado = esVJ ? 'Jugado ✓' : 'Visto ✓';
                    if (marcandoComoVisto) {
                        btn.textContent = txtCompletado;
                        btn.style.backgroundColor = "#28a745"; 
                        t.classList.add('vista');
                    } else {
                        btn.textContent = txtPendiente;
                        btn.style.backgroundColor = ""; 
                        t.classList.remove('vista');
                    }
                }
            });
            
            if (!document.getElementById('seccion-biblioteca').classList.contains('oculto')) {
                generarBiblioteca();
            }

            actualizarTodasLasColecciones();
            guardarProgresoUsuario();
        });
    });
}

// Biblioteca Dinámica
const btnBiblioteca = document.getElementById('btn-biblioteca');
const seccionBiblioteca = document.getElementById('seccion-biblioteca');
const grillaBiblioteca = document.getElementById('grilla-mi-biblioteca');

function generarBiblioteca() {
    grillaBiblioteca.innerHTML = '';
    const tarjetasVistas = document.querySelectorAll('main section:not(#seccion-biblioteca) .tarjeta-media.vista');
    const titulosAgregados = new Set();

    tarjetasVistas.forEach(tarjeta => {
        const titulo = tarjeta.querySelector('h3').textContent;
        if (!titulosAgregados.has(titulo)) {
            titulosAgregados.add(titulo);
            grillaBiblioteca.appendChild(tarjeta.cloneNode(true));
        }
    });
    sincronizarVistos();
}

if(btnBiblioteca) {
    btnBiblioteca.addEventListener('click', () => {
        generarBiblioteca();
        cambiarSeccion(seccionBiblioteca);
    });
}

// ==========================================
// BUSCADOR GLOBAL
// ==========================================
const buscadorGlobal = document.getElementById('buscador-global');
const todasLasSeccionesParaBuscador = document.querySelectorAll('main section');

if(buscadorGlobal) {
    buscadorGlobal.addEventListener('input', function() {
        const textoBuscado = this.value.toLowerCase().trim();
        const todasLasTarjetas = document.querySelectorAll('.tarjeta-media');

        if (textoBuscado === '') {
            todasLasSeccionesParaBuscador.forEach(sec => sec.classList.add('oculto'));
            if(seccionActivaActual) seccionActivaActual.classList.remove('oculto');
            todasLasTarjetas.forEach(tarjeta => { tarjeta.style.display = 'flex'; });
            
            // Re-ocultar los eventos del arrowverse si volvemos de buscar
            document.querySelectorAll('#grilla-arrowverse .tarjeta-media').forEach(t => {
                const tipoArr = t.getAttribute('data-tipo');
                const botonActivo = document.querySelector('.btn-filtro-arrowverse.activo');
                if (botonActivo && botonActivo.getAttribute('data-tipo') !== 'cronologico' && botonActivo.getAttribute('data-tipo') !== tipoArr) {
                     t.style.display = 'none';
                }
            });
        } else {
            todasLasSeccionesParaBuscador.forEach(sec => {
                let tieneCoincidencias = false;
                const tarjetasEnSeccion = sec.querySelectorAll('.tarjeta-media');
                tarjetasEnSeccion.forEach(tarjeta => {
                    const titulo = tarjeta.querySelector('h3').textContent.toLowerCase();
                    if (titulo.includes(textoBuscado)) {
                        tarjeta.style.display = 'flex';
                        tieneCoincidencias = true;
                    } else {
                        tarjeta.style.display = 'none';
                    }
                });
                if (tieneCoincidencias) sec.classList.remove('oculto');
                else sec.classList.add('oculto');
            });
        }
    });
}

// ==========================================
// NAVEGACIÓN Y MENÚS
// ==========================================
const todasLasSecciones = document.querySelectorAll('main section');
let seccionActivaActual = document.getElementById('seccion-doomsday');
const menuCategorias = document.getElementById('menu-categorias');
const menuDoomsday = document.getElementById('menu-doomsday');

function cambiarSeccion(seccionNueva) {
    todasLasSecciones.forEach(sec => sec.classList.add('oculto'));
    seccionNueva.classList.remove('oculto');
    seccionActivaActual = seccionNueva;
    if(menuCategorias) menuCategorias.classList.add('oculto');
    if(menuDoomsday) menuDoomsday.classList.add('oculto');
}

const btnDoomsday = document.getElementById('btn-doomsday');
if(btnDoomsday) {
    btnDoomsday.addEventListener('click', (e) => {
        e.stopPropagation();
        menuDoomsday.classList.toggle('oculto');
        if(menuCategorias) menuCategorias.classList.add('oculto');
    });
}

const btnCategorias = document.getElementById('btn-categorias');
if(btnCategorias) {
    btnCategorias.addEventListener('click', (e) => {
        e.stopPropagation();
        menuCategorias.classList.toggle('oculto');
        if(menuDoomsday) menuDoomsday.classList.add('oculto');
    });
}

// Cerrar menús si se hace click afuera
document.addEventListener('click', () => {
    if(menuCategorias) menuCategorias.classList.add('oculto');
    if(menuDoomsday) menuDoomsday.classList.add('oculto');
});

// Desplegables de submenús con stopPropagation para no cerrarlos accidentalmente
document.querySelectorAll('.submenu, .submenu-anidado').forEach(submenu => {
    submenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

['btn-toggle-starwars', 'btn-toggle-marvel', 'btn-toggle-mcu', 'btn-toggle-multiverso', 'btn-toggle-fox', 'btn-toggle-sony', 'btn-toggle-dc', 'btn-toggle-elseworlds', 'btn-toggle-elseworlds-multiverso', 'btn-toggle-dceu'].forEach(id => {
    const btn = document.getElementById(id);
    if(btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const submenuId = id.replace('btn-toggle-', 'submenu-');
            const sub = document.getElementById(submenuId);
            if(sub) sub.classList.toggle('oculto');
        });
    }
});

// Asignación de botones de navegación directos
const botonesNavegacion = [
    { btn: 'btn-explorar', sec: 'seccion-explorar' },
    { btn: 'btn-arrowverse', sec: 'seccion-arrowverse' },
    { btn: 'btn-marvel-videojuegos', sec: 'seccion-marvel-videojuegos' },
    { btn: 'btn-dc-personajes', sec: 'seccion-dc-personajes' },
    { btn: 'btn-mcu-infinito', sec: 'seccion-mcu-infinito' },
    { btn: 'btn-mcu-multiverso', sec: 'seccion-mcu-multiverso' },
    { btn: 'btn-fox-xmen', sec: 'seccion-fox-xmen' },
    { btn: 'btn-fox-ff', sec: 'seccion-fox-ff' },
    { btn: 'btn-sony-tobey', sec: 'seccion-sony-tobey' },
    { btn: 'btn-sony-andrew', sec: 'seccion-sony-andrew' },
    { btn: 'btn-sony-ssu', sec: 'seccion-sony-ssu' },
    { btn: 'btn-dcu', sec: 'seccion-dcu' },
    { btn: 'btn-dceu-snyder', sec: 'seccion-dceu-snyder' },
    { btn: 'btn-dceu-principal', sec: 'seccion-dceu-principal' },
    { btn: 'btn-the-batman', sec: 'seccion-the-batman' },
    { btn: 'btn-joker', sec: 'seccion-joker' },
    { btn: 'btn-explorar-multiverso', sec: 'seccion-dc-multiverso' },
    { btn: 'btn-dc-videojuegos', sec: 'seccion-dc-videojuegos' },
    { btn: 'btn-dc-animacion', sec: 'seccion-dc-animacion' },
    { btn: 'btn-sw-animacion', sec: 'seccion-sw-animacion' },
    { btn: 'btn-sw-episodios', sec: 'seccion-sw-episodios' },
    { btn: 'btn-sw-liveaction', sec: 'seccion-sw-liveaction' },
    { btn: 'btn-sw-libros', sec: 'seccion-sw-libros' },
    { btn: 'btn-sw-videojuegos', sec: 'seccion-sw-videojuegos' }
];

botonesNavegacion.forEach(nav => {
    const boton = document.getElementById(nav.btn);
    if(boton) {
        boton.addEventListener('click', () => {
            const sec = document.getElementById(nav.sec);
            if(sec) cambiarSeccion(sec);
        });
    }
});

// Lógica de MCU Cronológico
const btnCronologico = document.getElementById('btn-mcu-cronologico');
if(btnCronologico) {
    btnCronologico.addEventListener('click', () => {
        const grillaCronologica = document.getElementById('grilla-mcu-cronologico');
        if(grillaCronologica && grillaCronologica.children.length === 0) {
            document.querySelectorAll('#seccion-mcu-infinito .tarjeta-media, #seccion-mcu-multiverso .tarjeta-media').forEach(t => {
                grillaCronologica.appendChild(t.cloneNode(true));
            });
            sincronizarVistos();
        }
        cambiarSeccion(document.getElementById('seccion-mcu-cronologico'));
    });
}

// ==========================================
// FILTROS "MCU: COMPLETO" (Orden de Lanzamiento / Cronológico)
// ==========================================
const botonesFiltroMcu = document.querySelectorAll('.btn-filtro-mcu');
botonesFiltroMcu.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroMcu.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-mcu-cronologico .tarjeta-media');
        const contenedor = document.getElementById('grilla-mcu-cronologico');
        const atributo = tipoElegido === 'cronologico' ? 'data-crono' : 'data-orden';

        const arrayTarjetas = Array.from(tarjetas).sort(
            (a, b) => parseFloat(a.getAttribute(atributo)) - parseFloat(b.getAttribute(atributo))
        );
        arrayTarjetas.forEach(t => contenedor.appendChild(t));
    });
});

// ==========================================
// STAR WARS: HISTORIA COMPLETA (cronológico)
// ==========================================
const btnSwHistoria = document.getElementById('btn-sw-historia');
if(btnSwHistoria) {
    btnSwHistoria.addEventListener('click', () => {
        const grillaHistoria = document.getElementById('grilla-sw-historia');
        if(grillaHistoria && grillaHistoria.children.length === 0) {
            const tarjetasSW = document.querySelectorAll(
                '#seccion-sw-animacion .tarjeta-media, #seccion-sw-episodios .tarjeta-media, #seccion-sw-liveaction .tarjeta-media'
            );
            const titulosVistos = new Set();
            const arrayTarjetas = Array.from(tarjetasSW).filter(t => {
                if (t.classList.contains('tarjeta-coleccion')) return false;
                const titulo = t.querySelector('h3').textContent;
                if (titulosVistos.has(titulo)) return false;
                titulosVistos.add(titulo);
                return true;
            }).sort(
                (a, b) => parseFloat(a.getAttribute('data-crono')) - parseFloat(b.getAttribute('data-crono'))
            );
            arrayTarjetas.forEach(t => grillaHistoria.appendChild(t.cloneNode(true)));
            sincronizarVistos();
        }
        cambiarSeccion(document.getElementById('seccion-sw-historia'));
    });
}

// ==========================================
// FILTROS ROAD TO DOOMSDAY 
// ==========================================
const botonesFiltroDoomsday = document.querySelectorAll('#menu-doomsday .btn-filtro');
botonesFiltroDoomsday.forEach(boton => {
    boton.addEventListener('click', function(e) {
        e.stopPropagation();
        botonesFiltroDoomsday.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const nivelElegido = this.getAttribute('data-filtro');
        const tarjetasDoomsday = document.querySelectorAll('#seccion-doomsday .tarjeta-media');

        tarjetasDoomsday.forEach(tarjeta => {
            const tier = parseInt(tarjeta.getAttribute('data-tier'));
            if (nivelElegido === 'completo') tarjeta.style.display = 'flex'; 
            else if (nivelElegido === 'largo') tarjeta.style.display = (tier <= 3) ? 'flex' : 'none';
            else if (nivelElegido === 'medio') tarjeta.style.display = (tier <= 2) ? 'flex' : 'none';
            else if (nivelElegido === 'corto') tarjeta.style.display = (tier === 1) ? 'flex' : 'none';
        });
        
        cambiarSeccion(document.getElementById('seccion-doomsday'));
        menuDoomsday.classList.add('oculto');
    });
});

// ==========================================
// FILTROS ARROWVERSE
// ==========================================
const botonesFiltroArrow = document.querySelectorAll('.btn-filtro-arrowverse');
botonesFiltroArrow.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroArrow.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetasArrow = document.querySelectorAll('#grilla-arrowverse .tarjeta-media');
        const arrayTarjetas = Array.from(tarjetasArrow);
        const contenedor = document.getElementById('grilla-arrowverse');
        
        if (tipoElegido === 'cronologico') {
            arrayTarjetas.sort((a, b) => parseInt(a.getAttribute('data-crono')) - parseInt(b.getAttribute('data-crono')));
            arrayTarjetas.forEach(t => {
                t.style.display = 'flex';
                contenedor.appendChild(t);
            });
        } else {
            tarjetasArrow.forEach(tarjeta => {
                if (tarjeta.getAttribute('data-tipo') === tipoElegido) {
                    tarjeta.style.display = 'flex';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        }
    });
});

// ==========================================
// FILTROS DCU
// ==========================================
const botonesFiltroDcu = document.querySelectorAll('.btn-filtro-dcu');
botonesFiltroDcu.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroDcu.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo'); 
        const tarjetasDcu = document.querySelectorAll('#seccion-dcu .tarjeta-media');
        
        tarjetasDcu.forEach(tarjeta => {
            const tipoTarjeta = tarjeta.querySelector('p').textContent.toLowerCase(); 
            const tipoNormalizado = tipoTarjeta.replace("película", "pelicula").replace("animación", "animacion");
            
            if (tipoElegido === 'todos' || tipoNormalizado === tipoElegido) {
                tarjeta.style.display = 'flex'; 
            } else {
                tarjeta.style.display = 'none';
            }
        });
    });
});

// ==========================================
// FILTROS DC MULTIVERSO
// ==========================================
const botonesFiltroDcMultiverso = document.querySelectorAll('.btn-filtro-dcmultiverso');
botonesFiltroDcMultiverso.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroDcMultiverso.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-dc-multiverso .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            const subtipo = tarjeta.getAttribute('data-subtipo');
            if (tipoElegido === 'todo' || subtipo === tipoElegido) {
                tarjeta.style.display = 'flex';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    });
});

// ==========================================
// BOTÓN VOLVER (Colecciones)
// ==========================================
const btnVolverTomorrowverse = document.getElementById('btn-volver-tomorrowverse');
if(btnVolverTomorrowverse) {
    btnVolverTomorrowverse.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-animacion'));
    });
}

const btnVolverDcamu = document.getElementById('btn-volver-dcamu');
if(btnVolverDcamu) {
    btnVolverDcamu.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-animacion'));
    });
}

const btnVolverBen10 = document.getElementById('btn-volver-ben10');
if(btnVolverBen10) {
    btnVolverBen10.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

const btnVolverLego = document.getElementById('btn-volver-lego');
if(btnVolverLego) {
    btnVolverLego.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

const btnVolverIt = document.getElementById('btn-volver-it');
if(btnVolverIt) {
    btnVolverIt.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

const btnVolverActores = document.getElementById('btn-volver-actores');
if(btnVolverActores) {
    btnVolverActores.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-explorar'));
    });
}

const btnVolverDirectores = document.getElementById('btn-volver-directores');
if(btnVolverDirectores) {
    btnVolverDirectores.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-explorar'));
    });
}

const btnVolverFranquicias = document.getElementById('btn-volver-franquicias');
if(btnVolverFranquicias) {
    btnVolverFranquicias.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-explorar'));
    });
}

const btnVolverChristopherNolan = document.getElementById('btn-volver-christopher-nolan');
if(btnVolverChristopherNolan) {
    btnVolverChristopherNolan.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-directores'));
    });
}

const btnVolverSupermanHenryCavill = document.getElementById('btn-volver-superman-henry-cavill');
if(btnVolverSupermanHenryCavill) {
    btnVolverSupermanHenryCavill.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-personajes'));
    });
}

const btnVolverWonderWomanGalGadot = document.getElementById('btn-volver-wonder-woman-gal-gadot');
if(btnVolverWonderWomanGalGadot) {
    btnVolverWonderWomanGalGadot.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-personajes'));
    });
}

const btnVolverLegoDc = document.getElementById('btn-volver-lego-dc');
if(btnVolverLegoDc) {
    btnVolverLegoDc.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-videojuegos'));
    });
}

const btnVolverLegoMarvel = document.getElementById('btn-volver-lego-marvel');
if(btnVolverLegoMarvel) {
    btnVolverLegoMarvel.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-marvel-videojuegos'));
    });
}

const btnVolverGameOfThrones = document.getElementById('btn-volver-game-of-thrones');
if(btnVolverGameOfThrones) {
    btnVolverGameOfThrones.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

const btnVolverGretaGerwig = document.getElementById('btn-volver-greta-gerwig');
if(btnVolverGretaGerwig) {
    btnVolverGretaGerwig.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-directores'));
    });
}

const btnVolverArkhamverse = document.getElementById('btn-volver-arkhamverse');
if(btnVolverArkhamverse) {
    btnVolverArkhamverse.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-videojuegos'));
    });
}

const btnVolverPeliculasIndependientes = document.getElementById('btn-volver-peliculas-independientes');
if(btnVolverPeliculasIndependientes) {
    btnVolverPeliculasIndependientes.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-animacion'));
    });
}

const btnVolverInjustice = document.getElementById('btn-volver-injustice');
if(btnVolverInjustice) {
    btnVolverInjustice.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-videojuegos'));
    });
}

const btnVolverLegoVideojuegos = document.getElementById('btn-volver-lego-videojuegos');
if(btnVolverLegoVideojuegos) {
    btnVolverLegoVideojuegos.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-lego'));
    });
}

const btnVolverLegoAudiovisual = document.getElementById('btn-volver-lego-audiovisual');
if(btnVolverLegoAudiovisual) {
    btnVolverLegoAudiovisual.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-lego'));
    });
}

const btnVolverInsomniac = document.getElementById('btn-volver-insomniac');
if(btnVolverInsomniac) {
    btnVolverInsomniac.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-marvel-videojuegos'));
    });
}

const btnVolverDragonball = document.getElementById('btn-volver-dragonball');
if(btnVolverDragonball) {
    btnVolverDragonball.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

[
    'btn-volver-dragonball-z',
    'btn-volver-dragonball-super',
    'btn-volver-dragonball-historia-canon',
    'btn-volver-dragonball-videojuegos',
    'btn-volver-dragonball-todo'
].forEach(id => {
    const btn = document.getElementById(id);
    if(btn) {
        btn.addEventListener('click', () => {
            cambiarSeccion(document.getElementById('seccion-dragonball'));
        });
    }
});

const btnVolverSwVisions = document.getElementById('btn-volver-sw-visions');
if(btnVolverSwVisions) {
    btnVolverSwVisions.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-sw-animacion'));
    });
}

const btnVolverBatmanBenAffleck = document.getElementById('btn-volver-batman-ben-affleck');
if(btnVolverBatmanBenAffleck) {
    btnVolverBatmanBenAffleck.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-personajes'));
    });
}

[
    'btn-volver-ben10-original',
    'btn-volver-ben10-alienforce',
    'btn-volver-ben10-ultimatealien',
    'btn-volver-ben10-omniverse'
].forEach(id => {
    const btn = document.getElementById(id);
    if(btn) {
        btn.addEventListener('click', () => {
            cambiarSeccion(document.getElementById('seccion-ben10'));
        });
    }
});

// ==========================================
// FILTROS "IT"
// ==========================================
const botonesFiltroIt = document.querySelectorAll('.btn-filtro-it');
botonesFiltroIt.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroIt.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-it .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            const subtipo = tarjeta.getAttribute('data-subtipo');
            if (tipoElegido === 'todo' || subtipo === tipoElegido) {
                tarjeta.style.display = 'flex';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    });
});

// ==========================================
// FILTROS "GAME OF THRONES" (Orden de Salida / Cronológico)
// ==========================================
const botonesFiltroGot = document.querySelectorAll('.btn-filtro-got');
botonesFiltroGot.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroGot.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-game-of-thrones .tarjeta-media');
        const contenedor = document.getElementById('grilla-game-of-thrones');
        const atributo = tipoElegido === 'cronologico' ? 'data-crono' : 'data-orden';

        const arrayTarjetas = Array.from(tarjetas).sort(
            (a, b) => parseFloat(a.getAttribute(atributo)) - parseFloat(b.getAttribute(atributo))
        );
        arrayTarjetas.forEach(t => contenedor.appendChild(t));
    });
});

// ==========================================
// FIREBASE: CONFIGURACIÓN Y AUTENTICACIÓN
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyB-MNhsXNVHQeHeBV8XmmFYEavpliNCwYc",
  authDomain: "libro-de-los-vishanti.firebaseapp.com",
  databaseURL: "https://libro-de-los-vishanti-default-rtdb.firebaseio.com",
  projectId: "libro-de-los-vishanti",
  storageBucket: "libro-de-los-vishanti.firebasestorage.app",
  messagingSenderId: "247894318676",
  appId: "1:247894318676:web:e13470aa8f813de2bc57c1"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let usuarioActual = null;
let huboSesionAntes = false;
let titulosVistosGuardados = new Set();

const modalLogin = document.getElementById('modal-login');
const btnLoginModal = document.getElementById('btn-login-modal');
const closeModal = document.getElementById('close-modal');
const btnCrearCuenta = document.getElementById('btn-crear-cuenta');
const btnIniciarSesion = document.getElementById('btn-iniciar-sesion');
const mensajeLogin = document.getElementById('mensaje-login');

function mostrarMensajeLogin(texto) {
    if (mensajeLogin) mensajeLogin.textContent = texto;
}

function traducirErrorFirebase(err) {
    const c = err.code || '';
    if (c.includes('email-already-in-use')) return 'Ese correo ya tiene una cuenta. Probá iniciar sesión.';
    if (c.includes('invalid-email')) return 'El correo no es válido.';
    if (c.includes('weak-password')) return 'La contraseña necesita al menos 6 caracteres.';
    if (c.includes('user-not-found') || c.includes('wrong-password') || c.includes('invalid-credential')) return 'Correo o contraseña incorrectos.';
    return 'Ocurrió un error, intentá de nuevo.';
}

if(btnLoginModal) {
    btnLoginModal.addEventListener('click', () => {
        if (usuarioActual) {
            if (confirm('¿Cerrar sesión de ' + usuarioActual.email + '?')) {
                auth.signOut();
            }
        } else {
            mostrarMensajeLogin('');
            modalLogin.classList.remove('oculto');
        }
    });
}
if(closeModal) closeModal.addEventListener('click', () => modalLogin.classList.add('oculto'));

if(btnCrearCuenta) {
    btnCrearCuenta.addEventListener('click', () => {
        const email = document.getElementById('email-login').value.trim();
        const pass = document.getElementById('password-login').value;
        if (!email || !pass) { mostrarMensajeLogin('Completá correo y contraseña.'); return; }
        mostrarMensajeLogin('Creando cuenta...');
        auth.createUserWithEmailAndPassword(email, pass)
            .catch(err => mostrarMensajeLogin(traducirErrorFirebase(err)));
    });
}

if(btnIniciarSesion) {
    btnIniciarSesion.addEventListener('click', () => {
        const email = document.getElementById('email-login').value.trim();
        const pass = document.getElementById('password-login').value;
        if (!email || !pass) { mostrarMensajeLogin('Completá correo y contraseña.'); return; }
        mostrarMensajeLogin('Iniciando sesión...');
        auth.signInWithEmailAndPassword(email, pass)
            .catch(err => mostrarMensajeLogin(traducirErrorFirebase(err)));
    });
}

auth.onAuthStateChanged(user => {
    usuarioActual = user;
    if (user) {
        huboSesionAntes = true;
        if (btnLoginModal) btnLoginModal.textContent = '👤 ' + user.email;
        if (modalLogin) modalLogin.classList.add('oculto');
        cargarProgresoUsuario();
    } else {
        if (btnLoginModal) btnLoginModal.textContent = '👤 Cuenta / Registro';
        if (huboSesionAntes) location.reload();
    }
});

// ==========================================
// FIREBASE: SINCRONIZAR PROGRESO (VISTOS/JUGADOS)
// ==========================================
function aplicarVistosGuardados(raiz) {
    raiz.querySelectorAll('.tarjeta-media').forEach(t => {
        const btn = t.querySelector('.btn-accion');
        if (!btn) return;
        const titulo = t.querySelector('h3').textContent;
        if (titulosVistosGuardados.has(titulo) && !t.classList.contains('vista')) {
            const esVJ = t.getAttribute('data-accion') === 'jugado';
            btn.textContent = esVJ ? 'Jugado ✓' : 'Visto ✓';
            btn.style.backgroundColor = '#28a745';
            t.classList.add('vista');
        }
    });
}

function cargarProgresoUsuario() {
    if (!usuarioActual) return;
    db.collection('usuarios').doc(usuarioActual.uid).get().then(doc => {
        titulosVistosGuardados = new Set(doc.exists ? (doc.data().vistos || []) : []);
        aplicarVistosGuardados(document);
        actualizarTodasLasColecciones();
    }).catch(err => console.error('Error cargando progreso:', err));
}

function guardarProgresoUsuario() {
    if (!usuarioActual) return;
    const titulos = new Set();
    document.querySelectorAll('.tarjeta-media.vista').forEach(t => {
        titulos.add(t.querySelector('h3').textContent);
    });
    titulosVistosGuardados = titulos;
    db.collection('usuarios').doc(usuarioActual.uid).set({
        vistos: Array.from(titulos)
    }, { merge: true }).catch(err => console.error('Error guardando progreso:', err));
}
