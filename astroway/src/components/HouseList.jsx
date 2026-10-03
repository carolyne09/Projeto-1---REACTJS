import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
    getZodiacByLongitude,
    formatarGrau
} from "../utils/astrology";

function HouseList({ casas }) {
    if (!casas || !Array.isArray(casas.cusps)) {
        return null;
    }

    return (
        <section className="mb-5">

            <div className="mb-4">
                <h3 className="fw-bold mb-1">
                    Casas astrológicas
                </h3>

                <p className="text-muted">
                    Posições das cúspides das casas.
                </p>
            </div>

            <Row className="g-3">

                {casas.cusps.slice(0, 12).map(
                    (longitude, index) => {
                        const signo =
                            getZodiacByLongitude(
                                longitude
                            );

                        return (
                            <Col
                                xs={12}
                                sm={6}
                                lg={4}
                                xl={3}
                                key={index}
                            >
                                <Card className="h-100 shadow-sm border-0">
                                    <Card.Body>
                                        <small className="text-muted">
                                            Casa {index + 1}
                                        </small>

                                        <h5 className="mt-2">
                                            {signo.name}
                                        </h5>

                                        <p className="mb-0">
                                            {formatarGrau(
                                                longitude
                                            )}
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    }
                )}

            </Row>

        </section>
    );
}

export default HouseList;