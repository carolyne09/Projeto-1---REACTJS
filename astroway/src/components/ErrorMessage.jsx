import Alert from "react-bootstrap/Alert";

function ErrorMessage({ mensagem }) {
    if (!mensagem) {
        return null;
    }

    return (
        <Alert
            variant="danger"
            className="mt-4"
        >
            <Alert.Heading>
                Não foi possível realizar a consulta
            </Alert.Heading>

            <p className="mb-0">
                {mensagem}
            </p>
        </Alert>
    );
}

export default ErrorMessage;