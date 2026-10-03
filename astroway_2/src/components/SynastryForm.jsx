import { useState } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CIDADES from "../utils/cities";

function SynastryForm({ onSubmit, loading }) {
    const [pessoa1, setPessoa1] = useState({
        name: "",
        city: "",
        date: "",
        time: ""
    });

    const [pessoa2, setPessoa2] = useState({
        name: "",
        city: "",
        date: "",
        time: ""
    });

    function handleChangePessoa1(event) {
        const { name, value } = event.target;

        setPessoa1((estadoAnterior) => ({
            ...estadoAnterior,
            [name]: value
        }));
    }

    function handleChangePessoa2(event) {
        const { name, value } = event.target;

        setPessoa2((estadoAnterior) => ({
            ...estadoAnterior,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const cidadePessoa1 = CIDADES.find(
            (cidade) => cidade.valor === pessoa1.city
        );

        const cidadePessoa2 = CIDADES.find(
            (cidade) => cidade.valor === pessoa2.city
        );

        if (!cidadePessoa1 || !cidadePessoa2) {
            return;
        }

        const dadosPessoa1 = {
            name: pessoa1.name.trim(),
            city: cidadePessoa1.nome,
            date: pessoa1.date,
            time: `${pessoa1.time}:00`,
            timezoneOffset: Number(cidadePessoa1.timezoneOffset),
            latitude: cidadePessoa1.latitude,
            longitude: cidadePessoa1.longitude
        };

        const dadosPessoa2 = {
            name: pessoa2.name.trim(),
            city: cidadePessoa2.nome,
            date: pessoa2.date,
            time: `${pessoa2.time}:00`,
            timezoneOffset: Number(cidadePessoa2.timezoneOffset),
            latitude: cidadePessoa2.latitude,
            longitude: cidadePessoa2.longitude
        };

        onSubmit({
            pessoa1: dadosPessoa1,
            pessoa2: dadosPessoa2
        });
    }

    return (
        <Card className="shadow-sm border-0 mt-4">
            <Card.Body className="p-4 p-md-5">

                <Card.Title className="mb-2 text-center">
                    Compatibilidade entre duas pessoas
                </Card.Title>

                <p className="text-muted text-center mb-4">
                    Informe os dados de nascimento das duas pessoas.
                </p>

                <Form onSubmit={handleSubmit}>

                    <Row className="g-4">

                        <Col md={6}>
                            <Card className="h-100">
                                <Card.Body>

                                    <h5 className="mb-4">
                                        Pessoa 1
                                    </h5>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Nome
                                        </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={pessoa1.name}
                                            onChange={handleChangePessoa1}
                                            placeholder="Digite o nome"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Cidade de nascimento
                                        </Form.Label>

                                        <Form.Select
                                            name="city"
                                            value={pessoa1.city}
                                            onChange={handleChangePessoa1}
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
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Data
                                                </Form.Label>

                                                <Form.Control
                                                    type="date"
                                                    name="date"
                                                    value={pessoa1.date}
                                                    onChange={handleChangePessoa1}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Hora
                                                </Form.Label>

                                                <Form.Control
                                                    type="time"
                                                    name="time"
                                                    value={pessoa1.time}
                                                    onChange={handleChangePessoa1}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card className="h-100">
                                <Card.Body>

                                    <h5 className="mb-4">
                                        Pessoa 2
                                    </h5>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Nome
                                        </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={pessoa2.name}
                                            onChange={handleChangePessoa2}
                                            placeholder="Digite o nome"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Cidade de nascimento
                                        </Form.Label>

                                        <Form.Select
                                            name="city"
                                            value={pessoa2.city}
                                            onChange={handleChangePessoa2}
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
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Data
                                                </Form.Label>

                                                <Form.Control
                                                    type="date"
                                                    name="date"
                                                    value={pessoa2.date}
                                                    onChange={handleChangePessoa2}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Hora
                                                </Form.Label>

                                                <Form.Control
                                                    type="time"
                                                    name="time"
                                                    value={pessoa2.time}
                                                    onChange={handleChangePessoa2}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                    <div className="d-grid mt-4">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={loading}
                        >
                            {loading
                                ? "Calculando..."
                                : "Calcular compatibilidade"}
                        </Button>
                    </div>

                </Form>

            </Card.Body>
        </Card>
    );
}

export default SynastryForm;