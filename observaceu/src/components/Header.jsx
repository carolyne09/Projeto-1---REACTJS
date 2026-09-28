import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
    return (
        <Navbar expand="lg" className="bg-dark navbar-dark">
            <Container>
                <Navbar.Brand href="#">
                    ObservaCéu
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;