import { useMemo, useState } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Planetas ({ planetas }) {
    const [filtro, setFiltro] = useState("todos");

    const planetasFiltrados = useMemo(() => {
        if (filtro === "visiveis") {
            return planetas.filter(
                (planeta) => planeta.visivel
            );
        }

        return planetas;
    }, [planetas, filtro]);

    return (
        <section className="mt-5">
            <h2 className="mb-4">
                Planetas
            </h2>

            <Form.Select
                className="mb-4"
                value={filtro}
                onChange={(event) =>
                    setFiltro(event.target.value)
                }
            >
                <option value="todos">
                    Todos os planetas
                </option>

                <option value="visiveis">
                    Apenas visíveis
                </option>
            </Form.Select>

            <Row className="g-4">
                {planetasFiltrados.map((planeta) => (
                    <Col
                        key={planeta.id}
                        xs={12}
                        sm={6}
                        lg={4}
                    >
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>
                                    {planeta.nome}
                                </Card.Title>

                                <p>
                                    Visível:{" "}
                                    {planeta.visivel
                                        ? "Sim"
                                        : "Não"}
                                </p>
                                <p>
                                    Retrógrado:{" "}
                                    {planeta.retrogrado
                                        ? "Sim"
                                        : "Não"}
                                </p>
                                <p>
                                    Constelação: {planeta.constelacao}
                                </p>
                                <p>
                                    Magnitude:{" "}
                                    {planeta.magnitude != null
                                        ? planeta.magnitude
                                        : "Não disponível"}
                                </p>

                                <p>
                                    Distância:{" "}
                                    {planeta.distancia != null
                                        ? `${Math.round(planeta.distancia).toLocaleString("pt-BR")} km`
                                        : "Não disponível"}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </section>
    );
}

export default Planetas;
