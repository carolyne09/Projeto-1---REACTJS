import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function SynastryCard({ synastry }) {
    if (!synastry) {
        return null;
    }

    return (
        <Card className="shadow-sm border-0">
            <Card.Body className="p-4">

                <Card.Title className="mb-4">
                    Resultado da compatibilidade
                </Card.Title>

                <div className="mb-4">
                    <h5>
                        Pontuação: {synastry.score}
                    </h5>

                    <p className="text-muted mb-1">
                        Classificação:{" "}
                        <Badge bg="secondary">
                            {synastry.label}
                        </Badge>
                    </p>

                    <p className="text-muted">
                        Total de aspectos: {synastry.count}
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
}

export default SynastryCard;
