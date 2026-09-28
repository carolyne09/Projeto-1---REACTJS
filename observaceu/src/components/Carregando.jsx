import Spinner from "react-bootstrap/Spinner";

function Carregando() {
    return (
        <div className="text-center my-5">
            <Spinner animation="border" />

            <p className="mt-3">
                Consultando informações astronômicas...
            </p>
        </div>
    );
}

export default Carregando;