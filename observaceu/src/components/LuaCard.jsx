import Card from "react-bootstrap/Card";

function LuaCard({ fase, iluminacao }) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body>
                <Card.Title>
                    Lua
                </Card.Title>

                <p>
                    <strong>Fase:</strong> {fase}
                </p>

                <p>
                    <strong>Iluminação:</strong>{" "}
                    {iluminacao}%
                </p>
            </Card.Body>
        </Card>
    );
}

export default LuaCard;