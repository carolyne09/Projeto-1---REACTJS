import Alert from "react-bootstrap/Alert";

function Erro({ mensagem }) {
    return (
        <Alert variant="danger" className="mt-4">
            {mensagem}
        </Alert>
    );
}

export default Erro;