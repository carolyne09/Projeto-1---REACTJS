import Card from "react-bootstrap/Card";

import PlanetList from "./PlanetList";
import HouseList from "./HouseList";

import {
    formatarGrau,
    getZodiacByLongitude
} from "../utils/astrology";

function ChartSection({ mapaAstral }) {
    const planetas = mapaAstral?.planets || [];
    const casas = mapaAstral?.houses || null;

    const ascendente = casas?.ascendant;
    const meioCeu = casas?.mc;

    return (
        <section className="chart-section">

            <div className="text-center mb-5">
                <span className="section-label">
                    RESULTADO
                </span>

                <h2 className="fw-bold">
                    Seu mapa astral
                </h2>

                <p className="text-muted">
                    Posições planetárias, casas e aspectos.
                </p>
            </div>

            <Card className="shadow-sm border-0 mb-5">
                <Card.Body className="p-4">

                    <h3 className="h5 mb-4">
                        Pontos principais
                    </h3>

                    <div className="main-points">

                        <div className="main-point">
                            <span>
                                Ascendente
                            </span>

                            <strong>
                                {ascendente != null
                                    ? `${getZodiacByLongitude(ascendente).name} — ${formatarGrau(ascendente)}`
                                    : "Não informado"}
                            </strong>
                        </div>

                        <div className="main-point">
                            <span>
                                Meio do Céu
                            </span>

                            <strong>
                                {meioCeu != null
                                    ? `${getZodiacByLongitude(meioCeu).name} — ${formatarGrau(meioCeu)}`
                                    : "Não informado"}
                            </strong>
                        </div>

                    </div>

                </Card.Body>
            </Card>

            <PlanetList
                planetas={planetas}
            />

            <HouseList
                casas={casas}
            />

        </section>
    );
}

export default ChartSection;
