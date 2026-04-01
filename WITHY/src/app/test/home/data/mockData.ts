export interface MovieItem {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    genre: string;
}

// Simulated data as if from dummy.sql
export const MOCK_MOVIES: MovieItem[] = [
    {
        id: 1,
        title: "Understanding of Omniscient Reader",
        poster_path: "https://image.tmdb.org/t/p/w500/zzVK06F2a0gqT15k9hT4t9Z5gXj.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
        genre: "Action"
    },
    {
        id: 2,
        title: "Venom: The Last Dance",
        poster_path: "https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
        genre: "Sci-Fi"
    },
    {
        id: 3,
        title: "Gladiator II",
        poster_path: "https://image.tmdb.org/t/p/w500/2cxhvwyEw9SzMdWq8Dn75h9JHTE.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/euYIwmwkmz95mnXfufEmbDS6C.jpg",
        genre: "History"
    },
    {
        id: 4,
        title: "Wicked",
        poster_path: "https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3y8qV.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/ukbK0mHjP7cixk8gL9mRkQ6YpM2.jpg",
        genre: "Fantasy"
    },
    {
        id: 5,
        title: "Moana 2",
        poster_path: "https://image.tmdb.org/t/p/w500/aLVkiINox5JlGuC2q18rT0WkUAA.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/tElnmtQ6yz1kgj64dvYchik9r9l.jpg",
        genre: "Animation"
    },
    {
        id: 6,
        title: "Mufasa: The Lion King",
        poster_path: "https://image.tmdb.org/t/p/w500/lurFKadeC70B1v8x7x0265XF6pE.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/rhc8Mtuo3Kh8CndllrTkQSefDT9.jpg",
        genre: "Adventure"
    },
    {
        id: 7,
        title: "Kraven the Hunter",
        poster_path: "https://image.tmdb.org/t/p/w500/i47IUSsN126K11JUzqQIOi1Mg1M.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/v9acaJ689jqJe33FNPHzdYayj8q.jpg",
        genre: "Action"
    },
    {
        id: 8,
        title: "Red One",
        poster_path: "https://image.tmdb.org/t/p/w500/cdqLnri3AZDqFqHrbz33qHv6b1t.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/cjEcqdRdPQJhYre3HUAc5538Gk8.jpg",
        genre: "Comedy"
    },
    {
        id: 9,
        title: "Smile 2",
        poster_path: "https://image.tmdb.org/t/p/w500/ht8Uv9QPv9Zh13u7pZqmF98UMxI.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
        genre: "Horror"
    },
    {
        id: 10,
        title: "The Wild Robot",
        poster_path: "https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/v9acaJ689jqJe33FNPHzdYayj8q.jpg",
        genre: "Animation"
    },
    {
        id: 11,
        title: "Substance",
        poster_path: "https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/7h6lC4KW5e4B4QG7w9k8F8m6d3.jpg",
        genre: "Drama"
    },
    {
        id: 12,
        title: "Alien: Romulus",
        poster_path: "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/9SSDqE3sF15MhO4eK8qJ9M.jpg",
        genre: "Sci-Fi"
    },
    {
        id: 13,
        title: "Deadpool & Wolverine",
        poster_path: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
        genre: "Action"
    }
];
