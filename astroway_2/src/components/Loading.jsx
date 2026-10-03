import Spinner from "react-bootstrap/Spinner";

function Loading() {
    return (
        <div className="text-center py-5">

            <Spinner
                animation="border"
                role="status"
            />

            <p className="mt-3 text-muted">
                Consultando a AstroWay...
            </p>

        </div>
    );
}

export default Loading;