import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

function AspectList({ aspectos }) {
    if (!Array.isArray(aspectos) || aspectos.length === 0) {
        return null;
    }

    return (
        <section className="mb-5">

            <div className="mb-4">
                <h3 className="fw-bold mb-1">
                    Aspectos
                </h3>

                <p className="text-muted">
                    Relações angulares entre os planetas.
                </p>
            </div>

            <Card className="shadow-sm border-0">
                <Card.Body className="p-0">

                    <div className="table-responsive">
                        <Table
                            hover
                            responsive
                            className="mb-0 align-middle"
                        >
                            <thead>
                                <tr>
                                    <th>Planeta 1</th>
                                    <th>Aspecto</th>
                                    <th>Planeta 2</th>
                                    <th>Ângulo</th>
                                    <th>Orbe</th>
                                </tr>
                            </thead>

                            <tbody>
                                {aspectos
                                    .slice(0, 20)
                                    .map((aspecto, index) => (
                                        <tr key={index}>

                                            <td>
                                                {aspecto.planet1}
                                            </td>

                                            <td>
                                                <Badge bg={
                                                    aspecto.isMajor
                                                        ? "primary"
                                                        : "secondary"
                                                }>
                                                    {aspecto.type?.symbol || ""}
                                                    {" "}
                                                    {aspecto.type?.name || "Aspecto"}
                                                </Badge>
                                            </td>

                                            <td>
                                                {aspecto.planet2}
                                            </td>

                                            <td>
                                                {typeof aspecto.exactAngle === "number"
                                                    ? `${aspecto.exactAngle.toFixed(2)}°`
                                                    : "—"}
                                            </td>

                                            <td>
                                                {typeof aspecto.orb === "number"
                                                    ? `${aspecto.orb.toFixed(2)}°`
                                                    : "—"}
                                            </td>

                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>

                </Card.Body>
            </Card>

        </section>
    );
}

export default AspectList;