import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import LocationForm from "./components/LocationForm";
import Ceu from "./components/Ceu";
import Planetas from "./components/Planetas";

import { useState } from "react";

function App() {

    const [sol, setSol] = useState(null);
    const [lua, setLua] = useState(null);
    const [planetas, setPlanetas] = useState([]);
    const [erro, setErro] = useState("");

    async function handleSearch(dados) {
        try{

            setErro("");
            setSol(null);
            setLua(null);
            setPlanetas([]);

            const cidade = encodeURIComponent(dados.cidade);

            const url = `https://www.cyclecalcs.com/v2/places?q=${cidade}`;

            const resposta = await fetch(url);

            if (!resposta.ok) {
                setErro("Erro ao consultar o serviço. Tente novamente.");
                return;
            }

            const resultado = await resposta.json();

            if (!resultado.data || !resultado.data.results || resultado.data.results.length === 0) {
                setErro("Local não encontrado. Verifique o nome da cidade.");
                return;
            }

            const local = resultado.data.results[0];

            console.log("Local:", local);
            console.log("Latitude:", local.latitude_deg);
            console.log("Longitude:", local.longitude_deg);
            console.log("Fuso horário:", local.timezone);

            //Consultar Sol
            const urlSol = `https://www.cyclecalcs.com/v2/sun?lat=${local.latitude_deg}&lon=${local.longitude_deg}&at=${dados.data}`;

            const respostaSol = await fetch(urlSol);

            if (!respostaSol.ok) {
                setErro("Não foi possível obter os dados do Sol.");
                return;
            }

            const dadosSol = await respostaSol.json();

            if (
                !dadosSol.data ||
                !dadosSol.data.rise_set ||
                !dadosSol.data.rise_set.rise?.[0] ||
                !dadosSol.data.rise_set.set?.[0]
            ) {
                setErro("Dados do Sol não encontrados.");
                return;
            }

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

            if (!respostaLua.ok) {
                setErro("Não foi possível obter os dados da Lua.");
                return;
            }
            
            const dadosLua = await respostaLua.json();

            if (!dadosLua.data || !dadosLua.data.phase) {
                setErro("Dados da Lua não encontrados.");
                return;
            }

            const fase = dadosLua.data.phase.name;
            const iluminacao = dadosLua.data.phase.illumination_percent;

            let faseFormatada;

            if (fase === "New Moon") {
                faseFormatada = "Lua Nova";
            } else if (fase === "Waxing Crescent") {
                faseFormatada = "Crescente";
            } else if (fase === "First Quarter") {
                faseFormatada = "Quarto Crescente";
            } else if (fase === "Waxing Gibbous") {
                faseFormatada = "Gibosa Crescente";
            } else if (fase === "Full Moon") {
                faseFormatada = "Lua Cheia";
            } else if (fase === "Waning Gibbous") {
                faseFormatada = "Gibosa Minguante";
            } else if (fase === "Last Quarter") {
                faseFormatada = "Quarto Minguante";
            } else if (fase === "Waning Crescent") {
                faseFormatada = "Minguante";
            } else {
                faseFormatada = fase;
            }

            setLua({
                fase: faseFormatada,
                iluminacao: iluminacao
            });

            //Planetas
            const urlPlanetas = `https://www.cyclecalcs.com/v2/planet-board?lat=${local.latitude_deg}&lon=${local.longitude_deg}&at=${dados.data}`;

            const respostaPlanetas = await fetch(urlPlanetas);

            if (!respostaPlanetas.ok) {
                setErro("Não foi possível obter os dados dos planetas.");
                return;
            }

            const dadosPlanetas = await respostaPlanetas.json();

            if (!dadosPlanetas.data || !dadosPlanetas.data.bodies) {
                setErro("Dados dos planetas não encontrados.");
                return;
            }

            const listaPlanetas = dadosPlanetas.data.bodies.map((planeta, index) => {

                const nomes = {
                    Mercury: "Mercúrio",
                    Venus: "Vênus",
                    Mars: "Marte",
                    Jupiter: "Júpiter",
                    Saturn: "Saturno",
                    Uranus: "Urano",
                    Neptune: "Netuno",
                    Pluto: "Plutão"
                };

                return {
                    id: index,
                    nome: nomes[planeta.name] || planeta.name,
                    visivel: planeta.visibility?.observable_now ?? false,
                    retrogrado: planeta.motion?.is_retrograde ?? false,
                    constelacao: planeta.constellation?.name || "Desconhecida",
                    magnitude: planeta.physical?.apparent_magnitude ?? null,
                    distancia: planeta.position?.distance_km ?? null
                };

            });
        
            setPlanetas(listaPlanetas);  
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            setErro("Ocorreu um erro ao buscar os dados. Tente novamente.");
        }
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

                {erro && (
                    <p className="text-danger text-center mt-3">
                        {erro}
                    </p>
                )}

                {sol && lua && (
                    <Ceu
                        sol={sol}
                        lua={lua}
                    />
                )}

                <Planetas
                    planetas={planetas}
                />
            </Container>
        </>
    );
}

export default App;
