import { useState } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CIDADES from "../utils/cities";

function BirthForm({ onSubmit, loading }) {
    const [formulario, setFormulario] = useState({
        name: "",
        city: "",
        date: "",
        time: "",
        timezoneOffset: "-3"
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormulario((estadoAnterior) => ({
            ...estadoAnterior,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const cidadeSelecionada = CIDADES.find(
            (cidade) =>
                cidade.valor === formulario.city
        );

        if (!cidadeSelecionada) {
            return;
        }

        const dados = {
            name: formulario.name.trim(),
            city: cidadeSelecionada.nome,
            date: formulario.date,
            time: `${formulario.time}:00`,
            timezoneOffset:
                Number(cidadeSelecionada.timezoneOffset),
            latitude:
                cidadeSelecionada.latitude,
            longitude:
                cidadeSelecionada.longitude
        };

        onSubmit(dados);
    }

    return (
        <Card className="shadow-sm border-0">
            <Card.Body className="p-4 p-md-5">

                <Card.Title className="mb-4 text-center">
                    Seu Mapa Astral
                </Card.Title>

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Nome
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="name"
                            value={formulario.name}
                            onChange={handleChange}
                            placeholder="Digite seu nome"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Cidade de nascimento
                        </Form.Label>

                        <Form.Select
                            name="city"
                            value={formulario.city}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Selecione uma cidade
                            </option>

                            {CIDADES.map((cidade) => (
                                <option
                                    key={cidade.valor}
                                    value={cidade.valor}
                                >
                                    {cidade.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Data de nascimento
                                </Form.Label>

                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={formulario.date}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Hora de nascimento
                                </Form.Label>

                                <Form.Control
                                    type="time"
                                    name="time"
                                    value={formulario.time}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-grid">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={loading}
                        >
                            {loading
                                ? "Gerando mapa..."
                                : "Gerar mapa astral"}
                        </Button>
                    </div>

                </Form>

            </Card.Body>
        </Card>
    );
}

export default BirthForm;