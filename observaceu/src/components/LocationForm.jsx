import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function LocationForm({ onSearch }) {
    const [cidade, setCidade] = useState("");
    const [data, setData] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        onSearch({
            cidade,
            data
        });
    }

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title>
                    Consultar céu
                </Card.Title>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Cidade
                        </Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Digite a cidade"
                            value={cidade}
                            onChange={(event) =>
                                setCidade(event.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Data
                        </Form.Label>

                        <Form.Control
                            type="date"
                            value={data}
                            onChange={(event) =>
                                setData(event.target.value)
                            }
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Consultar céu
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default LocationForm;