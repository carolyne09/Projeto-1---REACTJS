import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SolCard from "./SolCard";
import LuaCard from "./LuaCard";

function Ceu({ sol, lua }) {
    return (
        <Container className="mt-4">
            <h2 className="mb-4">
                Resumo do céu
            </h2>

            <Row className="g-4">
                <Col md={6}>
                    <SolCard
                        nascer={sol.nascer}
                        por={sol.por}
                        duracao={sol.duracao}
                    />
                </Col>

                <Col md={6}>
                    <LuaCard
                        fase={lua.fase}
                        iluminacao={lua.iluminacao}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Ceu;