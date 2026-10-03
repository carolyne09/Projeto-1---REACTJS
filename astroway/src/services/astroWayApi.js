const BASE_URL = "https://api.astroway.info/v1";

async function processarResposta(response) {
    let resultado;

    try {
        resultado = await response.json();
    } catch {
        throw new Error(
            "A API retornou uma resposta inválida."
        );
    }

    if (!response.ok || resultado.ok === false) {
        throw new Error(
            resultado.error?.message ||
            "A API retornou um erro."
        );
    }

    return resultado.data;
}

export async function gerarMapaAstral(dados) {
    const response = await fetch(
        `${BASE_URL}/public/chart`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: dados.name || "",
                city: dados.city || "",
                date: dados.date,
                time: dados.time,
                timezoneOffset: dados.timezoneOffset,
                latitude: dados.latitude,
                longitude: dados.longitude
            })
        }
    );

    return processarResposta(response);
}

export async function buscarFaseLua(date) {
    const url = new URL(
        `${BASE_URL}/public/moon-phase`
    );

    url.searchParams.set("date", date);
    url.searchParams.set("lang", "pt");

    const response = await fetch(
        url.toString(),
        {
            headers: {
                "Accept-Language": "pt-BR"
            }
        }
    );

    return processarResposta(response);
}

export async function buscarHoroscopoDiario(
    sign,
    date
) {
    const url = new URL(
        `${BASE_URL}/public/horoscope/daily`
    );

    url.searchParams.set("sign", sign);
    url.searchParams.set("date", date);
    url.searchParams.set("lang", "pt");

    const response = await fetch(
        url.toString(),
        {
            headers: {
                "Accept-Language": "pt-BR"
            }
        }
    );

    return processarResposta(response);
}