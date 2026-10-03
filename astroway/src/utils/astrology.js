const ZODIAC_SIGNS = [
    {
        name: "Áries",
        slug: "aries"
    },
    {
        name: "Touro",
        slug: "taurus"
    },
    {
        name: "Gêmeos",
        slug: "gemini"
    },
    {
        name: "Câncer",
        slug: "cancer"
    },
    {
        name: "Leão",
        slug: "leo"
    },
    {
        name: "Virgem",
        slug: "virgo"
    },
    {
        name: "Libra",
        slug: "libra"
    },
    {
        name: "Escorpião",
        slug: "scorpio"
    },
    {
        name: "Sagitário",
        slug: "sagittarius"
    },
    {
        name: "Capricórnio",
        slug: "capricorn"
    },
    {
        name: "Aquário",
        slug: "aquarius"
    },
    {
        name: "Peixes",
        slug: "pisces"
    }
];

export function normalizarLongitude(longitude) {
    if (typeof longitude !== "number") {
        return 0;
    }

    const resultado = longitude % 360;

    return resultado < 0
        ? resultado + 360
        : resultado;
}

export function getZodiacByLongitude(longitude) {
    const longitudeNormalizada =
        normalizarLongitude(longitude);

    const indice = Math.floor(
        longitudeNormalizada / 30
    );

    const grau =
        longitudeNormalizada % 30;

    return {
        ...ZODIAC_SIGNS[indice],
        grau
    };
}

export function formatarGrau(longitude) {
    if (typeof longitude !== "number") {
        return "Não informado";
    }

    const signo =
        getZodiacByLongitude(longitude);

    return `${signo.grau.toFixed(2)}°`;
}

export function getSunSignFromChart(mapaAstral) {
    const planetas =
        mapaAstral?.planets || [];

    const sol = planetas.find(
        (planeta) =>
            planeta.name?.toLowerCase() === "sun"
    );

    if (!sol) {
        throw new Error(
            "Não foi possível identificar o signo solar."
        );
    }

    return getZodiacByLongitude(
        sol.longitude
    );
}