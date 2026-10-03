import { useMemo, useState } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PlanetCard from "./PlanetCard";

import {
    getZodiacByLongitude
} from "../utils/astrology";

function PlanetList({ planetas }) {
    const [filtro, setFiltro] = useState("todos");

    const planetasProcessados = useMemo(() => {
        return planetas.map((planeta) => {
            const signo = getZodiacByLongitude(
                planeta.longitude
            );

            return {
                ...planeta,
                signo
            };
        });
    }, [planetas]);

    const planetasFiltrados = useMemo(() => {
        if (filtro === "retrogrados") {
            return planetasProcessados.filter(
                (planeta) => planeta.isRetrograde
            );
        }

        return planetasProcessados;
    }, [planetasProcessados, filtro]);

    return (
        <section className="mb-5">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                <div>
                    <h3 className="fw-bold mb-1">
                        Planetas
                    </h3>

                    <p className="text-muted mb-0">
                        Posições dos corpos celestes no mapa.
                    </p>
                </div>

                <Form.Select
                    value={filtro}
                    onChange={(event) =>
                        setFiltro(event.target.value)
                    }
                    className="filter-select"
                >
                    <option value="todos">
                        Todos os planetas
                    </option>

                    <option value="retrogrados">
                        Apenas retrógrados
                    </option>
                </Form.Select>

            </div>

            {planetasFiltrados.length === 0 ? (
                <p className="text-muted">
                    Nenhum planeta encontrado.
                </p>
            ) : (
                <Row className="g-4">
                    {planetasFiltrados.map((planeta) => (
                        <Col
                            key={planeta.id}
                            xs={12}
                            sm={6}
                            lg={4}
                        >
                            <PlanetCard
                                planeta={planeta}
                            />
                        </Col>
                    ))}
                </Row>
            )}

        </section>
    );
}

export default PlanetList;