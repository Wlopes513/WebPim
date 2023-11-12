export const paymentLeafHtml = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Folha de Pagamento</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
            text-align: left;
        }
        th, td {
            padding: 10px;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

    <h2>Folha de Pagamento</h2>

    <table>
        <tr>
            <th colspan="2">Empresa: [Nome da Empresa]</th>
            <th colspan="2">Período de Pagamento: {_DATA}</th>
        </tr>
        <tr>
            <td colspan="4">Nome do Empregado: {_NOME + _SOBRENOME}</td>
        </tr>
        <tr>
            <td colspan="2">Identificação do Empregado: {_ID}</td>
            <td colspan="2">CPF: {_CPF}</td>
        </tr>
        <tr>
            <td colspan="2">Cargo do Empregado: {_CARGO}</td>
            <td colspan="2">Departamento do Empregado: {_DEPARTAMENTO}</td>
        </tr>

        <tr>
            <th>Proventos</th>
            <th>Valores (R$)</th>
            <th>Descontos</th>
            <th>Valores (R$)</th>
        </tr>
        <tr>
            <td>Salário Base</td>
            <td>{_SALARIO_BASE}</td>
            <td>Impostos</td>
            <td>{_DESCONTOS}</td>
        </tr>
        <tr>
            <td>Bônus</td>
            <td>{_BONUS}</td>
            <td>Seguros</td>
            <td>{_SEGUROS}</td>
        </tr>
        <tr>
            <td>Benefícios</td>
            <td>{_BENEFICIOS}</td>
            <td>Outros descontos</td>
            <td>{_OUTROS_DESCONTOS}</td>
        </tr>

        <tr>
            <th colspan="2">Total de Proventos</th>
            <td colspan="2">{_TOTAL_POSITIVO}</td>
        </tr>
        <tr>
            <th colspan="2">Total de Descontos</th>
            <td colspan="2">{_TOTAL_NEGATIVO}</td>
        </tr>
        <tr>
            <th colspan="2">Salário Líquido a Pagar</th>
            <td colspan="2">{_SALARIO_TOTAL}</td>
        </tr>
    </table>
</body>
</html>`