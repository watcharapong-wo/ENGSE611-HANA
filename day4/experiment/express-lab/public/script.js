function callAPI3000() {
    fetch("http://localhost:3000/api/hello")
        .then(res => res.json())
        .then(data => showResult(data))
        .catch(err => showResult({ error: err.message }));
}

function callAPI3001() {
    fetch("http://localhost:3001/api/external")
        .then(res => res.json())
        .then(data => showResult(data))
        .catch(err => showResult({ error: err.message }));
}

function showResult(data) {
    document.getElementById("result").innerHTML = `
        <h3>📡 ข้อมูลจาก API:</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
}
