import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import LocationForm from "./components/LocationForm";
import Ceu from "./components/Ceu";
import Planetas from "./components/Planetas";

import { useState } from "react";

function App() {

    const [sol, setSol] = useState(null);
    const [lua, setLua] = useState(null);

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
    }

    async function handleSearch(dados) {
        const cidade = encodeURIComponent(dados.cidade);

        const url = `https://www.cyclecalcs.com/v2/places?q=${cidade}`;

        const resposta = await fetch(url);

        const resultado = await resposta.json();

        const local = resultado.data.results[0];

        console.log("Local:", local);
        console.log("Latitude:", local.latitude_deg);
        console.log("Longitude:", local.longitude_deg);
        console.log("Fuso horário:", local.timezone);

        //Consultar Sol
        const urlSol = `https://www.cyclecalcs.com/v2/sun?lat=${local.latitude_deg}&lon=${local.longitude_deg}&at=${dados.data}`;

        const respostaSol = await fetch(urlSol);

        const dadosSol = await respostaSol.json();

        const nascer = dadosSol.data.rise_set.rise[0];
        const por = dadosSol.data.rise_set.set[0];
        const minutos = dadosSol.data.rise_set.above_horizon_minutes;

        const timezone = local.timezone;

        const nascerData = new Date(nascer);
        const porData = new Date(por);

        const formatador = new Intl.DateTimeFormat("pt-BR", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit"
        });

        const nascerFormatado = formatador.format(nascerData);
        const porFormatado = formatador.format(porData);

        const horas = Math.floor(minutos / 60);
        const minutosRestantes = Math.round(minutos % 60);

        const duracao = `${horas}h ${minutosRestantes}min`;

        setSol({
            nascer: nascerFormatado,
            por: porFormatado,
            duracao: duracao
        });

        console.log("Nascer:", nascerFormatado);
        console.log("Pôr:", porFormatado);
        console.log("Duração:", duracao);

        //Consultar Lua
        const urlLua = `https://www.cyclecalcs.com/v2/moon?lat=${local.latitude_deg}&lon=${local.longitude_deg}&at=${dados.data}`;

        const respostaLua = await fetch(urlLua);
        
        const dadosLua = await respostaLua.json();

        const fase = dadosLua.data.phase.name;
        const iluminacao = dadosLua.data.phase.illumination_percent;

        let faseFormatada;
        if (fase === "Waning Gibbous") {
            faseFormatada = "Gibosa Minguante";
        }

        setLua({
            fase: faseFormatada,
            iluminacao: iluminacao
        });

        console.log("Fase da Lua:", faseFormatada);
        console.log("Iluminação da Lua:", iluminacao);

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

                {sol && lua && (
                    <Ceu
                        sol={sol}
                        lua={lua}
                    />
                )}

                <Planetas
                    planetas={dadosTeste.planetas}
                />
            </Container>
        </>
    );
}

export default App;
