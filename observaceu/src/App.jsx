import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import LocationForm from "./components/LocationForm";
import Ceu from "./components/Ceu";
import Planetas from "./components/Planetas";

function App() {
    const dadosTeste = {
        sol: {
            nascer: "06:00",
            por: "18:15",
            duracao: "12h15"
        },

        lua: {
            fase: "Crescente",
            iluminacao: 42
        },

        planetas: [
            {
                id: 1,
                nome: "Mercúrio",
                visivel: true
            },
            {
                id: 2,
                nome: "Vênus",
                visivel: true
            },
            {
                id: 3,
                nome: "Marte",
                visivel: false
            },
            {
                id: 4,
                nome: "Júpiter",
                visivel: true
            }
        ]
    };

    function handleSearch(dados) {
        console.log("Dados enviados pelo formulário:", dados);
    }

    return (
        <>
            <Header />

            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1>
                        ObservaCéu
                    </h1>

                    <p className="lead">
                        Consulte as condições astronômicas
                        para sua localização.
                    </p>
                </div>

                <LocationForm
                    onSearch={handleSearch}
                />

                <Ceu
                    sol={dadosTeste.sol}
                    lua={dadosTeste.lua}
                />

                <Planetas
                    planetas={dadosTeste.planetas}
                />
            </Container>
        </>
    );
}

export default App;