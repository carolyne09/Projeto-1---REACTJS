import { useState } from "react";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import Header from "./components/Header";
import BirthForm from "./components/BirthForm";
import SynastryForm from "./components/SynastryForm";
import SynastryCard from "./components/SynastryCard";
import ChartSection from "./components/ChartSection";
import MoonPhaseCard from "./components/MoonPhaseCard";
import HoroscopeCard from "./components/HoroscopeCard";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

import {
    gerarMapaAstral,
    buscarFaseLua,
    buscarHoroscopoDiario,
    fazerSynastry
} from "./services/astroWayApi";

import {
    getSunSignFromChart
} from "./utils/astrology";

function App() {
    const [mapaAstral, setMapaAstral] = useState(null);
    const [faseLua, setFaseLua] = useState(null);
    const [horoscopo, setHoroscopo] = useState(null);
    const [synastry, setSynastry] = useState(null);

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [aviso, setAviso] = useState("");

    async function handleSubmit(dados) {
        setLoading(true);
        setErro("");
        setAviso("");

        setMapaAstral(null);
        setFaseLua(null);
        setHoroscopo(null);

        try {
            /*
             * POST
             * Gera o mapa natal.
             */
            const mapa = await gerarMapaAstral(dados);

            setMapaAstral(mapa);

            /*
             * Descobrimos o signo solar a partir
             * da longitude do Sol retornada pelo mapa.
             */
            const signoSolar = getSunSignFromChart(mapa);

            /*
             * GETs executados depois que o mapa
             * foi gerado.
             */
            const resultados = await Promise.allSettled([
                buscarFaseLua(dados.date),
                buscarHoroscopoDiario(signoSolar.slug, dados.date)
            ]);

            const [resultadoLua, resultadoHoroscopo] = resultados;

            const avisos = [];

            if (resultadoLua.status === "fulfilled") {
                setFaseLua(resultadoLua.value);
            } else {
                avisos.push(
                    "Não foi possível consultar a fase da Lua."
                );
            }

            if (resultadoHoroscopo.status === "fulfilled") {
                setHoroscopo(resultadoHoroscopo.value);
            } else {
                avisos.push(
                    "Não foi possível consultar o horóscopo."
                );
            }

            if (avisos.length > 0) {
                setAviso(avisos.join(" "));
            }
        } catch (error) {
            setErro(
                error.message ||
                "Ocorreu um erro ao consultar a AstroWay."
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleSynastrySubmit({ pessoa1, pessoa2 }) {
        setLoading(true);
        setErro("");

        try {
            const resultado = await fazerSynastry(
                pessoa1,
                pessoa2
            );

            console.log("Resultado da Synastry:", resultado);
            setSynastry(resultado);
        } catch (error) {
            setErro(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Header />

            <main>
                <Container className="py-5">

                    <section className="hero-section text-center mb-5">
                        <span className="hero-icon">
                            ✨
                        </span>

                        <h1 className="display-5 fw-bold">
                            AstroWay
                        </h1>

                        <p className="lead text-muted">
                            Gere seu mapa astral e consulte
                            informações astrológicas.
                        </p>
                    </section>

                    <section className="mb-5">
                        <BirthForm
                            onSubmit={handleSubmit}
                            loading={loading}
                        />
                        <SynastryForm
                            onSubmit={handleSynastrySubmit}
                            loading={loading}
                        />
                    </section>

                    {loading && (
                        <Loading />
                    )}

                    {!loading && erro && (
                        <ErrorMessage mensagem={erro} />
                    )}

                    {!loading && aviso && (
                        <Alert
                            variant="warning"
                            className="mt-4"
                        >
                            {aviso}
                        </Alert>
                    )}

                    {!loading && mapaAstral && (
                        <ChartSection
                            mapaAstral={mapaAstral}
                        />
                    )}

                    {!loading && faseLua && (
                        <section className="mt-5">
                            <MoonPhaseCard
                                faseLua={faseLua}
                            />
                        </section>
                    )}

                    {!loading && horoscopo && (
                        <section className="mt-5">
                            <HoroscopeCard
                                horoscopo={horoscopo}
                            />
                        </section>
                    )}

                    {!loading && synastry && (
                        <section className="mt-5">
                            <SynastryCard
                                synastry={synastry}
                            />
                        </section>
                    )}

                </Container>
            </main>
        </>
    );
}

export default App;
