const listaMedia = [
    // --- ROAD TO DOOMSDAY (ordenado por fecha de estreno) ---
    { titulo: "X-Men (2000)", categoria: "doomsday", tier: 3, tipo: "Película", poster: "https://i.pinimg.com/736x/f9/7c/3f/f97c3f94f67ca6fd6ae7ad0470d6d553.jpg" },
    { titulo: "X2: X-Men United", categoria: "doomsday", tier: 3, tipo: "Película", poster: "https://m.media-amazon.com/images/I/714SAYP7EQL.AC_UF894,1000_QL80.jpg" },
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
    { titulo: "Spider-Man: No Way Home", categoria: "doomsday", tier: 2, tipo: "Película", poster: "https://www.cinemascomics.com/wp-content/uploads/2022/01/poster-Spider-man-no-way-home.jpg" },
    { titulo: "Dr. Strange: Multiverse of Madness", categoria: "doomsday", tier: 1, tipo: "Película", poster: "https://img.buzzfeed.com/buzzfeed-static/static/2022-02/18/13/asset/e9954361afcd/sub-buzz-772-1645190837-7.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto" },
    { titulo: "Ms. Marvel", categoria: "doomsday", tier: 3, tipo: "Serie", poster: "https://lumiere-a.akamaihd.net/v1/images/ms_979c8372.jpeg" },
    { titulo: "Thor: Love and Thunder", categoria: "doomsday", tier: 2, tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/fb83262af061c44d518c601e3956c3b4_2764x4096_e4f0eee2.jpeg" },
    { titulo: "Black Panther: Wakanda Forever", categoria: "doomsday", tier: 2, tipo: "Película", poster: "https://artofthemovies.co.uk/cdn/shop/products/IMG_0184-338579.jpg?v=1668148930&width=900" },
    { titulo: "Ant-Man and The Wasp: Quantumania", categoria: "doomsday", tier: 2, tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/antman_b843a521.jpeg?region=0,0,658,898" },
    { titulo: "Guardians of the Galaxy Vol. 3", categoria: "doomsday", tier: 3, tipo: "Película", poster: "https://assets-prd.ignimgs.com/2022/12/01/guardians-of-the-galaxy-vol-3-1669932411159.jfif" },
    { titulo: "Loki (Temporada 2)", categoria: "doomsday", tier: 1, tipo: "Serie", poster: "https://preview.redd.it/official-poster-for-loki-season-2-v0-mjczxxkptafb1.jpg?auto=webp&s=b52be74ed745f4c481074ffd739feb43c7c0214f" },
    { titulo: "The Marvels", categoria: "doomsday", tier: 2, tipo: "Película", poster: "https://cdn.marvel.com/content/2x/captain_marvel_2.webp" },
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
    { titulo: "Daredevil: Born Again", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 46, crono: 47, poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/7/7f/Daredevil_Born_Again_Cracks_Tall_Poster.jpg/revision/latest/scale-to-width-down/1200?cb=20250416124716" },
    { titulo: "Thunderbolts*", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 47, crono: 48, poster: "https://m.media-amazon.com/images/I/71Y2ZfgT+4L.jpg" },
    { titulo: "The Fantastic Four: First Steps", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 48, crono: 51, poster: "https://brainstomping.com/wp-content/uploads/2025/07/fantastic-four-first-steps-primeros-pasos-cuatro-fantasticos-poster-marvel-mcu.jpg" },
    { titulo: "Ojos de Wakanda", categoria: "mcu-multiverso", tipo: "Serie (Antología)", ordenSalida: 49, crono: 1, poster: "https://cdn.marvel.com/content/2x/eyesofwakanda_lob_crd_02.jpg" },
    { titulo: "Wonder Man", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 50, crono: 49, poster: "https://cdn.marvel.com/content/2x/wonderman_lob_crd_03.jpg" },
    { titulo: "Punisher: One Last Kill", categoria: "mcu-multiverso", tipo: "Serie", ordenSalida: 51, crono: 50, poster: "https://cdn.marvel.com/content/2x/thepunisheronelastkill_lob_crd_01.jpg" },
    { titulo: "Spider-Man: Brand New Day", categoria: "mcu-multiverso", tipo: "Película", ordenSalida: 52, crono: 52, poster: "https://m.media-amazon.com/images/M/MV5BOWNjYWM3NWItOGE0ZS00MWRjLThiZWEtYjc4ZmNmMmU5ZTVmXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },

    // --- ARROWVERSE ---
    // "Arrow" ahora es una ficha explorable con sus 8 temporadas (ver colecciones)
    // "The Flash" ahora es una ficha explorable con sus 9 temporadas (ver colecciones)
    { titulo: "Flash vs Arrow", categoria: "arrowverse", tipoArrow: "eventos", crono: 5, tipo: "Evento", poster: "https://m.media-amazon.com/images/I/51VWso60-0L._AC_UF894,1000_QL80_.jpg" },
    // "Supergirl" ahora es una ficha explorable con sus 6 temporadas (ver colecciones)
    { titulo: "Legends", categoria: "arrowverse", tipoArrow: "eventos", crono: 9, tipo: "Evento", poster: "https://i.pinimg.com/736x/b3/1a/41/b31a41a98c647c357a3ff53790666151.jpg" },
    // "DC's Legends of Tomorrow" ahora es una ficha explorable con sus 5 temporadas (ver colecciones)
    { titulo: "Invasion!", categoria: "arrowverse", tipoArrow: "eventos", crono: 15, tipo: "Evento", poster: "https://cdn.hmv.com/r/w-640/hmv/files/d8/d8360880-fc10-4b55-a726-2f333d250df5.jpg" },
    { titulo: "Duet!", categoria: "arrowverse", tipoArrow: "eventos", crono: 16, tipo: "Evento", poster: "https://mundosuperman.com/wp-content/uploads/2017/03/53990.jpg" },
    { titulo: "Crisis on Earth-X", categoria: "arrowverse", tipoArrow: "eventos", crono: 21, tipo: "Evento", poster: "https://m.media-amazon.com/images/I/81tiQIJIhjL.jpg" },
    // "Black Lightning" ahora es una ficha explorable con sus 4 temporadas (ver colecciones)
    { titulo: "Elseworlds", categoria: "arrowverse", tipoArrow: "eventos", crono: 27, tipo: "Evento", poster: "https://imgix.bustle.com/inverse/7b/df/96/f8/9724/4533/a086/c46cb1152e80/the-poster-for-elseworlds.jpeg?w=262&h=328&fit=crop&crop=faces&dpr=2" },
    // "Batwoman" ahora es una ficha explorable con sus 3 temporadas (ver colecciones)
    { titulo: "Crisis on Infinite Earths", categoria: "arrowverse", tipoArrow: "eventos", crono: 32, tipo: "Evento", poster: "https://therealstanlee.com/main/wp-content/uploads/2019/11/EJ_vMjOUYAYQ2MZ-min-819x1024.jpg" },
    { titulo: "Armageddon", categoria: "arrowverse", tipoArrow: "eventos", crono: 37, tipo: "Evento", poster: "https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/11/The-Flash-Armageddon.jpg?resize=1280%2C1600&ssl=1" },

    // --- FOX: X-MEN ---
    { titulo: "X-Men (2000)", categoria: "fox-xmen", tipo: "Película", poster: "https://i.pinimg.com/736x/f9/7c/3f/f97c3f94f67ca6fd6ae7ad0470d6d553.jpg" },
    { titulo: "X2: X-Men United", categoria: "fox-xmen", tipo: "Película", poster: "https://m.media-amazon.com/images/I/714SAYP7EQL.AC_UF894,1000_QL80.jpg" },
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
    { titulo: "Fantastic Four (2005)", categoria: "fox-ff", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71nlKnBmb4L.jpg" },
    { titulo: "Fantastic Four: Silver Surfer", categoria: "fox-ff", subtipo: "2000", tipo: "Película", poster: "https://imaginus.ca/cdn/shop/products/A1432F_4e5006fc-9bff-4cc9-8ded-ec5b3c1ff9e4_1604x.jpg?v=1654713321" },
    { titulo: "Cuatro Fantásticos (2015)", categoria: "fox-ff", subtipo: "2010", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/fantastic4_2015_stylek_teaser_original_filM-art_5000x.jpg?v=1627545303" },

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
    // "Stargirl" ahora es una ficha explorable con sus 3 temporadas (ver colecciones)
    { titulo: "Titans", categoria: "dc-multiverso", subtipo: "liveaction", tierra: 9, tipo: "Serie - Tierra 9", poster: "https://image.tmdb.org/t/p/original/awneRTOXqumB1fOPoUIXjUqksh5.jpg" },
    { titulo: "Green Lantern", categoria: "dc-multiverso", subtipo: "liveaction", tierra: 12, tipo: "Película - Tierra 12", poster: "https://m.media-amazon.com/images/I/71-ckdWvqfL.jpg" },
    { titulo: "Swamp Thing", categoria: "dc-multiverso", subtipo: "liveaction", tierra: 19, tipo: "Serie - Tierra 19", poster: "https://m.media-amazon.com/images/M/MV5BMGQzYzgxZWQtZmI3YS00YTIzLTk4NmQtMGE0YTdiNGNlZjYxXkEyXkFqcGc@.V1.jpg" },

    // --- GAME OF THRONES (con doble orden: salida / cronológico) ---
    // "Game of Thrones" y "House of the Dragon" ahora son fichas explorables (ver colecciones)
    { titulo: "A Knight of the Seven Kingdoms", categoria: "game-of-thrones", tipo: "Serie", ordenSalida: 3, crono: 2, poster: "https://image.tmdb.org/t/p/original/mBDO4PLEiFaBrj4RO0mWdW6tSUs.jpg" },

    // --- ASSASSIN'S CREED (con doble orden: lanzamiento / cronológico histórico) ---
    { titulo: "Assassin's Creed", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 1, crono: 5, poster: "https://m.media-amazon.com/images/M/MV5BNmI1NDQ4ZjYtZmFjMy00MjZkLTkyNzktYjE2NzU4MmVmNTg2XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Assassin's Creed II", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 2, crono: 6, poster: "https://cdn1.epicgames.com/salesEvent/salesEvent/AC2_GameName_Store_Portrait_1200x1600_1200x1600-2c5e000213988c5dde375bb2602e9986" },
    { titulo: "Assassin's Creed: Brotherhood", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 3, crono: 7, poster: "https://images.g2a.com/323x433/1x1x1/assassins-creed-brotherhood-p10000043255/dc54b5ec98ab409c9c9332e3" },
    { titulo: "Assassin's Creed: Revelations", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 4, crono: 8, poster: "https://m.media-amazon.com/images/M/MV5BOWM3YjRkM2MtZmU3My00OTc4LTg0MDMtMmEzYjc3NWNjMjIxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Assassin's Creed III", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 5, crono: 12, poster: "https://static.posters.cz/image/1300/12811.jpg" },
    { titulo: "Assassin's Creed IV: Black Flag", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 6, crono: 10, poster: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/4c4b7612856287.5626e31d6576f.jpg" },
    { titulo: "Assassin's Creed: Rogue", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 7, crono: 11, poster: "https://images.gog.com/ec9bdb99d06eb876d115146abd005e9fa18a586f69efcc87dd874e483317e941_glx_vertical_cover.webp?namespace=gamesdb" },
    { titulo: "Assassin's Creed: Unity", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 8, crono: 13, poster: "https://m.media-amazon.com/images/M/MV5BMDY1NmE5YzgtYTRiYS00ZDVlLTkxNDktYzU2YzIyZWE3NjQ2XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Assassin's Creed: Syndicate", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 9, crono: 14, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzNM-CgSDkidzczZOhBHxIkV4aJwbZG1Z-42nX5F8Hb-XuMCx05_cZT8dl&s=10" },
    { titulo: "Assassin's Creed: Origins", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 10, crono: 2, poster: "https://m.media-amazon.com/images/I/A1Lc+0V8SfL.jpg" },
    { titulo: "Assassin's Creed: Odyssey", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 11, crono: 1, poster: "https://m.media-amazon.com/images/I/81c8SRTpiIL.jpg" },
    { titulo: "Assassin's Creed: Valhalla", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 12, crono: 4, poster: "https://static.posters.cz/image/1300/97796.jpg" },
    { titulo: "Assassin's Creed: Mirage", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 13, crono: 3, poster: "https://m.media-amazon.com/images/I/61wgujVHwNL.jpg" },
    { titulo: "Assassin's Creed: Shadows", categoria: "assassins-creed", tipo: "Videojuego", ordenSalida: 14, crono: 9, poster: "https://pics.filmaffinity.com/Assassin_s_Creed_Shadows-438700494-large.jpg" },

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
    { titulo: "The Clone Wars (Serie)", categoria: "sw-animacion", crono: 5, tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/e1nWfnnCVqxS2LeTO3dwGyAsG2V.jpg" },
    // "The Bad Batch" ahora es una ficha explorable con sus 3 temporadas (ver colecciones)
    { titulo: "Star Wars: Tales of the Underworld", categoria: "sw-animacion", crono: 7.5, tipo: "Serie (Antología)", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNFK8wlF1QPEfZkNraIHz1OgEvm4VhlXvAJMCN8uV_9r5gUdFFbIirvigX&s=10" },
    { titulo: "Maul: Shadow Lord", categoria: "sw-animacion", crono: 9, tipo: "Audiodrama", poster: "https://cdn.europosters.eu/image/1300/307057.jpg" },
    { titulo: "Star Wars Rebels", categoria: "sw-animacion", crono: 11, tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/eLrScs6Bs26JMcS8hiZhf7YRROr.jpg" },
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
    { titulo: "It: Bienvenidos a Derry", categoria: "it", subtipo: "muschietti", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/nyy3BITeIjviv6PFIXtqvc8i6xi.jpg" },
    { titulo: "It (1990)", categoria: "it", subtipo: "clasico", tipo: "Miniserie", poster: "https://m.media-amazon.com/images/M/MV5BZDFhODExOTctNTFkZS00NjE1LWE2MWMtY2Q1ZThhMGY5NjJkXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },

    // --- DISNEY ANIMATION (con filtros por década) ---
    { titulo: "Raya y El Último Dragón", categoria: "disney-animation", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/5nVhgCzxKbK47OLIKxCR1syulOn.jpg" },
    { titulo: "Encanto", categoria: "disney-animation", subtipo: "2020", tipo: "Película", poster: "https://static.posters.cz/image/1300/120006.jpg" },
    { titulo: "Un Mundo Extraño", categoria: "disney-animation", subtipo: "2020", tipo: "Película", poster: "https://i.pinimg.com/736x/ea/c5/da/eac5da7bd43097e5288adad835ec28cc.jpg" },
    { titulo: "Wish", categoria: "disney-animation", subtipo: "2020", tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/screenshot_2023-04-27_at_14_930d2ffc.png?region=0,0,986,1458" },
    { titulo: "Moana 2", categoria: "disney-animation", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg" },
    { titulo: "Zootopia 2", categoria: "disney-animation", subtipo: "2020", tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/image002_ad18240b.jpeg?region=0,0,770,1100" },
    { titulo: "Enredados", categoria: "disney-animation", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71b8JiX-tWL.AC_UF894,1000_QL80.jpg" },
    { titulo: "Winnie the Pooh", categoria: "disney-animation", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BODg2MGEyODMtNDJhNy00ZmNlLWEzYzMtYzc0NzM1OTQxNTgzXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Ralph el Demoledor", categoria: "disney-animation", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNzMxNTExOTkyMF5BMl5BanBnXkFtZTcwMzEyNDc0OA@@.V1.jpg" },
    { titulo: "Frozen: Una Aventura Congelada", categoria: "disney-animation", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81UoBlyJ2zL.AC_UF894,1000_QL80.jpg" },
    { titulo: "Grandes Héroes", categoria: "disney-animation", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61DJ8d3PtcL.AC_UF894,1000_QL80.jpg" },
    { titulo: "Zootopia", categoria: "disney-animation", subtipo: "2010", tipo: "Película", poster: "https://cinefreaksargentina.wordpress.com/wp-content/uploads/2015/09/af-zoot.jpg" },
    { titulo: "Moana: Un Mar de Aventuras", categoria: "disney-animation", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81rjqvHFtkL.AC_UF894,1000_QL80.jpg" },
    { titulo: "Wifi Ralph", categoria: "disney-animation", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMjQ5NDQyMDc2OF5BMl5BanBnXkFtZTgwMjMwNDM5NDM@.V1.jpg" },
    { titulo: "Frozen II", categoria: "disney-animation", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/zEYIA5Opq9zFowZofeWJRmxVI3J.jpg" },
    { titulo: "Dinosaurio", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVY8nt015k4A0LgBmSq35yfEN_R9sg-btsSN34S5TNobwHfSKSQtzx92KC&s=10" },
    { titulo: "Las Locuras del Emperador", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/wwbgkXQBEKtnyIJapk6gUgWkVw8.jpg" },
    { titulo: "Atlantis: El Imperio Perdido", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/8fUEFPUTF7kBMuKPiSQHxPvd8EZ.jpg" },
    { titulo: "Lilo & Stitch", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://static.posters.cz/image/750/120005.jpg" },
    { titulo: "El Planeta del Tesoro", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://i.pinimg.com/736x/09/85/4d/09854d53afdd694486bb6bd16f4cf9fe.jpg" },
    { titulo: "Tierra de Osos", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/328973.jpg" },
    { titulo: "Vacas Vaqueras", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/p6xPtCH7Bph1PStv9AjTgikspEA.jpg" },
    { titulo: "Chicken Little", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/ChickenLittle_2005_teaser_original_film_art_5000x.jpg?v=1585744983" },
    { titulo: "La Familia del Futuro", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/naya0zF4kT401Sx15AtwB9vpcJr.jpg" },
    { titulo: "Bolt: Un Perro Fuera de Serie", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://i.blogs.es/9fb446/bolt_ver2/450_1000.jpg" },
    { titulo: "La Princesa y el Sapo", categoria: "disney-animation", subtipo: "2000", tipo: "Película", poster: "https://i.pinimg.com/736x/15/ea/11/15ea11588db2f9e23aac9f747b63a19f.jpg" },
    { titulo: "Bernardo y Bianca en Cangurolandia", categoria: "disney-animation", subtipo: "1990", tipo: "Película", poster: "https://i.pinimg.com/736x/48/ac/04/48ac04581d24fc86c0439c2105b817dd.jpg" },
    { titulo: "La Bella y La Bestia", categoria: "disney-animation", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/7oCAPOphDKpIaxTrnukmDrZ8XKD.jpg" },
    { titulo: "Aladdín", categoria: "disney-animation", subtipo: "1990", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/aladdin_1992_lamp_style_original_film_art_f_1200x.jpg?v=1562976486" },
    { titulo: "El Rey León", categoria: "disney-animation", subtipo: "1990", tipo: "Película", poster: "https://i.pinimg.com/736x/f6/77/40/f6774073f35f5a2749fba406a4e8d99d.jpg" },
    { titulo: "Pocahontas", categoria: "disney-animation", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71fk6ri1K+L._AC_UF894,1000_QL80_.jpg" },
    { titulo: "El Jorobado de Notre Dame", categoria: "disney-animation", subtipo: "1990", tipo: "Película", poster: "https://i.pinimg.com/736x/af/07/35/af0735c9baa799f12e311a82d2192b01.jpg" },
    { titulo: "Hércules", categoria: "disney-animation", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71NtQTeIYfL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Mulán", categoria: "disney-animation", subtipo: "1990", tipo: "Película", poster: "https://i.pinimg.com/736x/36/1f/ca/361fca716b79305481eeff561c14ba14.jpg" },
    { titulo: "Tarzán", categoria: "disney-animation", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81fdtHUyAkL.jpg" },
    { titulo: "Fantasía 2000", categoria: "disney-animation", subtipo: "1990", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/fantasia_2000_1999_advance_original_film_art_5000x.jpg?v=1603470183" },
    { titulo: "El Zorro y el Sabueso", categoria: "disney-animation", subtipo: "1980", tipo: "Película", poster: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/eeb34d36199575.57137fdca5c2c.png" },
    { titulo: "El Caldero Mágico", categoria: "disney-animation", subtipo: "1980", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BODJkNGM2ZTUtODYxMC00YWJkLTg2OTMtYWVjNGRlYjg3NDljXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Policías y Ratones", categoria: "disney-animation", subtipo: "1980", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/6hZAOLb9HdPfqqvPpm5GD2BN7fT.jpg" },
    { titulo: "Oliver y su Pandilla", categoria: "disney-animation", subtipo: "1980", tipo: "Película", poster: "https://vegalleries.com/sites/default/files/art/product_images/manual/2024/jun22249.jpg" },
    { titulo: "La Sirenita", categoria: "disney-animation", subtipo: "1980", tipo: "Película", poster: "https://cdn.posteritati.com/posters/000/000/009/543/the-little-mermaid-md-web.jpg" },
    { titulo: "Blancanieves y los Siete Enanitos", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/jPBIm2Kileddn0Vj8jV2JBQlAKZ.jpg" },
    { titulo: "Pinocho", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://postercity.com.ar/wp-content/uploads/2019/07/Pinocchio-Disney-low.jpg" },
    { titulo: "Fantasía", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/files/Fantasia_R1985_original_film_art_5000x.webp?v=1750797193" },
    { titulo: "Dumbo", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://static.posters.cz/image/1300/71873.jpg" },
    { titulo: "Bambi", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81SMwA+ARhL.AC_UF894,1000_QL80.jpg" },
    { titulo: "Saludos Amigos", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://i.ebayimg.com/images/g/AIwAAOSwbbFmKuVq/s-l1200.jpg" },
    { titulo: "Los Tres Caballeros", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://i.pinimg.com/736x/e3/a6/d8/e3a6d84963f49fb36a85670a1518f507.jpg" },
    { titulo: "Música Maestro", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://i.pinimg.com/736x/f0/51/57/f051576d3da8927bdf165c6bbb2b9d3e.jpg" },
    { titulo: "Diversión y Fantasía", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZGU3NDU5YTYtYWI1NC00YmM2LWE5NDItNGNmMjAwYjEwZTdiXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Tiempo de Melodía", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://static.wikia.nocookie.net/disneyypixar/images/a/a4/Melody_Time.jpg/revision/latest/scale-to-width-down/1200?cb=20250426061039&path-prefix=es" },
    { titulo: "Las Aventuras de Ichabod y el Sr. Sapo", categoria: "disney-animation", subtipo: "1930-1940", tipo: "Película", poster: "https://m.media-amazon.com/images/S/pv-target-images/59d01ca68220e6738915efb4eee84add3339039979df0ecbae24603a19a5b7b9.jpg" },
    { titulo: "Cenicienta", categoria: "disney-animation", subtipo: "1950", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/cinderella_1950_R73_original_film_art_5000x.jpg?v=1562540161" },
    { titulo: "Alicia en el País de las Maravillas", categoria: "disney-animation", subtipo: "1950", tipo: "Película", poster: "https://i.pinimg.com/736x/3b/f5/82/3bf5825cc4271cae154247b9b1b5ed71.jpg" },
    { titulo: "Peter Pan", categoria: "disney-animation", subtipo: "1950", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71LwwUyNAoL.AC_UF894,1000_QL80.jpg" },
    { titulo: "La Dama y el Vagabundo", categoria: "disney-animation", subtipo: "1950", tipo: "Película", poster: "https://www.posterpalace.com/cdn/shop/products/walt-disneys-lady-and-the-tramp-us-one-sheet-1955-original-release-posterpalacecom-859493.jpg?v=1671389343" },
    { titulo: "La Bella Durmiente", categoria: "disney-animation", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/n3pxoMDDxp10c1smgbDzW4bwlzq.jpg" },
    { titulo: "101 Dálmatas", categoria: "disney-animation", subtipo: "1960", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81L6aMRis1L.AC_UF894,1000_QL80.jpg" },
    { titulo: "La Espada en la Piedra", categoria: "disney-animation", subtipo: "1960", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/c1H3jTJUZLrprxOMH1w8cQD1PBl.jpg" },
    { titulo: "El Libro de la Selva", categoria: "disney-animation", subtipo: "1960", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81JzIeOhnaL.jpg" },
    { titulo: "Los Aristogatos", categoria: "disney-animation", subtipo: "1970", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/s9DsxlbVE1HvHnCz50GdHDBeZRy.jpg" },
    { titulo: "Robin Hood", categoria: "disney-animation", subtipo: "1970", tipo: "Película", poster: "https://m.media-amazon.com/images/I/51p-ieBYgUL.jpg" },
    { titulo: "Las Muchas Aventuras de Winnie the Pooh", categoria: "disney-animation", subtipo: "1970", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61OzdKMZm6L.AC_UF894,1000_QL80.jpg" },
    { titulo: "Bernardo y Bianca", categoria: "disney-animation", subtipo: "1970", tipo: "Película", poster: "https://static.wikia.nocookie.net/yatoroba/images/f/f5/Bernardo_y_Bianca_DVD.jpg/revision/latest?cb=20250818234942&path-prefix=es" },

    // --- SITCOMS ---
    { titulo: "Friends", categoria: "sitcoms", tipo: "Serie", poster: "https://www.yourdecoration.com/cdn/shop/products/Poster-Friends-In-Central-Perk-61x91-5cm-Pyramid-PP32138.jpg?v=1767619925" },
    { titulo: "Seinfeld", categoria: "sitcoms", tipo: "Serie", poster: "https://i.pinimg.com/736x/8f/a1/3f/8fa13fce3f4f078c517c81aa063771e2.jpg" },
    { titulo: "The Fresh Prince of Bel-Air", categoria: "sitcoms", tipo: "Serie", poster: "https://m.media-amazon.com/images/I/61KGeA2XLfL.jpg" },
    { titulo: "The Nanny", categoria: "sitcoms", tipo: "Serie", poster: "https://m.media-amazon.com/images/I/61gtOYwWnPL.AC_UF894,1000_QL80.jpg" },
    { titulo: "How I Met Your Mother", categoria: "sitcoms", tipo: "Serie", poster: "https://i.pinimg.com/736x/d7/45/8b/d7458bebe96c423e6e07455fca7ee02d.jpg" },
    { titulo: "Two and a Half Men", categoria: "sitcoms", tipo: "Serie", poster: "https://i.pinimg.com/736x/b7/1f/e1/b71fe1055840e258a35922f103b715d3.jpg" },
    { titulo: "Malcolm in the Middle", categoria: "sitcoms", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/ckLLIsNy3Z0Go1PYHA2PHzVymUA.jpg" },
    { titulo: "Scrubs", categoria: "sitcoms", tipo: "Serie", poster: "https://m.media-amazon.com/images/I/713GR2dy8RL.AC_UF894,1000_QL80.jpg" },
    { titulo: "It's Always Sunny in Philadelphia", categoria: "sitcoms", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/o0tMMK33JqmtpcWw0H41cEr9xQB.jpg" },
    { titulo: "Modern Family", categoria: "sitcoms", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/k5Qg5rgPoKdh3yTJJrLtyoyYGwC.jpg" },
    { titulo: "Parks and Recreation", categoria: "sitcoms", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/6KrY1WOj8UaCtrEAIW9rLh0UtD6.jpg" },
    { titulo: "Brooklyn Nine-Nine", categoria: "sitcoms", tipo: "Serie", poster: "https://i.pinimg.com/736x/52/1d/27/521d271fb4b41a5e19a30de376361a30.jpg" },
    { titulo: "Community", categoria: "sitcoms", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/3KUjDt8XY7w2Ku70UE0SECmv1zP.jpg" },
    { titulo: "New Girl", categoria: "sitcoms", tipo: "Serie", poster: "https://pics.filmaffinity.com/New_Girl_Serie_de_TV-502564246-large.jpg" },
    { titulo: "The Good Place", categoria: "sitcoms", tipo: "Serie", poster: "https://m.media-amazon.com/images/M/MV5BMTgzMzAyOTg4Ml5BMl5BanBnXkFtZTgwMjA0Mjk0OTE@.V1_FMjpg_UX1000.jpg" },
    { titulo: "The Ranch", categoria: "sitcoms", tipo: "Serie", poster: "https://m.media-amazon.com/images/M/MV5BMTYxOTU5ODE0OV5BMl5BanBnXkFtZTgwNzM0MzQ1MDI@.V1_FMjpg_UX1000.jpg" },
    { titulo: "That '70s Show", categoria: "sitcoms", tipo: "Serie", poster: "https://i.pinimg.com/564x/f8/71/fe/f871fe81a5ad58b23e303b2c90994bdd.jpg" },

    // --- SYDNEY SWEENEY (con filtros por década) ---
    { titulo: "Nocturne", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNWMzZDQxNGEtMWE2NC00ZDFkLThkZjctY2JiNzYyZWE3ZjVjXkEyXkFqcGc@.V1.jpg" },
    { titulo: "The Voyeurs", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/319248.jpg" },
    { titulo: "Night Teeth", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://i.pinimg.com/736x/3c/31/d2/3c31d2e3e1bc5cff8cb69f3516eb68a4.jpg" },
    { titulo: "Reality", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMDNhNzNiMzMtYTBmMi00OWEzLThkYTYtNjU2YjhhZDMyYjE0XkEyXkFqcGc@.V1.jpg" },
    { titulo: "Americana", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNTZlZTk4OGQtYjE3ZS00OTUwLThiNWYtOWIwMjUxYTIwNjNiXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Anyone but You", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://images.squarespace-cdn.com/content/v1/521dec4de4b0912f523f3b56/1731842299016-URJG1EVDKU4B2G48XIFG/anyone-but-you-poster.jpg?format=2500w" },
    { titulo: "Madame Web", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/S/pv-target-images/cb36ea6f3f53777aea24eec9d1560470e6c6d1f260abc72bcb13ae9bccfcb678.jpg" },
    { titulo: "Immaculate", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMWEzYjYyMjQtNTJjYi00ZDQ5LWE4N2MtNWY2ZTgxODNhYWM4XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Eden", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/750/315877.jpg" },
    { titulo: "Echo Valley", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/315875.jpg" },
    { titulo: "Christy", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BM2E5MjhjODgtYzg0MS00NTlhLWIyZTktYjRjOTM1MDJlZWI4XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "The Housemaid", categoria: "sydney-sweeney", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/jv6LRUjOh9X2dWs2htkntXj4NiB.jpg" },

    // --- OSCAR 2021 (con filtros por categoría) ---
    { titulo: "Nomadland", categoria: "oscar-2021", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZWY3YTIwOGItODQ5Mi00NmI4LTgxN2QtZmI2ZjJmZmRkOGY1XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "El Padre", categoria: "oscar-2021", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYzUxMDAyMDAtNzIyZi00OGQ1LTllMjEtYzRjOThkZTUxNTliXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Judas y el Mesías Negro", categoria: "oscar-2021", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BY2IwMDZkN2MtNTIzYS00ODBjLWE2ZDItZTI4ZDhkOTEyMmM5XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Mank", categoria: "oscar-2021", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYWJjYmVkYzMtOGI5ZS00Mzk2LTk1NDgtMzRmOWQ5MmQ5MTQ1XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Minari", categoria: "oscar-2021", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYjc5MzhlMDAtMWUyMC00MGRmLThjY2MtZmMyZTgwNDEzZGQ3XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Una Joven Prometedora", categoria: "oscar-2021", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZDMyNTQ5ODYtMjU3YS00MjM3LWFmOGMtZjZlNDA3YWE3YjM0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Sound of Metal", categoria: "oscar-2021", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/3178oOJKKPDeQ2legWQvMPpllv.jpg" },
    { titulo: "El Juicio de los 7 de Chicago", categoria: "oscar-2021", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZjY2ZGFlOTgtOGQ1MS00YWJhLWIyZjQtNWNmNTQ0YTk0MTZjXkEyXkFqcGc@._V1_.jpg" },

    // --- OSCAR 2022 (con filtros por categoría) ---
    { titulo: "CODA: Señales del Corazón", categoria: "oscar-2022", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/318745.jpg" },
    { titulo: "Belfast", categoria: "oscar-2022", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOGU1MmMyNTMtMGE3Ni00N2E0LWFlYjEtMDIwNDk5NzUyODAzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Don't Look Up", categoria: "oscar-2022", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMmRkYWNkM2ItYWM5Ny00M2QxLWEwMmMtMzk3M2RhNTU1MWQxXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Drive My Car", categoria: "oscar-2022", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://i.pinimg.com/564x/6f/a0/ca/6fa0ca9b2da9fb4e2fc737ea1cfffaaf.jpg" },
    { titulo: "Dune: Parte Uno", categoria: "oscar-2022", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://cdn.europosters.eu/image/1300/302577.jpg" },
    { titulo: "Rey Richard", categoria: "oscar-2022", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61W3DBZYm2L._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Licorice Pizza", categoria: "oscar-2022", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZTNmMTRmNDUtNjY1ZS00YmQxLTk0MjEtZGY0NzA1ZDgwNTFjXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "El Callejón de las Almas Perdidas", categoria: "oscar-2022", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNThlMDUzMDEtOTY1ZC00MzI3LThlOGItYjI0MTdkZDliNDEzXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "El Poder del Perro", categoria: "oscar-2022", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNzgyMzA2NDEtZWUxNy00MDNmLTllMDYtNzZmNTU5ZWVmMzhlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "West Side Story", categoria: "oscar-2022", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOWZkYzY2OGUtOGU4Ni00NmI0LTg2ZjAtZDA5OWE0YTNiZWRiXkEyXkFqcGc@._V1_.jpg" },

    // --- OSCAR 2023 (con filtros por categoría) ---
    { titulo: "Todo en Todas Partes al Mismo Tiempo", categoria: "oscar-2023", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61tpckHUmmL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Avatar: El Camino del Agua", categoria: "oscar-2023", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71DlLjNU0HL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "El Triángulo de la Tristeza", categoria: "oscar-2023", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYTViNzUyNDUtZTg3Yy00OTY4LWEyMTYtMmUzYjE3ZmZjYzUwXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Ellas Hablan", categoria: "oscar-2023", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNzM2YzEzOTktNTJiNy00YjAwLWI2N2YtNjBkZWM5Y2U1OTRlXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Elvis", categoria: "oscar-2023", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNTVhZmUyMDQtY2I5Ny00OWNiLTgzNjUtMTg4YTQwMTc0OTQxXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "The Banshees of Inisherin", categoria: "oscar-2023", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOTkzMWI4OTEtMTk0MS00MTUxLWI4NTYtYmRiNWM4Zjc1MGRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Los Fabelman", categoria: "oscar-2023", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNDY5OWY4ZWYtYTM3OC00Zjg5LWFlYzYtYWI5ZGM1MDcxYzY4XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "All Quiet on the Western Front", categoria: "oscar-2023", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOWJiYWMyYTktZThhOS00ZjgxLWE0YTQtZDMyNTQxMjMyYjI2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Tár", categoria: "oscar-2023", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/dRVAlaU0vbG6hMf2K45NSiIyoUe.jpg" },
    { titulo: "Top Gun: Maverick", categoria: "oscar-2023", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://filmartgallery.com/cdn/shop/files/Top-Gun-Maverick-Vintage-Movie-Poster-Original_7c07a212.jpg?v=1771974257&width=2048" },

    // --- OSCAR 2023: MEJOR DIRECCIÓN ---
    { titulo: "Todo en Todas Partes al Mismo Tiempo", categoria: "oscar-2023", subtipo: "mejor-direccion", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61tpckHUmmL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Tár", categoria: "oscar-2023", subtipo: "mejor-direccion", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/dRVAlaU0vbG6hMf2K45NSiIyoUe.jpg" },
    { titulo: "The Banshees of Inisherin", categoria: "oscar-2023", subtipo: "mejor-direccion", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOTkzMWI4OTEtMTk0MS00MTUxLWI4NTYtYmRiNWM4Zjc1MGRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "El Triángulo de la Tristeza", categoria: "oscar-2023", subtipo: "mejor-direccion", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYTViNzUyNDUtZTg3Yy00OTY4LWEyMTYtMmUzYjE3ZmZjYzUwXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Los Fabelman", categoria: "oscar-2023", subtipo: "mejor-direccion", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNDY5OWY4ZWYtYTM3OC00Zjg5LWFlYzYtYWI5ZGM1MDcxYzY4XkEyXkFqcGc@._V1_.jpg" },

    // --- OSCAR 2023: MEJOR ACTOR ---
    { titulo: "The Whale", categoria: "oscar-2023", subtipo: "mejor-actor", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/bPlmqR1cgK8bYIo8aAVw69KkzxX.jpg" },
    { titulo: "Elvis", categoria: "oscar-2023", subtipo: "mejor-actor", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNTVhZmUyMDQtY2I5Ny00OWNiLTgzNjUtMTg4YTQwMTc0OTQxXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "The Banshees of Inisherin", categoria: "oscar-2023", subtipo: "mejor-actor", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOTkzMWI4OTEtMTk0MS00MTUxLWI4NTYtYmRiNWM4Zjc1MGRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Aftersun", categoria: "oscar-2023", subtipo: "mejor-actor", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/iOSHD877d2jfpd8d97CjcwFhOuZ.jpg" },
    { titulo: "Living", categoria: "oscar-2023", subtipo: "mejor-actor", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/rJD2tGlYCc8ESOtJrfJk2alt2KX.jpg" },

    // --- OSCAR 2023: MEJOR ACTRIZ ---
    { titulo: "Todo en Todas Partes al Mismo Tiempo", categoria: "oscar-2023", subtipo: "mejor-actriz", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61tpckHUmmL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Tár", categoria: "oscar-2023", subtipo: "mejor-actriz", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/dRVAlaU0vbG6hMf2K45NSiIyoUe.jpg" },
    { titulo: "Blonde", categoria: "oscar-2023", subtipo: "mejor-actriz", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/mEeHqtnWOR44vLCutEFku2WK6ou.jpg" },
    { titulo: "To Leslie", categoria: "oscar-2023", subtipo: "mejor-actriz", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vcdRUXaejuOxnAolKxHaA1yZxfq.jpg" },

    // --- OSCAR 2024 (con filtros por categoría) ---
    { titulo: "Oppenheimer", categoria: "oscar-2024", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/lrcuwcNiiZjoB68fzvSOPwu9JWv.jpg" },
    { titulo: "American Fiction", categoria: "oscar-2024", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNzdiM2U4ODMtMTEwZC00ZDVmLWI0ZmItYThlMjQzZGRmMzk2XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Anatomía de una Caída", categoria: "oscar-2024", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/1ho0d4LNZw3Y0voeKmSvPSgJOJ2.jpg" },
    { titulo: "Barbie", categoria: "oscar-2024", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/dekMkQf0kqAmztUca9lX5e5Pjbp.jpg" },
    { titulo: "La Zona de Interés", categoria: "oscar-2024", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://cdn.posteritati.com/posters/000/000/071/328/the-zone-of-interest-md-web.jpg" },
    { titulo: "Killers of the Flower Moon", categoria: "oscar-2024", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vhkmvm2tm4HBec28JET6nBU7b7x.jpg" },
    { titulo: "The Holdovers", categoria: "oscar-2024", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/317446.jpg" },
    { titulo: "Maestro", categoria: "oscar-2024", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://imgproxy.domestika.org/unsafe/w:820/plain/src://content-items/015/204/521/Maestro%20poster-original.jpg?1711983664" },
    { titulo: "Poor Things", categoria: "oscar-2024", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/317259.jpg" },
    { titulo: "Past Lives", categoria: "oscar-2024", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://i.pinimg.com/736x/2b/41/cb/2b41cb65373e7909972ec366c09afa54.jpg" },

    // --- OSCAR 2024: MEJOR DIRECCIÓN ---
    { titulo: "Oppenheimer", categoria: "oscar-2024", subtipo: "mejor-direccion", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/lrcuwcNiiZjoB68fzvSOPwu9JWv.jpg" },
    { titulo: "Anatomía de una Caída", categoria: "oscar-2024", subtipo: "mejor-direccion", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/1ho0d4LNZw3Y0voeKmSvPSgJOJ2.jpg" },
    { titulo: "Killers of the Flower Moon", categoria: "oscar-2024", subtipo: "mejor-direccion", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vhkmvm2tm4HBec28JET6nBU7b7x.jpg" },
    { titulo: "Poor Things", categoria: "oscar-2024", subtipo: "mejor-direccion", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/317259.jpg" },
    { titulo: "La Zona de Interés", categoria: "oscar-2024", subtipo: "mejor-direccion", tipo: "Película", poster: "https://cdn.posteritati.com/posters/000/000/071/328/the-zone-of-interest-md-web.jpg" },

    // --- OSCAR 2024: MEJOR ACTOR ---
    { titulo: "Oppenheimer", categoria: "oscar-2024", subtipo: "mejor-actor", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/lrcuwcNiiZjoB68fzvSOPwu9JWv.jpg" },
    { titulo: "Maestro", categoria: "oscar-2024", subtipo: "mejor-actor", tipo: "Película", poster: "https://imgproxy.domestika.org/unsafe/w:820/plain/src://content-items/015/204/521/Maestro%20poster-original.jpg?1711983664" },
    { titulo: "Rustin", categoria: "oscar-2024", subtipo: "mejor-actor", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/lCawCmTJhKT7c2ZOzLBTXDIR8JS.jpg" },
    { titulo: "The Holdovers", categoria: "oscar-2024", subtipo: "mejor-actor", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/317446.jpg" },
    { titulo: "American Fiction", categoria: "oscar-2024", subtipo: "mejor-actor", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNzdiM2U4ODMtMTEwZC00ZDVmLWI0ZmItYThlMjQzZGRmMzk2XkEyXkFqcGc@._V1_.jpg" },

    // --- OSCAR 2024: MEJOR ACTRIZ ---
    { titulo: "Poor Things", categoria: "oscar-2024", subtipo: "mejor-actriz", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/317259.jpg" },
    { titulo: "Killers of the Flower Moon", categoria: "oscar-2024", subtipo: "mejor-actriz", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vhkmvm2tm4HBec28JET6nBU7b7x.jpg" },
    { titulo: "Anatomía de una Caída", categoria: "oscar-2024", subtipo: "mejor-actriz", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/1ho0d4LNZw3Y0voeKmSvPSgJOJ2.jpg" },
    { titulo: "Maestro", categoria: "oscar-2024", subtipo: "mejor-actriz", tipo: "Película", poster: "https://imgproxy.domestika.org/unsafe/w:820/plain/src://content-items/015/204/521/Maestro%20poster-original.jpg?1711983664" },
    { titulo: "Nyad", categoria: "oscar-2024", subtipo: "mejor-actriz", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/tfalAkshPxzt11MAblQzL32A9ES.jpg" },

    // --- OSCAR 2025 (con filtros por categoría) ---
    { titulo: "Anora", categoria: "oscar-2025", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/316165.jpg" },
    { titulo: "I'm Still Here", categoria: "oscar-2025", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BM2FjMjBiZjgtZDkyYy00YTRlLTk5N2QtODE2ZWIyYWE0Yzg0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Cónclave", categoria: "oscar-2025", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vYEyxF1UT779RiEalpMjUT6kfdf.jpg" },
    { titulo: "Dune: Parte Dos", categoria: "oscar-2025", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://deadline.com/wp-content/uploads/2023/05/FvIhyI9aUAUZz6l.jpeg?w=819" },
    { titulo: "El Brutalista", categoria: "oscar-2025", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BM2U0MWRjZTMtMDVhNC00MzY4LTgwOTktZGQ2MDdiYTI4OWMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Emilia Pérez", categoria: "oscar-2025", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNDMzMmQ4YzMtNWY2NS00MThjLWI3YzctZTVjNGRiNmU4YTkyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "La Sustancia", categoria: "oscar-2025", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://images.fandango.com/ImageRenderer/820/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/236765/TS_BATHROOM_OS_EN_US_Sept20.jpg" },
    { titulo: "Nickel Boys", categoria: "oscar-2025", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMGRkMzIyY2QtMjc5My00NGRjLWE5ZGUtYjRiMDNjMzAwOTU0XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "A Complete Unknown", categoria: "oscar-2025", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYTA2NTA5NDYtMzlkOC00MTQxLWI0NDQtMzk2M2YzMGE4MTkxXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Wicked", categoria: "oscar-2025", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/hDQXqvmmikekQ15uxhisBDwEA63.jpg" },

    // --- OSCAR 2025: MEJOR DIRECCIÓN ---
    { titulo: "Anora", categoria: "oscar-2025", subtipo: "mejor-direccion", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/316165.jpg" },
    { titulo: "El Brutalista", categoria: "oscar-2025", subtipo: "mejor-direccion", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BM2U0MWRjZTMtMDVhNC00MzY4LTgwOTktZGQ2MDdiYTI4OWMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "La Sustancia", categoria: "oscar-2025", subtipo: "mejor-direccion", tipo: "Película", poster: "https://images.fandango.com/ImageRenderer/820/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/236765/TS_BATHROOM_OS_EN_US_Sept20.jpg" },
    { titulo: "A Complete Unknown", categoria: "oscar-2025", subtipo: "mejor-direccion", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYTA2NTA5NDYtMzlkOC00MTQxLWI0NDQtMzk2M2YzMGE4MTkxXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Emilia Pérez", categoria: "oscar-2025", subtipo: "mejor-direccion", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNDMzMmQ4YzMtNWY2NS00MThjLWI3YzctZTVjNGRiNmU4YTkyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },

    // --- OSCAR 2025: MEJOR ACTOR ---
    { titulo: "El Brutalista", categoria: "oscar-2025", subtipo: "mejor-actor", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BM2U0MWRjZTMtMDVhNC00MzY4LTgwOTktZGQ2MDdiYTI4OWMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "A Complete Unknown", categoria: "oscar-2025", subtipo: "mejor-actor", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYTA2NTA5NDYtMzlkOC00MTQxLWI0NDQtMzk2M2YzMGE4MTkxXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Sing Sing", categoria: "oscar-2025", subtipo: "mejor-actor", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/umxo2giWjclz4jrsnF9gnQY3teY.jpg" },
    { titulo: "Cónclave", categoria: "oscar-2025", subtipo: "mejor-actor", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vYEyxF1UT779RiEalpMjUT6kfdf.jpg" },
    { titulo: "The Apprentice", categoria: "oscar-2025", subtipo: "mejor-actor", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/lDcBOl7kJVDREmArPBVwvtyND9r.jpg" },

    // --- OSCAR 2025: MEJOR ACTRIZ ---
    { titulo: "Anora", categoria: "oscar-2025", subtipo: "mejor-actriz", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/316165.jpg" },
    { titulo: "La Sustancia", categoria: "oscar-2025", subtipo: "mejor-actriz", tipo: "Película", poster: "https://images.fandango.com/ImageRenderer/820/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/236765/TS_BATHROOM_OS_EN_US_Sept20.jpg" },
    { titulo: "Wicked", categoria: "oscar-2025", subtipo: "mejor-actriz", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/hDQXqvmmikekQ15uxhisBDwEA63.jpg" },
    { titulo: "I'm Still Here", categoria: "oscar-2025", subtipo: "mejor-actriz", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BM2FjMjBiZjgtZDkyYy00YTRlLTk5N2QtODE2ZWIyYWE0Yzg0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Emilia Pérez", categoria: "oscar-2025", subtipo: "mejor-actriz", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNDMzMmQ4YzMtNWY2NS00MThjLWI3YzctZTVjNGRiNmU4YTkyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },

    // --- OSCAR 2026 (con filtros por categoría) ---
    { titulo: "One Battle After Another", categoria: "oscar-2026", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://pics.filmaffinity.com/One_Battle_After_Another-992235034-large.jpg" },
    { titulo: "Bugonia", categoria: "oscar-2026", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/zvTRaQSIx453rOiAFDdSKXifz7T.jpg" },
    { titulo: "El Agente Secreto", categoria: "oscar-2026", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-04419-d4041a352ba953990517622612447671-1024-1024.webp" },
    { titulo: "F1", categoria: "oscar-2026", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNGI0MDI4NjEtOWU3ZS00ODQyLWFhYTgtNGYxM2ZkM2Q2YjE3XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Frankenstein", categoria: "oscar-2026", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYzYzNDYxMTQtMTU4OS00MTdlLThhMTQtZjI4NGJmMTZmNmRiXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Hamnet", categoria: "oscar-2026", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://competitive.ultracine.com/wp-content/uploads/2025/05/UIP-HAMNET.jpg" },
    { titulo: "Sinners", categoria: "oscar-2026", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Marty Supreme", categoria: "oscar-2026", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/193/2026/02/09112829/lYWEXbQgRTR4ZQleSXAgRbxAjvq-scaled.jpg" },
    { titulo: "Sueños de Trenes", categoria: "oscar-2026", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZDkzNzkyNTktYzNhMi00YjhiLWI5YmUtZjliMTY0ZDc5NmMyXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Sentimental Value", categoria: "oscar-2026", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNTMwMTk0Y2QtY2VhNy00OGYwLThkMjMtZjkwMGI3MTJiMjAyXkEyXkFqcGc@._V1_.jpg" },

    // --- OSCAR 2026: MEJOR DIRECCIÓN ---
    { titulo: "One Battle After Another", categoria: "oscar-2026", subtipo: "mejor-direccion", tipo: "Película", poster: "https://pics.filmaffinity.com/One_Battle_After_Another-992235034-large.jpg" },
    { titulo: "Hamnet", categoria: "oscar-2026", subtipo: "mejor-direccion", tipo: "Película", poster: "https://competitive.ultracine.com/wp-content/uploads/2025/05/UIP-HAMNET.jpg" },
    { titulo: "Marty Supreme", categoria: "oscar-2026", subtipo: "mejor-direccion", tipo: "Película", poster: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/193/2026/02/09112829/lYWEXbQgRTR4ZQleSXAgRbxAjvq-scaled.jpg" },
    { titulo: "Sentimental Value", categoria: "oscar-2026", subtipo: "mejor-direccion", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNTMwMTk0Y2QtY2VhNy00OGYwLThkMjMtZjkwMGI3MTJiMjAyXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Sinners", categoria: "oscar-2026", subtipo: "mejor-direccion", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg" },

    // --- OSCAR 2026: MEJOR ACTOR ---
    { titulo: "Sinners", categoria: "oscar-2026", subtipo: "mejor-actor", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Marty Supreme", categoria: "oscar-2026", subtipo: "mejor-actor", tipo: "Película", poster: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/193/2026/02/09112829/lYWEXbQgRTR4ZQleSXAgRbxAjvq-scaled.jpg" },
    { titulo: "One Battle After Another", categoria: "oscar-2026", subtipo: "mejor-actor", tipo: "Película", poster: "https://pics.filmaffinity.com/One_Battle_After_Another-992235034-large.jpg" },
    { titulo: "El Agente Secreto", categoria: "oscar-2026", subtipo: "mejor-actor", tipo: "Película", poster: "https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-04419-d4041a352ba953990517622612447671-1024-1024.webp" },
    { titulo: "Blue Moon", categoria: "oscar-2026", subtipo: "mejor-actor", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/nij3i5ziQdqfiK29gb4rX1bkmVy.jpg" },

    // --- OSCAR 2026: MEJOR ACTRIZ ---
    { titulo: "Hamnet", categoria: "oscar-2026", subtipo: "mejor-actriz", tipo: "Película", poster: "https://competitive.ultracine.com/wp-content/uploads/2025/05/UIP-HAMNET.jpg" },
    { titulo: "Bugonia", categoria: "oscar-2026", subtipo: "mejor-actriz", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/zvTRaQSIx453rOiAFDdSKXifz7T.jpg" },
    { titulo: "Song Sung Blue", categoria: "oscar-2026", subtipo: "mejor-actriz", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYmQ2YjhjNjgtNGQxNC00NmI0LWEzMjktNWEzMWY2OTUwZjFiXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Sentimental Value", categoria: "oscar-2026", subtipo: "mejor-actriz", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNTMwMTk0Y2QtY2VhNy00OGYwLThkMjMtZjkwMGI3MTJiMjAyXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "If I Had Legs I'd Kick You", categoria: "oscar-2026", subtipo: "mejor-actriz", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMGRlMjIzMDctNzNkMS00MzEwLTlhZWEtM2FjYmE1ZmFjMzZlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },

    // --- TOM HOLLAND (con filtros por década) ---
    { titulo: "Unidos", categoria: "tom-holland", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81ZnP4DB06L.AC_UF894,1000_QL80.jpg" },
    { titulo: "Dolittle", categoria: "tom-holland", subtipo: "2020", tipo: "Película", poster: "https://www.universalpictures.com.ar/tl_files/content/movies/dolittle/posters/01.jpg" },
    { titulo: "El Diablo a Todas Horas", categoria: "tom-holland", subtipo: "2020", tipo: "Película", poster: "https://i.pinimg.com/736x/3f/2b/1b/3f2b1ba88daef2d2226517b3e49688fa.jpg" },
    { titulo: "Cherry", categoria: "tom-holland", subtipo: "2020", tipo: "Película", poster: "https://pics.filmaffinity.com/Cherry-459820854-large.jpg" },
    { titulo: "Chaos Walking", categoria: "tom-holland", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61LcnT-4RxL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Spider-Man: No Way Home", categoria: "tom-holland", subtipo: "2020", tipo: "Película", poster: "https://www.cinemascomics.com/wp-content/uploads/2022/01/poster-Spider-man-no-way-home.jpg" },
    { titulo: "Uncharted", categoria: "tom-holland", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71Pzfv1skmL.jpg" },
    { titulo: "The Odyssey", categoria: "tom-holland", subtipo: "2020", tipo: "Película", poster: "https://img.asmedia.epimg.net/resizer/v2/AP6RDKAGQVE4DEON7ETUS4UVM4.jpg?auth=5abec700c478bffaa862bc1e153efeb77076781fbd4dc9df918ddb11a11979ea&width=375" },
    { titulo: "Spider-Man: Brand New Day", categoria: "tom-holland", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOWNjYWM3NWItOGE0ZS00MWRjLThiZWEtYjc4ZmNmMmU5ZTVmXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },

    // --- RYAN GOSLING (con filtros por década) ---
    { titulo: "The Gray Man", categoria: "ryan-gosling", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZmFhZTNlNzctZGQzZi00MTA3LThiNjMtYWQzNjUzMjNjZjA3XkEyXkFqcGc@.V1.jpg" },
    { titulo: "Barbie", categoria: "ryan-gosling", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/dekMkQf0kqAmztUca9lX5e5Pjbp.jpg" },
    { titulo: "The Fall Guy", categoria: "ryan-gosling", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/e7olqFmzcIX5c23kX4zSmLPJi8c.jpg" },
    { titulo: "Project Hail Mary", categoria: "ryan-gosling", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOGU2OGRmMWYtZGExZS00NmQ1LWI3MmMtMTY5MzEyYTI0ZjNiXkEyXkFqcGc@.V1.jpg" },

    // --- OSCAR 2020 (con filtros por categoría) ---
    { titulo: "Parasite", categoria: "oscar-2020", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
    { titulo: "1917", categoria: "oscar-2020", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYzkxZjg2NDQtMGVjMy00NWZkLTk0ZDEtZWE3NDYwYjAyMTg1XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Ford v Ferrari", categoria: "oscar-2020", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/322166.jpg" },
    { titulo: "Jojo Rabbit", categoria: "oscar-2020", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/322216.jpg" },
    { titulo: "Joker", categoria: "oscar-2020", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://i.ebayimg.com/images/g/rI0AAOSw89NiRZ6k/s-l1200.jpg" },
    { titulo: "Little Women", categoria: "oscar-2020", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61TK-+geKPL.AC_UF894,1000_QL80.jpg" },
    { titulo: "Historia de un Matrimonio", categoria: "oscar-2020", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://cdn.posteritati.com/posters/000/000/060/561/marriage-story-md-web.jpg" },
    { titulo: "Once Upon a Time in Hollywood", categoria: "oscar-2020", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://www.vintagemovieposters.co.uk/wp-content/uploads/2019/06/IMG_9717.jpeg" },
    { titulo: "The Irishman", categoria: "oscar-2020", subtipo: "mejor-pelicula", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/750/322410.jpg" },

    // --- LEONARDO DI CAPRIO (con filtros por década) ---
    { titulo: "Don't Look Up", categoria: "leonardo-dicaprio", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMmRkYWNkM2ItYWM5Ny00M2QxLWEwMmMtMzk3M2RhNTU1MWQxXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Killers of the Flower Moon", categoria: "leonardo-dicaprio", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vhkmvm2tm4HBec28JET6nBU7b7x.jpg" },
    { titulo: "One Battle After Another", categoria: "leonardo-dicaprio", subtipo: "2020", tipo: "Película", poster: "https://pics.filmaffinity.com/One_Battle_After_Another-992235034-large.jpg" },
    { titulo: "Shutter Island", categoria: "leonardo-dicaprio", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/nrmXQ0zcZUL8jFLrakWc90IR8z9.jpg" },
    { titulo: "Inception", categoria: "leonardo-dicaprio", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg" },
    { titulo: "J. Edgar", categoria: "leonardo-dicaprio", subtipo: "2010", tipo: "Película", poster: "https://i.pinimg.com/736x/8b/3e/d5/8b3ed538e07de55b2e3dac40f6e0d044.jpg" },
    { titulo: "Django Unchained", categoria: "leonardo-dicaprio", subtipo: "2010", tipo: "Película", poster: "https://i.pinimg.com/736x/6e/46/1f/6e461ff4f41269d0a537d3a52c0ce688.jpg" },
    { titulo: "The Great Gatsby", categoria: "leonardo-dicaprio", subtipo: "2010", tipo: "Película", poster: "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/a7350c9186433.560c9f1d670e4.jpg" },
    { titulo: "The Wolf of Wall Street", categoria: "leonardo-dicaprio", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@.V1.jpg" },
    { titulo: "The Revenant", categoria: "leonardo-dicaprio", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/ji3ecJphATlVgWNY0B0RVXZizdf.jpg" },
    { titulo: "Once Upon a Time in Hollywood", categoria: "leonardo-dicaprio", subtipo: "2010", tipo: "Película", poster: "https://www.vintagemovieposters.co.uk/wp-content/uploads/2019/06/IMG_9717.jpeg" },
    { titulo: "The Beach", categoria: "leonardo-dicaprio", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYTljNTg1YjktY2I3MS00MmQwLWJkYTAtYzcwZjRjM2ExNDJjXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Don's Plum", categoria: "leonardo-dicaprio", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BY2U1NjdlNTEtNDAwZi00Y2IzLWFjZjItMDY5ZjI5NmM0Y2EyXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Gangs of New York", categoria: "leonardo-dicaprio", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTQ0MDA0MTUtYzkzMi00NDY3LThhZDEtNGM4MWUwYzMyZDk5XkEyXkFqcGc@.V1.jpg" },
    { titulo: "Catch Me If You Can", categoria: "leonardo-dicaprio", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2.V1.jpg" },
    { titulo: "The Aviator", categoria: "leonardo-dicaprio", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNTE4ZmE3NjYtMzdiOS00NDNjLWFlNmUtZGRiMGUxOTZjNDE5XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "The Departed", categoria: "leonardo-dicaprio", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/f1JUHBq8JoXBz2NVNWeUpL2eVZs.jpg" },
    { titulo: "Blood Diamond", categoria: "leonardo-dicaprio", subtipo: "2000", tipo: "Película", poster: "https://pics.filmaffinity.com/Blood_Diamond-241959500-large.jpg" },
    { titulo: "Body of Lies", categoria: "leonardo-dicaprio", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTgzOTY3MTM0OV5BMl5BanBnXkFtZTcwNjc5MTI5MQ@@.V1.jpg" },
    { titulo: "Revolutionary Road", categoria: "leonardo-dicaprio", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/4GZzNO86SBP9PaOTfBfmD7iGNO5.jpg" },
    { titulo: "Critters 3", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMDQ2YTRiYjMtZjkwNC00ZjhiLTliZTAtOWFmYjI3ZTZhZmViXkEyXkFqcGc@.V1.jpg" },
    { titulo: "This Boy's Life", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/pRMSZfen1Cv1eqwDbtxCBpBqxnU.jpg" },
    { titulo: "What's Eating Gilbert Grape", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/I/51ZOvRZn7wL.jpg" },
    { titulo: "The Quick and The Dead", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/I/51vpvHNYoiL.AC_UF894,1000_QL80.jpg" },
    { titulo: "The Basketball Diaries", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://i.ebayimg.com/images/g/0XkAAOSwyjBW4HAT/s-l1200.jpg" },
    { titulo: "Total Eclipse", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BODIxZmZmOTAtODUwYi00YjJlLTllOTMtMGM1NzQ4ZTdjZGE2XkEyXkFqcGc@.V1.jpg" },
    { titulo: "Romeo + Juliet", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://i.pinimg.com/736x/11/23/56/112356531615c69a2eba59486715cd61.jpg" },
    { titulo: "Marvin's Room", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTIzOTkzMzc3M15BMl5BanBnXkFtZTYwNjYyNDU5.V1.jpg" },
    { titulo: "Titanic", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://i.pinimg.com/474x/39/d1/01/39d101063c4e217323df91b0551175af.jpg" },
    { titulo: "The Man in The Iron Mask", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://lospradosdelaverdadgencana.wordpress.com/wp-content/uploads/2015/06/iron-mask-1998.jpg" },
    { titulo: "Celebrity", categoria: "leonardo-dicaprio", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTIyZjBlZWMtMWYyNS00Yjc1LWE1NjktMGZlNzdjZTdjYWQwXkEyXkFqcGc@.V1.jpg" },

    // --- MARVEL: ANIMACIÓN (sueltos, ver colecciones para Disney XD y Marvel 90's) ---
    // "Avengers: Los Héroes Más Poderosos de la Tierra" ahora vive dentro de "Yost-Verse" (ver colecciones)
    { titulo: "Spider-Man: Unlimited (Tierra-6513)", categoria: "marvel-animacion", tipo: "Serie", tierra: 6513, poster: "https://image.tmdb.org/t/p/original/hNdf1WmFil9IV7rabBe6PnAmYnI.jpg" },
    { titulo: "Spider-Man: The New Animated Series (Tierra-554)", categoria: "marvel-animacion", tipo: "Serie", tierra: 554, poster: "https://image.tmdb.org/t/p/original/9g1YPyKtpB0aNlgVb0N8YASKLZN.jpg" },
    { titulo: "The Spectacular Spider-Man (Tierra-26496)", categoria: "marvel-animacion", tipo: "Serie", tierra: 26496, poster: "https://image.tmdb.org/t/p/original/dCNxOhXT7c4lqYuRpdM3m8s9XDp.jpg" },
    { titulo: "The Super-Hero Squad Show (Tierra-91119)", categoria: "marvel-animacion", tipo: "Serie", tierra: 91119, poster: "https://m.media-amazon.com/images/M/MV5BMGQ0NjI0MmUtMTU2NC00NjM4LWI5ZDEtOGU1MzI5YTRhYjhhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "The Avengers: United They Stand (Tierra-730784)", categoria: "marvel-animacion", tipo: "Serie", tierra: 730784, poster: "https://m.media-amazon.com/images/M/MV5BNDcxZjdjZTgtNDI5Ni00MDliLWFhZTYtZmQwYzdlNzA4YzYzXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Tu Amistoso Vecino Spider-Man (Tierra-86445)", categoria: "marvel-animacion", tipo: "Serie", tierra: 86445, poster: "https://www.movieposters.com/cdn/shop/files/your-friendly-neighborhood-spider-man_kthsshkb_1024x1024.jpg?v=1762978827" },

    // --- POKÉMON: CANON (con filtros por generación) ---
    { titulo: "Pokémon Temporada 1: Liga Índigo", categoria: "pokemon-canon", subtipo: "kanto-johto", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/lXLlqzclJCdtbnJgrLhqRloiP2L.jpg" },
    { titulo: "Mewtwo Contraataca", categoria: "pokemon-canon", subtipo: "kanto-johto", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/aeskMWlroIsPR9AllXLW2H6Gev0.jpg" },
    { titulo: "Pokémon Temporada 2: La Liga Naranja", categoria: "pokemon-canon", subtipo: "kanto-johto", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/ye1Y1yx5gD6DgEsJwAMv9A8SHFZ.jpg" },
    { titulo: "El Poder de Uno", categoria: "pokemon-canon", subtipo: "kanto-johto", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/onOIJL2FPGF6hQ66zDEyesfTxSi.jpg" },
    { titulo: "Pokémon Temporada 3: Los Viajes Johto", categoria: "pokemon-canon", subtipo: "kanto-johto", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/n5lhMLbT3FQtI6EUN84bEHZPfsm.jpg" },
    { titulo: "El Hechizo de Los Unown", categoria: "pokemon-canon", subtipo: "kanto-johto", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/uccD0yQ1pgBqeAsrE5tLbOCCWSx.jpg" },
    { titulo: "Pokémon Temporada 4", categoria: "pokemon-canon", subtipo: "kanto-johto", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/yjAq5sILzVzIBfWtVLdxD8AEjGM.jpg" },
    { titulo: "Celebi, La Voz del Bosque", categoria: "pokemon-canon", subtipo: "kanto-johto", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/Db6uwW9aVQRD5DqnOfjchQaPWY.jpg" },
    { titulo: "Pokémon Temporada 5: La Búsqueda del Maestro", categoria: "pokemon-canon", subtipo: "kanto-johto", tipo: "Serie", poster: "https://m.media-amazon.com/images/I/817TMfjYybL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Héroes Pokémon: Latios y Latias", categoria: "pokemon-canon", subtipo: "kanto-johto", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/w3u1GuOAZBTt98SDYLXJxadPsk5.jpg" },
    { titulo: "Pokémon Temporada 6: Fuerza Máxima", categoria: "pokemon-canon", subtipo: "rubi-zafiro", tipo: "Serie", poster: "https://image.tmdb.org/t/p/w500/zK95cE5ZuNeKIPC3UxC0v6UoIqA.jpg" },
    { titulo: "Jirachi y Los Deseos", categoria: "pokemon-canon", subtipo: "rubi-zafiro", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/7s7YUi2v42TbSWdlzzKvKsX60AF.jpg" },
    { titulo: "Pokémon Temporada 7: Reto Máximo", categoria: "pokemon-canon", subtipo: "rubi-zafiro", tipo: "Serie", poster: "https://images.justwatch.com/poster/264631676/s718/temporada-7.jpg" },
    { titulo: "El Destino de Deoxys", categoria: "pokemon-canon", subtipo: "rubi-zafiro", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/dTtRc46sSUmndOLuYXLrrmba01C.jpg" },
    { titulo: "Pokémon Temporada 8: Batalla Avanzada", categoria: "pokemon-canon", subtipo: "rubi-zafiro", tipo: "Serie", poster: "https://images.justwatch.com/poster/264631679/s718/temporada-8.jpg" },
    { titulo: "Lucario y El Misterio de Mew", categoria: "pokemon-canon", subtipo: "rubi-zafiro", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/x2XQw8MM3ndbkLzUWpVP9oTpaO4.jpg" },
    { titulo: "Pokémon Temporada 9: Batalla de La Frontera", categoria: "pokemon-canon", subtipo: "rubi-zafiro", tipo: "Serie", poster: "https://image.tmdb.org/t/p/w500/FynWwCCPvvaATr0a0zPLDrByhq.jpg" },
    { titulo: "Pokémon Ranger y El Templo del Mar", categoria: "pokemon-canon", subtipo: "rubi-zafiro", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTczNjg3MDgyOV5BMl5BanBnXkFtZTgwMTc2MzQ2NjE@._V1_.jpg" },
    { titulo: "Pokémon Temporada 10: Diamante y Perla", categoria: "pokemon-canon", subtipo: "diamante-perla", tipo: "Serie", poster: "https://static.wikia.nocookie.net/doblaje/images/a/af/PokemonDiamond%26Pearl.jpg/revision/latest/thumbnail/width/360/height/360?cb=20221115225625&path-prefix=es" },
    { titulo: "El Surgimiento de Darkrai", categoria: "pokemon-canon", subtipo: "diamante-perla", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTQ4MTYzODUzMF5BMl5BanBnXkFtZTgwMTcxOTk0MDE@._V1_.jpg" },
    { titulo: "Pokémon Temporada 11: Dimensión de Batalla", categoria: "pokemon-canon", subtipo: "diamante-perla", tipo: "Serie", poster: "https://m.media-amazon.com/images/I/81H6PhOeyOL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Giratina y El Guerrero Celestial", categoria: "pokemon-canon", subtipo: "diamante-perla", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMmM5NGJhMDUtYTRjMy00MTE3LTg0ZGItN2FlMjljNTljYTkzXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Pokémon Temporada 12: Batallas Galácticas", categoria: "pokemon-canon", subtipo: "diamante-perla", tipo: "Serie", poster: "https://images.justwatch.com/poster/264631712/s718/temporada-12.jpg" },
    { titulo: "Arceus y La Joya de La Vida", categoria: "pokemon-canon", subtipo: "diamante-perla", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/4ghGJZl9N5VZkHy4GFSAPhY5Jgt.jpg" },
    { titulo: "Pokémon Temporada 13: Los Vencedores de La Liga Sinnoh", categoria: "pokemon-canon", subtipo: "diamante-perla", tipo: "Serie", poster: "https://images.justwatch.com/poster/264631718/s718/temporada-13.jpg" },
    { titulo: "Zoroark: El Maestro de las Ilusiones", categoria: "pokemon-canon", subtipo: "diamante-perla", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOTA2N2M5YjQtYzU1My00YzVmLWIxZjUtM2I4NDJiNWVjOWIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Pokémon Temporada 14: Blanco y Negro", categoria: "pokemon-canon", subtipo: "blanco-negro", tipo: "Serie", poster: "https://pics.filmaffinity.com/pokemon_black_and_white-444878062-large.jpg" },
    { titulo: "Blanco: Victini y Zekrom", categoria: "pokemon-canon", subtipo: "blanco-negro", tipo: "Película", poster: "https://play-lh.googleusercontent.com/KaBuu6bPm9wmLUxOQSbJMfp2-_7RnlCF0Kogk5ya6pfkJ0F2iWegnYaL68Kd8Q4WJaJX" },
    { titulo: "Negro: Victini y Reshiram", categoria: "pokemon-canon", subtipo: "blanco-negro", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/aoxL0o7EISponMR0GWOLMGC6aBu.jpg" },
    { titulo: "Pokémon Temporada 15: Destinos Rivales", categoria: "pokemon-canon", subtipo: "blanco-negro", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/87N3UhDUIBSm2WtmqbJuPMzUDNx.jpg" },
    { titulo: "Kyurem Contra el Espadachín Místico", categoria: "pokemon-canon", subtipo: "blanco-negro", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vmORavGBn3SgyihusgcETgt0yyU.jpg" },
    { titulo: "Pokémon Temporada 16: Aventuras en Unova y Más Allá", categoria: "pokemon-canon", subtipo: "blanco-negro", tipo: "Serie", poster: "https://m.media-amazon.com/images/I/81PF74pHILL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Genesect y El Despertar de Una Leyenda", categoria: "pokemon-canon", subtipo: "blanco-negro", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMjYxZTM1N2UtZjFhOC00YTk3LThmNTEtNGZhNzYyZjc5NmFjXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Pokémon Temporada 17: XY", categoria: "pokemon-canon", subtipo: "xy-xyz", tipo: "Serie", poster: "https://static.wikia.nocookie.net/espokemon/images/c/c7/P%C3%B3ster_temporada_XY_ingl%C3%A9s.png/revision/latest/scale-to-width-down/724?cb=20180115221659" },
    { titulo: "Diancie y La Crisálida de la Destrucción", categoria: "pokemon-canon", subtipo: "xy-xyz", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/rWqWsQfpRp4nogfg18xeZd4oDTe.jpg" },
    { titulo: "Pokémon Temporada 18: XY – Expediciones en Kalos", categoria: "pokemon-canon", subtipo: "xy-xyz", tipo: "Serie", poster: "https://static.wikia.nocookie.net/espokemon/images/0/07/P%C3%B3ster_temporada_XY_Expediciones_en_Kalos_ingl%C3%A9s.png/revision/latest/scale-to-width-down/284?cb=20180115221203" },
    { titulo: "Hoopa y Un Duelo Histórico", categoria: "pokemon-canon", subtipo: "xy-xyz", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/ydqfgeLgaygzRnYkNOPcGe68Tjf.jpg" },
    { titulo: "Pokémon Temporada 19: XYZ", categoria: "pokemon-canon", subtipo: "xy-xyz", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/mPpM9GYrh40l47TqI5Ga7OZxIkZ.jpg" },
    { titulo: "Volcanion y La Maravilla Mecánica", categoria: "pokemon-canon", subtipo: "xy-xyz", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTk0NzI2Y2YtOGVjYi00YTUwLWEwNmEtODk1YjlhYzQ0ZTY5XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Pokémon Temporada 20: Sol y Luna", categoria: "pokemon-canon", subtipo: "sol-luna", tipo: "Serie", poster: "https://static.wikia.nocookie.net/espokemon/images/c/cb/P%C3%B3ster_serie_Sol_y_Luna_espa%C3%B1ol.png/revision/latest/scale-to-width-down/233?cb=20161117204043" },
    { titulo: "Pokémon Temporada 21: Ultra Aventuras", categoria: "pokemon-canon", subtipo: "sol-luna", tipo: "Serie", poster: "https://static.wikia.nocookie.net/espokemon/images/0/0b/P%C3%B3ster_temporada_Sol_y_Luna_Ultraaventuras.png/revision/latest/scale-to-width-down/853?cb=20180308173152" },
    { titulo: "Pokémon Temporada 22: Ultra Leyendas", categoria: "pokemon-canon", subtipo: "sol-luna", tipo: "Serie", poster: "https://static.wikia.nocookie.net/espokemon/images/7/7e/P%C3%B3ster_temporada_Sol_y_Luna_Ultraleyendas.png/revision/latest/scale-to-width-down/490?cb=20190404223947" },
    { titulo: "Pokémon Temporada 23: Viajes Pokémon", categoria: "pokemon-canon", subtipo: "viajes", tipo: "Serie", poster: "https://ramenparados.com/wp-content/uploads/2022/12/PokemonArcoFinalAsh.jpeg" },
    { titulo: "Pokémon Temporada 24: Viajes Maestros", categoria: "pokemon-canon", subtipo: "viajes", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/wrZARmey5XeSj35rK5hF8rYg8e8.jpg" },
    { titulo: "Pokémon Temporada 25: Viajes Definitivos", categoria: "pokemon-canon", subtipo: "viajes", tipo: "Serie", poster: "https://image.tmdb.org/t/p/w500/i6eNZRy0VcBrYfBufbI6NMmsstz.jpg" },
    { titulo: "Aventuras de un Maestro Pokémon", categoria: "pokemon-canon", subtipo: "viajes", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/i6eNZRy0VcBrYfBufbI6NMmsstz.jpg" },
    { titulo: "Pokémon Temporada 26: Horizontes Pokémon", categoria: "pokemon-canon", subtipo: "horizontes", tipo: "Serie", poster: "https://m.media-amazon.com/images/M/MV5BNDRiNzNiNjAtMWU5OS00ODYwLWI0NTAtZjYwNjVhMDE1NDhmXkEyXkFqcGc@._V1_.jpg" },

    // --- BARRY KEOGHAN (con filtros por década) ---
    { titulo: "La Leyenda de el Caballero Verde", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNjRjNmU1M2ItNDU4Ni00ZGY2LTlmNzItY2MxYmY3OTllZjMwXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Eternals", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vgUZo9aVvRvCQFXwZC9zq3qCZT9.jpg" },
    { titulo: "The Batman", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71kUTilIdiL.jpg" },
    { titulo: "The Banshees of Inisherin", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOTkzMWI4OTEtMTk0MS00MTUxLWI4NTYtYmRiNWM4Zjc1MGRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Saltburn", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZjk4NGE3MWItMDRhMy00YzhiLTk0MGUtZDlkNmQxYWIxYzc2XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Bird", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMGYzZDI4OTktZWJkZC00NjdiLTlkMjYtMzA1ZTVjMDU2M2FhXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Bring Them Down", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNWVhMGNlODgtYzAyMS00OGJhLTkyOGItNDY3MjA4NjVjYzMzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Hurry Up Tomorrow", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNDQ2MGIyNDQtYjVhOS00ZjI1LWFmYzctMWI2MGZhZGFhZWM4XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Crime 101", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZThlN2M4ZTUtYTU3Mi00MDE5LWFhYWUtNjkxMWEwNjUwNDVhXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Peaky Blinders: The Immortal Man", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNTdlNTNjNjctYTg2MC00NTFlLTliNTctODFiZjZmNWRkYTVlXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Butterfly Jam", categoria: "barry-keoghan", subtipo: "2020", tipo: "Película", poster: "https://a.ltrbxd.com/resized/film-poster/8/2/6/5/6/1/826561-butterfly-jam-2026-0-600-0-900-crop.jpg?v=f75124f773" },

    // --- THE MATRIX SAGA (con filtros "Películas" y "Todo") ---
    { titulo: "The Matrix", categoria: "matrix-saga", subtipo: "peliculas,todo", tipo: "Película", poster: "https://i.pinimg.com/736x/a1/4d/50/a14d506a176e88afefa2a9ee64b00d69.jpg" },
    { titulo: "The Matrix Reloaded", categoria: "matrix-saga", subtipo: "peliculas,todo", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNjAxYjkxNjktYTU0YS00NjFhLWIyMDEtMzEzMTJjMzRkMzQ1XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "The Matrix Revolutions", categoria: "matrix-saga", subtipo: "peliculas,todo", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/bkkS61w94ZVMNVd8KEyyJl2tnY5.jpg" },
    { titulo: "The Animatrix", categoria: "matrix-saga", subtipo: "todo", tipo: "Película", poster: "https://m.media-amazon.com/images/I/51w4AiRhdEL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "The Matrix Resurrections", categoria: "matrix-saga", subtipo: "peliculas,todo", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71PQje4I99L._AC_UF894,1000_QL80_.jpg" },

    // --- PIXAR (con filtros por década) ---
    { titulo: "Toy Story", categoria: "pixar", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71aBLaC4TzL.jpg" },
    { titulo: "Bichos", categoria: "pixar", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNGI3Mjc1ZjUtYTJhYS00NjBiLTgyYjctODU5NTNlMWJiYjYzXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Toy Story 2", categoria: "pixar", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/I/719aV3ujFKL.jpg" },
    { titulo: "Monsters Inc.", categoria: "pixar", subtipo: "2000", tipo: "Película", poster: "https://i.pinimg.com/736x/59/10/23/59102333312c8ceae749027c5193539d.jpg" },
    { titulo: "Buscando a Nemo", categoria: "pixar", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/5lc6nQc0VhWFYFbNv016xze8Jvy.jpg" },
    { titulo: "Los Increíbles", categoria: "pixar", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/2UnQ5f7PgHo4jIk6EUuS4xPsG1B.jpg" },
    { titulo: "Cars", categoria: "pixar", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/uq3N2SFj1Y06zA6LzCQPkmBdaaE.jpg" },
    { titulo: "Ratatouille", categoria: "pixar", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Wall-E", categoria: "pixar", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg" },
    { titulo: "Up", categoria: "pixar", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/eAdO0qa9m0NFSVLZ26PvCwmPlsr.jpg" },
    { titulo: "Toy Story 3", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/xNMYWGov98EySsv31FVEcnMKt9q.jpg" },
    { titulo: "Cars 2", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTUzNTc3MTU3M15BMl5BanBnXkFtZTcwMzIxNTc3NA@@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Valiente", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMzgwODk3ODA1NF5BMl5BanBnXkFtZTcwNjU3NjQ0Nw@@.V1.jpg" },
    { titulo: "Monsters University", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/wsERTuCGV4Fj2wqNr8kqYKcjIMd.jpg" },
    { titulo: "Intensa-Mente", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/inside_out_2015_original_film_art_74649cb0-2ba2-4a00-9dda-e0829f708159_5000x.jpg?v=1606252623" },
    { titulo: "Un Buen Dinosaurio", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://cdn.posteritati.com/posters/000/000/048/988/the-good-dinosaur-md-web.jpg" },
    { titulo: "Buscando a Dory", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/xufFFw9wRDYmICfutz4yeSsIwaa.jpg" },
    { titulo: "Cars 3", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://i0.wp.com/pixarpost.com/wp-content/uploads/2020/10/6bae7-cars-3-official-poster.jpg?fit=744%2C1102&ssl=1" },
    { titulo: "Coco", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/4jfKMdT6vdkpcB2EyBj2XkO2tTf.jpg" },
    { titulo: "Los Increíbles 2", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://i0.wp.com/teaser-trailer.com/wp-content/uploads/2017/03/The-Incredibles-2-Teaser-Poster.jpg?resize=425%2C600&ssl=1" },
    { titulo: "Toy Story 4", categoria: "pixar", subtipo: "2010", tipo: "Película", poster: "https://hips.hearstapps.com/hmg-prod/images/toy-story-4-poster-1543427531.jpg" },
    { titulo: "Unidos", categoria: "pixar", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81ZnP4DB06L.AC_UF894,1000_QL80.jpg" },
    { titulo: "Soul", categoria: "pixar", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/xJ7MCAy4oCLerPo3JjnB8lKOhl4.jpg" },
    { titulo: "Luca", categoria: "pixar", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71kDOwRD78S.jpg" },
    { titulo: "Red", categoria: "pixar", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81afp89kELL.jpg" },
    { titulo: "Lightyear", categoria: "pixar", subtipo: "2020", tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/p_243_ster_lightyear_9209f1b3.jpeg" },
    { titulo: "Elementos", categoria: "pixar", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/612zBRsyHbL.jpg" },
    { titulo: "Intensa-Mente 2", categoria: "pixar", subtipo: "2020", tipo: "Película", poster: "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2023/11/IO2_Teaser_Manhole_1s_v7.2_KA_Mech7_FS.jpg" },
    { titulo: "Elio", categoria: "pixar", subtipo: "2020", tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/elio_teaser2_poster_spain_1e0faa4d.jpeg" },
    { titulo: "Hoppers", categoria: "pixar", subtipo: "2020", tipo: "Película", poster: "https://lumiere-a.akamaihd.net/v1/images/lifespan_payoff_posters_united_kingdom_1_f4464a86.jpeg?region=0,0,770,1100" },
    { titulo: "Toy Story 5", categoria: "pixar", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/j3TpFDOfFBlKNR1TScIfw1h2Oa6.jpg" },

    // --- BRAD PITT (con filtros por década) ---
    { titulo: "Bullet Train", categoria: "brad-pitt", subtipo: "2020", tipo: "Película", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVLHRnA4ZPXNF5W9x3WgmhJvYQ6hxEJF4tT6EzsyPHofiYNKQYS7X423L&s=10" },
    { titulo: "Babylon", categoria: "brad-pitt", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61hxWeyTYcL.AC_UF894,1000_QL80.jpg" },
    { titulo: "If", categoria: "brad-pitt", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/7fEVmXbk4vb2dUs8KnMbYxoUb7b.jpg" },
    { titulo: "Wolfs", categoria: "brad-pitt", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNWI2MzdiM2ItMTg2Zi00MTYwLThlZmItM2FkNWI4NjE3ZjRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "F1", categoria: "brad-pitt", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNGI0MDI4NjEtOWU3ZS00ODQyLWFhYTgtNGYxM2ZkM2Q2YjE3XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Megamente", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61OtufrnSTL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "The Tree of Life", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/nQu2eMr9qhrds2LbPDK0SdjC1es.jpg" },
    { titulo: "Moneyball", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61Ify4mS7IL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Matalos Suavemente", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/750/325160.jpg" },
    { titulo: "Guerra Mundial Z", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/1SWBSYJsnyhdNRfLI1T6RsCxAQ4.jpg" },
    { titulo: "12 Años de Esclavitud", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/aoDss4auoSgShf665dYCFGv7Ao0.jpg" },
    { titulo: "El Abogado del Crimen", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTc3ODk0MTY0N15BMl5BanBnXkFtZTgwOTU2MTEzMDE@._V1_.jpg" },
    { titulo: "Fury", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/pfte7wdMobMF4CVHuOxyu6oqeeA.jpg" },
    { titulo: "By The Sea", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTUyNDU2MDMxM15BMl5BanBnXkFtZTgwMzAzMTk1NjE@._V1_.jpg" },
    { titulo: "The Big Short", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZDZkNDQ3YjktYjBlZC00YTY1LTgxOGYtY2RhMWFhZmNkZGY3XkEyXkFqcGc@.V1.jpg" },
    { titulo: "Allied", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNWJiOTUzODItNTYzYS00NGY0LWIzZmEtZDA4MGI5ZWMxMjM2XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "War Machine", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTg0ODE5NzE0OV5BMl5BanBnXkFtZTgwOTExODcyMjI@._V1_.jpg" },
    { titulo: "Deadpool 2", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://preview.redd.it/new-deadpool-2-poster-v0-878r7e1hmle01.jpg?auto=webp&s=2f03e75ff6a45766bbbf16a95cbe0ecc3d6c7046" },
    { titulo: "Once Upon a Time in Hollywood", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://www.vintagemovieposters.co.uk/wp-content/uploads/2019/06/IMG_9717.jpeg" },
    { titulo: "Ad Astra", categoria: "brad-pitt", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/i37759GsWqeWAf0pUcaY9nNKFa3.jpg" },
    { titulo: "Snatch", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/I/717j6p4oeRL.jpg" },
    { titulo: "The Mexican", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/5GqF6rVjUW6CVTuj7w1A2JE49AF.jpg" },
    { titulo: "Juego de Espías", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/6y8M1rxjKofQCRKKe6xeV91K2Fc.jpg" },
    { titulo: "Ocean's Eleven", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/f4fnyMu4VkQ8gOgYOKF1xzugDXJ.jpg" },
    { titulo: "Troya", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/a07wLy4ONfpsjnBqMwhlWTJTcm.jpg" },
    { titulo: "Ocean's Twelve", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/Ad55M8newGWemFWCsMAkxO3fDwl.jpg" },
    { titulo: "Sr. y Sra. Smith", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/kjD700RtyhveN3ZbOnSvUSne0Qj.jpg" },
    { titulo: "Babel", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/os6R4WX50SoOclBt0U9XjdyReaR.jpg" },
    { titulo: "Ocean's Thirteen", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTMyNTc1NzY5MV5BMl5BanBnXkFtZTcwNDM4NTQzMw@@._V1_.jpg" },
    { titulo: "El Asesinato de Jesse James por el Cobarde Robert Ford", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTY2NDI2MTc2NV5BMl5BanBnXkFtZTcwNjA2NTQzMw@@._V1_.jpg" },
    { titulo: "Quémese Después de Leerse", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/jdwSkQu3XirmX18MNj8CqFWsCk.jpg" },
    { titulo: "El Curioso Caso de Benjamin Button", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://a.ltrbxd.com/resized/sm/upload/yh/ob/ip/lw/gjMR102u5hPdIAWX7O2rim8ZWgA-0-600-0-900-crop.jpg?v=3beffc5097" },
    { titulo: "Inglorious Basterds", categoria: "brad-pitt", subtipo: "2000", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BODZhMWJlNjYtNDExNC00MTIzLTllM2ItOGQ2NGVjNDQ3MzkzXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Triunfo Amargo", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZDQ2NTE1YTQtMmNkNy00ZmMwLTg1YmEtNTRhMzM1ZGJmNDk2XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Thelma & Louise", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vbRAGLzbC75QfiKD1lKjmnQGuph.jpg" },
    { titulo: "Johnny Suede", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/x1ZvgHwDUFsgqWhYUEcJcyHmZQW.jpg" },
    { titulo: "Cool World", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/files/cool_world_1992_original_film_art_5000x.webp?v=1686089799" },
    { titulo: "El Río de la Vida", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/aVP45oS2cBL4WtZ1kB7r8uarruB.jpg" },
    { titulo: "Kalifornia", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/Kalifornia_1993_original_film_art_5000x.jpg?v=1554296872" },
    { titulo: "True Romance", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/39lXk6ud6KiJgGbbWI2PUKS7y2.jpg" },
    { titulo: "Entrevista con el Vampiro", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://i.pinimg.com/736x/94/0b/fd/940bfd06ebc45e0bafc3190c70914244.jpg" },
    { titulo: "Leyendas de Pasión", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/sJAndXoBumsqO3JPdoMkOEm47u2.jpg" },
    { titulo: "Se7en", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/191nKfP0ehp3uIvWqgPbFmI4lv9.jpg" },
    { titulo: "12 Monkeys", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/gt3iyguaCIw8DpQZI1LIN5TohM2.jpg" },
    { titulo: "Los Hijos de la Calle", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNzAxYzg0MWItYjYzNy00NmY0LWI5ZTQtYjEyOTVlMDQ1ZjRhXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Enemigo Íntimo", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNDU1ODI0ZGUtZDA3My00NGViLWFhM2QtNmI1NzU0ZTA1ODc5XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Siete Años en el Tíbet", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71Qw5ypC-HL.jpg" },
    { titulo: "Meet Joe Black", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/xqq6UYCXMzh0Brb8GPt5cyxRTGf.jpg" },
    { titulo: "Club de la Pelea", categoria: "brad-pitt", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81D+KJkO4SL.jpg" },
    { titulo: "El Lado Oscuro del Sol", categoria: "brad-pitt", subtipo: "1980", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/yxSwmSeoEIJL5BhDEUmURGx38qQ.jpg" },
    { titulo: "Happy Together", categoria: "brad-pitt", subtipo: "1980", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNmRmNjM1N2ItYzZiYy00N2JjLTkxYjctMjZhMjU0ZjM4OTdkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Cutting Class", categoria: "brad-pitt", subtipo: "1980", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYWVhNDNiMDItNzJmMy00YjJmLTg0MjQtMWFlMTI4ZGJkNDdkXkEyXkFqcGc@._V1_.jpg" },

    // --- FLORENCE PUGH (con filtros por década) ---
    { titulo: "Black Widow", categoria: "florence-pugh", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNjZjOGVhOTEtNzY4Mi00MjQzLTlmYjktNzMyMDExMWJlODEwXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Hawkeye", categoria: "florence-pugh", subtipo: "2020", tipo: "Serie", poster: "https://lumiere-a.akamaihd.net/v1/images/unknown_61ca7b47.png" },
    { titulo: "Don't Worry Darling", categoria: "florence-pugh", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BODVhYzM3M2YtMTUwYi00NjE4LWIwYzktOTM1MTYwZWU0ZTBiXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "The Wonder", categoria: "florence-pugh", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNDU5NzljODgtNjg1OS00NWZlLTg3MzEtMDU0YWI2ZjEwNzk2XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Gato con Botas: El Último Deseo", categoria: "florence-pugh", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/AasDZ3tlfx4KjBt96QjbvBPmk4p.jpg" },
    { titulo: "A Good Person", categoria: "florence-pugh", subtipo: "2020", tipo: "Película", poster: "https://www.newdvdreleasedates.com/images/posters/large/a-good-person-2023-02.jpg" },
    { titulo: "Oppenheimer", categoria: "florence-pugh", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/lrcuwcNiiZjoB68fzvSOPwu9JWv.jpg" },
    { titulo: "El Niño y La Garza", categoria: "florence-pugh", subtipo: "2020", tipo: "Película", poster: "https://i.pinimg.com/736x/29/8c/a2/298ca2bc6141194372b913ddd9a450ed.jpg" },
    { titulo: "Dune: Parte Dos", categoria: "florence-pugh", subtipo: "2020", tipo: "Película", poster: "https://deadline.com/wp-content/uploads/2023/05/FvIhyI9aUAUZz6l.jpeg?w=819" },
    { titulo: "We Live in Time", categoria: "florence-pugh", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vEmiJetB0C7VJjw60QNXO0oMMws.jpg" },
    { titulo: "Thunderbolts*", categoria: "florence-pugh", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71Y2ZfgT+4L.jpg" },
    { titulo: "Marvel Zombies", categoria: "florence-pugh", subtipo: "2020", tipo: "Serie", poster: "https://image.tmdb.org/t/p/original/5UbrwzZUR5lcoDds2phuahFHHhi.jpg" },

    // --- EMMA STONE (con filtros por década) ---
    { titulo: "The Croods: A New Age", categoria: "emma-stone", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61wgHMAdD7L.jpg" },
    { titulo: "Cruella", categoria: "emma-stone", subtipo: "2020", tipo: "Película", poster: "https://purodiseno.lat/wp-content/uploads/2021/04/CRUELLA-692x1024.jpg" },
    { titulo: "Poor Things", categoria: "emma-stone", subtipo: "2020", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/317259.jpg" },
    { titulo: "Kinds of Kindness", categoria: "emma-stone", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/50lPmjIpDs8gKfgK7fPIeKzpllh.jpg" },
    { titulo: "Eddington", categoria: "emma-stone", subtipo: "2020", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/315876.jpg" },
    { titulo: "Bugonia", categoria: "emma-stone", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/fndDv16tDmgvMBJd2bb2w5CDxpe.jpg" },

    // --- JENNA ORTEGA (con filtros por década) ---
    { titulo: "The Babysitter: Killer Queen", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BODk1ZmQ4ODItZjcwZi00MTUxLWE1YWMtMDY2NWJhNzJjMGEyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Jurassic World: Camp Cretaceous", categoria: "jenna-ortega", subtipo: "2020", tipo: "Serie", poster: "https://i.pinimg.com/736x/74/11/c3/7411c3caaacf8d11924f022c114cabad.jpg" },
    { titulo: "Yes Day", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNjNmYThjN2UtODc3YS00ZDMxLTk1OGItZmM2OTFiMzJiNDg2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "The Fallout", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMzRmN2Q2NmYtODAxMi00OGZmLWIyODAtMjU0ZDVmNGNiY2EyXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Studio 666", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMmJkYjg3YjEtYTEwMi00ODI0LWEwYmMtZDNmNTIzZDU0YTExXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "X", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81GvfW5Fa7L._AC_UF894,1000_QL80_.jpg" },
    { titulo: "American Carnage", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81vBUxhEzJL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Wednesday", categoria: "jenna-ortega", subtipo: "2020", tipo: "Serie", poster: "https://m.media-amazon.com/images/I/712iUgQM16L._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Scream VI", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/750/317313.jpg" },
    { titulo: "Miller's Girl", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNmViZmI2NGYtNTU2YS00NDI1LTg1NjktMzdhNWVlODdmOWM1XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Winter Spring Summer or Fall", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZmQ2MGRhYWQtZjQ4Ni00Y2EyLWI2OGQtOTYzNDkwZGU1NmI4XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Beetlejuice Beetlejuice", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://i.pinimg.com/736x/52/20/e4/5220e48893013343e515e148f0d387f9.jpg" },
    { titulo: "Fantasmas", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOGUxMmFjMjYtODQ2ZS00YTNiLWFjNDktNTRhMzgyYjcyOTMyXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Death of a Unicorn", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNjUzMjhkZjktNTU5Mi00MzhmLWJhMTQtZjhkYjczOTEzM2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Hurry Up Tomorrow", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNDQ2MGIyNDQtYjVhOS00ZjI1LWFmYzctMWI2MGZhZGFhZWM4XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Klara and the Sun", categoria: "jenna-ortega", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/xqovj2p6HRsgHxN81qYAYF4StgM.jpg" },

    // --- MARGOT ROBBIE (con filtros por década) ---
    { titulo: "Vigilante", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZjNjYjI2OGUtOTk0Zi00ZDlmLTgwZjYtOGY2YTUyZGM3ZDc5XkEyXkFqcGc@.V1.jpg" },
    { titulo: "I.C.U", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYWMwMDg2YTQtODU5ZS00YzJmLWE2MWQtMTA0OWExNThhNmJiXkEyXkFqcGc@.V1.jpg" },
    { titulo: "About Time", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTA1ODUzMDA3NzFeQTJeQWpwZ15BbWU3MDgxMTYxNTk@.V1_FMjpg_UX1000.jpg" },
    { titulo: "The Wolf of Wall Street", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@.V1.jpg" },
    { titulo: "Z for Zachariah", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTUwMTUwODUzNV5BMl5BanBnXkFtZTgwMDIxMDE5NTE@.V1.jpg" },
    { titulo: "Focus", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/I/51HjYkKwu8L.AC_UF894,1000_QL80.jpg" },
    { titulo: "Suite Française", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/324706.jpg" },
    { titulo: "The Big Short", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZDZkNDQ3YjktYjBlZC00YTY1LTgxOGYtY2RhMWFhZmNkZGY3XkEyXkFqcGc@.V1.jpg" },
    { titulo: "Whiskey Tango Foxtrot", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/750/324143.jpg" },
    { titulo: "La Leyenda de Tarzán", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMzY3OTI0OTcyMF5BMl5BanBnXkFtZTgwNjkxNTAwOTE@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Suicide Squad", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/sk3FZgh3sRrmr8vyhaitNobMcfh.jpg" },
    { titulo: "Goodbye Christopher Robin", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZGVmNWZiNDgtMzk2YS00ZGM2LWFjOTQtODk5OGRkZmMzNmYzXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Yo, Tonya", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://cdng.europosters.eu/pod_public/1300/323134.jpg" },
    { titulo: "Peter Rabbit", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://www.movieposters.com/cdn/shop/products/d859b47d3fdf1f8660e0f09f4afa7fa7_14b224a4-6698-4168-bde5-d98c55c626c1_1024x1024.jpg?v=1759439329" },
    { titulo: "Terminal", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOTliYzYyYTAtNzBjMy00MGE2LThmOWMtZWM1ZmI0MDE1ZjM3XkEyXkFqcGc@.V1.jpg" },
    { titulo: "Mary Queen of Scots", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/5166b095985439.5ea4161223dcd.jpg" },
    { titulo: "Dreamland", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNzNhNmZhZjQtZTI0ZC00NDFhLWFlZTUtODE4NjgwZmMyZjI2XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Once Upon a Time in Hollywood", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://www.vintagemovieposters.co.uk/wp-content/uploads/2019/06/IMG_9717.jpeg" },
    { titulo: "Bombshell", categoria: "margot-robbie", subtipo: "2010", tipo: "Película", poster: "https://m.media-amazon.com/images/I/51jbt9gccQL.jpg" },
    { titulo: "Birds of Prey and The Fantabulous Emancipation of One Harley Quinn", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://ew.com/thmb/sT-h3pYSc53fKCWxtv5ro4Midno=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/birds-of-prey-2000-90f0db5838084a8a8c2eca14edd37e1f.jpg" },
    { titulo: "Peter Rabbit 2: The Runaway", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/71-gh-srLUL.AC_UF894,1000_QL80.jpg" },
    { titulo: "The Suicide Squad", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://postercity.com.ar/wp-content/uploads/2021/10/the-SUICIDE-SQUAD-60-X-90.jpg" },
    { titulo: "Amsterdam", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNzgxNTQzYTEtMDI3Yi00OGQ1LWFkNGMtZDEyM2JlYmE0YzUyXkEyXkFqcGc@.V1.jpg" },
    { titulo: "Babylon", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61hxWeyTYcL.AC_UF894,1000_QL80.jpg" },
    { titulo: "Asteroid City", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/I/61fyOxnYzHL.AC_UF894,1000_QL80.jpg" },
    { titulo: "Barbie", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/dekMkQf0kqAmztUca9lX5e5Pjbp.jpg" },
    { titulo: "A Big Bold Beautiful Journey", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMzMwZWJiYjEtM2RkMi00ZDhjLTk4ZmMtZDQ2NDY2YTJkOTE5XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
    { titulo: "Wuthering Heights", categoria: "margot-robbie", subtipo: "2020", tipo: "Película", poster: "https://www.ecartelera.com/images/img/243200/243212_m.webp" },

    // --- ANDREW GARFIELD (con filtros por década) ---
    { titulo: "Mainstream", categoria: "andrew-garfield", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BYzNjYzVlYzktMTEzZS00ZjViLTg0MmQtOWRkZjNlYWQ0MGQ1XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Los Ojos de Tammy Faye", categoria: "andrew-garfield", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMzcyY2JkZDYtMDEwNS00YzRlLTgxZTAtMDc1YTJmNWIxZjRlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Tick, Tick... Boom!", categoria: "andrew-garfield", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BOGYyNGJmNzctYzZjZi00MzUzLTg3YTYtYjk0OTNjMzA1OTE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "Spider-Man: No Way Home", categoria: "andrew-garfield", subtipo: "2020", tipo: "Película", poster: "https://www.cinemascomics.com/wp-content/uploads/2022/01/poster-Spider-man-no-way-home.jpg" },
    { titulo: "Under The Banner of Heaven", categoria: "andrew-garfield", subtipo: "2020", tipo: "Serie", poster: "https://m.media-amazon.com/images/M/MV5BMDM2ZTA1ZjItMDlhNS00ZTMyLWI5MDEtOTk0YWI5ZmZjZjBkXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "We Live in Time", categoria: "andrew-garfield", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vEmiJetB0C7VJjw60QNXO0oMMws.jpg" },
    { titulo: "After the Hunt", categoria: "andrew-garfield", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMzYyOTAwODEtZTY4My00MjVkLWJjYjUtMjE2N2UzYTE3MTY3XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "The Magic Faraway Tree", categoria: "andrew-garfield", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNGUzNzQzNWQtZTI2My00YmE2LTkyYzItNzFhMTM3OTVkYmNlXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "The Uprising", categoria: "andrew-garfield", subtipo: "2020", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BODc1ZWRlMjQtMDc4NC00ODczLWIwNGMtZmFlZjA3YzIyZWVhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },

    // --- MARVEL MULTIVERSO: UNIVERSAL ---
    { titulo: "Howard The Duck", categoria: "universal", tipo: "Película", poster: "https://m.media-amazon.com/images/I/41IHpMp-VeL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Hulk (2003)", categoria: "universal", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BNTQxMmVlMTItMGFjYi00MTc2LWE5MzMtYjFhZWJmZGY0MTY5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },

    // --- ALFRED HITCHCOCK (con filtros por década) ---
    { titulo: "Frenzy", categoria: "alfred-hitchcock", subtipo: "1970", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/frenzy_1972_french_original_film_art_5000x.jpg?v=1605643383" },
    { titulo: "Family Plot", categoria: "alfred-hitchcock", subtipo: "1970", tipo: "Película", poster: "https://www.originalfilmart.com/cdn/shop/products/family_plot_1976_argentinean_original_film_art_f_spo_1600x.jpg?v=1562542017" },
    { titulo: "Psicosis", categoria: "alfred-hitchcock", subtipo: "1960", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/zdaucUFApic9SDmmmuShxhTeAyv.jpg" },
    { titulo: "The Birds", categoria: "alfred-hitchcock", subtipo: "1960", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/ADoJaT1s9Jlcfx3Tw2MIZ1BMxo.jpg" },
    { titulo: "Marnie", categoria: "alfred-hitchcock", subtipo: "1960", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTIyMmJmOGUtODMzMy00NTUxLWJmZTQtMWQ4NWM1ZTg5MjZlXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Torn Curtain", categoria: "alfred-hitchcock", subtipo: "1960", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/aBuwKukOiHcoM7uy3Dd9Vy0575V.jpg" },
    { titulo: "Topaz", categoria: "alfred-hitchcock", subtipo: "1960", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/hkZZpkW1uL8jQdgfMDsX0fvrCaG.jpg" },
    { titulo: "Stage Fright", categoria: "alfred-hitchcock", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/xW7x1OzIbX86wGRuMcF2nSFuGSn.jpg" },
    { titulo: "Strangers on a Train", categoria: "alfred-hitchcock", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/xTh7KTQGkjK9UTNxj4pznK8Gd7B.jpg" },
    { titulo: "I Confess", categoria: "alfred-hitchcock", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/2b98tk8mZFNdjDfWN0esB628dDB.jpg" },
    { titulo: "Dial M for Murder", categoria: "alfred-hitchcock", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/5PYKzpmfN3i2yKocJWiBcKV5b3M.jpg" },
    { titulo: "La Ventana Indiscreta", categoria: "alfred-hitchcock", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/ILVF0eJxHMddjxeQhswFtpMtqx.jpg" },
    { titulo: "To Catch a Thief", categoria: "alfred-hitchcock", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/1IpcZa95x8ICSGodhXzQIYEWZzv.jpg" },
    { titulo: "The Trouble With Harry", categoria: "alfred-hitchcock", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/uUXLq7fEG3hI46ZFMZzgHj11S6S.jpg" },
    { titulo: "The Wrong Man", categoria: "alfred-hitchcock", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/pO5XR2R56RAbVjdks9gGGn0fbOa.jpg" },
    { titulo: "Vertigo", categoria: "alfred-hitchcock", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/NEAIdIOL0HucwyZwrsKCdjMqp8.jpg" },
    { titulo: "North By Northwest", categoria: "alfred-hitchcock", subtipo: "1950", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/lStZVLHQmn7MSWx0OcI0tfaGwsI.jpg" },
    { titulo: "Rebecca", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/ws16UWLcehSjzbLywQExLOMCzCv.jpg" },
    { titulo: "Foreign Correspondent", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/avuaYEZlDU3F4xtLsDfxNmKaGu4.jpg" },
    { titulo: "Mr & Mrs Smith", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/lIFBvhh9EbQpwkYa135dQvMHXSj.jpg" },
    { titulo: "Suspicion", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/sRlbTHhFG7wIlxszvjvmoGOeWuy.jpg" },
    { titulo: "Saboteur", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/iDKOOTymUZg0WAWPcbdP6nPZEFF.jpg" },
    { titulo: "Shadow of a Doubt", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/5d3zos0yHxJta4cyVKWZFtng7nP.jpg" },
    { titulo: "Lifeboat", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/AoeTcnHohATkwWbs0ZQbrmojJSu.jpg" },
    { titulo: "Spellbound", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/41UovwqmVtD530uVuMn3nSkSTlm.jpg" },
    { titulo: "Notorious", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/4RERYb1NIQrJHYY5e8nUlYM7t2z.jpg" },
    { titulo: "The Paradine Case", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/svWsUQcFBEOyYqbnhkP4dYu4YfJ.jpg" },
    { titulo: "Rope", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/albjhIlWHevVSN8Ehv4KuYnOKuS.jpg" },
    { titulo: "Under Capricorn", categoria: "alfred-hitchcock", subtipo: "1940", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/5mZXhGTSbkZGZgRvT54EACmVfrw.jpg" },
    { titulo: "Juno and The Paycock", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/rN31vZFD8hzQnJ6umUtLNl87Mrw.jpg" },
    { titulo: "Murder!", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/bGaeDRFdmR5KfyiB6OVh4ivsDWW.jpg" },
    { titulo: "The Skin Game", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/dAjiLI0DU40NJ1FAWb8GFQ7gf47.jpg" },
    { titulo: "Rich and Strange", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/8uELURwfZlQBsy26VUk7ap0v3ZS.jpg" },
    { titulo: "Number Seventeen", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/oNJ8Bl2RyC7e77VtUhx4WQ3IxKz.jpg" },
    { titulo: "Waltzes From Vienna", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/8Qd7wGmfK3xOW0yMkKv6x6Cgqdw.jpg" },
    { titulo: "The Man Who Knew Too Much", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vHchap4Ut9sS78m4jKFHb6kHQX6.jpg" },
    { titulo: "The 39 Steps", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/oC81jK6aAug4MA0xzYVngHmjsZS.jpg" },
    { titulo: "Secret Agent", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/acmee4zO9hbW4OPfLz2j6QGZ70q.jpg" },
    { titulo: "Sabotage", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/A6cyOt9mhmvWA2uHcVsGkcCaHCz.jpg" },
    { titulo: "Young and Innocent", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/xei9wDfMBM3AvKGoG60r8YiNhbF.jpg" },
    { titulo: "The Lady Vanishes", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/qyP7W58Z8BUwl2tL1UE1VVXEU0K.jpg" },
    { titulo: "Jamaica Inn", categoria: "alfred-hitchcock", subtipo: "1930", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/cbIwfXHfLA7vNEemwN8BHjciK6c.jpg" },
    { titulo: "The Pleasure Garden", categoria: "alfred-hitchcock", subtipo: "1920", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/6yO5WHbA7z9BVV1NkpOC1DSgD8X.jpg" },
    { titulo: "The Lodger: A Story of the London Fog", categoria: "alfred-hitchcock", subtipo: "1920", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/kjhfOL3Nv0rUMM9xzbhjdLYjSF.jpg" },
    { titulo: "The Mountain Eagle", categoria: "alfred-hitchcock", subtipo: "1920", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMzhkOGI4NTAtMmY5MC00ZTgzLTkwZGItM2VlNDY3ZWJjMmRiXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "The Ring", categoria: "alfred-hitchcock", subtipo: "1920", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/yxPYqDAJ7gTMEk05e5YwVFoDavB.jpg" },
    { titulo: "Downhill", categoria: "alfred-hitchcock", subtipo: "1920", tipo: "Película", poster: "https://m.media-amazon.com/images/M/MV5BZjM3YTZjOGUtY2VjNy00ODg2LWJhNzAtMGQ3MjNiZTk0MWQzXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "The Farmer's Wife", categoria: "alfred-hitchcock", subtipo: "1920", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/Af9LttBipvPnbFHhM5SabdJ5xXi.jpg" },
    { titulo: "Champagne", categoria: "alfred-hitchcock", subtipo: "1920", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/65rQoBoxM1H7HBTAGtWmn4N1Ztq.jpg" },
    { titulo: "The Manxman", categoria: "alfred-hitchcock", subtipo: "1920", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/3OirGdNMm7vzboDy0j3zudQopw8.jpg" },
    { titulo: "Blackmail", categoria: "alfred-hitchcock", subtipo: "1920", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/aMH3UBjlX4ChgGsEvbDRSOkz5Hk.jpg" },

    // --- TOMB RAIDER (con filtro "Survivor") ---
    { titulo: "Tomb Raider (2013)", categoria: "tomb-raider", subtipo: "survivor", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BZWRhNDIwMDQtOTE1ZS00YTQ1LThlYmYtYzBhZjE4NTEwZTIyXkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Rise of The Tomb Raider", categoria: "tomb-raider", subtipo: "survivor", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BMzI0NDJkNGUtOTc1MS00MzgyLThmYjgtOGU1YzdmYjhlMGU5XkEyXkFqcGc@._V1_.jpg" },
    { titulo: "Shadow of The Tomb Raider", categoria: "tomb-raider", subtipo: "survivor", tipo: "Videojuego", poster: "https://m.media-amazon.com/images/M/MV5BNTI1ZTM4YjgtZjY0My00YTE2LTlhMTUtMGJlY2UwNzY1NjZmXkEyXkFqcGc@._V1_.jpg" },

    // --- ANDREW GARFIELD: Década de 2010 ---
    { titulo: "Never Let Me Go", categoria: "andrew-garfield", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/yUFrKRBLbVAtgSBMTVAL4wOXq6z.jpg" },
    { titulo: "The Social Network", categoria: "andrew-garfield", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg" },
    { titulo: "The Amazing Spider-Man", categoria: "andrew-garfield", subtipo: "2010", tipo: "Película", poster: "https://www.mubis.es/media/articles/1554/15320/nuevo-poster-y-trailer-de-the-amazing-spider-man-original.jpg" },
    { titulo: "The Amazing Spider-Man 2", categoria: "andrew-garfield", subtipo: "2010", tipo: "Película", poster: "https://cdn.europosters.eu/image/750/20688.jpg" },
    { titulo: "99 Homes", categoria: "andrew-garfield", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/6Zul5Spndok1WriSMfiyQFbAyLY.jpg" },
    { titulo: "Hacksaw Ridge", categoria: "andrew-garfield", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/7FklL1g5VYV0mUKdnPwuFRuJiKy.jpg" },
    { titulo: "Silence", categoria: "andrew-garfield", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/dIlmZqUGtuAHgsYgXpECrHGtER4.jpg" },
    { titulo: "Breathe", categoria: "andrew-garfield", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/j4blxUNlu4CiaB07iNO02sWv6hb.jpg" },
    { titulo: "Under The Silver Lake", categoria: "andrew-garfield", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/jDiPSt9oMcJbNzf8FZRtvU4rR98.jpg" },

    // --- DAVID FINCHER (con filtros por década) ---
    { titulo: "Mank", categoria: "david-fincher", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vqYPkLSKESdWvUsTJiAYAHuGOpj.jpg" },
    { titulo: "The Killer", categoria: "david-fincher", subtipo: "2020", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/2q719JbdFBMPo22DEW4VDZpsCuk.jpg" },
    { titulo: "The Social Network", categoria: "david-fincher", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg" },
    { titulo: "The Girl with the Dragon Tattoo", categoria: "david-fincher", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/vbLedKc1BUF4FOH1GyHW62FulCc.jpg" },
    { titulo: "Gone Girl", categoria: "david-fincher", subtipo: "2010", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/tQf4DUygWo64AOuqgk4jEDCE3Ws.jpg" },
    { titulo: "Panic Room", categoria: "david-fincher", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/qdiEI16Ax9EPBbx5oSwp7eBclX9.jpg" },
    { titulo: "Zodiac", categoria: "david-fincher", subtipo: "2000", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/7osnnJ0QRfsUYzp3Pk2WUzmiJJa.jpg" },
    { titulo: "El Curioso Caso de Benjamin Button", categoria: "david-fincher", subtipo: "2000", tipo: "Película", poster: "https://a.ltrbxd.com/resized/sm/upload/yh/ob/ip/lw/gjMR102u5hPdIAWX7O2rim8ZWgA-0-600-0-900-crop.jpg?v=3beffc5097" },
    { titulo: "Alien 3", categoria: "david-fincher", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/hlabk6APJUeihZDaSD9N6iI0f4g.jpg" },
    { titulo: "Se7en", categoria: "david-fincher", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/191nKfP0ehp3uIvWqgPbFmI4lv9.jpg" },
    { titulo: "The Game", categoria: "david-fincher", subtipo: "1990", tipo: "Película", poster: "https://image.tmdb.org/t/p/original/xZ4QX9O8jr0JrfZzRPkt1VLfo7c.jpg" },
    { titulo: "Club de la Pelea", categoria: "david-fincher", subtipo: "1990", tipo: "Película", poster: "https://m.media-amazon.com/images/I/81D+KJkO4SL.jpg" },

    // --- GREEN LANTERN - HAL JORDAN (con filtros por etapa de lectura) ---
    { titulo: "Green Lantern: Origen Secreto (DC Colección de Novelas Gráficas #6)", categoria: "green-lantern-hal-jordan", subtipo: "origen", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_974824-MLA105818725485_012026-O.webp" },
    { titulo: "JLA: Año Uno (Parte Uno) (DC Colección Novelas Gráficas #10)", categoria: "green-lantern-hal-jordan", subtipo: "primeros-anos", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_921699-MLA105814877141_012026-O.webp" },
    { titulo: "JLA: Año Uno (Parte Dos) (DC Colección Novelas Gráficas #11)", categoria: "green-lantern-hal-jordan", subtipo: "primeros-anos", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_793375-MLA99914200433_112025-O.webp" },
    { titulo: "Green Lantern Corps: Relatos de los Corps (DC Colección Héroes y Villanos #62)", categoria: "green-lantern-hal-jordan", subtipo: "corps", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_817134-MLA96880835826_112025-O.webp" },
    { titulo: "Green Arrow / Green Lantern: Héroes Errantes (DC Colección Novelas Gráficas #56)", categoria: "green-lantern-hal-jordan", subtipo: "bronze-age", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_794879-MLA53177354049_012023-O.webp" },
    { titulo: "Esenciales DC #24: Green Lantern / Green Arrow Edición Absoluta (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "bronze-age", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/green_lantern_green_arrow_cov-96678bddcba5edf30317226036375082-1024-1024.webp" },
    { titulo: "Liga de la Justicia de América: Crisis en Nueva Génesis (DC Colección Héroes y Villanos #25)", categoria: "green-lantern-hal-jordan", subtipo: "bronze-age", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_868705-MLA100587831008_122025-O.webp" },
    { titulo: "Batman/Superman: Los Mejores del Mundo #1 al #8 (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "silver-bronze-age", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_superman_-_los_mejores_del_mundo_cov11-194d38fd286024b77b16853357900328-1024-1024.webp" },
    { titulo: "Crisis en Tierras Infinitas (ECC)", categoria: "green-lantern-hal-jordan", subtipo: "crisis", tipo: "Cómic", poster: "https://i1.whakoom.com/large/12/3d/151d7198e4e3410eb85e3d3c89c7f001.jpg" },
    { titulo: "Esenciales DC #2: Crisis en Tierras Infinitas (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "crisis", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/crisis_cov_arg1-a4a9db904b75118e4315980054342033-1024-1024.webp" },
    { titulo: "Crisis en Tierras Infinitas Vol. 1 (DC Colección Héroes y Villanos #30)", categoria: "green-lantern-hal-jordan", subtipo: "crisis", tipo: "Cómic", poster: "https://revisterianippur.com/wp-content/uploads/2024/06/Crisis-en-Tierras-Infinitas-coleccion-Heroes-y-Villanos-DC-vol.-30.webp" },
    { titulo: "Crisis en Tierras Infinitas Vol. 2 (DC Colección Héroes y Villanos #35)", categoria: "green-lantern-hal-jordan", subtipo: "crisis", tipo: "Cómic", poster: "https://revisterianippur.com/wp-content/uploads/2024/08/Crisis-en-Tierras-Infinitas-parte-II-Coleccion-Heroes-y-Villanos-DC-vol.-35.webp" },
    { titulo: "Esenciales DC #25: ¡Invasión! (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "invasion", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/invasion_cov-6ce1398de623d16ffd17244156497208-640-0.webp" },
    { titulo: "Trinidad (DC Colección Novelas Gráficas #25)", categoria: "green-lantern-hal-jordan", subtipo: "post-crisis", tipo: "Cómic", poster: "https://d22fxaf9t8d39k.cloudfront.net/0e80a152fae6360973437a9df2c4f61a9c42d8464e9cde74a0f1f1e3819e9894223891.jpg" },
    { titulo: "Esenciales DC #6: Green Lantern: Ocaso Esmeralda (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "caida-hal-jordan", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/green_lantern_ocaso_esmeralda_cov_arg-11-00c3be80324309cba616185454326831-1024-1024.webp" },
    { titulo: "Green Lantern: Crepúsculo Esmeralda (DC Colección Héroes y Villanos #29)", categoria: "green-lantern-hal-jordan", subtipo: "caida-hal-jordan", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_631881-MLA83939488294_042025-O.webp" },
    { titulo: "Green Lantern: Caballeros Esmeralda (Ovni Press)", categoria: "green-lantern-hal-jordan", subtipo: "caida-hal-jordan", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/green_lantern_-_caballeros_esmeralda_cov-4346afa99142f6af5f17437478591760-1024-1024.webp" },
    { titulo: "Esenciales DC #8: Hora Cero: Crisis en el Tiempo (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "caida-hal-jordan", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/hora-cero-cov-arg1-56b80fe7a5303ce08016221731674919-1024-1024.webp" },
    { titulo: "Esenciales DC #9: La Noche Final (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "caida-hal-jordan", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/la-noche-final-cov1-1b10cebc75f426b06b16312248170865-640-0.webp" },
    { titulo: "Esenciales DC #4: Crisis de Identidad (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "regreso-vida", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/crisis_de_identidad_cov_arg1-d918043e328c6cfe5016136913511589-1024-1024.webp" },
    { titulo: "Esenciales DC #18: Green Lantern: Renacimiento (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "regreso-vida", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/green_lantern_renacimiento1-aa30848fc26ba013fa16778128850771-1024-1024.webp" },
    { titulo: "Green Lantern: Renacimiento (DC Colección Héroes y Villanos #33)", categoria: "green-lantern-hal-jordan", subtipo: "regreso-vida", tipo: "Cómic", poster: "https://www.cuartomundo.cl/wp-content/uploads/2023/08/Green-Lantern-Renacimiento.jpg" },
    { titulo: "Green Lantern: Ser un Green Lantern (DC Colección Novelas Gráficas #85)", categoria: "green-lantern-hal-jordan", subtipo: "regreso-vida", tipo: "Cómic", poster: "https://i1.whakoom.com/small/23/1d/fe337151b3e8460ba1391008d2a19e1f.jpg" },
    { titulo: "Green Lantern: Sin Miedo (Ovni Press)", categoria: "green-lantern-hal-jordan", subtipo: "regreso-vida", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/greenlanter_sin_miedo_cov-9f25a29a48c03b5a6817856279516525-1024-1024.webp" },
    { titulo: "Green Lantern: La Guerra de los Sinestro Corps Vol. 1 (DC Colección Héroes y Villanos #37)", categoria: "green-lantern-hal-jordan", subtipo: "regreso-vida", tipo: "Cómic", poster: "https://revisterianippur.com/wp-content/uploads/2024/05/37-Green-Lantern-La-guerra-de-los-siniestro-corps-vol.1.webp" },
    { titulo: "Green Lantern: La Guerra de los Sinestro Corps Vol. 2 (DC Colección Héroes y Villanos #46)", categoria: "green-lantern-hal-jordan", subtipo: "regreso-vida", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_616475-MLA97337905075_112025-O.webp" },
    { titulo: "Esenciales DC #5: Crisis Infinita (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "infinite-crisis", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/crisis-infinita-cov-arg1-b62d0ca8cd6287e91416179067865292-1024-1024.webp" },
    { titulo: "Crisis Infinita: Vol 1 (DC Colección Héroes y Villanos #44)", categoria: "green-lantern-hal-jordan", subtipo: "infinite-crisis", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_674010-MLA78158072397_082024-O.webp" },
    { titulo: "Crisis Infinita Vol. 2 (DC Colección Héroes y Villanos #48)", categoria: "green-lantern-hal-jordan", subtipo: "infinite-crisis", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_919978-MLA100578724660_122025-O.webp" },
    { titulo: "Crisis Infinita: La Guerra Rann/Thanagar (DC Colección Héroes y Villanos #32)", categoria: "green-lantern-hal-jordan", subtipo: "infinite-crisis", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_743120-MLA76338165211_052024-O.webp" },
    { titulo: "Liga de la Justicia de América: La Senda del Tornado (DC Colección Héroes y Villanos #50)", categoria: "green-lantern-hal-jordan", subtipo: "infinite-crisis", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_651256-MLA113922878383_062026-O.webp" },
    { titulo: "Liga de la Justicia: La Saga del Rayo (DC Colección Héroes y Villanos #56)", categoria: "green-lantern-hal-jordan", subtipo: "infinite-crisis", tipo: "Cómic", poster: "https://www.abacus.coop/on/demandware.static/-/Sites-AbacusMaster/default/dwa182d48d/images/large/1479286.96.jpg" },
    { titulo: "Esenciales DC #12: Crisis Final (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "crisis-final-blackest-night", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/crisis_final_cov1-94793d73d957a1245716378555583021-640-0.webp" },
    { titulo: "Esenciales DC #11: La Noche más Oscura (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "crisis-final-blackest-night", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/la_noche_mas_oscura_2da_cov-a31e86028f1375b6e917685742571677-1024-1024.webp" },
    { titulo: "Esenciales DC #1: Flashpoint Absoluto (Ovni)", categoria: "green-lantern-hal-jordan", subtipo: "flashpoint", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/326/487/products/flashpoint-absoluto1-f467ab7a6e3e2c3c2d15987237989496-640-0.webp" },
    { titulo: "Flashpoint (Novelas Gráficas #60)", categoria: "green-lantern-hal-jordan", subtipo: "flashpoint", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_630959-MLA53159634445_012023-O.webp" },
    { titulo: "Green Lantern Nuevos 52: #1 al #11", categoria: "green-lantern-hal-jordan", subtipo: "nuevos-52", tipo: "Cómic", poster: "https://i1.whakoom.com/large/38/2e/b3cf9b76a3a649f39f95232ee4a98a56.jpg" },
    { titulo: "Maldad Eterna (DC Colección Héroes y Villanos #5)", categoria: "green-lantern-hal-jordan", subtipo: "nuevos-52", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/057/977/products/hyv_05_maldad_eterna_cover_def1-4b912f8d3b3006031e16410646277347-640-0.webp" },
    { titulo: "Green Lantern Nuevos 52: #12 al #19", categoria: "green-lantern-hal-jordan", subtipo: "nuevos-52", tipo: "Cómic", poster: "https://i1.whakoom.com/large/32/12/e467e84f424f48e5ad1329565cc10779.jpg" },
    { titulo: "Liga de la Justicia: La Guerra de Darkseid Vol. 1 (DC Colección Héroes y Villanos #14)", categoria: "green-lantern-hal-jordan", subtipo: "nuevos-52", tipo: "Cómic", poster: "https://i1.whakoom.com/small/3d/0e/845a8a4d65254cbe9bbeeb9023a72194.jpg" },
    { titulo: "Liga de la Justicia: La Guerra de Darkseid Vol. 2 (Héroes y Villanos #19)", categoria: "green-lantern-hal-jordan", subtipo: "nuevos-52", tipo: "Cómic", poster: "https://revisterianippur.com/wp-content/uploads/2023/11/5f5a07c0023e42beaeed1025db250b4d.webp" },
    { titulo: "Green Lantern: Nuevos 52: #20 al #22", categoria: "green-lantern-hal-jordan", subtipo: "nuevos-52", tipo: "Cómic", poster: "https://i1.whakoom.com/large/3b/33/b8e526c1d4cb4bcf9d0aed3496d67dfd.jpg" },
    { titulo: "Green Lantern: Justicia Intergaláctica (Ovni Press)", categoria: "green-lantern-hal-jordan", subtipo: "regreso-morrison", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/green_lantern_vol_01_cov1-c89f47245b1cc1dff415972488952095-1024-1024.webp" },
    { titulo: "Green Lantern: Blackstars (Ovni Press)", categoria: "green-lantern-hal-jordan", subtipo: "regreso-morrison", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/green_lantern_blackstars_cov1-a38250e1e185458cfa16136902045048-640-0.webp" },
    { titulo: "Green Lantern: Temporada Dos (Ovni Press)", categoria: "green-lantern-hal-jordan", subtipo: "regreso-morrison", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/green_lantern_vol_02_cov1-b6c2a2d7bf4fe3677d16263181577273-480-0.webp" },

    // --- LOS NUEVOS 52: ORDEN DE LECTURA (filtro "Lanzamiento") ---
    { titulo: "Batman (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_827032-MLA99414583894_112025-O.webp" },
    { titulo: "Nightwing (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_898120-MLA76165301350_052024-O.webp" },
    { titulo: "Catwoman (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/710KqiymzQL._AC_UF350,350_QL50_.jpg" },
    { titulo: "Detective Comics (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://images.cdn1.buscalibre.com/fit-in/660x660/c6/da/c6da160e8ea3ef233097b2314a768b53.jpg" },
    { titulo: "Birds of Prey (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81PGqjvHTGL._AC_UF1000,1000_QL80_AIweblab1381794,T1_.jpg" },
    { titulo: "Batgirl (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://images.cdn1.buscalibre.com/fit-in/660x660/be/a1/bea13ddb5d49d3ccd3a2f3f1ae8ac627.jpg" },
    { titulo: "Batwoman (#0-5)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81281dOpB6L._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Red Hood and the Outlaws (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://images.cdn3.buscalibre.com/fit-in/660x660/52/be/52beaf424e4db137192a211e80dd2823.jpg" },
    { titulo: "Wonder Woman (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_637119-MLA76160885646_052024-O.webp" },
    { titulo: "Superman (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81Z+wNgdx6L._AC_UF1000,1000_QL80_AIweblab1381794,T1_.jpg" },
    { titulo: "Action Comics (#1-8)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://d22fxaf9t8d39k.cloudfront.net/3d7231a3b8bb2483c5abb866dc3a9b97a84d25c70840b8f59980d83e32b3dd3e3704.jpg" },
    { titulo: "Supergirl (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_693572-MLU77954853680_082024-O.webp" },
    { titulo: "Superboy (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://images.cdn1.buscalibre.com/fit-in/360x360/bc/30/bc300afee470980dfec759d7ba979dcb.jpg" },
    { titulo: "Justice League (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://images.cdn3.buscalibre.com/fit-in/660x660/9d/f1/9df166074d13797b2c3aef34c1a053ab.jpg" },
    { titulo: "Justice League Dark (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_968049-MLU75689058518_042024-O.webp" },
    { titulo: "The Flash (#1-8)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://images.cdn3.buscalibre.com/fit-in/660x660/9b/09/9b09a8240dd92bc1730da4df336edf3a.jpg" },
    { titulo: "Green Lantern (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/91Yw6yaFa7L._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Green Lantern Corps (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_827031-MLA51933832817_102022-O.webp" },
    { titulo: "Green Lantern: New Guardians (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81HggBt-1OL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Red Lanterns (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://images.cdn3.buscalibre.com/fit-in/360x360/54/c1/54c156d47fffaeaf582986f791d10290.jpg" },
    { titulo: "Aquaman (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_765381-MLA76369928611_052024-O.webp" },
    { titulo: "Green Arrow (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_956976-CBT76346540966_052024-O.webp" },
    { titulo: "Teen Titans (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_920126-MLA112682188809_062026-O.webp" },
    { titulo: "Suicide Squad (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_886585-MLA28245732841_092018-O.webp" },
    { titulo: "Animal Man (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/51BxLWvZilL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Swamp Thing (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/A10w8AwLcqL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Stormwatch (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://images.cdn3.buscalibre.com/fit-in/360x360/66/a3/66a3b2bbbc1dfc7d5f987470e913b844.jpg" },
    { titulo: "I, Vampire (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_864997-MLA75479113027_032024-O.webp" },
    { titulo: "Frankenstein, Agent of S.H.A.D.E. (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81BBMrrfqPL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Demon Knights (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81Cx0EU94-L._UF1000,1000_QL80_.jpg" },
    { titulo: "Deathstroke (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81G455ZmuQL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "All-Star Western (nueva, protagonizada por Jonah Hex) (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "lanzamiento", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81S2vrSt2ZL._AC_UF1000,1000_QL80_.jpg" },

    // --- LOS NUEVOS 52: ORDEN DE LECTURA (filtro "Tanda 2") ---
    { titulo: "Batman (#8-12, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://images.cdn2.buscalibre.com/fit-in/360x360/ee/d9/eed99a79647288a8ec935ff880f07e72.jpg" },
    { titulo: "Nightwing (#0, 8-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://comicsrus.com.au/cdn/shop/files/IMG_5159_0deda41d-475d-44f0-88c3-9ef776a73f1c_1024x1024.jpg?v=1710898341" },
    { titulo: "Catwoman (#8-12, #0)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/catwoman_v4_40_5b1706bcc08658.53640984.jpg?w=160" },
    { titulo: "Detective Comics (#8-12, #0, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/BM_DTCG_v5_DJ_54b4742d3bf831.61925973.jpg?w=160" },
    { titulo: "Birds of Prey (#8-13)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://media.mycomicshop.com/n_iv/600/1344497.jpg" },
    { titulo: "Batgirl (#7-13, #0)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://www.southsidecomicspgh.com/cdn/shop/files/large-7010788.jpg?v=1729201549" },
    { titulo: "Batwoman (#6-11)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/3407213-08a.jpg" },
    { titulo: "Red Hood and the Outlaws (#8-14)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/1/17/Red_Hood_and_the_Outlaws_Vol_1_8.jpg/revision/latest?cb=20120420131430" },
    { titulo: "Talon (#0-7)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/talon_5_5b31601f189548.44983177.jpg" },
    { titulo: "Wonder Woman (#7-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/A1TcUOmXqiL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Superman (#7-12, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://www.southsidecomicspgh.com/cdn/shop/files/large-6031354.jpg?v=1757631323&width=1946" },
    { titulo: "Action Comics (#9-12, #0, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/3/3f/Action_Comics_Vol_2_7_Variant.jpg/revision/latest?cb=20120308191436" },
    { titulo: "Supergirl (#0, 8-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/818YDp779oL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Superboy (#8-12, #0)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://i1.whakoom.com/small/25/0e/38e75c1059414c3689de0cad87285f2e.jpg" },
    { titulo: "Justice League (#7-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/7/7d/Justice_League_Vol_2_7_Frank_Variant.jpg/revision/latest?cb=20130205230043" },
    { titulo: "Justice League Dark (#7-13, #0, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/jldark_7_5b229cc6e98881.17775784.jpg" },
    { titulo: "The Flash (#9-12, #0, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/A1ljo2rNG7L.jpg" },
    { titulo: "Green Lantern (#7-12, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/71WxLHuAJzL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Green Lantern Corps (#8-14, #0)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/2026-03/T2396300145001.jpg" },
    { titulo: "Green Lantern: New Guardians (#8-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/gl_ng_7_5b2bfce45f63b0.44167416.jpg" },
    { titulo: "Red Lanterns (#8-12 + Stormwatch #9)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://imgix-media.wbdndc.net/ingest/book/preview/e8b4fa85-09e4-46ba-9007-d91799d89a20/c48797db-9c8e-4370-a763-25cf0d5a92e5/0.jpg?w=375&h=576&sharp=50&fit=fill&fill=blur&auto=format%2Ccompress&" },
    { titulo: "Aquaman (#7-13)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/AQMv7_DJ_5761d0f125a034.87733989.jpg" },
    { titulo: "Green Arrow (#7-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/A1fZr2zSR5L._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Teen Titans (#8-14 + DC Universe Presents #12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81Zb25yOZKL._UF1000,1000_QL80_.jpg" },
    { titulo: "Suicide Squad (#0, 8-13 + Resurrection Man #9)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/3/3f/Suicide_Squad_Vol_4_8.jpg/revision/latest?cb=20120412195755" },
    { titulo: "Animal Man (#7-11, #0, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/animalman_v2_8_5b298607dbd570.29207748.jpg" },
    { titulo: "Swamp Thing (#8-11, #0, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://i1.whakoom.com/small/3c/0c/02cf4a98550a4e138359359390f24853.jpg" },
    { titulo: "Stormwatch (#7-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/stmwch_v3_0_5b3154a63885a2.24154611.jpg" },
    { titulo: "I, Vampire (#7-12, cruza Justice League Dark #7-8)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/e/ef/I%2C_Vampire_Vol_1_8.jpg/revision/latest?cb=20120426074917" },
    { titulo: "Frankenstein, Agent of S.H.A.D.E. (#8-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/2085104-02.jpg" },
    { titulo: "Demon Knights (#8-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/dmnkni_1_5b327401d86659.85346273.jpg" },
    { titulo: "Sword of Sorcery (#0-8)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/swordofsorcery_vol1_amethyst_5b048f4367c628.66808042.jpg" },
    { titulo: "Deathstroke (#7-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/deathstroke_v2_10_5b196bcb35e805.75848316.jpg" },
    { titulo: "All-Star Western (#7-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://i0.wp.com/borg.com/wp-content/uploads/2011/12/all-star-western-2-cover1.jpg" },
    { titulo: "Earth 2 (nueva, 2ª oleada) (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-2", tipo: "Cómic", poster: "https://i1.whakoom.com/small/0a/0c/c67bd67c68cb48978a27c7339631a5f7.jpg" },

    // --- LOS NUEVOS 52: ORDEN DE LECTURA (filtro "Tanda 3") ---
    { titulo: "Batman (#13-17)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/a/ad/Batman_Vol_2_13.jpg/revision/latest/scale-to-width/360?cb=20121011173033" },
    { titulo: "Nightwing (#13-18)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://www.southsidecomicspgh.com/cdn/shop/files/large-2756631.jpg?v=1718040284" },
    { titulo: "Catwoman (#0, 13-18)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://i1.whakoom.com/small/20/19/db11c266c55e4f869ec685125a2ecab2.jpg" },
    { titulo: "Detective Comics (#13-18)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/0/0d/Detective_Comics_Vol_2_13_Combo.jpg/revision/latest?cb=20121011192036" },
    { titulo: "Birds of Prey (#14-17, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/c/cf/Birds_of_Prey_A_Clash_of_Daggers_%28Collected%29.jpg/revision/latest/thumbnail/width/360/height/360?cb=20140801145631" },
    { titulo: "Batgirl (#14-19, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/91QGH++qqpL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Batwoman (#0, 12-17)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/batwoman_vol4_thick_5b0461be53f445.58235553.jpg" },
    { titulo: "Harley Quinn (#0-8)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/6/64/Harley_Quinn_Vol_2_0.jpg/revision/latest/thumbnail/width/360/height/450?cb=20131121230751" },
    { titulo: "Red Hood and the Outlaws (#0, 15-18)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/redhood_vol4_league_5b0458dcd65aa0.57264169.jpg?w=160" },
    { titulo: "Talon (#8-17)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/8/88/Talon_Vol_1_14.jpg/revision/latest?cb=20140131220438" },
    { titulo: "Wonder Woman (#13-18, #0)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/812BcQw0uZL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Superman (#13-18, #0)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/f/f5/Superman_Vol_3_14.jpg/revision/latest/scale-to-width-down/1200?cb=20121126221808" },
    { titulo: "Action Comics (#13-18)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/e/ed/Action_Comics_Vol_2_14_Variant_A.jpg/revision/latest?cb=20121109002542" },
    { titulo: "Supergirl (#13-20)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81xorzBcNeL.jpg" },
    { titulo: "Superboy (#13-19, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/91HPbxzL8rL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Justice League (#13-17)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/51V8z6mPR-L._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Justice League Dark (#14-21)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://imgix-media.wbdndc.net/ingest/book/preview/55b3835e-3154-4720-b7ff-0859bf3a1688/470ac65f-bd26-4a4f-9a6c-01dc74d20d4e/0.jpg" },
    { titulo: "Constantine (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/d/d5/Constantine_Vol_1_14.jpg/revision/latest/scale-to-width-down/1200?cb=20140530193203" },
    { titulo: "Trinity of Sin: Pandora (#1-5)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/e/e0/Trinity_of_Sin_Pandora_Vol_1_1.jpg/revision/latest/thumbnail/width/360/height/360?cb=20130704013104" },
    { titulo: "Trinity of Sin: Phantom Stranger (#0-6)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://pictures.abebooks.com/isbn/9781401240882-us.jpg" },
    { titulo: "The Flash (#13-19)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81jgKfsBflL.jpg" },
    { titulo: "Green Lantern (#13-20, #0)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/6/6f/Green_Lantern_Vol_5_14.jpg/revision/latest?cb=20121105232142" },
    { titulo: "Green Lantern Corps (#15-20, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/5/52/Green_Lantern_Corps_Vol_3_14.jpg/revision/latest?cb=20121119041501" },
    { titulo: "Green Lantern: New Guardians (#13-20, #0)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://imgix-media.wbdndc.net/ingest/book/preview/9f022aa9-c42f-4991-836b-e593d2e61e6b/81fd16eb-7327-43c9-a228-2a9dfce05f8c/0.jpg" },
    { titulo: "Red Lanterns (#13-20, #0)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/91kBmPGvZhL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Aquaman (#14-16, #0)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/b/bb/Aquaman_Vol_7_14.jpg/revision/latest?cb=20121201042654" },
    { titulo: "Green Arrow (#13-16)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/0/06/Green_Arrow_Vol_5_14.jpg/revision/latest/scale-to-width-down/1200?cb=20121106033154" },
    { titulo: "Teen Titans (#0, 15-17)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/7/74/Teen_Titans_Vol_5_14.jpg/revision/latest/scale-to-width-down/1200?cb=20151204230357" },
    { titulo: "Suicide Squad (#14-19)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://comicsrus.com.au/cdn/shop/files/IMG_8580_1024x1024.jpg?v=1729042207" },
    { titulo: "Animal Man (#12-19 + Swamp Thing #12, 17)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/animalman_vol2_avsman_5b04a0ac07b2d8.37792131.jpg" },
    { titulo: "Swamp Thing (#12-18 + Animal Man #12, 17)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/91udoWixxNL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Stormwatch (#0, 13-18)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://www.zonanegativa.com/imagenes/2014/04/stormwatch_14_peter_milligan_will_conrad_cover.jpg" },
    { titulo: "Demon Knights (#13-16)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/c/c7/Demon_Knights_Vol_1_14.jpg/revision/latest?cb=20121115015227" },
    { titulo: "All-Star Western (#0, 13-16)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://media.mycomicshop.com/n_iv/600/1609238.jpg" },
    { titulo: "Earth 2 (#0, 7-10)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/0/03/Earth_2_World%27s_End_Vol_1_7.jpg/revision/latest?cb=20141126111200" },
    { titulo: "Worlds' Finest (nueva, 2ª oleada) (#0-5)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-3", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/a/a0/Worlds%27_Finest_Vol_1_0.jpg/revision/latest?cb=20120910205357" },

    // --- LOS NUEVOS 52: ORDEN DE LECTURA (filtro "Tanda 4") ---
    { titulo: "Batman (#0, #21-27, #29-33)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81B+OfcCx1L._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Nightwing (#19-24)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81-Cbncr1NL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Catwoman (#19-24, #23.4)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/catwoman_vol3_deathfam_5b047c5c0677d1.77344225.jpg" },
    { titulo: "Detective Comics (#19-24)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/4/4b/Detective_Comics_Vol_2_21.jpg/revision/latest?cb=20130605183842" },
    { titulo: "Birds of Prey (#18-24, 26 + Talon #9)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://comicsrus.com.au/cdn/shop/products/IMG_6319_1024x1024.JPG?v=1512358680" },
    { titulo: "Batgirl (#20-26)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://comicsrus.com.au/cdn/shop/products/3F4B1512-B760-4752-90AC-1B0D98A73353_grande.jpg?v=1590036177" },
    { titulo: "Batwoman (#18-24)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/f/f0/Batwoman_Vol_2_21.jpg/revision/latest?cb=20130620205141" },
    { titulo: "Harley Quinn (#9-13)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/hquinn_v2_13_5b170d02f04752.68013382.jpg" },
    { titulo: "Red Hood and the Outlaws (#19-26, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/a/ad/Red_Hood_and_the_Outlaws_Vol_1_21.jpg/revision/latest?cb=20130621011810" },
    { titulo: "Wonder Woman (#19-23)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://imgix-media.wbdndc.net/ingest/book/preview/37473b74-550a-4807-ba5c-4460d7892912/fa3b03cc-4959-4326-ac5d-1c57adf9b6fb/0.jpg?w=375&h=576&sharp=50&fit=fill&fill=blur&auto=format%2Ccompress" },
    { titulo: "Superman (#19-24, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://imgix-media.wbdndc.net/ingest/book/preview/cce897d4-a325-489d-a74c-104d4feb8996/4fe90fac-0339-4fee-b0f9-73ff260ba55c/0.jpg?w=375&h=576&sharp=50&fit=fill&fill=blur&auto=format%2Ccompress" },
    { titulo: "Action Comics (#19-24)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/d/d9/Action_Comics_Vol_2_21.jpg/revision/latest?cb=20130607202023" },
    { titulo: "Justice League (#18-23)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://imgix-media.wbdndc.net/ingest/book/preview/7840d397-c1b7-4189-9bb2-34355f9083f6/67152d4f-7f67-42ce-9663-48973bfc199f/1738183442.jpg?w=375&h=576&sharp=50&fit=fill&fill=blur&auto=format%2Ccompress" },
    { titulo: "Justice League Dark (#22-29)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/jldark_vol1_inthedark_5b04a67e70dec8.05627591.jpg" },
    { titulo: "Justice League of America (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/a/a1/Justice_League_of_America_Vol_2_21.jpg/revision/latest?cb=20080525223350" },
    { titulo: "The Flash (#20-25, #23.2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/b/b5/The_Flash_Vol_4_21.jpg/revision/latest?cb=20130627201357" },
    { titulo: "Green Lantern (#21-26, #23.1, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/4/42/Green_Lantern_Vol_5_21.jpg/revision/latest?cb=20130607122907" },
    { titulo: "Green Lantern Corps (#21-27)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/811i7-OFY6L._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Green Lantern: New Guardians (#21-27, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/b/b8/Green_Lantern_New_Guardians_Vol_1_21.jpg/revision/latest?cb=20130622140326" },
    { titulo: "Red Lanterns (#21-26, GL Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/redlanterns_37_5b22b625229a49.44857388.jpg" },
    { titulo: "Aquaman (#17-19, 21-25)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/91EREWA3GCL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Green Arrow (#17-24)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/greenarrow_vol2_triple_5b049f96063437.43013267.jpg" },
    { titulo: "Teen Titans (#18-23)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/5/5b/Teen_Titans_Vol_4_21.jpg/revision/latest?cb=20130627030830" },
    { titulo: "Suicide Squad (#20-23)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/ssquad_v4_21_5b186c86c724d3.65499115.jpg" },
    { titulo: "Animal Man (#20-23, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/91oVU5C-uXL.jpg" },
    { titulo: "Swamp Thing (#19-23, #23.1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1389989293i/17671941.jpg" },
    { titulo: "All-Star Western (#17-20, Hex viaja al presente)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/allstarwestern_v3_21_5b2982de90dd11.32646337.jpg" },
    { titulo: "Earth 2 (#13-16, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/1/1b/Earth_2_Vol_1_1.jpg/revision/latest?cb=20120501224539" },
    { titulo: "Worlds' Finest (#6-12)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-4", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/3/34/Worlds%27_Finest_Vol_1_6.jpg/revision/latest?cb=20121106032456" },

    // --- LOS NUEVOS 52: ORDEN DE LECTURA (filtro "Trinity War") ---
    { titulo: "Free Comic Book Day 2012", categoria: "nuevos-52-orden-lectura", subtipo: "trinity-war", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/comicdc/images/a/a2/The_New_52_Free_Comic_Book_Day_Special_Edition_Vol_1_1.jpg/revision/latest/scale-to-width-down/1200?cb=20140329211245&path-prefix=es" },
    { titulo: "Trinity of Sin: Pandora (#1-3)", categoria: "nuevos-52-orden-lectura", subtipo: "trinity-war", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/e/e0/Trinity_of_Sin_Pandora_Vol_1_1.jpg/revision/latest/thumbnail/width/360/height/360?cb=20130704013104" },
    { titulo: "Trinity of Sin: Phantom Stranger (#11)", categoria: "nuevos-52-orden-lectura", subtipo: "trinity-war", tipo: "Cómic", poster: "https://pictures.abebooks.com/isbn/9781401240882-us.jpg" },
    { titulo: "Justice League (#22-23)", categoria: "nuevos-52-orden-lectura", subtipo: "trinity-war", tipo: "Cómic", poster: "https://imgix-media.wbdndc.net/ingest/book/preview/7840d397-c1b7-4189-9bb2-34355f9083f6/67152d4f-7f67-42ce-9663-48973bfc199f/1738183442.jpg?w=375&h=576&sharp=50&fit=fill&fill=blur&auto=format%2Ccompress" },
    { titulo: "Justice League Dark (#22-23)", categoria: "nuevos-52-orden-lectura", subtipo: "trinity-war", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/jldark_vol1_inthedark_5b04a67e70dec8.05627591.jpg" },
    { titulo: "Justice League of America (#6-7)", categoria: "nuevos-52-orden-lectura", subtipo: "trinity-war", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/a/a1/Justice_League_of_America_Vol_2_21.jpg/revision/latest?cb=20080525223350" },
    { titulo: "Constantine (#5)", categoria: "nuevos-52-orden-lectura", subtipo: "trinity-war", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/d/d5/Constantine_Vol_1_14.jpg/revision/latest/scale-to-width-down/1200?cb=20140530193203" },

    // --- LOS NUEVOS 52: ORDEN DE LECTURA (filtro "Forever Evil") ---
    { titulo: "Forever Evil (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "forever-evil", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_650245-MLA79526836054_102024-O.webp" },
    { titulo: "The Flash (Rogues Rebellion)", categoria: "nuevos-52-orden-lectura", subtipo: "forever-evil", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81sOC6ZeY5L._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Justice League Dark/Constantine/Pandora/Phantom Stranger (Blight)", categoria: "nuevos-52-orden-lectura", subtipo: "forever-evil", tipo: "Cómic", poster: "https://i1.whakoom.com/large/1d/0f/07324c7066924ebfa33a19690f3a2a71.jpg" },
    { titulo: "Justice League of America (Vol. 2: Survivors of Evil, #8-14)", categoria: "nuevos-52-orden-lectura", subtipo: "forever-evil", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/A1II7c1A4UL._AC_UF1000,1000_QL80_.jpg" },

    // --- LOS NUEVOS 52: ORDEN DE LECTURA (filtro "Tanda 5") ---
    { titulo: "Nightwing (#25-30, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/nightwing_v3_26_5b16ea52b9cc52.29862784.jpg" },
    { titulo: "Catwoman (#25-34)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1423837524i/19040884.jpg" },
    { titulo: "Detective Comics (#25-29)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://www.comicsetc.com.au/cdn/shop/products/c6aa8c7f7dec6d8816418bc4783b59cb_600x600.jpg?v=1540462055" },
    { titulo: "Birds of Prey (#27-34)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/birdsofprey_v3_25_5b18842d8cd1e8.29918253.jpg" },
    { titulo: "Batgirl (#27-34, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://www.comicsetc.com.au/cdn/shop/products/6a0d611fb26e14a7bab7e7f7d8b7ec30.jpg?v=1540466310" },
    { titulo: "Batwoman (#25-34, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/batwoman_v2_27_5b172b05b514c1.30604370.jpg" },
    { titulo: "Harley Quinn (#14-16, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://i0.wp.com/ultimatecomics.com/wp-content/uploads/2021/02/Scan-217-4.jpg?fit=1958%2C3038&ssl=1" },
    { titulo: "Red Hood and the Outlaws (#27-31)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/6/65/Red_Hood_and_the_Outlaws_Vol_1_27.jpg/revision/latest/scale-to-width-down/1200?cb=20140123145936" },
    { titulo: "Batman Eternal (nueva, semanal) (#1-21)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/911kWbWDvZL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Wonder Woman (#24-29, #23.2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81QenN0ZsOL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Superman (#25-29)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1385665861i/19027840.jpg" },
    { titulo: "Action Comics (#25-29)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/a/a6/Action_Comics_Vol_2_25.jpg/revision/latest?cb=20131106202718" },
    { titulo: "Supergirl (#26-33)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/4/47/Supergirl_Red_Daughter_of_Krypton.jpg/revision/latest?cb=20200525033224" },
    { titulo: "Superboy (#26-34)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/superboy_vol5_paradox_5b03662c6cc9c9.52312429.jpg" },
    { titulo: "Justice League (#24-29)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/A1B23wjcdeL._AC_UF1000,1000_QL80_AIweblab1381794,T1_.jpg" },
    { titulo: "Justice League of America (#8-14)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/f/f0/Justice_League_Vol_2_8.jpg/revision/latest?cb=20120419215302" },
    { titulo: "Trinity of Sin: Phantom Stranger (#6-11)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/tos_phantstrang_vol2_breach_5b046f4a7951a5.62634018.jpg" },
    { titulo: "Trinity of Sin: Pandora (#6-9)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/tos_pandora_1_5b318588cfe701.27865616.jpg" },
    { titulo: "The Flash (#26-29, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/3/30/The_Flash_Vol_4_26.jpg/revision/latest/scale-to-width-down/1200?cb=20140131211240" },
    { titulo: "Green Lantern (#27-34)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/913mq-bUlYL.jpg" },
    { titulo: "Green Lantern Corps (#28-34, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://imgix-media.wbdndc.net/ingest/book/preview/cacfc3a5-4f55-4941-9e9a-b4be481657f4/5a999c09-9eaf-4d9f-b290-3ccd07d1a026/0.jpg?w=375&h=576&sharp=50&fit=fill&fill=blur&auto=format%2Ccompress&" },
    { titulo: "Green Lantern: New Guardians (#28-34, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/a/a0/Green_Lantern_New_Guardians_Vol_1_26.jpg/revision/latest?cb=20131219012323" },
    { titulo: "Red Lanterns (#27, 29-34, Annual #1)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/0/04/Red_Lanterns_Vol_1_26.jpg/revision/latest/scale-to-width-down/1200?cb=20140102185553" },
    { titulo: "Aquaman (#26-31, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/comicdc/images/8/83/Aquaman_Vol_7_26.jpg/revision/latest?cb=20140131195711&path-prefix=es" },
    { titulo: "Green Arrow (#25-31)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/91KLE9wTqZL._AC_UF350,350_QL50_.jpg" },
    { titulo: "Teen Titans (#24-30, Annual #2-3)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81dsYSjvRkL._AC_UF894,1000_QL80_.jpg" },
    { titulo: "Suicide Squad (#24-30)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1722483290i/217045847.jpg" },
    { titulo: "Animal Man (#24-29)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/animalman_v2_13_5b2986aed75033.50083756.jpg" },
    { titulo: "Swamp Thing (#24-27, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/91oAt3bck5L._UF1000,1000_QL80_.jpg" },
    { titulo: "All-Star Western (#21-34)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/e/e5/All-Star_Western_Vol_3_27.jpg/revision/latest?cb=20140228204122" },
    { titulo: "Batman/Superman (#1-9)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/81ftvEODwWL._AC_UF1000,1000_QL80_.jpg" },
    { titulo: "Superman/Wonder Woman (#1-6)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_935101-MLA92602655671_092025-O.webp" },
    { titulo: "Justice League United (#0-5)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://m.media-amazon.com/images/I/91C5klFH-fL._AC_UF1000,1000_QL80_AIweblab1381794,T1_.jpg" },
    { titulo: "Justice League 3000 (#1-7)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/jl3000_5_5b29503d479262.30263883.jpg" },
    { titulo: "Earth 2 (#17-20, Annual #2)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.wikia.nocookie.net/marvel_dc/images/4/49/Earth_2_Vol_1_17.jpg/revision/latest?cb=20131108182332" },
    { titulo: "Worlds' Finest (#13-18)", categoria: "nuevos-52-orden-lectura", subtipo: "tanda-5", tipo: "Cómic", poster: "https://static.dc.com/dc/files/default_images/worldsfinest_9_5b2a8830a233a4.99954068.jpg" },

    { titulo: "Batman: Justicia Ciega", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_justicia_ciega_cov-0e9a5ba00d950b424e17322856530167-1024-1024.webp" },
    { titulo: "Batman: La Espada de Azrael", categoria: "post-crisis-dc", subtipo: "azrael,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_la_espada_de_azraelcover1-1e2222cb91816eb1de16632196483116-640-0.webp" },

    // --- INFINITE FRONTIER / ACTUALIDAD (DC Argentina) ---
    { titulo: "Batman: La Guerra del Joker", categoria: "infinite-frontier-dc", subtipo: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/la_guerra_del_joker_cov_arg1-5e5a48f69ebd772c2116190652847921-1024-1024.webp" },
    { titulo: "Batman: Estado de Miedo", categoria: "infinite-frontier-dc", subtipo: "batman,scarecrow", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_estado_de_miedo_cov1-7028ca1c5aa7ec852016669068384287-1024-1024.webp" },
    { titulo: "Batman de Chip Zdarsky #1: Respaldo", categoria: "infinite-frontier-dc", subtipo: "batman", tipo: "Cómic", poster: "https://i1.whakoom.com/large/2c/14/79c2dd4302684d059d04eb794367b1b9.jpg" },
    { titulo: "Batman de Chip Zdarsky #2: El Bat-Man de Gotham", categoria: "infinite-frontier-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_vol-2_el_batman_de_gotham_cov-3d7f1de02e4ecf05d017256259109998-1024-1024.webp" },
    { titulo: "Batman de Chip Zdarsky #3: La Guerra de Gotham", categoria: "infinite-frontier-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_la_guerra_de_gotham_cov-f7b20f7acc97ce59c717395429904193-1024-1024.webp" },
    { titulo: "Batman de Chip Zdarsky #4: Joker: Año Uno", categoria: "infinite-frontier-dc", subtipo: "batman,joker", tipo: "Cómic", poster: "https://i1.whakoom.com/small/23/16/7462b97696174890ad9896ff42be22b9.jpg" },
    { titulo: "Batman de Chip Zdarsky #5: Prisiones Oscuras", categoria: "infinite-frontier-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_vol_5_covs-6fa914c17194c4d76817443917246389-1024-1024.webp" },
    { titulo: "Batman de Chip Zdarsky #6: Poder Absoluto", categoria: "infinite-frontier-dc", subtipo: "amanda-waller,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_vol_6_covs-7fb6dd2e994c21a41517473614887660-1024-1024.webp" },
    { titulo: "Batman de Chip Zdarsky #7: Ciudad Moribunda", categoria: "infinite-frontier-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_ciudad_moribunda_cov-0a01a8c7faa9d26e6417576312593064-640-0.webp" },
    { titulo: "Batman: Abismo", categoria: "infinite-frontier-dc", subtipo: "batman,lex-luthor", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_abismo_cov_arg1-47eab233643c4c5cfe16893037408425-640-0.webp" },
    { titulo: "Batman: La Guerra de Las Sombras", categoria: "infinite-frontier-dc", subtipo: "batman,deathstroke,ras-al-ghul", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_la_guerra_de_las_sombras_cov1-971c3bad069398502916881505921210-1024-1024.webp" },
    { titulo: "Batman: Luz de Dia", categoria: "infinite-frontier-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/luz-xde-dia-variante-web-e26bb5d717cd701cb117858587932470-640-0.webp" },

    // --- POST-CRISIS / EDAD MODERNA: ORDEN DE LECTURA (Ovni Press) ---
    { titulo: "Esenciales DC #24: Green Lantern/Green Arrow: Edición Absoluta", categoria: "post-crisis-dc", subtipo: "green-arrow,green-lantern-hal-jordan", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/green_lantern_green_arrow_cov-96678bddcba5edf30317226036375082-1024-1024.webp" },
    { titulo: "Esenciales DC #21: Batman: Historias del Demonio", categoria: "post-crisis-dc", subtipo: "batman,ras-al-ghul", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_historias_del_demonio_cov1-76c122f254f0c780b216886877042629-480-0.webp" },
    { titulo: "Esenciales DC #22: Batman: La Trilogia del Demonio", categoria: "post-crisis-dc", subtipo: "batman,ras-al-ghul", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_la_trilogia_del_demonio_cov1-499bcec97868228cbf16938879213869-480-0.webp" },
    { titulo: "Batman y Los Outsiders #1", categoria: "post-crisis-dc", subtipo: "batman,outsiders", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_y_los_outsiders_cov-0657f8711c0e4d9b7517262289892152-1024-1024.webp" },
    { titulo: "Batman y Los Outsiders #2: ¡Contra Los Amos del Desastre!", categoria: "post-crisis-dc", subtipo: "batman,outsiders", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_y_los_outsiders_vol_2_cov-df92c4b68710bc1d9817400878886921-1024-1024.webp" },
    { titulo: "Batman y Los Outsiders #3: ¡La Verdad Sobre Halo!", categoria: "post-crisis-dc", subtipo: "batman,outsiders", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_805207-MLA91020970670_092025-O.webp" },
    { titulo: "Batman y Los Outsiders #4: ¡Galaxias de Guerras!", categoria: "post-crisis-dc", subtipo: "batman,outsiders", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_y_los_outsiders_vol_4_cov-63b9e181f36d8ced5817630685111419-1024-1024.webp" },
    { titulo: "Batman y Los Outsiders #5: La Renuncia del Caballero Oscuro", categoria: "post-crisis-dc", subtipo: "batman,outsiders", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_y_los_outsiders_vol_5_cov-12e103c480cbbe349c17776556503199-1024-1024.webp" },
    { titulo: "Esenciales DC #2: Crisis en Tierras Infinitas", categoria: "post-crisis-dc", subtipo: "batman,flash-barry-allen,liga,superman,wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/crisis_cov_arg1-a4a9db904b75118e4315980054342033-1024-1024.webp" },
    { titulo: "Esenciales DC #17: Superman: El Hombre de Acero", categoria: "post-crisis-dc", subtipo: "lex-luthor,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/superman_el_hombre_de_acero_cov1-350021223aab5b6d0f16711637408864-640-0.webp" },
    { titulo: "Batman: Año Uno", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_a_c3_b1o_uno_3ra_cov-7d43be04a0c1e39ee917745538512217-640-0.webp" },
    { titulo: "Batman: Año Dos", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_ano_dos_cov_arg1-1af52ac45310c42c5d16772101790752-1024-1024.webp" },
    { titulo: "Esenciales DC #14: Batman: Una Muerte en La Familia", categoria: "post-crisis-dc", subtipo: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/bm_muerte_en_la_familia_cov_2da1-19c0c2be49848149f516868722605141-480-0.webp" },
    { titulo: "Animal Man de Grant Morrison Vol. 1", categoria: "post-crisis-dc", subtipo: "animal-man", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/animal_man_vol_01_cov_arg1-65d8d0e2917efd152e16154820963445-640-0.webp" },
    { titulo: "Esenciales DC #25: ¡Invasión!", categoria: "post-crisis-dc", subtipo: "batman,liga,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/invasion_cov-6ce1398de623d16ffd17244156497208-1024-1024.webp" },
    { titulo: "Esenciales DC #16: Odisea Cosmica", categoria: "post-crisis-dc", subtipo: "batman,darkseid,liga", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/odisea_cosmica_cov_arg-11-e46e20d1d004615d0616572160137359-640-0.webp" },
    { titulo: "Animal Man de Grant Morrison Vol. 2", categoria: "post-crisis-dc", subtipo: "animal-man", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/animal-man-vol-2-cov-arg1-6c2d76bbb90e8f3c7116239493651603-640-0.webp" },
    { titulo: "Batman: Año Tres", categoria: "post-crisis-dc", subtipo: "batman,dick-grayson", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_ano_tres_cov-8bc9839c108672bc9c17093164316321-1024-1024.webp" },
    { titulo: "Batman: Leyendas del Caballero Oscuro", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/leyendas_del_caballero_oscuro_cov1-00ea1bab939dd7b3f816518571017918-640-0.webp" },
    { titulo: "Batman: Diez Noches de La Bestia", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_-_10_noches_de_la_bestia_cov-382ddc82d9756616c817564914069350-640-0.webp" },
    { titulo: "Batman Por Norm Breyfogle Vol. 1", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_de_norm_breyfogle_vol_1_cov-34de9ff1fbb02d84db17543107324464-1024-1024.webp" },
    { titulo: "Batman Por Norm Breyfogle Vol. 2", categoria: "post-crisis-dc", subtipo: "batman,penguin,clayface", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_de_norm_breyfogle_vol_2_cov-7994bcdf11080a6d7317607104087075-1024-1024.webp" },
    { titulo: "Batman Por Norm Breyfogle Vol. 3", categoria: "post-crisis-dc", subtipo: "batman,anarky", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_de_norm_breyfogle_vol_3_cov-4c4e494f26bb4ee81a17661604058407-1024-1024.webp" },
    { titulo: "Batman Por Norm Breyfogle Vol. 4", categoria: "post-crisis-dc", subtipo: "batman,ras-al-ghul", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_de_norm_breyfogle_vol_4_cov-99e22f5d161fcd13e117699522746163-640-0.webp" },
    { titulo: "Batman Por Norm Breyfogle Vol. 5", categoria: "post-crisis-dc", subtipo: "batman,joker,mr-zsasz,penguin", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_de_norm_breyfogle_vol_5_cov-c39a5a3a6138c4786717794627062229-640-0.webp" },
    { titulo: "Batman Por Norm Breyfogle Vol. 6", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_de_norm_breyfogle_vol_6_cov-b2b8d5807c77119e1e17843165059176-640-0.webp" },
    { titulo: "Batman: Caballero Oscuro, Ciudad Oscura", categoria: "post-crisis-dc", subtipo: "batman,riddler", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_de_peter_milligan_cov-688b788a3bf297f76a17860562706539-640-0.webp" },
    { titulo: "Animal Man: Nacido Para ser Salvaje", categoria: "post-crisis-dc", subtipo: "animal-man", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/animal_man_vol_04_cov_arg-0eeae8aa09841733c416990325781147-640-0.webp" },
    { titulo: "Armagedón 2001", categoria: "post-crisis-dc", subtipo: "batman,flash-wally-west,green-lantern-guy-gardner,green-lantern-hal-jordan,liga,superman,wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/armagedon_2001_cov_arg-bf9ece492f90aaf6ef17758465134328-1024-1024.webp" },
    { titulo: "Esenciales DC #19: Batman: Veneno", categoria: "post-crisis-dc", subtipo: "bane,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman-veneno_cov_arg1-e9451fa68870b3cf7f16789392570876-640-0.webp" },
    { titulo: "Esenciales DC #10: La Muerte de Superman", categoria: "post-crisis-dc", subtipo: "doomsday,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/la_muerte_de_superman_cov1-f00b8d36cb38aa084616336649847817-640-0.webp" },
    { titulo: "Aquaman Año Uno", categoria: "post-crisis-dc", subtipo: "aquaman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/aquaman_cov-df88609a441f8b2d9717014681434083-1024-1024.webp" },
    { titulo: "Batman: Knightfall #0: Camino a la Caída del Caballero", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_knightfall_vol_0_cov-88dbb35b4d86497e7f17497750812558-640-0.webp" },
    { titulo: "Batman: Knightfall #1: Preludio a La Caída del Caballero", categoria: "post-crisis-dc", subtipo: "bane,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_knightfall_vol_1_cov1-94c142bad4e22a9b1c16874803037803-1024-1024.webp" },
    { titulo: "Batman: Knightfall #2: La Caída del Caballero", categoria: "post-crisis-dc", subtipo: "bane,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_knightfall_vol_2_cov_2da-6f425e33c66a0c23f917733447741807-1024-1024.webp" },
    { titulo: "Batman: Knightfall #3: La Cruzada del Caballero I", categoria: "post-crisis-dc", subtipo: "azrael,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_knightfall_vol_3_cov-3a2991d165ec89804016982629925588-1024-1024.webp" },
    { titulo: "Batman: Knightfall #4: La Cruzada del Caballero II", categoria: "post-crisis-dc", subtipo: "azrael,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_knightfall_vol_4_cov-c0a706f833738e06db17025849755620-1024-1024.webp" },
    { titulo: "Batman: Knightfall #5: La Búsqueda del Caballero", categoria: "post-crisis-dc", subtipo: "azrael,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_knightfall_vol_5_cov-1ef91fce96c413da1117074349134643-1024-1024.webp" },
    { titulo: "Batman: Knightfall #6: El Fin del Caballero", categoria: "post-crisis-dc", subtipo: "azrael,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_knightfall_vol_6_cov-4d4fb0f79ca4e7c9b517123204558470-640-0.webp" },
    { titulo: "Batman: Knightfall #7: Pródigo: Epílogo a La Caída del Caballero", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_638853-MLA77819651903_072024-O.webp" },
    { titulo: "Batman: Knightfall #8: Troika: Epílogo Final a La Caída del Caballero", categoria: "post-crisis-dc", subtipo: "batman,ras-al-ghul,riddler,two-face", tipo: "Cómic", poster: "https://i1.whakoom.com/small/0a/05/34091f08931b4ba8b30903b647a9710d.jpg" },
    { titulo: "Esenciales DC #6: Green Lantern: Ocaso Esmeralda", categoria: "post-crisis-dc", subtipo: "green-lantern-hal-jordan", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/green_lantern_ocaso_esmeralda_cov_arg-11-00c3be80324309cba616185454326831-1024-1024.webp" },
    { titulo: "Esenciales DC #8: Hora Cero: Crisis en el Tiempo", categoria: "post-crisis-dc", subtipo: "batman,green-lantern-hal-jordan,liga,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/hora-cero-cov-arg1-56b80fe7a5303ce08016221731674919-1024-1024.webp" },
    { titulo: "Esenciales DC #9: La Noche Final", categoria: "post-crisis-dc", subtipo: "green-lantern-hal-jordan,liga,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/la-noche-final-cov1-1b10cebc75f426b06b16312248170865-640-0.webp" },
    { titulo: "Batman: No Man's Land Vol. 1: Contagio", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_contagio_cov-2dcf32bf3bb4b03f4e17576310122216-1024-1024.webp" },
    { titulo: "Batman: No Man's Land Vol. 2: Legado", categoria: "post-crisis-dc", subtipo: "batman,ras-al-ghul", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_legado_cov-9e1019d9584d94661c17621746894434-1024-1024.webp" },
    { titulo: "Batman: No Man's Land Vol. 3: Cataciclismo Parte I", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_cataclismo_1_cov-d16053f47c149e24df17685738501642-1024-1024.webp" },
    { titulo: "Batman: No Man's Land Vol. 4: Cataciclismo Parte II", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_cataclismo_2_cov-897287caf4366cc51617733448624778-1024-1024.webp" },
    { titulo: "Batman: No Man's Land Vol. 5: Cataciclismo Parte III", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_766682-MLA111836360412_062026-O.webp" },
    { titulo: "Batman: No Man's Land Vol. 6: Camino a Tierra de Nadie", categoria: "post-crisis-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_-_camino_a_tierra_de_nadie_cov-a521b5e986fb874b4d17867163990218-1024-1024.webp" },
    { titulo: "Esenciales DC #13: Liga de La Justicia: Dia del Juicio", categoria: "post-crisis-dc", subtipo: "batman,liga", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/liga-de-la-justicia-dia-del-juicio1-367a03a7bc4aa93eb516511604761895-480-0.webp" },
    { titulo: "Batman y Robin: Año Uno", categoria: "post-crisis-dc", subtipo: "batman,dick-grayson", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_y_robin_ano_uno_cov-61c0c774c65635afe117770533363007-640-0.webp" },
    { titulo: "Esenciales DC #7: Batman: Hush", categoria: "post-crisis-dc", subtipo: "batman,hush,ras-al-ghul,riddler", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_hush_cov_arg1-6c97c77eda6c89941116197122413850-640-0.webp" },
    { titulo: "Batman: Ciudad Rota", categoria: "post-crisis-dc", subtipo: "batman,killer-croc", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_-_ciudad_rota_cov-a216c6c1e5ab6048c317546019948811-640-0.webp" },
    { titulo: "Esenciales DC #27: Superman: Por El Mañana", categoria: "post-crisis-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/superman_-_for_tomorrow_covs-9b3beaaf26c425e96117329970574354-1024-1024.webp" },
    { titulo: "Esenciales DC #4: Crisis de Identidad", categoria: "post-crisis-dc", subtipo: "batman,liga", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/crisis_de_identidad_cov_arg1-d918043e328c6cfe5016136913511589-1024-1024.webp" },
    { titulo: "Esenciales DC #18: Green Lantern: Renacimiento", categoria: "post-crisis-dc", subtipo: "green-lantern-hal-jordan,sinestro", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/green_lantern_renacimiento1-aa30848fc26ba013fa16778128850771-480-0.webp" },
    { titulo: "Esenciales DC #5: Crisis Infinita", categoria: "post-crisis-dc", subtipo: "batman,liga,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/crisis-infinita-cov-arg1-b62d0ca8cd6287e91416179067865292-1024-1024.webp" },
    { titulo: "Batman de Grant Morrison Vol. 1: Batman e Hijo", categoria: "post-crisis-dc", subtipo: "batman,ras-al-ghul", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_e_hijo_cov-426ce7ca723e67b3fb17673629634909-1024-1024.webp" },
    { titulo: "Batman de Grant Morrison Vol. 2: La Resurrección de Ra's Al Ghul", categoria: "post-crisis-dc", subtipo: "batman,ras-al-ghul", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_morrison_2-d9db3d05365f64f75317724577444484-1024-1024.webp" },
    { titulo: "Esenciales DC #12: Crisis Final", categoria: "post-crisis-dc", subtipo: "batman,darkseid,liga,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/crisis_final_cov1-94793d73d957a1245716378555583021-1024-1024.webp" },
    { titulo: "Esenciales DC #20: Flash: Renacimiento", categoria: "post-crisis-dc", subtipo: "eobard-thawne,flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flash_renacimiento_cov_arg1-239ad6e9c4a2434fb616853359103555-1024-1024.webp" },
    { titulo: "Esenciales DC #11: La Noche Mas Oscura", categoria: "post-crisis-dc", subtipo: "batman,green-lantern-hal-jordan,liga", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/la_noche_mas_oscura_2da_cov-a31e86028f1375b6e917685742571677-1024-1024.webp" },
    { titulo: "Esenciales DC #23: Batman: El Espejo Negro", categoria: "post-crisis-dc", subtipo: "batman,dick-grayson", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_the_black_mirror_cov-4189d8cc24746a418217105079252954-1024-1024.webp" },
    { titulo: "Esenciales DC #1: Flashpoint Absoluto", categoria: "post-crisis-dc", subtipo: "batman,flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flashpoint_4taed_cov_arg1-4c2c6e6a3c5b6220c316851089691513-1024-1024.webp" },
    { titulo: "Batman/Superman: Los Mejores del Mundo #1: El Demonio Nezha", categoria: "post-crisis-dc", subtipo: "batman,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_superman_-_los_mejores_del_mundo_cov11-194d38fd286024b77b16853357900328-1024-1024.webp" },
    { titulo: "Batman/Superman: Los Mejores del Mundo #2: Extraño Visitante", categoria: "post-crisis-dc", subtipo: "batman,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/losmejoresdelmundo_vol_2_cov-e3908666777bcce92c17007724826931-640-0.webp" },
    { titulo: "Batman/Superman: Los Mejores del Mundo #3: Elemental", categoria: "post-crisis-dc", subtipo: "batman,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_superman_-_los_mejores_del_mundo_vol-_3_cov-371860565ce9f93e3c17196702659344-1024-1024.webp" },
    { titulo: "Batman/Superman: Los Mejores del Mundo #4: Regreso a Kingdom Come", categoria: "post-crisis-dc", subtipo: "batman,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_superman_-_los_mejores_del_mundo_cov-61b5bc5abad186e20f17304977171278-1024-1024.webp" },
    { titulo: "Batman/Superman: Los Mejores del Mundo #5: Orígenes Secretos", categoria: "post-crisis-dc", subtipo: "batman,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_superman_-_los_mejores_del_mundo_vol-_5_covs-05b32c0edab26f36e717449105294161-1024-1024.webp" },
    { titulo: "Batman/Superman: Los Mejores del Mundo #6: Imposible", categoria: "post-crisis-dc", subtipo: "batman,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_superman_-_los_mejores_del_mundo_vol-_6-26ec6550b9cff9350e17570145532401-1024-1024.webp" },
    { titulo: "Batman/Superman: Los Mejores del Mundo #7: Eclipso Total", categoria: "post-crisis-dc", subtipo: "batman,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_superman_-_los_mejores_del_mundo_vol-_7-824ea95feda7f6688a17594375917039-640-0.webp" },
    { titulo: "Batman/Superman: Los Mejores del Mundo #8: Gira en Mundo Bizarro", categoria: "post-crisis-dc", subtipo: "batman,superman", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_718634-MLA109671972848_042026-O.webp" },
    { titulo: "Batman: Blanco y Negro Vol. 1", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman-blanco-y-negro-vol-11-8e1c349be1e11b4c1216300345691139-1024-1024.webp" },
    { titulo: "Batman: Blanco y Negro Vol. 2", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman-blanco-y-negro-vol-2-cov1-e836066359817418c016384633303544-1024-1024.webp" },
    { titulo: "Batman: Blanco y Negro Vol. 3", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman-blanco-y-negro-cov-vol-3-11-05f267022cdd0a118f16511604478304-1024-1024.webp" },
    { titulo: "Batman: Blanco y Negro Vol. 4", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_blanco_y_negro_cov_vol_41-7879d6bfd39fba365816560444504400-640-0.webp" },
    { titulo: "Batman: Blanco y Negro Vol. 5", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman-blanco-y-negro-cov-vol-51-c6a8dcdf4216cba0f116312245596110-1024-1024.webp" },

    // --- LOS NUEVOS 52 (DC Argentina) — curada, conectada al Camino del Héroe/Villano ---
    { titulo: "Batman de Scott Snyder Vol. 1: La Saga de Los Búhos", categoria: "los-nuevos-52-dc-argentina", personajes: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman-01-el-tribunal-de-los-buhos-cov-arg1-79ad7f69d4b63c7c7616209478666475-1024-1024.webp" },
    { titulo: "Batman vs Robin", categoria: "los-nuevos-52-dc-argentina", personajes: "batman,ras-al-ghul", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_vs_robin1-cb8bc14e49046ebd2316812693285754-640-0.webp" },
    { titulo: "Batman Inc.", categoria: "los-nuevos-52-dc-argentina", personajes: "batman,ras-al-ghul", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_inc_cov-ovni1-ff686204bad49f16b916944446297670-640-0.webp" },
    { titulo: "Batman de Scott Snyder Vol. 2: Muerte de La Familia", categoria: "los-nuevos-52-dc-argentina", personajes: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman-02-muerte-de-la-familia-cov-arg1-86eecca90561db8b7116263183152854-1024-1024.webp" },
    { titulo: "Batman de Scott Snyder Vol. 3: Año Cero", categoria: "los-nuevos-52-dc-argentina", personajes: "batman,riddler", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman-03-ano-cero-cov-arg1-0496240b00c09b32ae16372534510955-1024-1024.webp" },
    { titulo: "Batman de Scott Snyder Vol. 4: Fin de Juego", categoria: "los-nuevos-52-dc-argentina", personajes: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman-04-fin-del-juego-cov-arg-11-60708f7d67f5ef261d16457506287439-1024-1024.webp" },
    { titulo: "Batman de Scott Snyder Vol. 5: Superpesado", categoria: "los-nuevos-52-dc-argentina", personajes: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_snyder_vol-5_cov1-8cacb929208f5284cf16607990767121-1024-1024.webp" },

    // --- CROSSOVERS Y ELSEWORLDS (DC Argentina) ---
    { titulo: "Batman x Deadpool #1 (Crossover DC Marvel)", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_deadpool_1-713f1940acc054759317744583003786-640-0.webp" },
    { titulo: "Batman y El Joker: Dúo Mortal", categoria: "elseworlds-otros-dc", subtipo: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_y_el_joker_duo_mortal_cov-0656de0f0b2f40c4b516995676897474-640-0.webp" },
    { titulo: "Batman: Criatura de la Noche", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_criatura_de_la_noche_cov1-684a4b9f5dd7a25baa16034073568616-640-0.webp" },
    { titulo: "Batman: El Contraataque del Caballero Oscuro", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/el-contraataque-del-caballero-oscuro_cov1-9ffc2013dfd06c39b216547976690710-640-0.webp" },
    { titulo: "Batman: El Detective", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_el_detective_cov1-71752c331f6acefbe116560445922421-640-0.webp" },
    { titulo: "Esenciales DC #15: La Edad de Oro", categoria: "elseworlds-otros-dc", subtipo: "batman,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/la_edad_de_oro_cov1-02c48988cd7bb6a27116554004286086-480-0.webp" },
    { titulo: "Batman: El Mundo", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_el_mundo_-cov-_arg_jpg-eede9c3b95140ae74117644341491578-1024-1024.webp" },
    { titulo: "Batman: El Regreso del Caballero Oscuro", categoria: "elseworlds-otros-dc", subtipo: "batman,joker,two-face", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_tdkr_cov-3ea11f0f5bfc30a81317183184295034-640-0.webp" },
    { titulo: "Batman: Gargola de Gotham", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_-la_g_c3_81rgola_de_gotham-_cov-c9ffb9636b712c1ffe17849040300962-1024-1024.webp" },
    { titulo: "Batman: Gotham: Luz de Gas", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_luz_de_gas_cov_2da_ed-4c12259aa42c33930517835531990716-640-0.webp" },
    { titulo: "Batman: Justicia Absoluta Vol. 1", categoria: "elseworlds-otros-dc", subtipo: "batman,deathstroke,joker,killer-croc,riddler", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_justicia_absoluta_1_covs-2b2e46114a0a32b76617322857547468-1024-1024.webp" },
    { titulo: "Batman: Justicia Absoluta Vol. 2", categoria: "elseworlds-otros-dc", subtipo: "batman,deathstroke,joker,killer-croc,riddler", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_justicia_absoluta_2_covs-65f7565042a2f415a317437479626735-640-0.webp" },
    { titulo: "Batman: La Carta Ganadora", categoria: "elseworlds-otros-dc", subtipo: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_-la_carta_ganadora-_cov-5197b196c6febef1fd17878513150760-1024-1024.webp" },
    { titulo: "Batman: La Era Oscura", categoria: "elseworlds-otros-dc", subtipo: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_la_era_oscura_cov-2fec9970042e58a66317552251253019-640-0.webp" },
    { titulo: "Batman: Caballero Blanco", categoria: "elseworlds-otros-dc", subtipo: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_caballero_blanco_cov-3ratapa1-d4ab1e58ab6486868c16693753427572-640-0.webp" },
    { titulo: "Batman: La Maldición del Caballero Blanco", categoria: "elseworlds-otros-dc", subtipo: "azrael,batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_curse_of_the_white_knight_cov_arg11-17941ec2fc2c82f25115948576602496-1024-1024.webp" },
    { titulo: "Batman: El Caballero Blanco Presenta - Harley Quinn", categoria: "elseworlds-otros-dc", subtipo: "batman,harley-quinn", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/bwk_harley_cov1-6a603ddf0c1b3c19b516252260323632-640-0.webp" },
    { titulo: "Batman: Más Allá del Caballero Blanco", categoria: "elseworlds-otros-dc", subtipo: "azrael,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_-_caballero_blanco_del_futuro1-9ccad08ac05b2c4f6616838692507247-640-0.webp" },
    { titulo: "Batman: El Caballero Blanco Presenta - Generación Joker", categoria: "elseworlds-otros-dc", subtipo: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_-_caballero_blanco__generacion_joker_cov-6938a10ab9dc3c971017377252359794-1024-1024.webp" },
    { titulo: "Batman: Caballero de La Venganza", categoria: "elseworlds-otros-dc", subtipo: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman-flashpoint-caballero-de-la-venganza-cov1-99b0736d7f8ac3bb2e16700426190697-1024-1024.webp" },
    { titulo: "Batman: Caballero Maldito", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_caballero_maldito_cov_2daedicion11-cf19a2f6d346b00c2416953585499602-640-0.webp" },
    { titulo: "Batman/Catwoman", categoria: "elseworlds-otros-dc", subtipo: "batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_catwoman_cov_arg1-a29e5fe25e946ed0f016790240294191-1024-1024.webp" },
    { titulo: "Batman/Juez Dredd: Juicio Sobre Gotham", categoria: "elseworlds-otros-dc", subtipo: "anarky,batman,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_juez_dreddcov-6d643a261bb773718117316981111474-1024-1024.webp" },
    { titulo: "Batman/Spawn", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_spawn_deluxe_cov-6e253dfc6cf02c063517527892115016-640-0.webp" },
    { titulo: "Batman/Tortugas Ninja Vol. 1", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_tmnt_cov-86da99168058469aae17159748754352-1024-1024.webp" },
    { titulo: "Batman/Tortugas Ninja Vol. 2", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_tmnt_ii_cov-a33f0608e737889d1717220479701959-1024-1024.webp" },
    { titulo: "Batman/Tortugas Ninja Vol. 3", categoria: "elseworlds-otros-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_tmnt_iii_cov-2128fe6dd7d35276b717304975288697-1024-1024.webp" },

    { titulo: "Esenciales DC #3: Heroes en Crisis", categoria: "renacimiento-dc", subtipo: "batman,flash-wally-west,harley-quinn,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/heroes_en_crisis_cov_arg1-00ebd9cbc28987035f16046669498029-640-0.webp" },

    // --- ABSOLUTE (DC) ---
    { titulo: "Absolute Batman Vol.1", categoria: "absolute-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_batman_cov_-ebfab072bc8f36fd1d17526095371796-1024-1024.webp" },
    { titulo: "Absolute Wonder Woman Vol. 1", categoria: "absolute-dc", subtipo: "wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_wonder_woman_cov_jpg-1c23aad53ac6bc9d9317656506275518-640-0.webp" },
    { titulo: "Absolute Superman Vol. 1", categoria: "absolute-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_superman_cov-262d809b3bd2c0eda717516349783514-1024-1024.webp" },
    { titulo: "Absolute Flash Vol. 1", categoria: "absolute-dc", subtipo: "flash-wally-west", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_flash_cov-a2b471d0bbb411084a17630683922940-640-0.webp" },
    { titulo: "Absolute Martian Manhunter Vol. 1", categoria: "absolute-dc", subtipo: "martian-manhunter", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_martian_manhunter_cov-c5b674c457c19f7a6717669292553724-640-0.webp" },
    { titulo: "Absolute Green Lantern Vol. 1", categoria: "absolute-dc", subtipo: "green-lantern-hal-jordan", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_green_lantern_vol_1_cov-d3df472c0b8d7d8c9817776555416834-640-0.webp" },
    { titulo: "Absolute Batman Vol. 2", categoria: "absolute-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_batman_vol_2_cov-81ca4615dc1a9b636917715399029299-1024-1024.webp" },
    { titulo: "Absolute Wonder Woman Vol.2", categoria: "absolute-dc", subtipo: "wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_wonder_woman_2_cov-8e32be630c3961de3117724571919123-1024-1024.webp" },
    { titulo: "Absolute Superman Vol. 2", categoria: "absolute-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_superman_vol_2_cov-1e080232d9e14656ac17758462622240-1024-1024.webp" },
    { titulo: "Absolute Martian Manhunter Vol. 2", categoria: "absolute-dc", subtipo: "martian-manhunter", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_martian_manhunter_vol_2_cov-c8a61ab0bac1b865f017873357025130-1024-1024.webp" },
    { titulo: "Absolute Flash Vol. 2", categoria: "absolute-dc", subtipo: "flash-wally-west", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_flash_2_cov-68dc15eef101c750c217809431890213-1024-1024.webp" },
    { titulo: "Absolute Batman Vol. 3", categoria: "absolute-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/absolute_batman_vol_3_cov-70e9a0d2f0d3db749d17824805883620-1024-1024.webp" },

    // --- RENACIMIENTO (DC Argentina) ---
    { titulo: "Superman: Lois & Clark — La Llegada", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/superman_lois__clark_cov_arg1-887fa05632c017439c15953344471109-640-0.webp" },
    { titulo: "Los Últimos Días de Superman", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/last_days_of_superman_cov_arg1-cbf1c701713e4e584915953441617103-1024-1024.webp" },
    { titulo: "Universo DC Renacimiento", categoria: "renacimiento-dc", subtipo: "aquaman,batman,cyborg,flash-barry-allen,flash-wally-west,green-lantern-jessica-cruz,green-lantern-simon-baz,liga,superman,wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/dc_rebirth_cov_arg_var1-e50af0cf8063fa961315954507956862-640-0.webp" },
    { titulo: "Batman Vol. 1: Yo Soy Gotham", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_vol_01_cov_arg1-fa7c5ab99dc5a1a5c215952931975077-640-0.webp" },
    { titulo: "Detective Comics Vol. 1: La Ascensión de Los Hombres Murciélago", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/detective_comics_vol_01_cov_arg1-7aa3d0c5ab3ffcf49615952937595959-1024-1024.webp" },
    { titulo: "Trinidad Vol. 1: Mejor Juntos", categoria: "renacimiento-dc", subtipo: "batman,superman,wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/trinity_vol_01_cov_arg1-9a9fb1e090f508820f15952953795355-640-0.webp" },
    { titulo: "Superman Vol. 1: Hijo de Superman", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/superman_vol_01_cov_arg1-27987f7067224c21fb15952951319356-640-0.webp" },
    { titulo: "Action Comics Vol. 1: Sendero de la Perdición", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_887044-MLU77961783640_082024-O.webp" },
    { titulo: "Liga de la Justicia Vol. 1: Las Máquinas de la Extinción", categoria: "renacimiento-dc", subtipo: "aquaman,batman,cyborg,flash-barry-allen,green-lantern-jessica-cruz,green-lantern-simon-baz,liga,superman,wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/justice_league_vol_01_cov_arg1-0011a9d12c435da3d215952948711524-1024-1024.webp" },
    { titulo: "Flash Vol. 1: El Relámpago Cae Dos Veces", categoria: "renacimiento-dc", subtipo: "flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flash_vol_01_cov_arg1-0b6210aa8ebe79480315952940515737-640-0.webp" },
    { titulo: "Harley Quinn Vol. 1: Morir Riendo", categoria: "renacimiento-dc", subtipo: "harley-quinn", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/harley_quinn_vol_01_cov_arg1-e81a172ea14a0f62ca15952945683425-640-0.webp" },
    { titulo: "All Star Batman Vol. 1: Yo, Mi Peor Enemigo", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/all_star_batman_01_cov_arg1-5f139fd501888db24e16075508570607-1024-1024.webp" },
    { titulo: "Batman: La Noche de los Hombres Monstruo", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_night_of_the_monster_men_cov_arg1-e3112d00e5d35b0d2315952936717208-1024-1024.webp" },
    { titulo: "Action Comics Vol. 2: Bienvenido al Planeta", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/action_comics_vol_02_cov_arg1-5b92bad098fd1c370115952925271170-1024-1024.webp" },
    { titulo: "Superman Vol. 2: Las Pruebas del Superhijo", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/superman_vol_02_cov_arg1-14390a772e82786b7a15952952098443-1024-1024.webp" },
    { titulo: "Escuadrón Suicida Vol. 1: La Cámara Negra", categoria: "renacimiento-dc", subtipo: "amanda-waller,escuadron-suicida,harley-quinn", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/suicide_squad_vol_01_cov_arg1-2f0f54415aded1ea9415952939549242-1024-1024.webp" },
    { titulo: "Batman Vol. 2: Yo Soy Suicida", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_vol_02_cov_arg1-4dccd9624ff1f1834415952932697950-1024-1024.webp" },
    { titulo: "Liga de la Justicia Contra El Escuadrón Suicida", categoria: "renacimiento-dc", subtipo: "amanda-waller,aquaman,batman,cyborg,escuadron-suicida,flash-barry-allen,green-lantern-jessica-cruz,green-lantern-simon-baz,harley-quinn,liga,superman,wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/justice_league_vs_suicide_squad_cov_arg1-2754a6b61b4a6ec17e15952947289683-640-0.webp" },
    { titulo: "Detective Comics Vol. 2: El Sindicato de las Víctimas", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/detective_comics_vol_02_cov_arg1-dbf4f5137f7fa76c0c15952938628174-1024-1024.webp" },
    { titulo: "Liga de la Justicia Vol. 2: Estallido", categoria: "renacimiento-dc", subtipo: "aquaman,batman,cyborg,flash-barry-allen,green-lantern-jessica-cruz,green-lantern-simon-baz,liga,superman,wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/justice_league_vol_02_cov_arg1-757289e0e831cb7f7915952949436912-640-0.webp" },
    { titulo: "Flash Vol. 2: La Velocidad de La Oscuridad", categoria: "renacimiento-dc", subtipo: "flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flash_vol_02_cov_arg1-c128d72136e6faa12f15952941275724-1024-1024.webp" },
    { titulo: "Harley Quinn Vol. 2: El Joker Ama a Harley", categoria: "renacimiento-dc", subtipo: "harley-quinn,joker", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/harley_quinn_vol_02_cov_arg1-cd45df91c1cbc1874915952946441367-1024-1024.webp" },
    { titulo: "Batman Vol. 3: Yo Soy Bane", categoria: "renacimiento-dc", subtipo: "bane,batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batmanvol031-07a353ded3be99c52c15908768340469-1024-1024.webp" },
    { titulo: "Action Comics Vol. 3: Hombres de Acero", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/action_comics_vol_03_cov_arg1-db7681c705f1cb402715952926876922-640-0.webp" },
    { titulo: "Detective Comics Vol. 3: La Liga de Las Sombras", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/detedtivecomicsvol031-fe8f0889168a8937e915908693968364-1024-1024.webp" },
    { titulo: "All Star Batman Vol. 2: Los Confines de la Tierra", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/all_star_batman_02_cov_arg1-5f55762324808d556715952929530642-1024-1024.webp" },
    { titulo: "Flash Vol. 3: Vuelven Los Villanos", categoria: "renacimiento-dc", subtipo: "flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flashvol031-84dc6e1faaf30bbe0115908695935172-1024-1024.webp" },
    { titulo: "Superman Vol. 3: Renacido", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_704894-MLA105761438885_012026-O.webp" },
    { titulo: "Batman / Flash: El Prendedor", categoria: "renacimiento-dc", subtipo: "batman,flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/el_prendedor_cov_arg1-5ce8d606c37dab610915908781649542-1024-1024.webp" },
    { titulo: "Action Comics Vol. 4: El Nuevo Mundo", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/action_comics_vol_4_cov1-28d439ac6e8747ac8a15890329661877-1024-1024.webp" },
    { titulo: "Superman Vol. 4: Amanecer Negro", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/supermanvolamanecernegro1-8606da905de28e58d315908682240299-1024-1024.webp" },
    { titulo: "Superhijos Vol. 1: Cuando Sea Mayor", categoria: "renacimiento-dc", subtipo: "batman,superhijos,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/superhijos_vol_01_cov_arg1-5113e243c407775b1e15952950372346-640-0.webp" },
    { titulo: "Flash Vol. 4: Corriendo Aterrado", categoria: "renacimiento-dc", subtipo: "flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flashvol041-777c6964b74c9b3cec15908696641721-640-0.webp" },
    { titulo: "Batman Vol. 4: La Guerra de Las Bromas y Los Acertijos", categoria: "renacimiento-dc", subtipo: "batman,joker,riddler", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batmanvol041-425ea09c9ce6cd032715908769340423-640-0.webp" },
    { titulo: "Detective Comics Vol. 4: Deus Ex Machina", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/detectivecomicsvol041-ce2f577de41456800115908694856836-640-0.webp" },
    { titulo: "All Star Batman Vol. 3: El Primer Aliado", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/all_star_batman_03_cov_arg1-dea9d6b38b0847d3f915952930856156-640-0.webp" },
    { titulo: "Liga de la Justicia Vol. 3: Intemporales", categoria: "renacimiento-dc", subtipo: "aquaman,batman,cyborg,flash-barry-allen,green-lantern-jessica-cruz,green-lantern-simon-baz,liga,superman,wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/laligadelajusticiavol031-fb0338db9f5e2b2f6515908691150457-1024-1024.webp" },
    { titulo: "Action Comics Vol. 5: El Efecto Oz", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/action_comics_vol_5_cov1-c7d9e379836be611cc16328696499933-640-0.webp" },
    { titulo: "Flash Vol. 5: Negativo", categoria: "renacimiento-dc", subtipo: "flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flashvol05negativo1-cc1a8b8907bfd6d65f15908697444656-1024-1024.webp" },
    { titulo: "Batman Vol. 5: Las Reglas del Compromiso", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batmanvol051-732c05e139369515e315908770031759-640-0.webp" },
    { titulo: "Detective Comics Vol. 5: Un Lugar Solitario Para Vivir", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/detective_comics_vol_05_cov_arg1-d2de0acfcdfcecf27415974064544472-640-0.webp" },
    { titulo: "Superman Vol. 5: Universo Bizarro", categoria: "renacimiento-dc", subtipo: "superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/superman_vol_05_cov_arg1-dd49239eee9388a50216329488792145-640-0.webp" },
    { titulo: "Liga de la Justicia Vol. 4: Legado", categoria: "renacimiento-dc", subtipo: "aquaman,batman,cyborg,flash-barry-allen,green-lantern-jessica-cruz,green-lantern-simon-baz,liga,superman,wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/ligadelajusticiavol041-651eec9eca26d2579315908692021526-640-0.webp" },
    { titulo: "Flash Vol. 6: Un Día Frío en el Infierno", categoria: "renacimiento-dc", subtipo: "flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flashvol061-6fe3abc86636b1898f15908698309154-640-0.webp" },
    { titulo: "Batman Vol. 6: ¿Novia o Ladrona?", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batmanvol061-e7ba6eceb562bc268015908770965402-640-0.webp" },
    { titulo: "Batman Vol. 7: La Boda", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_la_boda_cov1-4acd6ce5f7c651e4c115933744435615-640-0.webp" },
    { titulo: "Detective Comics Vol. 6: Hombres Murciélagos Eternos", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_716264-MLA46450030754_062021-O.webp" },
    { titulo: "Liga de la Justicia Vol. 5: Justicia Perdida", categoria: "renacimiento-dc", subtipo: "aquaman,batman,cyborg,flash-barry-allen,green-lantern-jessica-cruz,green-lantern-simon-baz,liga,superman,wonder-woman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/ligadelajusticiavol05justiciaperdida1-047b192b62df08b27e15908693104228-640-0.webp" },
    { titulo: "Flash Vol. 7: La Guerra de Flash", categoria: "renacimiento-dc", subtipo: "flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flash_vol_07_cov_arg1-3e920e993bef561e9016328688666223-1024-1024.webp" },
    { titulo: "Batman Vol. 8: Días Fríos", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/326/487/products/9789877246353-aaf4aa4279c037042216450259152333-640-0.webp" },
    { titulo: "Detective Comics Vol. 7: Mitología", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/detective_comics_vol_07_cov_arg-4642828d2ec5fd47cf16329518739245-640-0.webp" },
    { titulo: "Flash Vol. 8: La Búsqueda de La Fuerza", categoria: "renacimiento-dc", subtipo: "flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flash_vol_08_cov_arg1-fb081cddf0455a28d516064085767082-1024-1024.webp" },
    { titulo: "Batman Vol. 9: Pesadillas", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_vol_09_cov_arg1-b1828bb60428a2c34716328690822664-640-0.webp" },
    { titulo: "Flash Vol. 9: El Reino de Los Renegados", categoria: "renacimiento-dc", subtipo: "flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flash_vol_09_cov_arg1-68ad1c5f7e647c3ed016328686424443-1024-1024.webp" },
    { titulo: "Batman Vol. 10: La Caída y Los Caídos", categoria: "renacimiento-dc", subtipo: "batman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/batman_vol_10_cov_arg1-6fd39f68d186572aa616328693116362-1024-1024.webp" },
    { titulo: "Flash Vol. 10: La Era de Flash", categoria: "renacimiento-dc", subtipo: "flash-barry-allen", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/flash_vol_10_cov_arg1-67dc11019d71a8c93616328684478599-1024-1024.webp" },
    { titulo: "Batman Vol. 11: Ciudad de Bane", categoria: "renacimiento-dc", subtipo: "bane,batman", tipo: "Cómic", poster: "https://http2.mlstatic.com/D_NQ_NP_766233-MLA44443800587_122020-O.webp" },
    { titulo: "Doomsday Clock: Primera Parte", categoria: "renacimiento-dc", subtipo: "batman,dr-manhattan,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/doomsday_clock_vol_01_cov_arg1-0dec0f9c563fc5a6bb16215517985773-640-0.webp" },
    { titulo: "Doomsday Clock: Segunda Parte", categoria: "renacimiento-dc", subtipo: "batman,dr-manhattan,superman", tipo: "Cómic", poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/doomsdayclockvol021-1d5d82540814ccb66315908689620786-640-0.webp" },
];

// ==========================================
// COLECCIONES (fichas que se abren y muestran progreso)
// ==========================================
const colecciones = [
    {
        id: "arrow",
        titulo: "Arrow",
        esSerie: true,
        categoria: "arrowverse",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwxzfrMREXF6kfHXLmAJnhvUsAwyw6jgU_8P6tQure44F6W1hTMtwfFFsV&s=10",
        tipoArrow: "principal",
        crono: 1,
        peliculas: [
            { titulo: "Arrow Temporada 1", poster: "https://i.pinimg.com/736x/d8/ff/4f/d8ff4f2a7c368e84b1b0062d9c7ed835.jpg" },
            { titulo: "Arrow Temporada 2", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmR9NQrOKmCPzNNBRTvyTRBk33jkn9SZiaj9Z9W-zec3Qh0dIXy242z0I&s=10" },
            { titulo: "Arrow Temporada 3", poster: "https://image.tmdb.org/t/p/original/uWwGLfG1SVeXseEo5VYO2IfT5VJ.jpg" },
            { titulo: "Arrow Temporada 4", poster: "https://static.wikia.nocookie.net/arrow/images/4/45/Arrow_season_4_poster_-_Aim._Higher..png/revision/latest?cb=20150903025613" },
            { titulo: "Arrow Temporada 5", poster: "https://im.ziffdavisinternational.com/ign_es/screenshot/default/fotonoticia-20160922113344-16091812939-9999_x4jy.jpg" },
            { titulo: "Arrow Temporada 6", poster: "https://image.tmdb.org/t/p/original/wVWsK34umDltQPaYsfhW1mZhkN0.jpg" },
            { titulo: "Arrow Temporada 7", poster: "https://static.wikia.nocookie.net/arrow/images/4/49/Arrow_season_7_poster_-_Revelation_and_Repentance.png/revision/latest?cb=20181016060641" },
            { titulo: "Arrow Temporada 8", poster: "https://static.wikia.nocookie.net/arrow/images/e/ef/Arrow_season_8_poster_-_Heroes_Fall._Legends_Rise..png/revision/latest/scale-to-width-down/1200?cb=20190920191924" }
        ]
    },
    {
        id: "the-flash",
        titulo: "The Flash",
        esSerie: true,
        categoria: "arrowverse",
        poster: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/14/35/ustv-the-flash-poster.jpg",
        tipoArrow: "principal",
        crono: 2,
        peliculas: [
            { titulo: "The Flash Temporada 1", poster: "https://image.tmdb.org/t/p/original/A3H6pewHfoy2bXmNhvycOe0xzlC.jpg" },
            { titulo: "The Flash Temporada 2", poster: "https://i.pinimg.com/736x/57/3d/d8/573dd8cfd8e9ca6f18cc80374e4a374c.jpg" },
            { titulo: "The Flash Temporada 3", poster: "https://i.pinimg.com/736x/7a/f1/be/7af1beccd0ac6a8facb66e8553c63d97.jpg" },
            { titulo: "The Flash Temporada 4", poster: "https://static.wikia.nocookie.net/arrow/images/3/3b/The_Flash_season_4_poster_-_Reborn._Recharged.png/revision/latest?cb=20170930013346&path-prefix=es" },
            { titulo: "The Flash Temporada 5", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1vPYBNd13FuxuTV8p9PdNd_PuqZ2TwUHLIaQlIWsecVdM6VeHgcMlrx20&s=10" },
            { titulo: "The Flash Temporada 6", poster: "https://image.tmdb.org/t/p/original/shyVhwVmuNlXUJxrAK40FWEIBAR.jpg" },
            { titulo: "The Flash Temporada 7", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFbBP7bpBvHsdYeewX1YFh_QG65ocTMDpJC2N-bMPQ15yLjO6KcX2eovYE&s=10" },
            { titulo: "The Flash Temporada 8", poster: "https://static.wikia.nocookie.net/arrow/images/d/d8/The-flash-season-8-poster.webp/revision/latest?cb=20221127152059&path-prefix=es" },
            { titulo: "The Flash Temporada 9", poster: "https://comicbook.com/wp-content/uploads/sites/4/2023/01/ca3a92f5-5e84-4f3f-bed5-3aaaf1f2ff3a.jpg?w=1024" }
        ]
    },
    {
        id: "supergirl",
        titulo: "Supergirl",
        esSerie: true,
        categoria: "arrowverse",
        poster: "https://static.wikia.nocookie.net/supergirl/images/b/b6/Temporada_1_poster.png/revision/latest/scale-to-width-down/1200?cb=20160210130437&path-prefix=es",
        tipoArrow: "principal",
        crono: 4,
        peliculas: [
            { titulo: "Supergirl Temporada 1", poster: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p11779472_b_v8_ab.jpg" },
            { titulo: "Supergirl Temporada 2", poster: "https://www.scifinow.co.uk/wp-content/uploads/2016/08/supergirl-season-2-poster.jpg" },
            { titulo: "Supergirl Temporada 3", poster: "https://static.wikia.nocookie.net/arrow/images/d/d6/Supergirl_season_3_poster_-_Flying_Solo.png/revision/latest?cb=20170930013538&path-prefix=es" },
            { titulo: "Supergirl Temporada 4", poster: "https://m.media-amazon.com/images/I/61QTyLbv6lL._AC_UF1000,1000_QL80_.jpg" },
            { titulo: "Supergirl Temporada 5", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ78Y350vZHtm6D0D9T3EngJlPCLWQGB8326aylj2FqIO_1pK3Srsfkg0Dp&s=10" },
            { titulo: "Supergirl Temporada 6", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuvfGEF31MsKqGYq8T9JuFEp-Es9Fa126Z8-gNbzDNpEqH1_zSTDs3balZ&s=10" }
        ]
    },
    {
        id: "batwoman",
        titulo: "Batwoman",
        esSerie: true,
        categoria: "arrowverse",
        poster: "https://www.scifinow.co.uk/wp-content/uploads/2019/07/batwoman_xxlg.jpg",
        tipoArrow: "principal",
        crono: 12,
        peliculas: [
            { titulo: "Batwoman Temporada 1", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQrXwGRYSi3_2JJ009gsH9RVTEQelXwsyqXSafHXJpkoMdbr-K20c8tUo&s=10" },
            { titulo: "Batwoman Temporada 2", poster: "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2020/12/BWNS2_8x12_300dpi.jpg" },
            { titulo: "Batwoman Temporada 3", poster: "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2021/09/BWNS3_8x12_300dpi.jpg" }
        ]
    },
    {
        id: "legends-of-tomorrow",
        titulo: "DC's Legends of Tomorrow",
        esSerie: true,
        categoria: "arrowverse",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR16L1B69PNDrGPa1F6IAudcuDxCRiJn4hBi61UsY9rIn5p5hKahadZ0TU&s=10",
        tipoArrow: "principal",
        crono: 6,
        peliculas: [
            { titulo: "DC's Legends of Tomorrow Temporada 1", poster: "https://image.tmdb.org/t/p/original/xEY4YPu7FCKQNSnMaaHo4NJl3ID.jpg" },
            { titulo: "DC's Legends of Tomorrow Temporada 2", poster: "https://static.wikia.nocookie.net/arrow/images/8/86/DC%27s_Legends_of_Tomorrow_season_2_poster_-_A_Mission_For_All_Time.png/revision/latest?cb=20160923044208" },
            { titulo: "DC's Legends of Tomorrow Temporada 3", poster: "https://i0.wp.com/brainstomping.com/wp-content/uploads/2018/04/legends-of-tomorrow-season-3.png?ssl=1" },
            { titulo: "DC's Legends of Tomorrow Temporada 4", poster: "https://static.wikia.nocookie.net/arrow/images/a/a8/LEG_S4_8x12_300dpi-683x1024.jpg/revision/latest?cb=20181104053312&path-prefix=es" },
            { titulo: "DC's Legends of Tomorrow Temporada 5", poster: "https://legiondelarrowverso.wordpress.com/wp-content/uploads/2020/01/lgn-s5-8x12-r2-300dpi-1203197.jpeg" }
        ]
    },
    {
        id: "black-lightning",
        titulo: "Black Lightning",
        esSerie: true,
        categoria: "arrowverse",
        poster: "https://i.pinimg.com/564x/d5/44/a4/d544a4236f757cea8e84db91ffb92fff.jpg",
        tipoArrow: "principal",
        crono: 26,
        peliculas: [
            { titulo: "Black Lightning Temporada 1", poster: "https://cdn.seat42f.com/wp-content/uploads/2017/12/13200135/Black-Lightning-Season-1-Poster-Key-Art.jpg" },
            { titulo: "Black Lightning Temporada 2", poster: "https://i.pinimg.com/736x/f1/a2/33/f1a2336de9bf9b77565ea61ebd7e4020.jpg" },
            { titulo: "Black Lightning Temporada 3", poster: "https://i.pinimg.com/736x/74/f2/84/74f2847f04612b4dfddbd7cf26fd110b.jpg" },
            { titulo: "Black Lightning Temporada 4", poster: "https://i.pinimg.com/736x/83/4f/41/834f412b96ce9315a9a7de806f1d80bd.jpg" }
        ]
    },
    {
        id: "superman-y-lois",
        titulo: "Superman & Lois",
        esSerie: true,
        categoria: "dc-multiverso",
        poster: "https://image.tmdb.org/t/p/original/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
        subtipo: "liveaction",
        tierra: 39,
        etiqueta: "Serie - Tierra 39",
        peliculas: [
            { titulo: "Superman y Lois Temporada 1", poster: "https://image.tmdb.org/t/p/original/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg" },
            { titulo: "Superman y Lois Temporada 2", poster: "https://image.tmdb.org/t/p/original/nmlQPpY3YpuBgl4oLyMYqMASYrv.jpg" },
            { titulo: "Superman y Lois Temporada 3", poster: "https://image.tmdb.org/t/p/original/hlMO1juHPuaiyL27BDLUcAvxmqq.jpg" },
            { titulo: "Superman y Lois Temporada 4", poster: "https://image.tmdb.org/t/p/original/hoWkpACsrLgv4QMT4XCDrzoPdWN.jpg" }
        ]
    },
    {
        id: "stargirl",
        titulo: "Stargirl",
        esSerie: true,
        categoria: "dc-multiverso",
        poster: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p18061959_b_v12_af.jpg",
        subtipo: "liveaction",
        tierra: 2,
        etiqueta: "Serie - Tierra 2",
        peliculas: [
            { titulo: "Stargirl Temporada 1", poster: "https://image.tmdb.org/t/p/original/nPXo3mGt51wDeZt5YbT3evMqDiH.jpg" },
            { titulo: "Stargirl Temporada 2", poster: "https://image.tmdb.org/t/p/original/q3EFMfQFAnvSCHhZSOxq4AOsgN9.jpg" },
            { titulo: "Stargirl Temporada 3", poster: "https://static.wikia.nocookie.net/stargirltv/images/2/2a/Stargirl_Season_3_Poster.jpeg/revision/latest?cb=20220803163836" }
        ]
    },
    {
        id: "batman-trilogia-nolan",
        titulo: "Batman – Trilogía de Nolan",
        categoria: "dc-multiverso",
        poster: "https://i.pinimg.com/736x/d7/36/c2/d736c2ebc5976a2b9390199f015871a9.jpg",
        subtipo: "liveaction",
        tierra: 205,
        etiqueta: "Trilogía - Tierra 205",
        peliculas: [
            { titulo: "Batman Inicia", poster: "https://i.pinimg.com/736x/67/88/19/678819ae9fc2b7104ecc124f2e586c05.jpg" },
            { titulo: "The Dark Knight", poster: "https://image.tmdb.org/t/p/original/o8i8EDSWiwzTIiaMgyPnESKYIVd.jpg" },
            { titulo: "The Dark Knight Rises", poster: "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_FMjpg_UX1000_.jpg" }
        ]
    },
    {
        id: "batman-90s",
        titulo: "Batman – 90's",
        categoria: "dc-multiverso",
        poster: "https://i.pinimg.com/474x/92/14/fd/9214fd62db2562734efa3e7698735033.jpg",
        subtipo: "liveaction",
        tierra: 89,
        etiqueta: "Saga - Tierra 89",
        peliculas: [
            { titulo: "Batman (1989)", poster: "https://www.originalfilmart.com/cdn/shop/products/batman_1989_original_film_art_f_1600x.jpg?v=1562541693" },
            { titulo: "Batman Regresa", poster: "https://m.media-amazon.com/images/M/MV5BZTliMDVkYTktZDdlMS00NTAwLWJhNzYtMWIwMDZjN2ViMGFiXkEyXkFqcGc@._V1_.jpg" },
            { titulo: "Batman Forever", poster: "https://www.originalfilmart.com/cdn/shop/files/BatmanForever_1995_Val_Kilmer_adv_original_film_art_5000x.webp?v=1684435176" },
            { titulo: "Batman & Robin", poster: "https://m.media-amazon.com/images/I/71v6GPOxgGL._AC_UF894,1000_QL80_.jpg" }
        ]
    },
    {
        id: "actores",
        titulo: "Actores",
        categoria: "explorar",
        poster: "https://wallpapercat.com/w/full/e/c/a/126634-1152x2048-mobile-hd-la-la-land-wallpaper-photo.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "leonardo-dicaprio",
        titulo: "Leonardo Di Caprio",
        categoria: "actores",
        poster: "https://i.pinimg.com/564x/e5/23/51/e52351dd0c0ab0da7c2d43d8bf4edc73.jpg",
        esContenedor: true,
        etiqueta: "Actor",
        progresoCategoria: "leonardo-dicaprio",
        peliculas: []
    },
    {
        id: "ryan-gosling",
        titulo: "Ryan Gosling",
        categoria: "actores",
        poster: "https://wallpapercave.com/wp/wp13304845.jpg",
        esContenedor: true,
        etiqueta: "Actor",
        progresoCategoria: "ryan-gosling",
        peliculas: []
    },
    {
        id: "sydney-sweeney",
        titulo: "Sydney Sweeney",
        categoria: "actores",
        poster: "https://i.pinimg.com/564x/e0/70/39/e070396e884005afe0073c6ddf3c826b.jpg",
        esContenedor: true,
        etiqueta: "Actriz",
        progresoCategoria: "sydney-sweeney",
        peliculas: []
    },
    {
        id: "inde-navarrette",
        titulo: "Inde Navarrette",
        categoria: "actores",
        poster: "https://m.media-amazon.com/images/M/MV5BODFlMTZmODItNzExZi00ZWJiLTgyMTUtOGFlY2FiZTJiZTExXkEyXkFqcGc@._V1_.jpg",
        etiqueta: "Actriz",
        peliculas: [
            { titulo: "13 Reasons Why", poster: "https://m.media-amazon.com/images/I/61ljrN7zmoL.jpg" },
            { titulo: "Superman & Lois", poster: "https://sm.ign.com/ign_es/screenshot/default/superman-and-lois-poster-1259202_2cy3.jpg" },
            { titulo: "Obsession", poster: "https://cdng.europosters.eu/pod_public/1300/321144.jpg" },
            { titulo: "Trap House", poster: "https://m.media-amazon.com/images/M/MV5BYmY0OTk0ZDktMmJkNy00NjQwLWE0NjQtOTY4Y2VhODdhOTJjXkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "florence-pugh",
        titulo: "Florence Pugh",
        categoria: "actores",
        poster: "https://i.pinimg.com/736x/a3/08/ae/a308aef1fa1cc1d12057db0470cf5044.jpg",
        esContenedor: true,
        etiqueta: "Actriz",
        progresoCategoria: "florence-pugh",
        peliculas: []
    },
    {
        id: "emma-stone",
        titulo: "Emma Stone",
        categoria: "actores",
        poster: "https://i.pinimg.com/736x/d2/7a/78/d27a78a6976b1247b22f4ba40d48c052.jpg",
        esContenedor: true,
        etiqueta: "Actriz",
        progresoCategoria: "emma-stone",
        peliculas: []
    },
    {
        id: "jenna-ortega",
        titulo: "Jenna Ortega",
        categoria: "actores",
        poster: "https://i.pinimg.com/736x/67/1b/d1/671bd12d4f14031b6e587c51265e21a4.jpg",
        esContenedor: true,
        etiqueta: "Actriz",
        progresoCategoria: "jenna-ortega",
        peliculas: []
    },
    {
        id: "andrew-garfield",
        titulo: "Andrew Garfield",
        categoria: "actores",
        poster: "https://i.pinimg.com/736x/ea/7a/72/ea7a72966b7f3fbf7a9694e434605cf8.jpg",
        esContenedor: true,
        etiqueta: "Actor",
        progresoCategoria: "andrew-garfield",
        peliculas: []
    },
    {
        id: "tom-holland",
        titulo: "Tom Holland",
        categoria: "actores",
        poster: "https://w0.peakpx.com/wallpaper/525/822/HD-wallpaper-tom-holland-top-25-best-tom-holland-background-tom-holland-funny.jpg",
        esContenedor: true,
        etiqueta: "Actor",
        progresoCategoria: "tom-holland",
        peliculas: []
    },
    {
        id: "barry-keoghan",
        titulo: "Barry Keoghan",
        categoria: "actores",
        poster: "https://wallpapercave.com/wp/wp10914036.jpg",
        esContenedor: true,
        etiqueta: "Actor",
        progresoCategoria: "barry-keoghan",
        peliculas: []
    },
    {
        id: "brad-pitt",
        titulo: "Brad Pitt",
        categoria: "actores",
        poster: "https://i.pinimg.com/736x/ab/7b/aa/ab7baa3e92eb4af365b7734a4fe8da16.jpg",
        esContenedor: true,
        etiqueta: "Actor",
        progresoCategoria: "brad-pitt",
        peliculas: []
    },
    {
        id: "timothee-chalamet",
        titulo: "Timothée Chalamet",
        categoria: "actores",
        poster: "https://w0.peakpx.com/wallpaper/349/641/HD-wallpaper-timothee-chalamet-tim-timmy.jpg",
        etiqueta: "Actor",
        peliculas: [
            { titulo: "Men, Women and Children", poster: "https://i0.wp.com/www.heyuguys.com/images/2014/11/Men-Women-and-Children-Poster.jpg?fit=961%2C1500&ssl=1" },
            { titulo: "Interstellar", poster: "https://m.media-amazon.com/images/I/91obuWzA3XL.jpg" },
            { titulo: "Worst Friends", poster: "https://m.media-amazon.com/images/M/MV5BMzk3ODA0MzY5M15BMl5BanBnXkFtZTgwMTM3NzMyMjE@._V1_.jpg" },
            { titulo: "One & Two", poster: "https://m.media-amazon.com/images/M/MV5BMTQyZWE3YTQtMzdlYS00OGY3LWEzNDMtZmI3MTRlYTUwNzgwXkEyXkFqcGc@._V1_.jpg" },
            { titulo: "The Aderall Diaries", poster: "https://m.media-amazon.com/images/M/MV5BZGIyNGU0NDYtZmUxYi00MGJjLTkzNDEtYWM0ZTVjOThiZWI1XkEyXkFqcGc@._V1_.jpg" },
            { titulo: "Hostiles", poster: "https://m.media-amazon.com/images/I/61Hoei3PR2L._AC_UF894,1000_QL80_.jpg" },
            { titulo: "Beautiful Boy", poster: "https://cdng.europosters.eu/pod_public/1300/322566.jpg" },
            { titulo: "A Rainy Day in New York", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzaHDrp-ZVijte7TIVCzHPU-7iofJqFDvCCU1wnkbGLCE9JZDHMdPf_gT8&s=10" },
            { titulo: "The King", poster: "https://m.media-amazon.com/images/M/MV5BOTFhZTY4YWUtMmJjMy00OTE0LTlmZjctMDg5MTk4N2ZjZWNjXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Little Women", poster: "https://m.media-amazon.com/images/I/61TK-+geKPL.AC_UF894,1000_QL80.jpg" },
            { titulo: "The French Dispatch", poster: "https://m.media-amazon.com/images/I/71nWfxOlCTL.jpg" },
            { titulo: "Dune: Parte Uno", poster: "https://cdn.europosters.eu/image/1300/302577.jpg" },
            { titulo: "Don't Look Up", poster: "https://dnm.nflximg.net/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABaa7zSeOtW5ON9mx0Qmpii1K-9xpKKXfNTwcB7AvclDduYgu9lAQDpnVTG7QBY2BteEMa7TOuFtrz5jL6PYv-cOCn4mmsWyylywc.jpg?r=5b6" },
            { titulo: "Bones and All", poster: "https://i.pinimg.com/736x/93/c9/42/93c9420b3cd9e145c6580e2786bbe8c3.jpg" },
            { titulo: "Wonka", poster: "https://purodiseno.lat/wp-content/uploads/2023/10/WONKA-POSTER-02.jpg" },
            { titulo: "Dune: Parte Dos", poster: "https://deadline.com/wp-content/uploads/2023/05/FvIhyI9aUAUZz6l.jpeg?w=819" },
            { titulo: "A Complete Unknown", poster: "https://m.media-amazon.com/images/M/MV5BYTA2NTA5NDYtMzlkOC00MTQxLWI0NDQtMzk2M2YzMGE4MTkxXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Marty Supreme", poster: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/193/2026/02/09112829/lYWEXbQgRTR4ZQleSXAgRbxAjvq-scaled.jpg" }
        ]
    },
    {
        id: "margot-robbie",
        titulo: "Margot Robbie",
        categoria: "actores",
        poster: "https://i.pinimg.com/736x/e4/36/c0/e436c08cbe530e490c7102a100fcae06.jpg",
        esContenedor: true,
        etiqueta: "Actriz",
        progresoCategoria: "margot-robbie",
        peliculas: []
    },
    {
        id: "directores",
        titulo: "Directores",
        categoria: "explorar",
        poster: "https://wallpapercat.com/w/full/8/2/8/1354558-2048x3137-iphone-hd-damien-chazelle-background-image.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "galardones",
        titulo: "Galardones",
        categoria: "explorar",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7wPadEh8Kbsyrj9VvfkBV94JIRXYNdaG2cwtk8KbQ2EjXeIeYE-rvael_&s=10",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "academy-awards",
        titulo: "Academy Awards",
        categoria: "galardones",
        poster: "https://w0.peakpx.com/wallpaper/320/887/HD-wallpaper-the-oscars-award-golden-statue-symbol.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "golden-globes",
        titulo: "Golden Globes",
        categoria: "galardones",
        poster: "https://i.pinimg.com/474x/88/4d/ef/884def6caa7f1ef49a06a01c4e67451b.jpg",
        peliculas: []
    },
    {
        id: "oscar-2020-actualidad",
        titulo: "2020 - Actualidad",
        categoria: "academy-awards",
        poster: "https://wallpapercat.com/w/full/5/7/9/1371526-1780x2748-mobile-hd-the-oscars-background-image.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "oscar-2020",
        titulo: "2020",
        categoria: "oscar-anios",
        poster: "https://m.media-amazon.com/images/M/MV5BYjBiYzg3NmYtODgzNS00Y2I4LTlmMGQtZmQ5ODA2ZTNmOTAyXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg",
        esContenedor: true,
        progresoCategoria: "oscar-2020",
        peliculas: []
    },
    {
        id: "oscar-2021",
        titulo: "2021",
        categoria: "oscar-anios",
        poster: "https://icantunseethatmovie.com/wp-content/uploads/2023/06/06209-oscars2021_yellowposter.png",
        esContenedor: true,
        progresoCategoria: "oscar-2021",
        peliculas: []
    },
    {
        id: "oscar-2022",
        titulo: "2022",
        categoria: "oscar-anios",
        poster: "https://static0.srcdn.com/wordpress/wp-content/uploads/2024/01/the-oscars-poster-featuring-an-oscars-statue-standing-in-front-of-a-curtain.jpeg",
        esContenedor: true,
        progresoCategoria: "oscar-2022",
        peliculas: []
    },
    {
        id: "oscar-2023",
        titulo: "2023",
        categoria: "oscar-anios",
        poster: "https://m.media-amazon.com/images/M/MV5BZjM4NDAyZDMtYjA4ZC00MmZhLTllNzktZDZlMWFmYzBiYTEzXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg",
        esContenedor: true,
        progresoCategoria: "oscar-2023",
        peliculas: []
    },
    {
        id: "oscar-2024",
        titulo: "2024",
        categoria: "oscar-anios",
        poster: "https://m.media-amazon.com/images/M/MV5BOWQyNDA5NzYtODFlMi00MmQwLTlmYTMtYjI4NmYwYWNmMjYwXkEyXkFqcGc@.V1.jpg",
        esContenedor: true,
        progresoCategoria: "oscar-2024",
        peliculas: []
    },
    {
        id: "oscar-2025",
        titulo: "2025",
        categoria: "oscar-anios",
        poster: "https://m.media-amazon.com/images/M/MV5BZTRhM2Q5ZGQtYzM2NC00NWY2LWJlODUtMmE4MTJmYTUyNjU5XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg",
        esContenedor: true,
        progresoCategoria: "oscar-2025",
        peliculas: []
    },
    {
        id: "oscar-2026",
        titulo: "2026",
        categoria: "oscar-anios",
        poster: "https://image.tmdb.org/t/p/w500/mbERPIFlNxN9hwI8Cp3K5TstmDq.jpg",
        esContenedor: true,
        progresoCategoria: "oscar-2026",
        peliculas: []
    },
    {
        id: "videojuegos-explorar",
        titulo: "Videojuegos",
        categoria: "explorar",
        poster: "https://wallpapercave.com/wp/wp14511676.png",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "assassins-creed",
        titulo: "Assassin's Creed",
        categoria: "videojuegos-explorar",
        poster: "https://i.pinimg.com/736x/34/43/2b/34432bfe77291064ca1b5ad00f728088.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "atajo-dc-videojuegos",
        titulo: "DC Comics",
        categoria: "videojuegos-explorar",
        poster: "https://w0.peakpx.com/wallpaper/426/403/HD-wallpaper-knight-batman-arkham-knight-batman-thumbnail.jpg",
        esContenedor: true,
        atajoId: "dc-videojuegos",
        peliculas: []
    },
    {
        id: "atajo-lego-videojuegos",
        titulo: "LEGO Videojuegos",
        categoria: "videojuegos-explorar",
        poster: "https://w0.peakpx.com/wallpaper/185/537/HD-wallpaper-lego-brand-logo.jpg",
        esContenedor: true,
        atajoId: "lego-videojuegos",
        peliculas: []
    },
    {
        id: "atajo-marvel-videojuegos",
        titulo: "Marvel Videojuegos",
        categoria: "videojuegos-explorar",
        poster: "https://i.pinimg.com/736x/17/54/27/175427784715922a7d1cedd638bb7c2f.jpg",
        esContenedor: true,
        atajoId: "marvel-videojuegos",
        peliculas: []
    },
    {
        id: "grand-theft-auto",
        titulo: "Grand Theft Auto",
        categoria: "videojuegos-explorar",
        poster: "https://i.pinimg.com/736x/e9/e6/90/e9e69071ab155fbc13975fa2b583ad82.jpg",
        esVideojuego: true,
        peliculas: [
            { titulo: "GTA V", poster: "https://oyster.ignimgs.com/wordpress/stg.ign.com/2012/11/GTAV_poster_11.jpg" }
        ]
    },
    {
        id: "borderlands",
        titulo: "Borderlands",
        categoria: "videojuegos-explorar",
        poster: "https://i.pinimg.com/736x/96/0f/16/960f161b198900948370b273e62d068e.jpg",
        esVideojuego: true,
        peliculas: [
            { titulo: "Borderlands (2009)", poster: "https://m.media-amazon.com/images/M/MV5BMDM2MTk5NTctZGRlMy00YWZiLThkYTItY2Q1ZTA4OWU3NWQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Borderlands 2", poster: "https://upload.wikimedia.org/wikipedia/en/5/51/Borderlands_2_cover_art.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" },
            { titulo: "Borderlands: The Pre-Sequel", poster: "https://m.media-amazon.com/images/M/MV5BYjEzYTVhNTEtYTBmYS00OTA1LWFlYmMtYWYwMmU5MmRhNzA2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Tales From The Borderlands", poster: "https://m.media-amazon.com/images/M/MV5BNGVlYzE4ZWEtZDAwZC00NGVjLWI1ZDUtOTdkNWY4MDE3MmVmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Borderlands 3", poster: "https://m.media-amazon.com/images/M/MV5BODUxN2IyZjctZjY0Mi00NDc4LTg1ZWQtOTM2MGY2MmM5ODk3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Tiny Tina's Wonderlands", poster: "https://m.media-amazon.com/images/M/MV5BYzQ2OGUwNzQtN2RkZS00MjYzLWFiNzctNjhiOTRlNmViZjFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "New Tales from the Borderlands", poster: "https://m.media-amazon.com/images/M/MV5BZTcwYzcyYWMtMWZlZS00NzQwLTljMDctZmM3ZGQ2MjllMDcxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Borderlands 4", poster: "https://m.media-amazon.com/images/M/MV5BZmE1OGFkMmEtMDhlYS00OTI2LTllMzQtNDA4ODhlYzZhMGY4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" }
        ]
    },
    {
        id: "tomb-raider",
        titulo: "Tomb Raider",
        categoria: "videojuegos-explorar",
        poster: "https://i.pinimg.com/736x/74/6f/14/746f1469cf6d2f0f1284e7df65ea88ed.jpg",
        esContenedor: true,
        esVideojuego: true,
        progresoCategoria: "tomb-raider",
        peliculas: []
    },
    {
        id: "franquicias",
        titulo: "Franquicias",
        categoria: "explorar",
        poster: "https://i.pinimg.com/736x/62/74/e2/6274e27e43cfb816c6fcfeaefdd9b21d.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "matrix-saga",
        titulo: "The Matrix Saga",
        categoria: "franquicias",
        poster: "https://i.pinimg.com/736x/d4/a1/62/d4a1624acca21d711b9b8c1d5d0c46ff.jpg",
        esContenedor: true,
        progresoCategoria: "matrix-saga",
        peliculas: []
    },
    {
        id: "pokemon",
        titulo: "Pokémon",
        categoria: "anime",
        poster: "https://i.pinimg.com/736x/7f/10/9a/7f109adedbe9912c95bd5cf4c13365f1.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "pokemon-canon",
        titulo: "Canon",
        categoria: "pokemon",
        poster: "https://wallpapercg.com/media/ts_orig/12457.webp",
        esContenedor: true,
        progresoCategoria: "pokemon-canon",
        peliculas: []
    },
    {
        id: "sitcoms",
        titulo: "Sitcoms",
        categoria: "explorar",
        poster: "https://w0.peakpx.com/wallpaper/778/538/HD-wallpaper-friends-anos-90-chandler-joey-monica-phoebe-rachel-roxo-seriado-tv-show-thumbnail.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "bigbangtheory-universo",
        titulo: "Universo The Big Bang Theory",
        categoria: "sitcoms",
        poster: "https://i.pinimg.com/736x/51/99/36/519936a2c4423e4887a441b20aac8cac.jpg",
        etiqueta: "Colección",
        peliculas: [
            { titulo: "The Big Bang Theory", poster: "https://i.pinimg.com/736x/58/b0/76/58b0765cc93de801cd1db5f5d5b4f0d7.jpg" },
            { titulo: "Young Sheldon", poster: "https://i.pinimg.com/736x/ee/87/2a/ee872a7f0270a08514629efe729d19af.jpg" },
            { titulo: "George and Mandy: First Marriage", poster: "https://image.tmdb.org/t/p/original/ituSKm0olDUK6y3wvAw11IhD0Ia.jpg" },
            { titulo: "Stuart Fails To Save The Universe", poster: "https://m.media-amazon.com/images/M/MV5BNmRmODg5ZTctMTMyMS00YmZmLWEyZTMtMjFmOGU1NjYwMGI2XkEyXkFqcGc@.V1.jpg" }
        ]
    },
    {
        id: "the-office",
        titulo: "The Office",
        categoria: "sitcoms",
        poster: "https://w0.peakpx.com/wallpaper/304/531/HD-wallpaper-michel-scott-the-office.jpg",
        esSerie: true,
        peliculas: [
            { titulo: "The Office (US)", poster: "https://i.pinimg.com/736x/64/00/f5/6400f5ea275779e09884661e2a386341.jpg" },
            { titulo: "The Office (UK)", poster: "https://m.media-amazon.com/images/M/MV5BNTk4MjNjODctNDgyZC00NDhkLWE1OGQtMjA3M2FlMDVjMjkzXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "The Paper", poster: "https://m.media-amazon.com/images/M/MV5BZGFmMGIxMmItNGYyMi00MzJkLWE5NTgtM2Y3YjMyMjk3YjJjXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" }
        ]
    },
    {
        id: "estudios",
        titulo: "Estudios",
        categoria: "explorar",
        poster: "https://w0.peakpx.com/wallpaper/947/761/HD-wallpaper-hollywood-studios-vintage-film.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "disney-animation",
        titulo: "Disney Animation",
        categoria: "estudios",
        poster: "https://wallpapercat.com/w/full/1/1/1/868753-1920x2716-iphone-hd-disney-wallpaper.jpg",
        esContenedor: true,
        progresoCategoria: "disney-animation",
        peliculas: []
    },
    {
        id: "pixar",
        titulo: "Pixar",
        categoria: "estudios",
        poster: "https://i.pinimg.com/736x/b8/ff/71/b8ff71f17f6ef4e183e16c08daaa8d16.jpg",
        esContenedor: true,
        progresoCategoria: "pixar",
        peliculas: []
    },
    {
        id: "rapidos-y-furiosos",
        titulo: "Rápidos y Furiosos Saga",
        categoria: "franquicias",
        poster: "https://i.pinimg.com/736x/a8/b0/5f/a8b05f8273dcee523b5e5d3da4139dbd.jpg",
        peliculas: [
            { titulo: "Rápido y Furioso", poster: "https://m.media-amazon.com/images/M/MV5BMzFiZTY2OGUtNzZmMC00MTk2LTgyNzMtZmM5YzMzNjIyYTljXkEyXkFqcGc@._V1_.jpg" },
            { titulo: "2 Rápido 2 Furioso", poster: "https://m.media-amazon.com/images/I/71Wo+cFznbL.jpg" },
            { titulo: "Rápido y Furioso: Reto Tokio", poster: "https://www.originalfilmart.com/cdn/shop/products/Fast_and_the_Furious_Tokyo_Drift_2006_original_film_art_1600x.jpg?v=1562543128" },
            { titulo: "Rápidos y Furiosos", poster: "https://artofthemovies.co.uk/cdn/shop/products/IMG_2884-495541_2f955599-4d3a-4df1-a16d-7eaa10145e11-755857.jpg?v=1691050939&width=900" },
            { titulo: "Rápidos y Furiosos 5", poster: "https://image.tmdb.org/t/p/original/gEfQjjQwY7fh5bI4GlG0RrBu7Pz.jpg" },
            { titulo: "Rápidos y Furiosos 6", poster: "https://es.web.img2.acsta.net/medias/nmedia/18/91/19/03/20533204.jpg" },
            { titulo: "Rápidos y Furiosos 7", poster: "https://www.univision.com/_next/image?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fbtg%2Fcine.batanga.com%2Ffiles%2Ffast-furious-7-nuevo-poster-y-titulo-oficial-2.jpg&w=1280&q=75" },
            { titulo: "Rápidos y Furiosos 8", poster: "https://www.originalfilmart.com/cdn/shop/products/fateofthefurious_2017_teaser_original_film_art_5000x.jpg?v=1594433283" },
            { titulo: "Rápidos y Furiosos: Hobbs & Shaw", poster: "https://es.web.img3.acsta.net/pictures/19/06/17/15/11/1838116.jpg" },
            { titulo: "Rápidos y Furiosos 9", poster: "https://m.media-amazon.com/images/M/MV5BODJkMTQ5ZmQtNzQxYy00ZWNlLWI0ZGYtYjU1NzdiMjcyNDRmXkEyXkFqcGc@._V1_.jpg" },
            { titulo: "Rápidos y Furiosos X", poster: "https://image.tmdb.org/t/p/original/x3zlm6VxPvVrYWE3bHkYUQMR798.jpg" }
        ]
    },
    {
        id: "maze-runner",
        titulo: "Maze Runner Saga",
        categoria: "franquicias",
        poster: "https://i.pinimg.com/736x/2d/11/37/2d11375e6307f12fa7d666ddf245ae4e.jpg",
        peliculas: [
            { titulo: "The Maze Runner", poster: "https://m.media-amazon.com/images/I/71YSw4vEquL._AC_UF894,1000_QL80_.jpg" },
            { titulo: "Maze Runner: Prueba de Fuego", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ALr06ACcPoCaW91CMBk_yJKA1iQ7ZqL3hOolfj5AzZeADj3dhkLAT0M&s=10" },
            { titulo: "Maze Runner: La Cura Mortal", poster: "https://m.media-amazon.com/images/M/MV5BMTYyNzk3MDc2NF5BMl5BanBnXkFtZTgwMDk3OTM1NDM@._V1_.jpg" }
        ]
    },
    {
        id: "los-juegos-del-hambre",
        titulo: "Los Juegos del Hambre Saga",
        categoria: "franquicias",
        poster: "https://i.pinimg.com/736x/d4/f2/ab/d4f2abfc5927a9adf286f394f4b756ca.jpg",
        peliculas: [
            { titulo: "Los Juegos del Hambre", poster: "https://cdng.europosters.eu/pod_public/750/266325.jpg" },
            { titulo: "Los Juegos del Hambre: En Llamas", poster: "https://m.media-amazon.com/images/M/MV5BMTAyMjQ3OTAxMzNeQTJeQWpwZ15BbWU4MDU0NzA1MzAx._V1_.jpg" },
            { titulo: "Los Juegos del Hambre: Sinsajo Parte Uno", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgpNZKzB0XfI-nJGEcY-QAfnX7vnMo1UYj0rkHcs21wF2MyQkelGnaZNQ&s=10" },
            { titulo: "Los Juegos del Hambre: Sinsajo Parte Dos", poster: "https://m.media-amazon.com/images/M/MV5BNjQzNDI2NTU1Ml5BMl5BanBnXkFtZTgwNTAyMDQ5NjE@._V1_.jpg" },
            { titulo: "Los Juegos del Hambre: Balada de Pájaros Cantores y Serpientes", poster: "https://m.media-amazon.com/images/M/MV5BZDk2YjNhYzEtYzg2ZC00OWEwLWJhYzgtMGUzMWVjNDFmYzI5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Los Juegos del Hambre: Amanecer en La Cosecha", poster: "https://m.media-amazon.com/images/M/MV5BNGRkYmM2MjUtZTY4Yi00YTNhLTk1MDEtYTQ3YjFiOTljM2Y1XkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "indiana-jones",
        titulo: "Indiana Jones",
        categoria: "franquicias",
        poster: "https://i.pinimg.com/564x/48/53/c3/4853c31098c1fc686c415080b4b761a3.jpg",
        peliculas: [
            { titulo: "Indiana Jones y Los Cazadores del Arca Perdida", poster: "https://www.vintagemovieposters.co.uk/wp-content/uploads/2020/05/IMG_5479-scaled.jpeg" },
            { titulo: "Indiana Jones y El Templo de la Perdición", poster: "https://image.tmdb.org/t/p/original/gOZSOqw5p04SvLDMFQUJR8hz4PN.jpg" },
            { titulo: "Indiana Jones y La Última Cruzada", poster: "https://www.vintagemovieposters.co.uk/wp-content/uploads/2021/06/IMG_2497-scaled.jpeg" },
            { titulo: "Indiana Jones y El Reino de La Calavera de Cristal", poster: "https://cdn.europosters.eu/image/1300/3284.jpg" },
            { titulo: "Indiana Jones y El Dial del Destino", poster: "https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/07/IMG_2766-scaled.jpeg" }
        ]
    },
    {
        id: "dune",
        titulo: "Dune",
        categoria: "franquicias",
        poster: "https://cdn.europosters.eu/image/1300/302577.jpg",
        peliculas: [
            { titulo: "Dune: Parte Uno", poster: "https://cdn.europosters.eu/image/1300/302577.jpg" },
            { titulo: "Dune: Parte Dos", poster: "https://deadline.com/wp-content/uploads/2023/05/FvIhyI9aUAUZz6l.jpeg?w=819" },
            { titulo: "Dune: Prophecy", poster: "https://image.tmdb.org/t/p/original/pgrv9C8qLjLll58CGosCwBa7VoH.jpg" }
        ]
    },
    {
        id: "mundo-magico",
        titulo: "Mundo Mágico",
        categoria: "franquicias",
        poster: "https://w0.peakpx.com/wallpaper/414/260/HD-wallpaper-wizarding-world-fantastic-beasts-harry-potter-magic.jpg",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "harry-potter",
        titulo: "Harry Potter",
        categoria: "mundo-magico",
        poster: "https://i.pinimg.com/originals/d5/06/c4/d506c42eb2c4ae09648d2e5e704cc4da.jpg",
        peliculas: [
            { titulo: "Harry Potter y La Piedra Filosofal", poster: "https://www.originalfilmart.com/cdn/shop/files/harry_potter_and_the_sorcerers_stone_2001_original_film_art_5000x.webp?v=1684872812" },
            { titulo: "Harry Potter y La Cámara Secreta", poster: "https://www.originalfilmart.com/cdn/shop/products/harry_potter_and_the_chamber_of_secrets_teaser_2002_original_film_art_5de45c44-7cae-43ab-acbe-16f0d3bebaa3_5000x.webp?v=1679945053" },
            { titulo: "Harry Potter y El Prisionero de Azkaban", poster: "https://image.tmdb.org/t/p/original/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg" },
            { titulo: "Harry Potter y El Cáliz de Fuego", poster: "https://image.tmdb.org/t/p/original/66hYnHiYsZDykIeCzHxLlTTmx1k.jpg" },
            { titulo: "Harry Potter y La Orden del Fénix", poster: "https://cdn.europosters.eu/image/1300/229630.jpg" },
            { titulo: "Harry Potter y El Misterio del Príncipe Mestizo", poster: "https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_.jpg" },
            { titulo: "Harry Potter y Las Reliquias de La Muerte: Parte Uno", poster: "https://m.media-amazon.com/images/I/71T7tbAYKrL.jpg" },
            { titulo: "Harry Potter y Las Reliquias de La Muerte: Parte Dos", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYI-dZ6-HWYhl44XeuN5IkKUUi4tFJH1SpUPczU-zIhJ_JmRgBSXGpUs-&s=10" }
        ]
    },
    {
        id: "animales-fantasticos",
        titulo: "Animales Fantásticos",
        categoria: "mundo-magico",
        poster: "https://i.pinimg.com/originals/e1/96/0d/e1960dbfbee3e952e1652929d87a6729.jpg",
        peliculas: [
            { titulo: "Animales Fantásticos y Donde Encontrarlos", poster: "https://m.media-amazon.com/images/M/MV5BMjczYmNkYzctMDhmOC00YjFjLWE1ZjktNDVlMjZjODJhZGI0XkEyXkFqcGc@._V1_.jpg" },
            { titulo: "Animales Fantásticos: Los Crímenes de Grindelwald", poster: "https://m.media-amazon.com/images/M/MV5BZGIyZjk5ODctNDg3MC00YTgyLThmYTAtNjZkNzk4Y2JhMDRhXkEyXkFqcGc@._V1_.jpg" },
            { titulo: "Animales Fantásticos: Los Secretos de Dumbledore", poster: "https://m.media-amazon.com/images/M/MV5BZTk4MTU1MjctMmMwNy00OWQyLTlhMDItNmY4ZmU1OTQzOGVjXkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "mundo-magico-videojuegos",
        titulo: "Videojuegos",
        categoria: "mundo-magico",
        poster: "https://i.pinimg.com/736x/c9/ce/0f/c9ce0f781e563fe27fada659b14390b6.jpg",
        esVideojuego: true,
        peliculas: [
            { titulo: "Hogwarts Legacy", poster: "https://static.posters.cz/image/750/154092.jpg" }
        ]
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
        id: "got-serie",
        titulo: "Game of Thrones",
        esSerie: true,
        categoria: "game-of-thrones",
        poster: "https://static.posters.cz/image/1300/135455.jpg",
        ordenSalida: 1,
        crono: 3,
        peliculas: [
            { titulo: "Game of Thrones Temporada 1", poster: "https://m.media-amazon.com/images/M/MV5BNGYxOGJkMjItZjVkZC00OGEzLWExNjktOTZmNGZhZmRlMTk2XkEyXkFqcGc@._V1_.jpg" },
            { titulo: "Game of Thrones Temporada 2", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKjd169m92GvS9ShtfplLzSW2foG-PcOWr1uzJBahiECoSos18dEYZsdE&s=10" },
            { titulo: "Game of Thrones Temporada 3", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiZ4QgqQ7irwlOnYnTpOylhmSmzyC6_64C1F58h9FKriNMRx0CeGpeoyYN&s=10" },
            { titulo: "Game of Thrones Temporada 4", poster: "https://i.pinimg.com/736x/0a/2d/87/0a2d87033a3784962184981b0f79219a.jpg" },
            { titulo: "Game of Thrones Temporada 5", poster: "https://cdn.europosters.eu/image/750/135458.jpg" },
            { titulo: "Game of Thrones Temporada 6", poster: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/15/48/1448295180-game-of-thrones-season-six.jpg" },
            { titulo: "Game of Thrones Temporada 7", poster: "https://cdn.europosters.eu/image/750/49129.jpg" },
            { titulo: "Game of Thrones Temporada 8", poster: "https://ew.com/thmb/reQaMhcqNS7EJ0ICURbu2oV0RHA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/game-of-thrones-1-2000-fa124cd9a86049919b97184120240c4a.jpg" }
        ]
    },
    {
        id: "house-of-the-dragon",
        titulo: "House of the Dragon",
        esSerie: true,
        categoria: "game-of-thrones",
        poster: "https://i.pinimg.com/736x/4d/b6/39/4db639e88587f29b4b3207d12e90ebfa.jpg",
        ordenSalida: 2,
        crono: 1,
        peliculas: [
            { titulo: "House of the Dragon Temporada 1", poster: "https://static.posters.cz/image/1300/230492.jpg" },
            { titulo: "House of the Dragon Temporada 2", poster: "https://i0.wp.com/img-tomatazos.buscafs.com/437722/437722.jpeg" },
            { titulo: "House of the Dragon Temporada 3", poster: "https://i.pinimg.com/736x/f9/7b/6a/f97b6a91b29bbe9a85f5fa03050eaaab.jpg" }
        ]
    },
    {
        id: "greta-gerwig",
        titulo: "Greta Gerwig",
        categoria: "directores",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKoJppfiD3MU63f68_DRUbxHM61xV0oxKialV_s_l8VZJD-Qt5xZyA_l7&s=10",
        peliculas: [
            { titulo: "Nights and Weekends", poster: "https://m.media-amazon.com/images/M/MV5BMTU5NzM0NjUxOF5BMl5BanBnXkFtZTcwMjUyMTQ5MQ@@.V1.jpg" },
            { titulo: "Lady Bird", poster: "https://image.tmdb.org/t/p/original/gl66K7zRdtNYGrxyS2YDUP5ASZd.jpg" },
            { titulo: "Little Women", poster: "https://m.media-amazon.com/images/I/61TK-+geKPL.AC_UF894,1000_QL80.jpg" },
            { titulo: "Barbie", poster: "https://image.tmdb.org/t/p/original/dekMkQf0kqAmztUca9lX5e5Pjbp.jpg" }
        ]
    },
    {
        id: "chloe-zhao",
        titulo: "Chloé Zhao",
        categoria: "directores",
        poster: "https://static01.nyt.com/images/2026/01/02/magazine/01mag-interview-zhao-image/01mag-interview-zhao-image-mobileMasterAt3x-v2.png",
        peliculas: [
            { titulo: "Songs My Brothers Taught Me", poster: "https://m.media-amazon.com/images/M/MV5BMjZhMTYyOTMtOWNlMi00MDVhLThjM2ItODFjYmI3NGQxNDY2XkEyXkFqcGc@.V1.jpg" },
            { titulo: "The Rider", poster: "https://m.media-amazon.com/images/M/MV5BMjQ3ODM5MjY2N15BMl5BanBnXkFtZTgwOTU5MjM4NDM@.V1.jpg" },
            { titulo: "Nomadland", poster: "https://m.media-amazon.com/images/M/MV5BZWY3YTIwOGItODQ5Mi00NmI4LTgxN2QtZmI2ZjJmZmRkOGY1XkEyXkFqcGc@.V1.jpg" },
            { titulo: "Eternals", poster: "https://image.tmdb.org/t/p/original/vgUZo9aVvRvCQFXwZC9zq3qCZT9.jpg" },
            { titulo: "Hamnet", poster: "https://competitive.ultracine.com/wp-content/uploads/2025/05/UIP-HAMNET.jpg" }
        ]
    },
    {
        id: "celine-song",
        titulo: "Celine Song",
        categoria: "directores",
        poster: "https://m.media-amazon.com/images/M/MV5BNTRiYzNlMDUtYzgwNC00OGM0LWI0NTktYTExN2EyYzVkZWNkXkEyXkFqcGc@.V1.jpg",
        peliculas: [
            { titulo: "Past Lives", poster: "https://i.pinimg.com/736x/2b/41/cb/2b41cb65373e7909972ec366c09afa54.jpg" },
            { titulo: "Materialistas", poster: "https://images.justwatch.com/poster/329711270/s718/materialists.jpg" }
        ]
    },
    {
        id: "tarantino",
        titulo: "Quentin Tarantino",
        categoria: "directores",
        poster: "https://cdna.artstation.com/p/assets/images/images/004/312/852/large/caciano-alison-pulp-fiction-tarantino-by-caciano-alison-da1oe2s.jpg?1482326422",
        peliculas: [
            { titulo: "Reservoir Dogs", poster: "https://i.pinimg.com/736x/df/4c/29/df4c29b0e7d20fae7ec3c7613e8cebd1.jpg" },
            { titulo: "Pulp Fiction", poster: "https://static.posters.cz/image/1300/pulp-fiction-cover-i1288.jpg" },
            { titulo: "Jackie Brown", poster: "https://i.pinimg.com/736x/35/29/64/35296495a0ba33742f49cde8510df37d.jpg" },
            { titulo: "Kill Bill Vol. 1", poster: "https://m.media-amazon.com/images/I/81Az82YYZaS.jpg" },
            { titulo: "Kill Bill Vol. 2", poster: "https://image.tmdb.org/t/p/original/2yhg0mZQMhDyvUQ4rG1IZ4oIA8L.jpg" },
            { titulo: "Death Proof", poster: "https://postercity.com.ar/wp-content/uploads/2017/07/Death-Proof.jpg" },
            { titulo: "Inglorious Basterds", poster: "https://m.media-amazon.com/images/M/MV5BODZhMWJlNjYtNDExNC00MTIzLTllM2ItOGQ2NGVjNDQ3MzkzXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Django Unchained", poster: "https://i.pinimg.com/736x/6e/46/1f/6e461ff4f41269d0a537d3a52c0ce688.jpg" },
            { titulo: "The Hateful Eight", poster: "https://m.media-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@.V1.jpg" },
            { titulo: "Once Upon a Time in Hollywood", poster: "https://www.vintagemovieposters.co.uk/wp-content/uploads/2019/06/IMG_9717.jpeg" }
        ]
    },
    {
        id: "alfred-hitchcock",
        titulo: "Alfred Hitchcock",
        categoria: "directores",
        poster: "https://i.pinimg.com/736x/0e/e3/87/0ee3876f88d5358917445a14ea1d3a49.jpg",
        esContenedor: true,
        etiqueta: "Director",
        progresoCategoria: "alfred-hitchcock",
        peliculas: []
    },
    {
        id: "david-fincher",
        titulo: "David Fincher",
        categoria: "directores",
        poster: "https://image.tmdb.org/t/p/original/jDiPSt9oMcJbNzf8FZRtvU4rR98.jpg",
        esContenedor: true,
        etiqueta: "Director",
        progresoCategoria: "david-fincher",
        peliculas: []
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
            { titulo: "Oppenheimer", poster: "https://image.tmdb.org/t/p/original/lrcuwcNiiZjoB68fzvSOPwu9JWv.jpg" },
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
        id: "sw-bad-batch",
        titulo: "The Bad Batch",
        categoria: "sw-animacion",
        poster: "https://myhotposters.com/cdn/shop/products/mL5264_1024x1024.jpg?v=1748532845",
        esSerie: true,
        crono: 7,
        peliculas: [
            { titulo: "The Bad Batch Temporada 1", poster: "https://lumiere-a.akamaihd.net/v1/images/image_960b1844.jpeg" },
            { titulo: "The Bad Batch Temporada 2", poster: "https://image.tmdb.org/t/p/w500/8ioSHilMhFczEYipgkaXI1KykeV.jpg" },
            { titulo: "The Bad Batch Temporada 3", poster: "https://m.media-amazon.com/images/M/MV5BYmQzN2ViOTYtMWUxMy00YzdlLWEzZjktOWVjY2YzN2RiN2Q5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" }
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
        poster: "https://i.pinimg.com/736x/11/31/1a/11311a67b1434bde66509a6c966a4847.jpg",
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
            { titulo: "Injustice Movie", poster: "https://i.pinimg.com/736x/10/3e/28/103e2858c657d918783491b46aababee.jpg" },
            { titulo: "Catwoman: Hunted", poster: "https://m.media-amazon.com/images/M/MV5BNzQyNTIxZDgtMGI5NS00ZDk2LWJlOTItMmJmYzdhMDIzYzljXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman and Superman: Battle of the Super Sons", poster: "https://m.media-amazon.com/images/M/MV5BNGRiMDYzMDQtMWI3ZC00MWEwLWJkYzYtNjQwNzZjODEzNmZiXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman: The Doom That Came to Gotham", poster: "https://static.dc.com/2023-04/Movies_Thumb_BatmanDoomCame2Gotham.jpg" },
            { titulo: "Crossover Justice League x RWBY Parte 1", poster: "https://m.media-amazon.com/images/M/MV5BNjE1ZWU2OWQtZTEwNS00ZDE2LTllMjgtZjA4YTNlMTQxYTUyXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Crossover Justice League x RWBY Parte 2", poster: "https://m.media-amazon.com/images/M/MV5BMjA5NmExM2QtNTI1MS00ZjM0LTg0ZmItNmIzYjVmZGZmZGEwXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Watchmen", poster: "https://m.media-amazon.com/images/M/MV5BMjc5NGFlMzMtZjkwZS00MzliLTg5NzktZDYzNGNhNjdjNzAzXkEyXkFqcGc@.V1.jpg" }
        ]
    },
    {
        id: "series-independientes",
        titulo: "Series Independientes",
        categoria: "dc-animacion",
        poster: "https://i.pinimg.com/736x/0c/63/37/0c6337f890f06802d7aefbf9c87cb788.jpg",
        peliculas: [
            { titulo: "Teen Titans", poster: "https://image.tmdb.org/t/p/original/gxe4wIp3kYfw4QSkLMt99HfLkok.jpg" },
            // "The Batman" ahora es "The Batman (2004)", ficha explorable con sus 5 temporadas (ver colecciones)
            { titulo: "Legion of Super Heroes", poster: "https://m.media-amazon.com/images/M/MV5BM2UyODExMTctYmQzZS00OTU1LWJiMmUtMjhjOWI4ODk0MDgwXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Batman: The Brave and the Bold", poster: "https://m.media-amazon.com/images/M/MV5BM2FkYTQ2MzUtNWI1NC00MTM0LTgyNzYtMDM3NmE1OWYyNjRjXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Young Justice", poster: "https://i.pinimg.com/736x/34/cf/e5/34cfe579fbd4b66a88f00ee0ab7e4ca6.jpg" },
            { titulo: "Green Lantern: The Animated Series", poster: "https://static.wikia.nocookie.net/marvel_dc/images/3/3e/Green_Lantern_TAS_poster.jpg/revision/latest?cb=20211209132459" },
            { titulo: "Beware the Batman", poster: "https://m.media-amazon.com/images/M/MV5BMzVhYWVkYmEtNDcxMS00ZWVmLWEwNDMtMzUyMTdkN2Y5ZmFhXkEyXkFqcGc@.V1.jpg" },
            { titulo: "Teen Titans Go!", poster: "https://i.pinimg.com/originals/b9/14/e6/b914e6826251973ea7d7a58569f4d0c0.jpg" },
            { titulo: "Justice League Action", poster: "https://m.media-amazon.com/images/M/MV5BNjFkZTQ0ZmItODZjZS00N2Q5LWI0MWUtZTliMzdkNmVkMmM0XkEyXkFqcGc@.V1.jpg" },
            { titulo: "DC Super Hero Girls", poster: "https://m.media-amazon.com/images/M/MV5BMWI4ZmY0OTctYjY0OS00NTVmLThlZTMtYTI0OWY5M2QwNjE5XkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Harley Quinn", poster: "https://static.wikia.nocookie.net/doblaje/images/d/d5/Harley_quinn_serie_animada.jpg/revision/latest?cb=20240831203415&path-prefix=es" },
            { titulo: "My Adventures with Superman", poster: "https://m.media-amazon.com/images/M/MV5BNjU3NmE4MDctMDMzYS00NTc5LTg0MmYtNDg2NDhiOTAxMzhjXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Batman: Caped Crusader", poster: "https://m.media-amazon.com/images/M/MV5BMjI1Y2NmNDgtZDVmMy00MjcwLTgwNmItMTFmMjcxMWRlYzQwXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" },
            { titulo: "Suicide Squad Isekai", poster: "https://m.media-amazon.com/images/M/MV5BM2FkMDljMTctZGRkNS00NTBiLWFlMjQtZDUyMGZhMGE1NDRlXkEyXkFqcGc@.V1.jpg" }
        ]
    },
    {
        id: "the-batman-2004",
        titulo: "The Batman (2004)",
        categoria: "series-independientes",
        poster: "https://image.tmdb.org/t/p/original/3w7koeOR2x71XYMJDGpygxYtScI.jpg",
        esSerie: true,
        peliculas: [
            { titulo: "The Batman (2004) Temporada 1", poster: "https://m.media-amazon.com/images/I/51122Iwfs4L._AC_UF894,1000_QL80_.jpg" },
            { titulo: "The Batman (2004) Temporada 2", poster: "https://img.rgstatic.com/content/show/be5f6315-4ca7-4972-b736-4326c5e2c134/aa774cc9-556e-4dcd-a751-2e6564220690/poster-342.jpg" },
            { titulo: "The Batman (2004) Temporada 3", poster: "https://image.tmdb.org/t/p/original/e1arGUEoveUPQ7p5O8glOq6L9Vw.jpg" },
            { titulo: "The Batman (2004) Temporada 4", poster: "https://m.media-amazon.com/images/I/61TgjrLmJ1L._AC_UF894,1000_QL80_AIweblab1381794,T1_.jpg" },
            { titulo: "The Batman (2004) Temporada 5", poster: "https://image.tmdb.org/t/p/w500/15KR4jWMS1xhPKMkoDGWttAYL6y.jpg" }
        ]
    },
    {
        id: "injustice",
        titulo: "Injustice",
        categoria: "dc-videojuegos",
        poster: "https://i.pinimg.com/564x/95/9b/f5/959bf5176a963ae78455679cf0103473.jpg",
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
        id: "batman-telltale",
        titulo: "Batman: The Telltale Series",
        categoria: "dc-videojuegos",
        poster: "https://i.pinimg.com/736x/4e/1a/3c/4e1a3c35938fff68e0db0064d92ee14d.jpg",
        esVideojuego: true,
        peliculas: [
            { titulo: "Batman: The Telltale Series (Temporada 1)", poster: "https://m.media-amazon.com/images/M/MV5BZjcxMzA1YzAtYzA0Yi00ZjNlLThhZGQtMDgyOTQxYjkyY2IwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Batman: The Enemy Within (Temporada 2)", poster: "https://m.media-amazon.com/images/M/MV5BNGYwYTZkNGQtNDI0ZC00ZGQzLWE4N2UtNTEzNTdjMWM3YmQ5XkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "marvel-disneyxd",
        titulo: "Universo Marvel de Disney XD (Tierra-12041)",
        esSerie: true,
        tierra: 12041,
        categoria: "marvel-animacion",
        poster: "https://image.tmdb.org/t/p/original/eXtlDP6kgUyYw0G2L9AxSWUp14Q.jpg",
        peliculas: [
            { titulo: "Hulk y Los Agentes de S.M.A.S.H.", poster: "https://m.media-amazon.com/images/M/MV5BMTg1MzIxMzM4Nl5BMl5BanBnXkFtZTcwMTg3Mzc5OQ@@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Guardianes de La Galaxia", poster: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p12037541_b_v8_ay.jpg" },
            { titulo: "Iron Man y Hulk: Héroes Unidos", poster: "https://m.media-amazon.com/images/M/MV5BNmQ4NDY1YWEtNTdmZi00ZmQ5LTk3MzYtYzBkNzhmNTM2Yzk5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Iron Man y Capitán América: Héroes Unidos", poster: "https://m.media-amazon.com/images/M/MV5BZjkxMTM1YmYtZDRkNC00YWNlLWFiYjAtZGIyMmQyYjI0ZjFjXkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "marvel-90s",
        titulo: "Marvel 90's (Tierra-92131)",
        esSerie: true,
        tierra: 92131,
        categoria: "marvel-animacion",
        poster: "https://w0.peakpx.com/wallpaper/273/38/HD-wallpaper-x-men-beast-bishop-cyclops-gambit-marvel-psylocke-rogue-storm-wolverine-x-men.jpg",
        peliculas: [
            { titulo: "Spider-Man: The Animated Series", poster: "https://m.media-amazon.com/images/M/MV5BYWRkN2M1NmQtZjhjMi00ODFjLTk2ODctYWJiOWNkNjg1OGY4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Iron Man (1994)", poster: "https://m.media-amazon.com/images/M/MV5BY2Q1M2YyYzctNGZlZi00OTM3LTkxNTEtMGU0MTU1OWJiNjg5XkEyXkFqcGc@._V1_.jpg" },
            { titulo: "Fantastic Four (1994)", poster: "https://m.media-amazon.com/images/M/MV5BNzM1MTM1MTMtMmQ2Zi00ZTM1LTk1MzctNTY1NGNiNzZiNmUyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "The Incredible Hulk (1996)", poster: "https://image.tmdb.org/t/p/original/eXyZvkbrTdcM6CtAmQU7SqDRZdr.jpg" }
        ]
    },
    {
        id: "x-men-92",
        titulo: "X-Men '92",
        esSerie: true,
        tierra: 92131,
        categoria: "marvel-animacion",
        poster: "https://image.tmdb.org/t/p/original/2OFwsFhAobczgJWnVdwd9oZAF2N.jpg",
        peliculas: [
            { titulo: "X-Men '92 Temporada 1", poster: "https://image.tmdb.org/t/p/original/2OFwsFhAobczgJWnVdwd9oZAF2N.jpg" },
            { titulo: "X-Men '92 Temporada 2", poster: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p7892108_b_v8_ab.jpg" },
            { titulo: "X-Men '92 Temporada 3", poster: "https://i.pinimg.com/736x/97/e5/fb/97e5fb5e1f56010177351e0ca888da2b.jpg" },
            { titulo: "X-Men '92 Temporada 4", poster: "https://i.pinimg.com/736x/f8/60/b1/f860b1dc29274f23a1b9748bcf3d2f1d.jpg" },
            { titulo: "X-Men '92 Temporada 5", poster: "https://m.media-amazon.com/images/M/MV5BYWYwZDVkNWItYzdmMy00NjU4LWIxNDMtZDIwMTc1MTEzNzE4XkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "x-men-97",
        titulo: "X-Men '97",
        esSerie: true,
        tierra: 92131,
        categoria: "marvel-animacion",
        poster: "https://m.media-amazon.com/images/M/MV5BZDE0Zjk5OGYtZTk3OC00ZDZhLWE2NGQtNzc3NmJhNjljYzY5XkEyXkFqcGc@._V1_.jpg",
        peliculas: [
            { titulo: "X-Men '97 Temporada 1", poster: "https://image.tmdb.org/t/p/original/383PV0WolYYQvTriH0NfvMUA28R.jpg" },
            { titulo: "X-Men '97 Temporada 2", poster: "https://cdn.marvel.com/content/2x/xmen97_s2_final_mech2.webp" }
        ]
    },
    {
        id: "ultimate-spider-man",
        titulo: "Ultimate Spider-Man",
        esSerie: true,
        tierra: 12041,
        categoria: "marvel-animacion",
        poster: "https://image.tmdb.org/t/p/original/eXtlDP6kgUyYw0G2L9AxSWUp14Q.jpg",
        peliculas: [
            { titulo: "Ultimate Spider-Man Temporada 1", poster: "https://static.wikia.nocookie.net/spiderman/images/a/ad/Usmpromo.jpg/revision/latest?cb=20130127003133" },
            { titulo: "Ultimate Spider-Man Temporada 2", poster: "https://m.media-amazon.com/images/M/MV5BMjFmOGZkYWQtMGQ4MC00NzRiLWI4ZTMtNDEwZDZiMDMyMzNmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Ultimate Spider-Man Temporada 3", poster: "https://static.wikia.nocookie.net/thedailybugle/images/b/b9/The_Spider-Verse_%28DVD%29.png/revision/latest?cb=20170914081853" },
            { titulo: "Ultimate Spider-Man Temporada 4", poster: "https://static.wikia.nocookie.net/marveldatabase/images/b/b2/Ultimate_Spider-Man_%28animated_series%29_Season_4_poster.jpg/revision/latest?cb=20150722203259" }
        ]
    },
    {
        id: "avengers-assemble",
        titulo: "Avengers Assemble",
        esSerie: true,
        tierra: 12041,
        categoria: "marvel-animacion",
        poster: "https://i.pinimg.com/736x/23/cc/1e/23cc1e9834742a247bfd317b5758fb7c.jpg",
        peliculas: [
            { titulo: "Avengers Assemble Temporada 1", poster: "https://static.wikia.nocookie.net/marvelanimateduniversedisney/images/5/5e/Avengers_Assemble_Season_1_Poster.jpg/revision/latest?cb=20201015075047" },
            { titulo: "Avengers Assemble Temporada 2", poster: "https://images.justwatch.com/poster/189024463/s718/season-2.jpg" },
            { titulo: "Avengers Assemble Temporada 3", poster: "https://i.pinimg.com/564x/aa/4a/fd/aa4afd9065bef2125fa6c0edb820b8ad.jpg" },
            { titulo: "Avengers Assemble Temporada 4", poster: "https://i.pinimg.com/736x/a0/ee/64/a0ee649ca735e45594927cbe5b135d0e.jpg" }
        ]
    },
    {
        id: "yost-verse",
        titulo: "Yost-Verse (Tierra-8096)",
        esSerie: true,
        tierra: 8096,
        categoria: "marvel-animacion",
        poster: "https://image.tmdb.org/t/p/original/nH1ROb4ujGRuDItJyn5UrYY5uOB.jpg",
        peliculas: [
            { titulo: "Avengers: Los Héroes Más Poderosos de la Tierra", poster: "https://image.tmdb.org/t/p/original/nH1ROb4ujGRuDItJyn5UrYY5uOB.jpg" },
            { titulo: "Wolverine and The X-Men", poster: "https://m.media-amazon.com/images/M/MV5BNzk4Nzg3NjMyMV5BMl5BanBnXkFtZTcwMjk3MjU0Mg@@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Thor: Historias de Asgard", poster: "https://m.media-amazon.com/images/M/MV5BMTcxOTU4NzIxMV5BMl5BanBnXkFtZTcwNzE3NjAxNQ@@._V1_FMjpg_UX1000_.jpg" }
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
        esSerie: true,
        categoria: "ben10",
        poster: "https://m.media-amazon.com/images/M/MV5BYWVjODZjNDgtYjk4ZS00OTg5LTg5NDQtZDMxZDQ4ZmM5MGJmXkEyXkFqcGc@.V1.jpg",
        peliculas: [
            { titulo: "Ben 10 Temporada 1", poster: "https://image.tmdb.org/t/p/original/3MhIDyWIE06LbVi79rbrNu4OpJb.jpg" },
            { titulo: "Ben 10 Temporada 2", poster: "https://static.wikia.nocookie.net/ben10/images/8/8e/Ben_10_The_Complete_Season_2_DVD_Cover.png/revision/latest?cb=20230422091907" },
            { titulo: "Ben 10 Temporada 3", poster: "https://i.ebayimg.com/images/g/1oQAAOSwduhghuP4/s-l1200.jpg" },
            { titulo: "Ben 10 Temporada 4", poster: "https://static.wikia.nocookie.net/ben10/images/d/de/Ben_10_-_Season_4.png/revision/latest?cb=20190823080148" }
        ]
    },
    {
        id: "ben10-alienforce",
        titulo: "Ben 10: Alien Force",
        esSerie: true,
        categoria: "ben10",
        poster: "https://m.media-amazon.com/images/M/MV5BOGQ5YWFjYjItODE5OC00ZDQxLTk5ZmYtNzY0YzM4NjIyMWFlXkEyXkFqcGc@.V1.jpg",
        peliculas: [
            { titulo: "Ben 10: Alien Force Temporada 1", poster: "https://i.pinimg.com/736x/d9/a9/a5/d9a9a50b5739f5ebf4a4272e89c42ba1.jpg" },
            { titulo: "Ben 10: Alien Force Temporada 2", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzer-Sfcj-H3NRrr2ld9rGQfXetT3cgSUjNVWePJh_Ng&s=10" },
            { titulo: "Ben 10: Alien Force Temporada 3", poster: "https://image.tmdb.org/t/p/original/2d5w9VSW9r4LPes6rZGUYmWpG0r.jpg" }
        ]
    },
    {
        id: "ben10-ultimatealien",
        titulo: "Ben 10: Ultimate Alien",
        esSerie: true,
        categoria: "ben10",
        poster: "https://m.media-amazon.com/images/M/MV5BNWIxMjZmNTQtNzkxZi00NTU5LThhOGYtODEyZGYyNDdkNTQxXkEyXkFqcGc@.V1.jpg",
        peliculas: [
            { titulo: "Ben 10: Ultimate Alien Temporada 1", poster: "https://theworldofnerds.com/cdn/shop/files/61.png?v=1771398134&width=1946" },
            { titulo: "Ben 10: Ultimate Alien Temporada 2", poster: "https://image.tmdb.org/t/p/original/bHaQCAxuOSZhagTVceucxKaXeaT.jpg" },
            { titulo: "Ben 10: Ultimate Alien Temporada 3", poster: "https://m.media-amazon.com/images/I/71WpGvJj4hL.AC_UF894,1000_QL80.jpg" }
        ]
    },
    {
        id: "ben10-omniverse",
        titulo: "Ben 10 Omniverse",
        esSerie: true,
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
        id: "anime",
        titulo: "Anime",
        categoria: "explorar",
        poster: "https://placehold.co/300x450?text=Anime",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "dc-comics-hub",
        titulo: "DC Comics",
        categoria: "comics",
        poster: "https://placehold.co/300x450?text=DC+Comics",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "dc-camino-heroe",
        titulo: "El Camino del Héroe",
        categoria: "dc-comics-hub",
        poster: "https://placehold.co/300x450?text=El+Camino+del+Heroe",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "dc-orden-lectura",
        titulo: "Orden de Lectura",
        categoria: "dc-comics-hub",
        poster: "https://i.pinimg.com/736x/49/6e/b0/496eb0c67d1a0868e99633f9bcb7570d.jpg",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "nuevos-52-orden-lectura",
        titulo: "The New 52",
        categoria: "dc-orden-lectura",
        poster: "https://m.media-amazon.com/images/I/91Yw6yaFa7L._AC_UF894,1000_QL80_.jpg",
        esContenedor: true,
        etiqueta: "Cómic",
        progresoCategoria: "nuevos-52-orden-lectura",
        peliculas: []
    },
    {
        id: "dc-argentina",
        titulo: "DC Argentina",
        categoria: "dc-orden-lectura",
        poster: "https://acdn-us.mitiendanube.com/stores/001/184/069/products/poster_superman_elmundo-fbd83602489f14740517504389219679-1024-1024.webp",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "post-crisis-dc",
        titulo: "Post-Crisis / Edad Moderna",
        categoria: "dc-argentina",
        poster: "https://w0.peakpx.com/wallpaper/121/414/HD-wallpaper-dc-comics-super-heroes.jpg",
        esContenedor: true,
        etiqueta: "Cómic",
        progresoCategoria: "post-crisis-dc",
        peliculas: []
    },
    {
        id: "los-nuevos-52-dc-argentina",
        titulo: "Los Nuevos 52",
        categoria: "dc-argentina",
        poster: "https://w0.peakpx.com/wallpaper/856/559/HD-wallpaper-superman-new-52-comics-dc-hero-justice-league-man-of-steel-new-52-superman-thumbnail.jpg",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "renacimiento-dc",
        titulo: "Renacimiento",
        categoria: "dc-argentina",
        poster: "https://wallpaper.forfun.com/fetch/25/25d31e312860ed238f9fa563d89e0425.jpeg",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "infinite-frontier-dc",
        titulo: "Infinite Frontier / Actualidad",
        categoria: "dc-argentina",
        poster: "https://placehold.co/300x450?text=Infinite+Frontier",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "absolute-dc",
        titulo: "Absolute",
        categoria: "dc-argentina",
        poster: "https://static.dc.com/2024-08/ABS_BM_CV1_JIM-LEE-VARIANT.jpg",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "elseworlds-otros-dc",
        titulo: "Crossovers y Elseworlds",
        categoria: "dc-argentina",
        poster: "https://wallpapercave.com/wp/wp4036102.jpg",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "dc-argentina-camino-heroe",
        titulo: "Camino del Héroe",
        categoria: "dc-argentina",
        poster: "https://w0.peakpx.com/wallpaper/73/40/HD-wallpaper-superman-dc-hero-jim-lee.jpg",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "dc-argentina-camino-villano",
        titulo: "Camino del Villano",
        categoria: "dc-argentina",
        poster: "https://w0.peakpx.com/wallpaper/77/233/HD-wallpaper-legion-of-doom-batman-dc-dc-comics-grodd-joker-lex-luthor-sinestro-villains.jpg",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "camino-villano-principal",
        titulo: "Continuidad Principal",
        categoria: "dc-argentina-camino-villano",
        poster: "https://placehold.co/300x450?text=Continuidad+Principal",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "camino-villano-elseworlds",
        titulo: "Elseworlds",
        categoria: "dc-argentina-camino-villano",
        poster: "https://placehold.co/300x450?text=Elseworlds",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "camino-heroe-principal",
        titulo: "Continuidad Principal",
        categoria: "dc-argentina-camino-heroe",
        poster: "https://placehold.co/300x450?text=Continuidad+Principal",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "camino-heroe-elseworlds",
        titulo: "Elseworlds",
        categoria: "dc-argentina-camino-heroe",
        poster: "https://placehold.co/300x450?text=Elseworlds",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "green-lantern-hal-jordan",
        titulo: "Green Lantern - Hal Jordan",
        categoria: "dc-camino-heroe",
        poster: "https://static.wikia.nocookie.net/batman/images/8/88/Linterna-verde.jpg/revision/latest?cb=20170921191634&path-prefix=es",
        esContenedor: true,
        etiqueta: "Cómic",
        progresoCategoria: "green-lantern-hal-jordan",
        peliculas: []
    },
    {
        id: "marvel-comics-hub",
        titulo: "Marvel",
        categoria: "comics",
        poster: "https://placehold.co/300x450?text=Marvel+Comics",
        esContenedor: true,
        peliculas: []
    },
    {
        id: "marvel-camino-heroe",
        titulo: "El Camino del Héroe",
        categoria: "marvel-comics-hub",
        poster: "https://placehold.co/300x450?text=El+Camino+del+Heroe",
        esContenedor: true,
        etiqueta: "Cómic",
        peliculas: []
    },
    {
        id: "death-note",
        titulo: "Death Note",
        categoria: "anime",
        poster: "https://static.posters.cz/image/350/posters/death-note-group-i293517.jpg",
        peliculas: [
            { titulo: "Death Note", etiqueta: "Anime", poster: "https://cdn.europosters.eu/image/750/28405.jpg" },
            { titulo: "Death Note\u200B", etiqueta: "Película", poster: "https://m.media-amazon.com/images/M/MV5BMTUwOTgzMTEyOF5BMl5BanBnXkFtZTgwNTk3MTM5MjI@._V1_.jpg" }
        ]
    },
    {
        id: "dragonball",
        titulo: "Dragon Ball",
        categoria: "anime",
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
        peliculas: [
            { titulo: "Dragon Ball Xenoverse", poster: "https://m.media-amazon.com/images/M/MV5BYzMwZWUwODEtMTU3Zi00MDYwLTg1MjUtNGVlMDVlZDBkNGZmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Dragon Ball Xenoverse 2", poster: "https://myhotposters.com/cdn/shop/products/mL2170_361002e7-d15c-4843-9c0d-f63f9c575649_1024x1024.jpg?v=1748535523" },
            { titulo: "Dragon Ball FighterZ", poster: "https://m.media-amazon.com/images/M/MV5BY2E1YmJjMzktZTkwNC00ODY1LWIyNzMtMWVmZWRhOWY4MjE0XkEyXkFqcGc@._V1_.jpg" },
            { titulo: "Dragon Ball Kakarot", poster: "https://m.media-amazon.com/images/M/MV5BODNkY2M4M2MtODY0ZS00MzJiLWEzOTktMjEzZmMwM2ZmN2ZmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Dragon Ball: The Breakers", poster: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1919/mBaTykC1xLU8XfSKelYnOOnc.png" },
            { titulo: "Dragon Ball Sparkling Zero", poster: "https://m.media-amazon.com/images/M/MV5BMzQ4ZGY4MGYtZTA0NC00MWFiLTkwNjgtNmQ2ZDFlMzgzOTJmXkEyXkFqcGc@._V1_.jpg" }
        ]
    },
    {
        id: "dragonball-gt",
        titulo: "Dragon Ball GT",
        categoria: "dragonball",
        poster: "https://w0.peakpx.com/wallpaper/957/291/HD-wallpaper-dragon-ball-gt-anime-goku-trunks.jpg",
        peliculas: [
            { titulo: "Saga del Gran Viaje", poster: "https://pics.filmaffinity.com/dragon_ball_gt-891071273-large.jpg" },
            { titulo: "Saga de Baby", poster: "https://i.pinimg.com/736x/74/bb/97/74bb9786b2eef3f4a1a730655d6e7475.jpg" },
            { titulo: "Saga de Super A-17", poster: "https://i.pinimg.com/736x/51/3f/27/513f277d4ceeff41610c07ac62cfa348.jpg" },
            { titulo: "Saga de los Dragones Oscuros", poster: "https://images.justwatch.com/poster/1444330/s718/temporada-4.jpg" },
            { titulo: "100 Años Después", poster: "https://m.media-amazon.com/images/M/MV5BZWYyZmZmYzQtMzVmYS00MWI5LWJiMzctNGEzMTM3N2ZjYTJlXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" }
        ]
    },
    {
        id: "dragonball-z-peliculas",
        titulo: "Dragon Ball Z: Películas",
        categoria: "dragonball",
        poster: "https://w0.peakpx.com/wallpaper/840/124/HD-wallpaper-dragon-ball-movies-broly-goku.jpg",
        peliculas: [
            { titulo: "¡Devuélveme a mi Gohan!", poster: "https://image.tmdb.org/t/p/w500/86ECobJsXdqcBzAKWS56EbawbOK.jpg" },
            { titulo: "El Hombre Más Fuerte de Este Mundo", poster: "https://i.pinimg.com/564x/d2/0e/6c/d20e6cb1317bcb88f514c34a19a83627.jpg" },
            { titulo: "La Súper Batalla Decisiva por La Tierra", poster: "https://image.tmdb.org/t/p/original/uGadvCa5w8X6zAWzdZlVQYNd6QR.jpg" },
            { titulo: "El Súper Guerrero Son Goku", poster: "https://m.media-amazon.com/images/M/MV5BODE2NDUzMjk3M15BMl5BanBnXkFtZTYwOTA3MDc5._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Los Rivales Más Poderosos", poster: "https://static.wikia.nocookie.net/dragonball/images/7/7a/DBZ_Pel%C3%ADcula_5_p%C3%B3ster.png/revision/latest?cb=20180805032322&path-prefix=es" },
            { titulo: "El Regreso de Cooler", poster: "https://play-lh.googleusercontent.com/0BXSfNu39g6fzcQe5Sg67KbEvxWLu1WI7qnKLmzGbwLAgk-FWxu-9_AXHbjNH5d1DITM0ca_aIIs6GA1Cw" },
            { titulo: "¡¡Batalla Extrema!! Los Tres Grandes Súper Saiyajines", poster: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/5b86e15beaedd745eeff303cb6ef8d20.png" },
            { titulo: "El Poder Invencible", poster: "https://image.tmdb.org/t/p/original/QWjeZq3sMcDPQpgWDwoJrkqgTu.jpg" },
            { titulo: "La Galaxia Corre Peligro", poster: "https://m.media-amazon.com/images/M/MV5BMTUwODQ3MjQwN15BMl5BanBnXkFtZTcwMDgyOTUyMQ@@._V1_.jpg" },
            { titulo: "El Regreso del Guerrero Legendario", poster: "https://image.tmdb.org/t/p/original/x83JFWT3zeqI1j2ubPp1xfPhJq4.jpg" },
            { titulo: "El Combate Definitivo", poster: "https://static.wikia.nocookie.net/dragonball/images/a/ad/DBZ_Pel%C3%ADcula_11_p%C3%B3ster.png/revision/latest?cb=20180805032326&path-prefix=es" },
            { titulo: "¡El Renacer de la Fusión! Goku y Vegeta", poster: "https://i.pinimg.com/736x/fc/cc/10/fccc109144bc20921f2d01a3c8451e84.jpg" },
            { titulo: "El Ataque del Dragón", poster: "https://m.media-amazon.com/images/M/MV5BMTk4MDIxNzk1N15BMl5BanBnXkFtZTcwNDk0MDQzMQ@@._V1_.jpg" }
        ]
    },
    {
        id: "dragonball-todo",
        titulo: "Todo Dragon Ball",
        categoria: "dragonball",
        poster: "https://i.pinimg.com/originals/6f/4d/73/6f4d73d1afc0702a6e9d31f36d1628bc.jpg?nii=t",
        peliculas: [
            { titulo: "Saga Saiyan", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSr-aKYyKPVySvy3CpUF--Z9UM-IVdRuDam6yMP8zxu6MUkNLSgMkLG0&s=10" },
            { titulo: "¡Devuélveme a mi Gohan!", poster: "https://image.tmdb.org/t/p/w500/86ECobJsXdqcBzAKWS56EbawbOK.jpg" },
            { titulo: "El Hombre Más Fuerte de Este Mundo", poster: "https://i.pinimg.com/564x/d2/0e/6c/d20e6cb1317bcb88f514c34a19a83627.jpg" },
            { titulo: "Saga de Freezer", poster: "https://static.wikia.nocookie.net/dragonball/images/2/2e/Arco_de_Freezer_Artwork_DBZ.png/revision/latest?cb=20180612015408&path-prefix=es" },
            { titulo: "La Súper Batalla Decisiva por La Tierra", poster: "https://image.tmdb.org/t/p/original/uGadvCa5w8X6zAWzdZlVQYNd6QR.jpg" },
            { titulo: "El Súper Guerrero Son Goku", poster: "https://m.media-amazon.com/images/M/MV5BODE2NDUzMjk3M15BMl5BanBnXkFtZTYwOTA3MDc5._V1_FMjpg_UX1000_.jpg" },
            { titulo: "Los Rivales Más Poderosos", poster: "https://static.wikia.nocookie.net/dragonball/images/7/7a/DBZ_Pel%C3%ADcula_5_p%C3%B3ster.png/revision/latest?cb=20180805032322&path-prefix=es" },
            { titulo: "Saga de Cell", poster: "https://www.wallister.de/cdn/shop/products/G868340_01.jpg?v=1677662334" },
            { titulo: "El Regreso de Cooler", poster: "https://play-lh.googleusercontent.com/0BXSfNu39g6fzcQe5Sg67KbEvxWLu1WI7qnKLmzGbwLAgk-FWxu-9_AXHbjNH5d1DITM0ca_aIIs6GA1Cw" },
            { titulo: "¡¡Batalla Extrema!! Los Tres Grandes Súper Saiyajines", poster: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/5b86e15beaedd745eeff303cb6ef8d20.png" },
            { titulo: "Saga de Majin Buu", poster: "https://i.pinimg.com/736x/8a/a2/e4/8aa2e46c01ae0c287901c25449979902.jpg" },
            { titulo: "El Poder Invencible", poster: "https://image.tmdb.org/t/p/original/QWjeZq3sMcDPQpgWDwoJrkqgTu.jpg" },
            { titulo: "La Galaxia Corre Peligro", poster: "https://m.media-amazon.com/images/M/MV5BMTUwODQ3MjQwN15BMl5BanBnXkFtZTcwMDgyOTUyMQ@@._V1_.jpg" },
            { titulo: "El Regreso del Guerrero Legendario", poster: "https://image.tmdb.org/t/p/original/x83JFWT3zeqI1j2ubPp1xfPhJq4.jpg" },
            { titulo: "El Combate Definitivo", poster: "https://static.wikia.nocookie.net/dragonball/images/a/ad/DBZ_Pel%C3%ADcula_11_p%C3%B3ster.png/revision/latest?cb=20180805032326&path-prefix=es" },
            { titulo: "¡El Renacer de la Fusión! Goku y Vegeta", poster: "https://i.pinimg.com/736x/fc/cc/10/fccc109144bc20921f2d01a3c8451e84.jpg" },
            { titulo: "El Ataque del Dragón", poster: "https://m.media-amazon.com/images/M/MV5BMTk4MDIxNzk1N15BMl5BanBnXkFtZTcwNDk0MDQzMQ@@._V1_.jpg" },
            { titulo: "Saga de Bills", poster: "https://image.tmdb.org/t/p/original/oV8aSngwg5YPpcaNvlC8VOMCYtK.jpg" },
            { titulo: "La Batalla de los Dioses", poster: "https://www.cinepremiere.com.mx/assets/images/noticias/2013/07-julio/DragonBallZ-batalla-poster.jpg" },
            { titulo: "Saga de la Resurrección de Freezer", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdp8uz95HVMymEVGeUIdyp0bl5juJj8QU0yCSGQqRLt9MVgZputG5v5dI&s=10" },
            { titulo: "La Resurrección de F", poster: "https://www.cinepremiere.com.mx/assets/images/noticias/2013/07-julio/DragonBallZ-batalla-poster.jpg" },
            { titulo: "Saga del Torneo del Universo 6", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9SdBgNJvPZZuQwqniUbOgAOyETZ30L8dDP1VwpIIyOw&s=10" },
            { titulo: "Saga de Black", poster: "https://i.pinimg.com/736x/a0/b0/73/a0b0732ee82a57b35ca1b379810196b4.jpg" },
            { titulo: "Saga del Torneo de Poder", poster: "https://i.pinimg.com/736x/c7/92/95/c79295cb907936831832bf5ec1ae17d5.jpg" },
            { titulo: "Dragon Ball Super: Broly", poster: "https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/media/imagenes/recursos/dragon-ball-super-broly-poster/138134866-1-esl-ES/Dragon-ball-super-Broly-poster.jpg" },
            { titulo: "Dragon Ball Super: Hero", poster: "https://m.media-amazon.com/images/I/61Oo8yO7qKL._AC_UF894,1000_QL80_.jpg" },
            { titulo: "Saga del Gran Viaje", poster: "https://pics.filmaffinity.com/dragon_ball_gt-891071273-large.jpg" },
            { titulo: "Saga de Baby", poster: "https://i.pinimg.com/736x/74/bb/97/74bb9786b2eef3f4a1a730655d6e7475.jpg" },
            { titulo: "Saga de Super A-17", poster: "https://i.pinimg.com/736x/51/3f/27/513f277d4ceeff41610c07ac62cfa348.jpg" },
            { titulo: "Saga de los Dragones Oscuros", poster: "https://images.justwatch.com/poster/1444330/s718/temporada-4.jpg" },
            { titulo: "100 Años Después", poster: "https://m.media-amazon.com/images/M/MV5BZWYyZmZmYzQtMzVmYS00MWI5LWJiMzctNGEzMTM3N2ZjYTJlXkEyXkFqcGc@.V1_FMjpg_UX1000.jpg" }
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
        poster: "https://w0.peakpx.com/wallpaper/185/537/HD-wallpaper-lego-brand-logo.jpg",
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
        poster: "https://w0.peakpx.com/wallpaper/185/537/HD-wallpaper-lego-brand-logo.jpg",
        peliculas: []
    }
];

// ==========================================
// LOGROS (condiciones evaluadas contra un Set de títulos vistos)
// ==========================================
// Helper: ¿están todos estos títulos en el set de vistos?
function todosVistos(vistos, titulos) {
    return titulos.every(t => vistos.has(t));
}

// Helper: ¿están todos los títulos de una categoría de listaMedia vistos?
function categoriaCompleta(vistos, categoria) {
    const titulos = listaMedia.filter(i => i.categoria === categoria).map(i => i.titulo);
    return titulos.length > 0 && todosVistos(vistos, titulos);
}

// Helper: ¿está una colección entera (por id) vista?
function coleccionCompleta(vistos, coleccionId) {
    const col = colecciones.find(c => c.id === coleccionId);
    if (!col || !col.peliculas.length) return false;
    return todosVistos(vistos, col.peliculas.map(p => p.titulo));
}

// Helper: % de una colección visto (0-100)
function porcentajeColeccionVisto(vistos, coleccionId) {
    const col = colecciones.find(c => c.id === coleccionId);
    if (!col || !col.peliculas.length) return 0;
    const vistas = col.peliculas.filter(p => vistos.has(p.titulo)).length;
    return (vistas / col.peliculas.length) * 100;
}

// Helper: cantidad de títulos vistos dentro de una colección
function cantidadVistaEnColeccion(vistos, coleccionId) {
    const col = colecciones.find(c => c.id === coleccionId);
    if (!col) return 0;
    return col.peliculas.filter(p => vistos.has(p.titulo)).length;
}

// Helper: cantidad de títulos vistos (en toda la app) cuyo nombre contiene una palabra
function cantidadTitulosConPalabra(vistos, palabra) {
    const palabraLower = palabra.toLowerCase();
    const titulosContados = new Set();
    const revisar = (titulo) => {
        if (titulo.toLowerCase().includes(palabraLower) && vistos.has(titulo)) {
            titulosContados.add(titulo);
        }
    };
    listaMedia.forEach(item => revisar(item.titulo));
    colecciones.forEach(col => {
        revisar(col.titulo);
        col.peliculas.forEach(p => revisar(p.titulo));
    });
    return titulosContados.size;
}

// Helper: % visto de una categoría directa de listaMedia (ej: "disney-animation", "assassins-creed")
function porcentajeCategoriaVisto(vistos, categoria) {
    const titulos = listaMedia.filter(i => i.categoria === categoria).map(i => i.titulo);
    if (titulos.length === 0) return 0;
    const vistas = titulos.filter(t => vistos.has(t)).length;
    return (vistas / titulos.length) * 100;
}

// Helper: % visto combinando varias colecciones (ej: las 4 series de Ben 10)
function porcentajeColeccionesVisto(vistos, coleccionIds) {
    let total = 0, vistas = 0;
    coleccionIds.forEach(id => {
        const col = colecciones.find(c => c.id === id);
        if (col) {
            total += col.peliculas.length;
            vistas += col.peliculas.filter(p => vistos.has(p.titulo)).length;
        }
    });
    return total > 0 ? (vistas / total) * 100 : 0;
}

// Helper: ¿está completo un subconjunto de listaMedia por categoría + subtipo? (ej: solo los de Andy Muschietti en "it")
function categoriaSubtipoCompleta(vistos, categoria, subtipo) {
    const titulos = listaMedia.filter(i => i.categoria === categoria && i.subtipo === subtipo).map(i => i.titulo);
    return titulos.length > 0 && todosVistos(vistos, titulos);
}

// Helper: ¿están completas TODAS las colecciones indicadas? (ej: Harry Potter + Animales Fantásticos)
function coleccionesCompletas(vistos, coleccionIds) {
    return coleccionIds.every(id => coleccionCompleta(vistos, id));
}

const logrosDisponibles = [
    {
        id: "poder-del-sol",
        nombre: "El Poder del Sol en la Palma de mi Mano",
        descripcion: "Mirá la trilogía completa de Spider-Man de Tobey Maguire",
        icono: "🕷️",
        condicion: (vistos) => todosVistos(vistos, ["Spider-Man (2002)", "Spider-Man 2", "Spider-Man 3"])
    },
    {
        id: "hello-there",
        nombre: "Hello There",
        descripcion: "Mirá los Episodios I, II y III de Star Wars",
        icono: "⚔️",
        condicion: (vistos) => todosVistos(vistos, [
            "Star Wars: Episodio I - La Amenaza Fantasma",
            "Star Wars: Episodio II - El Ataque de los Clones",
            "Star Wars: Episodio III - La Venganza de los Sith"
        ])
    },
    {
        id: "may-the-force",
        nombre: "May The Force Be With You",
        descripcion: "Mirá los Episodios IV, V y VI de Star Wars",
        icono: "✨",
        condicion: (vistos) => todosVistos(vistos, [
            "Star Wars: Episodio IV - Una Nueva Esperanza",
            "Star Wars: Episodio V - El Imperio Contraataca",
            "Star Wars: Episodio VI - El Retorno del Jedi"
        ])
    },
    {
        id: "el-elegido",
        nombre: "El Elegido",
        descripcion: "Mirá los Episodios I a VI de Star Wars",
        icono: "☯️",
        condicion: (vistos) => todosVistos(vistos, [
            "Star Wars: Episodio I - La Amenaza Fantasma",
            "Star Wars: Episodio II - El Ataque de los Clones",
            "Star Wars: Episodio III - La Venganza de los Sith",
            "Star Wars: Episodio IV - Una Nueva Esperanza",
            "Star Wars: Episodio V - El Imperio Contraataca",
            "Star Wars: Episodio VI - El Retorno del Jedi"
        ])
    },
    {
        id: "terminare-lo-que-empezaste",
        nombre: "Terminaré lo que empezaste",
        descripcion: "Mirá los Episodios VII, VIII y IX de Star Wars",
        icono: "🌌",
        condicion: (vistos) => todosVistos(vistos, [
            "Star Wars: Episodio VII - El Despertar de la Fuerza",
            "Star Wars: Episodio VIII - Los Últimos Jedi",
            "Star Wars: Episodio IX - El Ascenso de Skywalker"
        ])
    },
    {
        id: "uno-de-los-grandes",
        nombre: "Quiero ser uno de los grandes",
        descripcion: "Superá el 70% de las películas de Timothée Chalamet",
        icono: "🎬",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "timothee-chalamet") > 70
    },
    {
        id: "hacelo-con-estilo",
        nombre: "Si vas a hacer algo mal, hacelo con estilo.",
        descripcion: "Superá el 70% de las películas de Margot Robbie",
        icono: "💄",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "margot-robbie") > 70
    },
    {
        id: "en-construccion",
        nombre: "En construcción",
        descripcion: "Superá el 60% de los juegos de LEGO",
        icono: "🧱",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "lego-videojuegos") > 60
    },
    {
        id: "yo-soy-la-noche",
        nombre: "Yo soy la Noche",
        descripcion: "Completá 3 juegos del Arkhamverse",
        icono: "🦇",
        condicion: (vistos) => cantidadVistaEnColeccion(vistos, "arkhamverse") >= 3
    },
    {
        id: "yo-soy-la-venganza",
        nombre: "Yo soy la Venganza",
        descripcion: "Mirá la Trilogía de Batman de Christian Bale y The Batman",
        icono: "🌃",
        condicion: (vistos) => todosVistos(vistos, ["Batman Begins", "The Dark Knight", "The Dark Knight Rises", "The Batman"])
    },
    {
        id: "yo-soy-batman",
        nombre: "Yo soy Batman",
        descripcion: "Mirá 10 películas o series que incluyan a Batman",
        icono: "🃏",
        condicion: (vistos) => cantidadTitulosConPalabra(vistos, "batman") >= 10
    },
    {
        id: "sueno-deseo-corazon",
        nombre: "Un sueño es un deseo que hace tu corazón",
        descripcion: "Tené el 70% de las películas de Disney Animation",
        icono: "🏰",
        condicion: (vistos) => porcentajeCategoriaVisto(vistos, "disney-animation") >= 70
    },
    {
        id: "nada-es-verdad",
        nombre: "Nada es verdad, todo está permitido",
        descripcion: "Tené el 60% de los videojuegos de Assassin's Creed",
        icono: "🗡️",
        condicion: (vistos) => porcentajeCategoriaVisto(vistos, "assassins-creed") >= 60
    },
    {
        id: "nunca-miro-atras",
        nombre: "Nunca miro atrás, cariño, me distrae del presente",
        descripcion: "Tené el 70% de las películas de Pixar",
        icono: "💡",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "pixar") >= 70
    },
    {
        id: "hora-de-ser-heroe",
        nombre: "Hora de ser héroe",
        descripcion: "Tené el 70% de Ben 10 (todas las series juntas)",
        icono: "⌚",
        condicion: (vistos) => porcentajeColeccionesVisto(vistos, ["ben10-original", "ben10-alienforce", "ben10-ultimatealien", "ben10-omniverse"]) >= 70
    },
    {
        id: "cuarto-de-milla",
        nombre: "Un cuarto de milla a la vez",
        descripcion: "Tené el 70% de Rápidos y Furiosos",
        icono: "🏎️",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "rapidos-y-furiosos") >= 70
    },
    {
        id: "lisan-al-gaib",
        nombre: "Lisan Al-Gaib",
        descripcion: "Completá la colección de Dune",
        icono: "🐛",
        condicion: (vistos) => coleccionCompleta(vistos, "dune")
    },
    {
        id: "flotaras",
        nombre: "Flotarás",
        descripcion: "Completá la colección de It de Andy Muschietti",
        icono: "🎈",
        condicion: (vistos) => categoriaSubtipoCompleta(vistos, "it", "muschietti")
    },
    {
        id: "poder-mas-8000",
        nombre: "Su poder es más de 8000",
        descripcion: "Superá el 70% de Dragon Ball Z",
        icono: "💥",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "dragonball-z") > 70
    },
    {
        id: "saiyajin-sin-limites",
        nombre: "Un Saiyajin no conoce límites",
        descripcion: "Superá el 70% de Dragon Ball Super",
        icono: "🔵",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "dragonball-super") > 70
    },
    {
        id: "hasta-volvernos-a-encontrar",
        nombre: "Hasta el día en que nos volvamos a encontrar",
        descripcion: "Superá el 70% de Dragon Ball GT",
        icono: "🐲",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "dragonball-gt") > 70
    },
    {
        id: "justicia-no-venganza",
        nombre: "Justicia, no venganza",
        descripcion: "Superá el 70% del DCAMU",
        icono: "⚖️",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "dcamu") > 70
    },
    {
        id: "universo-jamas-el-mismo",
        nombre: "El universo jamás volverá a ser el mismo",
        descripcion: "Superá el 70% del Tomorrowverse",
        icono: "🌠",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "tomorrowverse") > 70
    },
    {
        id: "le-has-fallado-a-esta-ciudad",
        nombre: "Le has fallado a esta ciudad",
        descripcion: "Mirá el 100% de Arrow",
        icono: "🏹",
        condicion: (vistos) => coleccionCompleta(vistos, "arrow")
    },
    {
        id: "corre-barry-corre",
        nombre: "Corre Barry, corre",
        descripcion: "Mirá el 100% de The Flash",
        icono: "⚡",
        condicion: (vistos) => coleccionCompleta(vistos, "the-flash")
    },
    {
        id: "soy-inevitable",
        nombre: "Soy Inevitable",
        descripcion: "Completá La Saga del Infinito",
        icono: "🧤",
        condicion: (vistos) => categoriaCompleta(vistos, "mcu-infinito")
    },
    {
        id: "gran-fan-de-la-justicia",
        nombre: "Soy un gran fan de la justicia",
        descripcion: "Terminá el DCEU Principal",
        icono: "🛡️",
        condicion: (vistos) => categoriaCompleta(vistos, "dceu-principal")
    },
    {
        id: "tu-sangras",
        nombre: "¿Tú sangras?",
        descripcion: "Completá el DCEU de Zack Snyder",
        icono: "🩸",
        condicion: (vistos) => categoriaCompleta(vistos, "dceu-snyder")
    },
    {
        id: "chica-de-acero",
        nombre: "Una Chica de Acero",
        descripcion: "Alcanzá el 70% de Supergirl (Arrowverse)",
        icono: "🦸‍♀️",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "supergirl") >= 70
    },
    {
        id: "eres-un-mago-harry",
        nombre: "Eres un mago, Harry",
        descripcion: "Completá al 100% todas las películas de Harry Potter",
        icono: "⚡",
        condicion: (vistos) => coleccionCompleta(vistos, "harry-potter")
    },
    {
        id: "almas-raras",
        nombre: "Almas Raras",
        descripcion: "Completá Harry Potter + Animales Fantásticos",
        icono: "🐍",
        condicion: (vistos) => coleccionesCompletas(vistos, ["harry-potter", "animales-fantasticos"])
    },
    {
        id: "rey-del-mundo",
        nombre: "Rey del Mundo",
        descripcion: "Superá el 70% de las películas de Leonardo Di Caprio",
        icono: "🚢",
        condicion: (vistos) => porcentajeCategoriaVisto(vistos, "leonardo-dicaprio") > 70
    },
    {
        id: "muy-divertido-janet",
        nombre: "Es muy divertido, Janet",
        descripcion: "Superá el 70% de las películas de Tarantino",
        icono: "🩸",
        condicion: (vistos) => porcentajeColeccionVisto(vistos, "tarantino") > 70
    },
    {
        id: "literalmente-yo",
        nombre: "Literalmente yo",
        descripcion: "Alcanzá el 70% o más de las películas de Ryan Gosling",
        icono: "🎀",
        condicion: (vistos) => porcentajeCategoriaVisto(vistos, "ryan-gosling") >= 70
    },
    {
        id: "como-comer-helado-en-la-cama",
        nombre: "Como comer helado en la cama",
        descripcion: "Alcanzá el 70% o más de las películas de Brad Pitt",
        icono: "🍦",
        condicion: (vistos) => porcentajeCategoriaVisto(vistos, "brad-pitt") >= 70
    },
    {
        id: "un-escape",
        nombre: "Un escape",
        descripcion: "Alcanzá el 70% o más de las películas de Barry Keoghan",
        icono: "🗝️",
        condicion: (vistos) => porcentajeCategoriaVisto(vistos, "barry-keoghan") >= 70
    },
    {
        id: "mantente-curioso",
        nombre: "Mantente curioso",
        descripcion: "Alcanzá el 70% o más de las películas de Andrew Garfield",
        icono: "🕸️",
        condicion: (vistos) => porcentajeCategoriaVisto(vistos, "andrew-garfield") >= 70
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
        "marvel-animacion": "seccion-marvel-animacion",
        "dragonball": "seccion-dragonball",
        "anime": "seccion-anime",
        "comics": "seccion-comics",
        "dc-comics-hub": "seccion-dc-comics-hub",
        "dc-camino-heroe": "seccion-dc-camino-heroe",
        "dc-orden-lectura": "seccion-dc-orden-lectura",
        "absolute-dc": "seccion-absolute-dc",
        "renacimiento-dc": "seccion-renacimiento-dc",
        "dc-argentina": "seccion-dc-argentina",
        "dc-argentina-camino-heroe": "seccion-dc-argentina-camino-heroe",
        "dc-argentina-camino-villano": "seccion-dc-argentina-camino-villano",
        "post-crisis-dc": "seccion-post-crisis-dc",
        "infinite-frontier-dc": "seccion-infinite-frontier-dc",
        "elseworlds-otros-dc": "seccion-elseworlds-otros-dc",
        "los-nuevos-52-dc-argentina": "seccion-los-nuevos-52-dc-argentina",
        "marvel-comics-hub": "seccion-marvel-comics-hub",
        "sw-animacion": "seccion-sw-animacion",
        "franquicias": "seccion-franquicias",
        "videojuegos-explorar": "seccion-videojuegos-explorar",
        "galardones": "seccion-galardones",
        "academy-awards": "seccion-academy-awards",
        "oscar-anios": "seccion-oscar-2020-actualidad",
        "directores": "seccion-directores",
        "actores": "seccion-actores",
        "arrowverse": "seccion-arrowverse",
        "mundo-magico": "seccion-mundo-magico",
        "estudios": "seccion-estudios",
        "game-of-thrones": "seccion-game-of-thrones",
        "sitcoms": "seccion-sitcoms",
        "pokemon": "seccion-pokemon",
        "pokemon-canon": "seccion-pokemon-canon",
        "dc-multiverso": "seccion-dc-multiverso",
        "series-independientes": "seccion-series-independientes"
    };

    colecciones.forEach(col => {
        const secId = seccionesMap[col.categoria];
        const sec = secId ? document.getElementById(secId) : null;
        const contenedor = sec ? sec.querySelector('.grilla-biblioteca') : null;
        if (!contenedor) return;

        let htmlColeccion;

        if (col.esContenedor) {
            // Ficha "carpeta": poster, título y botón Abrir. Si tiene contenido
            // propio repartido en listaMedia (progresoCategoria), suma su barra
            const barraProgreso = col.progresoCategoria ? `
                    <div class="barra-progreso-container">
                        <div class="barra-progreso-fill" id="barra-${col.id}-fill"></div>
                    </div>
                    <p class="barra-progreso-texto" id="barra-${col.id}-texto">0% completado</p>
            ` : '';
            htmlColeccion = `
                <div class="tarjeta-media tarjeta-coleccion" data-coleccion="${col.id}">
                    <img src="${col.poster}" alt="${col.titulo}">
                    <h3>${col.titulo}</h3>
                    <p>${col.etiqueta || 'Categoría'}</p>
                    ${barraProgreso}
                    <div class="botones-coleccion">
                        <button class="btn-abrir-coleccion" data-coleccion="${col.id}">Abrir 📂</button>
                    </div>
                </div>
            `;
        } else {
            const textoPendiente = col.esVideojuego ? 'Marcar Jugado' : 'Marcar Visto';
            const etiquetaTipo = col.etiqueta || (col.esVideojuego ? 'Colección de Videojuegos' : 'Colección Animada');
            htmlColeccion = `
                <div class="tarjeta-media tarjeta-coleccion" data-coleccion="${col.id}" data-accion="${col.esVideojuego ? 'jugado' : 'visto'}" data-tipo="${col.tipoArrow || ''}" data-crono="${col.crono || ''}" data-orden="${col.ordenSalida || ''}" data-tierra="${col.tierra || ''}" data-subtipo="${col.subtipo || ''}">
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
// Inyecta las películas de una colección en su grilla si todavía no están dibujadas
function asegurarPeliculasRenderizadas(col) {
    const grilla = document.getElementById(`grilla-${col.id}`);
    if (!grilla || grilla.dataset.peliculasRenderizadas === 'true' || col.peliculas.length === 0) return;

    const textoPendiente = col.esVideojuego ? 'Marcar Jugado' : 'Marcar Visto';
    const etiquetaPorDefecto = col.esVideojuego ? 'Videojuego' : (col.esSerie ? 'Serie' : 'Película');
    col.peliculas.forEach(peli => {
        const etiquetaItem = peli.etiqueta || etiquetaPorDefecto;
        const htmlPelicula = `
            <div class="tarjeta-media" data-accion="${col.esVideojuego ? 'jugado' : 'visto'}">
                <img src="${peli.poster}" alt="${peli.titulo}">
                <h3>${peli.titulo}</h3>
                <p>${etiquetaItem}</p>
                <button class="btn-accion">${textoPendiente}</button>
            </div>
        `;
        grilla.insertAdjacentHTML('beforeend', htmlPelicula);
    });
    grilla.dataset.peliculasRenderizadas = 'true';
    sincronizarVistos();
}

function abrirColeccion(colId) {
    const col = colecciones.find(c => c.id === colId);
    if (!col) return;

    // Ficha "atajo": no tiene contenido propio, solo lleva a una sección que
    // ya existe y ya está poblada por otro camino (para no duplicar datos)
    if (col.atajoId) {
        const seccionAtajo = document.getElementById(`seccion-${col.atajoId}`);
        if (seccionAtajo) cambiarSeccion(seccionAtajo);
        return;
    }

    asegurarPeliculasRenderizadas(col);
    if (!col.esContenedor && col.peliculas.length > 0) {
        aplicarVistosGuardados(document.getElementById(`grilla-${colId}`));
    }

    const seccionDetalle = document.getElementById(`seccion-${colId}`);
    if (seccionDetalle) cambiarSeccion(seccionDetalle);
    if (!col.esContenedor) actualizarProgresoColeccion(colId);

    if (colId === 'it') {
        const btnMuschietti = document.querySelector('.btn-filtro-it[data-tipo="muschietti"]');
        if (btnMuschietti) btnMuschietti.click();
    }

    if (colId === 'game-of-thrones') {
        const btnSalida = document.querySelector('.btn-filtro-got[data-tipo="salida"]');
        if (btnSalida) btnSalida.click();
    }

    // Estas secciones usan filtros (década/categoría) y necesitan forzar el
    // filtro por defecto al abrirlas, o se ven todos los ítems mezclados
    const filtroPorDefecto = {
        'disney-animation': '.btn-filtro-disney[data-tipo="2020"]',
        'oscar-2020': '.btn-filtro-oscar[data-tipo="mejor-pelicula"]',
        'oscar-2021': '.btn-filtro-oscar[data-tipo="mejor-pelicula"]',
        'oscar-2022': '.btn-filtro-oscar[data-tipo="mejor-pelicula"]',
        'oscar-2023': '.btn-filtro-oscar[data-tipo="mejor-pelicula"]',
        'oscar-2024': '.btn-filtro-oscar[data-tipo="mejor-pelicula"]',
        'oscar-2025': '.btn-filtro-oscar[data-tipo="mejor-pelicula"]',
        'oscar-2026': '.btn-filtro-oscar[data-tipo="mejor-pelicula"]',
        'leonardo-dicaprio': '.btn-filtro-dicaprio[data-tipo="2020"]',
        'ryan-gosling': '.btn-filtro-gosling[data-tipo="2020"]',
        'sydney-sweeney': '.btn-filtro-sweeney[data-tipo="2020"]',
        'tom-holland': '.btn-filtro-holland[data-tipo="2020"]',
        'barry-keoghan': '.btn-filtro-keoghan[data-tipo="2020"]',
        'matrix-saga': '.btn-filtro-matrix[data-tipo="peliculas"]',
        'pixar': '.btn-filtro-pixar[data-tipo="2020"]',
        'brad-pitt': '.btn-filtro-pitt[data-tipo="2020"]',
        'florence-pugh': '.btn-filtro-pugh[data-tipo="2020"]',
        'emma-stone': '.btn-filtro-stone[data-tipo="2020"]',
        'jenna-ortega': '.btn-filtro-ortega[data-tipo="2020"]',
        'margot-robbie': '.btn-filtro-robbie[data-tipo="2020"]',
        'andrew-garfield': '.btn-filtro-garfield[data-tipo="2020"]',
        'alfred-hitchcock': '.btn-filtro-hitchcock[data-tipo="1970"]',
        'david-fincher': '.btn-filtro-fincher[data-tipo="2020"]',
        'green-lantern-hal-jordan': '.btn-filtro-gl-hal[data-tipo="origen"]',
        'nuevos-52-orden-lectura': '.btn-filtro-nuevos52[data-tipo="lanzamiento"]',
        'camino-heroe-principal': '.btn-filtro-camino-principal[data-tipo="batman"]',
        'camino-heroe-elseworlds': '.btn-filtro-camino-elseworlds[data-tipo="batman"]',
        'camino-villano-principal': '.btn-filtro-villano-principal[data-tipo="joker"]',
        'camino-villano-elseworlds': '.btn-filtro-villano-elseworlds[data-tipo="joker"]',
        'tomb-raider': '.btn-filtro-tombraider[data-tipo="survivor"]',
        'pokemon-canon': '.btn-filtro-pokemon[data-tipo="kanto-johto"]'
    };
    if (filtroPorDefecto[colId]) {
        const seccionActual = document.getElementById(`seccion-${colId}`);
        const btnDefecto = seccionActual ? seccionActual.querySelector(filtroPorDefecto[colId]) : null;
        if (btnDefecto) btnDefecto.click();
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

// Igual que arriba, pero para fichas "carpeta" cuyo contenido no vive en
// col.peliculas sino repartido en listaMedia bajo una misma categoría
// (ej: Leonardo Di Caprio, Disney Animation)
function actualizarProgresoCategoria(colId, categoria) {
    const fill = document.getElementById(`barra-${colId}-fill`);
    const texto = document.getElementById(`barra-${colId}-texto`);
    if (!fill || !texto) return;
    const titulos = listaMedia.filter(i => i.categoria === categoria);
    const total = titulos.length;
    const vistas = titulos.filter(i => titulosVistosGuardados.has(i.titulo)).length;
    const porcentaje = total > 0 ? Math.round((vistas / total) * 100) : 0;
    fill.style.width = porcentaje + '%';
    texto.textContent = porcentaje + '% completado (' + vistas + '/' + total + ')';
}

function actualizarTodasLasColecciones() {
    colecciones.forEach(col => {
        if (col.progresoCategoria) {
            actualizarProgresoCategoria(col.id, col.progresoCategoria);
        } else if (!col.esContenedor) {
            actualizarProgresoColeccion(col.id);
        }
    });
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
        "universal": "seccion-universal",
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
        "game-of-thrones": "seccion-game-of-thrones",
        "assassins-creed": "seccion-assassins-creed",
        "disney-animation": "seccion-disney-animation",
        "oscar-2020": "seccion-oscar-2020",
        "leonardo-dicaprio": "seccion-leonardo-dicaprio",
        "ryan-gosling": "seccion-ryan-gosling",
        "sydney-sweeney": "seccion-sydney-sweeney",
        "tom-holland": "seccion-tom-holland",
        "barry-keoghan": "seccion-barry-keoghan",
        "matrix-saga": "seccion-matrix-saga",
        "pixar": "seccion-pixar",
        "brad-pitt": "seccion-brad-pitt",
        "florence-pugh": "seccion-florence-pugh",
        "emma-stone": "seccion-emma-stone",
        "jenna-ortega": "seccion-jenna-ortega",
        "margot-robbie": "seccion-margot-robbie",
        "andrew-garfield": "seccion-andrew-garfield",
        "alfred-hitchcock": "seccion-alfred-hitchcock",
        "david-fincher": "seccion-david-fincher",
        "green-lantern-hal-jordan": "seccion-green-lantern-hal-jordan",
        "nuevos-52-orden-lectura": "seccion-nuevos-52-orden-lectura",
        "post-crisis-dc": "seccion-post-crisis-dc",
        "infinite-frontier-dc": "seccion-infinite-frontier-dc",
        "elseworlds-otros-dc": "seccion-elseworlds-otros-dc",
        "los-nuevos-52-dc-argentina": "seccion-los-nuevos-52-dc-argentina",
        "absolute-dc": "seccion-absolute-dc",
        "renacimiento-dc": "seccion-renacimiento-dc",
        "tomb-raider": "seccion-tomb-raider",
        "oscar-2021": "seccion-oscar-2021",
        "oscar-2022": "seccion-oscar-2022",
        "oscar-2023": "seccion-oscar-2023",
        "oscar-2024": "seccion-oscar-2024",
        "oscar-2025": "seccion-oscar-2025",
        "oscar-2026": "seccion-oscar-2026",
        "marvel-animacion": "seccion-marvel-animacion",
        "sitcoms": "seccion-sitcoms",
        "pokemon-canon": "seccion-pokemon-canon"
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
                <div class="tarjeta-media" style="${ocultarEstilo}" data-tier="${item.tier || ''}" data-tipo="${item.tipoArrow || ''}" data-crono="${item.crono || ''}" data-subtipo="${item.subtipo || ''}" data-personajes="${item.personajes || item.subtipo || ''}" data-orden="${item.ordenSalida || ''}" data-tierra="${item.tierra || ''}" data-accion="${esVideojuego ? 'jugado' : 'visto'}">
                    <img src="${item.poster}" alt="${item.titulo}">
                    <h3>${item.titulo}</h3>
                    <p>${item.tipo}</p>
                    <button class="btn-accion">${textoInicial}</button>
                </div>
            `;
            contenedorDestino.insertAdjacentHTML('beforeend', htmlTarjeta);

            // El Camino del Héroe (DC Argentina) no tiene items propios:
            // muestra los mismos de cada continuidad, filtrables por personaje.
            // Continuidad principal: Renacimiento, Post-Crisis y lo que sigamos
            // agregando de la línea histórica. Elseworlds: Absolute y afines.
            if (item.categoria === "renacimiento-dc" || item.categoria === "post-crisis-dc" || item.categoria === "los-nuevos-52-dc-argentina" || item.categoria === "infinite-frontier-dc") {
                const grillaPrincipal = document.getElementById("grilla-camino-heroe-principal");
                if (grillaPrincipal) grillaPrincipal.insertAdjacentHTML('beforeend', htmlTarjeta);

                const grillaVillanoPrincipal = document.getElementById("grilla-camino-villano-principal");
                if (grillaVillanoPrincipal) grillaVillanoPrincipal.insertAdjacentHTML('beforeend', htmlTarjeta);
            }
            if (item.categoria === "absolute-dc" || item.categoria === "elseworlds-otros-dc") {
                const grillaElseworlds = document.getElementById("grilla-camino-heroe-elseworlds");
                if (grillaElseworlds) grillaElseworlds.insertAdjacentHTML('beforeend', htmlTarjeta);

                const grillaVillanoElseworlds = document.getElementById("grilla-camino-villano-elseworlds");
                if (grillaVillanoElseworlds) grillaVillanoElseworlds.insertAdjacentHTML('beforeend', htmlTarjeta);
            }
        }
    });

    sincronizarVistos();
}

// Ordena la grilla de "Marvel: Animación" por número de Tierra (ascendente).
// Ordena TODAS las tarjetas de una grilla (ítems sueltos + fichas-colección
// mezclados) por su número de Tierra. Reutilizable para cualquier sección.
function ordenarGrillaPorTierra(seccionId) {
    const contenedor = document.querySelector(`#seccion-${seccionId} .grilla-biblioteca`);
    if (!contenedor) return;
    const tarjetas = Array.from(contenedor.querySelectorAll('.tarjeta-media'));
    tarjetas.sort((a, b) => parseFloat(a.getAttribute('data-tierra')) - parseFloat(b.getAttribute('data-tierra')));
    tarjetas.forEach(t => contenedor.appendChild(t));
}

// Ordena TODAS las tarjetas de una grilla (ítems sueltos + fichas-colección
// mezclados) alfabéticamente por su título. Reutilizable para cualquier
// sección nueva que deba listarse en orden alfabético.
function ordenarGrillaAlfabeticamente(seccionId) {
    const contenedor = document.querySelector(`#seccion-${seccionId} .grilla-biblioteca`);
    if (!contenedor) return;
    const tarjetas = Array.from(contenedor.querySelectorAll('.tarjeta-media'));
    tarjetas.sort((a, b) => {
        const tituloA = a.querySelector('h3') ? a.querySelector('h3').textContent : '';
        const tituloB = b.querySelector('h3') ? b.querySelector('h3').textContent : '';
        return tituloA.localeCompare(tituloB, 'es', { sensitivity: 'base' });
    });
    tarjetas.forEach(t => contenedor.appendChild(t));
}

let contenidoInicialRenderizado = false;
let loginPendienteDeAplicar = false;

document.addEventListener("DOMContentLoaded", () => {
    renderizarContenido();
    renderizarColecciones();
    ordenarGrillaPorTierra('marvel-animacion');
    ordenarGrillaPorTierra('dc-multiverso');
    ordenarGrillaAlfabeticamente('sitcoms');
    ordenarGrillaAlfabeticamente('franquicias');
    ordenarGrillaAlfabeticamente('actores');
    actualizarTodasLasColecciones();

    // Si Firebase ya nos había confirmado la sesión ANTES de que termináramos
    // de dibujar todas las tarjetas (pasa cada vez más seguido a medida que
    // el catálogo crece), "aplicarVistosGuardados" se había quedado sin nada
    // para marcar. Ahora que el contenido ya está listo, lo aplicamos recién.
    contenidoInicialRenderizado = true;
    if (loginPendienteDeAplicar) {
        cargarProgresoUsuario();
    }
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

            // Recolecta TODOS los títulos afectados por este click (el propio +
            // los de la cascada, si es la ficha madre de una colección) para
            // guardarlos todos juntos de forma atómica al final
            const titulosAfectados = [titulo];

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

            // Si lo que se tocó es la ficha madre de una colección, marca/desmarca
            // también todo lo que contiene, para que quede al 100% (o 0%)
            const colIdTocado = tarjeta.getAttribute('data-coleccion');
            if (colIdTocado) {
                const colTocada = colecciones.find(c => c.id === colIdTocado);
                if (colTocada && colTocada.peliculas.length > 0) {
                    asegurarPeliculasRenderizadas(colTocada);
                    colTocada.peliculas.forEach(peli => {
                        titulosAfectados.push(peli.titulo);
                        if (marcandoComoVisto) titulosVistosGuardados.add(peli.titulo);
                        else titulosVistosGuardados.delete(peli.titulo);

                        document.querySelectorAll('.tarjeta-media').forEach(t => {
                            if (t.querySelector('h3').textContent === peli.titulo) {
                                const btn = t.querySelector('.btn-accion');
                                if (!btn) return;
                                const esVJ = t.getAttribute('data-accion') === 'jugado';
                                if (marcandoComoVisto) {
                                    btn.textContent = esVJ ? 'Jugado ✓' : 'Visto ✓';
                                    btn.style.backgroundColor = "#28a745";
                                    t.classList.add('vista');
                                } else {
                                    btn.textContent = esVJ ? 'Marcar Jugado' : 'Marcar Visto';
                                    btn.style.backgroundColor = "";
                                    t.classList.remove('vista');
                                }
                            }
                        });
                    });
                    actualizarProgresoColeccion(colIdTocado);
                }
            }

            guardarProgresoUsuario(titulosAfectados, marcandoComoVisto);
            actualizarTodasLasColecciones();

            if (!document.getElementById('seccion-biblioteca').classList.contains('oculto')) {
                generarBiblioteca();
            }
        });
    });
}

// Biblioteca Dinámica
const btnBiblioteca = document.getElementById('btn-biblioteca');
const seccionBiblioteca = document.getElementById('seccion-biblioteca');
const grillaBiblioteca = document.getElementById('grilla-mi-biblioteca');
let filtroBibliotecaActivo = 'todos';

function normalizarTipoBiblioteca(tipo, esVideojuego) {
    if (esVideojuego) return 'videojuego';
    const t = (tipo || '').toLowerCase();
    if (t.includes('película') || t.includes('pelicula')) return 'pelicula';
    if (t.includes('serie')) return 'serie';
    return 'otro';
}

function generarBiblioteca(filtro) {
    if (filtro) filtroBibliotecaActivo = filtro;
    grillaBiblioteca.innerHTML = '';
    const titulosAgregados = new Set();

    const agregarSiVisto = (titulo, poster, tipo, esVideojuego) => {
        if (!titulosVistosGuardados.has(titulo) || titulosAgregados.has(titulo)) return;
        const categoria = normalizarTipoBiblioteca(tipo, esVideojuego);
        if (filtroBibliotecaActivo !== 'todos' && categoria !== filtroBibliotecaActivo) return;
        titulosAgregados.add(titulo);
        const textoBoton = esVideojuego ? 'Jugado ✓' : 'Visto ✓';
        grillaBiblioteca.insertAdjacentHTML('beforeend', `
            <div class="tarjeta-media vista" data-accion="${esVideojuego ? 'jugado' : 'visto'}">
                <img src="${poster}" alt="${titulo}">
                <h3>${titulo}</h3>
                <p>${tipo || ''}</p>
                <button class="btn-accion" style="background-color:#28a745;">${textoBoton}</button>
            </div>
        `);
    };

    listaMedia.forEach(item => {
        const esVJ = item.tipo === "Videojuego";
        agregarSiVisto(item.titulo, item.poster, item.tipo, esVJ);
    });
    colecciones.forEach(col => {
        if (!col.esContenedor) {
            agregarSiVisto(col.titulo, col.poster, col.esVideojuego ? 'Colección de Videojuegos' : 'Colección', col.esVideojuego);
        }
        col.peliculas.forEach(p => {
            agregarSiVisto(p.titulo, p.poster, col.esVideojuego ? 'Videojuego' : 'Película', col.esVideojuego);
        });
    });

    if (titulosAgregados.size === 0) {
        grillaBiblioteca.innerHTML = '<p style="color:#aaa; padding: 20px 0;">Todavía no marcaste nada en esta categoría.</p>';
    }
    sincronizarVistos();
}

if(btnBiblioteca) {
    btnBiblioteca.addEventListener('click', () => {
        generarBiblioteca(filtroBibliotecaActivo);
        cambiarSeccion(seccionBiblioteca);
    });
}

const botonesFiltroBiblioteca = document.querySelectorAll('.btn-filtro-biblioteca');
botonesFiltroBiblioteca.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroBiblioteca.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        generarBiblioteca(this.getAttribute('data-tipo'));
    });
});

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
    { btn: 'btn-marvel-animacion', sec: 'seccion-marvel-animacion' },
    { btn: 'btn-dc-personajes', sec: 'seccion-dc-personajes' },
    { btn: 'btn-mcu-infinito', sec: 'seccion-mcu-infinito' },
    { btn: 'btn-mcu-multiverso', sec: 'seccion-mcu-multiverso' },
    { btn: 'btn-fox-xmen', sec: 'seccion-fox-xmen' },
    { btn: 'btn-fox-ff', sec: 'seccion-fox-ff' },
    { btn: 'btn-universal', sec: 'seccion-universal' },
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
            if (nav.sec === 'seccion-fox-ff') {
                const btnDefecto = document.querySelector('.btn-filtro-ff[data-tipo="2000"]');
                if (btnDefecto) btnDefecto.click();
            }
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

// Orden cronológico real del Arrowverse a nivel de TEMPORADA (no por serie completa).
// Los eventos/crossovers ya tienen su propio "crono" en listaMedia; acá solo van
// las temporadas individuales de las 5 series con fichas-colección.
const arrowverseCronologicoTemporadas = [
    { coleccion: "arrow", pelicula: "Arrow Temporada 1", crono: 1 },
    { coleccion: "arrow", pelicula: "Arrow Temporada 2", crono: 2 },
    { coleccion: "the-flash", pelicula: "The Flash Temporada 1", crono: 3 },
    { coleccion: "arrow", pelicula: "Arrow Temporada 3", crono: 4 },
    { coleccion: "the-flash", pelicula: "The Flash Temporada 2", crono: 6 },
    { coleccion: "arrow", pelicula: "Arrow Temporada 4", crono: 7 },
    { coleccion: "supergirl", pelicula: "Supergirl Temporada 1", crono: 8 },
    { coleccion: "legends-of-tomorrow", pelicula: "DC's Legends of Tomorrow Temporada 1", crono: 10 },
    { coleccion: "the-flash", pelicula: "The Flash Temporada 3", crono: 11 },
    { coleccion: "arrow", pelicula: "Arrow Temporada 5", crono: 12 },
    { coleccion: "supergirl", pelicula: "Supergirl Temporada 2", crono: 13 },
    { coleccion: "legends-of-tomorrow", pelicula: "DC's Legends of Tomorrow Temporada 2", crono: 14 },
    { coleccion: "the-flash", pelicula: "The Flash Temporada 4", crono: 17 },
    { coleccion: "arrow", pelicula: "Arrow Temporada 6", crono: 18 },
    { coleccion: "supergirl", pelicula: "Supergirl Temporada 3", crono: 19 },
    { coleccion: "legends-of-tomorrow", pelicula: "DC's Legends of Tomorrow Temporada 3", crono: 20 },
    { coleccion: "the-flash", pelicula: "The Flash Temporada 5", crono: 22 },
    { coleccion: "arrow", pelicula: "Arrow Temporada 7", crono: 23 },
    { coleccion: "supergirl", pelicula: "Supergirl Temporada 4", crono: 24 },
    { coleccion: "legends-of-tomorrow", pelicula: "DC's Legends of Tomorrow Temporada 4", crono: 25 },
    { coleccion: "black-lightning", pelicula: "Black Lightning Temporada 1", crono: 21.5 },
    { coleccion: "black-lightning", pelicula: "Black Lightning Temporada 2", crono: 26 },
    { coleccion: "the-flash", pelicula: "The Flash Temporada 6", crono: 28 },
    { coleccion: "arrow", pelicula: "Arrow Temporada 8", crono: 29 },
    { coleccion: "supergirl", pelicula: "Supergirl Temporada 5", crono: 30 },
    { coleccion: "batwoman", pelicula: "Batwoman Temporada 1", crono: 31 },
    { coleccion: "black-lightning", pelicula: "Black Lightning Temporada 3", crono: 31.5 },
    { coleccion: "legends-of-tomorrow", pelicula: "DC's Legends of Tomorrow Temporada 5", crono: 33 },
    { coleccion: "batwoman", pelicula: "Batwoman Temporada 2", crono: 34 },
    { coleccion: "the-flash", pelicula: "The Flash Temporada 7", crono: 35 },
    { coleccion: "supergirl", pelicula: "Supergirl Temporada 6", crono: 36 },
    { coleccion: "black-lightning", pelicula: "Black Lightning Temporada 4", crono: 36.5 },
    { coleccion: "the-flash", pelicula: "The Flash Temporada 8", crono: 38 },
    { coleccion: "batwoman", pelicula: "Batwoman Temporada 3", crono: 39 },
    { coleccion: "the-flash", pelicula: "The Flash Temporada 9", crono: 40 }
];

// Crea (si no existen) las tarjetas sueltas de cada temporada dentro de grilla-arrowverse
function generarTarjetasTemporadasArrowverse() {
    const contenedor = document.getElementById('grilla-arrowverse');
    if (!contenedor) return;

    arrowverseCronologicoTemporadas.forEach(entry => {
        if (contenedor.querySelector(`[data-temporada-id="${entry.coleccion}__${entry.pelicula}"]`)) return;

        const col = colecciones.find(c => c.id === entry.coleccion);
        const peli = col ? col.peliculas.find(p => p.titulo === entry.pelicula) : null;
        if (!col || !peli) return;

        const div = document.createElement('div');
        div.className = 'tarjeta-media tarjeta-temporada oculto';
        div.setAttribute('data-temporada-id', `${entry.coleccion}__${entry.pelicula}`);
        div.setAttribute('data-crono', entry.crono);
        div.setAttribute('data-accion', 'visto');
        div.innerHTML = `
            <img src="${peli.poster}" alt="${peli.titulo}">
            <h3>${peli.titulo}</h3>
            <p>${col.titulo}</p>
            <button class="btn-accion">Marcar Visto</button>
        `;
        contenedor.appendChild(div);
    });

    sincronizarVistos();
    aplicarVistosGuardados(contenedor);
}

const botonesFiltroArrow = document.querySelectorAll('.btn-filtro-arrowverse');
botonesFiltroArrow.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroArrow.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const contenedor = document.getElementById('grilla-arrowverse');

        if (tipoElegido === 'cronologico') {
            generarTarjetasTemporadasArrowverse();

            // Las 5 fichas-colección (series enteras) se ocultan: sus temporadas
            // sueltas van a aparecer en su lugar, intercaladas con los eventos.
            const items = [];
            contenedor.querySelectorAll('.tarjeta-media').forEach(t => {
                if (t.classList.contains('tarjeta-coleccion')) {
                    t.classList.add('oculto');
                    return;
                }
                t.classList.remove('oculto');
                t.style.display = 'flex';
                items.push({ el: t, crono: parseFloat(t.getAttribute('data-crono')) });
            });

            items.sort((a, b) => a.crono - b.crono);
            items.forEach(i => contenedor.appendChild(i.el));
        } else {
            // Al volver a Principal/Eventos, las temporadas sueltas se ocultan
            // y reaparecen las 5 fichas-colección de las series completas.
            contenedor.querySelectorAll('.tarjeta-temporada').forEach(t => t.classList.add('oculto'));
            contenedor.querySelectorAll('.tarjeta-media:not(.tarjeta-temporada)').forEach(tarjeta => {
                tarjeta.classList.remove('oculto');
                tarjeta.style.display = (tarjeta.getAttribute('data-tipo') === tipoElegido) ? 'flex' : 'none';
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

const btnVolverLeonardoDicaprio = document.getElementById('btn-volver-leonardo-dicaprio');
if(btnVolverLeonardoDicaprio) {
    btnVolverLeonardoDicaprio.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverRyanGosling = document.getElementById('btn-volver-ryan-gosling');
if(btnVolverRyanGosling) {
    btnVolverRyanGosling.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverSydneySweeney = document.getElementById('btn-volver-sydney-sweeney');
if(btnVolverSydneySweeney) {
    btnVolverSydneySweeney.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverIndeNavarrette = document.getElementById('btn-volver-inde-navarrette');
if(btnVolverIndeNavarrette) {
    btnVolverIndeNavarrette.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverFlorencePugh = document.getElementById('btn-volver-florence-pugh');
if(btnVolverFlorencePugh) {
    btnVolverFlorencePugh.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverEmmaStone = document.getElementById('btn-volver-emma-stone');
if(btnVolverEmmaStone) {
    btnVolverEmmaStone.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverJennaOrtega = document.getElementById('btn-volver-jenna-ortega');
if(btnVolverJennaOrtega) {
    btnVolverJennaOrtega.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverAndrewGarfield = document.getElementById('btn-volver-andrew-garfield');
if(btnVolverAndrewGarfield) {
    btnVolverAndrewGarfield.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverTomHolland = document.getElementById('btn-volver-tom-holland');
if(btnVolverTomHolland) {
    btnVolverTomHolland.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverBarryKeoghan = document.getElementById('btn-volver-barry-keoghan');
if(btnVolverBarryKeoghan) {
    btnVolverBarryKeoghan.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverBradPitt = document.getElementById('btn-volver-brad-pitt');
if(btnVolverBradPitt) {
    btnVolverBradPitt.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverTimotheeChalamet = document.getElementById('btn-volver-timothee-chalamet');
if(btnVolverTimotheeChalamet) {
    btnVolverTimotheeChalamet.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
    });
}

const btnVolverMargotRobbie = document.getElementById('btn-volver-margot-robbie');
if(btnVolverMargotRobbie) {
    btnVolverMargotRobbie.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-actores'));
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

const btnVolverMatrixSaga = document.getElementById('btn-volver-matrix-saga');
if(btnVolverMatrixSaga) {
    btnVolverMatrixSaga.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

const btnVolverSitcoms = document.getElementById('btn-volver-sitcoms');
if(btnVolverSitcoms) {
    btnVolverSitcoms.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-explorar'));
    });
}

const btnVolverAnime = document.getElementById('btn-volver-anime');
if(btnVolverAnime) {
    btnVolverAnime.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-explorar'));
    });
}

const btnVolverDeathNote = document.getElementById('btn-volver-death-note');
if(btnVolverDeathNote) {
    btnVolverDeathNote.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-anime'));
    });
}

const btnVolverPokemon = document.getElementById('btn-volver-pokemon');
if(btnVolverPokemon) {
    btnVolverPokemon.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-anime'));
    });
}

const btnVolverPokemonCanon = document.getElementById('btn-volver-pokemon-canon');
if(btnVolverPokemonCanon) {
    btnVolverPokemonCanon.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-pokemon'));
    });
}

const btnVolverBigbangtheoryUniverso = document.getElementById('btn-volver-bigbangtheory-universo');
if(btnVolverBigbangtheoryUniverso) {
    btnVolverBigbangtheoryUniverso.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-sitcoms'));
    });
}

const btnVolverTheOffice = document.getElementById('btn-volver-the-office');
if(btnVolverTheOffice) {
    btnVolverTheOffice.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-sitcoms'));
    });
}

const btnVolverEstudios = document.getElementById('btn-volver-estudios');
if(btnVolverEstudios) {
    btnVolverEstudios.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-explorar'));
    });
}

const btnVolverPixar = document.getElementById('btn-volver-pixar');
if(btnVolverPixar) {
    btnVolverPixar.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-estudios'));
    });
}

const btnVolverDisneyAnimation = document.getElementById('btn-volver-disney-animation');
if(btnVolverDisneyAnimation) {
    btnVolverDisneyAnimation.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-estudios'));
    });
}

const btnVolverRapidosYFuriosos = document.getElementById('btn-volver-rapidos-y-furiosos');
if(btnVolverRapidosYFuriosos) {
    btnVolverRapidosYFuriosos.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

const btnVolverMazeRunner = document.getElementById('btn-volver-maze-runner');
if(btnVolverMazeRunner) {
    btnVolverMazeRunner.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

const btnVolverLosJuegosDelHambre = document.getElementById('btn-volver-los-juegos-del-hambre');
if(btnVolverLosJuegosDelHambre) {
    btnVolverLosJuegosDelHambre.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

const btnVolverIndianaJones = document.getElementById('btn-volver-indiana-jones');
if(btnVolverIndianaJones) {
    btnVolverIndianaJones.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

const btnVolverDune = document.getElementById('btn-volver-dune');
if(btnVolverDune) {
    btnVolverDune.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

const btnVolverMundoMagico = document.getElementById('btn-volver-mundo-magico');
if(btnVolverMundoMagico) {
    btnVolverMundoMagico.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-franquicias'));
    });
}

['btn-volver-harry-potter', 'btn-volver-animales-fantasticos', 'btn-volver-mundo-magico-videojuegos'].forEach(id => {
    const btn = document.getElementById(id);
    if(btn) {
        btn.addEventListener('click', () => {
            cambiarSeccion(document.getElementById('seccion-mundo-magico'));
        });
    }
});

const btnVolverVideojuegosExplorar = document.getElementById('btn-volver-videojuegos-explorar');
if(btnVolverVideojuegosExplorar) {
    btnVolverVideojuegosExplorar.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-explorar'));
    });
}

const btnVolverAssassinsCreed = document.getElementById('btn-volver-assassins-creed');
if(btnVolverAssassinsCreed) {
    btnVolverAssassinsCreed.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-videojuegos-explorar'));
    });
}

const btnVolverGrandTheftAuto = document.getElementById('btn-volver-grand-theft-auto');
if(btnVolverGrandTheftAuto) {
    btnVolverGrandTheftAuto.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-videojuegos-explorar'));
    });
}

const btnVolverBorderlands = document.getElementById('btn-volver-borderlands');
if(btnVolverBorderlands) {
    btnVolverBorderlands.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-videojuegos-explorar'));
    });
}

const btnVolverTombRaider = document.getElementById('btn-volver-tomb-raider');
if(btnVolverTombRaider) {
    btnVolverTombRaider.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-videojuegos-explorar'));
    });
}

const btnVolverArrow = document.getElementById('btn-volver-arrow');
if(btnVolverArrow) {
    btnVolverArrow.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-arrowverse'));
    });
}

const btnVolverTheFlash = document.getElementById('btn-volver-the-flash');
if(btnVolverTheFlash) {
    btnVolverTheFlash.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-arrowverse'));
    });
}

const btnVolverSupergirl = document.getElementById('btn-volver-supergirl');
if(btnVolverSupergirl) {
    btnVolverSupergirl.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-arrowverse'));
    });
}

const btnVolverBatwoman = document.getElementById('btn-volver-batwoman');
if(btnVolverBatwoman) {
    btnVolverBatwoman.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-arrowverse'));
    });
}

const btnVolverLegendsOfTomorrow = document.getElementById('btn-volver-legends-of-tomorrow');
if(btnVolverLegendsOfTomorrow) {
    btnVolverLegendsOfTomorrow.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-arrowverse'));
    });
}

const btnVolverBlackLightning = document.getElementById('btn-volver-black-lightning');
if(btnVolverBlackLightning) {
    btnVolverBlackLightning.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-arrowverse'));
    });
}

const btnVolverSupermanYLois = document.getElementById('btn-volver-superman-y-lois');
if(btnVolverSupermanYLois) {
    btnVolverSupermanYLois.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-multiverso'));
    });
}

const btnVolverBatmanTrilogiaNolan = document.getElementById('btn-volver-batman-trilogia-nolan');
if(btnVolverBatmanTrilogiaNolan) {
    btnVolverBatmanTrilogiaNolan.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-multiverso'));
    });
}

const btnVolverBatman90s = document.getElementById('btn-volver-batman-90s');
if(btnVolverBatman90s) {
    btnVolverBatman90s.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-multiverso'));
    });
}

const btnVolverStargirl = document.getElementById('btn-volver-stargirl');
if(btnVolverStargirl) {
    btnVolverStargirl.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-multiverso'));
    });
}

const btnVolverGalardones = document.getElementById('btn-volver-galardones');
if(btnVolverGalardones) {
    btnVolverGalardones.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-explorar'));
    });
}

const btnVolverAcademyAwards = document.getElementById('btn-volver-academy-awards');
if(btnVolverAcademyAwards) {
    btnVolverAcademyAwards.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-galardones'));
    });
}

const btnVolverGoldenGlobes = document.getElementById('btn-volver-golden-globes');
if(btnVolverGoldenGlobes) {
    btnVolverGoldenGlobes.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-galardones'));
    });
}

const btnVolverOscar2020Actualidad = document.getElementById('btn-volver-oscar-2020-actualidad');
if(btnVolverOscar2020Actualidad) {
    btnVolverOscar2020Actualidad.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-academy-awards'));
    });
}

['btn-volver-oscar-2020', 'btn-volver-oscar-2021', 'btn-volver-oscar-2022', 'btn-volver-oscar-2023', 'btn-volver-oscar-2024', 'btn-volver-oscar-2025', 'btn-volver-oscar-2026'].forEach(id => {
    const btn = document.getElementById(id);
    if(btn) {
        btn.addEventListener('click', () => {
            cambiarSeccion(document.getElementById('seccion-oscar-2020-actualidad'));
        });
    }
});

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

const btnVolverBatmanTelltale = document.getElementById('btn-volver-batman-telltale');
if(btnVolverBatmanTelltale) {
    btnVolverBatmanTelltale.addEventListener('click', () => {
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

const btnVolverGotSerie = document.getElementById('btn-volver-got-serie');
if(btnVolverGotSerie) {
    btnVolverGotSerie.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-game-of-thrones'));
    });
}

const btnVolverHouseOfTheDragon = document.getElementById('btn-volver-house-of-the-dragon');
if(btnVolverHouseOfTheDragon) {
    btnVolverHouseOfTheDragon.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-game-of-thrones'));
    });
}

const btnVolverGretaGerwig = document.getElementById('btn-volver-greta-gerwig');
if(btnVolverGretaGerwig) {
    btnVolverGretaGerwig.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-directores'));
    });
}

const btnVolverChloeZhao = document.getElementById('btn-volver-chloe-zhao');
if(btnVolverChloeZhao) {
    btnVolverChloeZhao.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-directores'));
    });
}

const btnVolverCelineSong = document.getElementById('btn-volver-celine-song');
if(btnVolverCelineSong) {
    btnVolverCelineSong.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-directores'));
    });
}

const btnVolverTarantino = document.getElementById('btn-volver-tarantino');
if(btnVolverTarantino) {
    btnVolverTarantino.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-directores'));
    });
}

const btnVolverAlfredHitchcock = document.getElementById('btn-volver-alfred-hitchcock');
if(btnVolverAlfredHitchcock) {
    btnVolverAlfredHitchcock.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-directores'));
    });
}

const btnVolverDavidFincher = document.getElementById('btn-volver-david-fincher');
if(btnVolverDavidFincher) {
    btnVolverDavidFincher.addEventListener('click', () => {
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

const btnVolverSeriesIndependientes = document.getElementById('btn-volver-series-independientes');
if(btnVolverSeriesIndependientes) {
    btnVolverSeriesIndependientes.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-animacion'));
    });
}

const btnVolverTheBatman2004 = document.getElementById('btn-volver-the-batman-2004');
if(btnVolverTheBatman2004) {
    btnVolverTheBatman2004.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-series-independientes'));
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

const btnVolverMarvelDisneyxd = document.getElementById('btn-volver-marvel-disneyxd');
if(btnVolverMarvelDisneyxd) {
    btnVolverMarvelDisneyxd.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-marvel-animacion'));
    });
}

const btnVolverUltimateSpiderMan = document.getElementById('btn-volver-ultimate-spider-man');
if(btnVolverUltimateSpiderMan) {
    btnVolverUltimateSpiderMan.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-marvel-animacion'));
    });
}

const btnVolverAvengersAssemble = document.getElementById('btn-volver-avengers-assemble');
if(btnVolverAvengersAssemble) {
    btnVolverAvengersAssemble.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-marvel-animacion'));
    });
}

const btnVolverMarvel90s = document.getElementById('btn-volver-marvel-90s');
if(btnVolverMarvel90s) {
    btnVolverMarvel90s.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-marvel-animacion'));
    });
}

const btnVolverXMen92 = document.getElementById('btn-volver-x-men-92');
if(btnVolverXMen92) {
    btnVolverXMen92.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-marvel-animacion'));
    });
}

const btnVolverXMen97 = document.getElementById('btn-volver-x-men-97');
if(btnVolverXMen97) {
    btnVolverXMen97.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-marvel-animacion'));
    });
}

const btnVolverYostVerse = document.getElementById('btn-volver-yost-verse');
if(btnVolverYostVerse) {
    btnVolverYostVerse.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-marvel-animacion'));
    });
}

const btnVolverDragonball = document.getElementById('btn-volver-dragonball');
if(btnVolverDragonball) {
    btnVolverDragonball.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-anime'));
    });
}

[
    'btn-volver-dragonball-z',
    'btn-volver-dragonball-super',
    'btn-volver-dragonball-historia-canon',
    'btn-volver-dragonball-videojuegos',
    'btn-volver-dragonball-gt',
    'btn-volver-dragonball-z-peliculas',
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

const btnVolverSwBadBatch = document.getElementById('btn-volver-sw-bad-batch');
if(btnVolverSwBadBatch) {
    btnVolverSwBadBatch.addEventListener('click', () => {
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
// FILTROS "DISNEY ANIMATION" (por década)
// ==========================================
const botonesFiltroDisney = document.querySelectorAll('.btn-filtro-disney');
botonesFiltroDisney.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroDisney.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-disney-animation .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "OSCAR" por categoría del premio (funciona para cualquier año: 2020, 2021, 2022...)
// ==========================================
const botonesFiltroOscar = document.querySelectorAll('.btn-filtro-oscar');
botonesFiltroOscar.forEach(boton => {
    boton.addEventListener('click', function() {
        const seccion = this.closest('section');
        if (!seccion) return;
        seccion.querySelectorAll('.btn-filtro-oscar').forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = seccion.querySelectorAll('.tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "LEONARDO DI CAPRIO" (por década)
// ==========================================
const botonesFiltroDicaprio = document.querySelectorAll('.btn-filtro-dicaprio');
botonesFiltroDicaprio.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroDicaprio.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-leonardo-dicaprio .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "RYAN GOSLING" (por década)
// ==========================================
const botonesFiltroGosling = document.querySelectorAll('.btn-filtro-gosling');
botonesFiltroGosling.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroGosling.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-ryan-gosling .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "CUATRO FANTÁSTICOS" (Fox, por década)
// ==========================================
const botonesFiltroFF = document.querySelectorAll('.btn-filtro-ff');
botonesFiltroFF.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroFF.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-fox-ff .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "SYDNEY SWEENEY" (por década)
// ==========================================
const botonesFiltroSweeney = document.querySelectorAll('.btn-filtro-sweeney');
botonesFiltroSweeney.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroSweeney.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-sydney-sweeney .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "TOM HOLLAND" (por década)
// ==========================================
const botonesFiltroHolland = document.querySelectorAll('.btn-filtro-holland');
botonesFiltroHolland.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroHolland.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-tom-holland .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "BARRY KEOGHAN" (por década)
// ==========================================
const botonesFiltroKeoghan = document.querySelectorAll('.btn-filtro-keoghan');
botonesFiltroKeoghan.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroKeoghan.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-barry-keoghan .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "THE MATRIX SAGA" (Películas / Todo — un título puede estar en ambos)
// ==========================================
const botonesFiltroMatrix = document.querySelectorAll('.btn-filtro-matrix');
botonesFiltroMatrix.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroMatrix.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-matrix-saga .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            const etiquetas = (tarjeta.getAttribute('data-subtipo') || '').split(',');
            tarjeta.style.display = etiquetas.includes(tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "PIXAR" (por década)
// ==========================================
const botonesFiltroPixar = document.querySelectorAll('.btn-filtro-pixar');
botonesFiltroPixar.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroPixar.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-pixar .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "BRAD PITT" (por década)
// ==========================================
const botonesFiltroPitt = document.querySelectorAll('.btn-filtro-pitt');
botonesFiltroPitt.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroPitt.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-brad-pitt .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "FLORENCE PUGH" (por década)
// ==========================================
const botonesFiltroPugh = document.querySelectorAll('.btn-filtro-pugh');
botonesFiltroPugh.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroPugh.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-florence-pugh .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "EMMA STONE" (por década)
// ==========================================
const botonesFiltroStone = document.querySelectorAll('.btn-filtro-stone');
botonesFiltroStone.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroStone.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-emma-stone .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "JENNA ORTEGA" (por década)
// ==========================================
const botonesFiltroOrtega = document.querySelectorAll('.btn-filtro-ortega');
botonesFiltroOrtega.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroOrtega.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-jenna-ortega .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "MARGOT ROBBIE" (por década)
// ==========================================
const botonesFiltroRobbie = document.querySelectorAll('.btn-filtro-robbie');
botonesFiltroRobbie.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroRobbie.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-margot-robbie .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "ANDREW GARFIELD" (por década)
// ==========================================
const botonesFiltroGarfield = document.querySelectorAll('.btn-filtro-garfield');
botonesFiltroGarfield.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroGarfield.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-andrew-garfield .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "ALFRED HITCHCOCK" (por década)
// ==========================================
const botonesFiltroHitchcock = document.querySelectorAll('.btn-filtro-hitchcock');
botonesFiltroHitchcock.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroHitchcock.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-alfred-hitchcock .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "DAVID FINCHER" (por década)
// ==========================================
const botonesFiltroFincher = document.querySelectorAll('.btn-filtro-fincher');
botonesFiltroFincher.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroFincher.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-david-fincher .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "GREEN LANTERN - HAL JORDAN" (por etapa de lectura)
// ==========================================
const botonesFiltroGlHal = document.querySelectorAll('.btn-filtro-gl-hal');
botonesFiltroGlHal.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroGlHal.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-green-lantern-hal-jordan .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "LOS NUEVOS 52 - ORDEN DE LECTURA"
// ==========================================
const botonesFiltroNuevos52 = document.querySelectorAll('.btn-filtro-nuevos52');
botonesFiltroNuevos52.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroNuevos52.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-nuevos-52-orden-lectura .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "POST-CRISIS / EDAD MODERNA" — por personaje
// ==========================================
const botonesFiltroPostCrisis = document.querySelectorAll('.btn-filtro-post-crisis');
botonesFiltroPostCrisis.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroPostCrisis.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-post-crisis-dc .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            if (tipoElegido === 'todos') {
                tarjeta.style.display = 'flex';
                return;
            }
            const etiquetas = (tarjeta.getAttribute('data-subtipo') || '').split(',');
            tarjeta.style.display = etiquetas.includes(tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "RENACIMIENTO" (DC ARGENTINA) — por personaje
// ==========================================
const botonesFiltroRenacimiento = document.querySelectorAll('.btn-filtro-renacimiento');
botonesFiltroRenacimiento.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroRenacimiento.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-renacimiento-dc .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            if (tipoElegido === 'todos') {
                tarjeta.style.display = 'flex';
                return;
            }
            const etiquetas = (tarjeta.getAttribute('data-subtipo') || '').split(',');
            tarjeta.style.display = etiquetas.includes(tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "ABSOLUTE" (DC ARGENTINA) — por personaje
// ==========================================
const botonesFiltroAbsolute = document.querySelectorAll('.btn-filtro-absolute');
botonesFiltroAbsolute.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroAbsolute.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-absolute-dc .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            if (tipoElegido === 'todos') {
                tarjeta.style.display = 'flex';
                return;
            }
            const etiquetas = (tarjeta.getAttribute('data-subtipo') || '').split(',');
            tarjeta.style.display = etiquetas.includes(tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "CAMINO DEL HÉROE — CONTINUIDAD PRINCIPAL" (DC Argentina)
// ==========================================
const botonesFiltroCaminoPrincipal = document.querySelectorAll('.btn-filtro-camino-principal');
botonesFiltroCaminoPrincipal.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroCaminoPrincipal.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-camino-heroe-principal .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            const etiquetas = (tarjeta.getAttribute('data-personajes') || '').split(',');
            tarjeta.style.display = etiquetas.includes(tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "CAMINO DEL HÉROE — ELSEWORLDS" (DC Argentina)
// ==========================================
const botonesFiltroCaminoElseworlds = document.querySelectorAll('.btn-filtro-camino-elseworlds');
botonesFiltroCaminoElseworlds.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroCaminoElseworlds.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-camino-heroe-elseworlds .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            const etiquetas = (tarjeta.getAttribute('data-personajes') || '').split(',');
            tarjeta.style.display = etiquetas.includes(tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "CAMINO DEL VILLANO — CONTINUIDAD PRINCIPAL" (DC Argentina)
// ==========================================
const botonesFiltroVillanoPrincipal = document.querySelectorAll('.btn-filtro-villano-principal');
botonesFiltroVillanoPrincipal.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroVillanoPrincipal.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-camino-villano-principal .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            const etiquetas = (tarjeta.getAttribute('data-personajes') || '').split(',');
            tarjeta.style.display = etiquetas.includes(tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "CAMINO DEL VILLANO — ELSEWORLDS" (DC Argentina)
// ==========================================
const botonesFiltroVillanoElseworlds = document.querySelectorAll('.btn-filtro-villano-elseworlds');
botonesFiltroVillanoElseworlds.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroVillanoElseworlds.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-camino-villano-elseworlds .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            const etiquetas = (tarjeta.getAttribute('data-personajes') || '').split(',');
            tarjeta.style.display = etiquetas.includes(tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "TOMB RAIDER"
// ==========================================
const botonesFiltroTombRaider = document.querySelectorAll('.btn-filtro-tombraider');
botonesFiltroTombRaider.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroTombRaider.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-tomb-raider .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
});

// ==========================================
// FILTROS "POKÉMON: CANON" (por generación/era)
// ==========================================
const botonesFiltroPokemon = document.querySelectorAll('.btn-filtro-pokemon');
botonesFiltroPokemon.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroPokemon.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-pokemon-canon .tarjeta-media');

        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = (tarjeta.getAttribute('data-subtipo') === tipoElegido) ? 'flex' : 'none';
        });
    });
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
// FILTROS "ASSASSIN'S CREED" (Orden de Lanzamiento / Cronológico)
// ==========================================
const botonesFiltroAc = document.querySelectorAll('.btn-filtro-ac');
botonesFiltroAc.forEach(boton => {
    boton.addEventListener('click', function() {
        botonesFiltroAc.forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        const tipoElegido = this.getAttribute('data-tipo');
        const tarjetas = document.querySelectorAll('#seccion-assassins-creed .tarjeta-media');
        const contenedor = document.getElementById('grilla-assassins-creed');
        const atributo = tipoElegido === 'cronologico' ? 'data-crono' : 'data-orden';

        const arrayTarjetas2 = Array.from(tarjetas).sort(
            (a, b) => parseFloat(a.getAttribute(atributo)) - parseFloat(b.getAttribute(atributo))
        );
        arrayTarjetas2.forEach(t => contenedor.appendChild(t));
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
let logrosYaNotificados = new Set();
let ultimoGuardadoPendiente = Promise.resolve();
let ultimoGuardadoExitoso = true;
let guardadoEnProgreso = false;

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
    btnLoginModal.addEventListener('click', async () => {
        if (usuarioActual) {
            if (confirm('¿Cerrar sesión de ' + (usuarioActual.displayName || usuarioActual.email) + '?')) {
                // Espera a que termine de viajar a la nube el último guardado
                // pendiente antes de cerrar sesión, para no cortarlo a mitad
                // de camino (eso hacía que "se perdiera" lo último marcado)
                const textoOriginal = btnLoginModal.textContent;
                btnLoginModal.textContent = '⏳ Guardando...';
                btnLoginModal.disabled = true;
                await ultimoGuardadoPendiente;
                btnLoginModal.disabled = false;

                if (!ultimoGuardadoExitoso) {
                    btnLoginModal.textContent = textoOriginal;
                    alert('No se pudo guardar tu último cambio (revisá tu conexión a internet). No vamos a cerrar la sesión todavía para que no lo pierdas — probá marcarlo de nuevo.');
                    return;
                }
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
    btnCrearCuenta.addEventListener('click', async () => {
        const username = document.getElementById('username-login').value.trim();
        const email = document.getElementById('email-login').value.trim();
        const pass = document.getElementById('password-login').value;

        if (!username) { mostrarMensajeLogin('Elegí un nombre de usuario.'); return; }
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
            mostrarMensajeLogin('El nombre de usuario debe tener 3-20 caracteres (letras, números o guion bajo).');
            return;
        }
        if (!email || !pass) { mostrarMensajeLogin('Completá correo y contraseña.'); return; }

        const usernameLower = username.toLowerCase();
        mostrarMensajeLogin('Verificando nombre de usuario...');
        try {
            const yaExiste = await db.collection('nombresUsuario').doc(usernameLower).get();
            if (yaExiste.exists) {
                mostrarMensajeLogin('Ese nombre de usuario ya está en uso, probá con otro.');
                return;
            }
        } catch (err) {
            mostrarMensajeLogin('No pudimos verificar el nombre de usuario, intentá de nuevo.');
            return;
        }

        mostrarMensajeLogin('Creando cuenta...');
        try {
            const cred = await auth.createUserWithEmailAndPassword(email, pass);
            await cred.user.updateProfile({ displayName: username });
            await db.collection('nombresUsuario').doc(usernameLower).set({ uid: cred.user.uid });
            await db.collection('usuarios').doc(cred.user.uid).set({
                email: email.toLowerCase(),
                username: usernameLower,
                usernameDisplay: username
            }, { merge: true });
        } catch (err) {
            mostrarMensajeLogin(traducirErrorFirebase(err));
        }
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
        if (btnLoginModal) btnLoginModal.textContent = '👤 ' + (user.displayName || user.email);
        if (modalLogin) modalLogin.classList.add('oculto');
        db.collection('usuarios').doc(user.uid).set({
            email: user.email.toLowerCase()
        }, { merge: true }).catch(err => {
            console.error('Error guardando email:', err);
            mostrarErrorGuardado(err);
        });
        if (contenidoInicialRenderizado) {
            cargarProgresoUsuario();
        } else {
            // Todavía no terminamos de dibujar las tarjetas; lo aplicamos
            // apenas termine el DOMContentLoaded, no antes.
            loginPendienteDeAplicar = true;
        }
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

// Algunos títulos cambiaron de nombre en el camino (ej: "Dune" pasó a llamarse
// "Dune: Parte Uno" cuando armamos la saga completa). Si alguien había marcado
// como visto el nombre VIEJO antes de ese cambio, hoy ya no coincide con nada
// y la marca queda "huérfana" — invisible en toda la app aunque siga guardada.
// Este mapa corrige automáticamente esos casos conocidos al cargar los datos.
const migracionTitulosViejos = {
    "Dune": "Dune: Parte Uno",
    "Dune: Part Two": "Dune: Parte Dos",
    "Injustice": "Injustice Movie",
    "Avengers: Los Héroes Más Poderosos de la Tierra (Tierra-8096)": "Avengers: Los Héroes Más Poderosos de la Tierra"
};

function cargarProgresoUsuario() {
    if (!usuarioActual) return;
    // Intentamos primero ir directo al servidor (dato más fresco posible,
    // sobre todo importante entre distintos dispositivos). Pero si eso falla
    // -algo que puede pasar justo al recargar la página, cuando la conexión
    // con Firebase todavía no terminó de establecerse- NO nos rendimos:
    // reintentamos con una lectura normal (que sí puede usar caché como
    // respaldo) en vez de perder los datos por completo.
    db.collection('usuarios').doc(usuarioActual.uid).get({ source: 'server' })
        .catch(() => db.collection('usuarios').doc(usuarioActual.uid).get())
        .then(doc => {
        const vistosGuardados = doc.exists ? (doc.data().vistos || []) : [];

        let huboMigracion = false;
        const vistosCorregidos = vistosGuardados.map(t => {
            if (migracionTitulosViejos[t]) {
                huboMigracion = true;
                return migracionTitulosViejos[t];
            }
            return t;
        });

        titulosVistosGuardados = new Set(vistosCorregidos);
        // Los logros que ya tenías desbloqueados no deben volver a notificarse
        logrosYaNotificados = new Set(logrosDisponibles.filter(l => l.condicion(titulosVistosGuardados)).map(l => l.id));
        aplicarVistosGuardados(document);
        actualizarTodasLasColecciones();
        renderizarLogros();

        // Si corregimos algo, lo guardamos ya mismo para no repetir esto en cada login
        if (huboMigracion) {
            db.collection('usuarios').doc(usuarioActual.uid).set({
                vistos: Array.from(titulosVistosGuardados)
            }, { merge: true }).catch(err => console.error('Error guardando migración de títulos:', err));
        }
    }).catch(err => {
        console.error('Error cargando progreso:', err);
        mostrarErrorGuardado(err);
    });
}

function guardarProgresoUsuario(titulos, marcado) {
    // Acepta un título (string) o varios (array, para la cascada de colecciones)
    const listaTitulos = Array.isArray(titulos) ? titulos : (titulos ? [titulos] : []);

    listaTitulos.forEach(t => {
        if (marcado) titulosVistosGuardados.add(t);
        else titulosVistosGuardados.delete(t);
    });
    renderizarLogros();

    if (!usuarioActual) return;
    const idsLogros = logrosDisponibles.filter(l => l.condicion(titulosVistosGuardados)).map(l => l.id);

    const actualizacion = { logros: idsLogros };
    if (listaTitulos.length > 0) {
        // arrayUnion/arrayRemove son operaciones ATÓMICAS del lado del servidor:
        // solo tocan los títulos indicados, nunca pisan la lista completa. Así,
        // aunque haya otra pestaña/dispositivo con datos desactualizados, un
        // guardado ahí nunca puede borrar lo que se guardó en otro lado.
        actualizacion.vistos = marcado
            ? firebase.firestore.FieldValue.arrayUnion(...listaTitulos)
            : firebase.firestore.FieldValue.arrayRemove(...listaTitulos);
    }

    guardadoEnProgreso = true;
    ultimoGuardadoPendiente = db.collection('usuarios').doc(usuarioActual.uid).set(actualizacion, { merge: true }).then(() => {
        ultimoGuardadoExitoso = true;
    }).catch(err => {
        console.error('Error guardando progreso:', err);
        mostrarErrorGuardado(err);
        ultimoGuardadoExitoso = false;
    }).finally(() => {
        guardadoEnProgreso = false;
    });
}

// Si intentás cerrar la pestaña/navegador justo mientras se está guardando
// algo en la nube, el navegador avisa para no perder ese último cambio
window.addEventListener('beforeunload', (e) => {
    if (guardadoEnProgreso) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// ==========================================
// LOGROS: RENDERIZADO
// ==========================================
function renderizarLogros() {
    const grilla = document.getElementById('grilla-logros');
    const mensaje = document.getElementById('mensaje-logros');

    const desbloqueados = logrosDisponibles.filter(l => l.condicion(titulosVistosGuardados));
    const idsDesbloqueados = new Set(desbloqueados.map(l => l.id));

    // Notifica cuando se consigue un logro nuevo. Si un logro que ya se había
    // notificado se pierde (ej: bajó el % por contenido nuevo agregado), se
    // "reactiva" para poder volver a notificarse el día que se recupere.
    logrosDisponibles.forEach(logro => {
        const cumple = idsDesbloqueados.has(logro.id);
        if (cumple && !logrosYaNotificados.has(logro.id)) {
            logrosYaNotificados.add(logro.id);
            mostrarNotificacionLogro(logro);
        } else if (!cumple && logrosYaNotificados.has(logro.id)) {
            logrosYaNotificados.delete(logro.id);
        }
    });

    if (!grilla) return;

    if (mensaje) {
        mensaje.textContent = usuarioActual
            ? `Desbloqueaste ${desbloqueados.length} de ${logrosDisponibles.length} logros.`
            : `Desbloqueaste ${desbloqueados.length} de ${logrosDisponibles.length} logros (iniciá sesión para guardarlos).`;
    }

    grilla.innerHTML = '';
    logrosDisponibles.forEach(logro => {
        const desbloqueado = idsDesbloqueados.has(logro.id);
        const porcentaje = porcentajesLogrosCache[logro.id];
        const textoRareza = porcentaje !== undefined
            ? `🌐 ${porcentaje}% de los usuarios lo tiene`
            : '🌐 Calculando...';
        grilla.insertAdjacentHTML('beforeend', `
            <div class="tarjeta-logro ${desbloqueado ? 'desbloqueado' : 'bloqueado'}">
                <div class="logro-icono">${logro.icono}</div>
                <h3>${logro.nombre}</h3>
                <p>${logro.descripcion}</p>
                <span class="logro-estado">${desbloqueado ? '✓ Desbloqueado' : '🔒 Bloqueado'}</span>
                <span class="logro-rareza">${textoRareza}</span>
            </div>
        `);
    });
}

// Consulta a todos los usuarios y calcula qué % tiene cada logro actualmente
let porcentajesLogrosCache = {};
async function calcularPorcentajesLogros() {
    if (!usuarioActual) return;
    try {
        const snap = await db.collection('usuarios').get();
        const totalUsuarios = snap.size;
        if (totalUsuarios === 0) return;

        const conteos = {};
        logrosDisponibles.forEach(l => { conteos[l.id] = 0; });

        snap.forEach(docSnap => {
            const logrosUsuario = docSnap.data().logros || [];
            logrosUsuario.forEach(id => {
                if (conteos.hasOwnProperty(id)) conteos[id]++;
            });
        });

        logrosDisponibles.forEach(l => {
            porcentajesLogrosCache[l.id] = Math.round((conteos[l.id] / totalUsuarios) * 100);
        });
        renderizarLogros();
    } catch (err) {
        console.error('Error calculando porcentajes de logros:', err);
    }
}

// Muestra un toast en pantalla cuando se desbloquea un logro
function mostrarNotificacionLogro(logro) {
    const cont = document.getElementById('contenedor-notificaciones-logros');
    if (!cont) return;
    const div = document.createElement('div');
    div.className = 'notificacion-logro';
    div.innerHTML = `
        <div class="logro-icono-notif">${logro.icono}</div>
        <div class="logro-texto-notif">
            <small>Logro desbloqueado</small>
            <strong>${logro.nombre}</strong>
        </div>
    `;
    cont.appendChild(div);
    setTimeout(() => div.remove(), 5100);
}

// Muestra el error real en pantalla (para poder diagnosticar sin consola, ej. en celular)
function mostrarErrorGuardado(err) {
    const cont = document.getElementById('contenedor-notificaciones-logros');
    const texto = (err && (err.code || err.message)) ? `${err.code || ''} ${err.message || ''}`.trim() : String(err);
    if (!cont) { alert('Error guardando: ' + texto); return; }
    const div = document.createElement('div');
    div.className = 'notificacion-logro notificacion-error';
    div.innerHTML = `
        <div class="logro-icono-notif">⚠️</div>
        <div class="logro-texto-notif">
            <small>No se pudo guardar</small>
            <strong>${texto}</strong>
        </div>
    `;
    cont.appendChild(div);
    div.addEventListener('click', () => div.remove());
    setTimeout(() => div.remove(), 15000);
}

const btnLogros = document.getElementById('btn-logros');
if (btnLogros) {
    btnLogros.addEventListener('click', () => {
        renderizarLogros();
        calcularPorcentajesLogros();
        cambiarSeccion(document.getElementById('seccion-logros'));
    });
}

const btnComics = document.getElementById('btn-comics');
if (btnComics) {
    btnComics.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-comics'));
    });
}

// ==========================================
// JUEGOS
// ==========================================

// --- Datos de elencos disponibles para "Completa el Elenco" ---
// Para agregar un nuevo elenco, sumar una entrada nueva a este objeto con el mismo formato.
const elencosDisponibles = {
    "avengers-era-ultron": {
        titulo: "Avengers: La Era de Ultron",
        icono: "🎬",
        personajes: [
            { id: "iron_man", nombreMostrado: "Iron Man", actor: "Robert Downey Jr.", color: "rgba(231, 76, 60, 0.45)", imagen: "https://i.ebayimg.com/images/g/-c0AAOSwNSxVQ7Kw/s-l1200.jpg", alias: ["iron man", "ironman", "tony stark", "tony", "stark", "robert downey jr", "rdj"],
              descripcionSinVer: "Genio multimillonario y filántropo que se convirtió en superhéroe gracias a su armadura tecnológica. Es el fundador de los Vengadores y uno de los héroes más reconocidos de la Tierra.",
              descripcionVista: "Su obsesión por proteger al mundo lo lleva a crear el programa Ultron sin consultar al resto del equipo, desatando una amenaza que pone en jaque a toda la humanidad." },
            { id: "capitan_america", nombreMostrado: "Capitán América", actor: "Chris Evans", color: "rgba(41, 128, 185, 0.45)", imagen: "https://static.posters.cz/image/750/24782.jpg", alias: ["capitan america", "captain america", "steve rogers", "steve", "rogers", "cap"],
              descripcionSinVer: "Súper soldado de la Segunda Guerra Mundial que despertó décadas después congelado en hielo. Es el líder moral de los Vengadores.",
              descripcionVista: "Steve se consolida como el verdadero líder del equipo, cuestionando las decisiones de Tony y manteniendo unido al grupo en medio de la crisis con Ultron." },
            { id: "hulk", nombreMostrado: "Hulk", actor: "Mark Ruffalo", color: "rgba(39, 174, 96, 0.45)", imagen: "https://i.ebayimg.com/images/g/IgMAAOSwoaJi9nS6/s-l400.jpg", alias: ["hulk", "bruce banner", "bruce", "banner"],
              descripcionSinVer: "Científico brillante que se transforma en una criatura verde imparable cuando se enoja. Lucha constantemente por controlar a la bestia que lleva dentro.",
              descripcionVista: "Bruce protagoniza una batalla descontrolada como Hulk en Johannesburgo y desarrolla una relación cercana con Natasha, quien es la única capaz de calmarlo." },
            { id: "thor", nombreMostrado: "Thor", actor: "Chris Hemsworth", color: "rgba(142, 68, 173, 0.45)", imagen: "https://www.mubis.es/media/users/9192/112988/jDukV3I-original.jpg", alias: ["thor", "thor odinson", "odinson", "dios del trueno"],
              descripcionSinVer: "Dios del Trueno de Asgard, poderoso guerrero que empuña el martillo Mjolnir. Defiende tanto su reino como la Tierra de amenazas cósmicas.",
              descripcionVista: "Thor investiga visiones relacionadas con las Gemas del Infinito y regresa brevemente a la Tierra en busca de respuestas, dejando entrever conflictos más grandes que se avecinan." },
            { id: "hawkeye", nombreMostrado: "Hawkeye", actor: "Jeremy Renner", color: "rgba(75, 0, 130, 0.45)", imagen: "https://media2.firstshowing.net/firstshowing/img8/HawkeyePosterartMainAUltronFull9b.jpg", alias: ["hawkeye", "ojo de halcon", "clint barton", "clint", "barton"],
              descripcionSinVer: "Arquero de puntería infalible y agente de S.H.I.E.L.D. Es uno de los miembros fundadores del equipo, sin poderes pero con habilidades letales.",
              descripcionVista: "Se revela que Clint tiene una familia secreta en una granja alejada de todo, lo que le da al equipo un refugio y muestra su lado más humano." },
            { id: "black_widow", nombreMostrado: "Black Widow", actor: "Scarlett Johansson", color: "rgba(139, 0, 0, 0.45)", imagen: "https://m.media-amazon.com/images/I/91+iqOflvPL.AC_UF894,1000_QL80.jpg", alias: ["black widow", "viuda negra", "natasha romanoff", "natasha", "romanoff"],
              descripcionSinVer: "Ex espía rusa convertida en agente de S.H.I.E.L.D. y Vengadora. Experta en combate cuerpo a cuerpo y manipulación estratégica.",
              descripcionVista: "Natasha profundiza su vínculo con Bruce Banner y revela parte de su oscuro pasado como parte del Programa Viuda Negra." },
            { id: "vision", nombreMostrado: "Vision", actor: "Paul Bettany", color: "rgba(212, 175, 55, 0.45)", imagen: "https://www.slashfilm.com/wp/wp-content/images/Vision-Character-Poster-Avengers-2.jpg", alias: ["vision"],
              descripcionSinVer: "Ser sintético creado a partir de tecnología e inteligencia artificial, dotado de una de las Gemas del Infinito. Es uno de los aliados más poderosos y enigmáticos del equipo.",
              descripcionVista: "Vision nace durante la película como resultado de un plan conjunto entre Tony Stark, Bruce Banner y el propio Ultron, y termina del lado de los Vengadores al demostrar ser digno de empuñar el martillo de Thor." },
            { id: "scarlet_witch", nombreMostrado: "Scarlet Witch", actor: "Elizabeth Olsen", color: "rgba(183, 28, 28, 0.45)", imagen: "https://i.pinimg.com/736x/a3/de/98/a3de9876bec6ce2bb033e15659565928.jpg", alias: ["scarlet witch", "bruja escarlata", "wanda maximoff", "wanda", "maximoff"],
              descripcionSinVer: "Joven con poderes de manipulación de la realidad y telequinesis, originaria de Sokovia. Su historia está marcada por la pérdida y el deseo de justicia.",
              descripcionVista: "Wanda comienza la película enfrentando a los Vengadores junto a Ultron, pero cambia de bando al descubrir las verdaderas intenciones destructivas del robot." },
            { id: "quicksilver", nombreMostrado: "Quicksilver", actor: "Aaron Taylor-Johnson", color: "rgba(127, 140, 141, 0.45)", imagen: "https://i.pinimg.com/736x/94/64/b9/9464b91bc6912cf41557575bee7d1bb8.jpg", alias: ["quicksilver", "mercurio", "pietro maximoff", "pietro"],
              descripcionSinVer: "Hermano de Wanda Maximoff, capaz de moverse a velocidades sobrehumanas. Comparte con ella un pasado marcado por la guerra en Sokovia.",
              descripcionVista: "Pietro se une a los Vengadores en la batalla final contra Ultron y sacrifica su vida para salvar a Hawkeye y a un grupo de civiles." },
            { id: "falcon", nombreMostrado: "Falcon", actor: "Anthony Mackie", color: "rgba(230, 126, 34, 0.45)", imagen: "https://i.pinimg.com/736x/5c/58/92/5c5892fd3c2aebb8cdb1ae74e5cd7e62.jpg", alias: ["falcon", "halcon", "sam wilson", "sam", "wilson"], ocultoSinVer: true,
              descripcionSinVer: "Ex paracaidista de las fuerzas armadas equipado con un traje alado de combate. Es aliado cercano del Capitán América.",
              descripcionVista: "Falcon aparece hacia el final de la película ayudando a los Vengadores tras la batalla, sumándose como refuerzo del nuevo equipo que se está formando." },
            { id: "war_machine", nombreMostrado: "War Machine", actor: "Don Cheadle", color: "rgba(93, 109, 126, 0.45)", imagen: "https://m.media-amazon.com/images/M/MV5BODY1MjA5MDgtMzZhZS00YjdhLTliYjktOWE5NTMzYzUxZmUxXkEyXkFqcGc@.V1.jpg", imagenClase: "recorte-war-machine", alias: ["war machine", "maquina de guerra", "james rhodes", "rhodey", "rhodes", "jim rhodes"],
              descripcionSinVer: "Mejor amigo de Tony Stark y piloto condecorado, equipado con una armadura de combate pesada similar a la de Iron Man.",
              descripcionVista: "Rhodey se incorpora oficialmente como miembro activo del equipo, luchando codo a codo con los Vengadores en la batalla final en Sokovia." }
        ]
    }
};

let elencoActualId = null;
let personajesEncontradosElenco = new Set();

function normalizarTextoJuego(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['’"]/g, '')
        .trim()
        .replace(/\s+/g, ' ');
}

function lanzarConfetiVerdeElenco() {
    const contenedor = document.getElementById('contenedor-confeti-elenco');
    if (!contenedor) return;

    const tonosVerdes = ['#2ecc71', '#27ae60', '#1abc9c', '#58d68d', '#0e6b3a', '#82e0aa'];
    const cantidadPiezas = 90;

    for (let i = 0; i < cantidadPiezas; i++) {
        const pieza = document.createElement('div');
        pieza.className = 'confeti-pieza';
        pieza.style.left = `${Math.random() * 100}vw`;
        pieza.style.backgroundColor = tonosVerdes[Math.floor(Math.random() * tonosVerdes.length)];
        pieza.style.animationDuration = `${2 + Math.random() * 1.5}s`;
        pieza.style.animationDelay = `${Math.random() * 0.4}s`;
        pieza.style.transform = `rotate(${Math.random() * 360}deg)`;
        contenedor.appendChild(pieza);

        setTimeout(() => pieza.remove(), 4500);
    }
}

function renderizarSelectorElencos() {
    const grilla = document.getElementById('grilla-elencos');
    if (!grilla) return;
    grilla.innerHTML = '';
    Object.entries(elencosDisponibles).forEach(([id, data]) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-juego';
        tarjeta.innerHTML = `
            <div class="icono-juego">${data.icono}</div>
            <h3>${data.titulo}</h3>
            <p>${data.personajes.length} personajes por adivinar</p>
        `;
        tarjeta.addEventListener('click', () => iniciarJuegoElenco(id));
        grilla.appendChild(tarjeta);
    });
}

function iniciarJuegoElenco(id) {
    const data = elencosDisponibles[id];
    if (!data) return;
    elencoActualId = id;
    personajesEncontradosElenco = new Set();

    document.getElementById('titulo-elenco-jugar').textContent = `Completa el Elenco: ${data.titulo}`;
    const mensaje = document.getElementById('mensaje-elenco');
    mensaje.textContent = '';
    mensaje.className = 'mensaje-elenco';
    document.getElementById('input-elenco').value = '';

    renderizarSlotsElenco();
    actualizarContadorElenco();
    cambiarSeccion(document.getElementById('seccion-elenco-jugar'));
}

function renderizarSlotsElenco() {
    const cont = document.getElementById('grilla-slots-elenco');
    if (!cont) return;
    const data = elencosDisponibles[elencoActualId];
    cont.innerHTML = '';
    data.personajes.forEach(p => {
        const slot = document.createElement('div');
        slot.className = 'slot-elenco';
        slot.dataset.personajeId = p.id;
        if (personajesEncontradosElenco.has(p.id)) {
            slot.classList.add('resuelto');
            if (p.imagen) {
                slot.innerHTML = `
                    <img class="imagen-personaje-slot ${p.imagenClase || ''}" src="${p.imagen}" alt="${p.nombreMostrado}">
                    <div class="caption-personaje-slot">
                        <span class="nombre-personaje-slot">${p.nombreMostrado}</span>
                        <span class="actor-personaje-slot">${p.actor}</span>
                    </div>
                `;
            } else {
                slot.innerHTML = `
                    <div class="caption-personaje-slot" style="position:static; background:transparent;">
                        <span class="nombre-personaje-slot">${p.nombreMostrado}</span>
                        <span class="actor-personaje-slot">${p.actor}</span>
                    </div>
                `;
            }
        } else {
            slot.innerHTML = `<span class="signo-interrogacion">?</span>`;
        }
        cont.appendChild(slot);
    });
}

function actualizarContadorElenco() {
    const data = elencosDisponibles[elencoActualId];
    const contador = document.getElementById('contador-elenco');
    if (contador) contador.textContent = `${personajesEncontradosElenco.size}/${data.personajes.length} encontrados`;
}

function pedirPistaElenco() {
    const data = elencosDisponibles[elencoActualId];
    const mensaje = document.getElementById('mensaje-elenco');
    const faltantes = data.personajes.filter(p => !personajesEncontradosElenco.has(p.id));

    if (faltantes.length <= 1) {
        mensaje.textContent = faltantes.length === 0
            ? 'Ya completaste el elenco, no hay más pistas para dar.'
            : 'Solo falta uno, ¡ese te lo tenés que jugar solo!';
        mensaje.className = 'mensaje-elenco aviso';
        return;
    }

    const elegido = faltantes[Math.floor(Math.random() * faltantes.length)];
    const slot = document.querySelector(`.slot-elenco[data-personaje-id="${elegido.id}"]`);
    if (slot && !slot.classList.contains('con-pista')) {
        slot.style.boxShadow = `inset 4px 0 0 0 ${elegido.color}`;
        slot.classList.add('con-pista');
    }
    mensaje.textContent = '💡 Pista revelada en uno de los casilleros vacíos.';
    mensaje.className = 'mensaje-elenco aviso';
}

function intentarAdivinarElenco() {
    const input = document.getElementById('input-elenco');
    const valorNormalizado = normalizarTextoJuego(input.value);
    const mensaje = document.getElementById('mensaje-elenco');
    if (!valorNormalizado) return;

    const data = elencosDisponibles[elencoActualId];
    const encontrado = data.personajes.find(p =>
        p.alias.some(alias => normalizarTextoJuego(alias) === valorNormalizado)
    );

    if (!encontrado) {
        mensaje.textContent = `❌ "${input.value}" no forma parte de este elenco (o revisá cómo lo escribiste).`;
        mensaje.className = 'mensaje-elenco error';
    } else if (personajesEncontradosElenco.has(encontrado.id)) {
        mensaje.textContent = `Ya habías adivinado a ${encontrado.nombreMostrado}.`;
        mensaje.className = 'mensaje-elenco aviso';
    } else {
        personajesEncontradosElenco.add(encontrado.id);
        renderizarSlotsElenco();
        actualizarContadorElenco();

        if (personajesEncontradosElenco.size === data.personajes.length) {
            mensaje.textContent = `🎉 ¡Completaste el elenco de ${data.titulo}!`;
            mensaje.className = 'mensaje-elenco victoria';
            lanzarConfetiVerdeElenco();
        } else {
            mensaje.textContent = `✅ ¡Correcto! ${encontrado.nombreMostrado}`;
            mensaje.className = 'mensaje-elenco exito';
        }
    }

    input.value = '';
    input.focus();
}

const btnJuegos = document.getElementById('btn-juegos');
if (btnJuegos) {
    btnJuegos.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-juegos'));
    });
}

const tarjetaCompletarElenco = document.getElementById('tarjeta-completar-elenco');
if (tarjetaCompletarElenco) {
    tarjetaCompletarElenco.addEventListener('click', () => {
        renderizarSelectorElencos();
        cambiarSeccion(document.getElementById('seccion-elenco-selector'));
    });
}

const btnVolverJuegosDesdeSelector = document.getElementById('btn-volver-juegos-desde-selector');
if (btnVolverJuegosDesdeSelector) {
    btnVolverJuegosDesdeSelector.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-juegos'));
    });
}

const btnVolverElencoSelector = document.getElementById('btn-volver-elenco-selector');
if (btnVolverElencoSelector) {
    btnVolverElencoSelector.addEventListener('click', () => {
        renderizarSelectorElencos();
        cambiarSeccion(document.getElementById('seccion-elenco-selector'));
    });
}

const btnAdivinarElenco = document.getElementById('btn-adivinar-elenco');
if (btnAdivinarElenco) {
    btnAdivinarElenco.addEventListener('click', intentarAdivinarElenco);
}

const btnPistaElenco = document.getElementById('btn-pista-elenco');
if (btnPistaElenco) {
    btnPistaElenco.addEventListener('click', pedirPistaElenco);
}

const inputElenco = document.getElementById('input-elenco');
if (inputElenco) {
    inputElenco.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            intentarAdivinarElenco();
        }
    });
}

// ==========================================
// JUEGO "NOMBRALOS" (Green Lantern Corps, contra el reloj)
// ==========================================
const personajesNombralosLinternas = [
    { id: "alan_scott", nombreMostrado: "Alan Scott", alias: ["alan scott", "alan"], imagen: "https://i.pinimg.com/736x/c2/3a/b1/c23ab102b1df03f91272c9feffb510b4.jpg" },
    { id: "hal_jordan", nombreMostrado: "Hal Jordan", alias: ["hal jordan", "hal"], imagen: "https://i.pinimg.com/736x/eb/3d/27/eb3d27ed19e23cb4ff4e128545507bcb.jpg" },
    { id: "john_stewart", nombreMostrado: "John Stewart", alias: ["john stewart", "john"], imagen: "https://i.pinimg.com/236x/73/35/ec/7335ec9493653860d5930c85c5fbb3dd.jpg" },
    { id: "guy_gardner", nombreMostrado: "Guy Gardner", alias: ["guy gardner", "guy"], imagen: "https://i.pinimg.com/originals/14/1d/5d/141d5d996cfa0bac3526bfdce4935ff1.jpg" },
    { id: "kyle_rayner", nombreMostrado: "Kyle Rayner", alias: ["kyle rayner", "kyle"], imagen: "https://i.pinimg.com/736x/ca/85/61/ca8561ae6c0b568c273527f54d40de8f.jpg" },
    { id: "simon_baz", nombreMostrado: "Simon Baz", alias: ["simon baz", "simon"], imagen: "https://i.pinimg.com/474x/9b/6e/04/9b6e04e81ff615b706611ab04182a584.jpg" },
    { id: "jessica_cruz", nombreMostrado: "Jessica Cruz", alias: ["jessica cruz", "jessica"], imagen: "https://i.pinimg.com/originals/b3/08/64/b30864c16110417e76f999d07bf586a2.jpg" },
    { id: "keli_quintela", nombreMostrado: "Keli Quintela", alias: ["keli quintela", "keli"], imagen: "https://i.pinimg.com/736x/8a/c7/da/8ac7da4ce26febe09d6f2e7bb4b6e292.jpg" },
    { id: "abin_sur", nombreMostrado: "Abin Sur", alias: ["abin sur", "abin"], imagen: "https://i.pinimg.com/474x/c0/c6/16/c0c616ab22771b6ad3f28c81b8c6aba3.jpg" },
    { id: "tomar_re", nombreMostrado: "Tomar-Re", alias: ["tomar-re", "tomar re", "tomarre"], imagen: "https://i.pinimg.com/originals/6a/50/03/6a50031541cd8b665f0dc585b4eeabc2.png" },
    { id: "sinestro", nombreMostrado: "Sinestro", alias: ["sinestro"], imagen: "https://i.pinimg.com/236x/5f/c8/9e/5fc89e02c1f14b4f2cc75d2621e1e28c.jpg" },
    { id: "kilowog", nombreMostrado: "Kilowog", alias: ["kilowog"], imagen: "https://i.pinimg.com/736x/80/4a/79/804a796a45a2d28bf1315b935e005a72.jpg" },
    { id: "salaak", nombreMostrado: "Salaak", alias: ["salaak"], imagen: "https://i.pinimg.com/564x/2c/f8/c0/2cf8c0efb523bbbe7394709fbbd0d247.jpg" },
    { id: "mogo", nombreMostrado: "Mogo", alias: ["mogo"], imagen: "https://i.pinimg.com/736x/5e/b8/62/5eb862a6a5cceeb3146818255325b669.jpg" },
    { id: "katma_tui", nombreMostrado: "Katma Tui", alias: ["katma tui", "katma"], imagen: "https://i.pinimg.com/474x/42/f1/3b/42f13b08e701e716d57d36bd5a47b8d4.jpg" },
    { id: "arisia_rrab", nombreMostrado: "Arisia Rrab", alias: ["arisia rrab", "arisia"], imagen: "https://i.pinimg.com/474x/69/0f/b6/690fb67c0ece208c0fa95c249be6a082.jpg" },
    { id: "chp", nombreMostrado: "Ch'p", alias: ["ch'p", "chp", "chip"], imagen: "https://static.wikia.nocookie.net/injusticegodsamongus/images/4/45/Ch%27p_injustice_comic.jpg/revision/latest?cb=20140527174600" },
    { id: "bdg", nombreMostrado: "B'dg", alias: ["b'dg", "bdg"], imagen: "https://i.pinimg.com/474x/de/59/e5/de59e5cc493ca77bdc9f0026b16f18b9.jpg" },
    { id: "sodam_yat", nombreMostrado: "Sodam Yat", alias: ["sodam yat", "sodam"], imagen: "https://i.pinimg.com/originals/a1/06/8f/a1068f5a50e9d75b28d594116133d199.jpg" },
    { id: "soranik_natu", nombreMostrado: "Soranik Natu", alias: ["soranik natu", "soranik"], imagen: "https://i.pinimg.com/474x/4f/ff/3b/4fff3b9de6d6212e61ab3acace357835.jpg" },
    { id: "hannu", nombreMostrado: "Hannu", alias: ["hannu"], imagen: "https://i.pinimg.com/736x/b4/ca/1a/b4ca1a9d09a6029880de6cc21da278fc.jpg" },
    { id: "laira", nombreMostrado: "Laira", alias: ["laira"], imagen: "https://i.pinimg.com/474x/a7/a0/64/a7a06451181e500ffba23914a78c5f36.jpg" },
    { id: "boodikka", nombreMostrado: "Boodikka", alias: ["boodikka"], imagen: "https://i.pinimg.com/originals/d0/fb/e5/d0fbe572f58dc5ea0d5f74d8964e8cb8.jpg" },
    { id: "stel", nombreMostrado: "Stel", alias: ["stel"], imagen: "https://comicvine.gamespot.com/a/uploads/original/3/35127/778285-stel.png" },
    { id: "isamot_kol", nombreMostrado: "Isamot Kol", alias: ["isamot kol", "isamot"], imagen: "https://upload.wikimedia.org/wikipedia/en/6/6b/Isamot_Kol.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" },
    { id: "vath_sarn", nombreMostrado: "Vath Sarn", alias: ["vath sarn", "vath"], imagen: "https://i.pinimg.com/736x/41/9b/1c/419b1c801d09cb2fcea75b800ed2e170.jpg" },
    { id: "iolande", nombreMostrado: "Iolande", alias: ["iolande"], imagen: "https://i.pinimg.com/474x/0b/3f/1c/0b3f1c9586e73bb5b6792a3b209b7e3a.jpg" },
    { id: "rot_lop_fan", nombreMostrado: "Rot Lop Fan", alias: ["rot lop fan"], imagen: "https://i.pinimg.com/474x/96/bd/89/96bd8916a648b50448ff40dc04280566.jpg" },
    { id: "medphyll", nombreMostrado: "Medphyll", alias: ["medphyll"], imagen: "https://static.wikia.nocookie.net/marvel_dc/images/8/84/Medphyll_01.jpg/revision/latest?cb=20120908142349" },
    { id: "chaselon", nombreMostrado: "Chaselon", alias: ["chaselon"], imagen: "https://i.pinimg.com/736x/4e/12/fc/4e12fc1a20411e97489c0978e119b08a.jpg" },
    { id: "gnort", nombreMostrado: "G'nort", alias: ["g'nort", "gnort"], imagen: "https://i.pinimg.com/474x/92/43/92/92439201b2eed87fdef9eb4e5ca5a8bc.jpg" },
    { id: "xax", nombreMostrado: "Xax", alias: ["xax"], imagen: "https://i.pinimg.com/474x/8c/cd/87/8ccd87c4b7e2bb8387acba5fb2124bd2.jpg" },
    { id: "green_loontern", nombreMostrado: "Green Loontern", alias: ["green loontern", "pato lucas", "daffy duck", "duck lantern"], imagen: "https://i.pinimg.com/736x/8d/61/83/8d618315bfda3de16614a9247479e880.jpg" },
    { id: "yalan_gur", nombreMostrado: "Yalan Gur", alias: ["yalan gur", "yalan"], imagen: "https://static.wikia.nocookie.net/dccu/images/e/ea/Yalan_Gur.jpg/revision/latest?cb=20180323175101" }
];

let personajesEncontradosNombralos = new Set();
let tiempoRestanteNombralos = 60;
let intervaloNombralos = null;
let juegoNombralosActivo = false;

function renderizarSlotsNombralos() {
    const cont = document.getElementById('grilla-slots-nombralos');
    if (!cont) return;
    cont.innerHTML = '';
    personajesNombralosLinternas.forEach(p => {
        const slot = document.createElement('div');
        slot.className = 'slot-elenco';
        slot.dataset.personajeId = p.id;
        if (personajesEncontradosNombralos.has(p.id)) {
            slot.classList.add('resuelto');
            slot.innerHTML = `
                <img class="imagen-personaje-slot" src="${p.imagen}" alt="${p.nombreMostrado}">
                <div class="caption-personaje-slot">
                    <span class="nombre-personaje-slot">${p.nombreMostrado}</span>
                </div>
            `;
        } else {
            slot.innerHTML = `<span class="signo-interrogacion">?</span>`;
        }
        cont.appendChild(slot);
    });
}

function actualizarContadorNombralos() {
    const contador = document.getElementById('contador-nombralos');
    if (contador) contador.textContent = `${personajesEncontradosNombralos.size}/${personajesNombralosLinternas.length} encontrados`;
}

function reiniciarPantallaNombralos() {
    personajesEncontradosNombralos = new Set();
    tiempoRestanteNombralos = 60;
    juegoNombralosActivo = false;
    if (intervaloNombralos) clearInterval(intervaloNombralos);

    const timer = document.getElementById('timer-nombralos');
    if (timer) { timer.textContent = '60'; timer.classList.remove('tiempo-poco'); }

    const input = document.getElementById('input-nombralos');
    const btnAdivinar = document.getElementById('btn-adivinar-nombralos');
    const btnEmpezar = document.getElementById('btn-empezar-nombralos');
    if (input) { input.value = ''; input.disabled = true; }
    if (btnAdivinar) btnAdivinar.disabled = true;
    if (btnEmpezar) { btnEmpezar.disabled = false; btnEmpezar.textContent = '▶️ Empezar'; }

    const mensaje = document.getElementById('mensaje-nombralos');
    if (mensaje) { mensaje.textContent = ''; mensaje.className = 'mensaje-elenco'; }
    const promedio = document.getElementById('promedio-nombralos');
    if (promedio) promedio.textContent = '';

    renderizarSlotsNombralos();
    actualizarContadorNombralos();
}

function empezarJuegoNombralos() {
    reiniciarPantallaNombralos();
    juegoNombralosActivo = true;

    const input = document.getElementById('input-nombralos');
    const btnAdivinar = document.getElementById('btn-adivinar-nombralos');
    const btnEmpezar = document.getElementById('btn-empezar-nombralos');
    if (input) { input.disabled = false; input.focus(); }
    if (btnAdivinar) btnAdivinar.disabled = false;
    if (btnEmpezar) btnEmpezar.disabled = true;

    const timer = document.getElementById('timer-nombralos');
    intervaloNombralos = setInterval(() => {
        tiempoRestanteNombralos--;
        if (timer) {
            timer.textContent = tiempoRestanteNombralos;
            if (tiempoRestanteNombralos <= 10) timer.classList.add('tiempo-poco');
        }
        if (tiempoRestanteNombralos <= 0) {
            finalizarJuegoNombralos();
        }
    }, 1000);
}

function intentarAdivinarNombralos() {
    if (!juegoNombralosActivo) return;
    const input = document.getElementById('input-nombralos');
    const valorNormalizado = normalizarTextoJuego(input.value);
    const mensaje = document.getElementById('mensaje-nombralos');
    if (!valorNormalizado) return;

    const encontrado = personajesNombralosLinternas.find(p =>
        p.alias.some(alias => normalizarTextoJuego(alias) === valorNormalizado)
    );

    if (!encontrado) {
        mensaje.textContent = `❌ "${input.value}" no es un Green Lantern reconocido.`;
        mensaje.className = 'mensaje-elenco error';
    } else if (personajesEncontradosNombralos.has(encontrado.id)) {
        mensaje.textContent = `Ya habías nombrado a ${encontrado.nombreMostrado}.`;
        mensaje.className = 'mensaje-elenco aviso';
    } else {
        personajesEncontradosNombralos.add(encontrado.id);
        renderizarSlotsNombralos();
        actualizarContadorNombralos();
        mensaje.textContent = `✅ ¡${encontrado.nombreMostrado}!`;
        mensaje.className = 'mensaje-elenco exito';

        if (personajesEncontradosNombralos.size === personajesNombralosLinternas.length) {
            finalizarJuegoNombralos();
        }
    }

    input.value = '';
    input.focus();
}

function finalizarJuegoNombralos() {
    if (!juegoNombralosActivo) return;
    juegoNombralosActivo = false;
    if (intervaloNombralos) clearInterval(intervaloNombralos);

    const input = document.getElementById('input-nombralos');
    const btnAdivinar = document.getElementById('btn-adivinar-nombralos');
    const btnEmpezar = document.getElementById('btn-empezar-nombralos');
    if (input) input.disabled = true;
    if (btnAdivinar) btnAdivinar.disabled = true;
    if (btnEmpezar) { btnEmpezar.disabled = false; btnEmpezar.textContent = '🔁 Jugar de nuevo'; }

    const timer = document.getElementById('timer-nombralos');
    if (timer) timer.textContent = '0';

    const puntajeFinal = personajesEncontradosNombralos.size;
    const mensaje = document.getElementById('mensaje-nombralos');
    mensaje.textContent = `⏱️ ¡Se acabó el tiempo! Nombraste ${puntajeFinal} de ${personajesNombralosLinternas.length}.`;
    mensaje.className = 'mensaje-elenco victoria';

    guardarYMostrarPromedioNombralos(puntajeFinal);
}

// Guarda el puntaje de esta partida en un contador global compartido entre
// todos los usuarios, y muestra el promedio actualizado. No depende de estar
// logueado: es una estadística pública del juego, no del usuario.
function guardarYMostrarPromedioNombralos(puntajeFinal) {
    const promedioEl = document.getElementById('promedio-nombralos');
    const refStats = db.collection('estadisticas').doc('nombralos-linternas');

    refStats.set({
        totalPuntaje: firebase.firestore.FieldValue.increment(puntajeFinal),
        totalPartidas: firebase.firestore.FieldValue.increment(1)
    }, { merge: true }).then(() => {
        return refStats.get();
    }).then(doc => {
        if (!doc.exists || !promedioEl) return;
        const datos = doc.data();
        const promedio = datos.totalPartidas > 0 ? (datos.totalPuntaje / datos.totalPartidas) : 0;
        promedioEl.textContent = `📊 Promedio de todos los jugadores: ${promedio.toFixed(1)} personajes (sobre ${datos.totalPartidas} partidas jugadas).`;
    }).catch(err => {
        console.error('Error guardando estadística de Nombralos:', err);
    });
}

const tarjetaNombralos = document.getElementById('tarjeta-nombralos');
if (tarjetaNombralos) {
    tarjetaNombralos.addEventListener('click', () => {
        reiniciarPantallaNombralos();
        cambiarSeccion(document.getElementById('seccion-nombralos-jugar'));
    });
}

const btnVolverJuegosDesdeNombralos = document.getElementById('btn-volver-juegos-desde-nombralos');
if (btnVolverJuegosDesdeNombralos) {
    btnVolverJuegosDesdeNombralos.addEventListener('click', () => {
        if (intervaloNombralos) clearInterval(intervaloNombralos);
        juegoNombralosActivo = false;
        cambiarSeccion(document.getElementById('seccion-juegos'));
    });
}

const btnEmpezarNombralos = document.getElementById('btn-empezar-nombralos');
if (btnEmpezarNombralos) {
    btnEmpezarNombralos.addEventListener('click', empezarJuegoNombralos);
}

const btnAdivinarNombralos = document.getElementById('btn-adivinar-nombralos');
if (btnAdivinarNombralos) {
    btnAdivinarNombralos.addEventListener('click', intentarAdivinarNombralos);
}

const inputNombralos = document.getElementById('input-nombralos');
if (inputNombralos) {
    inputNombralos.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            intentarAdivinarNombralos();
        }
    });
}

const btnVolverDcComicsHub = document.getElementById('btn-volver-dc-comics-hub');
if(btnVolverDcComicsHub) {
    btnVolverDcComicsHub.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-comics'));
    });
}

const btnVolverDcCaminoHeroe = document.getElementById('btn-volver-dc-camino-heroe');
if(btnVolverDcCaminoHeroe) {
    btnVolverDcCaminoHeroe.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-comics-hub'));
    });
}

const btnVolverDcOrdenLectura = document.getElementById('btn-volver-dc-orden-lectura');
if(btnVolverDcOrdenLectura) {
    btnVolverDcOrdenLectura.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-comics-hub'));
    });
}

const btnVolverPostCrisisDc = document.getElementById('btn-volver-post-crisis-dc');
if(btnVolverPostCrisisDc) {
    btnVolverPostCrisisDc.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina'));
    });
}

const btnVolverInfiniteFrontierDc = document.getElementById('btn-volver-infinite-frontier-dc');
if(btnVolverInfiniteFrontierDc) {
    btnVolverInfiniteFrontierDc.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina'));
    });
}

const btnVolverElseworldsOtrosDc = document.getElementById('btn-volver-elseworlds-otros-dc');
if(btnVolverElseworldsOtrosDc) {
    btnVolverElseworldsOtrosDc.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina'));
    });
}

const btnVolverLosNuevos52DcArgentina = document.getElementById('btn-volver-los-nuevos-52-dc-argentina');
if(btnVolverLosNuevos52DcArgentina) {
    btnVolverLosNuevos52DcArgentina.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina'));
    });
}

const btnVolverDcArgentina = document.getElementById('btn-volver-dc-argentina');
if(btnVolverDcArgentina) {
    btnVolverDcArgentina.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-orden-lectura'));
    });
}

const btnVolverAbsoluteDc = document.getElementById('btn-volver-absolute-dc');
if(btnVolverAbsoluteDc) {
    btnVolverAbsoluteDc.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina'));
    });
}

const btnVolverRenacimientoDc = document.getElementById('btn-volver-renacimiento-dc');
if(btnVolverRenacimientoDc) {
    btnVolverRenacimientoDc.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina'));
    });
}

const btnVolverDcArgentinaCaminoHeroe = document.getElementById('btn-volver-dc-argentina-camino-heroe');
if(btnVolverDcArgentinaCaminoHeroe) {
    btnVolverDcArgentinaCaminoHeroe.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina'));
    });
}

const btnVolverCaminoHeroePrincipal = document.getElementById('btn-volver-camino-heroe-principal');
if(btnVolverCaminoHeroePrincipal) {
    btnVolverCaminoHeroePrincipal.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina-camino-heroe'));
    });
}

const btnVolverCaminoHeroeElseworlds = document.getElementById('btn-volver-camino-heroe-elseworlds');
if(btnVolverCaminoHeroeElseworlds) {
    btnVolverCaminoHeroeElseworlds.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina-camino-heroe'));
    });
}

const btnVolverDcArgentinaCaminoVillano = document.getElementById('btn-volver-dc-argentina-camino-villano');
if(btnVolverDcArgentinaCaminoVillano) {
    btnVolverDcArgentinaCaminoVillano.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina'));
    });
}

const btnVolverCaminoVillanoPrincipal = document.getElementById('btn-volver-camino-villano-principal');
if(btnVolverCaminoVillanoPrincipal) {
    btnVolverCaminoVillanoPrincipal.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina-camino-villano'));
    });
}

const btnVolverCaminoVillanoElseworlds = document.getElementById('btn-volver-camino-villano-elseworlds');
if(btnVolverCaminoVillanoElseworlds) {
    btnVolverCaminoVillanoElseworlds.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina-camino-villano'));
    });
}

const btnVolverNuevos52OrdenLectura = document.getElementById('btn-volver-nuevos-52-orden-lectura');
if(btnVolverNuevos52OrdenLectura) {
    btnVolverNuevos52OrdenLectura.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-argentina'));
    });
}

const btnVolverGreenLanternHalJordan = document.getElementById('btn-volver-green-lantern-hal-jordan');
if(btnVolverGreenLanternHalJordan) {
    btnVolverGreenLanternHalJordan.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-dc-camino-heroe'));
    });
}

const btnVolverMarvelComicsHub = document.getElementById('btn-volver-marvel-comics-hub');
if(btnVolverMarvelComicsHub) {
    btnVolverMarvelComicsHub.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-comics'));
    });
}

const btnVolverMarvelCaminoHeroe = document.getElementById('btn-volver-marvel-camino-heroe');
if(btnVolverMarvelCaminoHeroe) {
    btnVolverMarvelCaminoHeroe.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-marvel-comics-hub'));
    });
}

// ==========================================
// AMIGOS
// ==========================================
const btnAmigos = document.getElementById('btn-amigos');
if (btnAmigos) {
    btnAmigos.addEventListener('click', () => {
        if (!usuarioActual) {
            cambiarSeccion(document.getElementById('seccion-amigos'));
            const msg = document.getElementById('mensaje-amigos');
            if (msg) msg.textContent = 'Iniciá sesión para poder agregar amigos.';
            return;
        }
        cargarSolicitudesRecibidas();
        cargarMisAmigos();
        cambiarSeccion(document.getElementById('seccion-amigos'));
    });
}

const btnEnviarSolicitud = document.getElementById('btn-enviar-solicitud');
if (btnEnviarSolicitud) {
    btnEnviarSolicitud.addEventListener('click', enviarSolicitudAmistad);
}

async function enviarSolicitudAmistad() {
    const inputUsername = document.getElementById('buscar-amigo-username');
    const msg = document.getElementById('mensaje-amigos');
    const usernameBuscado = inputUsername.value.trim().toLowerCase();

    if (!usuarioActual) { msg.textContent = 'Tenés que iniciar sesión primero.'; return; }
    if (!usernameBuscado) { msg.textContent = 'Escribí un nombre de usuario.'; return; }
    if (usernameBuscado === (usuarioActual.displayName || '').toLowerCase()) { msg.textContent = 'Ese sos vos 😅'; return; }

    msg.textContent = 'Buscando...';
    try {
        const nombreDoc = await db.collection('nombresUsuario').doc(usernameBuscado).get();
        if (!nombreDoc.exists) { msg.textContent = 'No encontramos a nadie con ese nombre de usuario.'; return; }
        const destinoUid = nombreDoc.data().uid;
        if (destinoUid === usuarioActual.uid) { msg.textContent = 'Ese sos vos 😅'; return; }

        const amistadId = [usuarioActual.uid, destinoUid].sort().join('_');
        const amistadDoc = await db.collection('amistades').doc(amistadId).get();
        if (amistadDoc.exists) { msg.textContent = 'Ya son amigos.'; return; }

        const existente = await db.collection('solicitudes')
            .where('de', '==', usuarioActual.uid)
            .where('para', '==', destinoUid)
            .get();
        if (!existente.empty) { msg.textContent = 'Ya le enviaste una solicitud a esa persona.'; return; }

        await db.collection('solicitudes').add({
            de: usuarioActual.uid,
            deUsername: usuarioActual.displayName || usuarioActual.email,
            para: destinoUid,
            paraUsername: usernameBuscado,
            estado: 'pendiente',
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        });
        msg.textContent = '¡Solicitud enviada!';
        inputUsername.value = '';
    } catch (err) {
        console.error('Error enviando solicitud:', err);
        msg.textContent = 'Ocurrió un error, intentá de nuevo.';
    }
}

async function cargarSolicitudesRecibidas() {
    if (!usuarioActual) return;
    const cont = document.getElementById('lista-solicitudes');
    if (!cont) return;
    cont.innerHTML = '<p style="color:#aaa;">Cargando...</p>';

    try {
        const snap = await db.collection('solicitudes')
            .where('para', '==', usuarioActual.uid)
            .where('estado', '==', 'pendiente')
            .get();

        if (snap.empty) {
            cont.innerHTML = '<p style="color:#aaa;">No tenés solicitudes pendientes.</p>';
            return;
        }

        cont.innerHTML = '';
        snap.forEach(docSnap => {
            const d = docSnap.data();
            const div = document.createElement('div');
            div.className = 'solicitud-item';
            div.innerHTML = `
                <span>${d.deUsername}</span>
                <div>
                    <button class="btn-aceptar-solicitud" data-id="${docSnap.id}" data-de="${d.de}">Aceptar</button>
                    <button class="btn-rechazar-solicitud" data-id="${docSnap.id}">Rechazar</button>
                </div>
            `;
            cont.appendChild(div);
        });

        cont.querySelectorAll('.btn-aceptar-solicitud').forEach(btn => {
            btn.addEventListener('click', async () => {
                const solicitudId = btn.getAttribute('data-id');
                const deUid = btn.getAttribute('data-de');
                const amistadId = [usuarioActual.uid, deUid].sort().join('_');
                try {
                    await db.collection('amistades').doc(amistadId).set({
                        miembros: [usuarioActual.uid, deUid]
                    });
                    await db.collection('solicitudes').doc(solicitudId).update({ estado: 'aceptada' });
                    cargarSolicitudesRecibidas();
                    cargarMisAmigos();
                } catch (err) {
                    console.error('Error aceptando solicitud:', err);
                }
            });
        });

        cont.querySelectorAll('.btn-rechazar-solicitud').forEach(btn => {
            btn.addEventListener('click', async () => {
                const solicitudId = btn.getAttribute('data-id');
                try {
                    await db.collection('solicitudes').doc(solicitudId).update({ estado: 'rechazada' });
                    cargarSolicitudesRecibidas();
                } catch (err) {
                    console.error('Error rechazando solicitud:', err);
                }
            });
        });
    } catch (err) {
        console.error('Error cargando solicitudes:', err);
        cont.innerHTML = '<p style="color:#aaa;">Ocurrió un error cargando las solicitudes.</p>';
    }
}

async function cargarMisAmigos() {
    if (!usuarioActual) return;
    const cont = document.getElementById('lista-amigos');
    if (!cont) return;
    cont.innerHTML = '<p style="color:#aaa;">Cargando...</p>';

    try {
        const snap = await db.collection('amistades')
            .where('miembros', 'array-contains', usuarioActual.uid)
            .get();

        if (snap.empty) {
            cont.innerHTML = '<p style="color:#aaa;">Todavía no tenés amigos agregados.</p>';
            return;
        }

        cont.innerHTML = '';
        for (const docSnap of snap.docs) {
            const d = docSnap.data();
            const amigoUid = d.miembros.find(m => m !== usuarioActual.uid);
            const amigoDoc = await db.collection('usuarios').doc(amigoUid).get();
            const amigoData = amigoDoc.exists ? amigoDoc.data() : {};
            const amigoNombre = amigoData.usernameDisplay || amigoData.email || amigoUid;

            const div = document.createElement('div');
            div.className = 'amigo-item';
            div.innerHTML = `
                <span>${amigoNombre}</span>
                <button class="btn-ver-biblioteca-amigo" data-uid="${amigoUid}" data-email="${amigoNombre}">Ver Biblioteca</button>
            `;
            cont.appendChild(div);
        }

        cont.querySelectorAll('.btn-ver-biblioteca-amigo').forEach(btn => {
            btn.addEventListener('click', () => {
                verBibliotecaAmigo(btn.getAttribute('data-uid'), btn.getAttribute('data-email'));
            });
        });
    } catch (err) {
        console.error('Error cargando amigos:', err);
        cont.innerHTML = '<p style="color:#aaa;">Ocurrió un error cargando tus amigos.</p>';
    }
}

async function verBibliotecaAmigo(uid, email) {
    const grilla = document.getElementById('grilla-biblioteca-amigo');
    const logrosCont = document.getElementById('logros-biblioteca-amigo');
    const titulo = document.getElementById('titulo-biblioteca-amigo');
    if (!grilla) return;

    grilla.innerHTML = '<p style="color:#aaa;">Cargando...</p>';
    logrosCont.innerHTML = '';
    titulo.textContent = 'Biblioteca de ' + email;
    cambiarSeccion(document.getElementById('seccion-biblioteca-amigo'));

    try {
        const doc = await db.collection('usuarios').doc(uid).get();
        const vistosAmigo = new Set(doc.exists ? (doc.data().vistos || []) : []);

        grilla.innerHTML = '';
        const titulosAgregados = new Set();
        const agregarSiVisto = (t, poster) => {
            if (vistosAmigo.has(t) && !titulosAgregados.has(t)) {
                titulosAgregados.add(t);
                grilla.insertAdjacentHTML('beforeend', `
                    <div class="tarjeta-media vista">
                        <img src="${poster}" alt="${t}">
                        <h3>${t}</h3>
                    </div>
                `);
            }
        };
        listaMedia.forEach(item => agregarSiVisto(item.titulo, item.poster));
        colecciones.forEach(col => {
            agregarSiVisto(col.titulo, col.poster);
            col.peliculas.forEach(p => agregarSiVisto(p.titulo, p.poster));
        });

        if (titulosAgregados.size === 0) {
            grilla.innerHTML = '<p style="color:#aaa;">Todavía no marcó nada como visto.</p>';
        }

        logrosDisponibles.forEach(logro => {
            if (logro.condicion(vistosAmigo)) {
                logrosCont.insertAdjacentHTML('beforeend', `<span class="chip-logro">${logro.icono} ${logro.nombre}</span>`);
            }
        });
    } catch (err) {
        console.error('Error cargando biblioteca del amigo:', err);
        grilla.innerHTML = '<p style="color:#aaa;">Ocurrió un error cargando esta biblioteca.</p>';
    }
}

const btnVolverBibliotecaAmigo = document.getElementById('btn-volver-biblioteca-amigo');
if (btnVolverBibliotecaAmigo) {
    btnVolverBibliotecaAmigo.addEventListener('click', () => {
        cambiarSeccion(document.getElementById('seccion-amigos'));
    });
}
