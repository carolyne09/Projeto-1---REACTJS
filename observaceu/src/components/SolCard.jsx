import Card from "react-bootstrap/Card";

function SolCard({ nascer, por, duracao }) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body>
                <Card.Title>
                    Sol
                </Card.Title>

                <p>
                    <strong>Nascer:</strong> {nascer}
                </p>

                <p>
                    <strong>Pôr:</strong> {por}
                </p>

                <p>
                    <strong>Duração do dia:</strong> {duracao}
                </p>
            </Card.Body>
        </Card>
    );
}

export default SolCard;