import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import {
    formatarGrau
} from "../utils/astrology";

function PlanetCard({ planeta }) {
    return (
        <Card className="h-100 shadow-sm border-0 planet-card">
            <Card.Body className="p-4">

                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">

                    <Card.Title className="mb-0">
                        {planeta.name}
                    </Card.Title>

                    {planeta.isRetrograde && (
                        <Badge bg="warning" text="dark">
                            Retrógrado
                        </Badge>
                    )}

                </div>

                <div className="mb-3">
                    <small className="text-muted d-block">
                        Signo
                    </small>

                    <strong>
                        {planeta.signo.name}
                    </strong>
                </div>

                <div className="mb-3">
                    <small className="text-muted d-block">
                        Longitude
                    </small>

                    <strong>
                        {formatarGrau(
                            planeta.longitude
                        )}
                    </strong>
                </div>

                {typeof planeta.speedLong === "number" && (
                    <div>
                        <small className="text-muted d-block">
                            Velocidade
                        </small>

                        <span>
                            {planeta.speedLong.toFixed(4)}°/dia
                        </span>
                    </div>
                )}

            </Card.Body>
        </Card>
    );
}

export default PlanetCard;