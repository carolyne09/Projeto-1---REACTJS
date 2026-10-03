import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
    return (
        <Navbar
            expand="lg"
            bg="dark"
            variant="dark"
            className="shadow-sm"
        >
            <Container>
                <Navbar.Brand href="#">
                    ✨ AstroWay
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;