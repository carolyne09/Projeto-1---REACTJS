import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function HoroscopeCard({ horoscopo }) {
    if (!horoscopo) {
        return null;
    }

    return (
        <Card className="shadow-sm border-0">

            <Card.Body className="p-4 p-md-5">

                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">

                    <div>
                        <span className="section-label">
                            HORÓSCOPO
                        </span>

                        <Card.Title className="h3 mt-2 mb-1">
                            Horóscopo diário
                        </Card.Title>

                        <p className="text-muted mb-0">
                            {horoscopo.date}
                        </p>
                    </div>

                    <Badge
                        bg="dark"
                        className="align-self-start"
                    >
                        {horoscopo.sign}
                    </Badge>

                </div>

                <div
                    className="horoscope-text"
                    style={{
                        whiteSpace: "pre-wrap"
                    }}
                >
                    {horoscopo.horoscope}
                </div>

                {horoscopo.disclaimer && (
                    <div className="mt-4 pt-4 border-top">
                        <small className="text-muted">
                            {horoscopo.disclaimer}
                        </small>
                    </div>
                )}

            </Card.Body>

        </Card>
    );
}

export default HoroscopeCard;