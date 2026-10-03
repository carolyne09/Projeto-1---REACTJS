import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

function traduzirFase(fase) {
    const fases = {
        "New Moon": "Lua Nova",
        "Waxing Crescent": "Lua Crescente",
        "First Quarter": "Quarto Crescente",
        "Waxing Gibbous": "Gibosa Crescente",
        "Full Moon": "Lua Cheia",
        "Waning Gibbous": "Gibosa Minguante",
        "Last Quarter": "Quarto Minguante",
        "Waning Crescent": "Lua Minguante"
    };

    return (
        fases[fase] ||
        fase ||
        "Não informado"
    );
}

function MoonPhaseCard({ faseLua }) {
    if (!faseLua) {
        return null;
    }

    const {
        phaseName,
        majorPhase,
        illuminationPercent,
        ageDays,
        waxing,
        moonSign,
        sunSign,
        elongationDeg
    } = faseLua;

    return (
        <Card className="shadow-sm border-0">

            <Card.Body className="p-4 p-md-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <Card.Title className="mb-0">
                        🌙 Fase da Lua
                    </Card.Title>

                    <Badge
                        bg={
                            waxing
                                ? "primary"
                                : "secondary"
                        }
                    >
                        {waxing
                            ? "Crescente"
                            : "Minguante"}
                    </Badge>

                </div>

                <div className="text-center mb-4">

                    <div
                        className="moon-icon"
                        aria-hidden="true"
                    >
                        🌙
                    </div>

                    <h3 className="mt-3 mb-1">
                        {traduzirFase(phaseName)}
                    </h3>

                    {majorPhase && (
                        <p className="text-muted mb-0">
                            {majorPhase}
                        </p>
                    )}

                </div>

                <Row className="g-3">

                    <Col xs={12} md={6}>
                        <div className="info-box">
                            <small>
                                Iluminação
                            </small>

                            <strong>
                                {illuminationPercent != null
                                    ? `${Number(
                                        illuminationPercent
                                    ).toFixed(2)}%`
                                    : "Não informado"}
                            </strong>
                        </div>
                    </Col>

                    <Col xs={12} md={6}>
                        <div className="info-box">
                            <small>
                                Idade da Lua
                            </small>

                            <strong>
                                {ageDays != null
                                    ? `${Number(
                                        ageDays
                                    ).toFixed(2)} dias`
                                    : "Não informado"}
                            </strong>
                        </div>
                    </Col>

                    <Col xs={12} md={6}>
                        <div className="info-box">
                            <small>
                                Signo da Lua
                            </small>

                            <strong>
                                {moonSign ||
                                    "Não informado"}
                            </strong>
                        </div>
                    </Col>

                    <Col xs={12} md={6}>
                        <div className="info-box">
                            <small>
                                Signo Solar
                            </small>

                            <strong>
                                {sunSign ||
                                    "Não informado"}
                            </strong>
                        </div>
                    </Col>

                    <Col xs={12} md={6}>
                        <div className="info-box">
                            <small>
                                Elongação
                            </small>

                            <strong>
                                {elongationDeg != null
                                    ? `${Number(
                                        elongationDeg
                                    ).toFixed(2)}°`
                                    : "Não informado"}
                            </strong>
                        </div>
                    </Col>

                </Row>

            </Card.Body>

        </Card>
    );
}

export default MoonPhaseCard;