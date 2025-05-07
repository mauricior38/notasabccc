const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Gerar Nota Jurado

app.get("/notasJurados", async (req, res) => {
  const url =
    "https://ws01.cavalocrioulo.org.br/wsrest/jfrmservices/evento/notasAnimalTelao";
  const agendamento = req.query.agendamento;

  try {
    const response = await axios.get(`${url}/${agendamento}`, {
      headers: { Accept: "application/xml" },
      responseType: "text",
    });

    const xmlData = response.data;

    const dir = path.join(__dirname, `${agendamento}`);
    const caminhoArquivo = path.join(dir, `notasJurados.xml`);

    // Cria o diretório se não existir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(caminhoArquivo, xmlData, "utf8");

    // res.status(200).send("XML baixado e salvo com sucesso.");

    const xmlDataResponse = fs.readFileSync(caminhoArquivo, "utf8");
    res.type("application/xml").send(xmlDataResponse);
    
  } catch (error) {
    console.error("Erro ao baixar o XML:", error.message);
    res.status(500).send("Erro ao baixar ou salvar o XML.");
  }
});

// Gerar Notas Animal em Pista
app.get("/animalEmPista", async (req, res) => {
  const url =
    "https://ws01.cavalocrioulo.org.br/wsrest/jfrmservices/evt/dadosAnimalPista";
  const agendamento = req.query.agendamento;

  try {
    const response = await axios.get(`${url}/${agendamento}`, {
      headers: { Accept: "application/xml" },
      responseType: "text",
    });

    const xmlData = response.data;

    const dir = path.join(__dirname, `${agendamento}`);
    const caminhoArquivo = path.join(dir, `animalEmPista.xml`);

    // Cria o diretório se não existir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(caminhoArquivo, xmlData, "utf8");

    res.status(200).send("XML baixado e salvo com sucesso.");
  } catch (error) {
    console.error("Erro ao baixar o XML:", error.message);
    res.status(500).send("Erro ao baixar ou salvar o XML.");
  }
});

// Gerar Ranking Femea Morfologia
// https://ws01.cavalocrioulo.org.br/wsrest/jfrmservices/evt/ranking/25565/FEMEA/MORFOLOGIA
app.get("/ranking", async (req, res) => {
  const url =
    "https://ws01.cavalocrioulo.org.br/wsrest/jfrmservices/evt/ranking";
  const sexo = req.query.sexo;
  const prova = req.query.prova;
  const agendamento = req.query.agendamento;

  try {
    const response = await axios.get(`${url}/${agendamento}/${sexo}/${prova}`, {
      headers: { Accept: "application/xml" },
      responseType: "text",
    });

    const xmlData = response.data;

    const dir = path.join(__dirname, `${agendamento}`);
    const caminhoArquivo = path.join(dir, `RANKING-${sexo}-${prova}.xml`);

    // Cria o diretório se não existir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(caminhoArquivo, xmlData, "utf8");

    res.status(200).send("XML baixado e salvo com sucesso.");
  } catch (error) {
    console.error("Erro ao baixar o XML:", error.message);
    res.status(500).send("Erro ao baixar ou salvar o XML.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
