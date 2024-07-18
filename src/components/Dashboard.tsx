import { Box, Container, Grid, Slider, Typography } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import '@nivo/core';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [ultimaPrestacao, setUltimaPrestacao] = useState(0);
  const [parcelas, setParcelas] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);

  useEffect(() => {
    // Simulação de dados de exemplo
    const valorFinanciado = 240000; // Valor financiado em reais
    const prazoMeses = 360; // Prazo em meses
    const taxaJuros = 5; // Taxa de juros anual em %

    const parcelas = [];
    const juros = [];
    const amortizacao = valorFinanciado / prazoMeses;

    for (let i = 0; i < prazoMeses; i++) {
      const saldoDevedor = valorFinanciado - i * amortizacao;
      const jurosMensal = (saldoDevedor * (taxaJuros / 100)) / 12;
      const prestacao = amortizacao + jurosMensal;
      parcelas.push({ month: i + 1, juros: jurosMensal, amortizacao: amortizacao });
    }

    setUltimaPrestacao(parcelas[parcelas.length - 1]);
    setParcelas(parcelas);
    setSelectedMonth(prazoMeses - 1); // Set the initial selected month to the last month
  }, []);

  const data = parcelas.slice(0, selectedMonth + 1);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: 'center', border: 1, borderRadius: 2 }}>
            <Typography variant="h6">Prestação Mensal</Typography>
            <Typography variant="h4">R$ 1.497,23</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: 'center', border: 1, borderRadius: 2 }}>
            <Typography variant="h6">Prazo Total (Meses)</Typography>
            <Typography variant="h4">420</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: 'center', border: 1, borderRadius: 2 }}>
            <Typography variant="h6">Última Prestação</Typography>
            <Typography variant="h4">
              R$ {ultimaPrestacao.juros + ultimaPrestacao.amortizacao}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ height: '60vh', mt: 5 }}>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Evolução das Parcelas
        </Typography>
        <div style={{ height: '100%', width: '100%' }}>
          <ResponsiveBar
            data={data}
            keys={['juros', 'amortizacao']}
            indexBy="month"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            layout="vertical"
            colors={{ scheme: 'nivo' }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Meses',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Valor da Parcela (R$)',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Evolução das Parcelas"
            barAriaLabel={(e) =>
              `${e.id}: ${e.formattedValue} em mês: ${e.indexValue}`
            }
          />
        </div>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Slider
          value={selectedMonth}
          onChange={(_, value) => setSelectedMonth(value)}
          min={0}
          max={parcelas.length - 1}
          marks={Array.from({ length: parcelas.length }, (_, i) => i % 12 === 0 ? { value: i, label: `${i / 12} anos` } : null).filter(Boolean)}
          valueLabelDisplay="auto"
        />
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          {`R$ ${(parcelas[selectedMonth]?.juros + parcelas[selectedMonth]?.amortizacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - ${Math.floor(selectedMonth / 12) + 1}º ano`}
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
